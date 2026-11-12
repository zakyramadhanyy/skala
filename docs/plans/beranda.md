# Rencana — Beranda SKALA

- **Status:** DRAFT — menunggu persetujuan user. Bergantung pada ADR-001 (`docs/decisions/001-stack.md`).
- **Tanggal:** 2026-11-11 · **Penulis:** planner
- **Sumber:** CLAUDE.md, sitemap (§A, §B, §C; berkas saat ini di `sitemap.md` root, seharusnya `docs/01-sitemap.md`), instruksi user tentang pola farmafrica.org.
- **Catatan metode:** pola Farm Africa diambil dari deskripsi user. Situs itu belum dibuka ulang dan tidak ada yang disalin. Hanya struktur, ritme, dan jenis interaksi yang diadaptasi. Teks, foto, logo, warna, aset: milik SKALA.
- **Dokumen yang disebut CLAUDE.md tetapi belum ada:** `docs/00-brief.md`, `docs/02-design-direction.md`, `docs/03-workflow.md`, `.claude/agents/*.md`. Rencana ini memakai format baku di bawah (Tujuan → Asumsi → Keputusan → Spesifikasi → Konten → Risiko → Task → Pertanyaan) dan menandai semua yang bergantung pada dokumen yang hilang.

---

## 1. Tujuan dan non-tujuan

**Tujuan.** Beranda menjawab dalam 10 detik: *apa itu SKALA, mengapa penting, di mana bekerja, dan ke mana saya melangkah selanjutnya* untuk tiap jenis pengguna. Memberi kesan profesional dan hangat, bukan korporat dingin, dengan satu momen berkesan (hero) tanpa mengorbankan kecepatan atau aksesibilitas.

**Non-tujuan.** Tidak ada donasi. Tidak ada angka karangan. Tidak ada autoplay berulang. Tidak ada carousel. Tidak ada scroll-jacking (scroll tetap native).

## 2. Asumsi dan keputusan rencana

| # | Keputusan | Alasan |
| --- | --- | --- |
| D1 | **Hero = 1 pin scroll di desktop (≥1024 px, pointer halus); di mobile tanpa pin**, stage ditumpuk dan dianimasikan ringan. | Pin di layar sentuh bermasalah (bar alamat iOS, momentum) dan menyulitkan pengguna keyboard/AT. |
| D2 | "Hero ≤ 1,5 dtk lalu diam" ditafsirkan: animasi pembuka otomatis (pertanyaan muncul bertahap) selesai ≤ 1,5 dtk lalu **tidak ada gerak apa pun** sampai pengguna scroll. Zoom dan transisi ke peta digerakkan scroll (scrub), bukan waktu. | Memenuhi WCAG 2.2.2 (tanpa gerak otomatis > 5 dtk) dan permintaan user. **Perlu konfirmasi (Q2).** |
| D3 | Teks hero (h1 lengkap) selalu ada di HTML dan menjadi elemen LCP. Canvas 3D bukan LCP. | LCP < 2,5 dtk meski 3D gagal/lambat. |
| D4 | Section "peta mini wilayah" di sitemap §C **digabung** ke peta hero (kondisi akhir hero = peta dengan 12 pin + daftar provinsi + tautan ke `/wilayah/`). Tidak ada peta kedua di Beranda. | Menghindari peta ganda dan beban 3D kedua. **Sitemap perlu diperbarui (H-021). Perlu konfirmasi (Q2).** |
| D5 | Pin diimplementasikan sebagai **tombol HTML** yang diposisikan di atas canvas/poster, bukan objek 3D yang diklik. | Keyboard, pembaca layar, target ≥ 24 px, dan fallback poster memakai komponen yang sama. |
| D6 | Pin berbeda bentuk **dan** warna: teal = wilayah utama (lingkaran), oranye = wilayah tambahan (belah ketupat). | Warna bukan satu-satunya pembeda (WCAG 1.4.1). Klasifikasi utama/tambahan dari klien. |
| D7 | Blok "Capaian kami" memakai *feature flag*: tampil di staging dengan lencana PLACEHOLDER, **disembunyikan di produksi** sampai klien menyerahkan angka resmi. | Aturan: angka capaian tidak boleh dikarang. |
| D8 | Tidak ada carousel. Tiga kartu terbaru = grid statis. | Menghindari beban aksesibilitas dan motion tambahan. |
| D9 | Ikon 6 tema = SVG inline (sprite), satu gaya garis. | Tanpa runtime Lottie. |
| D10 | Urutan section final di §3 (menyesuaikan sitemap §C: peta mini sudah masuk hero). | Ritme bergantian gelap/terang/split seperti pola rujukan. |

## 3. Urutan section Beranda (ringkas)

