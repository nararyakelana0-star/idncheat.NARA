/* =====================================================================
   Achievement Harian — pesan "penyampaian" yang BERUBAH TIAP HARI
   (dipilih deterministik dari tanggal). Muncul di dashboard & console
   mode sebagai "trophy of the day".
   ===================================================================== */

export const DAILY_ACHIEVEMENTS = [
  { icon: '🏅', name: 'First Light', desc: 'Mulai harimu dengan satu materi — streak tidak boleh terputus!' },
  { icon: '🎯', name: 'Daily Quest', desc: 'Kuis harian sudah siap: 5 soal baru menunggumu. Tak ada dua hari yang sama.' },
  { icon: '⚡', name: 'Combo Breaker', desc: 'Selesaikan 3 materi beruntun hari ini untuk menjaga momentum belajar.' },
  { icon: '🧠', name: 'Brain Buffer', desc: 'Tantangan level-mu hari ini sudah diperbarui — cek di setiap halaman materi.' },
  { icon: '🔥', name: 'Streak Guardian', desc: 'Satu pelajaran kecil hari ini = api streakmu tetap menyala.' },
  { icon: '🎮', name: 'Player One', desc: 'Coba Console Mode: UI berubah total jadi gaya game console, lengkap dengan musiknya.' },
  { icon: '📜', name: 'Scroll Master', desc: 'Baca 2 ringkasan materi sampai tuntas — poin penting > kecepatan.' },
  { icon: '🌙', name: 'Midnight Scholar', desc: 'Belajar di sore/malam hari? Pasang target harian dan kalahkan sebelum tidur.' },
  { icon: '🗝️', name: 'Key Holder', desc: 'Selesaikan 1 materi terkunci baru hari ini — setiap kunci membuka jalan lebih jauh.' },
  { icon: '🛡️', name: 'Discipline Shield', desc: 'Konsistensi 10 menit > semangat 2 jam. Pilih satu materi, selesaikan, lanjut.' },
  { icon: '🚀', name: 'Launch Sequence', desc: 'Hari baru, soal baru: kerjakan kuis harian apa pun yang belum kamu selesaikan.' },
  { icon: '💎', name: 'Gem Grinder', desc: 'Ulangi 1 materi yang sudah selesai — pengulangan adalah inti tahfidz & hafalan IT.' },
  { icon: '🌐', name: 'Global Citizen', desc: 'Hari ini ada tantangan sosial — lakukan 1 tindakan nyata dan catat di jurnalmu.' },
  { icon: '👑', name: 'Crown Push', desc: 'Dekati level berikutnya: hitung XP-mu, tentukan 2 materi untuk hari ini.' },
]

export function dayIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date - start) / 86400000)
}

export function dailyAchievement(date = new Date()) {
  return DAILY_ACHIEVEMENTS[dayIndex(date) % DAILY_ACHIEVEMENTS.length]
}
