# Reference Audit: The Asia Foundation (asiafoundation.org)

- **Audited:** 2026-11-16, in Chrome through browser inspection (computed styles read from the live DOM).
- **Pages inspected:** Homepage (`/`) and one internal page (`/what-we-do/advance-responsive-and-effective-public-policies-and-institutions/`).
- **Purpose:** Evidence for the SKALA design system. This audit records what the reference does and separates what was **measured** from what is **estimated**. It does not prescribe SKALA values; see `docs/DESIGN_DIRECTION.md` (to be written) for that.
- **Status of earlier direction:** `docs/02-design-direction.md` (SKALA × Davaris, Archivo + teal/navy) already exists. The brief behind this audit names a different reference and a different type pairing. Both cannot be the source of truth. See §10, decision needed.

Legend: **[M]** measured from the live site · **[E]** estimate or inference · **[?]** could not be verified.

---

## 1. Method and limits

| Item | Detail |
| --- | --- |
| Tooling | Claude in Chrome. `getComputedStyle` and `getBoundingClientRect` on rendered elements, plus screenshots at 0.5 scale. |
| Desktop viewport | 1440 px wide (`innerWidth` = 1440). |
| Small viewport | **606 px**, not 390 px. Chrome would not shrink the window below 606 px, so true phone width (360–430 px) is **[?]**. The 606 px values below show the layout between tablet and phone only. |
| Intermediate sample | Some headings were also read at 960 px, which exposes how the type scales. |
| Not inspected | Hover and focus states, scroll animations, page transitions, the mega-menu or mobile menu, forms beyond the footer, any page other than the two above, and the site's CSS source. |
| Fonts | Font **names** come from computed `font-family`. Licensing and file sources were not checked. |
| Authenticity | Colour values are computed `rgb()` values. Anything named "estimate" is judged from screenshots. |

---

## 2. Typography

### 2.1 Families [M]

| Role | Family | Notes |
| --- | --- | --- |
| Display and headings | **Sentinel** | Serif (Hoefler & Co., commercial). Weight **300** (light) everywhere. Italic is used for emphasis in the hero ("*Future of Work*"). |
| Body, UI, labels, nav, buttons | **F37 Blanka Trial** | Geometric sans (F37 Foundry). The computed name carries "Trial", so the live site is likely running a trial licence. Weights seen: 300, 400, 600, 700. |

Both are commercial. Neither can be used on SKALA without a licence.

### 2.2 Scale at 1440 px [M]

| Element | Family | Size | Line height | Tracking | Weight | Case |
| --- | --- | --- | --- | --- | --- | --- |
| Hero H1 (homepage) | Sentinel | 150 px | 150 px (1.0) | −6 px (−0.04em) | 300 | sentence |
| H1 (internal page) | Sentinel | 100 px | 110 px (1.1) | −4 px (−0.04em) | 300 | sentence |
| Section H2, large ("Latest Thinking") | Sentinel | 100 px | 110 px (1.1) | −4 px | 300 | sentence |
| Statement H2 (homepage intro) | Sentinel | 55 px | 55 px (1.0) | −2.2 px (−0.04em) | 300 | sentence |
| H2 feature title ("Let's Read…") | Sentinel | 50 px | 57.5 px (1.15) | −2 px | 300 | sentence |
| H3 impact area title | Sentinel | 45 px | 51.75 px (1.15) | −1.8 px | 300 | sentence |
| H4 pull statement (internal) | Sentinel | 40 px | 46 px (1.15) | −1.6 px | 300 | sentence |
| H3 story card, large | Sentinel | 27 px | 31 px (1.15) | −1.08 px | 300 | sentence |
| H3 story card, small | Sentinel | 25 px | 28.75 px (1.15) | −0.5 px | 300 | sentence |
| Intro paragraph (serif) | Sentinel | 25 px | 28.75 px (1.15) | n/a | 300 | sentence |
| Body paragraph | F37 Blanka | **20 px** | **30 px (1.5)** | n/a | 300 | sentence |
| Section label (H2/H3/H4 as eyebrow) | F37 Blanka | 15 px | 18 px | +1.35 px (+0.09em) | 600 | UPPERCASE |
| Navigation | F37 Blanka | 12 px | n/a | +1.08 px (+0.09em) | 400 | UPPERCASE |
| Button / "Read more" | F37 Blanka | 12 px | n/a | +1.08 px (+0.09em) | 600 | UPPERCASE |
| Footer link | F37 Blanka | 16 px | 20.8 px (1.3) | −0.32 px | 400 | sentence |
| Form label | F37 Blanka | 14 px | 15.4 px | normal | 700 | sentence |

