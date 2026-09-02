import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'
import { consoleMusic, MUSIC_TRACKS } from '../audio/consoleMusic'
import { buildCursorVars } from '../data/cursors'

/* =====================================================================
   AppContext — state global IDNcheat
   - tier (Murojaah/Upgrade), navigasi, pencarian, kategori aktif
   - gamifikasi: XP, streak, target harian, toast (dihidrasikan &
     dipersist per-akun via AuthContext)
   - tema yang bisa dikustomisasi: mode (light/dark), aksen warna,
     kepadatan layout
   ===================================================================== */

function loadTheme() {
  const defaults = {
    mode: 'light',
    accent: 'indigo',
    density: 'comfortable',
    console: false,
    track: 0,
    volume: 0.5,
    cursor: 'default',
    cursorUrl: '',
  }
  try {
    const raw = JSON.parse(localStorage.getItem('idncheat_theme'))
    if (raw && typeof raw === 'object') {
      // Gabung dengan default agar tema lama (tanpa key console/track/volume) tetap valid
      const t = { ...defaults, ...raw }
      if (!Number.isInteger(t.track) || t.track < 0 || t.track > 3) t.track = 0
      if (typeof t.volume !== 'number' || Number.isNaN(t.volume)) t.volume = 0.5
      t.volume = Math.max(0, Math.min(1, t.volume))
      // Console Mode tidak pernah aktif otomatis saat website dibuka
      t.console = false
      return t
    }
  } catch {
    /* abaikan */
  }
  return defaults
}

