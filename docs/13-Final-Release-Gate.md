# 13 — Final Release Gate

**Status: NOT APPROVED FOR DEPLOY.** The V3 experience rebuild (docs/15) is reviewable locally (`npm run build && npm run serve` → http://localhost:4321). Nothing has been deployed, pushed, or changed in DNS or production settings.

## QA performed on V3 (2026-09-25)
| Check | Result |
|---|---|
| Build (`node build.js`) | 208 pages (185 posts), sitemap 207 URLs, no errors |
| Internal links / assets (`scripts/check-links.js`) | 26,853 refs, 0 missing |
| Static HTML (`scripts/qa-static.js`) | JSON-LD parses on all pages; exactly one h1 per page; no skipped heading levels; every `<img>` has alt; no duplicate ids; title, description and canonical on every page; no bare "Shivraj" brand in page copy |
| Console errors | None on home, services hub, service page, doctors, gallery, blog index, post, FAQ, contact |
| Horizontal overflow | None at 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 / 320 across 9 templates |
| Booking stepper | Click flow advances patient → need → time → details; empty Continue shows the step's error; incomplete submit returns to the right step; WhatsApp text verified; the note never claims confirmation |
| Gallery lightbox | Keyboard open, focus moves to Close, arrow keys navigate, focus stays trapped, Escape closes and returns focus, filters work |
| Mobile menu | Opens, focuses the first link, Escape closes |
| Contact system | The dock retreats while the booking form, footer or lightbox is on screen; the mobile bar hides while a text field is focused |
| Paw prints | Pool capped at 12, 0.75 s life, skipped on form fields, labels and article text |
| Reduced motion | Verified in Chrome (`--force-prefers-reduced-motion`): no motion classes, final states shown, no pin, no paw layer |
| Home weight (first load, local) | ~150 KB images (AVIF hero preloaded), ~150 KB JS (GSAP 117 KB), reels deferred until in view |

**Not yet done:**
- Lighthouse on a throttled mobile profile
- Real-device testing (iOS Safari, Android Chrome)
- Screen-reader walkthrough (NVDA/VoiceOver)
- CMS (`/admin`) write test

## Owner must confirm before launch
1. **Content conflicts** in 04 (C1–C21). The main ones:
   - Dr. Pritesh's M.V.Sc. specialisation
   - The identity of the doctor in the grey-scrubs photos
   - The two legacy testimonials (Sneha R., Kavita S.)
   - The Instagram handle
   - Whether the Samarth Colony "Branch 1" still operates
   - Email from the visiting card
2. **Cropping:** photos are now cropped around hand-set focal points (owner decision 2026-09-25, reversing the earlier no-crop rule). Review the doctor and hero crops.
3. **Dog-hug pop-up:** disabled (trademark risk). The files are kept.
4. The lab reel's "runway" watermark: confirm it is genuine clinic footage.

## Before go-live (technical)
- **Hosting:** Cloudflare Pages build command `npm run build`, output directory `/` (unchanged).
- **Apex domain:** add an apex → www 301 in the Cloudflare dashboard.
- **Search Console:** after launch, resubmit `sitemap.xml` and watch the redirects for the legacy Wix URLs.
- **Performance:** run Lighthouse (mobile) and consider self-hosting only the GSAP parts used.

## Rollback
The legacy site is preserved unchanged in `_original/shivprod-main/` and in the supplied zip.