| # | Section | Latar | Sumber pola | Sumber data |
| --- | --- | --- | --- | --- |
| 0 | Skip link + header + bar mitra | putih | pola 9 | i18n + sitemap §B |
| 1 | **Hero**: pertanyaan → zoom "layanan dasar" → peta 3D 12 provinsi | navy | pola 1 | i18n + `provinces.json` |
| 2 | **Angka kunci** + 3 kartu "Tahukah Anda?" | putih | pola 4 | i18n (angka dari klien) |
| 3 | **Tiga pilar** (split-screen bergantian) | putih / abu muda | pola 2 | i18n + foto klien |
| 4 | **Tema kerja** (grid 6 tile) | abu muda | pola 5 | i18n, tautan `/program/tema/*` |
| 5 | **Terbaru** dari Kabar & Pengetahuan (3 kartu) | putih | pola 6 | CMS |
| 6 | **Pull-quote** pejabat daerah | teal muda | pola 6 | CMS (testimoni) |
| 7 | **Capaian kami** (flag) | putih | pola 7 | CMS/klien |
| 8 | **Mau ke mana?** (5 kartu jalur pengguna) | abu muda | pola 8 | i18n |
| 9 | **Logo mitra** | putih | pola 9 | aset klien |
| 10 | **Newsletter + band CTA kontur** (penutup) | navy | pola 3 | i18n |
| — | Footer | navy gelap | pola 9 | sitemap §B |

Bahasa visual: lebar konten maks 1200 px, grid 12 kolom, jarak vertikal antar section 96/128 px (mobile 64), gelap–terang bergantian supaya tiap section terasa sebagai "babak" baru.

---

## 4. Wireframe teks per section

Notasi: `[ ]` tombol/tautan, `( )` gambar, **tebal** = teks utama. Semua string lewat i18n (kunci `home.*`). Tiap section punya `<h2>` dan `aria-labelledby`.

### 4.0 Shell (header, bar mitra, skip link, footer)
```
[Lewati ke konten utama]   ← elemen fokus pertama, terlihat saat fokus
(SKALA)  Tentang Kami  Program  Dampak  Wilayah Kerja  Pusat Pengetahuan  Kabar & Media  Peluang   [🔍 Cari] [ID | EN]
Bar mitra: (Kemenkeu) (Kemendagri) (Bappenas) (Australian Government)
```
- Header **tidak** disembunyikan saat scroll turun. Sticky maksimal 72 px dan `scroll-padding-top` sebesar itu (WCAG 2.4.11 Focus Not Obscured).
- Menu desktop: item dengan anak membuka panel (tombol `aria-expanded`, bukan hover-only). Esc menutup.
- Menu mobile: panel layar penuh *drill-down*; tiap level punya tombol **"Kembali ke menu utama"** di atas dan judul level. Fokus dipindah ke judul level saat berganti, dikembalikan ke pemicu saat ditutup.
- Pencarian: ikon membuka bidang input (`role="search"`, label tersembunyi "Cari di situs") → `/cari/?q=`. 
- Toggle bahasa: `<a hreflang lang>` ke halaman setara (bukan tombol), label "ID" "EN" dengan `lang` masing-masing.
- Footer: ringkasan SKALA · Komunitas & Mitra · Kontak · alamat · email · [Kanal WhatsApp] · newsletter · [Kebijakan Privasi] · [Aksesibilitas] · [Pengadaan] · sosial media · "Dikelola oleh DT Global" · © tahun berjalan (dihitung, bukan hard-coded). Logo mitra bila aturan co-branding mewajibkan.
- *State:* default, fokus, aktif, terbuka, mobile ≤ 1023 px.

### 4.1 Hero — "pertanyaan → zoom → peta"
Teks ID (h1, kalimat utuh di HTML): **"Bagaimana jika setiap warga di daerah tertinggal mendapat layanan dasar yang layak?"**
Teks EN (usulan, perlu persetujuan klien): "What if every citizen in underserved regions had access to decent basic services?" Frasa zoom EN: "decent basic services".
```
STAGE A (muat)                STAGE B (scroll 30–60%)           STAGE C (scroll 60–100%, akhir)
┌────────────────────┐        ┌────────────────────┐         ┌──────────────────────────────┐
│ Bagaimana jika     │        │                    │         │  (peta Indonesia 3D navy)    │
│ setiap warga di    │        │   LAYANAN DASAR    │   →     │   ◆ ● ● ◆ ●  12 pin         │
│ daerah tertinggal  │        │   (membesar,       │         │  "12 provinsi. Satu tujuan:  │
│ mendapat           │        │    menembus layar) │         │   layanan dasar yang layak." │
│ layanan dasar      │        │                    │         │  [Jelajahi Wilayah Kerja]    │
│ yang layak?        │        └────────────────────┘         │  Daftar 12 provinsi ▾        │
│        ↓ gulir     │                                       └──────────────────────────────┘
└────────────────────┘
```
- **Komponen:** `Hero`, `HeroQuestion`, `HeroMapStage` (canvas ATAU poster), `ProvincePin` ×12, `ProvinceList`, `ProvincePopover`.
- **Isi Stage C:** kalimat nilai satu baris, tautan utama [Jelajahi Wilayah Kerja] → `/wilayah/`, legenda (● wilayah utama, ◆ wilayah tambahan) dalam teks, daftar 12 provinsi (disclosure, juga alternatif nonvisual).
- **Pin:** tombol 44×44 px (area sentuh) dengan penanda visual ≥ 16 px. Hover/fokus/tap → popover: nama provinsi, status (utama/tambahan), tautan [Lihat profil] → `/wilayah/<provinsi>/`. Esc menutup, fokus kembali ke pin. Tidak ada interaksi seret wajib (WCAG 2.5.7); rotasi/zoom peta tidak disediakan, kamera dikendalikan scroll saja.
- **State hero:**
  | State | Perilaku |
  | --- | --- |
  | `full` | Desktop mampu: pin scroll + 3D |
  | `lite` | Perangkat lemah/Save-Data/WebGL gagal: pin scroll yang sama, tetapi Stage C = poster statis + pin HTML |
  | `static` | `prefers-reduced-motion` atau tanpa JS: tanpa pin, tanpa animasi. Pertanyaan tampil utuh dengan "layanan dasar" bergaris-bawah teal-gelap/diberi penekanan; peta = poster di bawahnya + pin + daftar |
  | `mobile` | < 1024 px: tanpa pin; Stage A statis; Stage B = frasa dibesarkan ringan saat masuk viewport; Stage C poster/3D ringan (lihat §6) |
