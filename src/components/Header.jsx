import React, { useEffect, useRef, useState } from 'react'
import {
  Bell,
  Menu,
  Search,
  Flame,
  Star,
  Layers,
  ChevronDown,
  Check,
  Blocks,
  Rocket,
  Sparkles,
  Sun,
  Moon,
  LogOut,
  Settings,
  UserCircle2,
} from 'lucide-react'
import { useApp, levelInfo } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, TIERS } from '../data/curriculum'
import { NOTIFICATIONS, NOTIF_ICONS } from '../data/mockData'
import Logo from './Logo'
import Ring from './ui/Ring'
import Avatar from './ui/Avatar'

/* =====================================================================
   Header — glassmorphism top bar
   Logo · Tier toggle · Dropdown kategori · Search ⌘K · Streak · XP
   · Level + bar harian · Ganti tema · Notifikasi · Profil (logout)
   ===================================================================== */

function TierToggle() {
  const { state, dispatch } = useApp()
  return (
    <div
      className="hidden items-center rounded-full bg-ink p-1 shadow-inner dark:bg-slate-800 sm:flex"
      role="tablist"
      aria-label="Pilih jenjang pembelajaran"
      title="Pilih jenjang pembelajaran"
    >
      {Object.values(TIERS).map((t) => {
        const active = state.tier === t.id
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => dispatch({ type: 'SET_TIER', tier: t.id })}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
              active ? 'bg-white text-slate-900 shadow' : 'text-slate-300 hover:text-white'
            }`}
            title={`${t.label} — ${t.sub}`}
          >
            {t.id === 'murojaah' ? <Blocks className="h-3.5 w-3.5" /> : <Rocket className="h-3.5 w-3.5" />}
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

function CategoryDropdown() {
  const { state, dispatch, navigate } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = CATEGORIES.find((c) => c.id === state.activeCategory)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-brand-500/50"
      >
        <Layers className="h-4 w-4 text-brand-500" />
        <span className="max-w-[140px] truncate">{active ? active.name : 'Semua Kategori'}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="glass absolute left-0 top-[calc(100%+8px)] z-50 w-80 animate-slide-up rounded-2xl p-2 shadow-glass">
          <button
            onClick={() => {
              dispatch({ type: 'SET_CATEGORY', id: null })
              navigate('catalog')
              setOpen(false)
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
              !active ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
              <Layers className="h-4 w-4" />
            </span>
            Semua Kategori
          </button>
          <div className="my-1 h-px bg-slate-200/70 dark:bg-slate-700/70" />
          {CATEGORIES.map((c) => {
            const Icon = c.icon
            const isActive = state.activeCategory === c.id
            return (
              <button
                key={c.id}
                onClick={() => {
                  dispatch({ type: 'SET_CATEGORY', id: c.id })
                  navigate('catalog')
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  isActive ? 'bg-brand-50 dark:bg-brand-500/15' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${c.gradient} text-white`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-sm font-semibold ${isActive ? 'text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-200'}`}>
                    {c.name}
                  </span>
                  <span className="block truncate text-[11px] text-slate-400">{c.sub}</span>
                </span>
                {isActive && <Check className="h-4 w-4 shrink-0 text-brand-500" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SearchBar({ inputRef }) {
  const { state, dispatch, navigate } = useApp()
  return (
    <form
      className="relative min-w-0 flex-1"
      onSubmit={(e) => {
        e.preventDefault()
        navigate('catalog')
      }}
      role="search"
    >
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        ref={inputRef}
        value={state.search}
        onChange={(e) => dispatch({ type: 'SET_SEARCH', value: e.target.value })}
        placeholder="Cari kursus, materi, atau kuis…"
        className="w-full rounded-full border border-slate-200 bg-white/80 py-2 pl-10 pr-14 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 lg:block dark:border-slate-700 dark:bg-slate-800">
        ⌘K
      </kbd>
    </form>
  )
}

function ThemeToggle() {
  const { state, setTheme } = useApp()
  const dark = state.theme.mode === 'dark'
  return (
    <button
      onClick={() => setTheme({ mode: dark ? 'light' : 'dark' })}
      className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white/80 text-slate-500 transition hover:border-brand-300 hover:text-brand-600 sm:grid dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
      aria-label={dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={dark ? 'Mode terang' : 'Mode gelap'}
    >
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  )
}

function NotificationMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const unread = NOTIFICATIONS.filter((n) => n.unread).length

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/80 text-slate-500 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
        aria-label="Notifikasi"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unread > 0 && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        )}
      </button>

      {open && (
        <div className="glass absolute right-0 top-[calc(100%+8px)] z-50 w-80 animate-slide-up rounded-2xl p-2 shadow-glass">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="font-display text-sm font-bold text-slate-800 dark:text-slate-100">Notifikasi</p>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
              {unread} baru
            </span>
          </div>
          {NOTIFICATIONS.map((n) => {
            const Icon = NOTIF_ICONS[n.icon] || Sparkles
            return (
              <button
                key={n.id}
                onClick={() => setOpen(false)}
                className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                    n.icon === 'flame'
                      ? 'bg-orange-100 text-orange-500 dark:bg-orange-500/15'
                      : n.icon === 'trophy'
                      ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/15'
                      : n.icon === 'award'
                      ? 'bg-violet-100 text-violet-600 dark:bg-violet-500/15'
                      : 'bg-brand-50 text-brand-500 dark:bg-brand-500/15'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">{n.title}</span>
                    {n.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{n.body}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    {n.time}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ProfileMenu() {
  const { user, logout } = useAuth()
  const { navigate } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative shrink-0" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="group" aria-label="Menu profil">
        <Avatar
          user={user}
          size="md"
          className="ring-2 ring-white transition group-hover:ring-brand-300 dark:ring-slate-800"
        />
        <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-900">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      </button>

      {open && (
        <div className="glass absolute right-0 top-[calc(100%+8px)] z-50 w-64 animate-slide-up rounded-2xl p-2 shadow-glass">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <Avatar user={user} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
              <p className="truncate text-[11px] text-slate-400">{user.email}</p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                @{user.username} · {user.class}
              </p>
            </div>
          </div>
          <div className="my-1 h-px bg-slate-200/70 dark:bg-slate-700/70" />
          <button
            onClick={() => {
              navigate('settings')
              setOpen(false)
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Settings className="h-4 w-4" /> Pengaturan Akun &amp; Tampilan
          </button>
          <button
            onClick={() => {
              setOpen(false)
              logout()
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <LogOut className="h-4 w-4" /> Keluar Akun
          </button>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { state, dispatch, navigate } = useApp()
  const lv = levelInfo(state.xp)
  const dailyPct = state.daily.earned / state.daily.goal
  const searchRef = useRef(null)

  /* Shortcut ⌘K / Ctrl+K untuk fokus pencarian */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="glass border-x-0 border-t-0">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-2 px-3 sm:gap-3 sm:px-5">
          {/* Mobile: tombol sidebar */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 lg:hidden dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Logo onClick={() => navigate('dashboard')} />

          <TierToggle />
          <CategoryDropdown />

          <div className="hidden max-w-md min-w-0 flex-1 sm:block">
            <SearchBar inputRef={searchRef} />
          </div>
          <div className="flex-1 sm:hidden" />

          {/* Streak harian */}
          <div
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-orange-200/80 bg-orange-50 px-3 py-1.5 dark:border-orange-500/30 dark:bg-orange-500/10"
            title="Streak harian aktif"
          >
            <Flame className="h-4 w-4 fill-orange-100 text-orange-500 dark:fill-orange-500/20" />
            <span className="text-sm font-extrabold tabular-nums text-orange-600 dark:text-orange-400">{state.streak}</span>
            <span className="hidden text-[11px] font-bold text-orange-500/80 lg:inline dark:text-orange-400/70">
              -day streak
            </span>
          </div>

          {/* XP total */}
          <div
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1.5 dark:border-amber-500/30 dark:bg-amber-500/10"
            title="Total poin pengalaman"
          >
            <Star className="h-4 w-4 fill-amber-300 text-amber-500 dark:fill-amber-400/40 dark:text-amber-400" />
            <span className="text-sm font-extrabold tabular-nums text-amber-700 dark:text-amber-400">
              {state.xp.toLocaleString('id-ID')}
            </span>
            <span className="hidden text-[11px] font-bold text-amber-600/80 sm:inline dark:text-amber-400/70">XP</span>
          </div>

          {/* Level profil + progres harian */}
          <div className="hidden shrink-0 items-center gap-2.5 xl:flex" title="Level & target harian">
            <Ring size={42} stroke={4.5} value={lv.pct} trackClassName="stroke-slate-200 dark:stroke-slate-700">
              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">{lv.level}</span>
            </Ring>
            <div className="w-28">
              <p className="-mb-0.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">{lv.rank}</p>
              <p className="text-[11px] font-semibold tabular-nums text-slate-600 dark:text-slate-300">
                {state.daily.earned}/{state.daily.goal} XP hari ini
              </p>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
                  style={{ width: `${Math.min(100, dailyPct * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <ThemeToggle />
          <NotificationMenu />
          <ProfileMenu />
        </div>
      </div>

      {/* Strip progres harian (di bawah header) */}
      <div className="h-[3px] w-full bg-slate-200/60 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-brand-500 via-violet-500 to-brand-400 transition-all duration-700"
          style={{ width: `${Math.min(100, dailyPct * 100)}%` }}
        />
      </div>
    </header>
  )
}
