import React, { useState } from 'react'
import { Trophy, Crown, Flame, Medal } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { LEADERBOARD, avatarGradient, initials } from '../../data/mockData'
import PageTitle from '../ui/PageTitle'

/* =====================================================================
   Papan Peringkat — tab Mingguan / Bulanan / Semua Waktu
   Podium top-3 + daftar sisanya (baris "you" = akun yang login)
   ===================================================================== */

const TABS = [
  { id: 'mingguan', label: 'Mingguan' },
  { id: 'bulanan', label: 'Bulanan' },
  { id: 'semua', label: 'Semua Waktu' },
]

const PODIUM_STYLE = [
  // [2nd, 1st, 3rd]
  { order: 'sm:order-2', tone: 'border-slate-300 dark:border-slate-600', text: 'text-slate-500 dark:text-slate-400', size: 'sm', medal: <Medal className="h-5 w-5 text-slate-400" /> },
  { order: 'sm:order-1', tone: 'border-amber-300 dark:border-amber-500/50', text: 'text-amber-600 dark:text-amber-400', size: 'lg', medal: <Crown className="h-6 w-6 text-amber-500" /> },
  { order: 'sm:order-3', tone: 'border-orange-300 dark:border-orange-500/50', text: 'text-orange-500', size: 'sm', medal: <Medal className="h-5 w-5 text-orange-400" /> },
]

export default function LeaderboardPage() {
  const [tab, setTab] = useState('mingguan')
  const { user } = useAuth()
  const youName = user?.name || 'Kamu'
  const rows = LEADERBOARD[tab]
  const top3 = rows.slice(0, 3)
  // podium: 2, 1, 3
  const podium = [top3[1], top3[0], top3[2]].filter(Boolean)
  const rest = rows.slice(3)

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle
        crumb="Kompetisi"
        title="Papan Peringkat"
        sub="Berlomba dengan teman sekelas dan se-jenjang. XP mingguan dihitung dari kuis, materi, dan target harian."
      />

      {/* Tab */}
      <div className="mb-6 inline-flex items-center rounded-full bg-white p-1 shadow-card dark:bg-slate-900">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
              tab === t.id ? 'bg-ink text-white shadow dark:bg-slate-700' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid gap-3 sm:grid-cols-3">
        {podium.map((p, i) => {
          const s = PODIUM_STYLE[i]
          return (
            <div
              key={p.name}
              className={`card relative overflow-hidden border-2 ${s.tone} p-5 text-center ${s.order} ${
                p.you ? 'ring-2 ring-brand-300 dark:ring-brand-500/50' : ''
              } ${s.size === 'lg' ? 'sm:-mt-3 sm:mb-3' : ''}`}
            >
              <div
                className={`pointer-events-none absolute -top-8 ${i === 1 ? 'left-1/2 -translate-x-1/2' : 'right-2'} h-24 w-24 rounded-full bg-amber-200/40 blur-2xl dark:bg-amber-500/10`}
              />
              <span
                className={`relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br text-lg font-extrabold text-white ring-4 ring-white shadow dark:ring-slate-900 ${avatarGradient(p.you ? youName : p.name)}`}
              >
                {initials(p.you ? youName : p.name)}
              </span>
              <div className="relative mt-2 flex items-center justify-center">{s.medal}</div>
              <p className="mt-1 truncate font-display text-sm font-extrabold text-slate-900 dark:text-white">
                {p.you ? youName : p.name}
              </p>
              <p className="text-[11px] font-semibold text-slate-400">{p.prog}</p>
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

      {/* Sisanya */}
      <ul className="mt-4 space-y-1.5">
        {rest.map((p) => (
          <li
            key={p.name}
            className={`flex items-center gap-3.5 rounded-xl border p-3.5 ${
              p.you
                ? 'border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10'
                : 'border-slate-200/70 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <span className="w-7 text-center font-display text-sm font-extrabold tabular-nums text-slate-400">
              {p.rank}
            </span>
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-extrabold text-white ${avatarGradient(p.you ? youName : p.name)}`}
            >
              {initials(p.you ? youName : p.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-slate-800 dark:text-white">
                {p.you ? youName : p.name}
                {p.you && (
                  <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-[9px] font-extrabold uppercase text-white">
                    You
                  </span>
                )}
              </span>
              <span className="block text-[11px] font-semibold text-slate-400">{p.prog}</span>
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-extrabold text-orange-600 sm:inline-flex dark:bg-orange-500/15 dark:text-orange-400">
              <Flame className="h-3 w-3" /> {p.streak}
            </span>
            <span className="text-sm font-extrabold tabular-nums text-slate-700 dark:text-slate-200">
              {p.xp.toLocaleString('id-ID')}
              <span className="ml-0.5 text-[10px] font-bold text-slate-400">XP</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
        <Trophy className="h-4 w-4 text-amber-400" />
        Pemenang mingguan menerima bonus +200 XP &amp; prestasi “Top Performer”
      </div>
    </div>
  )
}
