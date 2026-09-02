import React, { useCallback, useEffect, useState } from 'react'
import {
  Shield,
  LogOut,
  ExternalLink,
  Ban,
  CheckCircle2,
  Trash2,
  Pencil,
  Save,
  X,
  Send,
  Users,
  Radio,
  MessageSquare,
  Star,
  Lock,
} from 'lucide-react'
import Logo from '../Logo'
import Avatar from '../ui/Avatar'

/* =====================================================================
   AdminApp — Panel Administrator IDNcheat (rute /admin)
   Login kredensial admin → akses penuh data user + permission:
   edit user, blokir/aktifkan, hapus, broadcast ke semua user.
   ===================================================================== */

const ADMIN_USER = 'idnsucks_67'
const ADMIN_PASS = 'qzkl_890vf###_idn'
const ADMIN_KEY = 'idncheat_admin'

const api = async (p, opts) => (await fetch(p, opts)).json()

function fmtSeen(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

/* ------------------------------ LOGIN ------------------------------ */

function AdminLogin({ onOk }) {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    setTimeout(() => {
      if (u.trim() === ADMIN_USER && p === ADMIN_PASS) onOk()
      else setErr('Username atau password salah.')
      setBusy(false)
    }, 350)
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#04060f] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo size="lg" showWord={false} />
        </div>
        <div
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="font-display text-base font-extrabold text-white">Panel Administrator</p>
              <p className="text-[11px] font-semibold text-slate-400">IDNcheat · Akses terbatas</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="mb-1 block text-[11px] font-extrabold uppercase tracking-wide text-slate-400">Username</label>
              <input
                value={u}
                onChange={(e) => setU(e.target.value)}
                autoComplete="off"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm font-semibold text-white outline-none transition focus:border-blue-400"
                placeholder="username admin"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-extrabold uppercase tracking-wide text-slate-400">Password</label>
              <input
                type="password"
                value={p}
                onChange={(e) => setP(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm font-semibold text-white outline-none transition focus:border-blue-400"
                placeholder="••••••••••••"
              />
            </div>
            {err && (
              <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400">{err}</p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 py-3 text-sm font-extrabold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
            >
              {busy ? 'Memverifikasi…' : 'Masuk Panel'}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-[10px] font-semibold text-slate-600">
          <Lock className="mr-1 inline h-3 w-3" /> Dilarang diakses oleh bukan personel IDNcheat
        </p>
      </div>
    </div>
  )
}

/* ------------------------------ PANEL ------------------------------ */

function AdminPanel({ onLogout }) {
  const [data, setData] = useState(null)
  const [editing, setEditing] = useState(null) // username yang sedang diedit
  const [draft, setDraft] = useState({})
  const [bc, setBc] = useState('')
  const [toast, setToast] = useState('')

  const notify = (m) => {
    setToast(m)
    setTimeout(() => setToast(''), 2500)
  }

  const load = useCallback(() => {
    api('/api/admin/overview')
      .then(setData)
      .catch(() => {})
  }, [])

  useEffect(() => {
    load()
    const iv = setInterval(load, 10000)
    return () => clearInterval(iv)
  }, [load])

  const patchUser = async (username, patch, thenNotify) => {
    await api('/api/admin/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, ...patch }),
    }).catch(() => {})
    load()
    if (thenNotify) notify(thenNotify)
  }

  const deleteUser = async (username) => {
    if (!window.confirm(`Hapus user @${username} dari server? Tindakan ini permanen.`)) return
    await api('/api/admin/user/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    }).catch(() => {})
    load()
    notify(`@${username} dihapus`)
  }

  const doBroadcast = async () => {
    const t = bc.trim()
    if (!t) return
    await api('/api/admin/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: t }),
    }).catch(() => {})
    setBc('')
    load()
    notify('Broadcast terkirim ke semua user online')
  }

  const onlineSet = new Set((data?.online || []).map((o) => o.username))

  return (
    <div className="min-h-screen bg-[#04060f] text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#04060f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Logo size="md" showWord={false} />
          <div className="min-w-0">
            <p className="font-display text-sm font-extrabold text-white">Admin Panel</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">IDNcheat · Server Control</p>
          </div>
          <span
            className={`ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold ${
              (data?.online || []).length > 0 ? 'bg-green-500/15 text-green-400' : 'bg-slate-700/40 text-slate-400'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {data?.totals?.online ?? 0} online
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Buka Website
            </a>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3.5 py-2 text-xs font-bold text-rose-400 transition hover:bg-rose-500/25"
            >
              <LogOut className="h-3.5 w-3.5" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {/* Statistik */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { icon: Users, label: 'Total User', value: data?.totals?.users, tone: 'text-blue-400' },
            { icon: Radio, label: 'Online Sekarang', value: data?.totals?.online, tone: 'text-green-400' },
            { icon: MessageSquare, label: 'Pesan Chat', value: data?.totals?.messages, tone: 'text-cyan-400' },
            { icon: Star, label: 'Total XP', value: data?.totals?.xpTotal?.toLocaleString('id-ID'), tone: 'text-amber-400' },
          ].map(({ icon: Icon, label, value, tone }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <Icon className={`h-5 w-5 ${tone}`} />
              <p className="mt-2 font-display text-2xl font-extrabold text-white">{value ?? '—'}</p>
              <p className="text-[11px] font-bold text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tabel user */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="font-display text-sm font-extrabold text-white">Data User ({data?.users?.length ?? 0})</p>
                <span className="text-[10px] font-bold text-slate-500">refresh otomatis 10 dtk</span>
              </div>
              <div className="divide-y divide-white/5">
                {(data?.users || []).length === 0 && (
                  <p className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                    Belum ada user terdaftar di server.
                  </p>
                )}
                {(data?.users || []).map((u) => (
                  <div key={u.username} className="flex flex-wrap items-center gap-3 px-4 py-3">
                    <Avatar user={u} size="sm" />
                    <div className="min-w-0 flex-1">
                      {editing === u.username ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            value={draft.name || ''}
                            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                            className="w-40 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-xs font-bold text-white outline-none focus:border-blue-400"
                            placeholder="Nama"
                          />
                          <input
                            value={draft.class || ''}
                            onChange={(e) => setDraft((d) => ({ ...d, class: e.target.value }))}
                            className="w-24 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-xs font-bold text-white outline-none focus:border-blue-400"
                            placeholder="Kelas"
                          />
                          <input
                            type="number"
                            value={draft.xp ?? 0}
                            onChange={(e) => setDraft((d) => ({ ...d, xp: Number(e.target.value) }))}
                            className="w-20 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-xs font-bold text-white outline-none focus:border-blue-400"
                            placeholder="XP"
                          />
                          <button
                            onClick={() => {
                              patchUser(u.username, { ...draft }, `@${u.username} disimpan`)
                              setEditing(null)
                            }}
                            className="grid h-7 w-7 place-items-center rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            title="Simpan"
                          >
                            <Save className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-slate-400 hover:bg-white/20"
                            title="Batal"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="truncate text-sm font-bold text-white">
                            {u.name}
                            {u.banned && (
                              <span className="ml-2 rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] font-extrabold uppercase text-rose-400">
                                Diblokir
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] font-semibold text-slate-500">
                            @{u.username} · {u.class || '—'} · terakhir {fmtSeen(u.lastSeen)}
                          </p>
                        </>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                        onlineSet.has(u.username) ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {onlineSet.has(u.username) ? 'ONLINE' : 'OFFLINE'}
                    </span>
                    <span className="w-16 text-right text-sm font-extrabold tabular-nums text-amber-400">
                      {u.xp}
                      <span className="ml-0.5 text-[9px] text-slate-500">XP</span>
                    </span>
                    {editing !== u.username && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditing(u.username)
                            setDraft({ name: u.name, class: u.class || '', xp: u.xp, streak: u.streak })
                          }}
                          className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-slate-300 transition hover:bg-blue-500/20 hover:text-blue-300"
                          title="Edit user"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            patchUser(u.username, { banned: !u.banned }, u.banned ? `@${u.username} diaktifkan` : `@${u.username} diblokir`)
                          }
                          className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                            u.banned
                              ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25'
                              : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25'
                          }`}
                          title={u.banned ? 'Aktifkan akun' : 'Blokir akun'}
                        >
                          {u.banned ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={() => deleteUser(u.username)}
                          className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 text-rose-400 transition hover:bg-rose-500/25"
                          title="Hapus user"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom kanan: broadcast + riwayat chat */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-3 font-display text-sm font-extrabold text-white">Broadcast ke Semua User</p>
              <textarea
                value={bc}
                onChange={(e) => setBc(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Pesan akan muncul di chat semua user yang online…"
                className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm font-semibold text-white outline-none transition focus:border-blue-400"
              />
              <button
                onClick={doBroadcast}
                disabled={!bc.trim()}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 py-2.5 text-sm font-extrabold text-white transition hover:brightness-110 disabled:opacity-50"
              >
                <Send className="h-4 w-4" /> Kirim Broadcast
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="font-display text-sm font-extrabold text-white">Riwayat Chat ({data?.history?.length ?? 0})</p>
              </div>
              <div className="max-h-80 space-y-2.5 overflow-y-auto p-4">
                {!(data?.history || []).length && (
                  <p className="py-6 text-center text-xs font-semibold text-slate-500">Belum ada pesan.</p>
                )}
                {[...(data?.history || [])].reverse().map((m, i) => (
                  <div key={`${m.ts}-${i}`} className="rounded-xl bg-black/30 px-3 py-2">
                    <p className="flex items-baseline justify-between gap-2 text-[10px] font-bold">
                      <span className={m.from?.admin ? 'text-blue-400' : 'text-cyan-400'}>
                        {m.from?.admin ? '🛡️ ' : ''}
                        {m.from?.name}
                      </span>
                      <span className="text-slate-500">{fmtSeen(m.ts)}</span>
                    </p>
                    <p className="mt-0.5 break-words text-xs font-semibold text-slate-300">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-blue-400/40 bg-[#0a1020] px-5 py-2.5 text-xs font-extrabold text-blue-300 shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  )
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_KEY) === '1'
    } catch {
      return false
    }
  })

  const login = () => {
    try {
      sessionStorage.setItem(ADMIN_KEY, '1')
    } catch {
      /* abaikan */
    }
    setAuthed(true)
  }
  const logout = () => {
    try {
      sessionStorage.removeItem(ADMIN_KEY)
    } catch {
      /* abaikan */
    }
    setAuthed(false)
  }

  return authed ? <AdminPanel onLogout={logout} /> : <AdminLogin onOk={login} />
}