- Fokus: urutan DOM = h1 → tautan "Gulir ke bawah" → tautan "Lewati hero" (menuju §2) → pin 1..12 → daftar. Saat pin menerima fokus pada Stage A/B, skrip **memajukan scroll ke akhir pin** (`ScrollTrigger.scroll(end)`) sehingga pin selalu terlihat (WCAG 2.4.7/2.4.11).

### 4.2 Angka kunci + "Tahukah Anda?"
```
**SKALA dalam angka**                         (h2)
┌────────┐ ┌────────────────┐ ┌─────────┐ ┌────────┐
│ 8      │ │ hingga AUD 160 │ │ 12      │ │ 3      │
│ tahun  │ │ juta komitmen  │ │ provinsi│ │ pilar  │
└────────┘ └────────────────┘ └─────────┘ └────────┘
Tahukah Anda?                                  (h3)
┌ fakta 1 ┐ ┌ fakta 2 ┐ ┌ fakta 3 ┐   (tiap kartu: ikon, 1 kalimat, sumber kecil)
```
- 4 angka dari user: **8 tahun, hingga AUD 160 juta, 12 provinsi, 3 pilar**. Tidak ada angka capaian EOPO di sini.
- Kartu fakta: 3 fakta layanan dasar (mis. akses sanitasi, kependudukan, layanan kesehatan), **masing-masing wajib bersumber** (BPS/Kemenkeu/Kemendagri dsb.) dan memuat tahun data. Seluruh isi = **[PLACEHOLDER: fakta + sumber dari klien]**. Fixture memakai teks "DUMMY — jangan dipublikasikan".
- *State:* default, animasi selesai, reduced-motion (angka final langsung), data hilang (kartu fakta tidak dirender, h3 disembunyikan).
- Format angka lewat `Intl.NumberFormat(locale)`; "hingga AUD 160 juta" / "up to AUD 160 million" sebagai pesan ICU, bukan sambungan string.

### 4.3 Tiga pilar (EOPO) — split-screen bergantian
```
┌──────────────┬──────────────┐   ┌──────────────┬──────────────┐
│   (foto 1)   │ Pilar 1      │   │ Pilar 2      │   (foto 2)   │   ... Pilar 3 seperti 1
│              │ judul (h3)   │   │ judul        │              │
│              │ 1 kalimat    │   │ 1 kalimat    │              │
│              │ [Pelajari →] │   │ [Pelajari →] │              │
└──────────────┴──────────────┘   └──────────────┴──────────────┘
```
- Per pilar: foto lapangan/ilustrasi inklusif, **satu** kalimat inti, tautan "Pelajari" → halaman Program/Dampak. Usulan target: Pilar 1 → `/dampak/capaian/#eopo-1`, dst. (atau `/program/...`; **perlu konfirmasi, Q4**). Teks tautan unik dan bermakna: "Pelajari <nama pilar>" (aria-label bila teks visual pendek).
- Nama, urutan, dan kalimat inti 3 pilar = **[PLACEHOLDER: dari kerangka hasil/EOPO klien]**. Dilarang menulis ulang makna EOPO.
- Foto menampilkan orang nyata (perempuan, penyandang disabilitas, masyarakat adat): **wajib persetujuan tertulis dan penggambaran bermartabat** (bukan tokenistik). Tanpa foto → ilustrasi vektor satu gaya (gaya diputuskan di desain). Alt text bermakna; ilustrasi dekoratif `alt=""`.
- Mobile: tumpuk (gambar di atas teks), urutan sama.

