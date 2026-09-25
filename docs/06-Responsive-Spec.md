# 06 — Responsive Spec

Breakpoints (min-width, mobile-first): **sm 480 · md 640 · lg 1024 · xl 1280 · 2xl 1600**. Fluid type and spacing use `clamp()`. Container max is 1440 with a side gutter of `clamp(16px, 4vw, 56px)`.

| Component | Mobile (<640) | Tablet (640–1023, portrait/landscape) | Desktop (≥1024) |
|---|---|---|---|
| Nav | Logo, status dot and menu button; full-screen menu; **bottom action bar** (Call / WhatsApp / Book), 56 px tall, safe-area aware | Same, action bar retained | Inline links, Book CTA, status pill; no bottom bar |
| Hero | Stacked: label → headline (3.2 rem) → species arch photo → CTAs full-width → horizontal patient strip | Headline left, arch right; strip below | 12-column: headline across 7 columns, patient wall across 5 columns (3 columns of images) |
| Species atlas | Swipe carousel (scroll-snap, 86 vw cards), progress bar | Pinned horizontal, 70 vw panels | Pinned horizontal, 100 vw panels |
| Difference | Stacked facts (2×2) + portrait | 2 columns | Sticky portrait left, facts right |
| Services index | Accordion rows with a 16:9 image | Rows plus tap preview | Rows plus cursor preview image |
| Exotic mosaic | 2 columns | 3 columns | Asymmetric 12-column mosaic |
| Diagnostic journey | Vertical timeline | Pinned, reduced height | Pinned split: steps left, image right |
| Surgery iris | Starts at a 30 vw circle | 20 vw | 12 vw |
| Doctors | Stacked cards | 2 columns | Offset editorial pair |
| Booking | Single column, preview below | Form and preview side by side | Same, preview sticky |
| Visit | Hours list, map (click-to-load), actions | 2 columns | 3 columns |
| Service page | Hero image, then content; sticky bottom CTA | Content + inline aside | 8/4 split, sticky aside |
| Gallery | 2-column masonry | 3 columns | 4 columns |

## Rules
- Touch targets are at least 44×44 px. There is no horizontal overflow; `overflow-x: clip` is set on `body` as a safety net and overflow is still tested.
- Type is never below 14 px (labels) or 16 px (body and inputs, to avoid iOS zoom).
- Nothing depends on hover. Every hover effect has a focus-visible equivalent and a touch equivalent.
- Images use `object-position` focal points from `data/photos.js`, so crops keep the subject on every aspect ratio.
- `100svh` is used for the hero instead of `100vh` to avoid mobile toolbar jumps.
