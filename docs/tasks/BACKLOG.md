# BACKLOG — SKALA Website

Label: `[planner]` `[builder]` `[helper]`. Status: `[ ]` belum · `[~]` berjalan · `[x]` selesai · `[!]` diblokir.
Aturan: builder/helper yang menemukan keputusan desain/arsitektur yang belum ada di rencana **berhenti dan eskalasi ke planner** (CLAUDE.md §2).
Setiap task selesai: lint + type-check + tes relevan lolos, lalu centang di sini.

## Gerbang (harus lolos sebelum builder mulai)
- [ ] **G-1** User menyetujui `docs/decisions/001-stack.md` (P-001)
- [ ] **G-2** User menyetujui `docs/plans/beranda.md` dan menjawab Q1–Q5

## Planner
- [~] **P-001** [planner] Keputusan stack → `docs/decisions/001-stack.md` — **ditulis, menunggu persetujuan (G-1)**
- [x] **P-020** [planner] Rencana Beranda → `docs/plans/beranda.md` — **draft selesai, menunggu G-2** (menggantikan placeholder P-020)
- [~] **P-021** [planner] Arah desain Davaris × identitas SKALA → `docs/02-design-direction.md` + prototipe `index.html` — **menunggu persetujuan user**. Menggantikan arah visual Farm Africa di `beranda.md` §3–§5; B-022 (token) dan B-027–B-035 perlu diselaraskan setelah disetujui.
- [ ] **H-028** [helper] Minta ke klien: logo mitra vektor (SVG), pustaka foto berizin, konfirmasi "hingga AUD 160 juta" dan "8 tahun", konfirmasi pengelompokan IO 1–9 per EOPO, typeface resmi (bila ada).
- [ ] **P-022** [planner] Rencana lanjutan: Layout shell rinci (header/menu/footer) bila builder menemukan celah di B-023
- [x] **P-023** [planner] Rencana Wilayah Kerja → `docs/plans/wilayah.md` — **disetujui user 2026-11-12**

## Wilayah Kerja — prototipe (rencana `docs/plans/wilayah.md`)
- [x] **B-040** [builder] Ekstrak peta 3D ke `assets/js/peta-3d.js` + `assets/css/peta-3d.css`, data `assets/data/provinsi.js` + `projectToMap`
- [x] **B-041** [builder] Section peta interaktif desktop di `index.html` (kamera zoom, panel daftar/detail, hover sinkron, ‹ ›, X / Lihat semua / Esc)
- [x] **B-042** [builder] Section mobile + tablet (peta kecil sticky, daftar dulu, bottom sheet; chip horizontal di tablet)
- [x] **B-043** [builder] `wilayah.html` (= `/wilayah/`): cari, filter pill, grid kartu, empty state
- [x] **B-044** [builder] `wilayah-provinsi.html?p=<slug>` (= `/wilayah/<slug>/`): hero + peta statis, statistik, tab, publikasi, meta, JSON-LD
- [x] **H-030** [helper] Catatan `docs/02-design-direction.md` §4n + BACKLOG
- [ ] **H-031** [helper] Minta ke klien: ringkasan 6 provinsi Papua, statistik, fokus program, kab/kota mitra, cerita, publikasi, foto per provinsi; konfirmasi koordinat pin dan label "Lokasi intervensi tambahan"
- [ ] **H-032** [helper] Minta ke klien: ID video YouTube tiap siniar (3 episode, isi `data-yt` di `index.html`), cover/thumbnail, deskripsi "Menerobos Batas" dan episode Regsosek; foto kegiatan/publikasi; tanggal kegiatan; publikasi tambahan (beranda situs hanya memuat 3)
- [x] **B-046** [builder] Foto pada seluruh section (hero, Tentang, Tujuan, EOPO, Kegiatan, Publikasi, Siniar, Suara mitra, panel provinsi) + `kredit-foto.html` — lihat §4r
- [ ] **H-035** [helper] Minta ke klien: URL akun media sosial resmi (Instagram, X, Facebook, LinkedIn, YouTube, TikTok) dan nomor telepon kantor untuk footer
- [ ] **H-034** [helper] Ganti DATA DUMMY statistik dan fokus program 12 provinsi (`assets/data/provinsi.js`, flag `dummy:true`) dengan data resmi klien sebelum tayang
- [ ] **H-033** [helper] Minta ke klien: izin tertulis memakai foto skala.or.id (termasuk potret 3 narasumber), foto dokumentasi SKALA asli (pendidikan, kesehatan, komunitas di Papua/NTT) untuk mengganti foto arsip DFAT/USAID dan foto lanskap di hero, video hero, foto 6 provinsi yang belum punya foto
- [!] **B-045** [builder] Port ke Next.js (`src/app/[locale]/wilayah/…`, `generateStaticParams`, `generateMetadata`, JSON-LD di server, string EN) — *bergantung G-1 / B-021*

