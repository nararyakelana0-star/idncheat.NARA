import React, { useEffect, useRef, useState } from 'react'
import { Send, Wifi, WifiOff, Users, MessageCircle, UserPlus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { levelInfo } from '../../context/AppContext'
import { chatStore } from '../../lib/chatStore'
import PageTitle from '../ui/PageTitle'
import Avatar from '../ui/Avatar'

/* =====================================================================
   Chat — ruang obrolan real-time antar user IDNcheat (WebSocket)
   Online, presence, typing, auto-reconnect.
   ===================================================================== */

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPage() {
  const { user } = useAuth()
  const { state } = useApp()
  const consoleMode = !!state.theme.console
  const [connected, setConnected] = useState(false)
  const [online, setOnline] = useState([])
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(null) // {name, on}
  const wsRef = useRef(null)
  const retryRef = useRef(0)
  const bottomRef = useRef(null)
  const typingTimer = useRef(null)
  const mountedRef = useRef(true)

  const lv = levelInfo(state.xp)

  useEffect(() => {
    mountedRef.current = true
    let ws
    let closed = false

    const connect = () => {
      if (closed) return
      const proto = window.location.protocol === 'https:' ? 'wss' : 'ws'
      ws = new WebSocket(`${proto}://${window.location.host}/ws`)
      wsRef.current = ws

      ws.onopen = () => {
        retryRef.current = 0
        ws.send(
          JSON.stringify({
            type: 'join',
            user: {
              username: user?.username,
              name: user?.name,
              class: user?.class,
              avatarUrl: user?.avatarUrl || '',
              level: lv.level,
            },
          })
        )
      }

      ws.onmessage = (ev) => {
        if (!mountedRef.current) return
        let msg
        try {
          msg = JSON.parse(ev.data)
        } catch {
          return
        }
        if (msg.type === 'hello') {
          setConnected(true)
          setOnline(msg.online)
          setMessages(msg.history || [])
        } else if (msg.type === 'presence') {
          setOnline(msg.online)
        } else if (msg.type === 'chat') {
          setMessages((m) => [...m, msg].slice(-200))
          if (msg.from?.username !== user?.username) {
            chatStore.addUnread()
            if (window.location.hash !== '#chat') chatStore.addMessage()
          }
          setTyping(null)
        } else if (msg.type === 'typing') {
          if (msg.on) setTyping(msg.from)
          else setTyping(null)
        }
      }

      ws.onclose = () => {
        if (!mountedRef.current) return
        setConnected(false)
        chatStore.setConnected(false)
        // auto-reconnect (backoff: 1s, 2s, 4s, maks 10s)
        const delay = Math.min(10000, 1000 * 2 ** retryRef.current)
        retryRef.current += 1
        setTimeout(connect, delay)
      }

      ws.onerror = () => ws.close()
    }

    connect()
    return () => {
      closed = true
      mountedRef.current = false
      chatStore.setConnected(false)
      try {
        ws?.close()
      } catch {
        /* abaikan */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.username])

  /* scroll ke bawah saat pesan baru */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  const send = () => {
    const t = text.trim()
    if (!t || !wsRef.current || wsRef.current.readyState !== 1) return
    wsRef.current.send(JSON.stringify({ type: 'chat', text: t }))
    setMessages((m) => [
      ...m,
      { type: 'chat', from: { username: user?.username, name: user?.name, avatarUrl: user?.avatarUrl }, text: t, ts: Date.now() },
    ])
    setText('')
    setTyping(null)
    clearTimeout(typingTimer.current)
    wsRef.current.send(JSON.stringify({ type: 'typing', on: false }))
  }

  const onType = (v) => {
    setText(v)
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify({ type: 'typing', on: true }))
      clearTimeout(typingTimer.current)
      typingTimer.current = setTimeout(() => {
        wsRef.current?.send(JSON.stringify({ type: 'typing', on: false }))
      }, 1500)
    }
  }

  const others = online.filter((o) => o.username !== user?.username)
  const meOnline = online.some((o) => o.username === user?.username)

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle
        crumb="Komunitas"
        title="Chat Komunitas"
        sub="Obrolan real-time dengan anggota IDNcheat lainnya yang sedang online."
      />

      {/* Presence */}
      <div className="card mb-4 flex flex-wrap items-center gap-3 p-3.5 sm:p-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold ${
            connected
              ? 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          {connected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
          {connected ? 'Terhubung' : 'Terhubung ulang…'}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <Users className="h-3.5 w-3.5" /> {online.length} online
        </span>
        <div className="flex -space-x-2">
          {online.slice(0, 6).map((o) => (
            <Avatar
              key={o.username}
              user={{ name: o.name, username: o.username, avatarUrl: o.avatarUrl }}
              size="sm"
              className="ring-2 ring-white dark:ring-slate-900"
            />
          ))}
          {online.length > 6 && (
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-[10px] font-extrabold text-slate-600 ring-2 ring-white dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-900">
              +{online.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Kolom chat */}
      <div className="card flex h-[58vh] min-h-[380px] flex-col overflow-hidden">
        <div className={`flex-1 space-y-3 overflow-y-auto p-4 ${consoleMode ? 'bg-transparent' : 'bg-slate-50/60 dark:bg-slate-950/30'}`}>
          {messages.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/15">
                  <MessageCircle className="h-7 w-7" />
                </span>
                <p className="mt-3 font-display text-sm font-bold text-slate-700 dark:text-slate-200">
                  Belum ada pesan
                </p>
                <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-slate-400">
                  {others.length > 0
                    ? `Ada ${others.length} orang lain online — sapa mereka dulu!`
                    : 'Jadilah yang pertama ngobrol. Ajak temanmu login ke IDNcheat untuk mulai chat.'}
                </p>
              </div>
            </div>
          ) : (
            messages.map((m, i) => {
              const mine = m.from?.username === user?.username
              return (
                <div key={`${m.ts}-${i}`} className={`flex items-end gap-2.5 ${mine ? 'flex-row-reverse' : ''}`}>
                  <Avatar
                    user={{ name: m.from?.name, username: m.from?.username, avatarUrl: m.from?.avatarUrl }}
                    size="sm"
                  />
                  <div className={`max-w-[75%] ${mine ? 'items-end' : ''}`}>
                    <div className={`mb-0.5 flex items-baseline gap-2 text-[10px] font-bold ${mine ? 'flex-row-reverse' : ''}`}>
                      <span className={mine ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}>
                        {mine ? 'Kamu' : m.from?.name}
                      </span>
                      <span className="text-slate-400/70">{fmtTime(m.ts)}</span>
                    </div>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words ${
                        mine
                          ? 'rounded-br-md bg-brand-600 text-white'
                          : 'rounded-bl-md bg-white text-slate-800 shadow-card dark:bg-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              )
            })
          )}
          {typing && (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
              <Avatar user={{ name: typing.name, username: typing.username }} size="sm" />
              {typing.name} sedang mengetik
              <span className="inline-flex gap-0.5">
                <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400" />
                <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:120ms]" />
                <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:240ms]" />
              </span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-white/10">
          <input
            value={text}
            onChange={(e) => onType(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={`Kirim pesan ke ${others.length || 'komunitas'}…`}
            className="input-base flex-1 !rounded-full !py-2.5 !pl-4"
            maxLength={500}
          />
          <button
            onClick={send}
            disabled={!text.trim() || !connected}
            className="btn-primary grid h-11 w-11 shrink-0 place-items-center !rounded-full !p-0 disabled:opacity-50"
            aria-label="Kirim"
          >
            <Send className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {!meOnline && connected && (
        <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
          <UserPlus className="h-3.5 w-3.5" /> Status online-mu belum muncul — muat ulang halaman.
        </p>
      )}
    </div>
  )
}
