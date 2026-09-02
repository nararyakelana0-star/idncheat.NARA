import React from 'react'
import {
  ArrowLeft,
  Play,
  Check,
  Lock,
  Clock,
  ListChecks,
  Star,
  User,
  Award,
  FileText,
  PenLine,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { courseById, categoryById, getLessons, TIERS } from '../../data/curriculum'
import { quizForCourse, quizXpTotal } from '../../data/questions'
import Badge from '../ui/Badge'
import IconTile from '../ui/IconTile'
import ProgressBar from '../ui/ProgressBar'

/* =====================================================================
   Course Detail — header kursus, daftar materi (bacaan/praktik/kuis),
   kartu Kuis Evaluasi, info & sertifikasi
   (Tipe materi: reading & practice — tidak ada video)
   ===================================================================== */

const TYPE_META = {
  reading: { icon: FileText, label: 'Bacaan' },
  practice: { icon: PenLine, label: 'Praktik' },
  quiz: { icon: ListChecks, label: 'Kuis' },
}

function LessonList({ course, progress, navigate, consoleMode = false }) {
  const lessons = getLessons(course)
  const completedCount = Math.round((progress / 100) * lessons.length)
  const nextIdx = lessons.findIndex((l, i) => i >= completedCount && l.type !== 'quiz')
  const quizUnlocked = completedCount >= lessons.length - 1
  const cat = categoryById(course.category)

  const openLesson = (i) => {
    const l = lessons[i]
    if (l.type === 'quiz') navigate('quiz', { courseId: course.id })
    else navigate('lesson', { courseId: course.id, lessonIndex: i })
  }

  /* Console Mode: baris cartridge game */
  if (consoleMode) {
    return (
      <div className="card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-extrabold tracking-wide text-white">MISI BELAJAR</h3>
          <span className="rounded-full bg-blue-500/15 px-3 py-1 text-[11px] font-extrabold text-cyan-300">
            {completedCount}/{lessons.length} selesai
          </span>
        </div>
        <ul className="space-y-2">
          {lessons.map((l, i) => {
            const meta = TYPE_META[l.type] || TYPE_META.reading
            const Icon = meta.icon
            const lDone = i < completedCount
            const isNext = i === nextIdx
            const clickable = lDone || isNext || (l.type === 'quiz' && quizUnlocked)
            return (
              <li key={i}>
                <button
                  onClick={() => clickable && openLesson(i)}
                  disabled={!clickable}
                  className={`flex w-full items-center gap-3.5 rounded-2xl border p-3 text-left transition ${
                    clickable
                      ? 'cursor-pointer border-blue-400/25 bg-blue-500/[0.06] hover:-translate-y-0.5 hover:border-blue-400/70 hover:bg-blue-500/15 hover:shadow-[0_0_22px_-6px_rgba(45,140,255,0.6)]'
                      : 'cursor-not-allowed border-white/5 bg-white/[0.03] opacity-50'
                  }`}
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br shadow-lg ${cat.gradient} ${
                      lDone ? 'opacity-55' : ''
                    }`}
                  >
                    {lDone ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : l.type === 'quiz' ? (
                      quizUnlocked ? <ListChecks className="h-5 w-5 text-white" /> : <Lock className="h-4 w-4 text-white/80" />
                    ) : isNext ? (
                      <Play className="h-5 w-5 fill-white text-white" />
                    ) : (
                      <Lock className="h-4 w-4 text-white/70" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-extrabold ${lDone ? 'text-slate-400' : 'text-white'}`}>
                      {l.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                      <Icon className="h-3 w-3" /> {meta.label}
                      <span className="text-slate-600">·</span>
                      <Clock className="h-3 w-3" /> {l.minutes} mnt
                    </p>
                  </div>
                  {isNext ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_0_16px_-2px_rgba(45,140,255,0.8)]">
                      <Play className="h-3 w-3 fill-current" /> Main
                    </span>
                  ) : lDone ? (
                    <span className="shrink-0 text-[11px] font-extrabold text-emerald-300">Ulangi</span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Daftar Materi</h3>
        <span className="text-xs font-bold text-slate-400">
          {completedCount}/{lessons.length} selesai
        </span>
      </div>
      <ul className="space-y-1.5">
        {lessons.map((l, i) => {
          const meta = TYPE_META[l.type] || TYPE_META.reading
          const Icon = meta.icon
          const lDone = i < completedCount
          const isNext = i === nextIdx
          const clickable = lDone || isNext || (l.type === 'quiz' && quizUnlocked)
          return (
            <li key={i}>
              <button
                onClick={() => clickable && openLesson(i)}
                disabled={!clickable}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  lDone
                    ? 'cursor-pointer border-transparent bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800'
                    : isNext
                    ? 'cursor-pointer border-brand-200 bg-brand-50/50 hover:bg-brand-50 dark:border-brand-500/30 dark:bg-brand-500/10 dark:hover:bg-brand-500/15'
                    : l.type === 'quiz' && quizUnlocked
                    ? 'cursor-pointer border-transparent bg-violet-50/50 hover:bg-violet-50 dark:bg-violet-500/10 dark:hover:bg-violet-500/15'
                    : 'cursor-not-allowed border-transparent opacity-60 dark:opacity-50'
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                    lDone
                      ? 'bg-green-100 text-green-600 dark:bg-green-500/15'
                      : l.type === 'quiz'
                      ? quizUnlocked
                        ? 'bg-violet-100 text-violet-600 dark:bg-violet-500/15'
                        : 'border border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900'
                      : isNext
                      ? 'bg-brand-600 text-white shadow-glow'
                      : 'border border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900'
                  }`}
                >
                  {lDone ? (
                    <Check className="h-4 w-4" />
                  ) : l.type === 'quiz' ? (
                    quizUnlocked ? <ListChecks className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />
                  ) : isNext ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Lock className="h-3.5 w-3.5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-bold ${lDone ? 'text-slate-500 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                    {l.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Icon className="h-3 w-3" /> {meta.label}
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <Clock className="h-3 w-3" /> {l.minutes} mnt
                  </p>
                </div>
                {lDone ? (
                  <span className="shrink-0 text-[11px] font-extrabold text-green-600 dark:text-green-400">Ulangi</span>
                ) : isNext ? (
                  <span className="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                    Berikutnya
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function CourseDetailPage() {
  const { state, navigate } = useApp()
  const course = courseById(state.page.payload.courseId)

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
  const progress = state.courseProgress[course.id] || 0
  const quiz = quizForCourse(course.id)
  const completedQuiz = state.completedQuizzes[course.id]
  const lessons = getLessons(course)

  return (
    <div className="mx-auto max-w-5xl">
      <button
        onClick={() => navigate('catalog')}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
      </button>

      {/* Header kursus */}
      <div className="card overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${cat.gradient}`} />
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start gap-4">
            <IconTile Icon={Icon} gradient={cat.gradient} className="h-16 w-16 rounded-2xl" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${cat.tint}`}>
                  {cat.name}
                </span>
                {course.tiers.map((t) => (
                  <Badge key={t} tone={t === 'murojaah' ? 'amber' : 'indigo'}>
                    {TIERS[t].sub}
                  </Badge>
                ))}
                {course.cert && (
                  <Badge tone="cyan">
                    <Award className="h-3 w-3" /> Sertifikasi {course.cert}
                  </Badge>
                )}
                <Badge tone="slate">{course.level}</Badge>
              </div>
              <h1 className="mt-2 font-display text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                {course.title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {course.desc}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Modul', value: course.modules },
              { label: 'Materi', value: lessons.length },
              { label: 'Total XP', value: `${course.xp} XP` },
              { label: 'Instruktur', value: course.instructor, small: true },
            ].map((m, i) => (
              <div key={i} className="rounded-xl bg-slate-50 px-3.5 py-3 dark:bg-slate-800/60">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{m.label}</p>
                {m.small ? (
                  <p className="mt-0.5 truncate text-xs font-bold text-slate-700 dark:text-slate-200">{m.value}</p>
                ) : (
                  <p className="mt-0.5 font-display text-lg font-extrabold text-slate-800 dark:text-white">
                    {m.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {progress > 0 && (
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 dark:text-slate-400">Progres kursus</span>
                <span className="text-brand-600 dark:text-brand-400">{progress}%</span>
              </div>
              <ProgressBar value={progress} size="h-2.5" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Kolom utama: materi */}
        <div className="lg:col-span-2">
          <LessonList course={course} progress={progress} navigate={navigate} consoleMode={!!state.theme.console} />
        </div>

        {/* Rail kanan */}
        <div className="space-y-5">
          {/* CTA utama */}
          <div className="card p-5">
            <button
              onClick={() => {
                const ls = getLessons(course)
                const doneCount = Math.round((progress / 100) * ls.length)
                const next = ls.findIndex((l, i) => i >= doneCount && l.type !== 'quiz')
                if (next === -1) navigate('quiz', { courseId: course.id })
                else navigate('lesson', { courseId: course.id, lessonIndex: next })
              }}
              className="btn-primary w-full !py-3"
            >
              <Play className="h-4 w-4" /> {progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
            </button>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-bold dark:bg-slate-800/60">
              <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-300">
                <User className="h-3.5 w-3.5" /> {course.instructor}
              </span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Star className="h-3.5 w-3.5 fill-amber-400" /> 4.9
              </span>
            </div>
          </div>

          {/* Kuis Evaluasi */}
          <div
            className={`rounded-2xl border-2 border-dashed p-5 ${
              quiz
                ? 'border-brand-300 bg-brand-50/40 dark:border-brand-500/40 dark:bg-brand-500/5'
                : 'border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl ${
                  quiz
                    ? 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-glow'
                    : 'bg-slate-200 text-slate-400 dark:bg-slate-700'
                }`}
              >
                <ListChecks className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-extrabold text-slate-900 dark:text-white">Kuis Harian</p>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  5 soal pilihan ganda · berubah setiap hari
                </p>
              </div>
            </div>
            {quiz && (
              <>
                <div className="mt-3 flex items-center justify-between text-xs font-extrabold">
                  <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" /> +{quizXpTotal(quiz)} XP
                  </span>
                  {completedQuiz && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] text-green-700 dark:bg-green-500/15 dark:text-green-300">
                      <Check className="h-3 w-3" /> Selesai · {completedQuiz.score}%
                    </span>
                  )}
                </div>
                <button
                  onClick={() => navigate('quiz', { courseId: course.id })}
                  className="btn-primary mt-4 w-full"
                >
                  {completedQuiz ? 'Ulangi Kuis' : 'Kerjakan Kuis'}
                </button>
              </>
            )}
          </div>

          {/* Info */}
          <div className="card p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Info</p>
            <ul className="mt-3 space-y-2.5 text-[13px] font-semibold text-slate-600 dark:text-slate-300">
              <li className="flex items-center justify-between">
                <span>Diperbarui</span>
                <span className="text-slate-400">Agustus 2026</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Bahasa</span>
                <span className="text-slate-400">Indonesia + Arab</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sertifikat</span>
                <span className="text-slate-400">Ya, setelah lulus kuis</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tingkat</span>
                <span className="text-slate-400">{course.level}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
