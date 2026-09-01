import React from 'react'

export default function ProgressBar({
  value = 0,
  size = 'h-1.5',
  barClassName = 'bg-gradient-to-r from-brand-500 to-violet-500',
  className = '',
}) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div className={`w-full ${size} overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700/60 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ${barClassName}`}
        style={{ width: `${v}%` }}
      />
    </div>
  )
}