const initialState = {
  tier: 'upgrade',
  page: { name: 'dashboard', payload: {} },
  search: '',
  activeCategory: null,
  xp: 0,
  streak: 1,
  daily: { earned: 0, goal: 100 },
  toasts: [],
  courseProgress: {},
  completedQuizzes: {},
  sidebarOpen: false,
  theme: loadTheme(),
}

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, page: action.page, sidebarOpen: false }
    case 'SET_TIER':
      return { ...state, tier: action.tier }
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.id }
    case 'SET_SEARCH':
      return { ...state, search: action.value }
    case 'ADD_XP':
      return {
        ...state,
        xp: state.xp + action.amount,
        daily: {
          ...state.daily,
          earned: Math.min(state.daily.goal, state.daily.earned + action.amount),
        },
      }
    case 'PUSH_TOAST':
      return { ...state, toasts: [...state.toasts.slice(-3), action.toast] }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }
    case 'SET_PROGRESS':
      return {
        ...state,
        courseProgress: { ...state.courseProgress, [action.courseId]: action.value },
      }
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        completedQuizzes: {
          ...state.completedQuizzes,
          [action.courseId]: {
            score: action.score,
            correct: action.correct,
            total: action.total,
          },
        },
      }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'SET_THEME':
      return { ...state, theme: { ...state.theme, ...action.patch } }
    case 'HYDRATE_USER':
      return {
        ...state,
        xp: action.payload.xp ?? 0,
        streak: action.payload.streak ?? 1,
        daily: action.payload.daily ?? { earned: 0, goal: 100 },
        courseProgress: action.payload.courseProgress ?? {},
        completedQuizzes: action.payload.completedQuizzes ?? {},
      }
    default:
      return state
  }
}

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const seq = useRef(1)
  const { user, updateUser } = useAuth()
  const consoleRef = useRef(false)
  consoleRef.current = !!state.theme.console

  /* Terapkan tema ke <html> (class dark / data-accent / data-density / data-console)
     Catatan: Console Mode selalu memaksa tema dark agar semua teks
     memakai varian dark: (hindari teks gelap di atas latar neon gelap). */
  useEffect(() => {
    const root = document.documentElement
    const isDark = state.theme.mode === 'dark' || state.theme.console
    root.classList.toggle('dark', isDark)
    root.dataset.accent = state.theme.accent
    root.dataset.density = state.theme.density
    root.dataset.console = state.theme.console ? 'on' : 'off'
    // Cursor custom (aktif di Console Mode)
    const cursorVar = buildCursorVars(state.theme)
    if (cursorVar.main) root.style.setProperty('--cursor-main', cursorVar.main)
    else root.style.removeProperty('--cursor-main')
    if (cursorVar.pointer) root.style.setProperty('--cursor-pointer', cursorVar.pointer)
    else root.style.removeProperty('--cursor-pointer')
    localStorage.setItem('idncheat_theme', JSON.stringify(state.theme))
  }, [state.theme])

  /* Console Mode: musik + resume audio & force fullscreen via gesture pertama */
  useEffect(() => {
    if (state.theme.console) {
      const vol = Math.max(0, Math.min(1, Number(state.theme.volume) || 0.5))
      const track = Math.max(0, Math.min(MUSIC_TRACKS.length - 1, Number(state.theme.track) || 0))
      consoleMusic.setVolume(vol)
      consoleMusic.start(track, vol)
      const resume = () => {
        // browser policy: audio & fullscreen baru bisa dari gesture user
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {})
        }
        consoleMusic.start(track, vol)
      }
      window.addEventListener('pointerdown', resume, { once: true })
      return () => window.removeEventListener('pointerdown', resume)
    }
    consoleMusic.stop()
    return undefined
  }, [state.theme.console, state.theme.track, state.theme.volume])

  /* SFX global: setiap klik tombol/tautan saat Console Mode aktif */
  useEffect(() => {
    if (!state.theme.console) return
    const onClick = (e) => {
      const el = e.target?.closest?.('button, a, label[for], [role="button"]')
      if (el) consoleMusic.playClick()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [state.theme.console])

  /* Hidrasi gamifikasi saat login (per-akun) */
  useEffect(() => {
    if (user && user.gamification) {
      dispatch({ type: 'HYDRATE_USER', payload: user.gamification })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.username])

  /* Persist gamifikasi ke akun saat berubah */
  useEffect(() => {
    if (!user) return
    updateUser({
      gamification: {
        xp: state.xp,
        streak: state.streak,
        daily: state.daily,
        courseProgress: state.courseProgress,
        completedQuizzes: state.completedQuizzes,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user?.username,
    state.xp,
    state.streak,
    state.daily,
    state.courseProgress,
    state.completedQuizzes,
  ])

  const navigate = useCallback((name, payload = {}) => {
    dispatch({ type: 'NAVIGATE', page: { name, payload } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (consoleRef.current) consoleMusic.playSelect()
  }, [])

  const addXp = useCallback((amount, source) => {
    dispatch({ type: 'ADD_XP', amount })
    const id = `t-${Date.now()}-${seq.current++}`
    dispatch({
      type: 'PUSH_TOAST',
      toast: { id, title: `+${amount} XP`, sub: source || 'Pengalaman bertambah' },
    })
  }, [])

  const setTheme = useCallback((patch) => {
    dispatch({ type: 'SET_THEME', patch })
  }, [])

  /* Nyalakan/matikan Console Mode + force/exit fullscreen + SFX.
     Matikan = splash power-off dulu, baru UI kembali normal (smooth). */
  const [poweringOff, setPoweringOff] = React.useState(false)
  const powerOffTimer = useRef(null)
  React.useEffect(() => () => powerOffTimer.current && clearTimeout(powerOffTimer.current), [])

  const toggleConsole = useCallback(
    (on) => {
      if (on) {
        setTheme({ console: true })
        document.documentElement.requestFullscreen?.().catch(() => {})
      } else if (poweringOff) {
        return // sedang power off — abaikan
      } else {
        setPoweringOff(true)
        consoleMusic.playPowerDown()
        powerOffTimer.current = setTimeout(() => {
          setTheme({ console: false }) // efek tema akan fade-stop musiknya
          if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => {})
          }
          setPoweringOff(false)
        }, 1250)
      }
    },
    [setTheme, poweringOff]
  )

  const value = useMemo(
    () => ({ state, dispatch, navigate, addXp, setTheme, toggleConsole, poweringOff }),
    [state, navigate, addXp, setTheme, toggleConsole, poweringOff]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  return useContext(Ctx)
}

/* Level profil dari XP: setiap 500 XP naik 1 level */
export const RANKS = [
  'Pemula',
  'Eksplorator',
  'Pejuang Ilmu',
  'Mahir',
  'Ustadz Muda',
  'Guru Besar',
  'Legenda IDN',
]

export function levelInfo(xp) {
  const level = Math.floor(xp / 500) + 1
  const into = xp % 500
  return {
    level,
    into,
    toNext: 500 - into,
    pct: into / 500,
    rank: RANKS[Math.min(level - 1, RANKS.length - 1)],
  }
}
