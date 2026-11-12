# 02 — Design direction: SKALA × Davaris language

- **Status:** v1, 2026-11-11. Replaces the Farm Africa–based visual direction in `docs/plans/beranda.md` §3–§5 (structure and content rules in that plan still apply).
- **Visual reference:** davaris.gr (layout, typography behaviour, spacing, motion, interaction).
- **Source of truth for identity and content:** skala.or.id and the SKALA logo files in this repo.
- **Prototype:** `index.html` (homepage). The earlier `skala-beranda.html` is kept for comparison.

## 1. What Davaris actually does (inspected 2026-11-11)

Stack: WordPress theme, GSAP + ScrollTrigger + SplitText, Lenis smooth scroll, Barba page transitions.

| Area | Observed |
| --- | --- |
| Typeface | Moderat Extended 500 for almost everything (display, headings, buttons, labels); Moderat for body; Moderat Mono for tiny meta labels |
| Type scale | Fluid `clamp()`: h1 90–120 px, h2 75–100, h3 60–80, h4 45–60, h5 30–40; body 14–18 px; labels 11–14 px |
| Line height | Very tight: h1 0.9, h2–h4 1.0, h5 0.9; letter-spacing −0.02em on h1 |
| Case | Sentence case for statements; uppercase for collection names, buttons, nav toggle, mono labels |
| Spacing | Fluid section spacing: xs 16–42 px, sm 30–85, md 40–125, lg 60–170; gutter 20 px mobile / 50 px desktop |
| Shape | Media radius 10 px; buttons 6 px; no borders on cards; hairline dividers only |
| Colour behaviour | Warm paper background, one dark ink, one saturated accent used sparingly (buttons, stacked number cards) |
| Header | Three-part: `≡ MENU` drawer toggle left · wordmark centre · small accent pill CTA right. Transparent over hero |
| Hero | Full-bleed video, title bottom-left in paper colour. On scroll the hero clips to `inset(gutter round 10px)` while media and title parallax (15% / 30%) and the title fades |
| Signature sections | (1) Large statement paragraph whose words brighten from 50% to 100% as you scroll; (2) centred uppercase title, then media grows to full-bleed and splits into 3 columns; (3) heading left + numbered cards right that stack on scroll, pale → saturated; (4) full-bleed media with text bottom-left (curtain/expand reveal); (5) text + two asymmetric images with line-by-line "colouring" on scroll; (6) horizontal event cards with prev/next; (7) footer over full-bleed media with a floating CTA card and giant wordmark |
| Motion constants | Ease `1 − (1 − t)^4` (≈ GSAP `power3.out`); CSS `cubic-bezier(.19,1,.22,1)` 0.75 s for hovers; text reveal = masked lines/words `yPercent 100 → 0`, stagger 0.1, 1.2 s; fade-up `y 30`, 1.2–1.4 s; media reveal = clip-path from centre point to full + inner image `scale 1.3 → 1`, 1.4–1.8 s; triggers at `top 82%` |

## 2. Translation to SKALA

### 2.1 Colour (from the logo, measured)
The logo uses exactly two colours: **teal `#0EADA5`** and **navy `#163559`**. The live site also uses navy `#223D60` on its map. Davaris's brown/cream/orange are **not** used.

| Token | Hex | Role | Contrast notes |
| --- | --- | --- | --- |
| `--navy` | `#163559` | Primary ink, dark sections | 11.6:1 on paper |
| `--ink` | `#0B1F38` | Deepest surface (hero, footer), text on teal | 5.95:1 on teal |
| `--teal` | `#0EADA5` | Accent: buttons, pins, highlights, card fills | **never text on light backgrounds** (2.8:1) |
| `--teal-text` | `#00756F` | Teal text/links on paper | 5.2:1 on paper, 4.8:1 on mist |
| `--teal-light` | `#5FD3CC` | Teal text on navy/ink | 6.9:1 on navy |
| `--paper` | `#F5F7F6` | Page background (cool off-white, replaces Davaris cream) | — |
| `--mist` | `#E6EFEE` | Alternate section background (replaces Davaris beige) | — |
| `--muted` | `#5A6B80` | Secondary text on paper | 5.1:1 |
| `--muted-dark` | `#A9BBD0` | Secondary text on navy/ink | 6.3:1 / 8.5:1 |
| Card ramp | `#CFEDEA` → `#8FD9D3` → `#0EADA5` | Stacked number cards (Davaris peach → orange equivalent) | navy text ≥ 7.7:1; ink on teal 5.95:1 |

Orange from the previous prototype is dropped because it is not in the SKALA identity.

### 2.2 Typography
Moderat is a commercial typeface (Tightype) and needs a licence, so it is not used. Closest free equivalent:

- **Archivo** (variable, Google Fonts) at `font-stretch: 112–125%` and weight 500 for display and headings. This reproduces Moderat Extended's wide, flat grotesque and also echoes the wide, letter-spaced SKALA wordmark.
- **Archivo** at 100% width, weight 400, for body text.
- **IBM Plex Mono** 400/500 for small uppercase meta labels (Moderat Mono role).
- The same fluid scale and tight line-heights as Davaris (§1). Body text stays at **line-height 1.5**, not Davaris's 1.1, for readability in long Indonesian sentences.
- Previous direction (Spartan + Plus Jakarta Sans) is superseded. **Needs client confirmation** if SKALA has an official typeface.

### 2.3 Imagery
- Davaris is video/photo-led; SKALA has no approved photo library in the repo yet.
- Art direction until photos arrive: duotone navy/teal frames with a **halftone dot field taken from the logo's dot spiral**. The hero uses a live, slowly rotating dot spiral (canvas), which turns the logo mark into the hero "media".
- When photos arrive: duotone-friendly documentary photography of people and services, 4:5 and 16:9 crops, 10 px radius, revealed with the clip-from-centre effect.

### 2.4 Section map (Davaris pattern → SKALA content)
| # | Davaris pattern | SKALA content (from skala.or.id) |
| --- | --- | --- |
| 1 | Header: Menu · logo · pill CTA | `≡ Menu` drawer (full new IA, drill-down on mobile) · SKALA logo · search, ID/EN, "Pusat Pengetahuan ↗" |
| 2 | Full-bleed hero, title bottom-left, clip on scroll | "Sinergi dan Kolaborasi untuk Akselerasi Layanan Dasar" over the dot spiral, with "Kemitraan Australia–Indonesia" label |
| 3 | Scroll-brightening statement | Programme goal ("Mendukung pengurangan kemiskinan dan ketimpangan …") |
| 4 | Collections: title → media expands → 3 columns | "Capaian Akhir Program": EOPO 1–3, each opening its 3 intermediate outcomes (IO) |
| 5 | Infographics: heading + stacking cards | Partnership statement + numbers: 12 provinsi · 3 EOPO · 9 IO · hingga AUD 160 juta · 8 tahun |
| 6 | Full-bleed media, text bottom-left | "Di mana kami bekerja": accurate Indonesia map with the 12 provinces (10 main, 2 additional) and province highlights from the live map |
| 7 | Text + asymmetric media, line colouring | "Optimalisasi pemanfaatan data dan sistem analisis": SIKOMPAK, SEPAKAT, SIKD, SIGAP, SAIK, SIOPAPUA |
| 8 | Horizontal event cards | Informasi kegiatan + publikasi terbaru (live titles) |
| 9 | (none in Davaris; content required) | Testimonials from regional officials (live quotes), in large-type Davaris style, manual 01/02/03 switcher |
| 10 | Footer over media + CTA card + giant wordmark | WhatsApp channel CTA ("Mari bergabung …"), sitemap, address, partner logos, "Dikelola oleh DT Global" |

