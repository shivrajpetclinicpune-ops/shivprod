# 02 — Brand & Visual Direction

> **Superseded by owner review on 2026-09-25.** The live system is now:
> - **Theme:** white `#ffffff` and pale sky `#eef6fd`/`#d9eaf8`, navy text `#0c2236`, action blue `#1769d1` (hover `#0e54ad`), accent blue `#1766c2`, logo red `#e4532f` for tiny accents only (paw prints).
> - **Type:** Figtree 400–800, self-hosted, per the ui-ux-pro-max "Medical Clean" recommendation. Headlines are 700–800 and accent words are blue, not italic. There are no mono labels.
> - **No AI tropes:** no numbering, no ✦ sparkles, no grain, no giant footer wordmark, no hidden-until-scroll blank space, no em-dash-heavy copy.
> - **Photos:** never cropped (see 08).
>
> The original direction below is kept for history.

## Core idea
**CARE FOR EVERY COMPANION.** A clinic that treats a pug, a sun conure and a red-eared slider in the same afternoon. The site should feel like a beautifully printed clinical field journal that has come alive: editorial, photographic and warm, with precise touches from the clinical world such as specimen labels, ECG traces and X-ray blue.

## Explicit break from the current site
| Current site | Rebuild |
|---|---|
| Corporate blue and gold, white cards | Warm bone paper, deep forest ink, coral action colour, X-ray cobalt accent |
| Instrument Serif + Plus Jakarta | **Fraunces** (variable, soft optical serif with character) + **Manrope** + **JetBrains Mono** labels |
| Rounded card grids everywhere | Editorial index rows, full-bleed photography, asymmetric mosaics, pinned horizontal atlas |
| Generic fade-ins | Narrative motion: ECG care reveal, species morph, iris surgical reveal, diagnostic scan line |
| Pexels stock on the blog | 100% real clinic photography |

## Palette (tokens in `assets/css/main.css`)
| Token | Hex | Use |
|---|---|---|
| `--paper` | #F4EFE6 | Page background (warm bone) |
| `--paper-2` | #EAE1D0 | Alternate bands |
| `--ink` | #12201B | Text, dark sections |
| `--forest` | #173A30 | Dark feature sections (exotics, footer) |
| `--moss` | #2F6B55 | Secondary accent, links |
| `--mint` | #CDEBDA | Clinical highlight |
| `--coral` | #E4532F | Primary CTA (echoes the logo's red bird) |
| `--saffron` | #F2B33D | Small highlights (logo's yellow) |
| `--cobalt` | #2F55E4 | Diagnostics / X-ray interface accent (logo's blue cat) |

Contrast: ink on paper 15.6:1. Paper on forest 11.2:1. White on coral CTA 4.6:1 (large and bold text only; button text is 600 weight at 16px or more, and the coral is darkened to #D8461F on hover).

## Typography
- Display: Fraunces 9–144 opsz, weights 300–600, with the SOFT and WONK axes for italic accents. Sizes are fluid through `clamp()`: hero at 3.2–10rem.
- Body: Manrope 400/500/700, 1.0625rem base, 1.6 leading.
- Labels: JetBrains Mono 500, uppercase, 0.72rem, +0.08em tracking. Used for "specimen labels", step counters and data.

## Visual motifs (custom, built in SVG/CSS)
1. **ECG trace:** a heartbeat line that draws on load, underlines sections, and runs as a scroll progress bar in the nav.
2. **Specimen label:** a mono tag attached to photos, e.g. `03 / AVIAN — Alexandrine parakeet`, with factual captions only.
3. **Viewfinder corners:** diagnostic crop marks on diagnostic imagery, plus a scanning line.
4. **Custom icon set:** line icons for species (dog, cat, bird, rabbit, turtle, lizard, guinea pig) and services (syringe, stethoscope, microscope, X-ray, ultrasound, scalpel, capsule, lab tube), 1.5px stroke on a 24 grid.
5. **Paper grain:** a subtle SVG noise overlay (1.5% opacity).

## Photography rules
- Real clinic photos only. There are 63 curated images with no duplicates (see 08).
- Photos are never shown as tiny thumbnails in rounded cards. Sizes are large, full-bleed or editorial.
- No graphic surgical imagery. Surgery is shown through team, lights and patients under anaesthesia.
- The warm grade is applied with a CSS filter on dark sections only; source files are untouched.

## Anti-generic checklist
- No purple or blue AI gradients, glassmorphism, floating blobs, fake dashboards or stock imagery.
- No four-card service grids.
- Every section has one dominant visual anchor.
