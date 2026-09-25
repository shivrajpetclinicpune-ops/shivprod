# 05 — Animation / Motion Spec

Engine: GSAP 3 core + ScrollTrigger (vendored under `assets/vendor/`; free license, about 70 KB gzipped together), CSS transitions, and IntersectionObserver.
Global rules:
- Only `transform`, `opacity` and `clip-path` are animated.
- Motion speaks in a single easing voice: `expo.out` for reveals, `power2.inOut` for scrubs.
- Durations are 0.6–1.2 s. Nothing loops except marquees and the ECG pulse.

**Reduced motion** (`prefers-reduced-motion: reduce`):
- Everything below falls back to its final static state.
- Marquees stop and become scrollable rows.
- Pinning is disabled, so sections stack normally.
- The preloader is skipped.

**No-JS:** content is visible by default. Hidden-until-revealed states are only applied when `html.js-motion` is set by the script.

| # | Concept | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) | Trigger | Fallback / reduced | Performance |
|---|---|---|---|---|---|---|---|
| M1 | **Care Reveal** preloader | An ECG line draws across the screen, spikes and resolves into the logo mark; the coral curtain lifts (1.4 s) | Same | Same, shorter (1.0 s) | First page view per session | Skipped; the page shows immediately | Inline SVG only; runs before images decode |
| M2 | **Hero headline** | Words rise from masks (stagger 0.06). Rotating species word (dog → cat → parrot → turtle → rabbit → iguana) morphs with a matching photo in a masked arch | Same | Same, arch above the headline | Load, after M1 | Static first word and photo | 1 image swap every 2.4 s, preloaded lazily |
| M3 | **Patient wall** | 3 vertical photo columns drift in opposite directions (infinite), with scroll velocity adding skew | 2 columns | 1 horizontal strip under the CTA | Always; paused off-screen | Static grid | CSS transform animation; `content-visibility`; paused via IO |
| M4 | **Magnetic CTAs + cursor** | Custom cursor ring grows over links and shows "View" over photos; buttons are pulled magnetically toward the pointer | Off (coarse pointer) | Off; pressed state scales 0.97 | pointer: fine | Native cursor | rAF, transform only |
| M5 | **Species Focus / Living Atlas** | Section pins; panels scroll horizontally (5 species groups); inside each panel the photo stack parallaxes and the species name scales | Pinned horizontal with shorter distance | Native swipe carousel with scroll-snap, a progress bar and dot labels (no pin) | Scroll | Vertical stack | One ScrollTrigger; images lazy |
| M6 | **Number ticks** | Facts count up (2013, 33+, 15–20 min, ₹300) with the mono digits rolling | Same | Same | 40% in view, once | Final numbers | Text only |
| M7 | **Clinical index** | Service rows: a floating preview image follows the cursor; the row title slides and an arrow draws | Tap row → inline image expands | Accordion row with image | Hover/focus (and focus-visible) | Rows plus static thumbnails | One shared `<img>` swapped |
| M8 | **Living Atlas mosaic (Exotic Centre)** | Photos unmask with a staggered clip-path diagonal wipe; specimen labels type in | Same | Same, 2-column | Scroll into view | Static | clip-path only |
| M9 | **Diagnostic Reveal** | Pinned 5-step journey (Concern → Examination → Diagnostics → Understanding → Treatment); a progress ECG line fills, images crossfade, and a scan line sweeps the X-ray image | Pinned, shorter | Vertical timeline; line draws as you scroll, each step reveals | Scroll (scrub) | Static list | One pin, 5 images lazy |
| M10 | **Iris (Surgery)** | A full-bleed surgery photo opens from a small circle to full screen like an OT light while the headline counter-scales | Same | Same, smaller start circle | Scroll scrub | Full image | clip-path circle |
| M11 | **Human Connection (Doctors)** | Portraits reveal behind a vertical curtain; slight 3D tilt follows the pointer; credentials slide in | Reveal, no tilt | Reveal, no tilt | Scroll | Static | transform only |
| M12 | **Gallery reel** | Two marquee rows in opposite directions; speed reacts to scroll velocity; hover pauses | Same | Same, draggable or swipeable | Always (IO paused) | Static scrollable row | CSS animation |
| M13 | **Care Begins (Booking)** | Step chips fill; the WhatsApp preview bubble types the message live; the send button pulses after the form is valid | Same | Same (preview below the form) | Input | Instant text | Text only |
| M14 | **Footer wordmark** | The giant "Shivraj" rises letter by letter; the areas-served marquee runs | Same | Same | Scroll | Static | — |
| M15 | **Page transitions** | Coral panel wipes out and in between internal pages | Same | Same | Internal link click | Normal navigation | CSS, max 450 ms; never blocks back/forward cache |
| M16 | **Section reveals** | Headings unmask line by line; body fades up 16 px (a single restrained utility, not used on every element) | Same | Same | IO 15% | Visible | — |
| M17 | **Nav** | Hides on scroll down, shows on scroll up; the ECG progress line traces the page | Same | Same | Scroll | Always visible | — |
| M18 | **Open-now pulse** | A green pulsing dot when open (computed in IST); grey when closed | Same | Same | Load, re-checked every minute | Dot without pulse | — |
