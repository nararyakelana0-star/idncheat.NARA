import React from 'react'
import { Lock, Check } from 'lucide-react'
import { ACHIEVEMENTS, BADGE_ICONS } from '../../data/mockData'
import PageTitle from '../ui/PageTitle'

/* =====================================================================
   Pencapaian — kisi badge terbuka & terkunci
   ===================================================================== */

export default function AchievementsPage() {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length
  const pct = Math.round((unlocked / ACHIEVEMENTS.length) * 100)

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle
        crumb="Gamifikasi"
        title="Pencapaian"
        sub="Buka badge dengan konsisten belajar, menyelesaikan kuis, dan menjaga streak."
      />

      <div className="card mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-sm font-bold text-slate-800 dark:text-white">
            {unlocked} dari {ACHIEVEMENTS.length} prestasi terbuka
          </p>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            {pct}%
          </span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const Icon = BADGE_ICONS[a.icon] || BADGE_ICONS.sparkles
          return (
            <div
              key={a.id}
              className={`card relative p-5 transition ${
                a.unlocked ? 'hover:-translate-y-0.5 hover:shadow-glass' : 'opacity-70'
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${a.tone} dark:opacity-90 ${
                    a.unlocked ? '' : 'grayscale'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                {a.unlocked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-extrabold text-green-700 dark:bg-green-500/15 dark:text-green-300">
                    <Check className="h-3 w-3" /> Terbuka
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <Lock className="h-3 w-3" /> Terkunci
                  </span>
                )}
              </div>
              <p className="mt-3 font-display text-sm font-bold text-slate-800 dark:text-white">{a.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{a.desc}</p>
              {!a.unlocked && a.progress && (
                <p className="mt-2 text-[11px] font-extrabold text-brand-600 dark:text-brand-400">
                  Progres: {a.progress}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
