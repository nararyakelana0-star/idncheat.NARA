# ⚡ IDNcheat — Frontend Platform E-Learning (100%)

Frontend platform e-learning **IDN Boarding School Pamijahan** dengan pilar kurikulum
**IT · Diniyah Salaf · Bahasa**. Gaya UI: *clean yet feature-dense* (Notion × Duolingo ×
Khan Academy), glassmorphism halus, gamifikasi penuh, **login/sign up**, dan
**UI & akun yang bisa dikustomisasi**.

> React 18 + Vite 6 + Tailwind CSS 3 + Lucide React

## 🚀 Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produksi → dist/
```

**Akun demo:** `budi` / `idncheat123` (email: budi@idnpamijahan.sch.id)
atau buat akun baru lewat tab **Daftar** (nama, username, email, password, kelas, program).

## 🎨 Branding & Palet

| Token | Nilai | Fungsi |
|---|---|---|
| `ink` | `#1E293B` | Warna utama (pill, hero card, kartu level) |
| `brand` | `#6366F1` (default) | Aksen action — **bisa diganti 6 warna lain** |
| `surface` | `#F8FAFC` | Background aplikasi |
| hijau / oranye | `green-500` / `orange-500` | Indikator gamifikasi (XP, streak) |

Tipografi: **Sora** (display futuristik) + **Inter** (body). Logo = squircle gradient dengan
ikon *lightning* + slice *glitch* halus (cyan/rose) & wordmark *RGB-split*.

## 🧩 Fitur

### Autentikasi (frontend, localStorage)
- **Login** dengan username **atau** email + password; **Sign up** dengan validasi
  (username unik, email valid, password ≥ 6 karakter).
- **Gamifikasi per-akun** — XP, streak, target harian, progres kursus, dan skor kuis
  disimpan per-user; login lain = data berbeda (hydrated saat login, persist saat berubah).
- Sesi persisten di `localStorage`; logout dari dropdown profil di header.

### UI & Akun yang Bisa Dikustomisasi (Pengaturan)
- **Mode Terang / Gelap** (class dark, tersimpan + tombol cepat di header).
- **6 Aksen Warna** — indigo, emerald, rose, amber, sky, violet (via CSS variables
  `--brand-*`, seluruh aplikasi ikut berubah secara live).
- **Kepadatan Layout** — Normal / Kompak (skala rem global).
- **Akun** — nama, kelas, program, dan **warna avatar** (6 gradasi); tersimpan per-user.

### Jenjang & Kurikulum (lengkap)
- 2 jenjang: **Murojaah** (TK–Kelas 6 SD) & **Upgrade** (Kelas 7–12) — filter global.
- **8 kategori** · **43 kursus**, setiap kursus memiliki **daftar materi lengkap**
  (tipe: `reading` bacaan, `practice` praktik, `quiz` — **tidak ada video**).

### Assessment Engine (semua kursus punya kuis)
- **43 kuis × 3 soal = 129 soal** (2 PG + 1 essay per kuis):
  - PG: feedback instan (hijau/merah) + **+25 XP** sekali kredit.
  - Essay: + kunci jawaban indikatif + **umpan balik AI Tutor** (+15 XP).
  - **Pembahasan langkah demi langkah** — rumus/`formula` (matematika & sains),
    blok `code` (IT), dan **dalil & keterangan ulama** (Diniyah).
- Layar hasil: ring skor, total XP, review jawaban, ulangi.

### Gamifikasi
Streak 🔥, XP ⭐, level + rank (Pemula → Legenda IDN), target harian dengan strip di header,
toast "+XP", leaderboard (mingguan/bulanan/semua waktu, baris "You" = akun login),
12 badge pencapaian.

## 🏗 Arsitektur