### 4.4 Tema kerja — grid 6 tile
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│ ikon    │ │ ikon    │ │ ikon    │
│ PFM     │ │ SPM     │ │ Perenc. │
│ 1 baris │ │ 1 baris │ │ & Angg. │
└─────────┘ └─────────┘ └─────────┘
┌ Tata Kelola Data ┐ ┌ GEDSI & Partisipasi ┐ ┌ Kepemimpinan Lokal ┐
```
- Enam tema: PFM · SPM · Perencanaan & Penganggaran · Tata Kelola Data · GEDSI & Partisipasi · Kepemimpinan Lokal → `/program/tema/<slug>/`. Singkatan (PFM, SPM, GEDSI) diberi `<abbr title>` dan didefinisikan di glosarium; deskripsi satu baris per tema = [PLACEHOLDER: konfirmasi klien].
- Tile = satu tautan utuh (satu `<a>`, tanpa tautan bersarang), tinggi seragam. Grid 3×2 desktop, 2×3 tablet, 1×6 mobile.
- *State:* default, hover, fokus-terlihat (cincin 3 px ≥ 3:1), aktif/ditekan, reduced-motion.

### 4.5 Terbaru — Kabar & Pusat Pengetahuan
```
Terbaru                                        [Lihat semua kabar] [Lihat Pusat Pengetahuan]
┌ (foto 16:9)       ┐ ┌ (foto)             ┐ ┌ (foto)              ┐
│ CERITA            │ │ KEGIATAN           │ │ RINGKASAN KEBIJAKAN │  ← label jenis
│ Judul (h3, tautan)│ │ Judul              │ │ Judul               │
│ [PFM] [NTT]       │ │ [SPM] [Papua]      │ │ [Data] [Nasional]   │  ← tag tema + provinsi
│ 12 Nov 2026       │ │ ...                │ │ ...                 │
└───────────────────┘ └────────────────────┘ └─────────────────────┘
```
- 3 entri terbaru lintas jenis. Pemetaan label: `cerita` → **Cerita**, `kegiatan` → **Kegiatan**, publikasi `jenis=ringkasan` → **Ringkasan Kebijakan** (label ini belum ada di sitemap, perlu konfirmasi istilah, Q4). Strategi: satu entri tiap jenis bila tersedia, kalau tidak, 3 terbaru.
- Kartu = satu tautan utama (di judul, area klik membentang). Tag = teks biasa pada Beranda (bukan tautan) agar tidak ada tautan bersarang. Label jenis ditulis **teks**, bukan hanya warna.
- *State:* normal, tanpa gambar (placeholder pola kontur), CMS gagal (section disembunyikan, tidak merusak halaman), judul panjang (clamp 3 baris), hanya ID/EN tersedia (tampilkan pasangan bahasa saja, bukan fallback bahasa lain).

### 4.6 Pull-quote pejabat daerah
```
┌──────────────────────────────────────────────────────┐
│ (foto bulat)  “Kutipan satu sampai tiga kalimat…”     │
│               — Nama, Jabatan, Pemda/Provinsi         │
│               [Lihat testimoni lainnya →]             │
└──────────────────────────────────────────────────────┘
```
- `<figure><blockquote><p>…</p></blockquote><figcaption>…</figcaption></figure>`. Foto alt = "Nama, jabatan". Kutipan bahasa asli dengan `lang` benar; terjemahan EN dari klien, diberi catatan "diterjemahkan" bila bukan ucapan asli. **Wajib izin tertulis pejabat** (kutipan dan foto). Satu kutipan statis (tanpa slider). Tautan → `/dampak/testimoni/`.

### 4.7 Capaian kami (feature flag `home.achievements`)
```
Capaian kami                                  [Lihat semua capaian →] → /dampak/capaian/
┌ EOPO 1 ─────────┐ ┌ EOPO 2 ─────────┐ ┌ EOPO 3 ─────────┐
│ {angka}         │ │ {angka}         │ │ {angka}         │
│ {indikator}     │ │ {indikator}     │ │ {indikator}     │
│ Sumber, per {tgl}│ │                 │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```
- Satu angka + indikator + sumber + tanggal data per EOPO. **Semua [PLACEHOLDER: data dari klien]**. Produksi: seluruh section tidak dirender bila data belum berstatus `approved`. Staging: lencana "PLACEHOLDER" merah di setiap kartu.
- Count-up sama dengan §4.2.

### 4.8 Mau ke mana? — 5 jalur pengguna
```
Mau ke mana?
[Pemerintah Daerah →] [Pemerintah Pusat →] [Mitra Pembangunan →] [Peneliti & CSO →] [Peluang Karir & Magang →]
```
| Kartu | Teks bantu (1 baris, [PLACEHOLDER copy]) | Tujuan (usulan, Q4) |
| --- | --- | --- |
| Pemerintah Daerah | Peta jalan layanan dasar untuk daerah Anda | `/komunitas-mitra/pemerintah/` |
| Pemerintah Pusat | Bagaimana kebijakan menjadi layanan di daerah | `/program/penguatan-tata-kelola/` |
| Mitra Pembangunan | Kemitraan, tata kelola, dan hasil | `/tentang-kami/kemitraan/` |
| Peneliti & CSO | Publikasi, data, dan jaringan | `/pengetahuan/` |
| Peluang Karir & Magang | Bergabung dengan kami | `/peluang/` |
- Grid 5 kolom ≥1280 px, 3+2 tablet, 1 kolom mobile. Satu tautan per kartu, panah sebagai ikon dekoratif.

### 4.9 Logo mitra
- Baris logo: Kemenkeu, Kemendagri, Bappenas, Australian Government (+ DT Global sebagai pengelola bila diizinkan). Tinggi seragam, area aman sesuai pedoman klien, `alt` = nama lembaga. Berformat SVG (bila disediakan), grayscale **tidak** dipakai kecuali pedoman mengizinkan (logo resmi dilarang diubah warnanya).
- Aset tersedia saat ini hanya Logo Kemenkeu (`.webp`) dan 2 varian logo SKALA (`.png`). Tiga logo lain **diminta ke klien**.

### 4.10 Newsletter + band CTA kontur (penutup)
```
[ Newsletter ]  Kabar SKALA langsung ke surel Anda   [ Surel ____ ] [Berlangganan]   (+ kebijakan privasi)
══════════ latar navy, garis kontur pulau (SVG) ══════════
        **Temukan apa yang kami pelajari.**
   [Jelajahi Pusat Pengetahuan]   [Ikuti Kanal WhatsApp]
