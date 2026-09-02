/* =====================================================================
   chatClient — koneksi chat level aplikasi (WS dulu, fallback polling)
   · Mode WS: real-time penuh (chat, presence, typing)
   · Mode polling: POST /api/chat/send + GET /api/chat/poll tiap 2 detik
     (dipakai otomatis saat WebSocket tidak bisa terbuka, mis. proxy
     preview yang tidak mendukung upgrade)
   · User tetap "online" selama app terbuka (heartbeat 20 detik)
   ===================================================================== */

import { chatStore } from './chatStore'

const MAX_MESSAGES = 200

const cbs = {
  message: new Set(),
  presence: new Set(),
  typing: new Set(),
  status: new Set(),
}

const state = {
  started: false,
  mode: 'idle', // 'ws' | 'poll'
  connected: false,
  user: null,
  level: 1,
  ws: null,
  messages: [],
  online: [],
  lastTs: 0,
  wsFellBack: false,
}

const timers = { poll: null, beat: null, wsTimeout: null }

function emit(key, val) {
  cbs[key].forEach((fn) => fn(val))
}
function setStatus(connected, mode) {
  state.connected = connected
  state.mode = mode
  chatStore.setConnected(connected)
  emit('status', { connected, mode })
}
function setOnline(list) {
  state.online = list || []
  chatStore.setOnline(state.online)
  emit('presence', state.online)
}
function pushMessage(msg, { remote = true } = {}) {
  state.messages = [...state.messages, msg].slice(-MAX_MESSAGES)
  if (remote) {
    chatStore.addUnread()
    emit('message', { message: msg, all: state.messages, own: false })
  } else {
    emit('message', { message: msg, all: state.messages, own: true })
  }
}

async function api(path, opts) {
  const res = await fetch(path, opts)
  return res.json()
}

/* ----------------------------- WS mode ----------------------------- */

function connectWS() {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws'
  let ws
  try {
    ws = new WebSocket(`${proto}://${window.location.host}/ws`)
  } catch {
    fallbackPoll()
    return
  }
  state.ws = ws

  // kalau WS tidak terbuka dalam 2.5 detik → polling
  clearTimeout(timers.wsTimeout)
  timers.wsTimeout = setTimeout(() => {
    if (!state.connected) {
      try {
        ws.close()
      } catch {
        /* abaikan */
      }
      fallbackPoll()
    }
  }, 2500)

  ws.onopen = () => {
    if (state.wsFellBack) return // sudah jatuh ke polling, biarkan
    setStatus(true, 'ws')
    ws.send(
      JSON.stringify({
        type: 'join',
        user: {
          username: state.user?.username,
          name: state.user?.name,
          class: state.user?.class,
          avatarUrl: state.user?.avatarUrl || '',
          xp: state.user?.gamification?.xp ?? 0,
          streak: state.user?.gamification?.streak ?? 0,
          level: state.level,
        },
      })
    )
  }
  ws.onmessage = (ev) => {
    let msg
    try {
      msg = JSON.parse(ev.data)
    } catch {
      return
    }
    if (msg.type === 'hello') {
      state.lastTs = msg.history?.length ? msg.history[msg.history.length - 1].ts : 0
      state.messages = (msg.history || []).slice(-MAX_MESSAGES)
      setOnline(msg.online)
      emit('message', { message: null, all: state.messages, own: false, initial: true })
    } else if (msg.type === 'presence') {
      setOnline(msg.online)
    } else if (msg.type === 'chat') {
      state.lastTs = msg.ts
      pushMessage(msg)
    } else if (msg.type === 'typing') {
      emit('typing', msg)
    }
  }
  ws.onclose = () => {
    if (state.mode !== 'ws') return
    setStatus(false, 'poll')
    fallbackPoll()
  }
  ws.onerror = () => {
    try {
      ws.close()
    } catch {
      /* abaikan */
    }
  }
}

/* --------------------------- Poll mode --------------------------- */

async function pollOnce() {
  try {
    const data = await api(`/api/chat/poll?since=${state.lastTs}&self=${encodeURIComponent(state.user?.username || '')}`)
    if (Array.isArray(data.messages)) {
      for (const m of data.messages) {
        state.lastTs = Math.max(state.lastTs, m.ts)
        pushMessage(m)
      }
    }
    if (typeof data.lastTs === 'number') state.lastTs = Math.max(state.lastTs, data.lastTs)
    if (Array.isArray(data.online)) setOnline(data.online)
  } catch {
    setStatus(false, 'poll')
  }
}

