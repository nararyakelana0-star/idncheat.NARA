import React, { useEffect } from 'react'
import { Star } from 'lucide-react'
import { useApp } from '../context/AppContext'

/* =====================================================================
   Toasts — notifikasi XP melayang (auto-dismiss 3.2 dtk)
   ===================================================================== */

function ToastItem({ toast }) {
  const { dispatch } = useApp()

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id: toast.id }), 3200)
    return () => clearTimeout(id)
  }, [toast.id, dispatch])

  return (
    <div className="glass flex min-w-[230px] animate-slide-up items-center gap-3 rounded-2xl px-4 py-3 shadow-glass">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 dark:bg-amber-500/20">
        <Star className="h-[18px] w-[18px] fill-amber-400 text-amber-500 dark:fill-amber-400/40 dark:text-amber-400" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-extrabold text-slate-900 dark:text-white">{toast.title}</p>
        {toast.sub && <p className="truncate text-xs text-slate-500 dark:text-slate-400">{toast.sub}</p>}
      </div>
    </div>
  )
}

export default function Toasts() {
  const { state } = useApp()
  if (state.toasts.length === 0) return null
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex flex-col gap-2">
      {state.toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
