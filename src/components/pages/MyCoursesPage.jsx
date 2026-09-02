import React from 'react'
import { Play, ListChecks, BookOpen } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { COURSES, categoryById } from '../../data/curriculum'
import { quizForCourse } from '../../data/questions'
import PageTitle from '../ui/PageTitle'
import IconTile from '../ui/IconTile'
import ProgressBar from '../ui/ProgressBar'
import Badge from '../ui/Badge'
import GameCover from '../ui/GameCover'
import { getLessons } from '../../data/curriculum'

/* =====================================================================
   Kursus Saya — kursus yang sedang dikerjakan (progress > 0)
   ===================================================================== */

export default function MyCoursesPage() {
  const { state, navigate } = useApp()
  const consoleMode = !!state.theme.console

  const enrolled = Object.entries(state.courseProgress)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([id, progress]) => ({ course: COURSES.find((c) => c.id === id), progress }))
    .filter((e) => e.course && e.course.tiers.includes(state.tier))

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle
        crumb="Profil Belajar"
        title="Kursus Saya"
        sub={`${enrolled.length} kursus sedang kamu kerjakan di jenjang ${
          state.tier === 'murojaah' ? 'Murojaah' : 'Upgrade'
        }.`}
      >
        <button onClick={() => navigate('catalog')} className="btn-ghost">
          <BookOpen className="h-4 w-4" /> Jelajahi lainnya
        </button>
      </PageTitle>

      {enrolled.length === 0 ? (
        <div className="card flex flex-col items-center px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <BookOpen className="h-7 w-7" />
          </span>
          <p className="mt-4 font-display text-lg font-bold text-slate-800 dark:text-white">
            Belum ada kursus di jenjang ini
          </p>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Mulai kursus pertamamu dari katalog, atau ganti jenjang Murojaah/Upgrade di header.
          </p>
          <button onClick={() => navigate('catalog')} className="btn-primary mt-5">
            Buka Katalog
          </button>
        </div>
      ) : consoleMode ? (
        /* Console Mode: rak cover game */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrolled.map(({ course, progress }) => {
            const cat = categoryById(course.category)
            return (
              <GameCover
                key={course.id}
                course={course}
                Icon={cat.icon}
                gradient={cat.gradient}
                progress={progress}
                lessonCount={getLessons(course).length}
                onClick={() => navigate('course', { courseId: course.id })}
              />
            )
          })}
        </div>
      ) : (
        <ul className="space-y-3">
          {enrolled.map(({ course, progress }) => {
            const cat = categoryById(course.category)
            const Icon = cat.icon
            const quiz = quizForCourse(course.id)
            return (
              <li key={course.id} className="card p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <IconTile Icon={Icon} gradient={cat.gradient} className="h-12 w-12 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[15px] font-bold text-slate-800 dark:text-white">
                        {course.title}
                      </h3>
                      <Badge tone={cat.id === 'diniyah' ? 'green' : 'indigo'}>{cat.name}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-slate-400">
                      {course.instructor} · {course.modules} modul
                    </p>
                    <div className="mt-2.5 max-w-md">
                      <div className="mb-1 flex justify-between text-[11px] font-bold">
                        <span className="text-slate-500 dark:text-slate-400">Progres</span>
                        <span className="text-brand-600 dark:text-brand-400">{progress}%</span>
                      </div>
                      <ProgressBar value={progress} />
                    </div>
                  </div>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <button
                      onClick={() => navigate('course', { courseId: course.id })}
                      className="btn-primary flex-1 !px-3 sm:flex-none"
                    >
                      <Play className="h-4 w-4" /> Lanjutkan
                    </button>
                    {quiz && (
                      <button
                        onClick={() => navigate('quiz', { courseId: course.id })}
                        className="btn-ghost flex-1 !px-3 sm:flex-none"
                        title="Kerjakan kuis evaluasi"
                      >
                        <ListChecks className="h-4 w-4 text-violet-500 dark:text-violet-400" /> Kuis
                      </button>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
