/* =====================================================================
   IDNcheat Server — chat real-time + roster user (leaderboard)
   Port 3001. Dua transport:
     · WebSocket /ws          (cepat, real-time)
     · HTTP /api/*            (fallback polling + sinkron user)
   Data persist:
     · server/users.json         — roster semua user yang login/register
     · server/chat-history.json  — 200 pesan terakhir
   Online: heartbeat < 60 detik dihitung online.
   ===================================================================== */

import fs from 'fs'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import { WebSocketServer } from 'ws'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 3001
const USERS_FILE = path.join(__dirname, 'users.json')
const HISTORY_FILE = path.join(__dirname, 'chat-history.json')
const MAX_HISTORY = 200
const ONLINE_TTL = 60_000

/* ------------------------------ data ------------------------------ */

let users = new Map() // username → {username,name,class,xp,streak,avatarUrl,firstSeen,lastSeen}
let history = []
try {
  const raw = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))
  if (raw && typeof raw === 'object') for (const [k, v] of Object.entries(raw)) users.set(k, v)
} catch {
  /* pertama kali */
}
try {
  const raw = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'))
  if (Array.isArray(raw)) history = raw.slice(-MAX_HISTORY)
} catch {
  /* pertama kali */
}

function saveUsers() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(Object.fromEntries(users), null, 1))
  } catch (err) {
    console.error('Gagal simpan users:', err.message)
  }
}
function saveHistory() {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history.slice(-MAX_HISTORY), null, 1))
  } catch (err) {
    console.error('Gagal simpan riwayat:', err.message)
  }
}

/* ---------------------------- presence ---------------------------- */

const presence = new Map() // username → { info, ts }

function userPublic(u) {
  return {
    username: u.username,
    name: u.name,
    class: u.class || '',
    xp: u.xp ?? 0,
    streak: u.streak ?? 0,
    avatarUrl: u.avatarUrl || '',
    banned: !!u.banned,
  }
}
function onlineList() {
  const now = Date.now()
  const list = []
  for (const [username, p] of presence) {
    if (now - p.ts <= ONLINE_TTL) list.push(p.info)
  }
  return list.sort((a, b) => a.name.localeCompare(b.name))
}
function upsertUser(data) {
  const username = String(data.username || 'anon').slice(0, 40)
  const cur = users.get(username) || { firstSeen: Date.now() }
  const next = {
    ...cur,
    username,
    name: String(data.name || username).slice(0, 60),
    class: String(data.class || cur.class || '').slice(0, 30),
    xp: Math.max(0, Number(data.xp) || cur.xp || 0),
    streak: Math.max(0, Number(data.streak) || cur.streak || 0),
    avatarUrl:
      typeof data.avatarUrl === 'string' && data.avatarUrl.startsWith('data:')
        ? data.avatarUrl.slice(0, 20000)
        : cur.avatarUrl || '',
    lastSeen: Date.now(),
  }
  users.set(username, next)
  saveUsers()
  return next
}

/* ----------------------------- WebSocket ----------------------------- */

