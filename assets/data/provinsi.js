/* =============================================================================
   DATA PROVINSI — sumber tunggal untuk section peta (Beranda), /wilayah/, dan /wilayah/<slug>/.
   Strukturnya sama dengan interface `Province` di docs/plans/wilayah.md, jadi bisa dipindah ke CMS
   (WordPress/WPGraphQL) tanpa mengubah komponen.

   CARA MENGEDIT
   - Tambah/ubah provinsi: edit array PROVINSI di bawah. `slug` dipakai di URL, jangan diganti setelah tayang.
   - Posisi pin: isi `lat`/`lon` (derajat desimal). Konversi ke peta dilakukan projectToMap().
   - Teks yang belum ada: biarkan berawalan "[" (mis. "[Ringkasan program]"). Halaman menandainya
     sebagai placeholder dan tidak menganggapnya data.
   - Foto: isi `photo` dengan path gambar. Kosong → placeholder duotone.

   ASAL DATA
   - Nama, kategori, dan urutan: peta wilayah di skala.or.id (12 provinsi).
   - `summary` 6 provinsi pertama: teks sorotan dari peta skala.or.id (sumber: situs klien).
   - `summary` 6 provinsi Papua, semua stat, fokus, kabupaten mitra, cerita, publikasi: BELUM ADA → placeholder.
   - lat/lon: perkiraan titik pusat/ibu kota, PERLU DIKONFIRMASI klien. 6 nilai pertama dari brief,
     6 Papua/Maluku dibalik dari posisi pin di peta skala.or.id.
   ============================================================================= */