## 3. Motion spec
| Effect | Where | Spec | Reduced motion |
| --- | --- | --- | --- |
| Intro | First visit per session | SKALA letters rise from a mask, 0.9 s total, no scroll lock (Davaris locks scroll; we do not) | Skipped |
| Hero clip | Hero | Scrubbed: `inset(0)` → `inset(gutter round 10px)`; dots `yPercent 15`, title `yPercent 30` + fade | Static |
| Text reveal | All h2 headings | Masked words `yPercent 100 → 0`, stagger 0.06, 1.1 s, `power3.out`, start `top 82%` | Visible |
| Fade-up | Labels, body, CTAs | `y 30 → 0`, 1.2 s, `power3.out` | Visible |
| Statement brightening | Goal section | Words `opacity .35 → 1`, scrub 0.5, `top 80%` → `bottom 60%` | Full opacity |
| Media expand | EOPO panel | Width/clip from centred frame to full-bleed, scrubbed | Full-bleed |
| Card stack | Numbers | Cards clip `inset(100% 0 0 0 round 10px)` → `inset(0 …)`, scrubbed, desktop only; mobile = fade-up | Static list |
| Media reveal | Image frames | Clip-path from centre to full + inner `scale 1.3 → 1`, 1.4 s | Visible |
| Line colouring | Data heading | Per-line colour wipe from muted to navy, scrubbed | Navy |
| Hover | Buttons, links, cards | 0.75 s `cubic-bezier(.19,1,.22,1)`; arrow ↗ slides out and back in; image scale 1.05 | Colour change only |
| Smooth scroll / page transitions | — | **Not adopted.** Lenis-style scroll smoothing changes native scroll (accessibility, user instruction "tanpa scroll-jacking"); Barba transitions need multiple pages (revisit in Next.js with the View Transitions API) | — |

Rules: only `transform`, `opacity`, `clip-path`; no motion when GSAP fails to load (content is visible by default and JS adds initial states); everything respects `prefers-reduced-motion`.

## 4. Responsive
- ≥ 1440: 12-col grid, 50 px gutter, full effects.
- 1024–1366: same layout, fluid type.
- 768: 8-col; card stack becomes a 2-col grid; EOPO columns stack; map keeps pins.
- 375–430: single column, 20 px gutter; slider becomes swipe (scroll-snap); drawer menu is full-screen with drill-down; hero title ~44 px.

## 4b. Change 2026-11-11 — hero as a 1:1 Davaris replica (user request)
- Hero = full-bleed **video slider, max. 5 slides**, headline only (no subtitle/labels/buttons). Replaces the dot-spiral hero.
- Hero + header font: **Plus Jakarta Sans** 500 (rest of the page still Archivo; decide whether to switch site-wide).
- Measured from davaris.gr @1440×900: header 72 px, gutter 50 px, MENU with two 50 px lines, centred logo, single solid CTA top-right; title 90 px / line-height 0.9 / −0.02em, baseline ≈ 100 px above the bottom.
- Search and ID/EN moved into the menu drawer so the header right side holds only the CTA (as in the reference).
- Slider: advances on video `ended` (7 s without video), pause button (WCAG 2.2.2), auto-pause off-screen/hidden tab, swipe, arrow keys, no autoplay under reduced motion.
- Video spec to request: MP4 H.264 (+ optional WebM), 1920×1080, 6–12 s, no audio, ≤ 4 MB each, plus a poster frame (JPG/WebP, ≤ 200 KB).