```
idncheat/
├── index.html
├── vite.config.js / tailwind.config.js / postcss.config.js
└── src/
    ├── main.jsx
    ├── index.css             # CSS variables aksen, dark mode, density, kelas komponen
    ├── App.jsx               # AuthProvider → AppProvider → AuthPage | Shell
    ├── context/
    │   ├── AuthContext.jsx   # users, sesi, login/register/logout/updateUser (localStorage)
    │   └── AppContext.jsx    # tier, navigasi, XP, streak, toast, tema, hidrasi &
    │                         # persist gamifikasi per-akun
    ├── data/
    │   ├── curriculum.js     # 8 kategori + 43 kursus + lessonsData lengkap (bukan video)
    │   ├── lessonContent.js  # Ringkasan materi: 239 konten belajar (poin penting + tips)
    │   ├── questions.js      # 43 kuis / 129 soal (mc + essay + steps + dalil)
    │   └── mockData.js       # notifikasi, leaderboard, badges, tugas harian
    └── components/
        ├── Logo / Header / Sidebar / Toasts
        ├── ui/               # Ring, ProgressBar, Badge, IconTile, PageTitle
        ├── widgets/          # ContinueLearning, CategoryGrid, DailyTarget,
        │                     # LeaderboardPreview, StreakCard
        ├── quiz/             # QuizEngine, MCQuestion, EssayQuestion, StepByStep
        └── pages/            # Auth, Dashboard, Catalog, CourseDetail, Lesson,
                              # Quiz, MyCourses, Quizzes, Leaderboard,
                              # Achievements, Settings
```

### Alur state
1. **Login** → `AuthContext` menyimpan sesi → `AppProvider` melakukan `HYDRATE_USER`
   (memuat gamifikasi user).
2. **Perubahan gamifikasi** (jawaban benar, kuis selesai) → reducer → `useEffect`
   menuliskan ulang ke profil user di `localStorage`.
3. **Tema** (`mode/accent/density`) → `useEffect` memetakan ke `<html>`
   (`class="dark"`, `data-accent`, `data-density`) → CSS variables + Tailwind dark.
4. **Navigasi** state-based (`navigate('quiz', {courseId})`) — siap dimigrasi ke
   react-router (setiap `page.name` = satu route).

## ➕ Cara Memperluas

| Butuh | Ubah di |
|---|---|
| Kursus baru | `COURSES` di `curriculum.js` (tambahkan `lessonsData`) |
| Kuis baru | key di `QUIZZES` di `questions.js` (steps + dalil opsional) |
| Aksen warna baru | block `:root[data-accent='x']` di `index.css` + entri `ACCENTS` di `SettingsPage` |
| Endpoint API | ganti mock dengan fetch/React Query — bentuk data sudah rapi |

## ✅ Checklist Spesifikasi (v1.1)

- [x] Login + sign up: username, email, password (validasi, akun demo, sesi)
- [x] UI customizable: dark mode, 6 aksen warna live, kepadatan layout
- [x] Akun customizable: nama, kelas, program, warna avatar, preferensi gamifikasi
- [x] Semua 43 kursus memiliki pelajaran lengkap — **tipe video dihapus**
- [x] Semua 43 kursus memiliki kuis (129 soal) + pembahasan langkah & dalil
- [x] Gamifikasi per-akun tersimpan (XP, streak, progres, skor)
- [x] Header: logo, toggle jenjang, dropdown kategori, search ⌘K, streak, XP,
      level + bar harian, ganti tema, notifikasi, profil (logout)
- [x] Sidebar: Dashboard, Kursus Saya, Kuis & Evaluasi, Papan Peringkat,
      Pencapaian, Pengaturan + pintasan 8 kategori
- [x] Dashboard: Continue Learning, grid 8 bidang, Target Harian, leaderboard,
      streak mingguan, populer
- [x] Responsif: drawer mobile, grid adaptif, chip tier di katalog (layar kecil)

---

**Developed by Nararya Irsyad Kelana** · IDNcheat — IDN Boarding School Pamijahan
