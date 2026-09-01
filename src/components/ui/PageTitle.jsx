import React from 'react'

/* Header halaman: breadcrumb + judul + sub + aksi opsional */
export default function PageTitle({ crumb, title, sub, children }) {
  return (
    <div className="mb-6">
      {crumb && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {crumb}
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">{title}</h1>
          {sub && <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{sub}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
