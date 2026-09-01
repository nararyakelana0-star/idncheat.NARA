import React from 'react'
import { Target, CheckCircle2, Circle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { DAILY_TASKS } from '../../data/mockData'
import Ring from '../ui/Ring'

/* =====================================================================
   Daily Target — ring progres target harian + checklist tugas
   ===================================================================== */

export default function DailyTarget() {
  const { state } = useApp()
  const pct = state.daily.earned / state.daily.goal
  const done = pct >= 1

  return (
    <div className="card flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl ${
            done ? 'bg-green-100 text-green-600 dark:bg-green-500/15' : 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400'
          }`}
        >
          <Target className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-bold text-slate-900 dark:text-white">Target Harian</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {done ? 'Selamat! Bonus harian tercapai 🎉' : 'Ayo kejar targetmu hari ini'}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-1 items-center gap-5">
        <Ring
          size={86}
          stroke={8}
          value={pct}
          className={done ? 'stroke-green-500' : 'stroke-brand-500'}
        >
          <div className="text-center">
            <p className="font-display text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
              {state.daily.earned}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
              / {state.daily.goal} XP
            </p>
          </div>
        </Ring>

        <ul className="flex-1 space-y-2.5">
          {DAILY_TASKS.map((t) => (
            <li key={t.id} className="flex items-start gap-2.5">
              {t.done ? (
                <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-500" />
              ) : (
                <Circle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-slate-300 dark:text-slate-600" />
              )}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[13px] font-semibold leading-snug ${
                    t.done
                      ? 'text-slate-400 line-through dark:text-slate-500'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {t.label}
                </p>
                <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  {t.reward} · <span className="text-slate-400">{t.detail}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {!done && (
        <div className="mt-4 rounded-xl bg-gradient-to-r from-brand-50 to-violet-50 px-3.5 py-2.5 text-xs font-semibold text-brand-800 dark:from-brand-500/15 dark:to-violet-500/15 dark:text-brand-300">
          💡 Selesaikan 1 kuis lagi (Diniyah atau IT) untuk bonus{' '}
          <span className="font-extrabold">+50 XP</span>!
        </div>
      )}
    </div>
  )
}
