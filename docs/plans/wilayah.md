# Rencana: Peta Wilayah Kerja (P-023)

- **Status:** DISETUJUI user (2026-11-12), semua poin §4. Prototipe selesai, lihat BACKLOG B-040–B-044 dan `docs/02-design-direction.md` §4n.
- **Tanggal:** 2026-11-12
- **Dasar:** brief "Implementasi Peta Wilayah Kerja SKALA" dari user, `sitemap.md` (rute `/wilayah/` dan `/wilayah/<provinsi>/`), CLAUDE.md §4.

## 1. Temuan di repo

| Hal | Temuan |
| --- | --- |
| Framework | **Belum ada.** Tidak ada `package.json`, `src/`, Next.js, Tailwind, lint, atau type-check. ADR-001 (Next.js) masih DIUSULKAN. Yang ada hanya prototipe HTML satu berkas: `index.html`. |
| Peta 3D yang ada | Section `#wilayah` di `index.html`. **SVG dengan efek 3D CSS**, bukan WebGL. Satu path Indonesia (Natural Earth, viewBox `0 0 1000 381`), 4 lapisan `<use>` dengan `translateZ` (ketebalan), bayangan, dan bidang `rotateX(--rx)`. Tilt di-scrub GSAP ScrollTrigger 64° → 38° (26° di < 768 px). |
| Posisi pin | Persen `x/y` terhadap viewBox (data `PROV`, 12 provinsi dari peta skala.or.id). Pin berupa `<a>` yang berdiri tegak (counter-rotate `-rx`). |
| Kamera / zoom | Tidak ada. Tidak ada orbit, drag, atau scroll-zoom. |
| Event | Hover dan fokus pada pin membuka kartu 3D (foto, status, sorotan, tautan). Esc menutup kartu. Pin dekoratif (`aria-hidden`) di < 768 px, dan `<details>` daftar provinsi menjadi kontrolnya. |
| Proyeksi | Path Natural Earth hampir equirectangular. Kecocokan least-squares dengan 6 titik acuan: `x% = 2.078·lon − 193.97`, `y% = −5.677·lat + 37.17`, selisih ≤ 3,4 %. |

## 2. Pendekatan

Peta 3D yang ada **diekstrak menjadi satu modul yang dipakai ulang** di tiga tempat. Tidak ada peta baru dan tidak ada library baru (GSAP sudah ada, tetapi animasi kamera cukup dengan CSS transition).

**Kamera** adalah satu transform pada `.map`:

```
translate3d(tx, ty, tz) rotateX(rx)
```

- **Target titik:** tx/ty dihitung agar titik provinsi jatuh di tengah area bebas antara panel kiri dan panel kanan.
- **Pengukuran:** posisi diukur lewat `getBoundingClientRect()` pin, lalu dikoreksi satu kali. Cara ini akurat walaupun ada perspektif.
- **Zoom:** tz sebagai dolly, setara ±2,2×.
- **Ukuran pin:** pin di-counter-scale supaya ukurannya tetap.
- **Animasi:** transisi 750 ms, `cubic-bezier(.2,.7,.2,1)`. Saat `prefers-reduced-motion`, kamera langsung lompat ke posisi tujuan.
- **Hover:** hanya mengubah class pada pin. Scene tidak di-render ulang.

## 3. Berkas

| Berkas | Isi |
| --- | --- |
| `assets/data/provinsi.js` | Data 12 provinsi sesuai interface `Province` (JSDoc typedef, siap pindah ke CMS), `projectToMap(lat, lon)`, string UI terpusat. |
| `assets/js/peta-3d.js` | Komponen peta: `PetaWilayah.mount(el, {interactive, focus, onHover, onSelect})` → API `focus(slug)`, `reset()`, `highlight(slug)`. Path SVG disimpan di sini (`<use>` lintas berkas tidak jalan di `file://`). |
| `assets/css/peta-3d.css` | Gaya peta, pin, chip label, pulse. |
| `index.html` | Section `#wilayah` diganti dengan Tampilan 1 + 4: header, panel kiri, panel detail kanan, hint, bottom sheet mobile. Kartu hover lama dihapus. |
| `wilayah.html` | Tampilan 2: daftar, pencarian, filter pill, grid kartu, empty state. |
| `wilayah-provinsi.html?p=<slug>` | Tampilan 3: template profil. Peta yang sama dalam mode `interactive:false, focus:slug`. Ada tab, publikasi, nav bawah, meta, dan JSON-LD (disuntik JS). |
| `docs/02-design-direction.md` §4n, `docs/tasks/BACKLOG.md` | Catatan desain dan task. |

