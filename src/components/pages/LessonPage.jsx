import React from 'react'
import {
  ArrowLeft,
  FileText,
  PenLine,
  ListChecks,
  Check,
  Clock,
  Lightbulb,
  Play,
  BookOpenCheck,
  ChevronRight,
  Dumbbell,
} from 'lucide-react'
import { useApp, levelInfo } from '../../context/AppContext'
import { courseById, categoryById, getLessons } from '../../data/curriculum'
import { LESSON_CONTENT } from '../../data/lessonContent'
import { quizForCourse, quizXpTotal } from '../../data/questions'
import { dailyChallenge, levelBand, BAND_LABEL } from '../../data/challenges'
import Badge from '../ui/Badge'
import IconTile from '../ui/IconTile'
import ProgressBar from '../ui/ProgressBar'

/* =====================================================================
   Lesson — halaman belajar satu materi
   Ringkasan materi (poin penting + tips) → Tandai Selesai → +XP,
   progres kursus naik otomatis, lanjut ke materi berikutnya.
   ===================================================================== */

const TYPE_META = {
  reading: { icon: FileText, label: 'Bacaan' },
  practice: { icon: PenLine, label: 'Praktik' },
  quiz: { icon: ListChecks, label: 'Kuis' },
}

const XP_PER_LESSON = 10

