/* =====================================================================
   IDNcheat Chat Server — WebSocket real-time
   Port 3001, path /ws (di-proxy Vite dari /ws)
   Protokol JSON:
     client → { type:'join', user:{username,name,class,avatarUrl,level} }
     client → { type:'chat', text }
     client → { type:'typing', on:boolean }
     server → { type:'hello', you, online, history }
     server → { type:'presence', online }
     server → { type:'chat', from, text, ts }
     server → { type:'typing', from, on }
   Riwayat (max 200 pesan) dipersist ke server/chat-history.json
   ===================================================================== */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { WebSocketServer } from 'ws'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = 3001
const HISTORY_FILE = path.join(__dirname, 'chat-history.json')
const MAX_HISTORY = 200

let history = []
try {
  const raw = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'))
  if (Array.isArray(raw)) history = raw.slice(-MAX_HISTORY)
} catch {
  history = []
}

function saveHistory() {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history.slice(-MAX_HISTORY), null, 1))
  } catch (err) {
    console.error('Gagal simpan riwayat chat:', err.message)
  }
}

const wss = new WebSocketServer({ port: PORT, path: '/ws' })
const clients = new Map() // ws → user

function onlineList() {
  return Array.from(clients.values()).map((u) => ({
    username: u.username,
    name: u.name,
    classRoom: u.class || '',
    avatarUrl: u.avatarUrl || '',
    level: u.level || 1,
  }))
}

function broadcast(msg, except = null) {
  const data = JSON.stringify(msg)
  for (const ws of wss.clients) {
    if (ws !== except && ws.readyState === 1) ws.send(data)
  }
}

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
    const user = clients.get(ws)
    if (!user) return // belum join

    if (msg.type === 'chat') {
      const text = String(msg.text || '').trim().slice(0, 500)
      if (!text) return
      const out = { type: 'chat', from: user, text, ts: Date.now() }
      history.push(out)
      if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY)
      saveHistory()
      broadcast(out)
    } else if (msg.type === 'typing') {
      broadcast({ type: 'typing', from: { username: user.username, name: user.name }, on: !!msg.on }, ws)
    }
  })

  ws.on('close', () => {
    clients.delete(ws)
    broadcast({ type: 'presence', online: onlineList() })
  })

  ws.on('message', () => {}) // noop, message handler di atas
})

// join ditangani lewat pesan pertama; untuk broadcast presence saat join:
wss.on('connection', (ws) => {
  ws.once('message', (buf) => {
    let msg
    try {
      msg = JSON.parse(buf.toString())
    } catch {
      return
    }
    if (msg.type === 'join') {
      const u = msg.user || {}
      const user = {
        username: String(u.username || 'anon').slice(0, 40),
        name: String(u.name || u.username || 'Anon').slice(0, 60),
        class: String(u.class || '').slice(0, 30),
        avatarUrl: typeof u.avatarUrl === 'string' && u.avatarUrl.startsWith('data:') ? u.avatarUrl.slice(0, 20000) : '',
        level: Math.max(1, Math.min(99, Number(u.level) || 1)),
      }
      clients.set(ws, user)
      ws.send(
        JSON.stringify({
          type: 'hello',
          you: user,
          online: onlineList(),
          history: history.slice(-80),
        })
      )
      broadcast({ type: 'presence', online: onlineList() }, ws)
    }
  })
})

// keepalive ping 30 detik
setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) {
      ws.terminate()
      continue
    }
    ws.isAlive = false
    ws.ping()
  }
}, 30000)

console.log(`[idncheat] Chat server WebSocket berjalan di ws://localhost:${PORT}/ws`)
