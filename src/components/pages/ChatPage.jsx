import React, { useEffect, useRef, useState } from 'react'
import { Send, Wifi, WifiOff, Users, MessageCircle, Radio } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { chatClient } from '../../lib/chatClient'
import { chatStore } from '../../lib/chatStore'
import PageTitle from '../ui/PageTitle'
import Avatar from '../ui/Avatar'

/* =====================================================================
   Chat — ruang obrolan real-time antar user IDNcheat.
   Transport ditangani chatClient (WS + fallback polling), jadi user
   tetap online di semua halaman selama app terbuka.
   ===================================================================== */

function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(chatClient.getMessages())
  const [online, setOnline] = useState(chatClient.getOnline())
  const [conn, setConn] = useState({ connected: chatClient.getMode() !== 'idle', mode: chatClient.getMode() })
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(null)
  const bottomRef = useRef(null)
  const typingTimer = useRef(null)

  useEffect(() => {
    const u1 = chatClient.subscribe('message', ({ all, own }) => {
      setMessages([...all])
      if (!own) {
        setTyping(null)
        chatStore.clearUnread() // sedang di halaman chat → tak perlu badge
      }
    })
    const u2 = chatClient.subscribe('presence', setOnline)
    const u3 = chatClient.subscribe('status', setConn)
    const u4 = chatClient.subscribe('typing', (t) => {
      if (t.on) setTyping(t.from)
      else setTyping(null)
    })
    chatStore.clearUnread()
    return () => {
      u1()
      u2()
      u3()
      u4()
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  const send = () => {
    const t = text.trim()
    if (!t) return
    chatClient.send(t)
    setText('')
    setTyping(null)
    chatClient.typing(false)
  }

  const onType = (v) => {
    setText(v)
    chatClient.typing(true)
    clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => chatClient.typing(false), 1500)
  }

  const others = online.filter((o) => o.username !== user?.username)

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
            conn.connected
              ? 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          {conn.connected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
          {conn.connected ? (conn.mode === 'ws' ? 'Real-time (WebSocket)' : 'Real-time (polling)') : 'Terhubung ulang…'}
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
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
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
                    : 'Jadilah yang pertama ngobrol. Ajak temanmu login ke IDNcheat dari browser dia — dia akan langsung muncul di sini.'}
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
            disabled={!text.trim() || !conn.connected}
            className="btn-primary grid h-11 w-11 shrink-0 place-items-center !rounded-full !p-0 disabled:opacity-50"
            aria-label="Kirim"
            title={conn.connected ? 'Kirim' : 'Menunggu koneksi…'}
          >
            <Send className="h-[18px] w-[18px]" />
          </button>
          {!conn.connected && (
            <span className="hidden text-[10px] font-bold text-amber-600 sm:block dark:text-amber-400">
              <Radio className="mr-1 inline h-3 w-3" />
              Mencari server…
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
