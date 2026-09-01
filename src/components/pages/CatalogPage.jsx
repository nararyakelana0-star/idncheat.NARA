import React from 'react'
import { Layers, BookOpen, Star, Search, X, Play, SearchX } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES, COURSES, TIERS, getLessons } from '../../data/curriculum'
import PageTitle from '../ui/PageTitle'
import Badge from '../ui/Badge'
import IconTile from '../ui/IconTile'
import ProgressBar from '../ui/ProgressBar'

/* =====================================================================
   Course Catalog — filter jenjang (Murojaah/Upgrade) + kategori
   + pencarian global, kartu kursus dengan progress
   ===================================================================== */

function CourseCard({ course }) {
  const { state, navigate } = useApp()
  const cat = CATEGORIES.find((c) => c.id === course.category)
  const Icon = cat.icon
  const progress = state.courseProgress[course.id] || 0

  return (
    <div className="card group flex flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-glass dark:hover:border-brand-500/40">
      <div className="flex items-start justify-between gap-2">
        <IconTile Icon={Icon} gradient={cat.gradient} />
        <div className="flex flex-wrap justify-end gap-1.5">
          {course.cert && (
            <Badge tone="cyan">
              <Layers className="h-3 w-3" /> {course.cert}
            </Badge>
          )}
          {course.tiers.includes('murojaah') && <Badge tone="amber">TK–SD</Badge>}
          {course.tiers.includes('upgrade') && <Badge tone="indigo">SMP–SMK</Badge>}
        </div>
      </div>

      <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-slate-800 transition group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-400">
        {course.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
        {course.desc}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1">
          <Layers className="h-3.5 w-3.5" /> {course.modules} modul
        </span>
        <span className="inline-flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" /> {getLessons(course).length} materi
        </span>
        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
          <Star className="h-3.5 w-3.5 fill-amber-300 dark:fill-amber-400/50" /> {course.xp} XP
        </span>
        <span className="text-slate-400 dark:text-slate-500">· {course.level}</span>
      </div>

      {progress > 0 && (
        <div className="mt-3.5">
          <div className="mb-1 flex items-center justify-between text-[11px] font-bold">
            <span className="text-slate-500 dark:text-slate-400">Dikerjakan</span>
            <span className="text-brand-600 dark:text-brand-400">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      )}

      <div className="mt-auto pt-4">
        <button
          onClick={() => navigate('course', { courseId: course.id })}
          className={`w-full rounded-xl py-2.5 text-sm font-bold text-white shadow-sm transition active:scale-[.98] ${
            progress > 0
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
              : 'bg-brand-600 hover:bg-brand-700'
          }`}
        >
          {progress > 0 ? (
            <span className="inline-flex items-center gap-2">
              <Play className="h-4 w-4" /> Lanjutkan
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Mulai Belajar
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  const { state, dispatch } = useApp()
  const cat = CATEGORIES.find((c) => c.id === state.activeCategory)
  const q = state.search.trim().toLowerCase()
  const tier = TIERS[state.tier]

  const filtered = COURSES.filter(
    (c) =>
      c.tiers.includes(state.tier) &&
      (!state.activeCategory || c.category === state.activeCategory) &&
      (!q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
  )

  const totalModules = filtered.reduce((s, c) => s + c.modules, 0)

  return (
    <div>
      <PageTitle
        crumb="Katalog"
        title={cat ? cat.name : 'Semua Kursus'}
        sub={
          cat
            ? `${cat.sub} — ${cat.desc}`
            : `Katalog lengkap ${tier.label} (${tier.sub}) — ${filtered.length} kursus · ${totalModules} modul`
        }
      >
        <Badge tone={state.tier === 'murojaah' ? 'amber' : 'indigo'} className="!text-[11px]">
          {state.tier === 'murojaah' ? '📗' : '🚀'} Jenjang {tier.label}
        </Badge>
      </PageTitle>

      {/* Tier toggle (mobile — header-nya disembunyikan di layar kecil) */}
      <div className="mb-4 flex items-center rounded-full bg-ink p-1 shadow-inner dark:bg-slate-800 sm:hidden">
        {Object.values(TIERS).map((t) => {
          const active = state.tier === t.id
          return (
            <button
              key={t.id}
              onClick={() => dispatch({ type: 'SET_TIER', tier: t.id })}
              className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                active ? 'bg-white text-slate-900' : 'text-slate-300'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Chips kategori */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => dispatch({ type: 'SET_CATEGORY', id: null })}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
            !state.activeCategory
              ? 'bg-ink text-white shadow dark:bg-slate-700'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          Semua
        </button>
        {CATEGORIES.map((c) => {
          const Icon = c.icon
          const active = state.activeCategory === c.id
          return (
            <button
              key={c.id}
              onClick={() => dispatch({ type: 'SET_CATEGORY', id: c.id })}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                active
                  ? `bg-gradient-to-r ${c.gradient} text-white shadow`
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {c.name}
            </button>
          )
        })}
      </div>

      {/* Status pencarian */}
      {q && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 dark:border-brand-500/30 dark:bg-brand-500/10">
          <p className="text-sm font-semibold text-brand-800 dark:text-brand-300">
            <Search className="mr-1.5 inline h-4 w-4" />
            {filtered.length} hasil untuk “{state.search.trim()}”
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_SEARCH', value: '' })}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-brand-600 hover:bg-brand-100 dark:text-brand-300 dark:hover:bg-brand-500/20"
          >
            <X className="h-3.5 w-3.5" /> Bersihkan
          </button>
        </div>
      )}

      {/* Grid kursus */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <SearchX className="h-7 w-7" />
          </span>
          <p className="mt-4 font-display text-lg font-bold text-slate-800 dark:text-white">
            Tidak ada kursus yang cocok
          </p>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Coba ganti kata kunci, pilih kategori lain, atau ubah jenjang pembelajaran.
          </p>
          <button
            onClick={() => {
              dispatch({ type: 'SET_SEARCH', value: '' })
              dispatch({ type: 'SET_CATEGORY', id: null })
            }}
            className="btn-primary mt-5"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  )
}