```
- **Tanpa donasi.** Dua CTA: "Jelajahi Pusat Pengetahuan" (→ `/pengetahuan/`, tombol utama, solid) dan "Ikuti Kanal WhatsApp" (→ URL kanal [PLACEHOLDER], tombol sekunder, outline; membuka tab baru dengan `rel="noopener"` dan teks "(membuka WhatsApp)").
- Motif: garis kontur pulau (Sumatra–Papua) sebagai SVG repeating, opasitas rendah, tidak membawa informasi (dekoratif, `aria-hidden`).
- Form newsletter: label terlihat, `type=email` + `autocomplete=email`, validasi inline, pesan sukses/gagal lewat `role="status"`, persetujuan privasi dengan tautan. Penyedia dan endpoint = **[PLACEHOLDER: keputusan klien]**. Sampai itu ada, builder memakai handler mock di balik antarmuka yang sama.

---

## 5. Spesifikasi motion

### 5.1 Token (tunggal, di `tokens.ts` / `tailwind.config.ts`)
| Token | Nilai |
| --- | --- |
| `--dur-fast` | 160 ms |
| `--dur-base` | 240 ms |
| `--dur-slow` | 400 ms |
| `--dur-reveal` | 600 ms |
| `--dur-count` | 1200 ms |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Pergeseran reveal | `translateY(16px → 0)` |
| Ambang reveal | elemen terlihat ≥ 25 % (IntersectionObserver), **sekali saja** |

**Aturan umum:** hanya `transform` dan `opacity` yang dianimasikan (tanpa layout shift). Tidak ada animasi berulang/looping. Tidak ada gerak yang berjalan > 5 dtk tanpa kontrol pengguna. Mode reduced-motion diterapkan di satu tempat (hook `useMotionOk()` + media query CSS), bukan per komponen. Tanpa JS, semua konten tetap terlihat (kelas `no-js` menonaktifkan `opacity:0` awal).

### 5.2 Tabel per section
| Section | Trigger | Gerak | Durasi / easing | Reduced-motion |
| --- | --- | --- | --- | --- |
| Hero Stage A (pembuka) | Muat halaman (setelah font siap atau maks. 300 ms) | 5 potongan kalimat muncul bertahap (fade + naik 16 px). Potongan pertama **terlihat sejak render pertama** agar LCP tidak tertunda. Implementasi **CSS keyframes**, bukan GSAP | Tiap potongan 400 ms `ease-out`, jeda antar 150 ms; **total ≤ 1,5 dtk** termasuk isyarat "gulir" di 1,1–1,5 dtk; lalu **diam** | Semua teks langsung terlihat, tanpa gerak |
| Hero Stage B (zoom) | Scroll, scrub (`scrub: 0.5`), pin 300 svh desktop | Potongan lain meredup ke 25 %; "layanan dasar" membesar 1→ ±8× lalu cross-fade ke navy | Linear mengikuti scroll, per elemen `ease-inout` | Tidak ada pin/zoom (state `static`) |
| Hero Stage C (peta) | Lanjutan scroll 60–100 % | Kamera 3D turun dari tampak atas ke sudut miring 35° (dolly ±12 %); 12 pin muncul berurutan (scale 0.6→1 + fade, jeda 40 ms) | Scrub; pin 240 ms `ease-out` | Peta poster + pin langsung tampil |
| Angka kunci | Masuk viewport 40 % | Count-up 0 → nilai (hanya angka, bukan teks), kartu fade-up | 1200 ms `ease-out`, **sekali** | Nilai final langsung |
| Kartu fakta | Masuk viewport 25 % | Fade-up berurutan | 400 ms, jeda 80 ms | Tanpa gerak |
| Pilar (split) | Masuk viewport 25 % | Gambar: `clip-path` terbuka dari sisi teks; teks fade-up | Gambar 600 ms `ease-out`; teks 400 ms jeda 80 ms | Langsung tampil |
| Tile tema | Hover / `:focus-visible` | Naik `translateY(-4px)` + miring perspektif ≤ 2,5° mengikuti pointer, bayangan menebal | 240 ms `ease-out`, kembali 160 ms | Tidak ada gerak, hanya perubahan warna latar/bayangan/cincin fokus. Layar sentuh (`pointer: coarse`): tanpa tilt |
| Kartu terbaru | Hover/fokus | Gambar zoom 1→1.03, judul garis bawah | 240 ms | Hanya garis bawah |
| Kartu "Mau ke mana?" | Hover/fokus | Panah bergeser 4 px | 160 ms | Tanpa gerak |
| Band CTA kontur | Masuk viewport 25 % | Garis kontur tergambar (`stroke-dashoffset`) sekali | 1200 ms `ease-inout` | Garis tampil statis penuh |
| Pin / popover | Fokus, hover, tap | Popover fade + naik 8 px | 160 ms | Tanpa gerak |

**Anggaran gerak:** maks. 3 animasi simultan di viewport; `will-change` hanya di elemen hero, dicabut setelah selesai.

---

## 6. Spesifikasi hero 3D

### 6.1 Teknologi
- **three.js + React Three Fiber**, tanpa drei/postprocessing/HDR. Dimuat lewat `dynamic import` di chunk terpisah (`hero-3d`), tidak ikut bundle awal.
- **Geometri:** batas provinsi Indonesia disederhanakan (mapshaper, toleransi diatur agar ≤ 60 KB GeoJSON) lalu *dipanggang saat build* menjadi satu `.glb` ter-kompres (meshopt/Draco), prisma ekstrusi rendah (≈ 0,4 unit), ≤ 30 rb segitiga.
- **Material:** satu material unlit/matte navy dengan tepi provinsi halus (garis), satu cahaya terarah. Tanpa bayangan dinamis, tanpa tekstur lebih dari satu (peta normal dilarang).
- **Pin:** koordinat lintang-bujur 12 provinsi di `provinces.json`; posisi layar dihitung dari kamera setiap frame render dan diterapkan ke tombol HTML (D5). Poster statis memakai proyeksi yang sama sehingga posisi pin cocok.
- **Render:** `frameloop="demand"` (render hanya saat scroll/hover/kamera berubah), DPR dibatasi 1,5, canvas dijeda saat di luar viewport (`IntersectionObserver`), `webglcontextlost` → ganti ke poster.
- **Data sumber:** batas resmi dari Badan Informasi Geospasial (BIG) atau Natural Earth (domain publik) **dengan nama provinsi mutakhir** (pemekaran Papua 2022). Cek ke klien apakah ada ketentuan peta resmi (mis. UU 4/2011 tentang Informasi Geospasial) dan tampilan batas negara/wilayah sengketa.

### 6.2 Batas ukuran aset (HARD LIMIT: total transfer chunk 3D < 1 MB; target 600 KB)
| Aset | Target | Batas keras |
| --- | --- | --- |
| JS chunk `hero-3d` (three tree-shaken + r3f + scene), gzip | 170 KB | 250 KB |
| `.glb` peta (meshopt) | 200 KB | 300 KB |
| Poster AVIF (1600 w) | 50 KB | 80 KB |
| Poster WebP cadangan (1600 w) / (800 w) | 90 KB / 40 KB | 120 KB / 60 KB |
| Total chunk 3D + glb + poster | ≤ 600 KB | **< 1 MB** |
Budget diperiksa otomatis di CI (skrip `check-budget`); build gagal bila terlampaui.

### 6.3 Pemuatan dan gerbang kapabilitas
1. LCP = h1 (HTML). Latar awal = CSS gradient navy (tanpa gambar).
2. Setelah `load` + `requestIdleCallback` (atau saat hero 1 viewport dari terlihat), jalankan **capability check**: WebGL2 ada, `deviceMemory ≥ 4` (bila tersedia), `hardwareConcurrency ≥ 4`, bukan `saveData`, `effectiveType` bukan `2g/3g`, bukan reduced-motion, viewport ≥ 1024 (3D penuh); sebaliknya → `lite`.
3. Lolos → impor chunk `hero-3d` + `.glb`. Gagal/timeout 8 dtk/error → `lite` (poster) tanpa pesan error ke pengguna.
4. Prefetch **tidak** dilakukan pada koneksi lambat.
5. Mobile: 3D penuh tidak default. Mobile mampu (memenuhi gerbang) boleh memakai scene yang sama dengan DPR 1 dan tanpa pin; selain itu poster. (Keputusan diverifikasi lewat pengukuran di B-026.)

### 6.4 Fallback
- **Poster statis** peta (render dari scene yang sama) AVIF/WebP, `width/height` tetap (tanpa CLS), `alt` = ringkasan ("Peta Indonesia dengan 12 provinsi wilayah kerja SKALA") dan daftar provinsi sebagai alternatif teks lengkap.
- Dipakai untuk: perangkat lemah, tanpa WebGL, reduced-motion, tanpa JS, error/timeout, dan sebagai gambar OG.

### 6.5 Pencadangan bila 3D melewati budget
Rute B: video pra-render (WebM/MP4, ≤ 800 KB, tanpa suara, dikendalikan scroll lewat `currentTime`) + pin HTML. Hanya dipakai bila pengukuran B-026 menunjukkan 3D real-time tidak lolos. **Ini keputusan eskalasi ke planner**, bukan pilihan builder.

---

## 7. Aksesibilitas (WCAG 2.2 AA) dan performa

### 7.1 Risiko aksesibilitas
| # | Risiko | Kriteria | Mitigasi |
| --- | --- | --- | --- |
| A1 | Pin scroll membingungkan pengguna keyboard/AT, fokus tersembunyi di balik stage | 2.4.7, 2.4.11, 2.1.1 | Scroll native (tanpa wheel-hijack); `scroll-padding`; fokus pada pin memajukan scroll ke akhir; tautan "Lewati hero"; uji tab melalui seluruh hero |
| A2 | Teks hero muncul bertahap → pembaca layar membaca potongan atau tidak sama sekali | 1.3.1, 4.1.3 | h1 utuh di DOM, potongan hanya `span` visual (tanpa `aria-live`), tidak ada teks yang disembunyikan dari AT |
| A3 | Gerak: zoom besar dapat memicu pusing/vestibular | 2.3.3 (AAA, tetap diterapkan), 2.2.2 | Hormati `prefers-reduced-motion`, gerak hanya dari scroll, tidak ada looping, pembuka ≤ 1,5 dtk |
| A4 | Peta 3D tidak dapat dibaca AT / hanya warna membedakan pin | 1.1.1, 1.4.1, 1.3.1 | Canvas `aria-hidden`; pin tombol HTML bernama, bentuk + warna berbeda; daftar 12 provinsi tekstual |
| A5 | Kontras: teal `#00A9A3` di atas putih = 2,9:1; teks kecil di atas foto/kontur | 1.4.3, 1.4.11 | Teal hanya untuk elemen grafis/di atas navy; teks di putih pakai navy/teal gelap; overlay gradien di atas foto; semua pasangan warna dicek di `tokens.ts` (tes otomatis) |
| A6 | Target kecil (pin 12 provinsi saling berdekatan di Jawa/Nusa Tenggara) | 2.5.8 | Area sentuh 44 px, jarak ≥ 8 px antar pusat; beri offset label atau gunakan daftar bila tumpang tindih |
| A7 | Seret/putar peta jadi satu-satunya cara | 2.5.7 | Tidak ada drag; semua via scroll/klik |
| A8 | Count-up dibaca berulang oleh pembaca layar | 1.3.1, 4.1.3 | Nilai final di teks DOM (sr-only); angka animasi `aria-hidden` |
| A9 | Tile/kartu dengan tautan bersarang atau tautan "Selengkapnya" generik | 2.4.4, 4.1.2 | Satu tautan per kartu dengan teks unik |
| A10 | Teks EN pada halaman ID (atau sebaliknya) tanpa `lang` | 3.1.2 | `lang` pada kutipan/nama bahasa asing |
| A11 | Form newsletter: label, error, status sukses | 3.3.1, 3.3.2, 4.1.3 | Label terlihat, error inline, `role="status"` |
| A12 | Reflow 320 px, jarak teks | 1.4.10, 1.4.12 | Tanpa scroll horizontal; uji spacing override |
| A13 | Foto orang tanpa alt bermakna / persetujuan, penggambaran stereotipikal | 1.1.1 + etika GEDSI | Checklist alt text dan persetujuan; tinjauan konten GEDSI oleh klien |
| A14 | Menu drill-down: fokus hilang saat ganti level | 2.4.3 | Manajemen fokus eksplisit; tes keyboard & VoiceOver/NVDA |
Verifikasi: axe-core (Playwright) di tiap state, Lighthouse a11y ≥ 90 (CLAUDE.md), uji manual keyboard + VoiceOver (Safari) + NVDA (Firefox/Chrome).

