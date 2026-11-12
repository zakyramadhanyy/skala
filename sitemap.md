# 01 — Sitemap SKALA (sumber kebenaran struktur)

Bahasa: ID di `/`, EN di `/en/`. Semua halaman punya pasangan bahasa.

## A. Pohon sitemap baru (to-be)

```
/                                   Beranda
├── /tentang-kami/                  Tentang Kami
│   ├── /tentang-kami/kemitraan/        Kemitraan & tata kelola
│   ├── /tentang-kami/fase/             Fase & lini masa
│   └── /tentang-kami/tim/              Tim & kantor
├── /program/                       Program
│   ├── /program/penguatan-tata-kelola/ Siklus 8 langkah layanan dasar
│   ├── /program/tema/                  Tema kerja (indeks)
│   │   ├── /program/tema/pfm/
│   │   ├── /program/tema/spm/
│   │   ├── /program/tema/perencanaan-penganggaran/
│   │   ├── /program/tema/tata-kelola-data/
│   │   ├── /program/tema/gedsi-partisipasi/
│   │   └── /program/tema/kepemimpinan-lokal/
│   └── /program/sistem-data/           Sistem data pemerintah
├── /dampak/                        Dampak
│   ├── /dampak/capaian/                Capaian per EOPO
│   ├── /dampak/cerita/                 Cerita dari lapangan (+ /dampak/cerita/<slug>/)
│   └── /dampak/testimoni/              Testimoni mitra
├── /wilayah/                       Wilayah Kerja (peta interaktif)
│   └── /wilayah/<provinsi>/            12 profil provinsi
├── /komunitas-mitra/               Komunitas & Mitra
│   ├── /komunitas-mitra/pemerintah/
│   ├── /komunitas-mitra/cso/
│   └── /komunitas-mitra/riset/
├── /pengetahuan/                   Pusat Pengetahuan (pencarian + filter)
│   ├── /pengetahuan/?jenis=laporan|ringkasan|strategi|pembelajaran|infografis|newsletter
│   ├── /pengetahuan/<slug>/            Detail publikasi
│   └── /pengetahuan/glosarium/         Glosarium
├── /kabar/                         Kabar & Media
│   ├── /kabar/kegiatan/                (+ /kabar/kegiatan/<slug>/)
│   ├── /kabar/pengumuman/
│   ├── /kabar/siniar/                  (+ /kabar/siniar/<slug>/)
│   ├── /kabar/video/
│   └── /kabar/kit-media/
├── /peluang/                       Peluang
│   ├── /peluang/karir/
│   ├── /peluang/magang/
│   └── /peluang/pengadaan/             (+ /peluang/pengadaan/<slug>/)
└── Utilitas
    ├── /kontak/
    ├── /cari/                          Pencarian global
    ├── /kebijakan-privasi/
    ├── /aksesibilitas/                 Pernyataan aksesibilitas
    └── 404
```

Slug EN: `/en/about/`, `/en/programme/`, `/en/impact/`, `/en/where-we-work/`, `/en/community-partners/`, `/en/knowledge/`, `/en/news/`, `/en/opportunities/`, `/en/contact/`, dengan sub-halaman setara.

## B. Navigasi
- **Header:** logo SKALA · Tentang Kami · Program · Dampak · Wilayah Kerja · Pusat Pengetahuan · Kabar & Media · Peluang · [Cari] · [ID/EN]
- **Bar mitra:** logo Kemenkeu, Kemendagri, Bappenas, Australian Government
- **Footer:** ringkasan SKALA · Komunitas & Mitra · Kontak · alamat · email · Kanal WhatsApp · newsletter · kebijakan privasi · aksesibilitas · "Dikelola oleh DT Global" · © tahun berjalan

## C. Isi tiap halaman