## Fondasi (dependensi: G-1)
- [!] **B-021** [builder] Scaffold proyek: Next.js (App Router) + TS strict + Tailwind v4 (`@config`) + next-intl + pnpm; ESLint/Prettier/commitlint; Vitest; Playwright + axe; Lighthouse CI dengan budget Beranda (§7.2, §6.2); struktur `src/` sesuai CLAUDE.md §5; catat versi terkunci di ADR-001. *Selesai bila:* `pnpm dev/build/lint/typecheck/test` hijau, halaman kosong ID dan `/en/` jalan.
- [!] **B-022** [builder] Token desain: `src/styles/tokens.ts` + `tailwind.config.ts` (warna navy/teal/oranye + varian teks AA, tipografi, spasi, token motion §5.1), tes kontras otomatis untuk semua pasangan teks/latar, hook `useMotionOk()`. *Bergantung:* pedoman identitas (C9) atau keputusan palet/font dari planner (Q5).
- [!] **B-023** [builder] Shell: skip link, header (menu desktop + drill-down mobile dengan "Kembali ke menu utama", pencarian, toggle ID/EN), bar mitra, footer lengkap (Aksesibilitas, Pengadaan, Privasi, sosial media). Rute dari satu berkas `pathnames` (sitemap §A). *Selesai bila:* tes keyboard Playwright lulus, 360/1440 px.
- [!] **B-024** [builder] Struktur i18n Beranda: `messages/id.json`, `en.json` (`home.*`), `provinces.json`, larangan string hard-coded (lint rule/tes), format angka via `Intl`. *Bergantung:* H-022.
- [!] **B-025** [builder] Primitif: `Section`, `Container`, `Reveal` (IntersectionObserver, sekali), `Button`/`LinkButton`, `Label`/`Tag`, `Card`, `Placeholder` (lencana staging) + skrip `check-placeholders`.

## Hero (dependensi: B-021, B-022, B-024, B-025; C1, C2)
- [!] **B-026** [builder] **Spike 3D + pengukuran:** pipa data (GeoJSON → mapshaper → `.glb` meshopt), scene R3F minimal, poster AVIF/WebP dari scene yang sama, skrip `check-budget`. Ukur di perangkat/throttle nyata (Slow 4G, CPU 4×). Laporkan angka vs §6.2. **Jika gagal budget → eskalasi ke planner (Rute B §6.5), jangan memilih sendiri.**
- [!] **B-027** [builder] Hero teks: h1 utuh, pembuka CSS ≤ 1,5 dtk, pin scroll GSAP (desktop), zoom "layanan dasar", state `static`/`mobile`, "Lewati hero", fokus-memajukan-scroll. *Bergantung:* B-026 (uji P2 skala teks).
- [!] **B-028** [builder] Hero peta: `HeroMapStage` (3D + poster), `ProvincePin` ×12 (tombol HTML, bentuk berbeda), `ProvincePopover`, `ProvinceList`, gerbang kapabilitas §6.3, penanganan `webglcontextlost`, mode `lite`. *Selesai bila:* axe bersih di 4 state hero, pin dapat di-Tab, budget lolos.

