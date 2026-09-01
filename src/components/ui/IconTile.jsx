import React from 'react'

/* Kotak ikon bergradien (konsisten di seluruh kartu) */
export default function IconTile({
  Icon,
  gradient = 'from-brand-500 to-violet-600',
  className = 'h-11 w-11 rounded-xl',
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center bg-gradient-to-br ${gradient} text-white shadow-sm ${className}`}
    >
      <Icon className="h-[55%] w-[55%]" />
    </span>
  )
}
