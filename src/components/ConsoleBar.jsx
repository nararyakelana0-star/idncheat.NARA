import React from 'react'
import {
  Home,
  LayoutGrid,
  BookOpen,
  ListChecks,
  Trophy,
  Medal,
  Settings,
  Music2,
  Volume2,
  X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MUSIC_TRACKS } from '../audio/consoleMusic'

/* =====================================================================
   ConsoleBar — navigasi bawah ala PS4 / Switch (hanya di Console Mode)
   Ikon besar + hover pop · pengatur lagu chiptune · tombol keluar mode
   ===================================================================== */

const NAV = [
  { page: 'dashboard', icon: Home, label: 'Beranda' },
  { page: 'catalog', icon: LayoutGrid, label: 'Katalog' },
  { page: 'mycourses', icon: BookOpen, label: 'Kursus Saya' },
  { page: 'quizzes', icon: ListChecks, label: 'Kuis Harian' },
  { page: 'leaderboard', icon: Trophy, label: 'Papan Peringkat' },
  { page: 'achievements', icon: Medal, label: 'Pencapaian' },
  { page: 'settings', icon: Settings, label: 'Pengaturan' },
]

export default function ConsoleBar() {
  const { state, navigate, setTheme, toggleConsole } = useApp()
  const theme = state.theme
  const trackIdx = Math.max(0, Math.min(MUSIC_TRACKS.length - 1, Number(theme.track) || 0))
  const currentTrack = MUSIC_TRACKS[trackIdx] || MUSIC_TRACKS[0]

  return (
    <nav className="console-bar" aria-label="Navigasi console">
      {NAV.map(({ page, icon: Icon, label }) => (
        <button
          key={page}
          onClick={() => navigate(page)}
          title={label}
          aria-label={label}
          className={`console-nav-item ${state.page.name === page ? 'active' : ''}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl">
            <Icon className="h-5 w-5" />
          </span>
          <span className="console-nav-label">{label}</span>
        </button>
      ))}

      <span className="mx-1.5 h-7 w-px shrink-0 bg-white/15" aria-hidden="true" />

      {/* Ganti lagu chiptune */}
      <button
        onClick={() => setTheme({ track: (trackIdx + 1) % MUSIC_TRACKS.length })}
        title="Ganti lagu"
        className="console-music-btn"
      >
        <Music2 className="h-4 w-4" />
        <span className="console-music-label">{currentTrack.name}</span>
      </button>

      {/* Volume */}
      <div className="flex h-11 items-center gap-1.5 rounded-full px-2" title="Volume musik">
        <Volume2 className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={Math.max(0, Math.min(1, Number(theme.volume) || 0.5))}
          onChange={(e) => setTheme({ volume: Number(e.target.value) })}
          className="w-16 accent-brand-500"
          aria-label="Volume musik"
        />
      </div>

      {/* Keluar console mode */}
      <button
        onClick={() => toggleConsole(false)}
        title="Keluar Console Mode"
        aria-label="Keluar Console Mode"
        className="console-nav-item"
      >
        <X className="h-5 w-5" />
      </button>
    </nav>
  )
}