### 7.2 Risiko performa (target LCP < 2,5 dtk di 4G, juga CLS < 0,1, INP < 200 ms)
| # | Risiko | Mitigasi |
| --- | --- | --- |
| P1 | 3D memblokir LCP / main thread | LCP = teks; chunk 3D dimuat setelah `load` + idle; `frameloop="demand"`; tanpa postprocessing |
| P2 | Teks hero di-zoom ber-`transform: scale` jadi buram/boros raster | Uji di Chrome/Safari/Firefox; cadangan: pakai SVG `<text>` + mask, atau cross-fade tanpa skala besar |
| P3 | Font web menunda teks | Self-host, subset Latin, variabel, `font-display: swap`, `preload` satu bobot, `size-adjust` untuk fallback |
| P4 | Foto split-screen besar | AVIF/WebP, `srcset`/`sizes`, `loading="lazy"` di bawah lipatan, dimensi tetap |
| P5 | GSAP + ScrollTrigger di bundle awal | Dimuat dinamis setelah LCP; reveal sederhana pakai CSS/IO |
| P6 | Skrip pihak ketiga (GA4, newsletter) | Dimuat idle/setelah interaksi; tanpa banner yang menggeser layout |
| P7 | CMS lambat saat build/revalidasi | Data Beranda dengan timeout dan cache; section gagal-lunak |
| P8 | Layout shift dari pin-spacer/gambar/font | Tinggi section pasti (aspect-ratio, `svh`), pin-spacer dihitung sebelum paint |
| P9 | iOS Safari: bar alamat & pin | Tanpa pin di mobile (D1), gunakan `svh/dvh` |
**Anggaran halaman Beranda (gagal-build di Lighthouse CI):** JS awal ≤ 170 KB gz (tanpa chunk 3D), CSS ≤ 50 KB gz, total transfer awal sampai LCP ≤ 500 KB, chunk 3D < 1 MB, LCP < 2,5 dtk pada profil "Slow 4G, CPU 4× slowdown".

