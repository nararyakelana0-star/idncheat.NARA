import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'

/* =====================================================================
   AppContext — state global IDNcheat
   - tier (Murojaah/Upgrade), navigasi, pencarian, kategori aktif
   - gamifikasi: XP, streak, target harian, toast (dihidrasikan &
     dipersist per-akun via AuthContext)
   - tema yang bisa dikustomisasi: mode (light/dark), aksen warna,
     kepadatan layout
   ===================================================================== */

function loadTheme() {
  try {
    const raw = JSON.parse(localStorage.getItem('idncheat_theme'))
    if (raw && typeof raw === 'object') return raw
  } catch {
    /* abaikan */
  }
  return { mode: 'light', accent: 'indigo', density: 'comfortable' }
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

  /* Terapkan tema ke <html> (class dark / data-accent / data-density) */
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', state.theme.mode === 'dark')
    root.dataset.accent = state.theme.accent
    root.dataset.density = state.theme.density
    localStorage.setItem('idncheat_theme', JSON.stringify(state.theme))
  }, [state.theme])

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

  const value = useMemo(
    () => ({ state, dispatch, navigate, addXp, setTheme }),
    [state, navigate, addXp, setTheme]
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