## Section Beranda (dependensi: B-025, B-024)
- [!] **B-029** [builder] Angka kunci (count-up sekali, final di DOM) + 3 kartu "Tahukah Anda?" (fixture DUMMY).
- [!] **B-030** [builder] Tiga pilar split-screen bergantian (clip-path reveal, mobile tumpuk), gambar responsif AVIF/WebP.
- [!] **B-031** [builder] Grid 6 tile tema + 6 ikon SVG sprite; hover naik 4 px + tilt ≤ 2,5° (nonaktif untuk `pointer: coarse` dan reduced-motion).
- [!] **B-032** [builder] Antarmuka data konten (`getLatestContent`, `getTestimonial`) dengan adapter fixture + adapter WPGraphQL; section Terbaru (3 kartu, label jenis + tag) dan pull-quote; gagal-lunak bila CMS error.
- [!] **B-033** [builder] Blok "Capaian kami" di balik feature flag `home.achievements`, lencana PLACEHOLDER di staging, disembunyikan di produksi tanpa data `approved`.
- [!] **B-034** [builder] "Mau ke mana?" 5 kartu jalur pengguna.
- [!] **B-035** [builder] Bar logo mitra, form newsletter (adapter mock + validasi + `role=status`), band CTA kontur (SVG, draw-on sekali) dengan 2 CTA tanpa donasi.
- [!] **B-036** [builder] Rakit Beranda sesuai urutan §3; metadata ID/EN, `hreflang`, OG, JSON-LD `Organization`; redirect 301 untuk `/` terkait tabel sitemap §E (bila relevan).
- [!] **B-037** [builder] QA Beranda: axe + Lighthouse (a11y ≥ 90, budget), Playwright (keyboard, reduced-motion, tanpa JS, `lite`), 320/360/1440 px, uji manual VoiceOver/NVDA; laporan di `docs/plans/beranda.md` §9.

## Helper (dapat jalan paralel; tidak menunggu G-1 kecuali disebut)
- [ ] **H-021** [helper] Pindahkan `sitemap.md` → `docs/01-sitemap.md` (CLAUDE.md merujuk path ini) dan perbarui §C baris Beranda: hapus "peta mini wilayah" sebagai section terpisah (digabung ke hero, keputusan D4). *Menunggu jawaban Q2.*
- [ ] **H-022** [helper] Tulis draf string `home.*` ID + EN sesuai wireframe (kunci i18n, tanpa angka capaian); tandai [PLACEHOLDER] bagian dari klien; EN butuh tinjauan klien (C13, C15).
- [ ] **H-023** [helper] Ubah §8 `beranda.md` menjadi daftar permintaan konten siap kirim ke klien (surel/lembar): C1–C15 dengan contoh format dan tenggat usulan.
- [ ] **H-024** [helper] Optimasi aset logo yang ada (`Logo-Skala-Kemenkeu.webp`, 2 PNG SKALA): buat SVG bila vektor tersedia, kalau tidak catat resolusi; letakkan di `public/brand/` setelah B-021.
- [ ] **H-025** [helper] Fixture DUMMY bertanda jelas: 3 kartu terbaru, 1 testimoni, 3 fakta (tidak boleh lolos ke produksi). *Setelah B-032 mendefinisikan skema.*
- [ ] **H-026** [helper] Draf alt text dan keterangan foto tiap foto yang diterima dari klien (C4), dengan daftar periksa persetujuan subjek.
- [ ] **H-027** [helper] Perbarui BACKLOG setiap task selesai; buat `docs/00-brief.md`, `02-design-direction.md`, `03-workflow.md` sebagai stub bila user menyediakan isinya.

## Catatan
- ID `P-020`, `B-021`, `B-022` pada permintaan awal diganti oleh rincian di atas (P-020 = rencana ini; B-021/B-022 = scaffold dan token).
- Urutan jalur kritis: G-1 → B-021 → B-022/B-024/B-025 → B-026 (spike, menentukan Rute A/B) → B-027/B-028; section lain paralel setelah B-025.