---

## 8. Kebutuhan konten dari klien

| # | Kebutuhan | Dipakai di | Format / syarat | Status |
| --- | --- | --- | --- | --- |
| C1 | Daftar final 12 provinsi + klasifikasi **utama vs tambahan** + nama resmi | Hero, `/wilayah/` | Tabel, nama sesuai pemekaran terbaru | Belum |
| C2 | Izin/sumber batas peta resmi (BIG atau lain) + ketentuan tampilan peta | Hero 3D | Berkas GeoJSON/SHP + pedoman | Belum |
| C3 | Nama, urutan, kalimat inti 3 pilar (EOPO) + tautan tujuan | §4.3 | Teks ID + EN | Belum |
| C4 | Foto lapangan ≥ 7 (3 pilar, 3 kartu, 1 testimoni) | §4.3, 4.5, 4.6 | Asli ≥ 2400 px sisi panjang, JPG/RAW, **formulir persetujuan** subjek, keterangan (siapa/di mana/kapan), kredit | Belum |
| C5 | Angka capaian per EOPO + indikator + sumber + tanggal data | §4.7 | Tabel, status `approved` | Belum |
| C6 | 1 testimoni pejabat daerah: kutipan, nama, jabatan, instansi, foto, izin tertulis | §4.6 | Teks ID + EN | Belum |
| C7 | 3 fakta layanan dasar bersumber (tahun + tautan sumber) | §4.2 | Teks ID + EN | Belum |
| C8 | Logo Kemendagri, Bappenas, Australian Government + pedoman co-branding | §4.0, 4.9 | SVG vektor, area aman, aturan penempatan | Hanya Kemenkeu `.webp` |
| C9 | Logo SKALA vektor (SVG) + pedoman identitas (warna, font, tipografi) | Seluruh situs | SVG, panduan | Hanya PNG |
| C10 | URL Kanal WhatsApp, akun sosial media, alamat, surel, telepon | Footer, CTA | Teks | Belum |
| C11 | Penyedia newsletter + kebijakan privasi/persetujuan | §4.10 | Keputusan + tautan | Belum |
| C12 | Akses WordPress lama (staging), ekspor sitemap XML, daftar plugin | Migrasi, §4.5 | Kredensial / berkas | Belum |
| C13 | Persetujuan terjemahan EN untuk pernyataan nilai hero dan frasa kunci | §4.1 | Teks | Belum |
| C14 | Syarat hosting/residensi data dari RFT032 | ADR-001 | Dokumen | Belum |
| C15 | Persetujuan istilah "daerah tertinggal" di hero (istilah resmi tetapi dapat dinilai stigmatis) | §4.1 | Konfirmasi | Belum |

