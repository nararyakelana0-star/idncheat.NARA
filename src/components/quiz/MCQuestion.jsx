import React from 'react'
import { CheckCircle2, XCircle, Lightbulb, MessageCircleQuestion } from 'lucide-react'

/* =====================================================================
   MCQuestion — pilihan ganda dengan feedback instan
   hijau = benar, merah = salah, +XP instan
   ===================================================================== */

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export default function MCQuestion({ question, answered, selected, onSelect, onHint, hintShown }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          <MessageCircleQuestion className="h-3.5 w-3.5" />
          Pilihan Ganda
        </span>
        <button
          onClick={onHint}
          disabled={hintShown}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
            hintShown
              ? 'cursor-default bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20'
          }`}
        >
          <Lightbulb className="h-3.5 w-3.5" />
          {hintShown ? 'Petunjuk ditunjukkan' : 'Butuh petunjuk?'}
        </button>
      </div>

      {hintShown && (
        <div className="mb-4 animate-slide-up rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <span className="font-bold">Petunjuk: </span>
          {question.hint}
        </div>
      )}

      <p className="font-display text-base font-bold leading-relaxed text-slate-900 sm:text-lg dark:text-white">
        {question.prompt}
      </p>

      <div className="mt-4 grid gap-2.5 md:grid-cols-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex
          const isSelected = i === selected
          let cls =
            'border-slate-200 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50/40 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-brand-500/60 dark:hover:bg-brand-500/10'
          let letterCls = 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
          let icon = null

          if (answered) {
            if (isCorrect) {
              cls = 'border-green-500 bg-green-50 text-green-800 dark:border-green-500/70 dark:bg-green-500/10 dark:text-green-300'
              letterCls = 'bg-green-500 text-white'
              icon = <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
            } else if (isSelected) {
              cls = 'border-red-400 bg-red-50 text-red-700 dark:border-red-500/70 dark:bg-red-500/10 dark:text-red-300'
              letterCls = 'bg-red-400 text-white'
              icon = <XCircle className="ml-auto h-5 w-5 shrink-0 text-red-500 dark:text-red-400" />
            } else {
              cls = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-500'
              letterCls = 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
            }
          }

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => onSelect(i)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left text-sm font-semibold transition-all duration-200 ${cls} ${
                answered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${letterCls}`}
              >
                {LETTERS[i]}
              </span>
              <span className="min-w-0 flex-1 break-words">{opt}</span>
              {icon}
            </button>
          )
        })}
      </div>

      {answered && (
        <p
          className={`mt-4 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold ${
            selected === question.correctIndex
              ? 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300'
          }`}
        >
          {selected === question.correctIndex ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Benar! +25 XP masuk ke akunmu.
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" /> Kurang tepat — lihat pembahasan di bawah ya.
            </>
          )}
        </p>
      )}
    </div>
  )
}
