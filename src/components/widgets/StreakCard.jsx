import React from 'react'
import { Flame } from 'lucide-react'
import { useApp } from '../../context/AppContext'

/* =====================================================================
   Streak Card — ringkasan streak + strip 7 hari (Sen–Min)
   ===================================================================== */

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
// JS getDay(): 0=Min..6=Sen → index strip (Sen=0)
const toIndex = (getDay) => (getDay + 6) % 7

export default function StreakCard() {
  const { state } = useApp()
  const today = new Date().getDay()
  const todayIdx = toIndex(today)

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-500 dark:bg-orange-500/15">
            <Flame className="h-5 w-5 fill-orange-200 dark:fill-orange-500/20" />
          </span>
          <div>
            <p className="font-display font-bold text-slate-900 dark:text-white">Streak</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Belajar tanpa jeda</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-extrabold text-orange-500">{state.streak}</p>
          <p className="-mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">hari</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {DAYS.map((d, i) => {
          const isPast = i < todayIdx
          const isToday = i === todayIdx
          return (
            <div key={d} className="flex flex-col items-center gap-1.5">
              <span
                className={`grid h-9 w-9 place-items-center rounded-full text-[10px] font-extrabold transition ${
                  isToday
                    ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-glow ring-2 ring-orange-200 dark:ring-orange-500/40'
                    : isPast
                    ? 'bg-orange-100 text-orange-500 dark:bg-orange-500/15'
                    : 'bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600'
                }`}
              >
                {isToday ? <Flame className="h-4 w-4 fill-orange-200 dark:fill-orange-500/30" /> : isPast ? '✓' : i + 1}
              </span>
              <span
                className={`text-[10px] font-bold ${isToday ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'}`}
              >
                {d}
              </span>
            </div>
          )
        })}
      </div>

      <p className="mt-4 rounded-xl bg-orange-50 px-3.5 py-2.5 text-xs font-semibold text-orange-800 dark:bg-orange-500/10 dark:text-orange-300">
        🔥 Belajari apa pun hari ini (kuis / materi) agar streak tetap menyala!
      </p>
    </div>
  )
}