Aturan: konten yang belum tiba ditandai **[PLACEHOLDER: ...]** dan tampil dengan lencana di staging. Build produksi **gagal** bila masih ada string/ikon PLACEHOLDER di section yang bukan berstatus `flagged-off` (skrip `check-placeholders`).

---

## 9. Definisi selesai Beranda
- [ ] Semua section §4 sesuai wireframe, ID dan EN lengkap
- [ ] 360 px dan 1440 px benar, tanpa scroll horizontal (juga 320 px)
- [ ] axe tanpa pelanggaran serius; Lighthouse a11y ≥ 90; tes keyboard menyeluruh; uji VoiceOver & NVDA lulus
- [ ] LCP < 2,5 dtk (Slow 4G), CLS < 0,1, budget §7.2 dan §6.2 lolos di CI
- [ ] Reduced-motion: tanpa pin, tanpa animasi; konten lengkap
- [ ] Mode `lite` dan `static` diuji (matikan WebGL, matikan JS, `saveData`)
- [ ] Tidak ada PLACEHOLDER tak terdeteksi di produksi
- [ ] Metadata: title/description ID+EN, `hreflang`, OG (poster), JSON-LD `Organization`
- [ ] BACKLOG diperbarui

## 10. Task
Dipecah di `docs/tasks/BACKLOG.md` (B-021 s.d. B-037, H-021 s.d. H-027). Semua `[builder]` diblokir oleh P-001 (persetujuan ADR-001) dan persetujuan rencana ini.

## 11. Pertanyaan terbuka
Lihat ringkasan akhir (Q1–Q5). Jawaban akan dicatat di sini setelah diterima.
