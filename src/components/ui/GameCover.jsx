import React from 'react'
import { Play, Star } from 'lucide-react'

/* =====================================================================
   GameCover — kartu kursus ala cover game (Console Mode)
   Rasio 3:4, art graden + ikon besar, efek shine sweep, overlay
   "▶ MAIN / LANJUTKAN" saat hover, spine glow di sisi kiri.
   ===================================================================== */

export default function GameCover({
  course,
  Icon,
  gradient,
  progress = 0,
  lessonCount,
  onClick,
}) {
  const done = progress >= 100
  return (
    <button
      onClick={onClick}
      className="game-cover group relative block w-full overflow-hidden rounded-3xl border-2 border-blue-400/30 bg-[#070b18] text-left shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-400/90 hover:shadow-[0_0_44px_-8px_rgba(45,140,255,0.75)] active:scale-[0.99]"
      aria-label={course.title}
    >
      {/* Area art */}
      <div className={`relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br ${gradient}`}>
        {/* pola titik */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />
        {/* garis diagonal halus */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.9) 0 1px, transparent 1px 18px)',
          }}
        />
        {/* glow tengah */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 42%, rgba(255,255,255,0.22), transparent 60%)' }} />

        {/* ikon utama */}
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-24 w-24 place-items-center rounded-[28px] bg-white/15 shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
            <Icon className="h-14 w-14 text-white drop-shadow-lg" />
          </span>
        </div>

        {/* badge kiri-atas: level */}
        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur-sm">
          {course.level}
        </span>
        {/* badge kanan-atas: XP */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
          <Star className="h-2.5 w-2.5 fill-amber-300" /> {course.xp}
        </span>

        {/* shine sweep saat hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

        {/* overlay aksi */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4 pt-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-900 shadow-xl">
            <Play className="h-3.5 w-3.5 fill-current" />
            {done ? 'Ulangi' : progress > 0 ? 'Lanjutkan' : 'Main'}
          </span>
        </div>
      </div>

      {/* strip judul */}
      <div className="relative p-4">
        <h3 className="truncate font-display text-sm font-extrabold text-white">{course.title}</h3>
        <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-400">
          {course.modules} modul · {lessonCount} materi
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full transition-all ${
                done ? 'bg-gradient-to-r from-emerald-400 to-green-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}
              style={{ width: `${Math.max(progress, 2)}%` }}
            />
          </div>
          <span className={`text-[10px] font-extrabold ${done ? 'text-emerald-300' : 'text-cyan-300'}`}>
            {progress}%
          </span>
        </div>
      </div>

      {/* spine glow */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400/80 via-transparent to-cyan-400/60"
        aria-hidden="true"
      />
    </button>
  )
}
