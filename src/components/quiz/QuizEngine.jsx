import React, { useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Star,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { XP_MC, XP_ESSAY, quizXpTotal } from '../../data/questions'
import { categoryById } from '../../data/curriculum'
import Ring from '../ui/Ring'
import MCQuestion from './MCQuestion'
import EssayQuestion from './EssayQuestion'
import StepByStep from './StepByStep'

/* =====================================================================
   QuizEngine — alur kuis: soal → feedback instan → pembahasan
   → hasil (skor, XP, review jawaban)
   ===================================================================== */

export default function QuizEngine({ course, quiz }) {
  const { navigate, addXp, dispatch, state } = useApp()

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // qid → { selected } | { text }
  const [hints, setHints] = useState({}) // qid → bool
  const [result, setResult] = useState(null)
  const [xpEarned, setXpEarned] = useState(0)
  const awarded = useRef({})

  const q = quiz.questions[index]
  const isLast = index === quiz.questions.length - 1
  const category = categoryById(course.category)
  const subjectLabel = category ? category.name : 'Materi'

  const answered = !!answers[q.id]
  // MC: wajib memilih; Essay: wajib mengirim jawaban
  const canContinue = answered

  /* ----------------- aksi ----------------- */
  const award = (amount, source) => {
    setXpEarned((v) => v + amount)
    addXp(amount, source)
  }

  const handleSelect = (i) => {
    if (awarded.current[q.id]) return
    setAnswers((a) => ({ ...a, [q.id]: { selected: i } }))
    awarded.current[q.id] = true
    if (i === q.correctIndex) award(XP_MC, `Jawaban benar · ${quiz.title}`)
  }

  const handleEssaySubmit = () => {
    const text = answers[q.id]?.text || ''
    if (!text.trim() || awarded.current[q.id]) return
    awarded.current[q.id] = true
    award(XP_ESSAY, 'Jawaban essay terkirim')
  }

  const handleEssayText = (t) => {
    setAnswers((a) => ({ ...a, [q.id]: { ...(a[q.id] || {}), text: t } }))
  }

  const goToResult = () => {
    const total = quiz.questions.length
    let correct = 0
    quiz.questions.forEach((qq) => {
      const a = answers[qq.id]
      if (qq.type === 'mc') {
        if (a && a.selected === qq.correctIndex) correct++
      } else {
        if (a && a.text && a.text.trim().length >= 10) correct++
      }
    })
    const score = Math.round((correct / total) * 100)
    dispatch({ type: 'COMPLETE_QUIZ', courseId: course.id, score, correct, total })
    dispatch({ type: 'SET_PROGRESS', courseId: course.id, value: 100 })
    setResult({ correct, total, score })
  }

  const reset = () => {
    setIndex(0)
    setAnswers({})
    setHints({})
    setResult(null)
    setXpEarned(0)
    awarded.current = {}
  }

  /* ----------------- hasil ----------------- */
  if (result) {
    const { score, correct, total } = result
    const msg =
      score === 100
        ? 'Sempurna! Kamu menaklukkan kuis ini. 🏆'
        : score >= 70
        ? 'Luar biasa! Sedikit lagi menuju sempurna. 💪'
        : score >= 40
        ? 'Bagus! Baca pembahasan lalu ulangi kuisnya. 📚'
        : 'Jangan menyerah — pelajari pembahasan di bawah, lalu coba lagi! 🌱'
    const ringCls =
      score >= 70 ? 'stroke-green-500' : score >= 40 ? 'stroke-amber-500' : 'stroke-rose-500'

    return (
      <div className="mx-auto max-w-2xl animate-slide-up">
        <div className="card p-6 sm:p-8">
          <div className="text-center">
            <div className="relative mx-auto w-fit">
              <Ring size={148} stroke={11} value={score / 100} className={ringCls}>
                <div>
                  <p className="font-display text-4xl font-extrabold text-slate-900 dark:text-white">{score}%</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Skor</p>
                </div>
              </Ring>
              <span className="absolute -right-1 -top-1 animate-pop text-3xl">
                {score === 100 ? '🏆' : score >= 70 ? '🎉' : '💪'}
              </span>
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">{msg}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {correct} dari {total} soal benar
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-extrabold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              +{xpEarned} XP ditambahkan ke akunmu
            </div>
          </div>

          {/* Review jawaban */}
          <div className="mt-6 space-y-2.5 text-left">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Review Jawaban
            </p>
            {quiz.questions.map((qq, i) => {
              const a = answers[qq.id]
              const isRight =
                qq.type === 'mc'
                  ? a?.selected === qq.correctIndex
                  : a?.text && a.text.trim().length >= 10
              return (
                <div
                  key={qq.id}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 ${
                    isRight
                      ? 'border-green-200 bg-green-50/50 dark:border-green-500/30 dark:bg-green-500/10'
                      : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                  }`}
                >
                  {isRight ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {i + 1}. {qq.prompt}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {qq.type === 'mc'
                        ? `Jawaban benar: ${qq.options[qq.correctIndex]}`
                        : `Kunci indikatif: ${qq.answerKey.slice(0, 120)}…`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button onClick={reset} className="btn-ghost flex-1">
              <RotateCcw className="h-4 w-4" /> Ulangi Kuis
            </button>
            <button onClick={() => navigate('course', { courseId: course.id })} className="btn-primary flex-1">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Kursus
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ----------------- soal berjalan ----------------- */
  return (
    <div className="mx-auto max-w-3xl animate-slide-up">
      {/* Progress header */}
      <div className="card mb-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate('course', { courseId: course.id })}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Kembali ke kursus"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-slate-900 dark:text-white">
                {quiz.title}
              </p>
              <p className="text-[11px] font-semibold text-slate-400">
                Soal {index + 1} dari {quiz.questions.length} · Total{' '}
                <span className="text-amber-600 dark:text-amber-400">{quizXpTotal(quiz)} XP</span>
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            {index + 1}/{quiz.questions.length}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-1.5">
          {quiz.questions.map((qq, i) => {
            const a = answers[qq.id]
            const done =
              (qq.type === 'mc' && a) ||
              (qq.type === 'essay' && a && a.text && a.text.trim().length >= 10 && awarded.current[qq.id])
            const right = qq.type === 'mc' ? a && a.selected === qq.correctIndex : false
            const cls =
              i === index
                ? 'bg-brand-500'
                : done
                ? right
                  ? 'bg-green-500'
                  : 'bg-rose-400'
                : 'bg-slate-200 dark:bg-slate-700'
            return (
              <span
                key={qq.id}
                className={`h-1.5 flex-1 rounded-full transition ${cls} ${i === index ? 'animate-pulse-soft' : ''}`}
              />
            )
          })}
        </div>
      </div>

      {/* Kartu soal */}
      <div className="card p-5 sm:p-7">
        {q.type === 'mc' ? (
          <>
            <MCQuestion
              question={q}
              answered={answered}
              selected={answers[q.id]?.selected}
              onSelect={handleSelect}
              onHint={() => setHints((h) => ({ ...h, [q.id]: true }))}
              hintShown={!!hints[q.id]}
            />
            {answered && <StepByStep question={q} subject={subjectLabel} />}
          </>
        ) : (
          <>
            <EssayQuestion
              question={q}
              answered={answered && answers[q.id]?.text && answers[q.id].text.trim().length >= 10}
              text={answers[q.id]?.text || ''}
              onTextChange={handleEssayText}
              onSubmit={handleEssaySubmit}
            />
            {awarded.current[q.id] && <StepByStep question={q} subject={subjectLabel} />}
          </>
        )}

        {/* Navigasi */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-400">
            {state.daily.earned}/{state.daily.goal} XP target harian
          </span>
          <button
            onClick={() => (isLast ? goToResult() : setIndex((i) => i + 1))}
            disabled={!canContinue}
            className="btn-primary"
          >
            {isLast ? (
              <>
                <Trophy className="h-4 w-4" /> Lihat Hasil
              </>
            ) : (
              <>
                Soal Berikutnya <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
