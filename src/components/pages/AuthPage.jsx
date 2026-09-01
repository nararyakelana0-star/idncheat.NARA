import React, { useState } from 'react'
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Rocket,
  Moon,
  Code2,
  Languages,
  ArrowRight,
  AlertCircle,
  Sun,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import Logo from '../Logo'

/* =====================================================================
   Auth Page — Login & Sign Up
   (username / email + password) dengan validasi ringan
   ===================================================================== */

const PILAR = [
  { icon: Code2, title: 'IT Development', desc: 'RPL, TKJ, DKV & sertifikasi' },
  { icon: Moon, title: 'Diniyah Salaf', desc: 'Tajwid, fiqih, nahwu & sirah' },
  { icon: Languages, title: 'Bahasa', desc: 'Arab, Inggris, Mandarin & Jepang' },
]

export default function AuthPage() {
  const { login, register } = useAuth()
  const { setTheme, state } = useApp()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    classRoom: '',
    program: 'RPL',
  })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const switchMode = (m) => {
    setMode(m)
    setError('')
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      if (!form.username.trim() || !form.password) {
        setError('Isi username/email dan password dulu, ya.')
        return
      }
      const res = login(form.username, form.password)
      if (!res.ok) setError(res.error)
      return
    }

    // register — validasi
    if (form.name.trim().length < 2) return setError('Nama minimal 2 karakter.')
    if (form.username.trim().length < 3) return setError('Username minimal 3 karakter.')
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return setError('Format email tidak valid.')
    if (form.password.length < 6) return setError('Password minimal 6 karakter.')
    const res = register(form)
    if (!res.ok) setError(res.error)
  }

  const fillDemo = () => {
    setForm((f) => ({ ...f, username: 'budi', email: 'budi@idnpamijahan.sch.id', password: 'idncheat123' }))
    setError('')
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Panel branding (kiri) */}
      <div className="relative hidden overflow-hidden bg-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-24 h-24 w-24 rounded-2xl border border-white/10" />

        <Logo size="lg" onClick={() => {}} showWord />

        <div className="relative">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-brand-300">
            IDN Boarding School Pamijahan
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight">
            Belajar cerdas,
            <br />
            streak tanpa henti.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            Platform e-learning dengan pilar kurikulum IT, Diniyah Salaf, dan Bahasa. Kumpulkan XP,
            jaga streak, dan buktikan pemahamanmu lewat kuis interaktif.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PILAR.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600">
                    <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                  </span>
                  <p className="mt-3 text-sm font-bold">{p.title}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Rocket className="h-3.5 w-3.5 text-brand-400" /> 43 Kursus
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> 43 Kuis Interaktif
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Aman & Personal
          </span>
        </div>
      </div>

      {/* Form (kanan) */}
      <div className="flex min-h-screen items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Logo />
            <button
              onClick={() => setTheme({ mode: state.theme.mode === 'dark' ? 'light' : 'dark' })}
              className="btn-ghost !p-2.5"
              aria-label="Ganti tema"
            >
              {state.theme.mode === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Masuk ke IDNcheat' : 'Buat Akun Baru'}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {mode === 'login'
                ? 'Lanjutkan streak belajarmu hari ini.'
                : 'Gratis. Mulai petualangan belajarmu sekarang.'}
            </p>

            {/* Tab */}
            <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              {['login', 'register'].map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`rounded-lg py-2 text-sm font-bold transition ${
                    mode === m
                      ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {m === 'login' ? 'Masuk' : 'Daftar'}
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={submit} className="mt-5 space-y-3.5">
              {mode === 'register' && (
                <Field
                  icon={<User className="h-4 w-4" />}
                  label="Nama lengkap"
                  type="text"
                  value={form.name}
                  onChange={(v) => set('name', v)}
                  placeholder="cth. Budi Santoso"
                />
              )}

              {mode === 'login' ? (
                <Field
                  icon={<User className="h-4 w-4" />}
                  label="Username / Email"
                  type="text"
                  value={form.username}
                  onChange={(v) => set('username', v)}
                    placeholder="budi atau budi@idn.id"
                />
              ) : (
                <>
                  <Field
                    icon={<User className="h-4 w-4" />}
                    label="Username"
                    type="text"
                    value={form.username}
                    onChange={(v) => set('username', v)}
                    placeholder="budi_12"
                  />
                  <Field
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => set('email', v)}
                    placeholder="kamu@idnpamijahan.sch.id"
                  />
                </>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    placeholder="••••••••"
                    className="input-base !pl-10 !pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label="Tampilkan password"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">
                      Kelas
                    </label>
                    <input
                      className="input-base"
                      value={form.classRoom}
                      onChange={(e) => set('classRoom', e.target.value)}
                      placeholder="XII RPL 2"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">
                      Program
                    </label>
                    <select
                      className="input-base"
                      value={form.program}
                      onChange={(e) => set('program', e.target.value)}
                    >
                      {['RPL', 'TJKT / TKJ', 'DKV', 'Diniyah', 'Umum'].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary w-full !py-3">
                {mode === 'login' ? 'Masuk' : 'Daftar & Mulai'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {mode === 'login' && (
              <button
                onClick={fillDemo}
                className="mt-3 w-full rounded-xl border border-dashed border-brand-300 bg-brand-50/50 px-3 py-2.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300"
              >
                🧪 Coba akun demo: <span className="font-mono">budi</span> / <span className="font-mono">idncheat123</span>
              </button>
            )}

            <p className="mt-4 text-center text-xs text-slate-400">
              {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
              <button
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="font-bold text-brand-600 hover:underline dark:text-brand-400"
              >
                {mode === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
              </button>
            </p>
          </div>

          <p className="mt-5 text-center text-[11px] font-semibold text-slate-400">
            IDNcheat · IDN Boarding School Pamijahan
          </p>
          <p className="mt-1 text-center text-[11px] font-semibold text-slate-400">
            Developed by Nararya Irsyad Kelana
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ icon, label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-base !pl-10"
        />
      </div>
    </div>
  )
}
