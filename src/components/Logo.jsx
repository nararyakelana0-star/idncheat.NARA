import React from 'react'

/* =====================================================================
   Logo IDNcheat
   - Mark: squircle gradient + ikon lightning (cheat-code) dengan
     slice glitch halus (cyan/rose)
   - Wordmark: "IDN" (bold, efek RGB-split glitch halus) + "cheat"
   ===================================================================== */

export default function Logo({ size = 'md', onClick, showWord = true }) {
  const markSize = size === 'lg' ? 44 : 36
  const textSize = size === 'lg' ? 'text-2xl' : 'text-xl'

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-1 transition hover:opacity-90"
      aria-label="IDNcheat — beranda"
    >
      <svg
        viewBox="0 0 48 48"
        className="shrink-0 drop-shadow-sm transition-transform group-hover:scale-105 dark:drop-shadow-[0_0_10px_rgba(129,140,248,0.55)] dark:brightness-110 dark:saturate-150"
        style={{ width: markSize, height: markSize }}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="idn-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="55%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <clipPath id="idn-clip">
            <rect x="4" y="4" width="40" height="40" rx="12" />
          </clipPath>
        </defs>
        {/* dasar squircle */}
        <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#idn-mark)" />
        {/* lightning (cheat code) */}
        <path d="M27.5 9 L14.5 27.5 H22 L20.5 39 L33.5 20.5 H26 Z" fill="#ffffff" />
        {/* slice glitch halus */}
        <g clipPath="url(#idn-clip)">
          <rect x="2" y="15" width="44" height="3" fill="#22D3EE" opacity="0.55" transform="skewY(-2)" />
          <rect x="2" y="31" width="44" height="2" fill="#F472B6" opacity="0.45" transform="skewY(2)" />
        </g>
      </svg>

      {showWord && (
        <span className={`font-display font-extrabold tracking-tight ${textSize}`}>
          <span className="relative inline-block text-slate-900 dark:text-white">
            <span className="absolute inset-0 -translate-x-[1.5px] select-none text-cyan-500/40 blur-[0.4px]" aria-hidden="true">
              IDN
            </span>
            <span className="absolute inset-0 translate-x-[1.5px] select-none text-rose-500/30 blur-[0.4px]" aria-hidden="true">
              IDN
            </span>
            <span className="relative">IDN</span>
          </span>
          <span className="text-brand-500 dark:text-brand-400">cheat</span>
        </span>
      )}
    </button>
  )
}
