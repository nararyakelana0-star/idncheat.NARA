import React, { useState } from 'react'
import {
  User,
  Bell,
  Flame,
  Target,
  Save,
  LogOut,
  Sun,
  Moon,
  Palette,
  Monitor,
  Check,
  Camera,
  Gamepad2,
  Music2,
  Volume2,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useAuth, AVATAR_GRADIENTS } from '../../context/AuthContext'
import { TIERS } from '../../data/curriculum'
import { MUSIC_TRACKS } from '../../audio/consoleMusic'
import PageTitle from '../ui/PageTitle'
import Avatar from '../ui/Avatar'

/* =====================================================================
   Pengaturan — Tampilan (customizable UI) + Akun (customizable account)
   - Mode: Terang / Gelap
   - Aksen warna: 6 pilihan (perubahan langsung)
   - Kepadatan: Normal / Kompak
   - Profil: nama, kelas, program, warna avatar
   ===================================================================== */

const ACCENTS = [
  { id: 'indigo', label: 'Indigo', swatch: 'bg-[#6366F1]' },
  { id: 'emerald', label: 'Emerald', swatch: 'bg-[#10B981]' },
  { id: 'rose', label: 'Rose', swatch: 'bg-[#F43F5E]' },
  { id: 'amber', label: 'Amber', swatch: 'bg-[#F59E0B]' },
  { id: 'sky', label: 'Sky', swatch: 'bg-[#0EA5E9]' },
  { id: 'violet', label: 'Violet', swatch: 'bg-[#8B5CF6]' },
]