| Halaman | Section dan komponen utama | Pengguna utama | Asal konten lama |
| --- | --- | --- | --- |
| Beranda | Hero 3D (peta Indonesia + pernyataan nilai + CTA) · angka kunci (count-up) · 3 pilar · jalur cepat per pengguna · peta mini wilayah · publikasi dan kabar terbaru · testimoni · logo mitra · langganan newsletter/WhatsApp | Semua | Beranda |
| Tentang Kami | Siapa kami, tujuan, masalah yang diselesaikan, video profil | Donor, publik, media | Tentang Kami |
| Kemitraan & tata kelola | Mitra AU–ID, Steering/Technical/Provincial Committee, pengelola | Pemerintah, donor | Tentang Kami |
| Fase & lini masa | Fase 1 dan 2, 3 periode RPJMN, tonggak penting (timeline) | Donor, pemerintah | Tentang Kami |
| Tim & kantor | Pimpinan program, kantor Jakarta dan provinsi | Mitra, media, pelamar | Baru |
| Penguatan tata kelola | Scrollytelling siklus 8 langkah: data terkonsolidasi → pemetaan penerima → perencanaan → penganggaran → pemberian layanan → peningkatan layanan → tindak lanjut → pemutakhiran data | Pemda, pusat | Penguatan Tata Kelola |
| Tema kerja (6) | Masalah · pendekatan · capaian · provinsi terkait · publikasi terkait | Pemda, pusat, peneliti | Strategi, konten tersebar |
| Sistem data | SIKOMPAK, SEPAKAT, SIKD, SIGAP, SAIK, SIOPAPUA, portal Satu Data daerah | Pemda, pusat | Section beranda |
| Capaian per EOPO | 3 EOPO, 9 IO, indikator, angka, tautan ke bukti | Donor, pusat | Kerangka hasil |
| Cerita dari lapangan | Daftar dengan filter tema/provinsi, detail cerita | Semua | Cerita dari Lapangan |
| Testimoni | Kutipan dan video pejabat daerah/pusat | Donor, publik | Section beranda |
| Wilayah Kerja | Peta interaktif 12 provinsi (utama vs tambahan) + fallback daftar | Semua | Peta beranda |
| Profil provinsi (12) | Konteks, OPD mitra, capaian, CSO lokal, kegiatan dan publikasi terkait | Pemda, donor | Profil Provinsi, Komunitas |
| Komunitas & Mitra | Mitra pemerintah, jaringan CSO (perempuan, disabilitas, masyarakat adat) per provinsi, mitra riset | CSO, peneliti | Komunitas |
| Pusat Pengetahuan | Pencarian + filter (tema, provinsi, jenis, tahun, bahasa), koleksi unggulan | Pemda, pusat, peneliti | Menu Publikasi |
| Detail publikasi | Ringkasan HTML, unduh PDF, metadata, publikasi terkait, bagikan/kutip | Semua | Detail publikasi |
| Glosarium | A–Z, juga tooltip di artikel | Publik, CSO | Glosarium |
| Kabar & Media | Kegiatan, pengumuman, siniar (dengan transkrip), video, kit media | Media, publik | Aktivitas |
| Peluang | Karir, magang, pengadaan dengan status (buka/tutup) dan tenggat | Gen Z/milenial, vendor | Peluang |
| Kontak | Form, alamat, peta, email, WhatsApp | Semua | Hubungi Kami |

## D. Sitemap website lama (as-is, 22 halaman per bahasa)

| Menu | Halaman | URL ID | URL EN |
| --- | --- | --- | --- |
| Beranda | Beranda | `/` | `/en/` |
| Beranda | Tentang Kami | `/tentang-skala/` | `/en/about/` |
| Beranda | Penguatan Tata Kelola | `/penguatan-tata-kelola/` | `/en/governance-strengthening/` |
| Beranda | Komunitas SKALA | `/komunitas/` | `/en/community/` |
| Beranda | Hubungi Kami | `/hubungi-kami/` | `/en/contact/` |
| Aktivitas | Informasi Kegiatan | `/informasi-kegiatan/` | `/en/activity-updates/` |
| Aktivitas | Pengumuman | `/pengumuman/` | `/en/announcement/` |
| Aktivitas | Siniar | `/siniar/` | `/en/podcast/` |
| Aktivitas | Video | `/video/` | `/en/videos/` |
| Publikasi | Cerita dari Lapangan | `/cerita-dari-lapangan/` | `/en/stories-from-the-field/` |
| Publikasi | Infografis | `/infografis/` | `/en/infographics/` |
| Publikasi | Laporan | `/laporan/` | `/en/reports/` |
| Publikasi | Newsletter | `/newsletter-id/` | `/en/newsletter/` |
| Publikasi | Pembelajaran | `/pembelajaran/` | `/en/lessons-learned/` |
| Publikasi | Profil Provinsi | `/profil-provinsi/` | `/en/provincial-profiles/` |
| Publikasi | Ringkasan | `/ringkasan-id/` | `/en/briefs/` |
| Publikasi | Strategi | `/strategi/` | `/en/strategies/` |
| Glosarium | Glosarium | `/glosarium/` | `/en/glossary/` |
| Peluang | Peluang | `/peluang/` | `/en/opportunities/` |
| Peluang | Karir | `/karir/` | `/en/vacancies/` |
| Peluang | Pengadaan | `/pengadaan/` | `/en/procurement/` |
| Peluang | Program Magang | `/program-magang/` | `/en/internship-program/` |

