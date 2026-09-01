import React from 'react'
import {
  Home,
  BookOpen,
  ListChecks,
  Trophy,
  Medal,
  Settings,
  X,
  Flame,
  Sparkles,
} from 'lucide-react'
import { useApp, levelInfo } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, COURSES } from '../data/curriculum'
import { QUIZZES } from '../data/questions'
import Ring from './ui/Ring'

/* =====================================================================
   Sidebar — navigasi utama + pintasan kategori + kartu level
   (desktop: fixed kiri; mobile: drawer)
   ===================================================================== */

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'mycourses', label: 'Kursus Saya', icon: BookOpen },
  { key: 'quizzes', label: 'Kuis & Evaluasi', icon: ListChecks },
  { key: 'leaderboard', label: 'Papan Peringkat', icon: Trophy },
  { key: 'achievements', label: 'Pencapaian', icon: Medal },
  { key: 'settings', label: 'Pengaturan', icon: Settings },
]

function SidebarContent() {
  const { state, dispatch, navigate } = useApp()
  const { user } = useAuth()
  const lv = levelInfo(state.xp)

  const quizCount = COURSES.filter((c) => c.tiers.includes(state.tier) && QUIZZES[c.id]).length
  const enrolledCount = Object.entries(state.courseProgress).filter(
    ([id, v]) => v > 0 && COURSES.find((c) => c.id === id)?.tiers.includes(state.tier)
  ).length

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      {/* NAVIGASI */}
      <nav className="space-y-1" aria-label="Menu utama">
        <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
          Menu
        </p>
        {NAV.map(({ key, label, icon: Icon }) => {
          const active = state.page.name === key
          const badge = key === 'quizzes' ? quizCount : key === 'mycourses' ? enrolledCount : null
          return (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? 'border-brand-500/20 bg-gradient-to-r from-brand-500/15 to-violet-500/10 text-brand-800 dark:text-brand-300'
                  : 'border-transparent text-slate-600 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/80'
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition ${
                  active
                    ? 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-glow'
                    : 'border border-slate-200 bg-white text-slate-500 group-hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              {label}
              {badge ? (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    active
                      ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/25 dark:text-brand-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </nav>

      {/* PINTASAN KATEGORI */}
      <div>
        <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
          Bidang Keilmuan
        </p>
        <div className="space-y-0.5">
          {CATEGORIES.map((c) => {
            const Icon = c.icon
            const count = COURSES.filter((k) => k.category === c.id && k.tiers.includes(state.tier)).length
            return (
              <button
                key={c.id}
                onClick={() => {
                  dispatch({ type: 'SET_CATEGORY', id: c.id })
                  navigate('catalog')
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-slate-500 transition hover:bg-slate-100/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gradient-to-br ${c.gradient} text-white`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
                <span className="text-[10px] font-bold tabular-nums text-slate-400 dark:text-slate-500">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* KARTU LEVEL (dark slate, sesuai palet utama) */}
      <div className="relative mt-auto overflow-hidden rounded-2xl bg-ink p-4 text-white shadow-glass">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/40 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <Ring size={46} stroke={4.5} value={lv.pct} className="stroke-brand-400" trackClassName="stroke-white/15">
            <span className="text-xs font-extrabold">{lv.level}</span>
          </Ring>
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate font-display text-sm font-bold">
              <Sparkles className="h-3.5 w-3.5 text-brand-300" />
              {lv.rank}
            </p>
            <p className="text-[11px] text-slate-400">
              {lv.toNext} XP menuju Level {lv.level + 1}
            </p>
          </div>
        </div>
        <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-violet-400 transition-all duration-700"
            style={{ width: `${lv.pct * 100}%` }}
          />
        </div>
        <div className="relative mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
          <Flame className="h-4 w-4 fill-orange-300/30 text-orange-400" />
          <p className="text-xs font-bold">
            {state.streak} hari streak
            <span className="ml-1 font-medium text-slate-300">— jaga terus!</span>
          </p>
        </div>
        <p className="relative mt-2.5 truncate text-[11px] font-semibold text-slate-400">@{user?.username}</p>
      </div>

      {/* CREDITS */}
      <p className="mt-auto pt-1 text-center text-[10px] font-semibold tracking-wide text-slate-400/80 dark:text-slate-500">
        Developed by Nararya Irsyad Kelana
      </p>
    </div>
  )
}

export default function Sidebar() {
  const { state, dispatch } = useApp()

  return (
    <>
      {/* Desktop */}
      <aside className="fixed bottom-0 left-0 top-[67px] z-30 hidden w-64 border-r border-slate-200/70 bg-white/60 backdrop-blur-xl lg:block dark:border-slate-800 dark:bg-slate-950/60">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {state.sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 top-0 w-72 animate-slide-up bg-white/95 backdrop-blur-xl shadow-glass dark:bg-slate-900/95">
            <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3 dark:border-slate-700">
              <p className="font-display text-sm font-extrabold text-slate-800 dark:text-white">Menu IDNcheat</p>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-300"
                aria-label="Tutup menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-[calc(100%-57px)]">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