Patterns:
- **Tracking is proportional**: headings use −0.04em, labels and nav use +0.09em. This is a rule, not a one-off.
- Heading line-height is **1.0 to 1.15**. Body is **1.5**.
- Only **two weights carry the design**: 300 for everything large, 600 for small uppercase labels and buttons.
- Semantic tags are reused for style: `h2`, `h3` and `h4` appear both as huge serif headings and as 15 px uppercase eyebrows. The look comes from classes, not tag levels. SKALA should not copy that, because it hurts accessibility.

### 2.3 Fluid behaviour [M, three samples]

Display sizes scale with the viewport:

| Element | 606 px | 960 px | 1440 px |
| --- | --- | --- | --- |
| Hero H1 | 80 px | 100 px | 150 px |
| Large H2 ("Latest Thinking") | 55 px | 70 px | 100 px |
| Statement H2 | 32 px | 55 px | 55 px |
| H3 impact title | 32 px | n/a | 45 px |
| Story H3 (large) | 27 px | 27 px | 27 px |
| Body | 16 px | n/a | 20 px |

Reading: **[E]** the display sizes are fluid (probably `clamp()` or viewport units); card titles and labels are fixed. Body goes from 16 px to 20 px.

---

## 3. Layout

### 3.1 Container and gutters [M]

| Zone | Measured |
| --- | --- |
| Header gutter | **40 px** each side (logo starts at x = 40, nav ends ~40 px from the right edge). |
| Main content (images, grids, H1) | Left edge at **x = 60**, width **1320** (→ 60 px gutters at 1440 px). |
| Narrow editorial column | **984 px** wide, left edge x = 228 (centred: (1440 − 984) / 2 = 228). Used for statements, labels and pull quotes. |
| Reading column (body paragraphs) | **656 px** wide (x = 556) in the internal page; **567 to 648 px** in two-column rows. |
| Small viewport (606 px) | Gutter **20 px** (paragraph and logo at x = 20). |

So the site uses **three widths**: wide (1320), narrow (984), reading (about 650). Content is **not** limited to one container.

### 3.2 Section spacing [M]

Vertical padding on homepage sections, desktop:

| Section | Padding top / bottom | Height |
| --- | --- | --- |
| Hero (full viewport) | 0 / 79 px | 727 px (= viewport, `h-screen`, min 600 px) |
| Intro statement + image | 0 / 0 (content sets height) | 841 px |
| Featured programme band | 40 / 40 px | 694 px |
| "Four impact areas" | **150 / 150** px | 1329 px |
| Beige section (stories) | **180 / 180** px | 2451 px |
| Second feature band | 40 / 40 px | 648 px |
| Latest Thinking | **150 / 75** px | 693 px |
| Footer | 60 / 20 px | 956 px |

Small viewport (606 px): the same sections drop to **100 / 100** (impact areas), **80 / 80** (beige), **40 / 40** (bands) and **100 / 50** (Latest Thinking).

Classes show a Tailwind-style spacing scale on a 4 px unit (for example `py-37.5` = 150 px, `py-45` = 180 px, `py-10` = 40 px).

### 3.3 Header [M]

- Sticky, **71 px** tall at desktop (62 px at 606 px), transparent over the hero, white logo left (228 × 25 px wordmark), uppercase nav and a search icon right.
- Nav: five links at 12 px / 400 / uppercase / +0.09em (What We Do · Where We Work · Our Insights · Stories & News · About Us).
- Z-index set to the maximum.
- Nav-link gaps are about 40 px **[E, from x positions 775 → 890 → 1034 → 1157 → 1295]**.

### 3.3a Footer [M]

- Solid magenta `rgb(163, 35, 137)` (`#A32389`), 956 px tall, padding 60 px top and 20 px bottom.
- Two columns: "Quick Links" (white text links at 16 px) and a newsletter form (labels 14 px bold, white inputs, black "Subscribe" button).
- No giant wordmark, no imagery.

---

## 4. Grids and structure

Measured from element positions at 1440 px **[M positions, E for grid logic]**:

| Block | Structure |
| --- | --- |
| Hero | Full-bleed image or video, headline at bottom-left in white, one outlined button below. Slider arrows bottom-right. |
| Intro | Two columns: text left (about 618 px wide), image right (618 × 541, ratio 1.14) set on an orange-and-purple striped graphic panel. |
| Featured programme | Full-bleed photo with a **white card overlapping from the left** (about 650 px wide) holding label, title and button. |
| Impact areas | Centred narrow intro (984 px), then a **2 × 2 grid** of images, each about 660 × 387 (ratio 1.70), gap about 0 to 1 px horizontally, 388 px rows (images butt against each other). Title and "Explore" button over each image. |
| Stories (beige section) | White cards on beige, two per row, uneven widths (card A narrower, card B wider). Card = image + label "NEWS" + serif title + "READ MORE". |
| Latest Thinking | Four image tiles in a row, each **311 × 207** (ratio 1.50), x = 60 / 397 / 733 / 1070 → pitch of about 336 px, so a gap of about 25 px. |
| Internal page | Hero (727 px) → large H1 (x = 60) → narrow pull statement (984) → 2 paragraph columns (656) → feature rows with 567 / 472 px columns → "Featured Programs" label + 423 px cards → footer. |

---

## 5. Imagery

- Hero and feature photos are **documentary, people-led and full-colour**. Faces and hands are visible.
- Ratios seen **[M]**: hero 1.98 (full viewport), 1.70 (impact tiles), 1.50 (story and latest-thinking tiles), 1.14 (intro image), roughly 0.67 to 0.72 (portrait, stacked layout in the beige section).
- **Border radius: 0 px on every image.** `object-fit: cover` throughout.
- The orange-and-purple diagonal stripe panel behind the intro image is a brand graphic device, not a photo effect.
- Cover images for publications are shown as-is (including text on the cover), with no crop treatment **[E]**.

---

## 6. Colour [M, from computed styles; usage frequency from DOM count]

| Role | Value | Use |
| --- | --- | --- |
| Page background | `#FFFFFF` | Most sections |
| Alternate section | **`rgb(242, 235, 218)` = `#F2EBDA`** (warm beige) | Stories and Latest Thinking background |
| Text | `#000000` (235 elements) | All body and headings on light |
| Text on dark | `#FFFFFF` (98 elements) | Hero, footer |
| Muted | `rgb(168, 168, 168)` = `#A8A8A8` | Small labels (e.g. "NEWS") |
| Footer / accent | **`rgb(163, 35, 137)` = `#A32389`** (magenta) | Footer background |
| Image overlay | `oklab(0 0 0 / 0.45)` (black at 45%) | Hero scrim |
| Brand graphic | Orange and purple stripes | Intro image panel (seen in screenshot, not measured) |

Observations:
- **Black on white with one warm tint and one saturated accent.** The accent appears only in the footer and brand art, not in buttons or links.
- Links and buttons are black or white; no coloured link states were seen.
- No gradients or drop shadows are visible in the screenshots **[E]**. The computed `box-shadow` was only read on image elements (none), not on the white story cards.

---

## 7. Components

### 7.1 Buttons [M]
- Class `btn-border`: **transparent fill, 1 px solid border** (white on dark, black on light), **0 px radius**.
- Type: F37 Blanka 12 px / 600 / uppercase / +0.09em.
- Padding **15 px × 30 px**, height **45 px**.
- Used as "Explore …", "Learn About Us", "Read More". Newsletter "Subscribe" is the only solid button (black fill, white text).

### 7.2 Cards [E, from screenshots; computed card styles were not captured]
- White rectangle, **square corners, no visible shadow or border**, sitting on the beige section.
- Order: image on top (or left) → grey uppercase category label (about 10 to 12 px) → serif title (25 to 27 px) → "READ MORE" text button at the bottom.
- Card padding about 10 px around the image and 10 to 20 px around text **[E, from screenshots]**.

### 7.3 Section labels
- Small uppercase 15 px / 600 / +0.09em eyebrow above or beside a section ("OUR FOUR IMPACT AREAS", "FEATURED PROGRAM", "FEATURED PROGRAMS"). Centred on the homepage, left-aligned inside narrow columns.

### 7.4 Navigation and footer
See §3.3 and §3.3a.

### 7.5 Statistics, partner logos
- **Not found** on the homepage or the internal page inspected. Do not assume the reference has a stats strip or a logo wall.

---

## 8. Responsive behaviour [M at 606 px, E beyond]