Pola halaman detail lama: `/informasi-kegiatan/<slug>/`, `/en/activity-information/<slug>/`, `/publikasi/<slug>/`, `/en/publications/<slug>/`, `/en/publications/provincial-profiles/<slug>/`, `/category/publikasi/<kategori>/`, `/siniar/<slug>/`, `/en/podcast-en/<slug>/`, `/en/opportunities/procurement-en/live-procurement-activity/<slug>/`, `/wp-content/uploads/<tahun>/<bulan>/<file>.pdf`.

## E. Pemetaan redirect 301 (lama → baru)

| Lama (ID) | Lama (EN) | Baru (ID) | Baru (EN) |
| --- | --- | --- | --- |
| `/tentang-skala/` | `/en/about/` | `/tentang-kami/` | `/en/about/` |
| `/penguatan-tata-kelola/` | `/en/governance-strengthening/` | `/program/penguatan-tata-kelola/` | `/en/programme/governance-strengthening/` |
| `/komunitas/` | `/en/community/` | `/komunitas-mitra/` | `/en/community-partners/` |
| `/hubungi-kami/` | `/en/contact/` | `/kontak/` | `/en/contact/` |
| `/informasi-kegiatan/` | `/en/activity-updates/` | `/kabar/kegiatan/` | `/en/news/activities/` |
| `/informasi-kegiatan/<slug>/` | `/en/activity-information/<slug>/` | `/kabar/kegiatan/<slug>/` | `/en/news/activities/<slug>/` |
| `/pengumuman/` | `/en/announcement/` | `/kabar/pengumuman/` | `/en/news/announcements/` |
| `/siniar/<slug>/` | `/en/podcast-en/<slug>/` | `/kabar/siniar/<slug>/` | `/en/news/podcasts/<slug>/` |
| `/video/` | `/en/videos/` | `/kabar/video/` | `/en/news/videos/` |
| `/cerita-dari-lapangan/` | `/en/stories-from-the-field/` | `/dampak/cerita/` | `/en/impact/stories/` |
| `/laporan/` `/ringkasan-id/` `/strategi/` `/pembelajaran/` `/infografis/` `/newsletter-id/` | `/en/reports/` `/en/briefs/` `/en/strategies/` `/en/lessons-learned/` `/en/infographics/` `/en/newsletter/` | `/pengetahuan/?jenis=<jenis>` | `/en/knowledge/?type=<type>` |
| `/category/publikasi/<kategori>/` | `/en/category/publications/<kategori>/` | `/pengetahuan/?jenis=<jenis>` | `/en/knowledge/?type=<type>` |
| `/publikasi/<slug>/` | `/en/publications/<slug>/` | `/pengetahuan/<slug>/` | `/en/knowledge/<slug>/` |
| `/profil-provinsi/` | `/en/provincial-profiles/` | `/wilayah/` | `/en/where-we-work/` |
| (detail) | `/en/publications/provincial-profiles/<slug>/` | `/wilayah/<provinsi>/` | `/en/where-we-work/<province>/` |
| `/glosarium/` | `/en/glossary/` | `/pengetahuan/glosarium/` | `/en/knowledge/glossary/` |
| `/karir/` | `/en/vacancies/` | `/peluang/karir/` | `/en/opportunities/careers/` |
| `/pengadaan/` | `/en/procurement/` | `/peluang/pengadaan/` | `/en/opportunities/procurement/` |
| `/program-magang/` | `/en/internship-program/` | `/peluang/magang/` | `/en/opportunities/internship/` |
| `/wp-content/uploads/...pdf` | sama | URL file dipertahankan | sama |

Slug halaman detail dipertahankan. Sitemap XML lama perlu diminta ke klien untuk daftar artikel lengkap.