## 4c. Change 2026-11-11 (later) — hero restyled to the "Aethera" reference (user request, replaces 4b layout)
- Header: logo left (x 40) · dark translucent **pill nav** centred (height 50, dot separators, 14 px, short labels: Tentang · Program · Dampak · Wilayah · Pengetahuan · Kabar · Peluang; full names in aria-label and drawer) · **ID ⌄ language dropdown + search** right (40 px margin). Pill shown ≥ 1100 px, hamburger + drawer below. Header 110 px over the hero, 72 px solid after.
- Hero text **centred**: headline 47 px / 56 px (cap top at 18.5 % of viewport), subtext 16 px / 27 px (max 456 px, 2 lines), white pill button 47 px tall; per slide. Slider controls centred 40 px from the bottom (reference's review row).
- Verified at 1200×791 against the reference image: text rows within 1–3 px.
- Font remains Plus Jakarta Sans (the reference uses a monospaced-style display face).

## 4d. Change 2026-11-11 — navbar after scrolling (Davaris bar, user request)
- Once the page scrolls > 80 px, the hero header (logo · pill nav · ID ⌄ · search) is replaced by a frosted bar: 72 px, radius 10 px, paper at 80 % + blur.
- Bar content: `MENU` (two 1 px lines, 50 px wide, 10 px apart; 16 px uppercase) left at 20 px · **logo symbol only** (dot spiral, 41 px, `assets/skala-mark.png`, cropped from the official logo) centre · solid teal CTA "Pusat Pengetahuan ↗" (39 px tall, radius 6 px) right at 20 px. Below 640 px the CTA hides.
- Search and ID/EN in this state are reached through the drawer (search button added to the drawer header).
- **Client check:** whether using the logo symbol alone is allowed by SKALA's brand rules.

## 4e. Change 2026-11-11 — menu drawer (Davaris panel, user request)
- Floating light panel 10 px from the viewport edges, 631 px wide, radius 10 px, over a dimmed blurred backdrop; padding 55 px sides / 32 px top.
- Thin 41 px × close · search + ID/EN top-right · `MENU` label 13 px · links 29 px / 34 px pitch (Beranda … Kontak) · thin "+" (19 px) on items with sub-pages.
- **Sub-menus are now an accordion** ("+" rotates to ×, one open at a time, closed lists are `inert`). This replaces the drill-down with "Kembali ke menu utama" from `docs/plans/beranda.md`.
- Footer of panel: WhatsApp channel + e-mail round icons (43 px; SKALA has no other social accounts on the live site), organisation name, address, e-mail, logo symbol bottom-right.
- Partner logos are no longer inside the drawer (still in the site footer for co-branding).
- Verified against the reference at 2×: positions within 1–6 px; focus trap, Esc, axe clean.

## 4f. Change 2026-11-11 — "Tentang Kami" section (replica of the "Form & Found" reference, user request)
- New section directly after the hero (before "Tujuan"): 2 columns 48 : 52; heading (3 lines) and paragraph (4 lines) in the right column, grey 2-line tagline in the left column aligned with the paragraph's first line; full-bleed, square-cornered image block below (dummy for now, with a Jakarta time label like the reference's "New York 2:49 AM").
- Measured at 972 px (reference width): text column x = 467 (match), heading 30.0 px / 32.5 px line-height (match), body 15 px / 20 px, tagline 13.6 px / 16.6 px, heading→paragraph gap 63 px (ref 64). Sizes scale with viewport width (vw) with min/max limits.
- Font is Plus Jakarta Sans (wider than the reference's grotesque), so the copy is shortened to keep the same line counts (3 / 4).
- The SplitText line masks were clipping descenders (g, y, p); fixed site-wide by extending the mask's clip box downward.
- Not copied: the reference's "(Scroll)" pill (a separate floating element of that site).
- Overlap to decide: the existing "Tujuan" statement section partly repeats this section's message.

## 4g. Change 2026-11-11 — "Tujuan" section rebuilt (reference "Accommodation / Balance", user request)
- Replaces the word-brightening statement. Two blocks on the paper background:
  1. **Tujuan** — two-tone heading (32 px) left, goal paragraph right; rounded (16 px) image slider with "01 …" pill and prev/next buttons left; accordion with round "+" buttons right (3 outcome summaries + "Wilayah kerja" open by default with text, link and small image). One item open at a time.
  2. **Pendekatan** — two-tone heading + paragraph + "Lihat program ↗" at the bottom-left; four white rounded cards on the right (Regulasi dan standar, Perencanaan dan penganggaran, Data dan sistem informasi, Partisipasi dan GEDSI) with line icons in teal-tint circles.
- Layout proportions measured from the reference (columns 53.7 % / 52.3 % split, figure and accordion share the same bottom edge, block-2 link aligned with the last card). Font sizes fixed (not scaled up), per the earlier request.
- Update: the small category labels on the four cards (kebijakan / anggaran / data / inklusi) were removed; cards now have equal 24 px padding, title and icon on one row, and a 1.5 px teal stroke on hover.
- Content is dummy/summary text from skala.or.id (EOPO wording, 12 provinces); images are placeholders. The highlighted phrase of the headings now uses the same `#111111` as the rest of the headline.

## 4h. Change 2026-11-11 — "Kerangka hasil" columns (Davaris "Collections" reference, user request)
- Each of the 3 EOPO columns is now minimal: full-bleed image (dummy), huge uppercase word (PUSAT / DAERAH / WARGA), mono label (EOPO 1–3), square "+" button, hairline dividers. No body text at rest.
- **Hover** (pointer): title + label turn teal, the "+" is replaced by the official EOPO statement and a "Lihat capaian ↗" link; the title does not move (same y in all columns). **Keyboard focus / tap**: the "+" stays visible (turns ×) and the text appears below it; one column open at a time; Esc closes.
- **Scroll-driven zoom**: while the section is pinned (desktop) the frame opens to full-bleed and all images zoom from 1.45× to 1× in step with scroll (scrubbed). Below 1024 px each column image zooms 1.3× → 1× while it crosses the viewport. Hover adds a slight extra zoom (1.06×) on an inner layer. No motion under reduced motion.
- Removed from this section: the nine IO (capaian antara) lists and the longer EOPO descriptions. They are preserved in `docs/content/capaian-eopo.md` for `/dampak/capaian/`.
- Images are decorative (`aria-hidden`); a dark scrim (46 % → 60 % on hover) protects text contrast over any future photo.

## 4i. Change 2026-11-11 — "SKALA dalam angka" (Davaris "infographics" stacked cards, user request)
- Left: plain caps label, 3–4 line heading (48 px, "Kemitraan jangka panjang untuk layanan dasar di 12 provinsi."), one solid "Selengkapnya ↗" button. The previous explanatory paragraph was removed (copy kept short on purpose).
- Right: 5 stacked cards, 427 × 197 px, radius 12 px, stack pitch 86 px, hairline 40 px from the top, 12 px mono label, 72 px number at the bottom (count-up once). Colour ramp pale → saturated teal, ink text on all (≥ 5.9:1). Measured from the reference at 1424 px: stacked positions match exactly (122 / 208 / 294 / 380 / 466).
- Numbers: 12 provinsi · 3 capaian akhir (EOPO) · 9 capaian antara (IO) · komitmen hingga AUD 160 juta · 8 tahun. The card descriptions and "Konfirmasi klien" tags were removed from the page; **"160 juta" and "8 tahun" still come from the brief, not from skala.or.id — confirm before launch** (note kept in the HTML comment).
- Spacing between cards is applied as `margin-top` on cards 2–5 so the full stack is visible before it is released.

## 4j. Change 2026-11-11 — text colours (user request)
- New tokens: `--text: #111111` (headings, primary text, labels, numbers on light backgrounds) and `--text-2: #444444` (one level below: sub-headlines, paragraphs, card text, meta). Contrast on paper/white ≥ 8.9:1.
- All former navy / ink / grey (`--muted`) text colours on light sections now use these tokens; the old navy remains only for brand surfaces (dark sections, footer, map, buttons backgrounds). Teal accent text (small eyebrow labels, links) and white text on dark/photo areas are unchanged. The grey half of the two-tone headings ("layanan dasar", "saling terhubung") was later changed to `#111111` as well (2026-11-11).
- `#444444` was chosen for "one level below #111111"; change `--text-2` in `:root` to adjust everywhere.

## 4k. Change 2026-11-11 — typography system (user request)
- **One typeface: Plus Jakarta Sans** (400/500/600/700) everywhere — headings, body, labels, buttons, numbers. Archivo and IBM Plex Mono are no longer loaded; former mono labels are now plain uppercase with letter-spacing.
- **Allowed sizes only: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 60, 70, 80 px.** Audited in the browser at 375 / 768 / 1024 / 1280 / 1440 px: all 318 text elements use Plus Jakarta Sans and every size is on the scale (4 and 8 are not used for text).
- Mapping: labels, buttons, small meta 12 · body, nav, accordion titles, card text 16 · card titles, EOPO text, large lead 20 · sidebar links (mobile), mobile headings, quotes 24 · headings 32 · section titles 40–48 · hero title 48 · EOPO words 60 (mobile 40) · stat numbers 70 (mobile 56) · intro logo 80.
- Responsive steps are made with breakpoints (768, 1024), not fluid `clamp()`, so sizes never fall between scale values.
- Side effects: pill navigation (16 px) now appears from 1280 px (below that: hamburger); mobile headings in "Tentang Kami" / "Tujuan" are 24 px (28 px is not on the scale); card body text and links went from 13–14 px to 16 px.

## 4l. Change 2026-11-11 — headline spacing rule (user request)
- **Rule: space below a section headline = headline font size × 1.5** (CSS `calc(var(--headline-size) * 1.5)`), so it follows the type size at every breakpoint: 24 px → 36, 32 → 48, 40 → 60, 48 → 72.
- Applied to: Tentang Kami (→ paragraph and tagline), Tujuan (→ intro/figure/accordion), Pendekatan (→ paragraph), SKALA dalam angka (→ button), Sistem data (→ paragraph), Wilayah kerja (→ paragraph), Kabar (→ cards). Measured at 375 / 768 / 1024 / 1440 px: every case = exactly 1.5×.
- Not applied (kept as in the references): hero headline → subtext (14 px, matches the "Aethera" reference), EOPO words → label, card titles (20 px) → text, drawer links.
- Fixed a regression from the typography change: the "SKALA dalam angka" headline had dropped to 32 px on desktop because of CSS source order; it was set back to 48 px, then set to **32 px on desktop at the user's request** (24 px on mobile), so its spacing is 48 px.

## 4m. Change 2026-11-11 — "Wilayah kerja" as a clean 3D map (user request)
- No text at rest: the visible heading, paragraph, legend, "(04)" label and source line were removed (heading + summary kept as screen-reader-only). Only two small controls remain at the bottom: "+ Daftar 12 provinsi" (expands the full list, the accessible alternative) and "Jelajahi wilayah kerja ↗".
- Map is larger (up to 1360 px wide) and 3D with CSS only: the plane is tilted with `rotateX` (38°), four offset layers under the top layer give it thickness, plus a soft floor shadow. While the section scrolls in, the tilt eases from 64° (lying flat) to 38° (scroll-driven). No WebGL/three.js, so no extra download.
- Pins stand upright on the plane (counter-rotated stem + dot with a ground shadow), pop in one by one.
- Hover / keyboard focus on a pin opens an upright 3D card: photo (dummy), province name, status, highlight and "Lihat profil provinsi". Cards are horizontal (photo left) so they stay on screen at 1024×768 and up; top-row pins open the card to the side. Esc closes; moving the pointer onto the card keeps it open.
- Verified: all 12 pins hoverable and every card fully on screen (below the header) at 1024×768, 1280×800, 1440×900, 1920×1080. Fixed a Chrome 3D hit-testing issue where front pins (NTB, NTT, Papua Selatan) were covered by the map layers.
- Removed: cursor-following tilt (it moved pins out from under the pointer).
- **Dummy highlights** for 6 Papua provinces (skala.or.id has no text for them) — marked `dummy:true` in `PROV`; request real copy from the client.
- < 768 px: flatter tilt (26°), pins decorative, the province list is the control.

## 4n. Change 2026-11-12 — Wilayah kerja: interactive map + 2 new pages (plan `docs/plans/wilayah.md`, approved)
Replaces 4m: the user's brief brings visible text back to the section and swaps the hover cards for click-to-zoom.
- **One map component, reused:** the 3D map (same SVG + CSS 3D, no new map, no new library) now lives in `assets/js/peta-3d.js` + `assets/css/peta-3d.css`. Province data and UI strings are in `assets/data/provinsi.js` (`Province` shape, ready for the CMS, `projectToMap(lat, lon)`). Used in the Beranda section and in the profile hero (static mode).
- **Camera:** one transform `translate3d(--tx,--ty) scale3d(--k) rotateX(--rx)`; `--tx/--ty/--k` are `@property`-registered, so only the camera animates (750 ms, `cubic-bezier(.2,.7,.2,1)`) while the scroll-driven tilt stays instant. The target is solved with the perspective maths so the province lands in the middle of the free area between the two panels (measured error ≤ 6 px). Pins are counter-scaled so they keep their size. Reduced motion: camera jumps.
- **Sharpness:** Chrome rasterises 3D content at its layout size, so a 2.4× zoom looked pixelated. The map is drawn R× larger (R = zoom factor) and shown at 1/R at rest, so it is ≈1:1 when zoomed. Lengths inside the map (layer depth, shadow blur, stroke) are multiplied by R.
- **≥ 1024 px (revised 2026-11-12, user request: clean + minimal):** the left list panel is **removed**. Header: eyebrow + 32 px title on the left; sub-heading with "Jelajahi wilayah kerja ↗" **directly under it** on the right. The map takes the full width (≈ +25 % vs. with the panel; the frame reaches 24 px into the gutter, map scaled to 0.93 and nudged 3 % left so the perspective-enlarged front edge and the right-leaning land do not crop; edges fade out with a mask instead of a hard clip while zoomed). Hint line at the bottom. Hover/focus pin → white name chip, pin 1.25×. Click → camera zoom, other pins dim to 0.4, selected pin pulses, detail panel right (photo, category chip, name, summary, 3 stats, focus chips, "Lihat profil provinsi ↗", ‹ ›, X). Reset with X or Esc (only when the section is visible or focused); focus returns to the pin.
- **Hint line removed (2026-11-12, user request):** the text "Arahkan kursor untuk melihat nama, klik untuk membuka detail provinsi" under the map is gone (markup, CSS and the `hint` strings in `provinsi.js`). The pins still show the name on hover/focus and open the panel on click.
- **Accessibility without the list (desktop):** the 12 pins are the controls — real `<button>`s, in the tab order, `aria-label="<Province>, <category>"`, `aria-expanded` + `aria-controls` the detail panel, visible focus ring, name chip on focus. Below 1024 px the pins are decorative (`aria-hidden`) and the list is the control, as before. `peta.access(on, label, controls)` in `peta-3d.js` switches between the two. The sub-heading text no longer says "or in the list".
- **768–1023 px:** the list becomes a horizontal chip row above the map; details open as a bottom sheet; the page scrolls so the map sits above the sheet. Chosen because 272 + 380 px of panels leave too little map below 1024 px.
- **< 768 px:** list first. Small map (180 px, sticky under the header, not tappable) → legend → 56 px rows → "Jelajahi wilayah kerja". Tapping a row zooms the map and opens the bottom sheet, which never covers the map.
- The sheet is moved just after the section below 1024 px: inside the section it was cut by the frame's `clip-path` and painted under the next section.
- **New pages (prototype routes):** `wilayah.html` (= `/wilayah/`: search, `aria-pressed` filter pills with counts, card grid, empty state) and `wilayah-provinsi.html?p=<slug>` (= `/wilayah/<slug>/`: navy hero with the static map focused on the province, 4 stat cards overlapping the hero, tabs with ←/→/Home/End, related publications, bottom nav, meta + canonical + JSON-LD `AdministrativeArea` + `BreadcrumbList`). Shared base styles: `assets/css/situs.css` (same token values as Beranda).
- **Tokens:** the brief's dark palette was mapped to existing tokens (ink, teal, teal-light, paper). New token `--teal-deep #0B5F57` for the category chip text: `--teal-text` on `--teal-tint` was 4.49:1, just below AA.
- **Data:** no invented content. Summaries for 6 provinces are the live skala.or.id highlights; the 6 Papua summaries, all stats, focus areas, partner regencies, stories and publications are `[placeholder]` (rendered italic, grey). The earlier invented Papua highlights were removed. lat/lon are approximate.
- **Scroll lock (2026-11-12, user request):** on ≥ 1024 px the section is exactly one screen tall; when it reaches the top it is **pinned** (GSAP ScrollTrigger `pin`, ≈ 90 % of the viewport height of scrolling), and during the lock the map stands up from 64° to 38° (scrubbed). When it ends the page scrolls on. The frame still opens to full-bleed before the lock. Same pattern as the EOPO section. Keyboard focus on a pin before the map is fully up jumps to the end of the lock (stable pin positions). Not active with `prefers-reduced-motion` (map static at 38°) and not on 768–1023 px (section is taller than the screen there; it keeps the scroll-scrubbed tilt) or on mobile. Selecting a province works while locked (measured error ≤ 4 px).
- **Detail panel tidied (2026-11-12, user request):** one top row — category chip left, ‹ › × right as **seamless** icon buttons (no box, no border, 44 px target, faint tint on hover). Photo 5:2 (was 2:1), name 24 px, summary 14 px, stats as three columns split by hairlines (no boxes), focus chips, and the "Lihat profil provinsi" button **pinned to the bottom** of the panel — only the middle part scrolls, so the button is always visible (before, it was cut off on short screens). Panel height is now ≈ 554 px.
- Fixed a regression from the first Wilayah build: its `.icon-btn` class overrode the global one and turned the header/drawer search buttons into 44 px bordered squares. The panel buttons are now `.wbtn`; the search buttons are back to 40 px round, borderless.
- **Sub-heading 14 px** (user request 2026-11-12): section subtitle on Beranda, intro on `wilayah.html`, hero summary on the profile page. 14 px is outside the 4–80 scale of §4k; added as an exception for sub-headings only.
- Verified: axe clean (Beranda full page 1440/768/375, both new pages 1440/375), no horizontal overflow, fonts on scale, keyboard (focus to panel title on open, back to the row on close, `aria-live`), reduced motion.

## 4o. Change 2026-11-12 — "Sistem data" replaced by "Informasi Kegiatan dan Publikasi" (user request, reference: blog "Latest post / Founders corner")
- **Replaces** the Sistem Data section **and** the old "(06) Kabar & publikasi" slider (their content was the same news; keeping both would show it twice). Labels renumbered: (05) Kegiatan & publikasi, (06) Suara mitra. The Sistem Data text, system chips (SIKOMPAK, SEPAKAT, SIKD, SIGAP, SAIK, SIOPAPUA) and the "Pelajari sistem data" link are no longer on the homepage; they still belong to `/program/sistem-data/` (sitemap) — restore a short mention elsewhere if the client wants it on the homepage. Backup of the previous file state is not kept in the repo.
- **Layout:** headline "Informasi Kegiatan dan Publikasi" (40 px, 1.5× spacing, per-line colour reveal) on a `--mist` band. Top: large featured card (2/3 width, 16:10, 24 px radius) with a frosted gradient caption (category chip, 24 px title, location) + right column "Kegiatan terbaru" (4 rows: 96 px thumbnail + 16 px title + meta, "Semua kegiatan ↗"). Hairline. Bottom: "Publikasi terbaru" with "Semua publikasi ↗" and a carousel of white cards (photo, category chip, 20 px title, date).
- **Carousel behaviour:** scroll-snap, steps one card; round ‹ › buttons and numbered page buttons (44 px targets, `aria-current`) appear **only when cards overflow** — with the 3 real publications: hidden on desktop (3 fit), 2 pages on tablet, 3 on mobile. Honest to the data instead of padding with invented items.
- **Responsive:** < 768 single column (featured 4:5, list rows 80 px thumbs); 768–1023 featured on top, list in 2 columns, publications 2-up; ≥ 1024 as above.
- **Content (real, from skala.or.id, 12 Nov 2026):** 5 activity titles (1 featured + 4 listed; the location lines come from the titles) and 3 publications with their real category and date (Ringkasan 11 Nov; Cerita dari Lapangan 4 Nov and 21 Oct). Photos are placeholders; excerpts and read-times of the reference were left out (no source text). The site's publication archive pages returned no posts, so no more than 3 publications could be listed.
- Fixed while building: the per-line colour reveal (`.cline`, `background-clip:text`) cut off descenders (g, p, y) — now has bottom padding for every headline that uses it.
- Verified: axe clean on the full page at 1440 / 768 / 375, no horizontal overflow, fonts on scale, carousel (arrows, pages, keyboard focus into view), scroll lock and other sections unchanged.

## 4p. Change 2026-11-12 — new "Siniar Kami" section (user request, reference: skala.or.id "Siniar Kami")
- New section **(06) Siniar** after the news section; "Suara mitra" becomes (07). **Light background, same `--mist` as "Informasi Kegiatan dan Publikasi"** (revised 2026-11-12; first version was dark navy).
- **One screen, sized by the screen height (revised):** the section is `min-height:100svh`, and on ≥ 1024 px the player width is computed from the viewport height (`--pw = clamp(480px, (100svh − 422px) × 16/9, 2/3 of the width)`), so the header, player, caption and playlist all fit: measured **900 px tall at 1440×900** and **812 px at a 1440×812 viewport** (a 1440×900 screen minus the browser bar), 1920×1080 → 1080. On shorter/narrower screens (1280×720, 1024×768) it grows a little instead of shrinking the player below 480 px. `#siniar` anchors land with the section top exactly at the screen edge (`scroll-margin-top`). No scroll lock (not requested).
- **Layout ≥ 1024 (revised):** header ("Siniar Kami" 40 px, 1.5× spacing) → row 1: player (left) + **playlist of the 3 episodes whose top and bottom align with the player** (white cards, equal height; selected = teal outline + tint + "Dipilih" tag, tag hidden on screens < 760 px high) → row 2: date, title (24 px) and description (14 px) under the player, "Siniar lainnya ↗" under the playlist. Choosing an episode swaps the player + text and starts it. < 1024: stacked (player → text → list → link).
- **Player:** poster + play button; the video loads **only on click** from `youtube-nocookie.com` (no third-party request or cookies before play, good for LCP and consent). Changing episode removes the previous iframe, so only one plays. Focus moves to the iframe.
- **Content (skala.or.id, 12 Nov 2026):** the site has exactly 3 siniar: "Seri Podcast Harian Kompas: Isu Lanjut Usia Hantui Indonesia?" (12 Dec 2024, description from the live page), "Menerobos Batas: Perspektif tentang Identitas, Disabilitas, dan Mengubah Stereotip" (12 Dec 2024), "Seri Podcast Harian Kompas: Regsosek untuk Perencanaan Pembangunan Nasional yang Lebih Baik" (25 Jun 2024). Descriptions of the last two: `[Deskripsi siniar]` (not available as verbatim text). Thumbnails are placeholders.
- **YouTube IDs are missing:** none of the three episode pages exposes a video ID and web search did not find them. (A candidate from the homepage banner, `mDFD65cRKA0`, was checked via oEmbed and is a different SKALA video, so it is **not** used.) Until the IDs are filled into `data-yt` on each `.ep` button, pressing play shows "Video siniar ini belum tersedia di prototipe" with a button to the episode page on skala.or.id (new tab). Tested end-to-end with a verified ID: the iframe loads, and switching episodes stops it.
- Verified: axe clean (section + full page at 1440/768/375), keyboard (Enter on an episode), spacing 1.5×, fonts on scale, other sections unchanged.

## 4q. Change 2026-11-12 — footer rebuilt, 2nd iteration (user request, reference: light "Nietzsche" footer card; replaces the dark version)
- **Look (revised 2026-11-12, user request: plain white, no gradient):** simple, seamless, elegant. The footer is **one big rounded card** (40 px radius), **plain white `#fff`, no gradient, no glass/blur, no nested panel** — a single soft shadow is its only elevation, and a hairline separates the CTA from the rest. The earlier pastel gradient and the frosted inner panel were removed (the watermark's fade mask too). Inside it: **centered CTA** — headline 32/40/48 px "Mari bergabung dan jadi bagian dari jaringan berbagi pengetahuan.", a 14 px line, and two pill buttons (teal "Ikuti Kanal WhatsApp ↗" opening the channel in a new tab, white "Pusat Pengetahuan") — then a **frosted glass panel** (74 % white, blur, 28 px radius) with: SKALA logo (left) · partner logos "Kemitraan bersama" (right, co-branding kept) → **newsletter** on the left (heading, pill email field with a navy "Berlangganan" pill button, consent note with a Kebijakan Privasi link) + **four link columns** on the right (Tentang SKALA · Program & dampak · Pengetahuan & media · Peluang; 12 px grey headings, 16 px links, all URLs from the sitemap) → hairline → centered address + email, © line, legal links.
- **Watermark:** the SKALA logo at 5.5 % opacity, cropped at the bottom edge of the card (no fade) (kept from the earlier request, deliberately subtle).
- Newsletter form: sr-only label, `type=email`, client-side validation with an `aria-live` status; the prototype sends nothing. The consent sentence is UX copy to be approved by the client/legal (UU PDP).
- Responsive: ≥ 1024 newsletter + 4 columns side by side; 768–1023 four columns under the newsletter; < 768 two columns, logo + partner logos stacked. Checked 320–1920 px: no overflow (the email field once widened the mobile grid, now `minmax(0,1fr)`).
- Verified: axe has no violations on the footer or the whole page (translucent backgrounds are reported as "incomplete" — contrast was checked by hand: text is #111 / #444 / #5A6B80 on a near-white panel, ≥ 5:1), fonts on scale, other sections unchanged. No social links (no URLs known).

## 4r. Change 2026-11-12 — real photography replaces the placeholders (user request: complete visual assets)
- **Sources (researched, not stock-generic):** (1) **SKALA's own documentation from skala.or.id** — five activity photos (Papua Barat Daya, Papua Selatan, NTB, SEKAR Inklusif, Local Tax Ratio), three publication covers, three siniar covers, three speaker portraits; (2) **openly licensed photos from Wikimedia Commons** (CC BY / CC BY-SA / public domain; NC and ND licences were filtered out): landscapes of NTT, NTB and Papua Pegunungan for the hero and province panels, DFAT/AusAID and USAID archive photos for the partnership and service themes. Unsplash and Pexels could not be queried from here (login/blocking), so they were not used.
- **Where:** hero (5 slides, real photos; they act as video posters and the video overrides when `data-video` is set) · Tentang Kami (Indonesia–Australia programme works photo) · Tujuan carousel (posyandu, Papua Selatan launch, women's training) and the 4 accordion thumbnails · EOPO columns Pusat / Daerah / Warga (national panel, NTB regional launch, posyandu) · Informasi Kegiatan (featured + 4 rows, all real) · Publikasi (real covers) · Siniar (real covers + player poster, switches per episode) · Suara mitra (the three speakers' real portraits) · province panel and `/wilayah/` cards (**only 6 of 12 provinces have a photo with accurate context; the other 6 keep the placeholder on purpose — no mismatched picture**).
- **Selection rules applied:** photos that document real SKALA events or the real place; no stereotyped or exploitative imagery; no watermark; no repeated photo without a visual reason (a few client photos appear in both a thumbnail and a larger slot, listed in `kredit-foto.html`); the Wamena hero was re-cropped to remove vehicles and passers-by.
- **Technical:** WebP only (70 files, 3–4 widths each; ≈ 6.7 MB in the folder but a page loads one width per photo via `srcset`/`sizes`); `loading="lazy"` except the first hero image (`fetchpriority="high"`); every `<img>` has `width`/`height` (no layout shift), `object-fit:cover` with a per-photo `--op` object-position, and descriptive Indonesian alt text (decorative duplicates have `alt=""`). Checked: 38 images on the homepage, 0 broken, 0 HTTP errors, no horizontal overflow, axe clean on every page.
- **Licence compliance:** `kredit-foto.html` (linked from every footer: "Kredit foto") lists author, licence and source for each openly licensed photo, plus `docs/content/kredit-foto.md`. CC BY-SA photos are cropped/resized, so derivatives stay CC BY-SA.
- **NOT RESOLVED — needs the client before launch:** (a) **written permission to reuse** the skala.or.id photos, covers and the three speakers' portraits (they are SKALA's/partners' and show identifiable people — consent for the portraits must be confirmed); (b) the **DFAT and USAID archive photos** (Tentang Kami, Tujuan, EOPO "Warga") are real but **not SKALA activities** — replace them with SKALA's own photography as soon as the client supplies it; (c) the three speaker portraits are small (247–500 px), fine at 56 px but not reusable larger; (d) hero videos remain pending (the photos are poster fallbacks).
- Supported by what could **not** be found: no free, correctly licensed photos of SKALA's actual Papua field activities (education, health) exist online, so Papua is represented by place photography and SKALA's own event photos, not by community-life images — fabricating or mismatching those would have been worse.

## 4s. Change 2026-11-12 — scrolled header: solid white + full-colour logo (user request)
- The bar that replaces the transparent pill header after 80 px of scroll was 80 % translucent with a blur, so it took on the colour of whatever photo was behind it (grey, blue-ish). It is now **plain white `#fff`**, no blur, with a soft shadow.
- Its centre now shows the **full-colour SKALA logo** (`skala-logo.png`, 36 px high; 30 px < 640 px) instead of only the spiral mark. Alt text: "SKALA — Sinergi dan Kolaborasi untuk Akselerasi Layanan Dasar, beranda". The top-of-page header (dark pill, white logo over the hero) is unchanged.
- Mobile: columns are symmetric (`minmax(0,1fr) auto minmax(0,1fr)`) so the logo is exactly centred at 320–414 px; below 360 px the word "MENU" is visually hidden (still read by screen readers) to avoid touching the logo.

## 4t. Change 2026-11-12 — scrolled header keeps the pill layout (user request; refines 4s)
- **≥ 1280 px:** after scrolling, the header keeps the layout the user chose — **logo · pill menu (Tentang • Program • Dampak • Wilayah • Pengetahuan • Kabar • Peluang) · ID ⌄ · cari · menu** — but as a **plain white bar** (72 px, 10 px radius, soft shadow) with the **full-colour logo**. The pill turns light (`--mist` with a hairline), links are `#111`. Contrast of the links is 18.9:1 on white and 16.1:1 on the pill, independent of what is behind the bar (checked over the hero photo, the dark map section, the light news section and the footer).
- The burger (drawer with all sub-menus) is shown again in this state, since the old MENU bar is hidden at this width; opening it, closing with Esc and focus return were tested. Search and the language dropdown (now 220 px wide, no wrapping) work on the white bar; focus returns to the right button.
- **< 1280 px:** the pill does not fit, so the white bar from 4s stays (MENU · colour logo · "Pusat Pengetahuan" button).
- **Revised (user: "not seamless"):** the white bar is now **flat and full-bleed** (no rounded corners, no drop shadow, only a 1 px hairline below) and the **pill box was removed in the scrolled state** — the menu sits directly on the white, no fill, no outline, so there is no box inside a box. **Spacing between menu items = 28 px** (dot 4 + 12 + 12; read from "dibuat 28 pc", assumed to mean px — confirm). Same flat/full-bleed treatment for the < 1280 px bar.
- The transparent header at the top of the page (dark pill, white logo) is unchanged except for the 28 px spacing, which is shared.
- Verified: pill, logo and utility do not collide at 1280 and 1366 px; axe clean on the header; no overflow.

## 4u. Change 2026-11-12 — scrolled header = floating rounded bar (user reference "Conxera"; replaces the flat full-bleed bar of 4t)
- After 80 px of scroll the header becomes a **white bar floating 8 px from the top and 24 px from the sides** (12 px on phones), **fully rounded (pill)**, with one soft shadow (`0 8px 30px rgba(11,31,56,.12)`) and nothing else. The space around it does not block clicks (`pointer-events` pass through; checked).
- **≥ 1280 px:** colour logo left · menu centre (Tentang Program Dampak Wilayah Pengetahuan Kabar Peluang; **28 px between items, no dots**, hover/active = teal `#00756F`) · right: **ID ⌄**, search, a **teal pill button "Pusat Pengetahuan ↗"** (the reference's "Log in + trial" role; ink text on teal, 5.95:1) and the burger for the full drawer. Fits at 1280 / 1366 / 1440 (gaps ≥ 16 px). The bar animates from the transparent top header (inset, padding, radius, shadow ease over 0.6 s).
- **< 1280 px:** same floating pill with MENU · colour logo (exactly centred) · the same teal button (hidden < 640 px).
- The CTA button style (pill, sentence case, 44 px, circular arrow) replaces the old square uppercase one.
- Reference shows one active menu item; the homepage has no matching item, so none is highlighted. Set `aria-current="page"` on the link of the current page (styled teal) when the other pages share this header.
- Verified: drawer open/Esc/focus return, search and language, hover states, top-of-page state unchanged, axe clean, no overflow, other sections unchanged.

**Top offset 40 px (user: "berikan padding 40 px di atas agar tidak terlalu nempel"):** at ≥ 1024 px the floating white bar now sits **40 px from the top of the screen** (was 8 px) — token `--bar-top`; below 1024 px it stays 8 px (a 40 px gap on a phone would waste the screen). The bar's bottom edge is therefore at 96 px, exposed as `--top-clear` (96 px ≥ 1024 px, = `--header-h` below). Sections that stick to the top of the screen use it so the lower bar never covers their content: the pinned map section (eyebrow now at ≈ 134 px, body height `100svh − 164 − top-clear`), the podcast section (top padding and the player-width formula use it; on screens shorter than 860 px the caption is limited to 3 lines and the top padding is 8 px tighter so the section still fits one screen: 900 px at 1440×900 and 812 px at 1440×812), the search panel (opens at 104 px). The `#siniar` anchor and sticky figures were checked unchanged. Province zoom while the map is locked: dot within 9 px of the free-area centre at 1440×900, 1440×812, 1280×720 and 1920×1080.

**Inner padding 40 px (user: "kasih padding 40px", screenshot of the scrolled bar):** the floating white bar now has 40 px of padding on the left and right inside its rounded ends — logo 40 px from the left edge, "ID ⌄" 40 px from the right edge, menu still exactly centred (≥ 1280 px). Below 1280 px (MENU · logo bar) at ≥ 640 px the MENU button also sits 40 px from the bar edge (24 px bar padding + 16 px button padding); phones keep 24 px so the logo does not collide with MENU. The bar's distance from the screen edge (24 px) is unchanged — say so if the 40 px was meant for that instead.

**Removed 2026-11-12 (user: "dihapus saja", screenshots of the search icon and of the search · "Pusat Pengetahuan" · burger cluster):** the **search icon** (top and scrolled states, all widths), the **"Pusat Pengetahuan" pill button** (scrolled bar, all widths) and the **burger in the scrolled desktop header**. Desktop header is now logo · menu · ID ⌄ in both states. Kept on purpose: the burger at the top of the page below 1280 px (the only way to the menu on phones/tablets) and the MENU button in the scrolled bar below 1280 px. Search is now reachable only from inside the drawer (< 1280 px); on desktop the drawer has no trigger any more — tell me if the sub-menus or search should come back (e.g. a search icon in the drawer-less desktop header). Dead CSS/JS for the removed elements was deleted.

## 4v. Change 2026-11-12 — province panel: photos for all 12, dummy stats/programmes, 14 px (user request)
- **All 12 provinces now have a photo with accurate context** (before: 6; the other 6 showed an empty placeholder): Aceh (aerial view of Kota Singkil), Kalimantan Utara (Baloy Mayo Tidung traditional house), Gorontalo (boats on Lake Limboto), Papua Barat (Syornabo beach, Mansinam, Manokwari), Papua Tengah (Cartenz peaks), Papua (Youtefa bridge, Jayapura). Source: Wikimedia Commons, CC BY / CC BY-SA, all listed in `kredit-foto.html`. They are **place photos**, not SKALA activities — replace them with SKALA's own province photography when the client provides it (H-033).
- **Dummy data on request:** stats (Kab/kota mitra, Program aktif, Tahun mulai, Mitra pemda) and 3 programme chips per province are now **dummy** values (`assets/data/provinsi.js`, flagged `dummy:true` on each province, comment at the top of the block). The programme chips use SKALA's real theme names (Standar Pelayanan Minimal, Data dan sistem informasi, Perencanaan dan penganggaran, Partisipasi warga, Koordinasi pembinaan dan pengawasan, Kesetaraan gender dan inklusi sosial) but their assignment to provinces is invented. **Must be replaced with client data before launch**; the numbers also show on `/wilayah/<slug>/`. Partner regencies, stories and publications are still `[placeholder]`.
- **Type:** stat values and programme chips are **14 px** (stat labels stay 12 px).
- Fixed on the way: header utility buttons could shrink (`flex:none`).

## 4w. Change 2026-11-12 — footer rebuilt to match the "Sinar Mas Land" reference (user: "dibuat sama persis"; replaces 4q)
- **Structure copied from the reference:** (1) a **58 px teal band** (brand colour instead of the reference's red) with a **white logo tab on the right** that rises 18 px above the band and has the folded darker corner on its left edge; (2) a **plain `#FAFAFA` section with a faint spiral dot field in two corners** (see below), no gradients; (3) **left column:** "SKALA" (24 px bold), address, "Hubungi Kami" + e-mail, a two-line prompt and a **teal pill button "Kirim Pesan ✉"**; (4) **right columns:** "Jelajahi" (10 links in two sub-columns), "Publikasi", "Peluang" and, under it, "Ikuti Kami" with round black icon buttons; (5) a **dark navy bottom bar** with © line on the left and legal links on the right.
- **Decoration changed (user: the concentric rings "jelek"):** the rings were cut off in straight lines at the edge of their SVG box. Replaced by a **spiral dot field** (golden-angle phyllotaxis, 379 dots, navy and teal like the logo's dots, dense and large in the corner and shrinking outward, 16 % opacity) in the top-right and bottom-left corners — the same motif as the SKALA mark, so it reads as brand pattern rather than generic ornament. Drawn once as an SVG `<symbol>` and reused twice; it is clipped only by the footer edge. Bug found while building it: the outer `viewBox` did not match the symbol's, which pushed the dense core outside the visible area.
- **Adapted, not copied:** all brand names, wording and links are SKALA's (sitemap URLs). Colours use SKALA's palette; the button text is ink on teal (5.95:1) because white on teal fails AA. The decoration is SKALA's own dot motif.
- **Kept because the client rules require it:** the co-branding logos (Kemenkeu, Kemendagri, Bappenas, Australian Government) — placed under the button in the left column as "Kemitraan bersama" (the reference has no equivalent), and the "Kredit foto" link in the bottom bar.
- **Even spacing (user: "paddingnya lebih sejajar dan sama rata"):** measured first — gaps between link columns were 32 px inside "Jelajahi", 71–72 px between the other columns and 104 px on tablet, and the section padding was 80 px on top vs 96 px at the bottom (147 px at 1024). Now: **≥ 1280 px four equal-width columns with a 32 px gap** (Jelajahi spans columns 1–2 and its two sub-columns sit exactly on them, Publikasi = column 3, Peluang = column 4; the text-to-text pitch is identical, 174 px at 1440). **768–1279 px:** auto-width columns with one gap of 36 px everywhere, left-aligned. **Padding top = bottom** (88 px ≥ 1024, 72 px below). Verified at 1920 / 1440 / 1280 / 1024 / 768 (gaps and paddings identical on both sides; Kemitraan bersama and Ikuti Kami still on one row).
- **Bottom bar removed (user: "ini dihapus saja", screenshot of the dark © + legal bar):** the navy bar with "© 2026 SKALA. SKALA dikelola oleh DT Global." and the links Aksesibilitas · Kebijakan Privasi · Pengadaan · Kredit foto is gone (markup, CSS and the year script). **Consequence:** the page that credits the CC-licensed photographers (`kredit-foto.html`) now has **no link from the homepage**, and the accessibility / privacy / procurement links have no entry point either. CC BY / CC BY-SA require attribution, so a link to the credits page must exist somewhere before launch (e.g. a line in the drawer menu or a small text link at the end of the footer). Pengadaan is still reachable under "Peluang".
- **Placement (user: align with "Ikuti Kami"):** "Kemitraan bersama" moved from the left column to the right link grid, as the **second grid row spanning columns 1–2 (under Jelajahi/Publikasi), on the same row as "Ikuti Kami"** (column 3). Both share one grid row, so their headings are on exactly the same line at every width ≥ 768 px (measured 768 / 1024 / 1280 / 1440 / 1920: identical top). On phones they stack (Kemitraan, then Ikuti Kami). "Ikuti Kami" was taken out of the Peluang list so it no longer depends on that list's height. A CSS specificity bug (`.fcol ul` overriding `.plogos`) briefly stacked the logos vertically; fixed.
- **Partner logos shown one by one (user request):** the footer now uses the four separate files (`logo-kemenkeu/kemendagri/bappenas/australian-government.png`, 60 px high, 20 px gaps, each with its own alt text) instead of the combined `partner-logos.png` in a white box. The files have a white background, so they are blended into the `#FAFAFA` footer with `mix-blend-mode:multiply` (this needs the parent not to form a stacking context — `.fgrid` no longer has `z-index`). One row at ≥ 1280 and 768–1023 px, two rows at 1024–1279 and on phones. The other inner pages (`wilayah.html`, `wilayah-provinsi.html`, `kredit-foto.html`) still use the combined image in their simple dark footer; switch them if you want the same treatment. Vector (SVG) logos are still wanted from the client (H-028): these PNGs are only 140 px high, which is fine at 60 px.
- **Removed (not in the reference):** the centered CTA card, the newsletter form (and its validation script), the logo watermark, and the "Kontak" address block split.
- **Not copied:** the reference's floating "FEEDBACK" tab and the floating WhatsApp button "Info Promosi" (page-level widgets, not part of the footer).
- **Follow Us:** skala.or.id lists no Instagram / X / Facebook / LinkedIn / YouTube-channel / TikTok profile, only the **WhatsApp channel** — so only that icon is shown; other icons are to be added when the client provides the URLs (BACKLOG H-033). No phone number is shown (none is published).
- Responsive: ≥ 1024 two blocks side by side; 768–1023 left block over four link columns; < 768 single left block, link columns in two. No overflow from 320 to 1920 px; no gradient or blur anywhere in the footer.
- Verified: axe has no violations (page + footer; contrast "incomplete" is only the ring decoration under text, checked by hand: #111 / #444 on #FAFAFA, white on navy), fonts on scale, other sections unchanged.

## 4x. Change 2026-11-12 — loading screen (user request, reference: hunthire2.vercel.app; replaces the 1.3 s "SKALA" intro)
- **Pattern taken from the reference:** full-screen brand-colour screen → tone-on-tone shapes appear across the screen → centred wordmark → small counter 0 → 100 at the bottom → the screen lifts up like a curtain and the hero headline enters. **SKALA's version:** teal background; the shapes are the **spiral dots of the SKALA mark** (golden-angle field generated for the screen size, navy and white at low opacity, appearing from the centre outward in step with the counter); **the official SKALA logo** (white version `skala-logo-white.png`, 240 / 360 px wide — the colour logo would vanish on teal; it already contains the tagline) revealed left → right with a clip-path wipe, mark first then wordmark (user request: "pakai logo dari skala"); counter + 120 px progress line (ink on teal, 5.95:1).
- **Timing:** counter eases 0 → 100 in 1.9 s, waits for `window.load` up to 3.2 s, then the curtain rises in 1 s (`cubic-bezier(.76,0,.24,1)`); the hero slider/headline start 0.38 s into the lift (event `skala:introdone`), not behind the loader. Total ≈ 2.3 s to the curtain.
- **Rules:** once per browser session (sessionStorage); **`index.html?intro`** forces it again (for review/testing); any click or key skips it; scroll is locked only while it covers the page, with a 5 s fail-safe; not shown with `prefers-reduced-motion`; `aria-hidden` (decorative). The hero photo loads underneath, so LCP is not blocked by downloads; note the loader still delays the *visible* first paint of the hero by ~2.3 s on the first visit — keep it short, or drop it on repeat visits as done here.
- **Also fixed:** the homepage was renamed to `index.html`, which broke every link to `skala-beranda-v2.html` (nav/footer/back links in `wilayah.html`, `wilayah-provinsi.html`, `kredit-foto.html`, `provinsi.js`, `situs.css`, and two in the homepage itself). All repointed.

## 5. Open items for the client
1. Official typeface (if any) vs. Archivo proposal.
2. Photo library with consent, plus vector partner logos (current ones are cropped from a 1280 px image).
3. Confirmation of numbers "hingga AUD 160 juta" and "8 tahun" (given by the user, not visible on the live homepage).
4. Province highlight texts are copied from the live map; confirm they are still current.
7. Siniar: the YouTube video ID of each of the 3 episodes (or the hosting they want), thumbnails/cover art, and descriptions for "Menerobos Batas" and the Regsosek episode.
6. Informasi & publikasi: photos per item, dates for the activity items, excerpts if wanted, more than 3 publications (the live homepage lists only 3), and whether the system-data chips should stay on the homepage.
5. Wilayah kerja: per-province summary (6 Papua provinces), stats, focus areas, partner regencies, stories, publications, photos; confirm pin coordinates and the label "Lokasi intervensi tambahan".
