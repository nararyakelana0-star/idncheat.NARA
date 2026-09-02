import {
  Flame,
  Sparkles,
  Trophy,
  Award,
  Star,
  Moon,
  Code2,
  Languages,
  Clock,
} from 'lucide-react'

/* =====================================================================
   Data mock: notifikasi, leaderboard, pencapaian
   ===================================================================== */

export const NOTIF_ICONS = {
  flame: Flame,
  sparkles: Sparkles,
  trophy: Trophy,
  award: Award,
}

export const NOTIFICATIONS = [
  {
    id: 'n1',
    icon: 'flame',
    title: 'Streak terancam!',
    body: 'Belajar hari ini untuk menjaga streak 12 harimu.',
    time: '1 jam lalu',
    unread: true,
  },
  {
    id: 'n2',
    icon: 'sparkles',
    title: 'Kuis baru tersedia',
    body: 'Kuis “Jaringan: IPv4 & Subnetting” sudah bisa dikerjakan.',
    time: '3 jam lalu',
    unread: true,
  },
  {
    id: 'n3',
    icon: 'trophy',
    title: 'Kamu di Top 5!',
    body: 'Kamu naik 2 peringkat di papan peringkat mingguan.',
    time: '1 hari lalu',
    unread: false,
  },
  {
    id: 'n4',
    icon: 'award',
    title: 'Prestasi terbuka',
    body: 'Prestasi “Konsisten 7 Hari” berhasil kamu buka.',
    time: '2 hari lalu',
    unread: false,
  },
]

export const AVATAR_GRADIENTS = [
  'from-rose-400 to-pink-600',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-600',
  'from-sky-400 to-blue-600',
  'from-violet-400 to-purple-600',
  'from-cyan-400 to-sky-600',
  'from-lime-400 to-green-600',
  'from-fuchsia-400 to-pink-600',
  'from-indigo-400 to-brand-600',
  'from-orange-400 to-rose-500',
]

export function avatarGradient(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997
  return AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length]
}

export function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/* ------------------- PENCAPAIAN (BADGES) ------------------- */
export const ACHIEVEMENTS = [
  {
    id: 'first',
    icon: 'sparkles',
    name: 'Langkah Pertama',
    desc: 'Selesaikan kuis pertamamu',
    unlocked: true,
    tone: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'streak7',
    icon: 'flame',
    name: 'Momentum 7',
    desc: 'Streak 7 hari berturut-turut',
    unlocked: true,
    tone: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'xp1k',
    icon: 'star',
    name: 'Kolektor XP',
    desc: 'Kumpulkan total 1.000 XP',
    unlocked: true,
    tone: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 'diniyah',
    icon: 'moon',
    name: 'Pelajar Diniyah',
    desc: 'Selesaikan 5 modul Diniyah Salaf',
    unlocked: true,
    tone: 'bg-teal-100 text-teal-600',
  },
  {
    id: 'code100',
    icon: 'code',
    name: 'Junior Hacker',
    desc: 'Selesaikan 3 modul IT Development',
    unlocked: true,
    tone: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'perfect',
    icon: 'trophy',
    name: 'Sempurna!',
    desc: 'Skor 100% di 3 kuis berbeda',
    unlocked: false,
    tone: 'bg-violet-100 text-violet-600',
    progress: '1/3',
  },
  {
    id: 'streak30',
    icon: 'flame',
    name: 'Api Abadi',
    desc: 'Streak 30 hari tanpa putus',
    unlocked: false,
    tone: 'bg-orange-100 text-orange-600',
    progress: '12/30',
  },
  {
    id: 'tajwid',
    icon: 'moon',
    name: 'Fondasi Tajwid',
    desc: 'Skor 100% di kuis Tajwid',
    unlocked: false,
    tone: 'bg-emerald-100 text-emerald-600',
    progress: '64%',
  },
  {
    id: 'xp5k',
    icon: 'star',
    name: 'Legenda XP',
    desc: 'Kumpulkan total 5.000 XP',
    unlocked: false,
    tone: 'bg-amber-100 text-amber-600',
    progress: '49%',
  },
  {
    id: 'polyglot',
    icon: 'languages',
    name: 'Poliglot',
    desc: 'Ikuti 3 kursus bahasa berbeda',
    unlocked: false,
    tone: 'bg-amber-100 text-orange-600',
    progress: '1/3',
  },
  {
    id: 'cert',
    icon: 'award',
    name: 'Tersertifikasi',
    desc: 'Lulus kuis sertifikasi IT (CCNA/MTCNA)',
    unlocked: false,
    tone: 'bg-sky-100 text-sky-600',
    progress: '0%',
  },
  {
    id: 'night',
    icon: 'clock',
    name: 'Belajar Larut',
    desc: 'Selesaikan materi setelah jam 21.00',
    unlocked: false,
    tone: 'bg-slate-200 text-slate-600',
  },
]

export const BADGE_ICONS = {
  sparkles: Sparkles,
  flame: Flame,
  star: Star,
  moon: Moon,
  code: Code2,
  trophy: Trophy,
  languages: Languages,
  award: Award,
  clock: Clock,
}

/* ------------------- TARGET HARIAN ------------------- */
export const DAILY_TASKS = [
  {
    id: 't-quiz',
    label: 'Selesaikan 2 kuis Diniyah / IT',
    reward: '+50 XP',
    detail: '1/2',
    done: false,
  },
  {
    id: 't-read',
    label: 'Baca 1 materi ±10 menit',
    reward: '+20 XP',
    detail: 'Selesai',
    done: true,
  },
  {
    id: 't-streak',
    label: 'Jaga streak harian',
    reward: '+10 XP',
    detail: 'Selesai',
    done: true,
  },
]

/* ------------------- POPULER MINGGU INI ------------------- */
export const POPULAR_NOW = [
  { id: 'ccna', viewers: 128, tag: 'Sertifikasi' },
  { id: 'figma', viewers: 96, tag: 'UI/UX' },
  { id: 'tajwid', viewers: 89, tag: 'Diniyah' },
  { id: 'english', viewers: 74, tag: 'Bahasa' },
]
