import React from 'react'
import { ArrowLeft, CalendarClock } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { courseById } from '../../data/curriculum'
import { quizForCourse } from '../../data/questions'
import QuizEngine from '../quiz/QuizEngine'

/* =====================================================================
   Quiz Page — wrapper QuizEngine (per kursus)
   ===================================================================== */

export default function QuizPage() {
  const { state, navigate } = useApp()
  const course = courseById(state.page.payload.courseId)

  if (!course) {
    return (
      <div className="card p-10 text-center">
        <p className="font-display text-lg font-bold text-slate-800 dark:text-white">Kuis tidak ditemukan</p>
        <button onClick={() => navigate('quizzes')} className="btn-primary mt-4">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>
      </div>
    )
  }

  const quiz = quizForCourse(course.id)
  if (!quiz) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card p-10 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <CalendarClock className="h-7 w-7" />
          </span>
          <h2 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
            Kuis untuk “{course.title}” segera hadir
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tim kurikulum sedang menyiapkan soal evaluasi untuk kursus ini.
          </p>
          <button
            onClick={() => navigate('course', { courseId: course.id })}
            className="btn-primary mt-5"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Kursus
          </button>
        </div>
      </div>
    )
  }

  return <QuizEngine key={course.id} course={course} quiz={quiz} />
}