export default function LessonPage() {
  const { state, navigate, addXp, dispatch } = useApp()
  const { courseId, lessonIndex = 0 } = state.page.payload
  const course = courseById(courseId)

  if (!course) {
    return (
      <div className="card p-10 text-center">
        <p className="font-display text-lg font-bold text-slate-800 dark:text-white">Kursus tidak ditemukan</p>
        <button onClick={() => navigate('catalog')} className="btn-primary mt-4">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Katalog
        </button>
      </div>
    )
  }

  const cat = categoryById(course.category)
  const Icon = cat.icon
  const lessons = getLessons(course)
  const idx = Math.max(0, Math.min(lessonIndex, lessons.length - 1))
  const lesson = lessons[idx]
  const progress = state.courseProgress[course.id] || 0
  const completedCount = Math.round((progress / 100) * lessons.length)
  const isDone = idx < completedCount
  const content = (LESSON_CONTENT[course.id] || [])[idx]
  const next = lessons[idx + 1]
  const meta = TYPE_META[lesson.type] || TYPE_META.reading
  const MetaIcon = meta.icon
  const quiz = quizForCourse(course.id)
  const completedQuiz = state.completedQuizzes[course.id]
  const lv = levelInfo(state.xp)
  const band = levelBand(lv.level)
  const challenge = dailyChallenge(course.category, lv.level, idx)

  const goNext = () => {
    if (next) {
      if (next.type === 'quiz') navigate('quiz', { courseId: course.id })
      else navigate('lesson', { courseId: course.id, lessonIndex: idx + 1 })
    } else {
      navigate('course', { courseId: course.id })
    }
  }

  const markDone = () => {
    if (isDone || lesson.type === 'quiz') return
    const value = Math.max(progress, Math.round(((idx + 1) / lessons.length) * 100))
    dispatch({ type: 'SET_PROGRESS', courseId: course.id, value })
    addXp(XP_PER_LESSON, `Materi “${lesson.title}” selesai`)
    goNext()
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate('course', { courseId: course.id })}
        className="console-hide mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
      >
        <ArrowLeft className="h-4 w-4" /> {course.title}
      </button>

      {/* Header materi — hero visual */}
      <div className="card overflow-hidden">
        <div className={`relative bg-gradient-to-br ${cat.gradient} px-5 py-7 sm:px-7 sm:py-8`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '18px 18px' }} aria-hidden="true" />
          <div className="relative">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/80">
              {cat.name} · {course.title}
            </p>
            <div className="mt-2 flex items-start gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 text-white shadow-lg backdrop-blur-sm">
                <MetaIcon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h1 className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                  {lesson.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-white/85">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {lesson.minutes} mnt
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BookOpenCheck className="h-3.5 w-3.5" /> {meta.label}
                  </span>
                  <span>Materi {idx + 1} / {lessons.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-400">Progres kursus</span>
            <span className="text-brand-600 dark:text-brand-400">{progress}%</span>
          </div>
          <ProgressBar value={progress} size="h-2.5" />
        </div>
      </div>

      {/* Konten */}
      <div className="card mt-5 p-5 sm:p-6">
        {lesson.type === 'quiz' ? (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-glow">
              <ListChecks className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-lg font-extrabold text-slate-900 dark:text-white">
              Kuis Harian {course.title}
            </h2>
            <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              5 soal pilihan ganda yang susunannya BERUBAH SETIAP HARI — besok kamu akan
              mendapatkan set soal baru.
              {quiz && (
                <>
                  {' '}
                  Jawaban benar memberi
                  {' '}
                  <span className="font-extrabold text-amber-600 dark:text-amber-400">+{quizXpTotal(quiz)} XP</span>.
                </>
              )}
            </p>
            {completedQuiz && (
              <p className="mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-extrabold text-green-700 dark:bg-green-500/15 dark:text-green-300">
                <Check className="h-3.5 w-3.5" /> Sudah selesai · Skor {completedQuiz.score}%
              </p>
            )}
            <button
              onClick={() => navigate('quiz', { courseId: course.id })}
              className="btn-primary mt-5"
            >
              <Play className="h-4 w-4" /> {completedQuiz ? 'Ulangi Kuis' : 'Kerjakan Kuis'}
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Ringkasan Materi
            </p>
            <ol className="mt-4 space-y-3.5">
              {(content?.p || []).map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-[11px] font-extrabold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{pt}</p>
                </li>
              ))}
            </ol>
            {content?.t && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 dark:border-amber-500/30 dark:bg-amber-500/10">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-[13px] font-semibold leading-relaxed text-amber-800 dark:text-amber-200">
                  {content.t}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Tantangan praktikum harian — berubah sesuai level & hari */}
      {lesson.type !== 'quiz' && (
        <div className="card mt-5 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4 dark:border-white/5 sm:px-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow">
              <Dumbbell className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-extrabold text-slate-900 dark:text-white">
                Tantangan Praktikum Harian
              </p>
              <p className="text-[11px] font-semibold text-slate-400">
                Perubahan tantangan setiap hari & setiap naik level
              </p>
            </div>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
              Level {lv.level} · {BAND_LABEL[band]}
            </span>
          </div>
          <p className="p-4 text-sm leading-relaxed text-slate-700 sm:p-5 dark:text-slate-200">
            {challenge}
          </p>
        </div>
      )}

      {/* Aksi */}
      <div className="card mt-5 p-4 sm:p-5">
        {lesson.type !== 'quiz' && !isDone && (
          <button
            onClick={markDone}
            className="btn-primary flex w-full items-center justify-center gap-2 !py-3.5"
          >
            <Check className="h-4 w-4" /> Tandai Selesai & Lanjutkan
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold">
              +{XP_PER_LESSON} XP
            </span>
          </button>
        )}
        {lesson.type !== 'quiz' && isDone && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-extrabold text-green-600 dark:text-green-400">
              <BookOpenCheck className="h-5 w-5" /> Materi selesai
            </span>
            <button onClick={goNext} className="btn-primary inline-flex items-center gap-1.5">
              {next ? (
                <>
                  {next.type === 'quiz' ? 'Kerjakan Kuis' : `Lanjut: ${next.title}`}
                  <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Kembali ke Kursus
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
        {next && lesson.type !== 'quiz' && !isDone && (
          <p className="mt-3 text-center text-[11px] font-semibold text-slate-400">
            Berikutnya: {next.type === 'quiz' ? 'Kuis Evaluasi' : next.title}
          </p>
        )}
      </div>
    </div>
  )
}
