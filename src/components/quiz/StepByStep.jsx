import React, { useState } from 'react'
import { Lightbulb, ChevronDown, Quote, Code2, Calculator } from 'lucide-react'

/* =====================================================================
   StepByStep — tombol "Lihat Cara / Pembahasan"
   Menampilkan langkah logis/rumus (Matematika, Sains, IT) atau
   dalil & penjelasan ulama (Diniyah).
   ===================================================================== */

export default function StepByStep({ question, subject }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold transition ${
          open
            ? 'border-brand-300 bg-brand-100 text-brand-800 dark:border-brand-500/40 dark:bg-brand-500/20 dark:text-brand-300'
            : 'border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20'
        }`}
      >
        {open ? <ChevronDown className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
        {open ? 'Tutup Pembahasan' : 'Lihat Cara / Pembahasan'}
      </button>

      {open && (
        <div className="mt-3 animate-slide-up rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              <Calculator className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-slate-800 dark:text-white">
                Pembahasan Langkah demi Langkah
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {subject}
              </p>
            </div>
          </div>

          <ol className="space-y-4">
            {question.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-extrabold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{s.title}</p>
                  {s.text && (
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {s.text}
                    </p>
                  )}
                  {s.formula && (
                    <div className="mt-2 inline-block rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 font-mono text-[13px] font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      {s.formula}
                    </div>
                  )}
                  {s.code && (
                    <pre className="mt-2 overflow-x-auto rounded-xl bg-[#0F172A] p-3.5 font-mono text-xs leading-relaxed text-emerald-300">
                      <Code2 className="mb-1.5 h-3.5 w-3.5 text-emerald-500" />
                      {s.code}
                    </pre>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {question.dalil && (
            <div className="mt-4 flex gap-3 rounded-xl border border-emerald-200/70 bg-emerald-50 p-3.5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
              <Quote className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Dalil &amp; Keterangan Ulama
                </p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-900 dark:text-emerald-200">
                  {question.dalil}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