(function (root) {
  'use strict';

  /**
   * @typedef {'utama'|'tambahan'} ProvinceCategory
   * @typedef {{label:string, value:string}} Stat
   * @typedef {{title:string, description:string}} FocusArea
   * @typedef {{title:string, date:string, url:string}} Story
   * @typedef {{title:string, type:string, cover?:string, url:string}} Publication
   * @typedef {{
   *   slug:string, name:string, category:ProvinceCategory, lat:number, lon:number,
   *   summary:string, photo?:string, stats:Stat[], focusAreas:FocusArea[],
   *   partnerRegencies:string[], stories:Story[], publications:Publication[]
   * }} Province
   */

  /* DATA DUMMY (atas permintaan user, 2026-11-12): angka statistik dan fokus program di bawah ini BUKAN data klien.
     Hanya mengisi tampilan; ganti dengan data resmi sebelum tayang. Ditandai `dummy:true` pada tiap provinsi. */
  var DUMMY_STATS = [[5, 4, 2022, 9], [3, 3, 2023, 6], [4, 4, 2022, 8], [4, 3, 2023, 7], [6, 5, 2022, 11], [5, 4, 2022, 9],
                     [3, 3, 2023, 6], [4, 4, 2023, 7], [3, 3, 2023, 6], [4, 3, 2023, 7], [5, 4, 2022, 9], [4, 4, 2022, 8]];
  var DUMMY_FOCUS = [
    ['Standar Pelayanan Minimal', 'Data dan sistem informasi', 'Perencanaan dan penganggaran'],
    ['Perencanaan dan penganggaran', 'Koordinasi pembinaan dan pengawasan', 'Partisipasi warga'],
    ['Data dan sistem informasi', 'Standar Pelayanan Minimal', 'Kesetaraan gender dan inklusi sosial'],
    ['Partisipasi warga', 'Perencanaan dan penganggaran', 'Data dan sistem informasi']
  ];
  var seq = 0;
  function stats() {
    var d = DUMMY_STATS[seq % DUMMY_STATS.length];
    return [
      { label: 'Kab/kota mitra', value: String(d[0]) },
      { label: 'Program aktif', value: String(d[1]) },
      { label: 'Tahun mulai', value: String(d[2]) },
      { label: 'Mitra pemda', value: String(d[3]) }
    ];
  }
  function focusAreas() {
    return DUMMY_FOCUS[seq % DUMMY_FOCUS.length].map(function (t) { return { title: t, description: 'Dukungan teknis dan fasilitasi bagi pemerintah daerah (data dummy).' }; });
  }
  function stories() {
    return [
      { title: '[Judul cerita lapangan]', date: '[Tanggal]', url: '#' },
      { title: '[Judul cerita lapangan]', date: '[Tanggal]', url: '#' }
    ];
  }
  function publications() {
    return [
      { title: '[Judul publikasi]', type: '[Jenis]', url: '#' },
      { title: '[Judul publikasi]', type: '[Jenis]', url: '#' },
      { title: '[Judul publikasi]', type: '[Jenis]', url: '#' }
    ];
  }
  function p(slug, name, category, lat, lon, summary) {
    var o = {
      slug: slug, name: name, category: category, lat: lat, lon: lon, summary: summary,
      photo: '', dummy: true, stats: stats(), focusAreas: focusAreas(),
      partnerRegencies: ['[Kabupaten/kota mitra]', '[Kabupaten/kota mitra]', '[Kabupaten/kota mitra]'],
      stories: stories(), publications: publications()
    };
    seq += 1;
    return o;
  }

  /** @type {Province[]} */
  var PROVINSI = [
    p('aceh', 'Aceh', 'utama', 4.9, 95.9, 'Data capaian layanan dasar (SPM) tersedia dan dapat diakses publik melalui dasbor aplikasi PINTU.'),
    p('kalimantan-utara', 'Kalimantan Utara', 'tambahan', 3.0, 116.6, 'Alokasi SPM naik dari Rp142,5 miliar (2024) menjadi Rp293,4 miliar (2025).'),
    p('gorontalo', 'Gorontalo', 'utama', 0.65, 122.5, 'Korbinwas provinsi di Boalemo memperkuat sinergi provinsi–kabupaten untuk infrastruktur dan pendidikan.'),
    p('nusa-tenggara-barat', 'Nusa Tenggara Barat', 'tambahan', -8.65, 116.4, 'Peningkatan anggaran SPM memperkuat layanan infrastruktur, perumahan, dan ketertiban.'),
    p('nusa-tenggara-timur', 'Nusa Tenggara Timur', 'utama', -8.7, 121.6, 'Korbinwas berbasis klaster mempercepat implementasi SPM.'),
    p('maluku', 'Maluku', 'utama', -3.23, 130.15, 'Keterisian pelaporan e-SPM meningkat hingga 98 persen.'),
    p('papua-barat-daya', 'Papua Barat Daya', 'utama', -0.89, 131.29, '[Ringkasan program]'),
    p('papua-barat', 'Papua Barat', 'utama', -0.85, 134.03, '[Ringkasan program]'),
    p('papua-tengah', 'Papua Tengah', 'utama', -3.7, 136.21, '[Ringkasan program]'),
    p('papua-pegunungan', 'Papua Pegunungan', 'utama', -4.29, 139.0, '[Ringkasan program]'),
    p('papua', 'Papua', 'utama', -2.6, 139.8, '[Ringkasan program]'),
    p('papua-selatan', 'Papua Selatan', 'utama', -7.3, 139.6, '[Ringkasan program]')
  ];

  /* Foto per provinsi — HANYA yang konteksnya akurat (lokasi di provinsi itu / kegiatan di provinsi itu).
     Semua 12 provinsi kini punya foto. Jangan ganti dengan foto yang tidak sesuai lokasinya.
     Sumber, lisensi, dan atribusi: kredit-foto.html + docs/content/kredit-foto.md */
  var FOTO = {
    'nusa-tenggara-timur': { photo: 'assets/img/prov-ntt-960.webp', pos: '50% 55%', alt: 'Teluk biru dan perbukitan savana di Gili Laba, Flores, Nusa Tenggara Timur' },
    'nusa-tenggara-barat': { photo: 'assets/img/kegiatan-ntb-1000.webp', pos: '50% 55%', alt: 'Peluncuran Dashboard Eksekutif Provinsi Nusa Tenggara Barat di sebuah aula, dengan penampilan tari dan pejabat daerah' },
    'maluku': { photo: 'assets/img/sampul-maluku-800.webp', pos: '50% 70%', alt: 'Foto udara perahu di perairan kepulauan Maluku, dari sampul buklet SPM Maluku' },
    'papua-barat-daya': { photo: 'assets/img/kegiatan-papua-barat-daya-1000.webp', pos: '50% 40%', alt: 'Pejabat daerah dan mitra berfoto bersama pada peluncuran Portal Cenderawasih di Papua Barat Daya' },
    'papua-selatan': { photo: 'assets/img/kegiatan-papua-selatan-1000.webp', pos: '50% 45%', alt: 'Pejabat daerah dan mitra pada peluncuran dan pelatihan portal data daerah di Papua Selatan' },
    'aceh': { photo: 'assets/img/prov-aceh-960.webp', pos: '50% 40%', alt: 'Pandangan udara Kota Singkil di Kabupaten Aceh Singkil, Aceh: jalan utama, masjid, dan permukiman' },
    'kalimantan-utara': { photo: 'assets/img/prov-kaltara-960.webp', pos: '50% 55%', alt: 'Rumah adat Baloy Mayo suku Tidung di Kalimantan Utara dengan bendera merah putih' },
    'gorontalo': { photo: 'assets/img/prov-gorontalo-960.webp', pos: '50% 75%', alt: 'Perahu nelayan berwarna jingga dan biru di tepi Danau Limboto, Gorontalo' },
    'papua-barat': { photo: 'assets/img/prov-papua-barat-960.webp', pos: '50% 72%', alt: 'Pantai Syornabo di Pulau Mansinam, Manokwari, Papua Barat' },
    'papua-tengah': { photo: 'assets/img/prov-papua-tengah-960.webp', pos: '50% 88%', alt: 'Puncak berbatu dan bersalju Cartenz di Pegunungan Tengah Papua' },
    'papua': { photo: 'assets/img/prov-papua-960.webp', pos: '50% 60%', alt: 'Jembatan Youtefa berwarna merah di Jayapura, Papua' },
    'papua-pegunungan': { photo: 'assets/img/prov-papua-pegunungan-960.webp', pos: '50% 55%', alt: 'Tampungan air pembangkit listrik mikrohidro dan Sungai Uwe dengan latar pegunungan di sekitar Wamena' }
  };
  PROVINSI.forEach(function (pr) { var f = FOTO[pr.slug]; if (f) { pr.photo = f.photo; pr.photoPos = f.pos; pr.photoAlt = f.alt; } });

  /* Proyeksi peta: path Natural Earth digambar ekuirektangular pada viewBox 1000×381,
     batas lon 94.3–141.6 dan lat 6.6 s.d. −11.4 (rasio 47.3 : 18 = 1000 : 381).
     Hasil dalam persen terhadap lebar/tinggi peta. Kalibrasi: lihat docs/plans/wilayah.md §1. */
  var BOUNDS = { lonMin: 94.3, lonMax: 141.6, latMax: 6.6, latMin: -11.4 };
  function projectToMap(lat, lon) {
    return {
      x: (lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin) * 100,
      y: (BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin) * 100
    };
  }

  /* String antarmuka (CLAUDE.md §4: tidak ada teks hard-coded). Prototipe merender `id`;
     `en` diisi saat port ke Next.js (next-intl). */
  var STR = {
    id: {
      cat: { utama: 'Lokasi intervensi utama', tambahan: 'Lokasi intervensi tambahan' },
      eyebrow: 'Wilayah kerja',
      title: 'Wilayah Kerja SKALA',
      sub: 'Pilih provinsi untuk melihat fokus program di wilayah tersebut.',
      explore: 'Jelajahi wilayah kerja',
      count: '12 Provinsi',
      showAll: 'Lihat semua',
      focusLabel: 'Fokus program',
      profile: 'Lihat profil provinsi',
      profileShort: 'Lihat profil',
      prev: 'Provinsi sebelumnya',
      next: 'Provinsi berikutnya',
      close: 'Tutup detail provinsi',
      photo: 'Foto',
      mapLabel: 'Peta Indonesia tiga dimensi dengan 12 provinsi wilayah kerja SKALA.',
      listLabel: 'Daftar provinsi wilayah kerja',
      selected: function (n) { return n + ' dipilih. Detail provinsi ditampilkan.'; },
      reset: 'Peta kembali menampilkan semua provinsi.',
      back: 'Kembali ke peta',
      crumb: 'Wilayah Kerja',
      home: 'Beranda',
      listH1: '12 provinsi wilayah kerja SKALA',
      listIntro: '[Paragraf pengantar halaman wilayah kerja]',
      search: 'Cari provinsi',
      searchPh: 'Ketik nama provinsi',
      all: 'Semua',
      empty: 'Tidak ada provinsi yang cocok dengan pencarian Anda.',
      results: function (n) { return n + ' provinsi ditampilkan'; },
      viewProgram: 'Lihat program',
      relatedPubs: 'Publikasi terkait',
      allPubs: 'Semua publikasi',
      about: 'Tentang wilayah ini',
      tabs: { ringkasan: 'Ringkasan', fokus: 'Fokus program', cerita: 'Cerita lapangan' },
      partners: 'Kabupaten/kota mitra',
      overview: '[Paragraf ringkasan konteks provinsi, tantangan layanan dasar, dan peran SKALA]',
      allProv: 'Lihat semua provinsi',
      notFound: 'Provinsi tidak ditemukan.',
      placeholder: 'Konten menunggu data klien'
    },
    en: {
      cat: { utama: 'Main intervention site', tambahan: 'Additional intervention site' },
      eyebrow: 'Where we work', title: 'Where SKALA works',
      sub: 'Select a province to see the programme focus in that area.',
      explore: 'Explore where we work', count: '12 Provinces', showAll: 'Show all',
      focusLabel: 'Programme focus', profile: 'View province profile', profileShort: 'View profile',
      prev: 'Previous province', next: 'Next province', close: 'Close province details', photo: 'Photo',
      mapLabel: 'Three-dimensional map of Indonesia showing SKALA’s 12 provinces.',
      listLabel: 'List of provinces', back: 'Back to map', crumb: 'Where We Work', home: 'Home'
      /* sisanya diisi saat port Next.js */
    }
  };

  root.SKALA_WILAYAH = {
    provinces: PROVINSI,
    projectToMap: projectToMap,
    str: STR.id,
    strings: STR,
    bySlug: function (slug) { for (var i = 0; i < PROVINSI.length; i++) if (PROVINSI[i].slug === slug) return PROVINSI[i]; return null; },
    isPlaceholder: function (s) { return typeof s === 'string' && s.charAt(0) === '['; },
    profileUrl: function (slug) { return 'wilayah-provinsi.html?p=' + encodeURIComponent(slug); },
    listUrl: 'wilayah.html',
    mapUrl: 'index.html#wilayah'
  };
})(window);
