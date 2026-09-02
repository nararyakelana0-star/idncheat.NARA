import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ConsoleBar from './components/ConsoleBar'
import Toasts from './components/Toasts'
import AuthPage from './components/pages/AuthPage'
import DashboardPage from './components/pages/DashboardPage'
import CatalogPage from './components/pages/CatalogPage'
import CourseDetailPage from './components/pages/CourseDetailPage'
import LessonPage from './components/pages/LessonPage'
import QuizPage from './components/pages/QuizPage'
import MyCoursesPage from './components/pages/MyCoursesPage'
import QuizzesPage from './components/pages/QuizzesPage'
import LeaderboardPage from './components/pages/LeaderboardPage'
import AchievementsPage from './components/pages/AchievementsPage'
import SettingsPage from './components/pages/SettingsPage'

/* =====================================================================
   App — shell IDNcheat
   AuthProvider (luar) → AppProvider (gamifikasi per-akun) → Shell
   Tanpa login → AuthPage (login / sign up)
   ===================================================================== */

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
  const { state } = useApp()
  const consoleMode = !!state.theme.console
  return (
    <div className="min-h-screen">
      {/* Latar ambient halus (dot grid + blob) */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-blob b1" />
        <div className="ambient-blob b2" />
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
      <Toasts />
    </div>
  )
}

function Root() {
  const { user } = useAuth()
  return user ? <Shell /> : <AuthPage />
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
