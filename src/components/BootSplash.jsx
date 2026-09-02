import React, { useEffect, useState } from 'react'
import { consoleMusic } from '../audio/consoleMusic'
import Logo from './Logo'

/* =====================================================================
   BootSplash — intro ala boot console (PS4-style)
   1) denyut cahaya hitam → 2) logo IDN-Cheat muncul + glow
   3) tagline → 4) fade out. Diputar + suara boot (sub-thump + sweep + chime)
   ===================================================================== */

const DURATION = 3200

export default function BootSplash({ onDone }) {
  const [phase, setPhase] = useState(0) // 0 pulse · 1 logo · 2 fade · 3 done

  useEffect(() => {
    consoleMusic.playBoot()
    const t1 = setTimeout(() => setPhase(1), 750)
    const t2 = setTimeout(() => setPhase(2), 2300)
    const t3 = setTimeout(() => {
      setPhase(3)
      onDone?.()
    }, DURATION)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 3) return null

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#020308] transition-opacity duration-700 ${
        phase === 2 ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* grid neon samar di belakang */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.09) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        }}
      />
      {/* vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />

      {/* Fase 1: denyut cahaya (power on) */}
      {phase === 0 && (
        <span className="relative grid place-items-center">
          <span className="absolute h-40 w-40 animate-ping rounded-full bg-indigo-500/20" />
          <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_30px_10px_rgba(129,140,248,0.9)] animate-pulse" />
        </span>
      )}

      {/* Fase 2 & 3: logo + wordmark */}
      {phase >= 1 && (
        <div className="relative flex flex-col items-center">
          <div className="boot-logo-in scale-125">
            <Logo size="lg" showWord={false} />
          </div>
          <div className="boot-word-in mt-5 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-white">
              IDN
              <span className="text-brand-400">cheat</span>
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-indigo-300/80">
              Console Mode
            </p>
          </div>
          <div className="boot-bar mt-8 h-0.5 w-44 origin-left rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500" />
        </div>
      )}
    </div>
  )
}
