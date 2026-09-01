import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES, COURSES, TIERS } from '../../data/curriculum'

/* =====================================================================
   Category Grid — 8 bidang keilmuan IDN Pamijahan
   (filtered by jenjang: Murojaah / Upgrade)
   ===================================================================== */

export default function CategoryGrid() {
  const { state, dispatch, navigate } = useApp()
  const tier = TIERS[state.tier]

  const stats = (catId) => {
    const list = COURSES.filter((c) => c.category === catId && c.tiers.includes(state.tier))
    return {
      courses: list.length,
      modules: list.reduce((s, c) => s + c.modules, 0),
    }
  }

  return (
    <section>
      <header className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            8 Bidang Keilmuan IDN Pamijahan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kurikulum pilar IT, Diniyah Salaf &amp; Bahasa — jenjang{' '}
            <span className="font-bold text-brand-600 dark:text-brand-400">{tier.label}</span> ({tier.sub})
          </p>
        </div>
        <button
          onClick={() => {
            dispatch({ type: 'SET_CATEGORY', id: null })
            navigate('catalog')
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition hover:gap-2.5 hover:text-brand-700 dark:text-brand-400"
        >
          Katalog lengkap <ArrowRight className="h-4 w-4" />
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const s = stats(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', id: cat.id })
                navigate('catalog')
              }}
              className="card group p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-glass dark:hover:border-brand-500/40"
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-sm transition-transform group-hover:scale-105`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600" />
              </div>
              <p className="mt-3 font-display text-[15px] font-bold leading-snug text-slate-800 group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-400">
                {cat.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {cat.sub} · {cat.desc}
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {s.courses} kursus
                </span>
                <span className={`rounded-full border px-2 py-0.5 ${cat.tint}`}>{s.modules} modul</span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
