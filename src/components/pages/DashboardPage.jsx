import React from 'react'
import { TrendingUp, Sparkles, ListChecks } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { COURSES } from '../../data/curriculum'
import { POPULAR_NOW } from '../../data/mockData'
import ContinueLearning from '../widgets/ContinueLearning'
import CategoryGrid from '../widgets/CategoryGrid'
import DailyTarget from '../widgets/DailyTarget'
import LeaderboardPreview from '../widgets/LeaderboardPreview'
import StreakCard from '../widgets/StreakCard'

/* =====================================================================
   Dashboard — Continue Learning · Grid Kategori · Target Harian
   · Leaderboard · Streak · Populer Minggu Ini
   ===================================================================== */

function Greeting() {
  const { navigate, state } = useApp()
  const { user } = useAuth()
  const firstName = (user?.name || 'Siswa').split(' ')[0]
  const date = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          Selamat datang kembali, {firstName} <span aria-hidden>👋</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {date} — lanjutkan streak{' '}
          <span className="font-bold text-orange-500">{state.streak} hari</span> dan kejar target
          harianmu!
        </p>
      </div>
      <button onClick={() => navigate('quizzes')} className="btn-ghost">
        <ListChecks className="h-4 w-4 text-brand-500" />
        Kerjakan Kuis
      </button>
    </div>
  )
}

function PopularNow() {
  const { navigate } = useApp()
  return (
    <div className="card flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-100 text-rose-500 dark:bg-rose-500/15">
          <TrendingUp className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-bold text-slate-900 dark:text-white">Populer Minggu Ini</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sedang banyak dikerjakan</p>
        </div>
      </div>
      <ul className="mt-4 flex-1 space-y-1">
        {POPULAR_NOW.map((p, i) => {
          const c = COURSES.find((x) => x.id === p.id)
          if (!c) return null
          return (
            <li key={p.id}>
              <button
                onClick={() => navigate('course', { courseId: c.id })}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <span className="w-4 font-display text-sm font-extrabold text-slate-300 dark:text-slate-600">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-bold text-slate-800 dark:text-slate-100">
                    {c.title}
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-400">{p.tag}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-extrabold text-green-600 dark:bg-green-500/15 dark:text-green-400">
                  <TrendingUp className="h-3 w-3" />
                  {p.viewers}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Greeting />

      {/* Continue Learning + Target Harian */}
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ContinueLearning />
        </div>
        <DailyTarget />
      </div>

      {/* Grid 8 kategori */}
      <CategoryGrid />

      {/* Leaderboard + Streak + Populer */}
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <LeaderboardPreview />
        <StreakCard />
        <PopularNow />
      </div>

      {/* Footer brand */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2 text-center text-xs font-semibold text-slate-400 dark:text-slate-500">
        <Sparkles className="h-3.5 w-3.5 text-brand-400" />
        IDNcheat — Pilar Kurikulum IDN Boarding School Pamijahan: IT · Diniyah Salaf · Bahasa
      </div>
    </div>
  )
}
