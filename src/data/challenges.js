/* =====================================================================
   Tantangan Praktikum — berubah sesuai LEVEL pemain & bergilir harian.
   Band level: dasar (Lv 1–2) · menengah (Lv 3–4) · lanjut (Lv 5+).
   ===================================================================== */

export const BAND_LABEL = { dasar: 'Dasar', menengah: 'Menengah', lanjut: 'Lanjut' }

export function levelBand(level) {
  return level <= 2 ? 'dasar' : level <= 4 ? 'menengah' : 'lanjut'
}

const C = {
  diniyah: {
    dasar: [
      'Tulis 3 hukum nun sakinah beserta satu contoh katanya dari hafalanmu.',
      'Dengarkan 1 surah pendek dari murottal, lalu tandai 2 tempat mad thabi’i.',
      'Hafalkan 1 hadits Arba’in beserta artinya — ceritakan ke satu orang hari ini.',
      'Shalat berjamaah 5 waktu hari ini; setelah itu sebutkan 3 adab setelah shalat.',
    ],
    menengah: [
      'Bandingkan bacaanmu dengan qari: rekam 1 ayat, catat 3 perbaikan makhraj.',
      'Jelaskan perbedaan iqlab dan ikhfa syafawi dalam 2 kalimat ke teman.',
      'Analisis 1 kalimat Al-Qur’an: tunjukkan mubtada & khabarnya.',
      'Murojaah 1 juz hafalan sambil menyetel timer — catat waktu & akurasi.',
    ],
    lanjut: [
      'Buat kartu "dalil & komentar": 3 hadits Arba’in + 1 faidhah dari syarah.',
      'Setorkan 1 surah pendek kepada guru/teman — minta 2 koreksi spesifik.',
      'Tulis analisis 1 mas’alah fikih: dalil, riwayat, dan simpulan dalam 5 kalimat.',
      'Ajarkan 1 kaidah tajwid singkat (2 menit) ke adik atau teman sekelas.',
    ],
  },
  'it-dev': {
    dasar: [
      'Bangun 1 halaman HTML sederhana (judul, 2 paragraf, 1 gambar) dan buka di browser.',
      'Ubah warna & ukuran 3 elemen di halaman tadi hanya dengan CSS.',
      'Lengkapi kode yang diberikan tanpa error, lalu jelaskan tiap baris dengan komentar.',
      'Deploy 1 halaman statis ke GitHub Pages / Netlify dan bagikan linknya.',
    ],
    menengah: [
      'Refactor 1 komponen: pisahkan 3 sub-widget dan uji ulang.',
      'Tambah 1 fitur baru (filter/sort/cari) ke proyekmu dan tulis alur logikanya.',
      'Debug 3 error yang diberikan: jelaskan penyebab & perbaikannya.',
      'Buat 1 endpoint API sederhana (GET) dan uji dengan Postman.',
    ],
    lanjut: [
      'Bangun fitur lengkap: form + validasi + simpan (localStorage/DB) + tampilkan data.',
      'Optimalkan 1 fungsi/laman: ukur sebelum-sesudah (kecepatan/ukuran bundle).',
      'Review kode teman (atau kodemu 1 bulan lalu): tulis 3 saran konkret.',
      'Selesaikan 1 tantangan proyek: fitur CRUD mini tanpa template.',
    ],
  },
  'it-network': {
    dasar: [
      'Hitung 3 subnet /24, /26, /30: network, host pertama-terakhir, broadcast.',
      'Gambar topologi rumahmu: perangkat, kabel, dan alamat IP tiap perangkat.',
      'Jalankan ping + tracert ke 3 alamat; catat hasil & arti tiap kolom.',
      'Uji kabel UTP dengan cable tester — catat pin mana yang bermasalah.',
    ],
    menengah: [
      'Simulasikan topologi 2 VLAN + inter-VLAN di Packet Tracer/MikroTik.',
      'Konfigurasi NAT + DHCP untuk 10 host virtual; uji koneksi internet.',
      'Analisis output `show ip route` / `/ip route print`: jelaskan 3 baris penting.',
      'Buat aturan firewall: izinkan HTTP, blokir 1 IP; uji keduanya.',
    ],
    lanjut: [
      'Rancang IPAM: bagi 10.10.0.0/16 untuk 4 departemen (VLSM) + dokumentasi.',
      'Troubleshoot skenario: 3 host offline — temukan & perbaiki 3 akar masalah.',
      'Tulis runbook 1 halaman: setup router baru dari nol hingga online.',
      'Bandingkan arsitektur 2 ISP lokal dari sisi laten & bandwidth (laporan singkat).',
    ],
  },
  'it-design': {
    dasar: [
      'Replikasi 1 desain yang kamu suka (1 layar) dengan seakurat mungkin.',
      'Terapkan rule of thirds: susun ulang 1 desainmu yang terasa "kosong/kaku".',
      'Buat palet 5 warna (60-30-10) dan terapkan ke 1 template.',
      'Tulis 3 alasan "mengapa" untuk tiap elemen di desainmu (latihan defend desain).',
    ],
    menengah: [
      'Buat 1 komponen (tombol/kartu) dengan 3 varian + dokumentasi penggunaannya.',
      'Redesain 1 layar lama: perbaiki hierarki & kontras — tunjukkan sebelum-sesudah.',
      'Buat prototipe 3 layar yang tersambung (tap → slide) dan presentasikan 2 menit.',
      'Terapkan auto layout di 5 elemen — pastikan rapi saat teks di-resize.',
    ],
    lanjut: [
      'Buat mini design system: token warna, tipografi, spacing + 5 komponen.',
      'Riset: wawancara 2 pengguna, rangkum 3 keluhan, redesain 1 alur.',
      'Bangun 3D sederhana (Blender): objek + material + lighting + render 1080p.',
      'Selesaikan case study 1 halaman: masalah → proses → hasil → refleksi.',
    ],
  },
  bahasa: {
    dasar: [
      'Hafalkan 10 kosakata baru hari ini; pakai masing-masing dalam 1 kalimat.',
      'Rekam dirimu membaca 1 paragraf teks — dengarkan dan koreksi 3 pengucapan.',
      'Tulis 5 kalimat sederhana tentang harimu dalam bahasa target.',
      'Tanya 1 hal dalam bahasa target kepada penutur (teman/guru/online).',
    ],
    menengah: [
      'Tulis dialog 8 baris (2 orang) lalu perankan dengan teman hari ini.',
      'Koreksi 1 teksmu: cari 3 kesalahan grammar & jelaskan aturannya.',
      'Tonton 1 video pendek berbahasa target — catat 5 frasa baru + maknanya.',
      'Jelaskan 1 topik sekolah (2 menit) sepenuhnya dalam bahasa target.',
    ],
    lanjut: [
      'Tulis esai pendek (100 kata) tentang budaya Indonesia — minta koreksi native.',
      'Terjemahkan 1 paragraf (ID ↔ target) lalu bandingkan dengan terjemahan mesin: apa bedanya?',
      'Presentasikan 3 menit dalam bahasa target + siapkan 2 jawaban pertanyaan.',
      'Buat flashcard 20 frasa idiomatik; uji diri & tandai yang masih salah.',
    ],
  },
  sains: {
    dasar: [
      'Lakukan 1 pengamatan sederhana di rumah (5 menit) dan catat 3 temuan.',
      'Buat 1 model/kerajinan dari bahan bekas yang menjelaskan konsep hari ini.',
      'Jelaskan konsep hari ini dengan bahasa sendiri ke 1 orang (maks 1 menit).',
      'Kumpulkan 3 data kecil (ukur suhu/berat/panjang) dalam tabel sederhana.',
    ],
    menengah: [
      'Rancang mini-eksperimen: hipotesis → prosedur → hasil → kesimpulan (1 halaman).',
      'Selesaikan 3 soal numerik konsep hari ini; tulis satuan di tiap langkah.',
      'Bandingkan 2 sumber bacaan tentang topik yang sama: apa yang berbeda?',
      'Buat grafik dari data eksperimenmu; beri label sumbu & judul.',
    ],
    lanjut: [
      'Ulangi eksperimen dengan 1 variabel berbeda; analisis apa yang berubah & mengapa.',
      'Selesaikan soal 2 langkah (mis. gerak + gaya) dengan diagram tubuh-kecuali.',
      'Tulis mini-laporan ½ halaman: masalah, metode, hasil, kesalahan, perbaikan.',
      'Ajarkan konsep rumit (2 menit) ke teman — nilai: apakah dia paham tanpa istilah?',
    ],
  },
  matematika: {
    dasar: [
      'Kerjakan 10 soal hitung cepat dengan timer 5 menit — catat skormu.',
      'Jelaskan 1 aturan hari ini dengan contoh dari kehidupan sehari-hari.',
      'Buat 3 soal sendiri tentang topik hari ini, lalu selesaikan semuanya.',
      'Cari 3 pola matematika di sekitarmu (ubin, jam, tangga) — foto & beri nama polanya.',
    ],
    menengah: [
      'Selesaikan 5 soal cerita; untuk tiap soal tulis: diketahui, ditanya, rumus, jawaban.',
      'Buat grafik fungsi sederhana (manual di kertas berpetak) — tandai 3 titik kunci.',
      'Buktikan 1 rumus geometri dengan gambar (potong-gabung bangun).',
      'Kerjakan 1 soal tanpa kalkulator; cek dengan kalkulator & jelaskan selisihnya.',
    ],
    lanjut: [
      'Selesaikan 3 soal HOTS; untuk yang gagal, tulis ALASAN persisnya.',
      'Temukan 2 cara berbeda menyelesaikan soal yang sama; bandingkan efisiensinya.',
      'Buat "lembar kesalahan": 3 kesalahan terberatmu + jebakannya + cara hindari.',
      'Kerjakan set soal bertimer (20 menit) — analisis waktu per tipe soal.',
    ],
  },
  sosial: {
    dasar: [
      'Tulis 3 hal baru yang kamu pelajari hari ini dengan bahasamu sendiri.',
      'Cari 1 fakta dari sumber resmi (BPS/BMKG/Kemendikbud) — kutip & simpulkan.',
      'Lakukan 1 tindakan kewarganegaraan nyata (antre, sopan, lapor usul) — catat.',
      'Buat 1 peta pikiran (mind map) dari topik hari ini: 5 cabang.',
    ],
    menengah: [
      'Rangkum 1 artikel berita (5 kalimat) + tulis 1 pertanyaan kritis padanya.',
      'Bandingkan 2 perspektif tentang 1 isu; tunjukkan argumen terkuat masing-masing.',
      'Buat 1 infografis sederhana dari data yang kamu kumpulkan hari ini.',
      'Diskusikan 1 topik dengan 2 orang; catat 2 pandangan yang berbeda dari yangmu.',
    ],
    lanjut: [
      'Tulis opini 150 kata tentang isu hari ini dengan 3 data pendukung.',
      'Analisis 1 peristiwa sejarah: sebab → proses → dampak → relevansi hari ini.',
      'Rancang 1 solusi nyata untuk masalah kecil di sekolahmu; presentasikan 2 menit.',
      'Buat lini masa 10 peristiwa (sejarah/kebangsaan) + 1 pelajaran tiap titik.',
    ],
  },
}

/** Tantangan per (kategori, level, materi, hari) — berganti tiap level & tiap hari. */
export function dailyChallenge(category, level, lessonIndex = 0, date = new Date()) {
  const band = levelBand(level)
  const list = (C[category] && C[category][band]) || C.diniyah.dasar
  const start = new Date(date.getFullYear(), 0, 0)
  const day = Math.floor((date - start) / 86400000)
  return list[(day + lessonIndex * 7) % list.length]
}