## 4. Keputusan yang perlu disetujui

1. **Platform.** Brief ditulis untuk Next.js (`generateMetadata`, lint/type-check/build), tetapi repo belum punya Next.js.
   - **Usulan:** bangun di prototipe HTML dulu (berkas di atas). Port ke Next.js setelah ADR-001 disetujui.
   - **Alternatif:** scaffold Next.js sekarang. Ini butuh ADR-001 disetujui dan instalasi paket.
2. **Rute.** Mengikuti `sitemap.md`: `/wilayah/` dan `/wilayah/<provinsi>/`, bukan `/wilayah-kerja`.
3. **Token.** Memakai token proyek yang sudah ada, bukan palet gelap dari brief:

   | Nilai di brief | Token proyek |
   | --- | --- |
   | `#0D1829` | `--ink #0B1F38` |
   | `#2DD4BF` | `--teal` / `--teal-light` |
   | Chip utama | `#CCF2EC` / `--teal-text #00756F` |

   Ukuran font tetap memakai skala 4–80 dan warna teks #111111 / #444444.
4. **Data.**
   - Repo sudah memuat 12 provinsi dari skala.or.id, termasuk Maluku dan 6 Papua. Brief hanya menyebut 6.
   - Label kategori di skala.or.id adalah "Lokasi intervensi tambahan", sedangkan brief memakai "[Kategori lokasi lainnya]".
   - Ringkasan Papua Selatan di brief adalah teks **dummy** yang dulu dibuat Claude. Usulan: tandai `[placeholder]`.
   - Stat, fokus, kabupaten mitra, cerita, dan publikasi semuanya `[placeholder]`.
5. **Arah visual.** Section kembali punya teks (eyebrow, judul, subjudul, panel, hint). Ini menggantikan permintaan "non wording" sebelumnya. Kartu hover 3D diganti chip nama + panel detail saat klik.
6. **Tablet (768–1023 px).** Daftar provinsi menjadi baris chip horizontal yang bisa digeser di atas peta, dan detail tampil sebagai bottom sheet. Alasan: panel kiri 272 px + panel kanan 380 px menyisakan terlalu sedikit ruang peta di bawah 1024 px.
7. **Dwibahasa.** String dipusatkan di satu objek `id`/`en`. Prototipe hanya merender ID, dan EN diisi saat port ke Next.js.

## 5. Verifikasi (pengganti lint/build selama belum ada toolchain)

- `node --check` untuk semua berkas JS.
- Playwright + axe di 360, 768, 1024, dan 1440 px. Yang diuji:
  - hover sinkron antara pin dan daftar,
  - klik → kamera fokus dengan titik provinsi di tengah area bebas (toleransi ±24 px),
  - prev/next, X, "Lihat semua", Esc,
  - fokus kembali ke tombol pemicu dan `aria-live`,
  - pencarian/filter di `/wilayah/`, tab ←/→, JSON-LD valid,
  - `prefers-reduced-motion`,
  - CLS 0 (tinggi container tetap) dan scroll halaman tidak tertangkap peta.
- Regresi section lain di Beranda tetap dijalankan.

## 6. Pecahan task (ID B-030–B-034 sudah dipakai di BACKLOG, jadi diganti B-040–B-044)

- B-040 [builder] Ekstrak peta 3D ke `peta-3d.js/.css` + `provinsi.js` + `projectToMap`
- B-041 [builder] Section peta interaktif desktop (kamera, panel kiri/kanan, sinkron hover)
- B-042 [builder] Mobile dan tablet (peta kecil, daftar dulu, bottom sheet)
- B-043 [builder] Halaman `wilayah.html` (cari, filter, grid)
- B-044 [builder] Template `wilayah-provinsi.html` (hero + peta statis, tab, publikasi, meta, JSON-LD)
- H-030 [helper] Catatan §4n dan pembaruan BACKLOG
