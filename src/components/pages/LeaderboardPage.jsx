import React, { useEffect, useState } from 'react'
import { Trophy, Crown, Flame, Medal, Users } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { buildLeaderboard } from '../../data/leaderboard'
import PageTitle from '../ui/PageTitle'
import Avatar from '../ui/Avatar'

/* Ambil roster user dari server (semua yang pernah login/register),
   refresh tiap 15 detik + saat window fokus. Fallback: user lokal. */
function useServerRoster() {
  const [rows, setRows] = useState(null)
  const [live, setLive] = useState(false)
  useEffect(() => {
    let on = true
    const load = () => {
      fetch('/api/users')
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!on || !d?.users) return
          setRows(d.users)
          setLive(true)
        })
        .catch(() => {})
    }
    load()
    const iv = setInterval(load, 15000)
    window.addEventListener('focus', load)
    return () => {
      on = false
      clearInterval(iv)
      window.removeEventListener('focus', load)
    }
  }, [])
  return { rows, live }
}

/* =====================================================================
   Papan Peringkat — hanya member NYATA yang sudah login/register.
   Podium top-3 + daftar sisanya (baris "you" = akun yang login).
   ===================================================================== */

const PODIUM_STYLE = {
  1: { tone: 'border-amber-300 dark:border-amber-500/50', text: 'text-amber-600 dark:text-amber-400', size: 'lg', medal: <Crown className="h-6 w-6 text-amber-500" />, order: 'sm:order-1' },
  2: { tone: 'border-slate-300 dark:border-slate-600', text: 'text-slate-500 dark:text-slate-400', size: 'sm', medal: <Medal className="h-5 w-5 text-slate-400" />, order: 'sm:order-2' },
  3: { tone: 'border-orange-300 dark:border-orange-500/50', text: 'text-orange-500', size: 'sm', medal: <Medal className="h-5 w-5 text-orange-400" />, order: 'sm:order-3' },
}

export default function LeaderboardPage() {
  const { user, users } = useAuth()
  const { rows: serverRows, live } = useServerRoster()
  // server = semua user lintas browser; lokal = fallback kalau server offline
  const source = live && serverRows && serverRows.length ? serverRows : users
  const rows = buildLeaderboard(source, user?.username)
  const top3 = rows.slice(0, 3)
  // urutan visual podium: 2, 1, 3
  const podium = [top3[1], top3[0], top3[2]].filter(Boolean)
  const rest = rows.slice(3)

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle
        crumb="Kompetisi"
        title="Papan Peringkat"
        sub={`${rows.length} member terdaftar di server IDNcheat${live ? ' (live)' : ''}. Setiap orang yang login/register langsung masuk ke sini — bukan data contoh.`}
      />

      {/* Podium (tampil jika ada minimal 1 member) */}
      {rows.length > 0 ? (
        <div className={`grid gap-3 ${rows.length === 1 ? 'grid-cols-1 sm:mx-auto sm:max-w-xs' : 'sm:grid-cols-3'}`}>
          {podium.map((p) => {
            const s = PODIUM_STYLE[p.rank]
            return (
              <div
                key={p.key}
                className={`card relative overflow-hidden border-2 ${s.tone} p-5 text-center ${s.order} ${
                  p.you ? 'ring-2 ring-brand-300 dark:ring-brand-500/50' : ''
                } ${s.size === 'lg' && rows.length > 1 ? 'sm:-mt-3 sm:mb-3' : ''}`}
              >
                <div
                  className={`pointer-events-none absolute -top-8 ${p.rank === 1 ? 'left-1/2 -translate-x-1/2' : 'right-2'} h-24 w-24 rounded-full bg-amber-200/40 blur-2xl dark:bg-amber-500/10`}
                />
                <Avatar user={p} size="lg" className="relative !h-14 !w-14 !text-lg ring-4 ring-white dark:ring-slate-900" />
                <div className="relative mt-2 flex items-center justify-center">{s.medal}</div>
                <p className="mt-1 truncate font-display text-sm font-extrabold text-slate-900 dark:text-white">
                  {p.name}
                  {p.you && (
                    <span className="ml-1.5 rounded-full bg-brand-600 px-1.5 py-0.5 align-middle text-[8px] font-extrabold uppercase text-white">
                      You
                    </span>
                  )}
                </p>
                {p.prog && <p className="text-[11px] font-semibold text-slate-400">{p.prog}</p>}
                <p className={`mt-2 font-display text-xl font-extrabold ${s.text}`}>
                  {p.xp.toLocaleString('id-ID')}
                  <span className="ml-1 text-[10px] font-bold text-slate-400">XP</span>
                </p>
                <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-extrabold text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                  <Flame className="h-3 w-3" /> {p.streak} hari
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card flex flex-col items-center px-6 py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <Users className="h-7 w-7" />
          </span>
          <p className="mt-4 font-display text-lg font-bold text-slate-800 dark:text-white">Belum ada member</p>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Papan peringkat berisi user asli yang sudah login. Ajak temanmu register untuk mulai berkip!
          </p>
        </div>
      )}

      {/* Sisanya */}
      {rest.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {rest.map((p) => (
            <li
              key={p.key}
              className={`flex items-center gap-3.5 rounded-xl border p-3.5 ${
                p.you
                  ? 'border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10'
                  : 'border-slate-200/70 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <span className="w-7 text-center font-display text-sm font-extrabold tabular-nums text-slate-400">
                {p.rank}
              </span>
              <Avatar user={p} size="md" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-800 dark:text-white">
                  {p.name}
                  {p.you && (
                    <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-[9px] font-extrabold uppercase text-white">
                      You
                    </span>
                  )}
                </span>
                {p.prog && <span className="block text-[11px] text-slate-400">{p.prog}</span>}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-extrabold text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                <Flame className="h-3 w-3" /> {p.streak}
              </span>
              <span className="w-20 text-right text-sm font-extrabold tabular-nums text-slate-700 dark:text-slate-200">
                {p.xp.toLocaleString('id-ID')}
                <span className="ml-0.5 text-[10px] font-bold text-slate-400">XP</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {rows.length <= 2 && (
        <p className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
          <Trophy className="h-4 w-4 text-amber-500" />
          Papan akan makin ramai saat member lain login — XP dari kuis, materi, dan target harian.
        </p>
      )}
    </div>
  )
}
