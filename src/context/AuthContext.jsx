import React, { createContext, useCallback, useContext, useState } from 'react'

/* =====================================================================
   AuthContext — login & sign up (username, email, password)
   Penyimpanan: localStorage (idncheat_users / idncheat_session)
   Setiap akun menyimpan gamifikasi-nya sendiri (XP, streak, progres).
   ===================================================================== */

const USERS_KEY = 'idncheat_users'
const SESSION_KEY = 'idncheat_session'

export const AVATAR_GRADIENTS = [
  'from-brand-500 to-violet-600',
  'from-teal-500 to-emerald-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-sky-500 to-cyan-600',
  'from-lime-500 to-green-600',
]

export function defaultGamification() {
  return {
    xp: 0,
    streak: 1,
    daily: { earned: 0, goal: 100 },
    courseProgress: {},
    completedQuizzes: {},
  }
}

const DEMO_USER = {
  username: 'budi',
  email: 'budi@idnpamijahan.sch.id',
  password: 'idncheat123',
  name: 'Budi Santoso',
  class: 'XII RPL 2',
  program: 'RPL',
  avatar: AVATAR_GRADIENTS[0],
  joined: '2025-07-15',
  gamification: defaultGamification(),
}

function loadUsers() {
  try {
    const raw = JSON.parse(localStorage.getItem(USERS_KEY))
    if (Array.isArray(raw) && raw.length > 0) {
      // Migrasi: akun demo (budi / aisyah lama) disinkronkan ke budi.
      // Progres & XP bawaan awal di-reset agar daftar materi selalu
      // mencerminkan apa yang benar-benar sudah dikerjakan siswa.
      return raw
        .map((u) =>
          u.username === 'budi' || u.username === 'aisyah'
            ? { ...u, username: DEMO_USER.username, email: DEMO_USER.email, name: DEMO_USER.name, gamification: defaultGamification() }
            : u
        )
        .filter((u, i, arr) => arr.findIndex((x) => x.username === u.username) === i)
    }
  } catch {
    /* abaikan */
  }
  return [DEMO_USER]
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  const users = loadUsers()
  let username = localStorage.getItem(SESSION_KEY)
  if (username === 'aisyah') username = 'budi' // migrasi sesi demo lama
  return users.find((u) => u.username === username) || null
}

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(loadSession)

  const persist = useCallback((next) => {
    setUsers(next)
    saveUsers(next)
  }, [])

  /* Sinkron user ke server IDNcheat (roster leaderboard) — silent, non-blocking */
  const syncToServer = useCallback((u) => {
    if (!u) return
    try {
      fetch('/api/users/upsert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: u.username,
          name: u.name,
          class: u.class,
          xp: u.gamification?.xp ?? 0,
          streak: u.gamification?.streak ?? 0,
          avatarUrl: u.avatarUrl || '',
        }),
      }).catch(() => {})
    } catch {
      /* abaikan — server mungkin belum siap */
    }
  }, [])

  /* ---- LOGIN: via username ATAU email + password ---- */
  const login = useCallback(
    (identifier, password) => {
      const id = (identifier || '').trim().toLowerCase()
      const found = users.find(
        (u) => u.username.toLowerCase() === id || u.email.toLowerCase() === id
      )
      if (!found) return { ok: false, error: 'Username/email tidak terdaftar.' }
      if (found.password !== password) return { ok: false, error: 'Password salah. Coba lagi.' }
      localStorage.setItem(SESSION_KEY, found.username)
      setUser(found)
      syncToServer(found)
      return { ok: true }
    },
    [users, syncToServer]
  )

  /* ---- SIGN UP ---- */
  const register = useCallback(
    ({ username, email, password, name, classRoom, program }) => {
      const uname = (username || '').trim()
      const mail = (email || '').trim()
      if (users.some((u) => u.username.toLowerCase() === uname.toLowerCase()))
        return { ok: false, error: 'Username sudah dipakai. Pilih yang lain.' }
      if (users.some((u) => u.email.toLowerCase() === mail.toLowerCase()))
        return { ok: false, error: 'Email sudah terdaftar. Silakan login.' }
      const newUser = {
        username: uname,
        email: mail,
        password,
        name: (name || '').trim() || uname,
        class: classRoom || '—',
        program: program || 'Umum',
        avatar: AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)],
        joined: new Date().toISOString().slice(0, 10),
        gamification: defaultGamification(),
      }
      const next = [...users, newUser]
      persist(next)
      localStorage.setItem(SESSION_KEY, newUser.username)
      setUser(newUser)
      syncToServer(newUser)
      return { ok: true }
    },
    [users, persist]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  /* ---- Update profil / gamifikasi user aktif (persist ke users) ---- */
  const updateUser = useCallback(
    (patch) => {
      if (!user) return
      const next = users.map((u) =>
        u.username === user.username ? { ...u, ...patch } : u
      )
      persist(next)
      setUser({ ...user, ...patch })
    },
    [user, users, persist]
  )

  return (
    <Ctx.Provider value={{ user, users, login, register, logout, updateUser }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  return useContext(Ctx)
}
