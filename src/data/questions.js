/* =====================================================================
   Bank Soal IDNcheat — Assessment Engine (SEMUA 43 KURSUS)
   type: 'mc'    → Pilihan ganda (feedback instan + pembahasan langkah)
   type: 'essay' → Jawaban terbuka (kunci indikatif + umpan balik AI)
   steps[]       → Langkah demi langkah (formula/code untuk sains & IT)
   dalil         → Dalil & keterangan ulama (khusus Diniyah)
   ===================================================================== */

export const XP_MC = 25
export const XP_ESSAY = 15

export const QUIZZES = {
  /* ================= AGAMA ISLAM (DINIYAH SALAF) ================= */
  tajwid: {
    title: 'Kuis Evaluasi: Tajwid Dasar',
    questions: [
      {
        id: 'tajwid-1',
        type: 'mc',
        prompt: 'Ketika bertemu nun sakinah (ـنْ) atau tanwin dengan huruf ba (ب), hukum tajwid yang berlaku adalah…',
        options: ['Idzhar Halqi', 'Ikhfa’ Syafawi', 'Iqlab', 'Idgham Bighunnah'],
        correctIndex: 2,
        hint: 'Iqlab artinya “membalikkan” — nun berubah menjadi huruf lain dengan ghunnah.',
        steps: [
          { title: 'Kenali pertemuan huruf', text: 'Nun sakinah (ـنْ) atau tanwin (ـٌ ـٍ) langsung diikuti huruf ba (ب).' },
          { title: 'Terapkan hukum Iqlab', text: 'Nun sakinah dibalik (diubah) menjadi mim sakinah (ـمْ) disertai ghunnah sepanjang 2 harakat.' },
          { title: 'Contoh bacaan', text: 'مِنۢ بَعْدِ dibaca “mim-ba’di” (bukan “min-ba’di”). Iqlab hanya berlaku untuk satu huruf, yaitu ba.' },
        ],
        dalil: 'Para ulama tajwid membatasi iqlab hanya pada huruf ba karena kedekatan makhraj-nya dengan mim. Imam Asy-Syatibiyyah dalam Al-Jazariyah menyebutkan huruf iqlab secara khusus satu huruf. Contoh bacaan banyak terdapat dalam Al-Qur’an, misalnya kata مِنْ بَعْدِ.',
      },
      {
        id: 'tajwid-2',
        type: 'mc',
        prompt: 'Makhraj huruf qaf (ق) terletak di…',
        options: ['Hidzbul lisan (ujung lidah)', 'Thahajjulum hafar (tenggorokan bagian bawah)', 'Ats-tsaqafatul lisan (belakang lidah)', 'Syafatun zajar (bibir bawah)'],
        correctIndex: 1,
        hint: 'Qaf termasuk huruf halqi — tiga huruf keluaran tenggorokan.',
        steps: [
          { title: 'Pahami kelompok huruf halqi', text: 'Tiga huruf tenggorokan (halqi): hamzah (ء) dari atas, ha (هـ) dari tengah, dan qaf (ق) dari bagian paling dalam/bawah.' },
          { title: 'Tentukan posisi qaf', text: 'Qaf keluar dari thahajjulum hafar (tenggorokan bawah), paling dalam dibanding hamzah dan ha.' },
          { title: 'Contoh', text: 'قُلْ pada QS. Al-Qalam [68]: 1 — huruf qaf dibaca dari tenggorokan bagian bawah.' },
        ],
        dalil: 'Imam Asy-Syatibiyyah (Al-Jazariyah) membagi makhraj huruf menjadi empat daerah: rongga mulut, tenggorokan, lidah, dan bibir. Qaf termasuk tiga huruf tenggorokan yang keluar dari bagian paling dalam.',
      },
      {
        id: 'tajwid-3',
        type: 'essay',
        prompt: 'Sebutkan 3 huruf idzhar halqi! Mengapa nun sakinah/tanwin dibaca jelas (tidak samar) ketika bertemu huruf-huruf tersebut?',
        answerKey: 'Tiga huruf idzhar halqi: hamzah (ء), ha (هـ), dan ain (ع). Dibaca jelas karena makhraj-nya berada di tenggorokan, cukup jauh dari makhraj nun (tengkorak), sehingga nun sakinah tetap tegas tanpa ghunnah.',
        aiFeedback: 'Jawabanmu sudah menyebutkan tiga huruf idzhar. Agar sempurna, tambahkan alasan fonetiknya: jarak makhraj nun (tengkorak) dengan huruf idzhar (tenggorokan) sangat jauh, sehingga dibaca tegas tanpa ghunnah. Tambahkan satu contoh, misalnya انْزَلْ (QS. An-Naziat).',
      },
    ],
  },

  hadits: {
    title: 'Kuis Evaluasi: Hadits Arba’in & Bulughul Maram',
    questions: [
      {
        id: 'hadits-1',
        type: 'mc',
        prompt: 'Kitab Arba’in An-Nawawi berisi 42 hadits yang diseleksi Imam An-Nawawi dari…',
        options: ['Hanya Shahih Muslim', 'Berbagai kitab hadits shahih dan sahih lainnya', 'Kumpulan atsar sahabat', 'Musnad Ahmad saja'],
        correctIndex: 1,
        hint: '“Arba’in” berasal dari angka berapa? Dari mana Imam An-Nawawi memilihnya?',
        steps: [
          { title: 'Asal nama', text: 'Arba’in = “empat puluh”. Imam An-Nawawi memilih 40 hadits + 2 tambahan.' },
          { title: 'Sumber', text: 'Hadits-hadits tersebut dipilih dari berbagai sumber: Al-Bukhari, Muslim, Abu Dawud, Tirmidzi, dan lainnya — bukan hanya satu kitab.' },
          { title: 'Cakupan', text: 'Materinya meliputi pokok-pokok akidah, ibadah, akhlak, dan muamalah yang menjadi landasan agama.' },
        ],
        dalil: 'Hadits pembuka Arba’in: “إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ” (HR. Al-Bukhari & Muslim) — hadits ini diriwayatkan dari Umar bin Khattab r.a. dan menjadi pegangan dasar seluruh amal.',
      },
      {
        id: 'hadits-2',
        type: 'mc',
        prompt: 'Bulughul Maram karya Imam Ibnu Hajar Al-Haitami adalah kitab yang membahas…',
        options: ['Tafsir ayat-ayat mukhtalifah', 'Fiqih ibadah dengan landasan hadits', 'Nahwu & shorof', 'Sirah para tabiin'],
        correctIndex: 1,
        hint: 'Judul lengkapnya: “Bulughul Maram min ’Ilmil ’Amal”.',
        steps: [
          { title: 'Tujuan penulisan', text: 'Imam Ibnu Hajar menyusunnya agar seorang pelajar dapat memahami fikih dengan dalil hadits yang shahih.' },
          { title: 'Cakupan bab', text: 'Thaharah, shalat, jenazah, zakat, puasa, haji, muamalah, qada, hingga adab.' },
          { title: 'Metode', text: 'Setiap hukum disertai hadits-hadits pendukung beserta status (shahih/hasan) dan komentar singkat.' },
        ],
      },
      {
        id: 'hadits-3',
        type: 'essay',
        prompt: 'Mengapa penting mempelajari hadits dengan memahami sanad dan matan? Jelaskan manfaatnya bagi seorang pelajar!',
        answerKey: 'Sanad (rantai periwayatan) memastikan hadits bersambung hingga Nabi ﷺ dan para perawinya terpercaya; matan (isi) memastikan apa yang sebenarnya diriwayatkan. Keduanya menjamin kebenaran hadits sebelum diamalkan, sehingga pelajar tidak mudah menerima informasi agama yang salah.',
        aiFeedback: 'Poin sanad & matan sudah muncul. Agar jawabanmu lebih utuh, sebutkan dua kriteria perawi (adl: muslim, baligh, menjaga hafalan) dan satu contoh hadits yang statusnya berbeda karena sanadnya. Itu menunjukkan pemahaman tingkat kitab.',
      },
    ],
  },

  tauhid: {
    title: 'Kuis Evaluasi: Akidah Tauhid',
    questions: [
      {
        id: 'tauhid-1',
        type: 'mc',
        prompt: 'Al-Ushul Ats-Tsalatsah (Tiga Pokok) mengajarkan kita untuk mengenal…',
        options: ['Rabb, agama, dan Nabi', 'Al-Qur’an, hadits, dan ijtihad', 'Niat, amal, dan doa', 'Shalat, puasa, dan zakat'],
        correctIndex: 0,
        hint: 'Judul bukunya: "Mengenal Rabb, Mengenal Agama, Mengenal Nabi".',
        steps: [
          { title: 'Pokok pertama', text: 'Mengenal Rabb: Allah pencipta, pemilik, dan penguasa kita — dibuktikan dengan ciptaan-Nya.' },
          { title: 'Pokok kedua', text: 'Mengenal agama: Islam, yaitu menyerahkan seluruh ketaatan hanya kepada Allah.' },
          { title: 'Pokok ketiga', text: 'Mengenal Nabi: Muhammad ﷺ utusan Allah yang menyampaikan risalah dengan benar.' },
        ],
        dalil: 'Imam Muhammad bin Abdilwahhab menjelaskan: mengenal Rabb dibuktikan dengan tanda-tanda kebesaran-Nya; mengenal agama dengan mengikuti wahyu; mengenal Nabi dengan berita yang mutawatir. (Al-Ushul Ats-Tsalatsah)',
      },
      {
        id: 'tauhid-2',
        type: 'mc',
        prompt: 'Rukun iman terdiri dari…',
        options: ['4 rukun', '5 rukun', '6 rukun', '7 rukun'],
        correctIndex: 2,
        hint: 'Iman kepada Allah, malaikat, kitab, rasul…',
        steps: [
          { title: 'Dalil', text: 'Hadits Jibril (HR. Muslim): iman adalah engkau beriman kepada Allah, malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan qadar (takdir) baik dan buruknya.' },
          { title: 'Hitung', text: 'Iman kepada: (1) Allah, (2) malaikat, (3) kitab, (4) rasul, (5) hari akhir, (6) qadar = 6 rukun.' },
          { title: 'Kesimpulan', text: 'Jawaban: 6 rukun iman.' },
        ],
      },
      {
        id: 'tauhid-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan tauhid rububiyah, uluhiyah, dan tauhid asma’ wa sifat dalam 3 kalimat!',
        answerKey: 'Rububiyah: iman bahwa Allah Maha Pencipta, Pemilik, dan Pengatur alam. Uluhiyah: mengesakan Allah dalam segala bentuk ibadah (doa, shalat, qurban hanya untuk-Nya). Asma’ wa sifat: membenarkan nama dan sifat Allah seperti yang disebutkan dalam Al-Qur’an dan As-Sunnah, tanpa tamsil dan ta’wil.',
        aiFeedback: 'Tiga jenis tauhid sudah kamu sebutkan. Perkuat dengan satu contoh penerapannya: syirik rububiyah (mengakui Tuhan tapi beribadah selain-Nya) masih terjadi di kalangan orang musyrik Arab dahulu — justru uluhiyah yang menjadi inti dakwah Nabi ﷺ.',
      },
    ],
  },

  akhlak: {
    title: 'Kuis Evaluasi: Akhlak & Adab Islam',
    questions: [
      {
        id: 'akhlak-1',
        type: 'mc',
        prompt: 'Adab Islami ketika mendengar sahabat bersin dan mengucapkan “Alhamdulillah” adalah menjawab…',
        options: ['Barakallahu fiyk', 'Yarhamukallah', 'Jazakallah khairan', 'Subhanallah'],
        correctIndex: 1,
        hint: 'Sahabat menjawab do’a untuk orang yang bersin.',
        steps: [
          { title: 'Adab bersin', text: 'Orang yang bersin mengucapkan “Alhamdulillah”, lalu sahabat di sekitarnya mendoakannya: “Yarhamukallah” (semoga Allah memberi rahmat kepadamu).' },
          { title: 'Jawaban kembali', text: 'Si bersin menjawab: “Yahdiukumullahu wa yushli ’ala baytikum”.' },
          { title: 'Dalil', text: 'HR. Al-Bukhari & Muslim dari Abu Huairah r.a.' },
        ],
        dalil: 'HR. Al-Bukhari: “Apabila salah seorang di antara kamu bersin, hendaklah ia mengucapkan Alhamdulillah, maka setiap Muslim yang mendengarnya harus mengucapkan yarhamukallah.”',
      },
      {
        id: 'akhlak-2',
        type: 'mc',
        prompt: 'Sifat amanah yang terpuji bermakna…',
        options: ['Berani mengambil keputusan', 'Menjaga titipan dan menepati janji', 'Banyak bicara di depan umum', 'Cepat dalam bekerja'],
        correctIndex: 1,
        hint: 'Amanah berasal dari kata “amana” — apa yang harus dijaga?',
        steps: [
          { title: 'Pengertian', text: 'Amanah = sifat jujur menjaga hak orang lain: titipan, rahasia, dan janji.' },
          { title: 'Contoh', text: 'Mengembalikan barang titipan apa adanya, tidak menyebarkan rahasia, menepati janji yang sudah diikrarkan.' },
          { title: 'Lawan sifat', text: 'Lawan dari amanah adalah khianat — sifat yang dicela dan menjadi ciri orang munafik.' },
        ],
        dalil: 'QS. Al-Anfal [8]: 27 — “Sesungguhnya Allah menyuruh kamu menyampaikan amanat kepada yang berhak.”',
      },
      {
        id: 'akhlak-3',
        type: 'essay',
        prompt: 'Sebutkan 3 akhlak terpuji terhadap guru, masing-masing disertai satu contoh perilakunya di sekolah!',
        answerKey: 'Contoh: (1) Menghormati — menyapa, berdiri ketika guru memberi salam, tidak memotong pembicaraan. (2) Mendengarkan — mencatat pelajaran, fokus saat penjelasan. (3) Mensyukuri — mendoakan guru, menjaga nama baik dengan prestasi, berterima kasih atas bantuannya.',
        aiFeedback: 'Tiga akhlak + contoh sudah bagus! Tambahkan satu dalil (misal hadits “dari kamu adalah orang yang paling aku cintai…”, atau QS. An-Najm: 93 tentang tidak kasar kepada orang tua sebagai analogi adab) agar jawaban bernilai penuh.',
      },
    ],
  },

  fiqih: {
    title: 'Kuis Evaluasi: Fiqih Ibadah (Thaharah)',
    questions: [
      {
        id: 'fiqih-1',
        type: 'mc',
        prompt: 'Rukun wudhu yang pertama dan menjadi syarat sah wudhu adalah…',
        options: ['Membasuh kedua tangan', 'Niat di awal wudhu', 'Memasukkan jari ke telinga', 'Membasuh kedua kaki'],
        correctIndex: 1,
        hint: 'Perhatikan hadits tentang niat dalam Shahih Bukhari.',
        steps: [
          { title: 'Apa itu rukun?', text: 'Rukun adalah hal yang wajib ada; jika salah satu gugur, ibadah tidak sah.' },
          { title: 'Rukun wudhu (mazhab Syafi’i)', text: 'Niat, membasuh wajah, membasuh kedua tangan sampai siku, mengusap sebagian kepala beserta telinga, membasuh kedua kaki sampai mata kaki, dan tertib (berurutan).' },
          { title: 'Makna niat', text: 'Niat cukup di dalam hati, disyarakatkan bersamaan dengan memulai membasuh wajah (menyentuh air ke wajah).' },
        ],
        dalil: 'HR. Al-Bukhari & Muslim dari Umar bin Khattab r.a.: “إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ” — sesungguhnya amal tergantung pada niatnya. Para fuqaha Syafi’iyyah menjadikan niat sebagai rukun pertama wudhu.',
      },
      {
        id: 'fiqih-2',
        type: 'mc',
        prompt: 'Hukum membasuh kedua tangan sampai siku dalam wudhu adalah…',
        options: ['Sunnah', 'Wajib (rukun wudhu)', 'Makruh', 'Mubah'],
        correctIndex: 1,
        hint: 'Baca QS. Al-Ma’idah ayat 6.',
        steps: [
          { title: 'Dalil Al-Qur’an', text: 'QS. Al-Ma’idah [5]: 6 — “وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ” (dan basuhlah tanganmu sampai dengan siku).' },
          { title: 'Kata kerja wajib', text: 'Perintah “washu” (basuhlah) bersifat wajib, dan siku termasuk yang dibasuh.' },
          { title: 'Kesimpulan', text: 'Membasuh kedua tangan sampai siku adalah rukun wudhu; wudhu tidak sah tanpa melaksanakannya.' },
        ],
        dalil: 'QS. Al-Ma’idah [5]: 6: “يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ…”',
      },
      {
        id: 'fiqih-3',
        type: 'essay',
        prompt: 'Sebutkan 3 contoh hadas kecil dan jelaskan cara mensucikannya!',
        answerKey: 'Contoh hadas kecil: (1) keluar sesuatu dari qubul/dubur, (2) tidur nyenyak, (3) bersentuhan kulit laki-laki dan perempuan yang bukan mahram. Semuanya disucikan dengan berwudhu (asalkan air tersedia; tayamum hanya jika air tidak ada atau sakit).',
        aiFeedback: 'Bagus! Kamu sudah menghubungkan hadas dengan wudhu. Perkuat jawabanmu dengan menyebutkan dalilnya (QS. Al-Ma’idah: 6) dan bedakan hadas kecil (disucikan wudhu) dengan hadas besar (wajib mandi besar, misal: junub).',
      },
    ],
  },

  sirah: {
    title: 'Kuis Evaluasi: Sirah Nabawiyah',
    questions: [
      {
        id: 'sirah-1',
        type: 'mc',
        prompt: 'Kota tujuan hijrah Nabi Muhammad ﷺ dan para sahabat pada tahun 622 M adalah…',
        options: ['Makkah', 'Madinah (Yatsrib)', 'Habasyah', 'Thaif'],
        correctIndex: 1,
        hint: 'Kota ini dahulu bernama Yatsrib dan diganti namanya setelah hijrah.',
        steps: [
          { title: 'Latar belakang', text: 'Setelah pembantain kaum muslimin makin keras di Makkah, Allah memerintahkan hijrah ke Yatsrib.' },
          { title: 'Perjalanan', text: 'Nabi ﷺ bersama Abu Bakar bersembunyi di Gua Tsur 3 malam, lalu berangkat ke Yatsrib.' },
          { title: 'Ganti nama', text: 'Yatsrib berganti nama menjadi Madinah (Madinatul Nabi) — kota yang menjadi pusat dakwah dan negara Islam pertama.' },
        ],
        dalil: 'QS. At-Taubah [9]: 40 — kisah perlindungan Allah kepada Nabi ﷺ dan Abu Bakar di gua. Para ahli sirah (Ibnu Hisyam) merinci seluruh perjalanan hijrah.',
      },
      {
        id: 'sirah-2',
        type: 'mc',
        prompt: 'Peristiwa Isra Mi’raj (perjalanan malam ke Baitul Maqdis lalu naik ke langit) terjadi pada tahun ke-… sebelum Hijrah',
        options: ['5', '7', '12', '15'],
        correctIndex: 2,
        hint: 'Terjadi di akhir masa kenabian di Makkah, setelah wafatnya Khadijah & Abu Thalib.',
        steps: [
          { title: 'Konteks', text: 'Isra Mi’raj terjadi pada tahun kesedihan (Amul Huzni) tahun ke-12 sebelum Hijrah.' },
          { title: 'Perintah', text: 'Dari peristiwa inilah perintah 5 waktu shalat turun sebagai “karunia” langsung dari Allah.' },
          { title: 'Iman wajib', text: 'Meyakini Isra Mi’raj adalah bagian dari rukun iman kepada hari akhir & berita gaib yang wajib diyakini.' },
        ],
        dalil: 'QS. Al-Isra [17]: 1 — “Maha Suci Allah yang telah memperjalankan hamba-Nya pada suatu malam dari Masjidilharam ke Masjidal Aqsha…”',
      },
      {
        id: 'sirah-3',
        type: 'essay',
        prompt: 'Sebutkan 3 sifat Rasulullah ﷺ dari sirah yang bisa kamu teladani di sekolah! Berikan contoh penerapannya.',
        answerKey: 'Contoh: (1) Amanah — jujur dalam tugas kelompok dan piket, tidak mencontek. (2) Sabar — tetap tenang menghadapi soal sulit atau ejekan, tidak mudah marah. (3) Dermawan — berbagi bekal, membantu teman yang kesulitan. (Jawaban siswa bebas selama sifatnya benar sesuai sirah.)',
        aiFeedback: 'Teladan yang kamu pilih sangat relevan untuk pelajar! Tambahkan satu peristiwa sirah yang mendasarinya (misal: Nabi ﷺ selalu menepati janji, atau memaafkan musuh saat Fathu Makkah) agar teladanmu memiliki akar sejarah yang kuat.',
      },
    ],
  },

  nahwu: {
    title: 'Kuis Evaluasi: Nahwu & Shorof',
    questions: [
      {
        id: 'nahwu-1',
        type: 'mc',
        prompt: 'Kata مُحَمَّدٌ (Muhammadun) dalam kalimat مُحَمَّدٌ رَسُولُ اللَّهِ tergolong…',
        options: ['Fi’il madhi', 'Isim', 'Harf jarr', 'Fi’il amr'],
        correctIndex: 1,
        hint: 'Perhatikan tanda tanwin dammah (ً) di akhir kata.',
        steps: [
          { title: 'Ciri isim', text: 'Menerima tanwin, alif-lam, dan i’rab. مُحَمَّدٌ menerima tanwin → ia isim.' },
          { title: 'Fungsi dalam kalimat', text: 'Posisinya sebagai mubtada’ (subyek), khabarnya رَسُولُ اللَّهِ.' },
          { title: 'Bandingkan', text: 'Fi’il madhi (contoh: كَتَبَ) dan harf jarr (contoh: فِي) tidak menerima tanwin.' },
        ],
        dalil: 'Imam Abu Ubaid Al-Qasim bin Sallam dalam Al-Asas: isim adalah lafazh yang menunjukkan makna dalam dirinya dan tidak dibatasi waktu — seperti مُحَمَّدٌ.',
      },
      {
        id: 'nahwu-2',
        type: 'mc',
        prompt: 'Fi’il mudhari’ (kata kerja yang belum terjadi) ditandai dengan salah satu huruf…',
        options: ['ا، و، ن (alif, wawu, nun)', 'ت، ث، ج', 'ق، ك، ل', 'م، ف، هـ'],
        correctIndex: 0,
        hint: 'Disebut juga "huruf mudhari’ah" — empat huruf.',
        steps: [
          { title: 'Empat huruf mudhari’ah', text: 'Hamzah (أ), ya (ي), alif (ا), dan wawu (و) — ditambah nun pada fi’il amr/maf’ul.' },
          { title: 'Contoh', text: 'يَقْرَأُ (dia membaca), نَقْرَأُ (kami membaca), تُقْرَؤُ (kamu [pr] membaca).' },
          { title: 'Bandingkan fi’il madhi', text: 'Fi’il madhi (sudah terjadi) tidak memiliki huruf mudhari’ah: قَرَأَ (dia telah membaca).' },
        ],
      },
      {
        id: 'nahwu-3',
        type: 'essay',
        prompt: 'Apa perbedaan isim dan fi’il? Berikan satu contoh masing-masing dari kalimat dalam Al-Qur’an!',
        answerKey: 'Isim = kata yang menunjukkan nama/benda (contoh: اللَّهُ dalam QS. Al-Ikhlas: 1). Fi’il = kata kerja yang menunjukkan waktu terjadi (contoh: خَلَقَ [makedhi] dalam QS. Ath-Thur: 15 — “Dia menciptakan”). Fi’il mudhari’ menunjukkan waktu sekarang/mendatang (yaktubu).',
        aiFeedback: 'Perbedaan konsepnya sudah tepat. Supaya lebih tajam, sebutkan juga cara membedakan cepat: isim menerima tanwin/alif-lam, sedangkan fi’il menerima huruf mudhari’ah atau tanda waktu. Tambahkan satu contoh fi’il mudhari’ agar lengkap.',
      },
    ],
  },

  /* ================= IT - DEVELOPMENT (RPL / PPLG) ================= */
  htmlcss: {
    title: 'Kuis Evaluasi: HTML & CSS',
    questions: [
      {
        id: 'htmlcss-1',
        type: 'mc',
        prompt: 'Tag HTML yang paling tepat untuk judul utama (h1) sebuah halaman web adalah…',
        options: ['<div id="judul">', '<span class="judul">', '<h1>', '<header class="judul">'],
        correctIndex: 2,
        hint: 'Berpikirlah soal semantik: tag mana yang benar-benar menyatakan “judul”.',
        steps: [
          { title: 'Semantik dulu', text: 'Heading h1–h6 secara eksplisit menyatakan tingkat judul. <h1> adalah judul utama, idealnya satu per halaman.' },
          { title: 'Tag generik tidak semantik', text: '<div> dan <span> adalah kontainer tanpa makna; <header> adalah region, bukan judul.' },
          { title: 'Contoh', code: '<h1>Selamat Datang di IDNcheat</h1>' },
        ],
      },
      {
        id: 'htmlcss-2',
        type: 'mc',
        prompt: 'Properti CSS yang membuat sebuah elemen berlayout baris fleksibel adalah…',
        options: ['display: grid;', 'display: flex;', 'display: block;', 'float: left;'],
        correctIndex: 1,
        hint: '“Fleksibel” adalah petunjuknya 😄',
        steps: [
          { title: 'Flexbox', text: 'display: flex menjadikan elemen container baris (atau kolom) fleksibel: main axis + cross axis.' },
          { title: 'Bandingkan grid', text: 'display: grid bekerja dua dimensi (baris DAN kolom) — lebih cocok untuk layout halaman.' },
          { title: 'Contoh navbar', code: 'nav {\n  display: flex;\n  gap: 8px;\n  justify-content: space-between;\n}' },
        ],
      },
      {
        id: 'htmlcss-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan display: flex dan display: grid, lalu beri satu contoh penggunaan masing-masing di dashboard!',
        answerKey: 'Flex: layout satu dimensi (satu baris ATAU satu kolom) — cocok untuk navbar, tombol, list. Grid: dua dimensi (baris DAN kolom sekaligus) — cocok untuk galeri kartu, layout dashboard. Contoh dashboard: container utama grid-template-columns: 2fr 1fr (konten + sidebar); navbar memakai flex dengan justify-content: space-between.',
        aiFeedback: 'Penjelasan “satu dimensi vs dua dimensi” sudah tepat! Supaya makin kuat, sebutkan main axis/cross axis pada flex dan grid-template-columns pada grid. Bonus: ceritakan kapan flex lebih mudah daripada grid.',
      },
    ],
  },

  javascript: {
    title: 'Kuis Evaluasi: JavaScript',
    questions: [
      {
        id: 'js-1',
        type: 'mc',
        prompt: 'Keyword mana yang mendeklarasikan variabel yang TIDAK bisa di-reassign (ditutup)?',
        options: ['var', 'let', 'const', 'static'],
        correctIndex: 2,
        hint: 'Dari bahasa Prancis: “konstan”.',
        steps: [
          { title: 'const = konstan', text: 'const membuat binding yang tidak bisa ditunjuk ulang (reassign). Menyusun objek/array di dalamnya tetap boleh (mutasi), tapi variabelnya tidak bisa diganti objek lain.' },
          { title: 'Bandingkan', code: 'const x = 5;\nx = 6; // TypeError!\nlet y = 5;\ny = 6;   // OK' },
          { title: 'Kapan pakai var', text: 'var sudah jarang dipakai (hoisting & scope function). Rekomendasi: const dulu, let jika perlu berubah.' },
        ],
      },
      {
        id: 'js-2',
        type: 'mc',
        prompt: 'Hasil dari `typeof [1, 2, 3]` adalah…',
        options: ['"array"', '"object"', '"list"', '"number"'],
        correctIndex: 1,
        hint: 'Perhatikan: array di JS adalah jenis khusus dari… apa?',
        steps: [
          { title: 'Jenis dasar JS', text: 'typeof mengembalikan: string, number, boolean, undefined, object, function, symbol, bigint.' },
          { title: 'Array adalah object', text: 'Array di JavaScript adalah objek khusus — karena itu typeof [] menghasilkan "object".' },
          { title: 'Cara cek array', code: 'Array.isArray([1, 2, 3]) // true' },
        ],
      },
      {
        id: 'js-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan let dan const, lalu kapan kamu memilih var? Beri satu contoh kode!',
        answerKey: 'const: tidak bisa reassign (default). let: bisa reassign (untuk nilai yang berubah). var: scope function + hoisting — sebaiknya dihindari di kode modern. Contoh: const nama = "Aisyah"; let skor = 0; skor += 10; // OK',
        aiFeedback: 'Poin reassign sudah benar. Tambahkan juga soal scope: let/const adalah block-scoped (berlaku di { }), sedangkan var function-scoped — itu alasan utama modern JS menghindari var. Contoh kode yang kamu tulis sudah bagus.',
      },
    ],
  },

  python: {
    title: 'Kuis Evaluasi: Python',
    questions: [
      {
        id: 'py-1',
        type: 'mc',
        prompt: 'Output dari `print(type(5.0))` adalah…',
        options: ['<class int>', '<class float>', '<class str>', '<class double>'],
        correctIndex: 1,
        hint: '5.0 memiliki koma desimal — apa jenis angka desimal di Python?',
        steps: [
          { title: 'Jenis angka', text: 'Python memiliki int (bulat) dan float (desimal). 5.0 ditulis dengan desimal → float.' },
          { title: 'Eksekusi', code: 'print(type(5.0))   # <class float>\nprint(type(5))     # <class int>' },
          { title: 'Catatan', text: 'Tidak ada tipe "double" di Python — float saja (presisi 64-bit).' },
        ],
      },
      {
        id: 'py-2',
        type: 'mc',
        prompt: 'Cara benar membuat list berisi 3 angka di Python adalah…',
        options: ['(1, 2, 3)', '{1, 2, 3}', '[1, 2, 3]', '<1, 2, 3>'],
        correctIndex: 2,
        hint: 'List menggunakan tanda kurung “siku”.',
        steps: [
          { title: 'Notasi list', code: 'angka = [1, 2, 3]\nprint(angka[0])   # 1' },
          { title: 'Bandingkan', code: '(1, 2, 3)  # tuple\n{1, 2, 3}  # set (tanpa duplikat)' },
          { title: 'Kesimpulan', text: 'List = [ ... ], bisa diurutkan dan diubah.' },
        ],
      },
      {
        id: 'py-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan list dan tuple, dan kapan masing-masing cocok dipakai!',
        answerKey: 'List: mutable (bisa diubah), notasi [ ], cocok untuk data yang akan bertambah/berubah (misal daftar siswa). Tuple: immutable (tidak bisa diubah), notasi ( ), lebih cepat & aman untuk data tetap (misal koordinat, hari dalam seminggu).',
        aiFeedback: 'Poin mutable vs immutable sudah tepat! Tambahkan alasan keamanan: tuple bisa dipakai sebagai key dictionary (karena hashable), sedangkan list tidak. Itu pembeda praktis yang sering ditanyakan.',
      },
    ],
  },

  scratch: {
    title: 'Kuis Seru: Scratch & Game Kreatif',
    questions: [
      {
        id: 'scratch-1',
        type: 'mc',
        prompt: 'Di Scratch, blok yang membuat sprite bergerak maju adalah…',
        options: ['move 10 steps', 'turn 15 degrees', 'say Hello', 'next costume'],
        correctIndex: 0,
        hint: 'Blok ini berwarna hijau (Movement)!',
        steps: [
          { title: 'Blok gerakan', text: 'Blok Movement berwarna hijau. “move 10 steps” menggerakkan sprite maju 10 langkah.' },
          { title: 'Blok lain', text: '“turn 15 degrees” memutar, “say Hello” berbicara, “next costume” mengganti kostum.' },
          { title: 'Kombinasi seru', text: 'Gabungkan “forever” + “move 10 steps” supaya sprite terus bergerak! 🚀' },
        ],
      },
      {
        id: 'scratch-2',
        type: 'mc',
        prompt: 'Blok apa yang menjalankan perintah berulang tanpa berhenti?',
        options: ['if (condition)', 'repeat 10', 'forever', 'wait 1 second'],
        correctIndex: 2,
        hint: 'Bentuknya seperti balok yang saling menjepit!',
        steps: [
          { title: 'Lingkaran tanpa akhir', text: 'Blok “forever” membentuk loop tanpa batas — semua blok di dalamnya berulang terus.' },
          { title: 'Bandingkan', text: '“repeat 10” berhenti setelah 10 kali; “if” hanya berjalan jika syarat benar.' },
          { title: 'Tips', text: 'Gunakan “forever” untuk game yang terus berjalan, seperti deteksi benturan atau musik latar.' },
        ],
      },
      {
        id: 'scratch-3',
        type: 'essay',
        prompt: 'Ceritakan ide game pertamamu di Scratch dalam 2 kalimat!',
        answerKey: 'Contoh jawaban: “Game ketangkasan di mana sprite menangkap bintang yang jatuh. Skor bertambah setiap bintang tertangkap, dan level naik setiap 10 bintang.” (Jawaban siswa bebas, selama memuat: tujuan game + mekanisme sederhana.)',
        aiFeedback: 'Ide kreatifmu seru! Ingat formula game: tujuan + skor + tantangan. Coba tambahkan kondisi “game over” (misal jika menabrak rintangan) supaya game-mu makin menantang.',
      },
    ],
  },

  flutter: {
    title: 'Kuis Evaluasi: Flutter',
    questions: [
      {
        id: 'fl-1',
        type: 'mc',
        prompt: 'Framework Flutter membangun antarmuka menggunakan bahasa pemrograman…',
        options: ['Kotlin', 'Dart', 'Swift', 'C#'],
        correctIndex: 1,
        hint: 'Bahasa ini dibuat oleh Google, ringan & ber-type.',
        steps: [
          { title: 'Dart', text: 'Flutter memakai Dart — bahasa yang dikembangkan Google, fast-compilation (AOT), dan typed.' },
          { title: 'Multi-platform', text: 'Satu kodebase Dart → Android, iOS, web, desktop, dan embedded.' },
          { title: 'Render', text: 'Flutter merender UI sendiri (Skia/Impeller) — bukan menggunakan widget native.' },
        ],
      },
      {
        id: 'fl-2',
        type: 'mc',
        prompt: 'Unit dasar penyusun UI di Flutter disebut…',
        options: ['Component', 'Widget', 'Fragment', 'View'],
        correctIndex: 1,
        hint: '“Everything is ___” — pepatah Flutter.',
        steps: [
          { title: 'Everything is a widget', text: 'Semua di Flutter adalah widget: teks, tombol, layout, bahkan layar — semuanya widget.' },
          { title: 'Tree widget', text: 'UI dibangun sebagai pohon widget: MaterialApp → Scaffold → body → …' },
          { title: 'Contoh', code: 'Widget build(BuildContext context) {\n  return const Text("Halo IDNcheat");\n}' },
        ],
      },
      {
        id: 'fl-3',
        type: 'essay',
        prompt: 'Apa perbedaan Stateful dan Stateless widget? Kapan memakai masing-masing?',
        answerKey: 'Stateless: tampilan statis, tidak berubah selama hidup widget (judul, ikon). Stateful: memiliki State yang bisa berubah (setState) sehingga UI ikut berubah (counter, form, input). Aturan: mulai dari StatelessWidget, naikkan ke StatefulWidget hanya jika ada perubahan state.',
        aiFeedback: 'Perbedaannya sudah pas! Tambahkan satu detail penting: createState() vs build() — dan peringatan bahwa StatefulWidget lebih “mahal” karena menyimpan state, jadi jangan dipakai berlebihan.',
      },
    ],
  },

  laravel: {
    title: 'Kuis Evaluasi: Laravel & PHP',
    questions: [
      {
        id: 'laravel-1',
        type: 'mc',
        prompt: 'Laravel menggunakan pola arsitektur…',
        options: ['MVC', 'MVP', 'MVVM', 'Clean Architecture saja'],
        correctIndex: 0,
        hint: 'Model, View, dan…?',
        steps: [
          { title: 'MVC', text: 'Model = data & Eloquent, View = Blade templates, Controller = logika antar request-response.' },
          { title: 'Alur', text: 'Request → Route → Controller → Model (DB) → Controller → View (Blade) → Response.' },
          { title: 'Keuntungan', text: 'Pemisahan concern membuat kode mudah di-maintain & diuji (testable).' },
        ],
      },
      {
        id: 'laravel-2',
        type: 'mc',
        prompt: 'ORM bawaan Laravel yang memungkinkan query database dengan sintaks PHP adalah…',
        options: ['Doctrine', 'Eloquent', 'Sequelize', 'Prisma'],
        correctIndex: 1,
        hint: 'Nama karakter dari Moomin.',
        steps: [
          { title: 'Eloquent', text: 'ORM aktif-record bawaan Laravel: Model extends Eloquent, query dengan method chaining.' },
          { title: 'Contoh', code: '$siswa = Siswa::where("umur", ">", 17)->get();' },
          { title: 'Fitur', text: 'Relationship (hasOne, belongsTo…), migrations, casting, dan events.' },
        ],
      },
      {
        id: 'laravel-3',
        type: 'essay',
        prompt: 'Jelaskan alur sebuah request di Laravel dari route sampai response kembali ke browser!',
        answerKey: 'Request → web.php/routes → Middleware (CSRF, auth) → Controller (method) → Model/Eloquent mengambil data dari database → Controller mengembalikan view Blade atau JSON → Response di-render dan dikirim ke browser.',
        aiFeedback: 'Urutan alurnya sudah benar. Tambahkan peran middleware (filter sebelum controller) dan Service Container/dependency injection — dua konsep yang sering muncul saat interview backend Laravel.',
      },
    ],
  },

  mysql: {
    title: 'Kuis Evaluasi: MySQL & SQL',
    questions: [
      {
        id: 'sql-1',
        type: 'mc',
        prompt: 'Query SQL yang benar untuk mengambil SEMUA baris dari tabel students adalah…',
        options: ['GET * FROM students;', 'SELECT * FROM students;', 'FETCH ALL students;', 'SHOW students;'],
        correctIndex: 1,
        hint: 'SELECT … FROM adalah bentuk dasar query data.',
        steps: [
          { title: 'Bentuk dasar', code: 'SELECT kolom1, kolom2 FROM tabel;' },
          { title: 'Wildcard', text: 'Asterisk (*) = semua kolom. Untuk produksi, sebutkan kolom eksplisit agar lebih cepat.' },
          { title: 'Contoh', code: 'SELECT nama, umur FROM students;' },
        ],
      },
      {
        id: 'sql-2',
        type: 'mc',
        prompt: 'Keyword untuk menggabungkan dua tabel berdasarkan kolom bersama adalah…',
        options: ['UNION', 'JOIN', 'GROUP', 'MERGE'],
        correctIndex: 1,
        hint: 'Istilahnya “menggabungkan baris terkait”.',
        steps: [
          { title: 'JOIN', code: 'SELECT s.nama, k.nama AS kelas\nFROM siswa s\nJOIN kelas k ON s.kelas_id = k.id;' },
          { title: 'Jenis JOIN', text: 'INNER JOIN (cocok saja), LEFT JOIN (semua kiri + yang cocok), RIGHT, FULL OUTER.' },
          { title: 'Bandingkan UNION', text: 'UNION menggabungkan baris dari dua query (menambah baris), bukan melebar kolom.' },
        ],
      },
      {
        id: 'sql-3',
        type: 'essay',
        prompt: 'Tulis query: ambil nama siswa berumur lebih dari 17 tahun dari tabel siswa (kolom: nama, umur), urutkan dari nama A–Z!',
        answerKey: 'SELECT nama FROM siswa WHERE umur > 17 ORDER BY nama ASC;',
        aiFeedback: 'Perhatikan tiga bagian: SELECT (apa), WHERE (filter), ORDER BY (urutan). Jika kamu menulis tanpa ORDER BY, poin penyortiran hilang. Bonus poin: jelaskan mengapa index pada kolom umur mempercepat WHERE.',
      },
    ],
  },

  /* ================= IT - NETWORK & INFRA ================= */
  jarkom: {
    title: 'Kuis Evaluasi: Jaringan Komputer Dasar',
    questions: [
      {
        id: 'jarkom-1',
        type: 'mc',
        prompt: 'Pada model OSI, enkripsi/decrypt data terjadi pada lapisan ke-…',
        options: ['3 (Network)', '5 (Session)', '6 (Presentation)', '7 (Application)'],
        correctIndex: 2,
        hint: 'Lapisan ini mengurus “format” data agar bisa dipahami penerima.',
        steps: [
          { title: 'Fungsi lapisan 6', text: 'Presentation layer: format data, enkripsi/decrypt, dan kompresi — “penerjemah” sebelum data dikirim.' },
          { title: 'Jangan tertukar', text: 'Lapisan 7 (Application) = antarmuka aplikasi; lapisan 3 (Network) = logika routing & alamat IP.' },
          { title: 'Analogi', text: 'Lapisan 6 seperti menterjemahkan dan mengunci surat; lapisan 7 seperti meja surat kantor.' },
        ],
      },
      {
        id: 'jarkom-2',
        type: 'mc',
        prompt: 'Alat jaringan yang meregenerasi sinyal untuk memperluas jarak segmen jaringan adalah…',
        options: ['Router', 'Switch', 'Repeater (dan hub)', 'Access Point'],
        correctIndex: 2,
        hint: 'Pikirkan lapisan OSI terendah (Physical).',
        steps: [
          { title: 'Lapisan 1', text: 'Repeater bekerja di lapisan fisik: menerima sinyal melemah, meregenerasi, lalu mengirim ulang.' },
          { title: 'Bandingkan', text: 'Switch meneruskan frame berdasarkan MAC (lapisan 2); router meneruskan paket antar-jaringan berdasarkan IP (lapisan 3).' },
          { title: 'Catatan', text: 'Hub = multi-port repeater; kini jarang dipakai karena switch jauh lebih efisien.' },
        ],
      },
      {
        id: 'jarkom-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan switch layer 2 dan router dalam 2 kalimat, lalu sebutkan satu protokol yang berjalan di layer 3!',
        answerKey: 'Switch L2 meneruskan frame berdasarkan alamat MAC di dalam satu jaringan lokal (L2); router meneruskan paket antar-jaringan berbeda berdasarkan alamat IP (L3). Protokol layer 3: IP, ICMP, OSPF, atau BGP.',
        aiFeedback: 'Poin kunci: MAC vs IP, serta intra-jaringan vs antar-jaringan — sudah kamu sebutkan. Tambahkan juga bahwa router bertugas memilih jalur terbaik (routing), itulah pembeda utamanya.',
      },
    ],
  },

  ccna: {
    title: 'Kuis Evaluasi: CCNA (Modul 1)',
    questions: [
      {
        id: 'ccna-1',
        type: 'mc',
        prompt: 'Protokol routing dinamis yang menggunakan algoritma link-state adalah…',
        options: ['HTTP', 'OSPF', 'SMTP', 'DHCP'],
        correctIndex: 1,
        hint: 'Singkatan: Open Shortest Path First.',
        steps: [
          { title: 'OSPF', text: 'OSPF (Open Shortest Path First) = protokol interior gateway (IGP) berbasis link-state, memakai Dijkstra untuk menghitung jalur terpendek.' },
          { title: 'Bandingkan', text: 'RIP = distance-vector (hop count); EIGRP = hybrid. HTTP/SMTP/DHCP bukan protokol routing.' },
          { title: 'Di Packet Tracer', code: 'router(config)# router ospf 1\nrouter(config-router)# network 10.0.0.0 0.255.255.255 area 0' },
        ],
      },
      {
        id: 'ccna-2',
        type: 'mc',
        prompt: 'Pada subnet 192.168.1.0/24, alamat yang PALING umum dipakai sebagai default gateway adalah…',
        options: ['192.168.1.0', '192.168.1.1', '192.168.1.255', '255.255.255.0'],
        correctIndex: 1,
        hint: '.0 adalah alamat jaringan, .255 broadcast.',
        steps: [
          { title: 'Analisis /24', text: '192.168.1.0/24 → network address 192.168.1.0, broadcast 192.168.1.255, host 1–254 (254 host).' },
          { title: 'Konvensi', text: 'Konvensi umum: .1 untuk router/gateway, .100+ untuk workstation (opsional, tapi umum di lab CCNA).' },
          { title: 'Kesimpulan', text: '192.168.1.1 adalah pilihan default gateway yang benar dan valid.' },
        ],
      },
      {
        id: 'ccna-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan subnet mask /24 dan /26! Berapa jumlah host valid untuk masing-masing?',
        answerKey: '/24: 8 bit host → 2^8 − 2 = 254 host valid. /26: 6 bit host → 2^6 − 2 = 62 host valid. /26 membagi jaringan /24 menjadi 4 subnet yang lebih kecil (untuk efisiensi & keamanan).',
        aiFeedback: 'Rumus 2^n − 2 sudah benar! Tambahkan alasan “−2” (network & broadcast tidak bisa dipakai) dan contoh pembagian: 192.168.1.0/26 → 192.168.1.0, .64, .128, .192. Itu nilai tambah jawaban tingkat CCNA.',
      },
    ],
  },

  mtcna: {
    title: 'Kuis Evaluasi: MikroTik MTCNA',
    questions: [
      {
        id: 'mt-1',
        type: 'mc',
        prompt: 'Akses default WebFig (interface web) RouterOS berjalan di port…',
        options: ['21', '80', '22', '3306'],
        correctIndex: 1,
        hint: 'Port standar HTTP.',
        steps: [
          { title: 'Port default', code: 'WebFig  → http://<ip-router>:80\nWinBox  → MAC address (port 8291)\nSSH     → 22' },
          { title: 'Keamanan', text: 'Di produksi: ubah port default atau batasi akses WebFig hanya dari IP admin (firewall).' },
          { title: 'Login default', text: 'admin / (kosong) — WAJIB diganti saat setup pertama (MTCNA exam pun menguji ini).' },
        ],
      },
      {
        id: 'mt-2',
        type: 'mc',
        prompt: 'Firewall chain yang memfilter trafik yang masuk KE router itu sendiri (diperuntukkan router) disebut…',
        options: ['input', 'forward', 'output', 'postrouting'],
        correctIndex: 0,
        hint: 'Trafik yang “tujuannya” router itu sendiri.',
        steps: [
          { title: 'Tiga chain dasar', text: 'input = untuk router; forward = melintasi router (antara interface); output = dari router.' },
          { title: 'Contoh', code: '/ip firewall filter\nadd chain=input action=drop protocol=tcp dst-port=23 comment="blokir telnet"' },
          { title: 'Urutan evaluasi', text: 'Rule dievaluasi berurutan; accept pertama menang — letakkan drop spesifik sebelum accept umum.' },
        ],
      },
      {
        id: 'mt-3',
        type: 'essay',
        prompt: 'Apa fungsi NAT masquerade di MikroTik? Kapan kamu memakainya?',
        answerKey: 'Masquerade = NAT source yang otomatis memakai alamat interface sebagai source — memungkinkan host lokal (IP privat) mengakses internet dengan IP publik router. Dipakai di router edge dengan satu IP publik (dial PPPoE/bridge ke ISP).',
        aiFeedback: 'Fungsinya sudah tepat! Tambahkan contoh rule: /ip firewall nat add action=masquerade out-interface=ether1-WAN, dan sebutkan juga port forwarding (dst-nat) untuk membuka service ke dalam — keduanya sering muncul di skenario lab MTCNA.',
      },
    ],
  },

  aws: {
    title: 'Kuis Evaluasi: AWS Fundamentals',
    questions: [
      {
        id: 'aws-1',
        type: 'mc',
        prompt: 'Layanan AWS untuk menyewakan “server virtual” (komputasi on-demand) adalah…',
        options: ['S3', 'EC2', 'Lambda', 'Route 53'],
        correctIndex: 1,
        hint: 'Singkatan: Elastic Compute Cloud.',
        steps: [
          { title: 'EC2', text: 'Elastic Compute Cloud = VM (instance) on-demand: pilih instance type, OS (AMI), storage, dan network.' },
          { title: 'Bandingkan', text: 'S3 = object storage; Lambda = serverless (fungsi tanpa server); Route 53 = DNS.' },
          { title: 'Lifecycle', text: 'Instance: running → stopped → terminated. Auto Scaling menambah/mengurangi instance sesuai beban.' },
        ],
      },
      {
        id: 'aws-2',
        type: 'mc',
        prompt: 'S3 (Simple Storage Service) paling cocok digunakan untuk…',
        options: ['Menjalankan aplikasi Java 24/7', 'Menyimpan file, gambar, video & backup', 'Manajemen DNS zona', 'Membuat virtual network'],
        correctIndex: 1,
        hint: 'S3 = “storage” berbasis objek.',
        steps: [
          { title: 'Object storage', text: 'S3 menyimpan data sebagai object di bucket: foto, video, log, backup, dataset.' },
          { title: 'Fitur kunci', text: 'Versi objek, class storage (Standard/IA/Glacier), lifecycle policy, dan CDN (CloudFront).' },
          { title: 'Bukan komputasi', text: 'S3 tidak menjalankan kode — untuk komputasi pakai EC2/Lambda.' },
        ],
      },
      {
        id: 'aws-3',
        type: 'essay',
        prompt: 'Kapan memilih EC2 vs S3? Berikan satu skenario penggunaan untuk masing-masing!',
        answerKey: 'EC2: butuh komputasi (jalankan aplikasi/server web, database, CI/CD) — contoh: deploy aplikasi Laravel dengan Nginx. S3: butuh penyimpanan file yang diakses via URL — contoh: upload foto produk e-commerce + distribusi via CloudFront.',
        aiFeedback: 'Skenarionya sudah realistis! Tambahkan satu prinsip arsitektur: pisahkan “menjalankan” (EC2) dan “menyimpan” (S3) — aplikasi di EC2 menulis file ke S3, bukan ke disk instance (disk instance hilang saat terminate).',
      },
    ],
  },

  cyserv: {
    title: 'Kuis Evaluasi: Cyber Security & Server Admin',
    questions: [
      {
        id: 'sec-1',
        type: 'mc',
        prompt: 'Prinsip keamanan “least privilege” berarti…',
        options: ['Setiap user mendapat akses penuh', 'Memberikan akses minimal yang dibutuhkan', 'Password harus panjang saja', 'Menonaktifkan semua layanan'],
        correctIndex: 1,
        hint: '“Kecil” = privilege seminimal mungkin.',
        steps: [
          { title: 'Definisi', text: 'Least privilege: user/service hanya mendapat hak akses minimum untuk melakukan tugasnya — mengurangi dampak jika akun dibobol.' },
          { title: 'Contoh', text: 'Web server berjalan sebagai user www-data (bukan root); admin database hanya bisa backup, bukan DROP database.' },
          { title: 'Penerapan Linux', code: 'sudo -u www-data /usr/bin/check-log\nusermod -aG sudo deploy   # akses terbatas' },
        ],
      },
      {
        id: 'sec-2',
        type: 'mc',
        prompt: 'Port standar yang digunakan protokol HTTPS adalah…',
        options: ['80', '443', '21', '25'],
        correctIndex: 1,
        hint: 'HTTP = 80, HTTPS = 80 + berapa?',
        steps: [
          { title: 'Port umum', code: '80  → HTTP\n443 → HTTPS\n22  → SSH\n25  → SMTP' },
          { title: 'Amankan', text: 'Matikan/redirect port 80 ke 443 (HTTPS only), aktifkan TLS 1.2+, dan rotasi sertifikat.' },
          { title: 'Cek', code: 'ss -tlnp | grep :443' },
        ],
      },
      {
        id: 'sec-3',
        type: 'essay',
        prompt: 'Sebutkan 3 langkah hardening dasar untuk server Linux produksi!',
        answerKey: 'Contoh: (1) Nonaktifkan login root & pakai SSH key (nonaktifkan password auth). (2) Aktifkan firewall (ufw/nftables) — hanya buka port yang dibutuhkan. (3) Update rutin (unattended-upgrades) + ubah port SSH default + fail2ban untuk brute-force.',
        aiFeedback: 'Tiga langkah sudah solid! Tambahkan monitoring log (journctl/fail2ban) dan prinsip “update otomatis” — di MTCNA/CCNA maupun audit keamanan, patching adalah mitigasi #1. Sebutkan juga fail2ban sebagai lapisan proteksi brute-force.',
      },
    ],
  },

  /* ================= IT & DIGITAL DESIGN (DKV) ================= */
  figma: {
    title: 'Kuis Evaluasi: Figma UI/UX',
    questions: [
      {
        id: 'figma-1',
        type: 'mc',
        prompt: 'Fitur Figma yang membuat spasi antar elemen tetap rapi dan adaptif saat ukuran frame berubah disebut…',
        options: ['Auto Layout', 'Constraints', 'Components', 'Styles'],
        correctIndex: 0,
        hint: 'Mirip Flexbox di CSS!',
        steps: [
          { title: 'Auto Layout', text: 'Menyusun elemen dalam baris/kolom dengan spasi (padding & gap) yang adaptif: Hug, Fill, atau Fixed.' },
          { title: 'Bandingkan', text: 'Constraints mengatur posisi relatif saat frame di-resize; Components adalah elemen reusable; Styles untuk warna/teks.' },
          { title: 'Contoh', text: 'Buat card dengan Auto Layout: saat teks bertambah panjang, card otomatis ikut memanjang.' },
        ],
      },
      {
        id: 'figma-2',
        type: 'mc',
        prompt: 'Untuk membuat tombol yang memiliki 3 state (Default, Hover, Disabled), kamu harus menggunakan…',
        options: ['Frame biasa', 'Variant', 'Component Set', 'Prototype'],
        correctIndex: 2,
        hint: 'Kumpulan variant dari satu komponen disebut apa?',
        steps: [
          { title: 'Component = 1 desain', text: 'Sebuah Component adalah satu elemen tunggal (mis. tombol Default).' },
          { title: 'Variant = state', text: 'Setiap state (Default/Hover/Disabled) dibuat sebagai variant dari component tersebut.' },
          { title: 'Component Set', text: 'Kumpulan semua variant tersebut otomatis membentuk Component Set — bisa di-toggle lewat property di layer panel.' },
        ],
      },
      {
        id: 'figma-3',
        type: 'essay',
        prompt: 'Apa keuntungan menggunakan Design System (component + style) untuk proyek tim?',
        answerKey: 'Konsistensi tampilan antar halaman, kolaborasi cepat (ubah satu komponen → semua halaman ikut berubah), mudah di-maintain, dan mengurangi duplikasi kerja. Contoh: tombol, warna, dan tipografi IDNcheat dijadikan token/design system.',
        aiFeedback: 'Sudah menyebut konsistensi & propagasi perubahan — dua nilai utama design system! Tambahkan contoh nyata, misalnya “mengganti brand color hanya sekali klik”, agar jawabanmu konkret dan meyakinkan.',
      },
    ],
  },

  canva: {
    title: 'Kuis Evaluasi: Canva',
    questions: [
      {
        id: 'canva-1',
        type: 'mc',
        prompt: 'Fitur Canva untuk menyimpan logo, warna, dan font brand ke satu tempat agar konsisten adalah…',
        options: ['Brand Kit', 'Magic Resize', 'Background Remover', 'Smart Layers'],
        correctIndex: 0,
        hint: 'Kata “brand” ada di namanya.',
        steps: [
          { title: 'Brand Kit', text: 'Menyimpan logo, warna palet, dan font brand — tinggal satu klik untuk dipakai di semua desain.' },
          { title: 'Bandingkan', text: 'Magic Resize mengubah ukuran untuk platform lain; Background Remover menghapus background; Smart Layers untuk editing objek.' },
          { title: 'Tips', text: 'Buat Brand Kit sekolah: warna IDN (indigo #6366F1), logo, font Sora/Inter.' },
        ],
      },
      {
        id: 'canva-2',
        type: 'mc',
        prompt: 'Format ekspor terbaik untuk konten feed Instagram (gambar) adalah…',
        options: ['PDF Print', 'PNG', 'SVG', 'MP4'],
        correctIndex: 1,
        hint: 'Untuk gambar web/medsos, pilih yang tajam & ringan.',
        steps: [
          { title: 'PNG vs JPG', text: 'PNG = tajam, support transparansi (cocok untuk feed 1080×1080). JPG lebih kecil tapi kompresi lossy.' },
          { title: 'Kapan PDF/SVG/MP4', text: 'PDF Print = cetak; SVG = vektor (logo); MP4 = video.' },
          { title: 'Praktik', text: 'Export: Share → Download → PNG → pilih ukuran 1:1 untuk feed, 9:16 untuk story.' },
        ],
      },
      {
        id: 'canva-3',
        type: 'essay',
        prompt: 'Sebutkan 3 prinsip desain dasar (hierarki, kontras, spacing) dan contoh penerapannya di sebuah poster!',
        answerKey: 'Hierarki: judul paling besar → subtitle → detail (pandu mata pembaca). Kontras: warna judul vs background cukup beda agar terbaca (mis. indigo di putih). Spacing: jarak konsisten antar elemen (mis. padding 40px) supaya rapi & tidak “mepet”.',
        aiFeedback: 'Tiga prinsipnya tepat! Tambahkan contoh spesifik: di poster acara sekolah, nama acara = 80pt, tanggal = 32pt, lokasi = 24pt — itu hierarki. Bonus: sebutkan “grid” sebagai alat menjaga spacing konsisten.',
      },
    ],
  },

  desgrafis: {
    title: 'Kuis Evaluasi: Desain Grafis',
    questions: [
      {
        id: 'dg-1',
        type: 'mc',
        prompt: 'Warna sekunder adalah hasil pencampuran…',
        options: ['Tiga warna primer', 'Dua warna primer', 'Satu warna primer + hitam', 'Putih + warna apa pun'],
        correctIndex: 1,
        hint: 'Merah + kuning = oranye. Berapa warna yang dicampur?',
        steps: [
          { title: 'Primer → Sekunder', text: 'Merah + Kuning = Oranye; Kuning + Biru = Hijau; Biru + Merah = Ungu.' },
          { title: 'Tersier', text: 'Campuran primer + sekunder (mis. oranye + kuning = kuning-oranye).' },
          { title: 'Penerapan', text: 'Palet brand: 1 primer + 1 sekunder + netral (putih/abu) → seimbang.' },
        ],
      },
      {
        id: 'dg-2',
        type: 'mc',
        prompt: 'Resolusi standar yang dibutuhkan untuk desain yang akan DICETAK adalah…',
        options: ['72 DPI', '150 DPI', '300 DPI', '96 DPI'],
        correctIndex: 2,
        hint: 'Layar cukup 72–96; cetak butuh lebih rapat.',
        steps: [
          { title: 'DPI cetak', text: '300 DPI (dots per inch) adalah standar offset/digital printing agar tidak pecah saat dicetak.' },
          { title: 'DPI layar', text: '72–96 DPI cukup untuk web & feed sosial media.' },
          { title: 'Praktik', text: 'Siapkan dokumen di ukuran cetak sebenarnya (mis. A5 148×210mm) + bleed 3mm.' },
        ],
      },
      {
        id: 'dg-3',
        type: 'essay',
        prompt: 'Jelaskan 3 kriteria logo yang baik (sederhana, berkesan, serbaguna) dan mengapa penting!',
        answerKey: 'Sederhana: mudah diingat & digambar ulang (contoh: Apple). Berkesan: punya cerita/keunikan yang mencerminkan brand. Serbaguna: terbaca baik di ukuran kecil (favicon), hitam-putih, dan di berbagai media. Logo yang gagal salah satu kriteria akan sulit dipakai konsistensi brand.',
        aiFeedback: 'Tiga kriteria sudah benar! Tambahkan contoh nyata logo IDNcheat: squircle + lightning = sederhana & berkesan, dan tetap terbaca di favicon 16px — itu bukti “serbaguna”. Analisis kasus seperti ini nilainya plus.',
      },
    ],
  },

  '3d-design': {
    title: 'Kuis Evaluasi: Blender 3D',
    questions: [
      {
        id: '3d-1',
        type: 'mc',
        prompt: 'Di Blender, shortcut default untuk MEMUTAR (rotate) objek adalah…',
        options: ['G', 'R', 'S', 'T'],
        correctIndex: 1,
        hint: 'Ingat: G = grab, R = ?, S = scale.',
        steps: [
          { title: 'Shortcut transform', code: 'G → Grab (geser)\nR → Rotate (putar)\nS → Scale (perbesar/kecil)\nT → Turbo mode' },
          { title: 'Axis lock', text: 'Tekan X/Y/Z sebelum/ sesudah G/R/S untuk mengunci pada sumbu tertentu (mis. R lalu Z = putar hanya sumbu Z).' },
          { title: 'Mode', text: 'Semua berlaku di Object Mode; di Edit Mode ia memengaruhi selection mesh.' },
        ],
      },
      {
        id: '3d-2',
        type: 'mc',
        prompt: 'Modifier yang membagi-mesh menjadi segitiga/segipola lebih halus (membuat bentuk melengkung) adalah…',
        options: ['Bevel', 'Subdivision Surface', 'Mirror', 'Solidify'],
        correctIndex: 1,
        hint: 'Katanya “subdiv…”.',
        steps: [
          { title: 'Subdivision Surface', text: 'Menambahkan level subdivisi → permukaan makin halus (level 1–3 umum). Butuh topologi yang baik (edge loop).' },
          { title: 'Bandingkan', text: 'Bevel = membulatkan tepi; Mirror = simetri; Solidify = memberi ketebalan pada surface tipis.' },
          { title: 'Praktik', text: 'Model kasar → Subsurf level 2 → smoothing = look “clay render”.' },
        ],
      },
      {
        id: '3d-3',
        type: 'essay',
        prompt: 'Apa perbedaan modeling polygon (mesh) dan modeling kurva (curve)? Kapan memakai masing-masing?',
        answerKey: 'Mesh/polygon: dibangun dari verteks-edge-face, cocok untuk bentuk kompleks & tekstur (karakter, produk). Curve: garis berdimensi (bezier), cocok untuk bentuk alir/logo/teks 3D & jalur. Curve bisa dikonversi ke mesh jika ingin di-detail lebih lanjut.',
        aiFeedback: 'Perbedaannya jelas! Tambahkan tips workflow: mulai dari curve untuk outline, konversi ke mesh, lalu model detail — kombinasi keduanya umum di modeling produk (mis. pipa, kabel, pipa).',
      },
    ],
  },

  dmp: {
    title: 'Kuis Evaluasi: Digital Media Production',
    questions: [
      {
        id: 'dmp-1',
        type: 'mc',
        prompt: 'Teknik komposisi “rule of thirds” membagi frame menjadi…',
        options: ['2 bagian sama', '9 bagian (3×3 grid)', '4 persegi sama', 'Segitiga sama sisi'],
        correctIndex: 1,
        hint: 'Bayangkan grid 3 kolom × 3 baris.',
        steps: [
          { title: 'Grid 3×3', text: 'Dua garis vertikal + dua garis horizontal membagi frame jadi 9 bagian; titik potong = “power point”.' },
          { title: 'Penerapan', text: 'Letakkan mata subjek di power point atas; cakrawala di garis bawah → komposisi terasa seimbang & dinamis.' },
          { title: 'Kapan pecahkan', text: 'Simetri intentional (refleksi, arsitektur) boleh menempatkan subjek di tengah.' },
        ],
      },
      {
        id: 'dmp-2',
        type: 'mc',
        prompt: 'Format video yang PALING umum dan kompatibel untuk web adalah…',
        options: ['AVI (H.261)', 'MP4 (H.264/HEVC)', 'FLV', 'TIFF'],
        correctIndex: 1,
        hint: 'H.264 adalah codec standar web.',
        steps: [
          { title: 'MP4 + H.264', text: 'Kombinasi codec H.264 (atau HEVC/H.265) dalam container MP4 = kompatibel semua browser & platform sosial.' },
          { title: 'Export setting', text: '1080p 30fps (feed) / 2160p (YouTube), bitrate VBR 2-pass untuk kualitas stabil.' },
          { title: 'Audio', text: 'AAC 320kbps stereo; sync lip-sync penting di multi-kamera.' },
        ],
      },
      {
        id: 'dmp-3',
        type: 'essay',
        prompt: 'Sebutkan 3 tahapan produksi video (praproduksi, produksi, pascaproduksi) beserta satu contoh aktivitas di tiap tahap!',
        answerKey: 'Praproduksi: naskah, storyboarding, casting, survei lokasi. Produksi: pengambilan gambar (shooting), rekaman audio, lighting. Pascaproduksi: editing, color grading, sound design, rendering & publishing.',
        aiFeedback: 'Tiga tahap + contoh sudah lengkap! Tambahkan satu “jembatan” antar tahap: review footage & logging pada awal pasca — memastikan semua shot yang direncanakan (dari shooting list) ada sebelum edit dimulai.',
      },
    ],
  },

  /* ================= BAHASA & KOMUNIKASI ================= */
  'arabic-comm': {
    title: 'Kuis Evaluasi: Bahasa Arab (Komunikasi)',
    questions: [
      {
        id: 'ar-1',
        type: 'mc',
        prompt: 'Kata شُكْرًا (syukran) dalam percakapan sehari-hari artinya…',
        options: ['Selamat pagi', 'Terima kasih', 'Maaf', 'Selamat malam'],
        correctIndex: 1,
        hint: 'Diucapkan setelah orang membantu kita.',
        steps: [
          { title: 'Makna', text: 'شُكْرًا = “terima kasih” (mashdar dari syakara-yasykuru).' },
          { title: 'Jawaban umum', text: 'Orang yang didoakan menjawab: عَفْوًا (afwan — “sama-sama/memaafkan”) atau عَلَى خَيْر.' },
          { title: 'Context', text: 'Frasa formal: جَزَاكَ اللهُ خَيْرًا (jazakallahu khayran) — “semoga Allah membalasmu kebaikan”.' },
        ],
        dalil: 'Rasulullah ﷺ mengajarkan adab berterima kasih: “من لا يشكر الناس لا يشكر الله” (HR. Abu Dawud) — barangsiapa tidak berterima kasih kepada manusia, ia tidak berterima kasih kepada Allah.',
      },
      {
        id: 'ar-2',
        type: 'mc',
        prompt: 'Kalimat كَيْفَ حَالُكَ؟ ditujukan kepada lawan bicara LAKI-LAKI. Bentuknya untuk PEREMPUAN adalah…',
        options: ['كَيْفَ حَالُكَ؟', 'كَيْفَ حَالُكِ؟', 'كَيْفَ حَالُهُ؟', 'كَيْفَ حَالُهَا؟'],
        correctIndex: 1,
        hint: 'Perhatikan akhiran dhomir (kata ganti).',
        steps: [
          { title: 'Dhomir', text: 'كَ (kaf) = kamu laki-laki; كِ (kaf + kasrah) = kamu perempuan.' },
          { title: 'Jawaban', text: 'Laki-laki: أَنَا بِخَيْرٍ (ana bikhair). Perempuan: أَنَا بِخَيْرٍ juga (sama).' },
          { title: 'Tiga bentuk', text: 'هْ (hu) = dia laki-laki; هَا (ha) = dia perempuan; هُمَا = keduanya.' },
        ],
      },
      {
        id: 'ar-3',
        type: 'essay',
        prompt: 'Tulis 2 kalimat percakapan (muhadarah) dalam bahasa Arab: menanyakan kabar dan menjawabnya!',
        answerKey: 'Contoh: سَلَامٌ عَلَيْكُمْ — وَعَلَيْكُمُ السَّلَام. كَيْفَ حَالُكَ يَا أَخِي؟ — أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ. وَأَنْتَ؟ — أَنَا كَذَلِك.',
        aiFeedback: 'Struktur muhadarah-nya sudah benar! Perhatikan i’rab akhir kata (tanwin/rafa) dan jangan lupa “وَ” (wa = dan) untuk menyambung kalimat agar percakapan mengalir natural, seperti yang biasa dipraktikkan di majelis.',
      },
    ],
  },

  english: {
    title: 'Kuis Evaluasi: Bahasa Inggris',
    questions: [
      {
        id: 'english-1',
        type: 'mc',
        prompt: 'Choose the correct sentence: “She ___ to school every day.”',
        options: ['go', 'goes', 'is going', 'went'],
        correctIndex: 1,
        hint: 'Perhatikan “every day” — apa tense-nya?',
        steps: [
          { title: 'Signal word', text: '“Every day” menandakan Simple Present (kebiasaan).' },
          { title: 'Aturan subjekt', text: 'Pada simple present, subjek orang ketiga tunggal (he/she/it) menambah -s/-es pada verb.' },
          { title: 'Kesimpulan', code: 'She goes to school every day. ✓' },
        ],
      },
      {
        id: 'english-2',
        type: 'mc',
        prompt: 'The antonym (lawan kata) of “improve” is…',
        options: ['advance', 'worsen', 'enhance', 'upgrade'],
        correctIndex: 1,
        hint: '“Improve” artinya membaik. Lawannya?',
        steps: [
          { title: 'Arti kata', text: 'Improve = membaik / meningkat.' },
          { title: 'Cari lawan', text: 'Worsen = memburuk → lawan kata (antonym) dari improve.' },
          { title: 'Sinonim lain', text: 'Advance, enhance, dan upgrade adalah sinonim (penguat), bukan antonim.' },
        ],
      },
      {
        id: 'english-3',
        type: 'essay',
        prompt: 'Write 2 sentences about your dream career using future tense (will / going to)!',
        answerKey: 'Contoh: “I will become a web developer. I am going to study at IDN and then start my own startup.” (Jawaban siswa bebas; yang dinilai: bentuk future tense yang benar + makna jelas.)',
        aiFeedback: 'Great structure! Ingat pemakaiannya: “will” untuk keputusan/janji, “going to” untuk rencana yang sudah dipikirkan — dan selalu diikuti base verb (be going to + V1). Contoh: “I am going to study hard.”',
      },
    ],
  },

  spanish: {
    title: 'Kuis Evaluasi: Bahasa Spanyol',
    questions: [
      {
        id: 'es-1',
        type: 'mc',
        prompt: '“Buenos días” dalam bahasa Indonesia artinya…',
        options: ['Selamat malam', 'Selamat pagi', 'Selamat siang', 'Sampai jumpa'],
        correctIndex: 1,
        hint: 'Dipakai dari bangun tidur sampai sekitar jam 12.',
        steps: [
          { title: 'Sapaan harian', code: 'Buenos días   → Selamat pagi\nBuenas tardes → Selamat siang/sore\nBuenas noches → Selamat malam' },
          { title: 'Kesalahan umum', text: '“Buenas noches” hanya untuk malam (tidur/pulang), bukan sapaan pagi.' },
          { title: 'Jawaban', text: '¿Cómo estás? — Estoy bien, gracias.' },
        ],
      },
      {
        id: 'es-2',
        type: 'mc',
        prompt: 'Lengkapi: “Yo ___ estudiante de IDN.” (kata kerja ser yang benar)',
        options: ['es', 'soy', 'eres', 'somos'],
        correctIndex: 1,
        hint: 'Subjeknya “yo” (saya).',
        steps: [
          { title: 'Konjugasi ser (presente)', code: 'yo soy\ntú eres\nél/ella es\nnosotros somos\nvosotros sois\nellos son' },
          { title: 'Aturan', text: 'Subjek yo → soy. Kesalahan umum pemula: memakai “es” untuk “saya”.' },
          { title: 'Kalimat', code: 'Yo soy estudiante de IDN. (Saya pelajar IDN.)' },
        ],
      },
      {
        id: 'es-3',
        type: 'essay',
        prompt: 'Perkenalkan dirimu dalam 2 kalimat bahasa Spanyol (nama, asal, dan cita-cita)!',
        answerKey: 'Contoh: “Me llamo Aisyah. Soy de Bogor, Indonesia. Quiero ser desarrolladora web.” (Nama saya Aisyah. Saya dari Bogor, Indonesia. Saya ingin menjadi developer web.)',
        aiFeedback: 'Coba struktur: Me llamo [nama] + Soy de [asal] + Quiero ser [cita-cita]. Perhatikan gender noun: “desarrolladora” (perempuan) vs “desarrollador” (laki-laki) — kata sifat/nama profesi mengikuti gender pembicara.',
      },
    ],
  },

  chinese: {
    title: 'Kuis Evaluasi: Bahasa Mandarin',
    questions: [
      {
        id: 'cn-1',
        type: 'mc',
        prompt: 'Karakter 你 (nǐ) artinya…',
        options: ['Saya', 'Kamu', 'Dia', 'Kita'],
        correctIndex: 1,
        hint: 'Kata sapaan untuk lawan bicara.',
        steps: [
          { title: 'Pronomina dasar', code: '我 (wǒ)   = saya\n你 (nǐ)   = kamu\n他 (tā)   = dia (lk)\n她 (tā)   = dia (pr)\n我们 (wǒmen) = kita' },
          { title: 'Nada', text: 'nǐ = nada ke-3 (turun-naik), bukan “ni” datar.' },
          { title: 'Ramah', text: 'Untuk yang lebih tua: 您 (nín) — bentuk hormat.' },
        ],
      },
      {
        id: 'cn-2',
        type: 'mc',
        prompt: 'Sapaan “halo” dalam bahasa Mandarin adalah…',
        options: ['Xièxie 谢谢', 'Nǐ hǎo 你好', 'Zàijiàn 再见', 'Wǒ 我'],
        correctIndex: 1,
        hint: 'Terdiri dari dua suku kata: nǐ + hǎo.',
        steps: [
          { title: 'Makna', text: 'Nǐ hǎo = “kamu baik” — sapaan universal Mandarin (formal & informal).' },
          { title: 'Jawaban', text: 'Nǐ hǎo juga; varian santai: 你好啊 (nǐ hǎo a).' },
          { title: 'Kata lain', text: 'Xièxie = terima kasih; Zàijiàn = sampai jumpa.' },
        ],
      },
      {
        id: 'cn-3',
        type: 'essay',
        prompt: 'Sebutkan 3 pinyin dengan NADA PERTAMA (datar, tinggi) beserta artinya!',
        answerKey: 'Contoh: mā (ibu), bā (delapan), shān (gunung), yī (satu/pakaian), zhōng (tengah/bel). Nada pertama = nada datar tinggi — seperti menyapa “hello?” tanpa naik-turun.',
        aiFeedback: 'Perhatikan ciri nada pertama: tinggi & datar. Untuk latihan, bandingkan dengan nada ke-4 (turun tajam): mā (ibu) vs mà (menoleh). Menyebutkan pasangan minimal kontras akan memperkuat pemahaman nadamu.',
      },
    ],
  },

  japanese: {
    title: 'Kuis Evaluasi: Bahasa Jepang',
    questions: [
      {
        id: 'jp-1',
        type: 'mc',
        prompt: 'Hiragana あ dibaca…',
        options: ['ka', 'a', 'sa', 'ta'],
        correctIndex: 1,
        hint: 'Ini suku kata pertama dalam urutan hiragana.',
        steps: [
          { title: 'Urutan gojūon', code: 'a i u e o\nka ki ku ke ko\nsa shi su se so\n...' },
          { title: 'あ = a', text: 'あ(a) い(i) う(u) え(e) お(o) — baris pertama.' },
          { title: 'Latihan', text: 'Tulis 5× setiap kana sampai bentuknya hafal — dasar JLPT N5.' },
        ],
      },
      {
        id: 'jp-2',
        type: 'mc',
        prompt: '“Terima kasih” dalam bahasa Jepang adalah…',
        options: ['Sumimasen', 'Arigatō', 'Konnichiwa', 'Ohayō'],
        correctIndex: 1,
        hint: 'Sumimasen = minta maaf/meminta.',
        steps: [
          { title: 'Frasa harian', code: 'arigatō / arigatō gozaimasu → terima kasih\nsumimasen → maaf / permisi / tolong\nkonnichiwa → halo (siang)\nohayō → selamat pagi' },
          { title: 'Formalitas', text: 'Tambahkan gozaimasu untuk sopan (biznes/guru); arigatō saja untuk teman sebaya.' },
          { title: 'Jawaban', text: 'Dō itashimashite (sama-sama).' },
        ],
      },
      {
        id: 'jp-3',
        type: 'essay',
        prompt: 'Tulis 2 kalimat perkenalan sederhana dalam bahasa Jepang (romaji + artinya)!',
        answerKey: 'Contoh: “Watashi wa Aisyah desu. (Nama saya Aisyah.)” + “Nihon go ga suki desu. (Saya suka bahasa Jepang.)” Struktur: Watashi wa [nama] desu = perkenalan standar.',
        aiFeedback: 'Pola “~wa ~desu” adalah kerangka kalimat paling penting di N5. Tambahkan satu kalimat “~ki desu” (profesi) atau “~gakuin desu” (asal) agar perkenalan terasa natural dan lengkap.',
      },
    ],
  },

  /* ================= SAINS ================= */
  'sains-sd': {
    title: 'Kuis Seru: Sains untuk SD',
    questions: [
      {
        id: 'ssd-1',
        type: 'mc',
        prompt: 'Air membeku menjadi es pada suhu…',
        options: ['0°C', '100°C', '50°C', '−100°C'],
        correctIndex: 0,
        hint: 'Suhu di mana air berubah jadi es di kulkas.',
        steps: [
          { title: 'Tiga wujud air', code: 'Es (padat)  → 0°C meleleh\nAir (cair)   → 100°C mendidih\nUap (gas)' },
          { title: 'Perubahan wujud', text: 'Membeku = cair → padat (suhu turun sampai 0°C).' },
          { title: 'Eksperimen', text: 'Letakkan gelas berisi air di freezer: air → es dalam beberapa jam. Itulah membeku! 🧊' },
        ],
      },
      {
        id: 'ssd-2',
        type: 'mc',
        prompt: 'Tumbuhan membuat makanannya sendiri dengan bantuan cahaya matahari. Proses itu disebut…',
        options: ['Respirasi', 'Fotosintesis', 'Evaporasi', 'Germinasi'],
        correctIndex: 1,
        hint: 'Foto = cahaya, sintesis = membuat.',
        steps: [
          { title: 'Apa itu', text: 'Fotosintesis: daun memakai cahaya matahari + air + CO₂ → membuat gula (makanan) + oksigen.' },
          { title: 'Rumus', code: '6CO₂ + 6H₂O + cahaya → C₆H₁₂O₆ + 6O₂' },
          { title: 'Mengapa penting', text: 'Bayangkan semua makanan yang kamu makan bermula dari sini! 🌱' },
        ],
      },
      {
        id: 'ssd-3',
        type: 'essay',
        prompt: 'Ceritakan satu perubahan wujud zat yang pernah kamu lihat di rumah (misal di dapur atau kulkas)!',
        answerKey: 'Contoh: “Es di freezer meleleh menjadi air saat dikeluarkan (mencair), atau air di panci menjadi uap saat direbus (menguap), atau embun di gelas es (mengembun).” (Jawaban siswa bebas selama menyebutkan perubahan wujud yang benar.)',
        aiFeedback: 'Pilih satu peristiwa dan sebutkan nama prosesnya (mencair/menguap/mengembun/membeku/kristalisasi). Tambahan plus: jelaskan apa yang terjadi pada partikelnya — saat meleleh, partikel es bergerak lebih bebas!',
      },
    ],
  },

  biologi: {
    title: 'Kuis Evaluasi: Biologi',
    questions: [
      {
        id: 'bio-1',
        type: 'mc',
        prompt: 'Organel yang berfungsi sebagai “pembangkit energi” (ATP) sel adalah…',
        options: ['Nukleus', 'Mitokondria', 'Ribosom', 'Lisosom'],
        correctIndex: 1,
        hint: 'Tempat respirasi seluler berlangsung.',
        steps: [
          { title: 'Mitokondria', text: 'Tempat rantai transpor elektron & fosforilasi oksidatif → menghasilkan ATP (mata uang energi sel).' },
          { title: 'Bandingkan', text: 'Nukleus = pusat perintah (DNA); ribosom = pabrik protein; lisosom = pencernaan sel.' },
          { title: 'Fakta', text: 'Mitokondria punya DNA sendiri (mtDNA) — diwariskan dari ibu.' },
        ],
      },
      {
        id: 'bio-2',
        type: 'mc',
        prompt: 'Struktur DNA berbentuk…',
        options: ['Spiral tunggal', 'Heliks ganda (double helix)', 'Persegi', 'Lembar datar'],
        correctIndex: 1,
        hint: 'Ditemukan oleh Watson & Crick pada 1953.',
        steps: [
          { title: 'Double helix', text: 'Dua untai polinukleotida berpilin, dihubungkan oleh pasangan basa: A–T dan G–C.' },
          { title: 'Fungsi', text: 'Menyimpan informasi genetik; replikasi & transkripsi membaca untai ini.' },
          { title: 'Skala', text: '1 heliks ≈ 2 nm diameter; untai penuh ≈ 2 meter jika direntang!' },
        ],
      },
      {
        id: 'bio-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan sel prokariotik dan eukariotik! Berikan satu contoh organisme untuk masing-masing.',
        answerKey: 'Prokariotik: tidak punya membran inti (DNA bebas di sitoplasma), organel bermembran, ukuran kecil — contoh: bakteri (E. coli). Eukariotik: punya inti sel ber membran & organel (mitokondria, nukleus, RE), ukuran lebih besar — contoh: sel hewan & tumbuhan, jamur, protista.',
        aiFeedback: 'Poin inti & organel sudah benar! Tambahkan satu perbedaan ukuran (pm vs µm) dan fakta bahwa prokariotik berevolusi lebih dulu — itu menunjukkan pemahaman evolusioner yang sering muncul di soal HOTS.',
      },
    ],
  },

  kimia: {
    title: 'Kuis Evaluasi: Kimia',
    questions: [
      {
        id: 'kimia-1',
        type: 'mc',
        prompt: 'Atom karbon memiliki nomor atom (Z) = 6. Banyak elektron di kulit terluarnya adalah…',
        options: ['2', '4', '6', '8'],
        correctIndex: 1,
        hint: 'Tulis konfigurasi elektronnya dulu: 2, 8, …',
        steps: [
          { title: 'Konfigurasi elektron', formula: 'C (Z=6): 1s² 2s² 2p²' },
          { title: 'Isi kulit', formula: 'Kulit K = 2, Kulit L = 4' },
          { title: 'Kesimpulan', text: 'Kulit terluar (L) berisi 4 elektron — karena itu karbon bisa membentuk 4 ikatan (tetravalen).' },
        ],
      },
      {
        id: 'kimia-2',
        type: 'mc',
        prompt: 'pH larutan dengan konsentrasi [H⁺] = 10⁻³ M adalah…',
        options: ['3', '7', '10', '1'],
        correctIndex: 0,
        hint: 'pH = −log [H⁺]. Hitung logaritmanya!',
        steps: [
          { title: 'Rumus', formula: 'pH = −log [H⁺]' },
          { title: 'Substitusi', formula: 'pH = −log(10⁻³) = 3' },
          { title: 'Interpretasi', text: 'pH < 7 → larutan bersifat asam.' },
        ],
      },
      {
        id: 'kimia-3',
        type: 'essay',
        prompt: 'Mengapa NaCl (garam) mudah larut dalam air? Jelaskan dengan konsep polaritas!',
        answerKey: 'Air adalah molekul polar (Hδ+ — Oδ−). Ion Na⁺ ditarik oleh ujung Oδ− dan ion Cl⁻ ditarik oleh ujung Hδ+ (interaksi ion–dipol). Ikatan ionik kisi kristal terputus, dan ion-ion terhidrasi tersebar dalam air.',
        aiFeedback: 'Poin polaritas air sudah muncul — bagus! Sebutkan istilah teknis “interaksi ion–dipol” dan “ion terhidrasi” agar jawabanmu lengkap dan bernilai penuh.',
      },
    ],
  },

  fisika: {
    title: 'Kuis Evaluasi: Fisika',
    questions: [
      {
        id: 'fis-1',
        type: 'mc',
        prompt: 'Hukum Newton I (hukum inersia) menyatakan bahwa benda akan tetap diam/gerak lurus beraturan jika…',
        options: ['Gaya resultan nol', 'Gaya resultan positif', 'Massa benda kecil', 'Kecepatan benda besar'],
        correctIndex: 0,
        hint: '“Inersia” = kecenderungan mempertahankan keadaan.',
        steps: [
          { title: 'Pernyataan', text: 'Jika ΣF = 0, benda tetap dalam keadaan semula: diam tetap diam, bergerak tetap lurus beraturan.' },
          { title: 'Contoh', text: 'Penumpang mobil yang rem mendadak terlempar ke depan — tubuhmu “ingin” tetap bergerak (inersia).' },
          { title: 'Kaitan hukum II', formula: 'ΣF = m·a → jika ΣF = 0 maka a = 0' },
        ],
      },
      {
        id: 'fis-2',
        type: 'mc',
        prompt: 'Satuan gaya dalam Sistem Internasional (SI) adalah…',
        options: ['Joule', 'Newton', 'Pascal', 'Watt'],
        correctIndex: 1,
        hint: 'Dinamai dari ilmuwan Inggris yang terkenal.',
        steps: [
          { title: 'Newton', formula: '1 N = 1 kg·m/s²' },
          { title: 'Bandingkan', text: 'Joule = energi; Pascal = tekanan; Watt = daya.' },
          { title: 'Contoh', text: 'Berat 1 kg ≈ 9,8 N di permukaan bumi (g ≈ 9,8 m/s²).' },
        ],
      },
      {
        id: 'fis-3',
        type: 'essay',
        prompt: 'Bola bermassa 2 kg didorong dengan gaya 10 N (gesekan diabaikan). Berapa percepatannya? Tunjukkan langkahnya dengan rumus F = m·a!',
        answerKey: 'Diketahui: F = 10 N, m = 2 kg. F = m·a → a = F/m = 10/2 = 5 m/s². Jadi percepatan bola 5 m/s² searah gaya.',
        aiFeedback: 'Substitusi ke F = m·a sudah tepat! Kebiasaan plus: tulis “Diketahui / Ditanya / Jawab” dan satuan di setiap baris — itu standar pengerjaan fisika yang rapi dan minim kesalahan tanda.',
      },
    ],
  },

  earth: {
    title: 'Kuis Evaluasi: Earth Science',
    questions: [
      {
        id: 'earth-1',
        type: 'mc',
        prompt: 'Lapisan terluar Bumi (tempat kita hidup) adalah…',
        options: ['Mantel', 'Kerak (crust)', 'Inti dalam', 'Litosfer dalam'],
        correctIndex: 1,
        hint: 'Setebal ±5–70 km, tersusun batuan.',
        steps: [
          { title: 'Lapisan Bumi', code: 'Kerak (crust)   → 5–70 km\nMantel        → ~2.900 km\nInti luar     → cair (Fe-Ni)\nInti dalam    → padat' },
          { title: 'Jenis kerak', text: 'Kerak benua (granit, tebal) & kerak samudera (basalt, tipis).' },
          { title: 'Lempeng', text: 'Litosfer = kerak + mantel atas → terpecah menjadi lempeng tektonik.' },
        ],
      },
      {
        id: 'earth-2',
        type: 'mc',
        prompt: 'Alat untuk mengukur gempa bumi adalah…',
        options: ['Barometer', 'Seismograf', 'Termometer', 'Anemometer'],
        correctIndex: 1,
        hint: 'Merekam gelombang gempa berupa grafik seismogram.',
        steps: [
          { title: 'Seismograf', text: 'Merekam getaran tanah → menghasilkan seismogram; amplitudo & waktu gelombang dipakai untuk lokasi & magnitudo.' },
          { title: 'Jenis gelombang', text: 'P (primer, cepat, longitudinal) & S (sekunder, lambat, transversal).' },
          { title: 'Jaringan BMG', text: 'Indonesia punya jaringan seismograf nasional (BMKG) untuk deteksi real-time.' },
        ],
      },
      {
        id: 'earth-3',
        type: 'essay',
        prompt: 'Sebutkan 3 hal yang bisa dilakukan untuk mitigasi gempa bumi di rumahmu!',
        answerKey: 'Contoh: (1) Memastikan struktur rumah kuat (pondasi, pengaku, tidak memakai bata ringan untuk rangka utama). (2) Menjadikan perabot berat (lemari, TV) terikat ke dinding. (3) Menyusun titik kumpul keluarga + latihan evakuasi + menyiapkan tas siaga (air, senter, P3K).',
        aiFeedback: 'Tiga langkah sudah tepat! Tambahkan “tahu jalur evakuasi & titik kumpul” serta “latihan drop-cover-hold” — dua hal yang sering dilupakan tapi menyelamatkan nyawa saat gempa benar-benar terjadi.',
      },
    ],
  },

  /* ================= MATEMATIKA ================= */
  numbers: {
    title: 'Kuis Seru: Angka & Bilangan',
    questions: [
      {
        id: 'numbers-1',
        type: 'mc',
        prompt: 'Hasil dari 25 × 4 adalah…',
        options: ['80', '90', '100', '110'],
        correctIndex: 2,
        hint: '25 × 4 = 25 × 2 × 2. Hitung perlahan!',
        steps: [
          { title: 'Pecah pengali', formula: '25 × 4 = 25 × 2 × 2' },
          { title: 'Hitung bertahap', formula: '25 × 2 = 50, lalu 50 × 2 = 100' },
          { title: 'Jawaban', text: 'Jadi 25 × 4 = 100. Keren! 🎉' },
        ],
      },
      {
        id: 'numbers-2',
        type: 'mc',
        prompt: 'Pola bilangan berikut: 2, 6, 18, 54, … Bilangan berikutnya adalah…',
        options: ['108', '144', '162', '216'],
        correctIndex: 2,
        hint: 'Cari hubungannya: setiap bilangan dikali berapa?',
        steps: [
          { title: 'Cari pola', formula: '2 × 3 = 6, 6 × 3 = 18, 18 × 3 = 54' },
          { title: 'Lanjutkan pola', formula: '54 × 3 = 162' },
          { title: 'Jawaban', text: 'Setiap bilangan dikali 3 (deret perkalian), jadi bilangan berikutnya 162.' },
        ],
      },
      {
        id: 'numbers-3',
        type: 'essay',
        prompt: 'Dina punya 36 permen. Dia membaginya sama rata kepada 6 teman. Berapa permen yang diterima masing-masing teman? Tulis kalimat matematikanya!',
        answerKey: '36 ÷ 6 = 6. Masing-masing teman menerima 6 permen. Kalimat matematikanya: 36 ÷ 6 = 6.',
        aiFeedback: 'Pembagian untuk “membagi sama rata” sudah benar! Tambahkan kalimat matematikanya (36 ÷ 6 = 6) supaya jawaban lengkap, dan sebutkan satuan (permen) di akhir.',
      },
    ],
  },

  aljabar: {
    title: 'Kuis Evaluasi: Aljabar',
    questions: [
      {
        id: 'aljabar-1',
        type: 'mc',
        prompt: 'Jika 3x − 7 = 11, maka nilai x adalah…',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctIndex: 3,
        hint: 'Pindahkan konstanta dulu ke ruas kanan, baru bagi dengan koefisien.',
        steps: [
          { title: 'Tambahkan 7 ke kedua ruas', text: 'Tujuannya mengisolasi suku yang berisi x.', formula: '3x − 7 + 7 = 11 + 7  →  3x = 18' },
          { title: 'Bagi kedua ruas dengan 3', text: 'Koefisien x adalah 3, jadi bagi kedua ruas dengan 3.', formula: 'x = 18 ÷ 3 = 6' },
          { title: 'Cek kembali', formula: '3(6) − 7 = 18 − 7 = 11 ✓' },
        ],
      },
      {
        id: 'aljabar-2',
        type: 'mc',
        prompt: 'Sederhanakan bentuk aljabar berikut: 2a + 5b − a + 3b',
        options: ['a + 8b', '3a + 8b', 'a + 2b', '2a + 8b'],
        correctIndex: 0,
        hint: 'Kelompokkan suku sejenis (like terms) terlebih dahulu.',
        steps: [
          { title: 'Kelompokkan suku sejenis', formula: '(2a − a) + (5b + 3b)' },
          { title: 'Jumlahkan koefisien', formula: '(2 − 1)a + (5 + 3)b = a + 8b' },
          { title: 'Hasil akhir', text: 'Bentuk paling sederhana: a + 8b.' },
        ],
      },
      {
        id: 'aljabar-3',
        type: 'essay',
        prompt: 'Selesaikan persamaan 5(x + 2) = 3x + 16, kemudian buktikan (cek) jawabanmu!',
        answerKey: '5x + 10 = 3x + 16 → 5x − 3x = 16 − 10 → 2x = 6 → x = 3. Cek: ruas kiri 5(3 + 2) = 25; ruas kanan 3(3) + 16 = 25. Kedua ruas sama, jadi x = 3 benar.',
        aiFeedback: 'Kamu sudah membuka kurung dengan hukum distributif — langkah yang tepat! Selalu biasakan cek ke kedua ruas setelah menemukan nilai x; itu kebiasaan juara olimpiade. Nilai akhirnya x = 3.',
      },
    ],
  },

  geometri: {
    title: 'Kuis Evaluasi: Geometri',
    questions: [
      {
        id: 'geo-1',
        type: 'mc',
        prompt: 'Jumlah besar sudut dalam segiempat (misal persegi panjang) adalah…',
        options: ['180°', '270°', '360°', '540°'],
        correctIndex: 2,
        hint: 'Rumus: (n − 2) × 180° untuk segi-n.',
        steps: [
          { title: 'Rumus', formula: 'Jumlah sudut segi-n = (n − 2) × 180°' },
          { title: 'Substitusi n = 4', formula: '(4 − 2) × 180° = 2 × 180° = 360°' },
          { title: 'Bukti visual', text: 'Bagi segiempat dengan 1 diagonal → 2 segitiga → 2 × 180° = 360°.' },
        ],
      },
      {
        id: 'geo-2',
        type: 'mc',
        prompt: 'Luas lingkaran dengan radius 7 cm (π = 22/7) adalah…',
        options: ['44 cm²', '154 cm²', '49 cm²', '88 cm²'],
        correctIndex: 1,
        hint: 'Luas = π × r². Kuadratkan radiusnya dulu!',
        steps: [
          { title: 'Rumus', formula: 'L = π · r²' },
          { title: 'Substitusi', formula: 'L = 22/7 × 7² = 22/7 × 49 = 22 × 7 = 154 cm²' },
          { title: 'Jebakan umum', text: 'Banyak yang menulis 22/7 × 7 = 22 (lupa mengkuadratkan r). Selalu r²!' },
        ],
      },
      {
        id: 'geo-3',
        type: 'essay',
        prompt: 'Bujursangkar memiliki sisi 10 cm. Hitung luas dan kelilingnya!',
        answerKey: 'Luas = s² = 10 × 10 = 100 cm². Keliling = 4 × s = 4 × 10 = 40 cm.',
        aiFeedback: 'Rumus L = s² dan K = 4s sudah benar. Kebiasaan plus: tuliskan satuan di hasil (cm² untuk luas, cm untuk keliling) — kelupaan satuan adalah kehilangan poin paling umum di ujian.',
      },
    ],
  },

  kalkulus: {
    title: 'Kuis Evaluasi: Kalkulus',
    questions: [
      {
        id: 'kalk-1',
        type: 'mc',
        prompt: 'Turunan dari f(x) = x² adalah…',
        options: ['x', '2x', 'x³/3', '2'],
        correctIndex: 1,
        hint: 'Gunakan aturan pangkat: d/dx xⁿ = n·xⁿ⁻¹.',
        steps: [
          { title: 'Aturan pangkat', formula: 'd/dx (xⁿ) = n · xⁿ⁻¹' },
          { title: 'Terapkan n = 2', formula: 'f′(x) = 2 · x¹ = 2x' },
          { title: 'Intuisi', text: 'Turunan = laju perubahan. Pada kurva y = x², kemiringan di titik x adalah 2x.' },
        ],
      },
      {
        id: 'kalk-2',
        type: 'mc',
        prompt: 'Nilai limit x→2 dari (x² − 4)/(x − 2) adalah…',
        options: ['0', '2', '4', 'Tak hingga'],
        correctIndex: 2,
        hint: 'Faktorkan pembilangnya dulu — ada bentuk 0/0!',
        steps: [
          { title: 'Deteksi 0/0', formula: '(2² − 4)/(2 − 2) = 0/0 → bentuk tidak tentu' },
          { title: 'Faktorkan', formula: '(x − 2)(x + 2)/(x − 2) = x + 2' },
          { title: 'Substitusi', formula: 'x → 2: 2 + 2 = 4' },
        ],
      },
      {
        id: 'kalk-3',
        type: 'essay',
        prompt: 'Tentukan turunan f(x) = 3x³ − 2x + 5, lalu hitung nilai f′(1)!',
        answerKey: 'f′(x) = 9x² − 2 (turunan konstanta 5 = 0). f′(1) = 9(1)² − 2 = 9 − 2 = 7.',
        aiFeedback: 'Aturan pangkat sudah diterapkan dengan benar. Ingat: konstanta selalu punya turunan nol — itu sering jadi jebakan. Cek cepat: substitusi x=1 ke f′(x), bukan ke f(x).',
      },
    ],
  },

  'prep-math': {
    title: 'Kuis Persiapan Ujian: Matematika',
    questions: [
      {
        id: 'pm-1',
        type: 'mc',
        prompt: 'Jika 2x + 3 = 11, maka nilai 5x adalah…',
        options: ['10', '20', '25', '30'],
        correctIndex: 1,
        hint: 'Cari x dulu, baru kalikan 5.',
        steps: [
          { title: 'Cari x', formula: '2x = 11 − 3 = 8 → x = 4' },
          { title: 'Hitung 5x', formula: '5x = 5 × 4 = 20' },
          { title: 'Strategi ujian', text: 'Soal seperti ini menguji ketelitian: banyak yang berhenti di x = 4 dan salah memilih opsi.' },
        ],
      },
      {
        id: 'pm-2',
        type: 'mc',
        prompt: '20% dari 45 adalah…',
        options: ['9', '15', '22,5', '4,5'],
        correctIndex: 0,
        hint: '20% = 1/5. Atau 20/100 × 45.',
        steps: [
          { title: 'Cara cepat', formula: '20% × 45 = (20/100) × 45 = 900/100 = 9' },
          { title: 'Tips 10%', text: '10% dari 45 = 4,5 → 20% = 2 × 4,5 = 9. Cara 10% ini ampuh untuk soal persen apa pun.' },
          { title: 'Jawaban', text: '9.' },
        ],
      },
      {
        id: 'pm-3',
        type: 'essay',
        prompt: 'Sebuah toko memberi diskon 25% untuk sepatu seharga Rp200.000. Berapa harga yang harus dibayar setelah diskon?',
        answerKey: 'Diskon = 25% × 200.000 = 50.000. Harga akhir = 200.000 − 50.000 = Rp150.000. (Alternatif: langsung 75% × 200.000 = 150.000.)',
        aiFeedback: 'Dua cara valid: kurangi harga diskon, atau langsung hitung persentase tersisa (100% − 25% = 75%). Di ujian berbatas waktu, cara kedua lebih cepat — latih keduanya sampai fluens.',
      },
    ],
  },

  /* ================= SEJARAH & ILMU SOSIAL ================= */
  'sejarah-islam': {
    title: 'Kuis Evaluasi: Sejarah Islam',
    questions: [
      {
        id: 'sejarah-1',
        type: 'mc',
        prompt: 'Perang Badar al-Kubra terjadi pada tahun ke-… Hijriah',
        options: ['2 H', '3 H', '5 H', '7 H'],
        correctIndex: 0,
        hint: 'Perang besar pertama umat Islam; bulan Ramadhan.',
        steps: [
          { title: 'Lini masa', text: 'Isra Mi’raj (1 H) → Badar (17 Ramadhan 2 H) → Uhud (3 H) → Khandaq (5 H) → Hudaibiyyah (6 H).' },
          { title: 'Fakta penting', text: 'Badar = perang besar pertama umat Islam; pasukan Muslimin 313 orang menghadapi ±1.000 pasukan Quraisy.' },
          { title: 'Kesimpulan', text: 'Jawaban: tahun ke-2 Hijriah.' },
        ],
        dalil: 'Para ahli sirah (mis. Ibnu Hisyam dalam As-Sirah An-Nabawiyyah) memaklumatkan Badar terjadi pada 17 Ramadhan tahun ke-2 H, dan Allah menurunkan pertolongan-Nya (QS. Al-Anfal [8]: 63).',
      },
      {
        id: 'sejarah-2',
        type: 'mc',
        prompt: 'Khalifah yang kedua dari Khulafaur Rasyidin adalah…',
        options: ['Abu Bakar Ash-Shiddiq r.a.', 'Umar bin Khattab r.a.', 'Utsman bin Affan r.a.', 'Ali bin Abi Thalib r.a.'],
        correctIndex: 1,
        hint: 'Urutan: Abu Bakar → ? → Utsman → Ali.',
        steps: [
          { title: 'Urutan khilafah', text: '1) Abu Bakar Ash-Shiddiq (11–13 H), 2) Umar bin Khattab (13–23 H), 3) Utsman bin Affan (23–35 H), 4) Ali bin Abi Thalib (35–40 H).' },
          { title: 'Ciri Umar r.a.', text: 'Dijuluki “Al-Faruq” (pembeda haq & bathil), mendirikan baitul mal dan perluasan wilayah Islam.' },
          { title: 'Kesimpulan', text: 'Jawaban: Umar bin Khattab r.a.' },
        ],
      },
      {
        id: 'sejarah-3',
        type: 'essay',
        prompt: 'Sebutkan 2 sahabat Nabi ﷺ yang terkenal dan apa keistimewaan mereka!',
        answerKey: 'Contoh: (1) Abu Bakar Ash-Shiddiq — sahabat terdekat Nabi, khalifah pertama, menemani Nabi di Gua Tsur. (2) Umar bin Khattab — dilindungi Allah, memakmurkan baitul mal, memakmurkan wilayah Islam. (Jawaban siswa bebas selama menyebutkan nama + keistimewaan yang benar.)',
        aiFeedback: 'Bagus! Kamu menyebutkan nama dan peran mereka. Tambahkan konteks sejarah (mis. peristiwa atau kebijakan) agar jawabanmu lebih kaya — misalnya peran Abu Bakar dalam membukukan Al-Qur’an.',
      },
    ],
  },

  geografi: {
    title: 'Kuis Evaluasi: Geografi',
    questions: [
      {
        id: 'geo-sos-1',
        type: 'mc',
        prompt: 'Garis khatulistiwa (equirektang) membagi permukaan Bumi menjadi…',
        options: ['Dua belahan: utara dan selatan', 'Empat zona iklim', 'Tiga samudra', 'Dua benua'],
        correctIndex: 0,
        hint: '0° lintang — garis tengah Bumi.',
        steps: [
          { title: 'Definisi', text: 'Khatulistiwa = lintang 0°, membagi Bumi menjadi belahan utara (N) dan selatan (S).' },
          { title: 'Fakta', text: 'Kecepatan rotasi terbesar di khatulistiwa (~1.670 km/jam); siang & malam sepanjang tahun hampir sama (±12 jam).' },
          { title: 'Indonesia', text: 'Dilewati oleh beberapa pulau: Sumatra, Kalimantan, Sulawesi, Maluku — makanya Indonesia tropis.' },
        ],
      },
      {
        id: 'geo-sos-2',
        type: 'mc',
        prompt: 'Pulau TERBESAR di Indonesia adalah…',
        options: ['Sumatra', 'Kalimantan', 'Sulawesi', 'Papua'],
        correctIndex: 1,
        hint: 'Pulau ini juga disebut Borneo.',
        steps: [
          { title: 'Luas (±)', code: 'Kalimantan ≈ 743.000 km² (terbesar)\nSumatra   ≈ 473.000 km²\nPapua     ≈ 420.000 km² (bagian Indonesia)\nSulawesi  ≈ 180.000 km²' },
          { title: 'Fakta', text: 'Pulau Borneo (Kalimantan) adalah pulau terbesar ke-3 di dunia setelah Greenland dan New Guinea.' },
          { title: 'Jawaban', text: 'Kalimantan.' },
        ],
      },
      {
        id: 'geo-sos-3',
        type: 'essay',
        prompt: 'Jelaskan mengapa Jakarta rawan banjir! Sebutkan minimal 2 faktor (alam & buatan manusia)!',
        answerKey: 'Faktor alam: topografi datar + pasang laut (rob) + curah hujan tinggi (Iklim tropis). Faktor manusia: alih fungsi lahan (resapan hilang), sedimentasi sungai, drainase tidak memadai, pembangunan di bantaran sungai. Kombinasi keduanya membuat air tidak punya tempat meresap/muaranya terhalang.',
        aiFeedback: 'Faktor alam & buatan sudah muncul. Tambahkan satu istilah teknis: “daya serap tanah” (infiltrasi) dan “rob” (pasang laut) — itu pembeda jawaban “rumahan” dan jawaban “geografi”. Bonus: sebutkan solusi seperti normalisasi sungai & penghijauan hulu.',
      },
    ],
  },

  civics: {
    title: 'Kuis Evaluasi: Kewarganegaraan',
    questions: [
      {
        id: 'civ-1',
        type: 'mc',
        prompt: 'Pancasila sebagai dasar negara terdiri dari berapa sila?',
        options: ['3', '4', '5', '6'],
        correctIndex: 2,
        hint: 'Bisa dihitung dari kata “panca” (lima).',
        steps: [
          { title: 'Panca = lima', text: 'Panca (lima) + sila (dasar/kaki) = 5 sila.' },
          { title: 'Rumus hafal', text: 'K-H-H-K-T: Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, Keadilan.' },
          { title: 'Peran', text: 'Pancasila = dasar negara, pandangan hidup, jiwa, kepribadian, dan perjanjian luhur bangsa.' },
        ],
      },
      {
        id: 'civ-2',
        type: 'mc',
        prompt: 'Pasal 31 UUD 1945 menggarisbawahi hak warga negara di bidang…',
        options: ['Kesehatan', 'Pendidikan', 'Kehidupan beragama', 'Ketenagakerjaan'],
        correctIndex: 1,
        hint: 'Setiap warga negara berhak atas…',
        steps: [
          { title: 'Isi pasal', text: 'Pasal 31: setiap warga berhak atas pendidikan; pemerintah menyelenggarakan satu sistem pendidikan nasional; wajib belajar dipikul negara.' },
          { title: 'Konteks', text: 'Pemerintah menaikkan anggaran pendidikan (20% APBN) sebagai implementasi pasal ini.' },
          { title: 'Kaitan siswa', text: 'Hakmu sekolah = amanat konstitusi, sekaligus kewajiban belajar.' },
        ],
      },
      {
        id: 'civ-3',
        type: 'essay',
        prompt: 'Sebutkan 2 hak dan 1 kewajiban sebagai pelajar, beserta satu contoh penerapannya!',
        answerKey: 'Hak: (1) mendapat pendidikan yang layak — contoh: mengikuti pelajaran tanpa dipungut biaya SPP. (2) mendapat perlindungan — contoh: sekolah memberi fasilitas aman & bebas perundungan. Kewajiban: belajar dengan sungguh-sungguh & mematuhi tata tertib — contoh: mengumpulkan tugas tepat waktu.',
        aiFeedback: 'Hak & kewajiban sudah seimbang. Tambahkan pasangan “hak–kewajiban” yang saling terkait (misal hak mendapat guru = kewajiban menghormati guru) — itu menunjukkan pemahaman bahwa hak dan kewajiban itu dua sisi mata uang.',
      },
    ],
  },

  ekonomi: {
    title: 'Kuis Evaluasi: Ekonomi Dasar',
    questions: [
      {
        id: 'eko-1',
        type: 'mc',
        prompt: 'Hukum permintaan menyatakan bahwa jika harga suatu barang naik (ceteris paribus), maka…',
        options: ['Jumlah yang diminta naik', 'Jumlah yang diminta turun', 'Jumlah yang ditawarkan naik', 'Penawaran tidak berubah'],
        correctIndex: 1,
        hint: '“Permintaan” dari sisi pembeli — apa yang terjadi saat harga mahal?',
        steps: [
          { title: 'Pernyataan hukum', text: 'Harga ↑ → kuantitas diminta ↓ (hubungan terbalik), dengan syarat lain tetap (ceteris paribus).' },
          { title: 'Alasan', text: 'Daya beli & insentif: barang mahal → konsumen hemat/mencari substitusi.' },
          { title: 'Kurva', text: 'Kurva permintaan berturun dari kiri-atas ke kanan-bawah (slope negatif).' },
        ],
      },
      {
        id: 'eko-2',
        type: 'mc',
        prompt: 'Kenaikan harga barang dan jasa secara umum dan terus-menerus disebut…',
        options: ['Deflasi', 'Inflasi', 'Resesi', 'Stagflasi'],
        correctIndex: 1,
        hint: 'Lawan dari deflasi.',
        steps: [
          { title: 'Definisi', text: 'Inflasi = kenaikan index harga umum secara persisten → daya beli uang turun.' },
          { title: 'Pengukuran', text: 'IPHK (Indeks Harga Konsumen) oleh BPS; inflasi Indonesia ditargetkan 2,5–4% (BI).' },
          { title: 'Jenis', text: 'Inflasi impor (harga bahan baku global), demand-pull (permintaan berlebih), cost-push (biaya produksi naik).' },
        ],
      },
      {
        id: 'eko-3',
        type: 'essay',
        prompt: 'Jelaskan perbedaan kebutuhan dan keinginan, lalu berikan satu contoh untuk masing-masing!',
        answerKey: 'Kebutuhan: hal yang harus dipenuhi agar hidup terlindungi (primer: sandang-pangan-papan; sekunder: pendidikan, transportasi; tersier: hobi premium). Contoh: makanan bergizi. Keinginan: hal yang diidamkan, tidak selalu mendesak; bisa ditunda. Contoh: gadget terbaru. Bedanya: kebutuhan berdampak langsung jika tidak terpenuhi; keinginan tidak.',
        aiFeedback: 'Perbedaannya sudah tepat! Tambahkan konsep “prioritas”: kebutuhan primer > sekunder > tersier, dan keinginan bisa berubah jadi kebutuhan seiring teknologi (misal: dulu ponsel = keinginan, sekarang = kebutuhan). Itu menunjukkan pemahaman ekonomi perilaku.',
      },
    ],
  },
}

export const quizForCourse = (courseId) => QUIZZES[courseId]

export function quizXpTotal(quiz) {
  return quiz.questions.reduce((sum, q) => sum + (q.type === 'mc' ? XP_MC : XP_ESSAY), 0)
}
