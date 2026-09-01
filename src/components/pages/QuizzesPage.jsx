import React from 'react'
import { ListChecks, Play, RotateCcw, Star, CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { COURSES, categoryById } from '../../data/curriculum'
import { quizForCourse, quizXpTotal } from '../../data/questions'
import PageTitle from '../ui/PageTitle'
import IconTile from '../ui/IconTile'
import Badge from '../ui/Badge'

/* =====================================================================
   Kuis & Evaluasi — semua kuis (filter jenjang), status & skor
   ===================================================================== */

export default function QuizzesPage() {
  const { state, navigate } = useApp()

  const rows = COURSES.filter((c) => c.tiers.includes(state.tier))
    .map((course) => ({ course, quiz: quizForCourse(course.id) }))
    .filter((r) => r.quiz)

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle
        crumb="Evaluasi"
        title="Kuis & Evaluasi"
        sub={`${rows.length} kuis tersedia untuk jenjang ${
          state.tier === 'murojaah' ? 'Murojaah (TK–SD)' : 'Upgrade (SMP–SMK)'
        }. Kumpulkan XP, jaga streak, dan buktikan pemahamanmu!`}
      />

      <ul className="grid gap-4 md:grid-cols-2">
        {rows.map(({ course, quiz }) => {
          const cat = categoryById(course.category)
          const Icon = cat.icon
          const done = state.completedQuizzes[course.id]
          return (
            <li key={course.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <IconTile Icon={Icon} gradient={cat.gradient} className="h-11 w-11 rounded-xl" />
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold text-slate-800 dark:text-white">
                      {quiz.title}
                    </p>
                    <p className="truncate text-[11px] font-semibold text-slate-400">
                      {cat.name} · {course.title}
                    </p>
                  </div>
                </div>
                {done ? (
                  <Badge tone="green">
                    <CheckCircle2 className="h-3 w-3" /> {done.score}%
                  </Badge>
                ) : (
                  <Badge tone="slate">Belum dikerjakan</Badge>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <ListChecks className="h-3.5 w-3.5" /> {quiz.questions.length} soal
                </span>
                <span className="text-slate-400 dark:text-slate-500">
                  {quiz.questions.filter((x) => x.type === 'mc').length} PG ·{' '}
                  {quiz.questions.filter((x) => x.type === 'essay').length} Essay
                </span>
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-300 dark:fill-amber-400/50" /> +{quizXpTotal(quiz)} XP
                </span>
              </div>

              <div className="mt-auto pt-4">
                <button
                  onClick={() => navigate('quiz', { courseId: course.id })}
                  className={
                    done
                      ? 'btn-ghost w-full'
                      : 'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 active:scale-[.98]'
                  }
                >
                  {done ? (
                    <>
                      <RotateCcw className="h-4 w-4" /> Ulangi Kuis
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Kerjakan Sekarang
                    </>
                  )}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
