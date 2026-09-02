import React, { useEffect, useState } from 'react'
import Logo from './Logo'

/* =====================================================================
   PowerOffSplash — outro smooth saat Console Mode dimatikan
   Logo memudar → titik cahaya mengecil → layar kembali normal.
   ===================================================================== */

export default function PowerOffSplash({ onDone }) {
  const [phase, setPhase] = useState(0) // 0 logo fade · 1 dot shrink

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 650)
    const t2 = setTimeout(() => onDone?.(), 1250)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#020308]" aria-hidden="true">
      {/* vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.9) 100%)' }} />

      {phase === 0 && (
        <div className="poweroff-logo flex flex-col items-center">
          <Logo size="lg" showWord={false} />
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500">
            Console Mode Off
          </p>
        </div>
      )}

      {phase === 1 && (
        <span className="poweroff-dot h-3 w-3 rounded-full bg-white shadow-[0_0_30px_10px_rgba(129,140,248,0.9)]" />
      )}
    </div>
  )
}