const server = http.createServer((req, res) => {
  // JSON helper
  const send = (code, obj) => {
    const body = JSON.stringify(obj)
    res.writeHead(code, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    })
    res.end(body)
  }
  if (req.method === 'OPTIONS') return send(204, {})

  const url = new URL(req.url, `http://localhost:${PORT}`)
  let body = ''
  req.on('data', (c) => (body += c.length > 64_000 ? '' : c))
  req.on('end', () => {
    let data = {}
    try {
      data = body ? JSON.parse(body) : {}
    } catch {
      return send(400, { error: 'invalid json' })
    }

    try {
      /* Roster user (leaderboard) */
      if (req.method === 'POST' && url.pathname === '/api/users/upsert') {
        const u = upsertUser(data)
        return send(200, { ok: true, user: userPublic(u) })
      }
      if (req.method === 'GET' && url.pathname === '/api/users') {
        const all = Array.from(users.values()).map(userPublic).sort((a, b) => b.xp - a.xp)
        return send(200, { users: all, online: onlineList() })
      }

      /* Chat: join/heartbeat */
      if (req.method === 'POST' && url.pathname === '/api/chat/join') {
        const u = upsertUser(data)
        presence.set(u.username, {
          info: { username: u.username, name: u.name, class: u.class, avatarUrl: u.avatarUrl, level: Math.max(1, Math.min(99, Number(data.level) || 1)) },
          ts: Date.now(),
        })
        broadcastWS({ type: 'presence', online: onlineList() }, null, u.username)
        return send(200, { online: onlineList() })
      }

      /* Chat: kirim pesan */
      if (req.method === 'POST' && url.pathname === '/api/chat/send') {
        const text = String(data.text || '').trim().slice(0, 500)
        if (!text || !data.from?.username) return send(400, { error: 'text & from.username wajib' })
        const msg = { type: 'chat', from: data.from, text, ts: Date.now() }
        history.push(msg)
        if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY)
        saveHistory()
        broadcastWS(msg, null, null)
        return send(200, { ok: true, message: msg })
      }

      /* Chat: polling pesan baru (fallback transport) */
      if (req.method === 'GET' && url.pathname === '/api/chat/poll') {
        const since = Number(url.searchParams.get('since') || 0)
        const self = url.searchParams.get('self') || ''
        const msgs = history.filter((m) => m.ts > since && m.from?.username !== self).slice(-50)
        return send(200, { messages: msgs, online: onlineList(), lastTs: history.length ? history[history.length - 1].ts : since })
      }

      if (url.pathname === '/health') return send(200, { ok: true, users: users.size, online: onlineList().length })

      /* ---------------- ADMIN (di-guard client-side) ---------------- */
      if (req.method === 'GET' && url.pathname === '/api/admin/overview') {
        const all = Array.from(users.values())
          .sort((a, b) => (b.xp || 0) - (a.xp || 0))
          .map((u) => ({ ...userPublic(u), firstSeen: u.firstSeen, lastSeen: u.lastSeen, banned: !!u.banned }))
        const on = onlineList()
        return send(200, {
          users: all,
          online: on,
          history: history.slice(-200),
          totals: { users: users.size, online: on.length, messages: history.length, xpTotal: all.reduce((a, u) => a + (u.xp || 0), 0) },
        })
      }
      if (req.method === 'POST' && url.pathname === '/api/admin/user') {
        const u = users.get(String(data.username || ''))
        if (!u) return send(404, { error: 'User tidak ditemukan' })
        if (typeof data.name === 'string') u.name = data.name.slice(0, 60)
        if (typeof data.class === 'string') u.class = data.class.slice(0, 30)
        if (typeof data.xp === 'number') u.xp = Math.max(0, Math.round(data.xp))
        if (typeof data.streak === 'number') u.streak = Math.max(0, Math.round(data.streak))
        if (typeof data.banned === 'boolean') u.banned = data.banned
        u.lastSeen = Date.now()
        saveUsers()
        return send(200, { ok: true, user: userPublic(u) })
      }
      if (req.method === 'POST' && url.pathname === '/api/admin/user/delete') {
        const username = String(data.username || '')
        if (!users.delete(username)) return send(404, { error: 'User tidak ditemukan' })
        presence.delete(username)
        saveUsers()
        broadcastWS({ type: 'presence', online: onlineList() })
        return send(200, { ok: true })
      }
      if (req.method === 'POST' && url.pathname === '/api/admin/broadcast') {
        const text = String(data.text || '').trim().slice(0, 500)
        if (!text) return send(400, { error: 'Teks broadcast wajib diisi' })
        const msg = {
          type: 'chat',
          from: { username: 'idncheat-admin', name: 'Admin IDN', class: 'STAFF', avatarUrl: '', level: 99, admin: true },
          text,
          ts: Date.now(),
        }
        history.push(msg)
        if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY)
        saveHistory()
        broadcastWS(msg)
        return send(200, { ok: true, message: msg })
      }

      return send(404, { error: 'not found' })
    } catch (err) {
      return send(500, { error: String(err.message) })
    }
  })
})

function broadcastWS(msg, exceptWs = null, exceptUser = null) {
  const data = JSON.stringify(msg)
  for (const ws of wss.clients) {
    if (ws === exceptWs || ws.readyState !== 1) continue
    const p = presence.get(ws._username)
    if (exceptUser && ws._username === exceptUser) continue
    if (exceptUser && p && p.info.username === exceptUser) continue
    ws.send(data)
  }
}

const wss = new WebSocketServer({ server, path: '/ws' })
wss.on('connection', (ws) => {
  ws.isAlive = true
  ws.on('pong', () => (ws.isAlive = true))

  ws.on('message', (buf) => {
    let msg
    try {
      msg = JSON.parse(buf.toString())
    } catch {
      return
    }
    if (msg.type === 'join') {
      const u = upsertUser(msg.user || {})
      ws._username = u.username
      presence.set(u.username, {
        info: { username: u.username, name: u.name, class: u.class, avatarUrl: u.avatarUrl, level: Math.max(1, Math.min(99, Number(msg.user?.level) || 1)) },
        ts: Date.now(),
      })
      ws.send(
        JSON.stringify({
          type: 'hello',
          you: userPublic(u),
          online: onlineList(),
          history: history.slice(-80),
          users: Array.from(users.values()).map(userPublic).sort((a, b) => b.xp - a.xp),
        })
      )
      broadcastWS({ type: 'presence', online: onlineList() }, ws)
    } else if (msg.type === 'chat' && ws._username) {
      const p = presence.get(ws._username)
      const text = String(msg.text || '').trim().slice(0, 500)
      if (!text || !p) return
      const out = { type: 'chat', from: p.info, text, ts: Date.now() }
      history.push(out)
      if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY)
      saveHistory()
      broadcastWS(out)
    } else if (msg.type === 'typing' && ws._username) {
      const p = presence.get(ws._username)
      if (p) broadcastWS({ type: 'typing', from: { username: p.info.username, name: p.info.name }, on: !!msg.on }, ws)
    }
  })

  ws.on('close', () => {
    if (!ws._username) return
    presence.delete(ws._username)
    broadcastWS({ type: 'presence', online: onlineList() })
  })
})

/* keepalive + sweep online stale */
setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) ws.terminate()
    else {
      ws.isAlive = false
      ws.ping()
      // WS open = online
      if (ws._username) presence.set(ws._username, { ...(presence.get(ws._username) || { info: { username: ws._username, name: ws._username } }), ts: Date.now() })
    }
  }
  const now = Date.now()
  let changed = false
  for (const [k, p] of presence) {
    if (now - p.ts > ONLINE_TTL) {
      presence.delete(k)
      changed = true
    }
  }
  if (changed) broadcastWS({ type: 'presence', online: onlineList() })
}, 20_000)

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[idncheat] Server berjalan di :${PORT} (ws /ws + api /api/*) · user terdaftar: ${users.size}`)
})