| Aspect | 1440 px | 606 px |
| --- | --- | --- |
| Side gutter | 60 px (header 40 px) | 20 px |
| Header height | 71 px | 62 px |
| Hero H1 | 150 px | 80 px |
| Large H2 | 100 px | 55 px |
| Statement H2 | 55 px | 32 px |
| Body | 20 px / 30 px | 16 px / 20.8 px |
| Section padding | 150 to 180 px | 80 to 100 px |
| Story cards | two per row, uneven | single column (full width) |
| Horizontal scroll | none | **none** (`scrollWidth` = 606) |

The layout stacks to one column and keeps the serif display style. Behaviour below 606 px is **[?]**.

---

## 9. Verified vs estimated summary

| Verified [M] | Estimated or unknown [E / ?] |
| --- | --- |
| Font families, sizes, line heights, tracking, weights at 1440 and 606 px | Exact breakpoints and the `clamp()` formulas behind the fluid sizes |
| Gutters (60 / 40 / 20 px), column widths (1320 / 984 / ~650 px) | Behaviour at true phone widths (360 to 430 px) |
| Section paddings, header and footer heights | Hover, focus and active states; motion |
| Image ratios and zero radius | Card inner padding |
| Button geometry and type | Mega-menu and mobile menu design |
| Colours listed in §6 | Colour of the brand stripe graphic |
| Zero radius on images | Card styles (radius, shadow, padding), read from screenshots only |
|  | Any template other than the two pages visited |

---

## 10. Implications for the SKALA brief (observations, not decisions)

The initial recommendations in the brief differ from what the reference does. These are the main gaps:

| Brief says | Reference does | Consequence for SKALA |
| --- | --- | --- |
| Headings in **Manrope 800 / 700 / 600** (heavy sans) | Headings in a **light (300) serif** with tight negative tracking | The "modern editorial" feel here comes from **contrast of serif display + geometric sans UI**, not from heavy sans headings. A light serif (a free one, since Sentinel is licensed) or a sharper sans at lighter weight would be closer. Needs a design decision. |
| H1 56 px, hero 64 to 76 px | 100 to 150 px display at 1440 px | Brief sizes are about half the reference's drama. Larger sizes are possible but long Indonesian headlines need more room. |
| Body 17 px, line-height 1.6 to 1.75 | Body 20 px at 1.5 | Reference body is larger and tighter. 17 px / 1.6 is still readable; consider 18 px. |
| Container 1280 px, gutter 64 px | **1320 px wide, 60 px gutter**, plus **984 px and ~650 px** columns | Close on the wide container. The narrow and reading widths are what make it feel editorial, so define all three. |
| Section spacing 112 px | **150 to 180 px** on large sections, 40 px on image bands | Reference is more generous. 112 px is a safe floor. |
| Border-radius not specified; "avoid excessive rounded cards" | **0 px radius everywhere** | Square corners fit the reference; SKALA can choose a small radius but should not round by default. |
| Shadows "avoid excessive" | **None** | Use none. |
| Buttons 15 px / 600 | Outline buttons, **12 px uppercase, +0.09em, square** | Reference button is smaller and outlined. |
| Navigation 15 px / 600 | **12 px / 400 uppercase** | Reference nav is smaller and lighter. |
| Statistics, partner logo section | **Not present** on the pages audited | These blocks come from the SKALA brief, not the reference. They need their own design. |
| Footer | Flat magenta band with links and newsletter form | Footer reference is plain. SKALA needs co-branding logos in the footer (CLAUDE.md §4). |
| Colours | White, beige `#F2EBDA`, black, magenta `#A32389` | Not transferable. SKALA's palette (teal `#0EADA5`, navy `#163559`) already exists in `docs/02-design-direction.md`. The brief says not to invent brand colours. |

### Decision needed
`docs/02-design-direction.md` (v1, 2026-11-11) already fixes **Davaris** as the visual reference, **Archivo / IBM Plex Mono** as type and **teal + navy** as colours. The new brief asks for **Asia Foundation** as the reference and **Manrope + Plus Jakarta Sans** as type. Before writing `DESIGN_DIRECTION.md` and the token files, confirm which one is current. Options: (a) replace the Davaris direction, (b) keep Davaris for motion and use Asia Foundation for layout and typography proportions, (c) keep the current direction and use this audit only as supporting evidence.

---

## 11. Suggested next step

1. Confirm the direction above.
2. Write `docs/DESIGN_DIRECTION.md` with SKALA values and a short list of deviations from this audit.
3. Write `src/styles/tokens.css` and `globals.css` (map into Tailwind if Next.js is already set up; see `docs/decisions/001-stack.md`).
4. Re-run this audit at 390 px using a device-emulation tool to close the one measurement gap listed in §1.