function Toggle({ on, onToggle, label }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          on ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const { state, setTheme, addXp } = useApp()
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    classRoom: user?.class || '',
    program: user?.program || 'Umum',
    avatar: user?.avatar || AVATAR_GRADIENTS[0],
    avatarUrl: user?.avatarUrl || '',
    goal: state.daily.goal,
    showStreak: true,
    sound: true,
    pushNotif: true,
    emailNotif: false,
  })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const theme = state.theme

  /* Upload foto profil: crop tengah → 96×96 JPEG (hemat localStorage) */
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const size = 96
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      const s = Math.min(img.width, img.height)
      ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size)
      set('avatarUrl', canvas.toDataURL('image/jpeg', 0.85))
      URL.revokeObjectURL(url)
    }
    img.src = url
    e.target.value = ''
  }

  const saveProfile = () => {
    updateUser({
      name: form.name.trim() || user?.username,
      class: form.classRoom,
      program: form.program,
      avatar: form.avatar,
      avatarUrl: form.avatarUrl,
      gamification: {
        ...user.gamification,
        daily: { ...user.gamification.daily, goal: form.goal },
      },
    })
    addXp(5, 'Profil & preferensi diperbarui')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle
        crumb="Akun"
        title="Pengaturan"
        sub="Kustomisasi tampilan IDNcheat dan profil akunmu. Perubahan tampilan langsung terasa di seluruh aplikasi."
      />

      <div className="space-y-5">
        {/* ============ TAMPILAN (CUSTOMIZABLE UI) ============ */}
        <section className="card p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900 dark:text-white">
            <Palette className="h-[18px] w-[18px] text-brand-500" /> Tampilan
          </h3>

          {/* Mode terang/gelap */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">Mode tampilan</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme({ mode: 'light' })}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
                  theme.mode === 'light'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400'
                }`}
              >
                <Sun className="h-4 w-4" /> Terang
              </button>
              <button
                onClick={() => setTheme({ mode: 'dark' })}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
                  theme.mode === 'dark'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400'
                }`}
              >
                <Moon className="h-4 w-4" /> Gelap
              </button>
            </div>
          </div>

          {/* Aksen warna */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              Aksen warna{' '}
              <span className="font-semibold text-slate-400">(tombol, progres, highlight)</span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {ACCENTS.map((a) => {
                const active = theme.accent === a.id
                return (
                  <button
                    key={a.id}
                    onClick={() => setTheme({ accent: a.id })}
                    className={`flex items-center gap-2 rounded-full border-2 py-1.5 pl-1.5 pr-3.5 text-xs font-bold transition ${
                      active
                        ? 'border-slate-800 dark:border-white'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                    }`}
                    style={{
                      background: active ? undefined : undefined,
                      color: active ? undefined : undefined,
                    }}
                  >
                    <span className={`grid h-6 w-6 place-items-center rounded-full ${a.swatch} text-white`}>
                      {active && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="text-slate-700 dark:text-slate-200">{a.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Kepadatan */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">Kepadatan layout</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme({ density: 'comfortable' })}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
                  theme.density === 'comfortable'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400'
                }`}
              >
                <Monitor className="h-4 w-4" /> Normal
              </button>
              <button
                onClick={() => setTheme({ density: 'compact' })}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
                  theme.density === 'compact'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400'
                }`}
              >
                <Monitor className="h-4 w-4" /> Kompak
              </button>
            </div>
            <p className="mt-2 text-[11px] font-semibold text-slate-400">
              Kompak = semua ukuran lebih rapat, muat lebih banyak informasi di layar.
            </p>
          </div>
        </section>

        {/* ============ CONSOLE MODE ============ */}
        <section className="card p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900 dark:text-white">
            <Gamepad2 className="h-[18px] w-[18px] text-brand-500" /> Console Mode
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            UI berubah total ala game console (PS4 / Nintendo Switch): dark neon, bottom bar,
            plus musik chiptune yang bisa diganti.
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Nyalakan Console Mode</p>
              <p className="text-xs text-slate-400">Sidebar diganti bottom bar + tema neon</p>
            </div>
            <Toggle on={theme.console} onToggle={() => setTheme({ console: !theme.console })} label="Console Mode" />
          </div>

          <div className="mt-5">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
              <Music2 className="h-3.5 w-3.5" /> Lagu console
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {MUSIC_TRACKS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setTheme({ track: i })}
                  className={`rounded-xl border-2 px-3 py-2.5 text-left text-xs font-bold transition ${
                    theme.track === i
                      ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  <Music2 className="mb-1 h-4 w-4" />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-200">
                <Volume2 className="h-4 w-4 text-brand-500" /> Volume musik
              </p>
              <p className="text-xs text-slate-400">Berlaku saat Console Mode menyala</p>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={theme.volume}
              onChange={(e) => setTheme({ volume: Number(e.target.value) })}
              className="w-36 accent-brand-600"
              aria-label="Volume musik"
            />
          </div>
        </section>

        {/* ============ AKUN (CUSTOMIZABLE ACCOUNT) ============ */}
        <section className="card p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900 dark:text-white">
            <User className="h-[18px] w-[18px] text-brand-500" /> Profil &amp; Akun
          </h3>

          {/* Avatar */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Avatar
              user={{ ...(user || {}), avatarUrl: form.avatarUrl || undefined, name: form.name }}
              size="lg"
            />
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap gap-2">
                <label className="btn-ghost inline-flex cursor-pointer items-center gap-1.5 !px-3 !py-1.5 text-xs">
                  <Camera className="h-3.5 w-3.5" /> Upload Foto
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
                {form.avatarUrl && (
                  <button onClick={() => set('avatarUrl', '')} className="btn-ghost !px-3 !py-1.5 text-xs">
                    Hapus Foto
                  </button>
                )}
              </div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                <Palette className="h-3.5 w-3.5" /> Warna avatar <span className="font-semibold text-slate-400">(jika tanpa foto)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_GRADIENTS.map((g) => (
                  <button
                    key={g}
                    onClick={() => set('avatar', g)}
                    className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br transition ${g} ${
                      form.avatar === g
                        ? 'ring-2 ring-slate-800 ring-offset-2 dark:ring-white dark:ring-offset-slate-900'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    aria-label="Warna avatar"
                  >
                    {form.avatar === g && <Check className="h-4 w-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">Nama lengkap</span>
              <input className="input-base" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">Username</span>
              <input className="input-base opacity-60" value={user?.username || ''} disabled />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">Kelas</span>
              <input className="input-base" value={form.classRoom} onChange={(e) => set('classRoom', e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-500 dark:text-slate-400">Program Studi</span>
              <select className="input-base" value={form.program} onChange={(e) => set('program', e.target.value)}>
                {['RPL', 'TJKT / TKJ', 'DKV', 'Diniyah', 'Umum'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Email</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-extrabold uppercase text-slate-500 dark:bg-slate-700 dark:text-slate-300">
              Permanen
            </span>
          </div>
        </section>

        {/* ============ GAMIFIKASI ============ */}
        <section className="card p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900 dark:text-white">
            <Flame className="h-[18px] w-[18px] text-orange-500" /> Gamifikasi
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Tampilkan streak di header</p>
                <p className="text-xs text-slate-400">Ikon api &amp; hitungan hari aktif</p>
              </div>
              <Toggle on={form.showStreak} onToggle={() => set('showStreak', !form.showStreak)} label="Tampilkan streak" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Efek suara &amp; animasi XP</p>
                <p className="text-xs text-slate-400">Toast + suara saat menjawab benar</p>
              </div>
              <Toggle on={form.sound} onToggle={() => set('sound', !form.sound)} label="Efek suara" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-200">
                  <Target className="h-4 w-4 text-brand-500" /> Target harian
                </p>
                <p className="text-xs text-slate-400">
                  Sekarang: <span className="font-extrabold text-brand-600 dark:text-brand-400">{form.goal} XP</span>
                </p>
              </div>
              <input
                type="range"
                min={50}
                max={200}
                step={10}
                value={form.goal}
                onChange={(e) => set('goal', Number(e.target.value))}
                className="w-36 accent-brand-600"
                aria-label="Target harian"
              />
            </div>
          </div>
        </section>

        {/* ============ NOTIFIKASI ============ */}
        <section className="card p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900 dark:text-white">
            <Bell className="h-[18px] w-[18px] text-brand-500" /> Notifikasi
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Notifikasi push</p>
                <p className="text-xs text-slate-400">Pengingat streak &amp; kuis baru</p>
              </div>
              <Toggle on={form.pushNotif} onToggle={() => set('pushNotif', !form.pushNotif)} label="Push" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Ringkasan email mingguan</p>
                <p className="text-xs text-slate-400">Rekap XP &amp; peringkat tiap Senin</p>
              </div>
              <Toggle on={form.emailNotif} onToggle={() => set('emailNotif', !form.emailNotif)} label="Email" />
            </div>
          </div>
        </section>

        {/* ============ AKSI ============ */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button onClick={saveProfile} className="btn-primary flex-1">
            <Save className="h-4 w-4" /> Simpan Profil
          </button>
          <LogoutButton />
        </div>

        <p className="pb-2 text-center text-xs font-semibold text-slate-400">
          IDNcheat v1.1 · IDN Boarding School Pamijahan · React + Tailwind CSS
        </p>
      </div>
    </div>
  )
}

function LogoutButton() {
  const { logout } = useAuth()
  return (
    <button
      onClick={logout}
      className="btn-ghost flex-1 !text-rose-600 hover:!bg-rose-50 dark:!text-rose-400 dark:hover:!bg-rose-500/10"
    >
      <LogOut className="h-4 w-4" /> Keluar Akun
    </button>
  )
}
