import React from 'react'
import { Trophy, Crown, ArrowRight, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { buildLeaderboard } from '../../data/leaderboard'
import Avatar from '../ui/Avatar'

/* =====================================================================
   Leaderboard Preview — Top 5 (widget dashboard), member NYATA saja
   ===================================================================== */

export default function LeaderboardPreview() {
  const { navigate } = useApp()
  const { user, users } = useAuth()
  const top5 = buildLeaderboard(users, user?.username).slice(0, 5)

  return (
    <div className="card flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/15">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display font-bold text-slate-900 dark:text-white">Top Member</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Berdasarkan XP total (user asli)</p>
          </div>
        </div>
        <button
          onClick={() => navigate('leaderboard')}
          className="text-xs font-bold text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
        >
          Semua →
        </button>
      </div>

      <ul className="mt-4 flex-1 space-y-1">
        {top5.length === 0 ? (
          <li className="flex flex-col items-center gap-2 px-3 py-8 text-center">
            <Users className="h-7 w-7 text-slate-300 dark:text-slate-600" />
            <p className="text-xs font-semibold text-slate-400">Belum ada member terdaftar</p>
          </li>
        ) : (
          top5.map((p) => (
            <li
              key={p.key}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                p.you
                  ? 'bg-brand-50 ring-1 ring-brand-200 dark:bg-brand-500/15 dark:ring-brand-500/30'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="w-5 text-center">
                {p.rank === 1 ? (
                  <Crown className="mx-auto h-[18px] w-[18px] text-amber-500" />
                ) : (
                  <span
                    className={`text-sm font-extrabold tabular-nums ${
                      p.rank <= 3 ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'
                    }`}
                  >
                    {p.rank}
                  </span>
                )}
              </span>
              <Avatar user={p} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold text-slate-800 dark:text-slate-100">
                  {p.name}
                  {p.you && (
                    <span className="ml-1.5 rounded-full bg-brand-600 px-1.5 py-0.5 text-[8px] font-extrabold uppercase text-white">
                      You
                    </span>
                  )}
                </span>
                {p.prog && <span className="block text-[11px] text-slate-400">{p.prog}</span>}
              </span>
              <span className="text-sm font-extrabold tabular-nums text-slate-700 dark:text-slate-200">
                {p.xp}
                <span className="ml-0.5 text-[10px] font-bold text-slate-400">XP</span>
              </span>
            </li>
          ))
        )}
      </ul>

      <button
        onClick={() => navigate('leaderboard')}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Lihat Papan Peringkat <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