function fallbackPoll() {
  if (state.mode === 'poll' && timers.poll) return
  state.wsFellBack = true
  try {
    state.ws?.close()
  } catch {
    /* abaikan */
  }
  state.ws = null
  state.mode = 'poll'

  const loop = async () => {
    if (!state.started) return
    // heartbeat (juga memperbarui status online kita)
    try {
      const data = await api('/api/chat/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: state.user?.username,
          name: state.user?.name,
          class: state.user?.class,
          avatarUrl: state.user?.avatarUrl || '',
          xp: state.user?.gamification?.xp ?? 0,
          streak: state.user?.gamification?.streak ?? 0,
          level: state.level,
        }),
      })
      if (Array.isArray(data.online)) setOnline(data.online)
      setStatus(true, 'poll')
    } catch {
      setStatus(false, 'poll')
    }
    await pollOnce()
    if (state.started) timers.poll = setTimeout(loop, 2000)
  }
  loop()
}

/* ------------------------------ API ------------------------------ */

export const chatClient = {
  /** Dipanggil sekali setelah login */
  start(user, level) {
    if (state.started) {
      state.user = user
      state.level = level
      return
    }
    state.started = true
    state.user = user
    state.level = level
    state.wsFellBack = false
    connectWS()
    // heartbeat pengaman (poll mode mengandalkan ini)
    timers.beat = setInterval(() => {
      if (state.mode === 'poll') pollOnce()
    }, 20_000)
  },

  /** Saat logout */
  stop() {
    state.started = false
    clearTimeout(timers.wsTimeout)
    clearInterval(timers.beat)
    if (timers.poll) clearTimeout(timers.poll)
    try {
      state.ws?.close()
    } catch {
      /* abaikan */
    }
    state.ws = null
    state.messages = []
    setOnline([])
    setStatus(false, 'idle')
  },

  send(text) {
    const t = String(text || '').trim().slice(0, 500)
    if (!t || !state.user) return
    if (state.mode === 'ws' && state.ws?.readyState === 1) {
      state.ws.send(JSON.stringify({ type: 'chat', text: t }))
      // echo lokal langsung (server juga broadcast, jadi dedupe tak perlu di sini
      // karena sender WS juga menerima broadcast-nya → kita HANYA mengandalkan
      // broadcast. Tapi broadcast sender bisa telat → echo lokal dengan penanda)
      pushMessage({ type: 'chat', from: state.user, text: t, ts: Date.now(), _local: true })
    } else {
      api('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: {
            username: state.user.username,
            name: state.user.name,
            class: state.user.class,
            avatarUrl: state.user.avatarUrl || '',
            level: state.level,
          },
          text: t,
        }),
      }).then((data) => {
        if (data?.message) pushMessage(data.message, { remote: false })
      }).catch(() => {})
    }
  },

  typing(on) {
    if (state.mode === 'ws' && state.ws?.readyState === 1) {
      state.ws.send(JSON.stringify({ type: 'typing', on }))
    }
  },

  getMessages() {
    return state.messages
  },
  getOnline() {
    return state.online
  },
  getMode() {
    return state.mode
  },

  subscribe(key, fn) {
    cbs[key].add(fn)
    if (key === 'message') fn({ message: null, all: state.messages, own: false, initial: true })
    if (key === 'presence') fn(state.online)
    if (key === 'status') fn({ connected: state.connected, mode: state.mode })
    return () => cbs[key].delete(fn)
  },
}

/* Dedupe: echo lokal (WS) vs broadcast server dari diri sendiri */
const isDupOf = (a, b) =>
  a?.from?.username === b?.from?.username && a?.text === b?.text && Math.abs((a?.ts || 0) - (b?.ts || 0)) < 1500

const _origPush = pushMessage
pushMessage = function (msg, opts) {
  const idx = state.messages.findIndex((m) => isDupOf(m, msg) && (!!m._local !== !!msg._local || m._local))
  if (idx >= 0) {
    // ganti versi lokal dengan versi server (ts resmi), atau abaikan dup
    if (!msg._local) {
      state.messages[idx] = msg
    } else {
      return
    }
  }
  if (!msg._local && state.messages.some((m) => m._local && isDupOf(m, msg))) return
  return _origPush(msg, opts)
}
