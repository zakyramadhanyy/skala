# ADR-001 — Keputusan stack (P-001)

- **Status:** DIUSULKAN — menunggu persetujuan user. Builder tidak boleh mulai (B-021 diblokir) sebelum status berubah menjadi DISETUJUI.
- **Tanggal:** 2026-11-11
- **Penulis:** planner
- **Dasar:** CLAUDE.md §3 (stack default) dan §4 (aturan wajib). `docs/00-brief.md` dan teks RFT032 belum ada di repo, jadi syarat hosting dan residensi data **belum diverifikasi** (lihat Risiko).

## Ringkasan rekomendasi

| Area | Rekomendasi | Status vs default CLAUDE.md |
| --- | --- | --- |
| Framework | Next.js (App Router, versi stabil terbaru saat scaffold) + TypeScript strict | Sama |
| Rendering | Statis + ISR dengan revalidasi on-demand dari webhook CMS. Tanpa SSR per-request kecuali `/cari/` | Dipertegas |
| Styling | Tailwind CSS v4, dengan `tailwind.config.ts` dimuat lewat `@config` agar konvensi CLAUDE.md §5 tetap berlaku | Sama (versi dipilih) |
| CMS | WordPress lama dipertahankan sebagai headless CMS via WPGraphQL | Sama |
| i18n | `next-intl`, ID tanpa prefix, EN di `/en/`, slug dipetakan per bahasa | Sama (library dipilih) |
| Pencarian | Meilisearch self-hosted, diumpan webhook CMS. Keputusan final ditunda ke rencana Pusat Pengetahuan | Tentatif |
| Motion | GSAP + ScrollTrigger (dimuat dinamis), animasi sederhana pakai CSS | Sama |
| 3D | three.js + React Three Fiber, **tanpa** drei/postprocessing, hanya di hero dan peta wilayah, lazy-load | Dipersempit |
| Ikon | SVG inline (sprite). Lottie/Rive **tidak** dipakai di Beranda | Dipersempit |
| Pengujian | Vitest, Playwright + axe-core, Lighthouse CI dengan budget | Baru |
| Paket | pnpm, Node LTS, ESLint + Prettier, Conventional Commits | Baru |
| Hosting | Build `standalone` dalam Docker di belakang CDN. Penyedia **menunggu jawaban klien** | Terbuka |

## Alasan per keputusan

### 1. Next.js + statis/ISR
- Konten berubah jarang (publikasi, kabar), jadi halaman statis memberi LCP terbaik di 4G dan hosting murah.
- ISR on-demand: editor menekan Publish di WordPress → webhook → revalidasi path terkait (ID dan EN).
- Alternatif ditolak: **Astro** (lebih ringan, tetapi hero 3D, pencarian, dan filter butuh banyak island React sehingga keuntungannya kecil, dan CLAUDE.md sudah mengarah ke Next); **SPA murni** (SEO dan LCP buruk).

### 2. WordPress headless (WPGraphQL) vs CMS baru
- Untuk: ratusan publikasi dan PDF di `/wp-content/uploads/` tetap utuh (syarat redirect dan SEO), tim klien sudah familiar, migrasi konten minimal risiko.
- Bahasa: Polylang + ekstensi WPGraphQL-nya (WPML jika klien sudah punya lisensi). Setiap entri wajib punya pasangan bahasa.
- Kerugian: dua sistem untuk dirawat (WP + Next). Diterima karena RFT mencakup hosting dan maintenance.
- Alternatif (Payload, Sanity, Strapi) lebih nyaman bagi developer tetapi menuntut migrasi penuh dan pelatihan ulang. Dipertimbangkan lagi hanya jika klien menolak mempertahankan WordPress.
- **Konten Beranda**: string statis (judul, kalimat pilar, label) ada di berkas terjemahan `messages/id.json` dan `en.json`. Konten dinamis (kabar/pengetahuan terbaru, testimoni, angka) diambil dari CMS lewat custom post type/ACF. Tahap awal boleh memakai fixture JSON berlabel DUMMY di balik antarmuka data yang sama.

### 3. i18n dengan next-intl
- `localePrefix: 'as-needed'` (ID di `/`, EN di `/en/`).
- Slug berbeda antar bahasa (`/tentang-kami/` vs `/en/about/`) dipetakan lewat `pathnames` di satu berkas rute. Tabel redirect 301 (sitemap §E) dihasilkan dari satu sumber data, diuji otomatis.
- `hreflang` dan `alternate` dibuat dari pemetaan yang sama.

### 4. Pencarian (tentatif)
- Meilisearch self-hosted: sumber terbuka, tanpa biaya per query, data tetap di server yang dikontrol. Facet tema/provinsi/jenis/tahun/bahasa didukung.
- Catatan: dukungan stemming bahasa Indonesia terbatas. Perlu uji kualitas relevansi dengan sampel nyata sebelum dikunci. Algolia jadi cadangan bila relevansi kurang atau klien tidak bisa mengelola server.
- Beranda hanya memerlukan kotak cari di header yang mengarah ke `/cari/`, sehingga keputusan ini tidak memblokir Beranda.

### 5. Motion dan 3D
- GSAP + ScrollTrigger dimuat dinamis (±45 KB gz) hanya untuk hero dan section yang memang scrubbed. Reveal sederhana memakai CSS + IntersectionObserver. Verifikasi syarat lisensi GSAP saat instalasi.
- three.js di-tree-shake, diimpor hanya dalam chunk hero. Tanpa HDR/environment map, tanpa postprocessing, tanpa drei. Alasannya: anggaran 3D < 1 MB (CLAUDE.md §4). Spline ditolak: runtime berat, kontrol aksesibilitas dan ukuran terbatas.
- Lottie/Rive tidak dipakai di Beranda: tambahan runtime ±50 KB gz tidak sebanding dengan 6 ikon.

### 6. Analytics dan privasi
- GA4 dengan event pencarian, filter, unduhan. Perlu keputusan **persetujuan cookie** (UU PDP 27/2022) bersama klien. Default usulan: GA4 baru aktif setelah persetujuan, tanpa banner mengganggu LCP (dimuat setelah idle).

## Konsekuensi
- Tim butuh dua environment: WordPress (CMS) dan Next.js (frontend), plus Meilisearch kelak.
- Semua token desain tetap di `src/styles/tokens.ts` dan `tailwind.config.ts` (CLAUDE.md §5).
- Budget performa Beranda dijadikan gagal-build lewat Lighthouse CI (lihat `docs/plans/beranda.md` §7).

## Risiko dan hal yang belum diverifikasi
1. **Hosting dan residensi data**: RFT mungkin mensyaratkan hosting di Indonesia atau penyedia tertentu. Belum dibaca. Rekomendasi Docker + CDN dipilih supaya netral terhadap penyedia.
2. **Akses ke WordPress lama**: perlu kredensial admin/staging, plugin yang terpasang, dan ekspor sitemap XML.
3. **Versi**: Next.js, Tailwind, next-intl, dan three.js bergerak cepat. Builder wajib mengunci versi stabil saat scaffold dan mencatatnya di sini.
4. **Lisensi pihak ketiga** (GSAP, font, data peta) belum dicek.

## Yang perlu disetujui user
- [ ] Next.js + statis/ISR + Tailwind v4
- [ ] WordPress headless (WPGraphQL + Polylang)
- [ ] next-intl dengan pemetaan slug
- [ ] Pencarian: Meilisearch (tentatif) — boleh ditunda
- [ ] Hosting: jawab pertanyaan di ringkasan (residensi data/penyedia)
