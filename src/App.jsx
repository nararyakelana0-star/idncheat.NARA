import React, { useEffect, useRef, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ConsoleBar from './components/ConsoleBar'
import BootSplash from './components/BootSplash'
import PowerOffSplash from './components/PowerOffSplash'
import Toasts from './components/Toasts'
import AuthPage from './components/pages/AuthPage'
import DashboardPage from './components/pages/DashboardPage'
import CatalogPage from './components/pages/CatalogPage'
import CourseDetailPage from './components/pages/CourseDetailPage'
import LessonPage from './components/pages/LessonPage'
import QuizPage from './components/pages/QuizPage'
import MyCoursesPage from './components/pages/MyCoursesPage'
import QuizzesPage from './components/pages/QuizzesPage'
import ChatPage from './components/pages/ChatPage'
import LeaderboardPage from './components/pages/LeaderboardPage'
import AchievementsPage from './components/pages/AchievementsPage'
import SettingsPage from './components/pages/SettingsPage'

/* =====================================================================
   App — shell IDNcheat
   AuthProvider (luar) → AppProvider (gamifikasi per-akun) → Shell
   Tanpa login → AuthPage (login / sign up)
   ===================================================================== */

/* Partikel melayang (posisi & durasi deterministik) — hanya tampil di Console Mode */
const PARTICLES = [
  { left: 4, size: 5, dur: 26, delay: 0, cls: '' },
  { left: 11, size: 3, dur: 34, delay: 6, cls: 'glow-cyan' },
  { left: 18, size: 6, dur: 29, delay: 12, cls: '' },
  { left: 26, size: 4, dur: 38, delay: 3, cls: 'glow-violet' },
  { left: 33, size: 3, dur: 31, delay: 17, cls: '' },
  { left: 41, size: 5, dur: 27, delay: 9, cls: 'glow-cyan' },
  { left: 49, size: 4, dur: 36, delay: 21, cls: '' },
  { left: 56, size: 6, dur: 30, delay: 1, cls: 'glow-violet' },
  { left: 63, size: 3, dur: 33, delay: 14, cls: '' },
  { left: 70, size: 5, dur: 28, delay: 7, cls: 'glow-cyan' },
  { left: 78, size: 4, dur: 37, delay: 19, cls: '' },
  { left: 85, size: 6, dur: 25, delay: 11, cls: 'glow-violet' },
  { left: 91, size: 3, dur: 32, delay: 24, cls: '' },
  { left: 97, size: 4, dur: 29, delay: 5, cls: 'glow-cyan' },
]

function PageRouter() {
  const { state } = useApp()
  switch (state.page.name) {
    case 'catalog':
      return <CatalogPage />
    case 'course':
      return <CourseDetailPage />
    case 'lesson':
      return <LessonPage />
    case 'quiz':
      return <QuizPage />
    case 'mycourses':
      return <MyCoursesPage />
    case 'quizzes':
      return <QuizzesPage />
    case 'chat':
      return <ChatPage />
    case 'leaderboard':
      return <LeaderboardPage />
    case 'achievements':
      return <AchievementsPage />
    case 'settings':
      return <SettingsPage />
    case 'dashboard':
    default:
      return <DashboardPage />
  }
}

function Shell() {
  const { state, poweringOff } = useApp()
  const consoleMode = !!state.theme.console
  const [booting, setBooting] = useState(consoleMode)
  const prevConsole = useRef(consoleMode)
  useEffect(() => {
    if (consoleMode && !prevConsole.current) setBooting(true)
    prevConsole.current = consoleMode
  }, [consoleMode])

  return (
    <div className="min-h-screen">
      {/* Latar ambient halus (dot grid + blob + partikel bergerak di Console Mode) */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-blob b1" />
        <div className="ambient-blob b2" />
        <div className="ambient-particles">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={`ambient-particle ${p.cls}`}
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
      <Header />
      {consoleMode ? null : <Sidebar />}
      <main className={`relative pt-[76px] ${consoleMode ? 'pb-36' : 'lg:pl-64'}`}>
        {/* dekorasi latar radial halus */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(640px_220px_at_18%_0%,rgba(99,102,241,0.07),transparent),radial-gradient(520px_220px_at_85%_0%,rgba(249,115,22,0.05),transparent)] dark:bg-[radial-gradient(640px_220px_at_18%_0%,rgba(99,102,241,0.12),transparent),radial-gradient(520px_220px_at_85%_0%,rgba(249,115,22,0.07),transparent)]"
        />
        <div
          key={`${state.page.name}-${JSON.stringify(state.page.payload)}`}
          className={`relative mx-auto w-full max-w-7xl animate-slide-up px-4 py-6 sm:px-6 lg:px-8 ${
            consoleMode ? 'max-w-6xl' : ''
          }`}
        >
          <PageRouter />
        </div>
      </main>
      {consoleMode && <ConsoleBar />}
      {booting && <BootSplash onDone={() => setBooting(false)} />}
      {poweringOff && <PowerOffSplash />}
      <Toasts />
    </div>
  )
}

function Root() {
  const { user } = useAuth()
  return user ? (
    <ErrorBoundary>
      <Shell />
    </ErrorBoundary>
  ) : (
    <AuthPage />
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Root />
      </AppProvider>
    </AuthProvider>
  )
}
