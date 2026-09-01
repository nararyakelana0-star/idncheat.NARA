import React from 'react'
import { Play, ArrowRight, Flame } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { COURSES, categoryById } from '../../data/curriculum'
import IconTile from '../ui/IconTile'

/* =====================================================================
   Continue Learning — hero card gelap (slate #1E293B) dengan
   glass chip, progress bar & CTA "Lanjutkan"
   ===================================================================== */

export default function ContinueLearning() {
  const { state, navigate } = useApp()
  const entries = Object.entries(state.courseProgress)
    .filter(([, v]) => v > 0 && v < 100)
    .sort((a, b) => b[1] - a[1])
    .map(([id, v]) => ({ course: COURSES.find((c) => c.id === id), progress: v }))
    .filter((e) => e.course)

  const main = entries.slice(0, 2)
  const rest = entries.slice(2)

  const nextLessonOf = (course) => {
    const lessons = course.lessonsData || []
    const nl = lessons.find((l) => l.type !== 'quiz' && !l.done)
    return nl ? nl.title : 'Materi berikutnya'
  }

  return (
    <div className="relative h-full overflow-hidden rounded-3xl bg-ink p-5 text-white shadow-glass sm:p-6">
      {/* dekorasi blob glass */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-2xl border border-white/10 backdrop-blur-sm" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-300">
            Lanjutkan Belajar
          </p>
          <h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">
            Ambil alih di mana kamu berhenti
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
          <Flame className="h-3.5 w-3.5 fill-orange-300/40 text-orange-400" />
          {state.streak}-day streak
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="relative mt-5 grid place-items-center rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
          <div>
            <p className="font-display text-base font-bold">Belum ada kursus yang dimulai</p>
            <p className="mt-1 text-xs text-slate-300">
              Buka katalog dan mulai kursus pertamamu — progresnya akan muncul di sini.
            </p>
            <button
              onClick={() => navigate('catalog')}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Jelajahi Katalog <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative mt-5 grid gap-3 md:grid-cols-2">
            {main.map(({ course, progress }) => {
              const cat = categoryById(course.category)
              const Icon = cat.icon
              return (
                <button
                  key={course.id}
                  onClick={() => navigate('course', { courseId: course.id })}
                  className="group rounded-2xl border border-white/10 bg-white/10 p-4 text-left backdrop-blur-sm transition hover:border-brand-300/40 hover:bg-white/15"
                >
                  <div className="flex items-center justify-between">
                    <IconTile Icon={Icon} gradient={cat.gradient} className="h-10 w-10 rounded-xl" />
                    <span className="text-sm font-extrabold tabular-nums text-brand-300">
                      {progress}%
                    </span>
                  </div>
                  <p className="mt-3 truncate font-display font-bold">{course.title}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-300">Lanjut: {nextLessonOf(course)}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-400 to-violet-400 transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {Math.max(0, course.modules - Math.round((progress / 100) * course.modules))}{' '}
                      modul tersisa
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white">
                      <Play className="h-3.5 w-3.5" /> Lanjutkan
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {rest.length > 0 && (
            <div className="relative mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Juga dikerjakan:
              </span>
              {rest.map(({ course, progress }) => (
                <button
                  key={course.id}
                  onClick={() => navigate('course', { courseId: course.id })}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/15"
                >
                  <span className="h-1.5 w-10 overflow-hidden rounded-full bg-white/15">
                    <span className="block h-full rounded-full bg-brand-400" style={{ width: `${progress}%` }} />
                  </span>
                  <span className="max-w-[120px] truncate">{course.title}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
