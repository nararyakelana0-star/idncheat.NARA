import React from 'react'

/* =====================================================================
   Avatar — foto profil (jika user meng-upload) atau inisial ber-gradien
   sizes: sm (32) · md (40) · lg (64)
   ===================================================================== */

const SIZES = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-xl',
}

export default function Avatar({ user, size = 'md', className = '' }) {
  const sizeCls = SIZES[size] || SIZES.md
  const initials = (user?.name || user?.username || '?')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user?.name || 'Avatar'}
        className={`shrink-0 rounded-full object-cover shadow ${sizeCls} ${className}`}
      />
    )
  }

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-extrabold text-white shadow ${sizeCls} ${
        user?.avatar || 'from-brand-500 to-violet-600'
      } ${className}`}
    >
      {initials}
    </span>
  )
}
