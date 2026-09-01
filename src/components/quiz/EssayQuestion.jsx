import React, { useState } from 'react'
import { Send, CheckCircle2, BookMarked, Sparkles, PenLine } from 'lucide-react'

/* =====================================================================
   EssayQuestion — soal terbuka
   Form jawaban + kunci jawaban indikatif + umpan balik AI
   ===================================================================== */

export default function EssayQuestion({ question, answered, text, onTextChange, onSubmit }) {
  const [focus, setFocus] = useState(false)

  return (
    <div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
        <PenLine className="h-3.5 w-3.5" />
        Essay · Jawaban Terbuka
      </span>

      <p className="mt-3 font-display text-base font-bold leading-relaxed text-slate-900 sm:text-lg dark:text-white">
        {question.prompt}
      </p>

      {!answered ? (
        <div className="mt-4">
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            rows={5}
            placeholder="Tulis jawabanmu di sini… (minimal 2 kalimat agar AI bisa memberi umpan balik)"
            className={`w-full resize-y rounded-2xl border-2 bg-white p-4 text-sm leading-relaxed text-slate-800 placeholder-slate-400 outline-none transition dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 ${
              focus
                ? 'border-violet-400 ring-2 ring-violet-500/20 dark:border-violet-500'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold tabular-nums text-slate-400">{text.length} karakter</span>
            <button
              onClick={onSubmit}
              disabled={text.trim().length < 10}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 active:scale-[.98] disabled:pointer-events-none disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
              Kirim Jawaban
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-500/30 dark:bg-green-500/10">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-green-800 dark:text-green-300">
                Jawaban terkirim! +15 XP — bandingkan dengan kunci indikatif di bawah.
              </p>
              <p className="mt-0.5 text-xs text-green-700 dark:text-green-400">
                Jawabanmu: “{text.trim()}”
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <BookMarked className="h-4 w-4" /> Kunci Jawaban Indikatif
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {question.answerKey}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-violet-50 p-4 dark:border-brand-500/30 dark:from-brand-500/15 dark:via-slate-900 dark:to-violet-500/10">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/20 blur-2xl" />
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-300">
              <Sparkles className="h-4 w-4" /> Umpan Balik AI Tutor
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {question.aiFeedback}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
