# CLAUDE.md — SKALA Website (Company Profile + Pusat Pengetahuan)

File ini dibaca Claude di awal setiap sesi. Isinya aturan main proyek: konteks, cara kerja, pembagian model, dan konvensi kode.

## 1. Konteks proyek

- **Klien:** SKALA (Sinergi dan Kolaborasi untuk Akselerasi Layanan Dasar), program kemitraan Australia–Indonesia (DFAT) bersama Kemendagri, Kemenkeu, dan Bappenas. Dikelola DT Global.
- **Tender:** RFT032 (SKALA-JK/032/RFT/2026). Isinya redesign, redevelopment, hosting, dan maintenance website skala.or.id.
- **Tujuan:** company profile dwibahasa (ID/EN) yang profesional, sekaligus pusat pengetahuan (repositori publikasi dengan pencarian).
- **Pengguna:** pejabat pemda dan pusat, DFAT/mitra pembangunan, peneliti, CSO/kelompok GEDSI, media, serta Gen Z/milenial (pencari kerja, magang, publik).
- Detail lengkap ada di `docs/`. **Baca dokumen yang relevan sebelum bekerja**:
  - `docs/00-brief.md`: brief, pengguna, syarat RFT
  - `docs/01-sitemap.md`: sitemap, isi halaman, pemetaan URL (sumber kebenaran struktur)
  - `docs/02-design-direction.md`: warna, tipografi, motion, 3D, referensi
  - `docs/03-workflow.md`: alur kerja per fase
  - `docs/tasks/BACKLOG.md`: daftar task dan siapa yang mengerjakan

## 2. Pembagian model (wajib diikuti)

| Jenis pekerjaan | Agent | Model | Effort | Contoh |
| --- | --- | --- | --- | --- |
| Berpikir/menentukan ide baru: konsep, arsitektur, IA, rencana, keputusan teknis, review besar | `planner` | Opus 5.5 | high | Menentukan struktur komponen, memilih CMS, merancang alur Pusat Pengetahuan, membuat rencana fitur |
| Mengerjakan task implementasi | `builder` | Sonnet 5.5 | high | Membuat halaman, komponen, integrasi CMS, pencarian/filter, animasi, peta 3D |
| Task simple dan mudah | `helper` | Sonnet 5.5 | medium | Ganti teks/copy, isi konten dummy, rapikan styling kecil, tambah redirect, update BACKLOG |

**Aturan routing:**

1. Task baru yang belum jelas bentuknya → kirim dulu ke `planner`. Hasilnya berupa rencana di `docs/plans/<nama-fitur>.md`.
2. Rencana yang sudah disetujui user → dipecah menjadi task di `BACKLOG.md`, masing-masing diberi label `[builder]` atau `[helper]`.
3. Task berlabel `[builder]` → `builder`. Task berlabel `[helper]` → `helper`.
4. Kalau `builder` atau `helper` menemukan keputusan desain/arsitektur yang belum ada di rencana, **berhenti dan eskalasi ke `planner`**. Jangan menebak.
5. Ragu antara `builder` dan `helper`? Pilih `builder`.

Cara memanggil di Claude Code: minta "pakai agent planner/builder/helper", atau ketik `@planner`, `@builder`, `@helper`. Definisi agent ada di `.claude/agents/`.

## 3. Stack (usulan default, dikonfirmasi `planner` di Fase 1)

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **CMS:** headless. WordPress lama tetap jadi backend via WPGraphQL supaya migrasi konten aman, atau alternatif yang diputuskan di `docs/decisions/`.
- **i18n:** ID di `/`, EN di `/en/`. Setiap konten punya pasangan bahasa.
- **Pencarian:** indeks dengan filter tema, provinsi, jenis, tahun, dan bahasa (mis. Meilisearch/Algolia), siap dikembangkan ke fitur AI.
- **Motion/3D:** GSAP + ScrollTrigger, React Three Fiber atau Spline (hanya hero dan peta), Lottie/Rive untuk ikon.
- **Analytics:** GA4 dengan event untuk pencarian, filter, dan unduhan.

## 4. Aturan wajib (non-negotiable)

- **Aksesibilitas WCAG 2.2 AA:** kontras teks ≥ 4.5:1, navigasi keyboard, fokus terlihat, alt text wajib, label form, `prefers-reduced-motion` dihormati.
- **Performa:** LCP < 2,5 dtk di 4G, muatan 3D < 1 MB dan di-lazy-load, fallback gambar statis untuk perangkat lemah.
- **Dwibahasa:** tidak ada teks hard-coded. Semua string lewat file terjemahan/CMS.
- **SEO dan migrasi:** setiap URL lama wajib punya redirect 301 sesuai tabel di `docs/01-sitemap.md`.
- **Co-branding:** logo Kemenkeu, Kemendagri, Bappenas, dan Australian Government tampil di header/footer sesuai aturan klien.
- **Teal `#00A9A3` tidak dipakai untuk teks di atas putih** (kontras 2,9:1). Gunakan navy atau teal gelap.

## 5. Konvensi kode

- Komponen di `src/components/<Kategori>/<NamaKomponen>.tsx`, satu komponen per file.
- Halaman mengikuti sitemap: `src/app/[locale]/<slug>/page.tsx`.
- Token desain (warna, font, spacing, durasi motion) hanya di `src/styles/tokens.ts` dan `tailwind.config.ts`.
- Nama file kebab-case, komponen PascalCase, commit pakai Conventional Commits (`feat:`, `fix:`, `chore:`).
- Setiap task selesai: jalankan lint, type-check, dan tes yang relevan, lalu centang di `BACKLOG.md`.

## 6. Definisi selesai (Definition of Done)

Sebuah task dianggap selesai bila:
- [ ] Sesuai sitemap dan isi halaman di `docs/01-sitemap.md`
- [ ] Tampil benar di mobile (360 px) dan desktop (1440 px)
- [ ] Lolos cek aksesibilitas (axe/Lighthouse ≥ 90) dan bekerja dengan keyboard
- [ ] Versi ID dan EN tersedia
- [ ] Motion mati saat `prefers-reduced-motion: reduce`
- [ ] Lint dan type-check bersih, BACKLOG diperbarui
