# 15 — Rebuild V3 plan (experience layer)

Directive: "Full website rebuild — master implementation directive" (2026-09-25).
Status: in progress. **Not approved for deploy.**

## What stays (working engine, no reason to replace)
- Static Node build (`build.js`), Cloudflare Pages output at repo root, Decap CMS (`/admin`, `data/cms/*.json`).
- Data layer: `data/clinic.js` (NAP, hours, doctors), `data/services.js`, `data/photos.js` (63 curated, de-duplicated photos with focal points), `data/extracted.json` (legacy service/FAQ copy), `_posts/` (185 posts).
- Image pipeline (`npm run images`, AVIF/WebP/JPG, 480/960/1600).
- SEO output: canonical, OG, JSON-LD (VeterinaryCare, FAQPage, BlogPosting, BreadcrumbList, VideoObject), sitemap with images, robots, llms.txt, `_redirects`.
- `core.js` infrastructure: live open/closed status, GA4 events, sounds (engagement-gated, mutable), reels, analytics.
- Booking = WhatsApp request. Never claims confirmation.

## Owner decisions for this pass (2026-09-25)
| Topic | Decision |
|---|---|
| Photo cropping | Allowed, using each photo's focal point (`pos`). The lightbox always shows the whole photo. Overrides the earlier "never crop" rule. |
| Brand name | Always "Shivraj Pet Clinic & Lab". Never bare "Shivraj" (labels read "Call the clinic", "Find the clinic"). |
| Numbering | Only on the ordered care journey (01–05). |
| Dog-hug pop-up | Disabled (`hugPopup.enabled = false`). Trademark risk, conflicts with the no-cartoon rule. Files kept. |
| Palette | Unchanged: white, pale sky #eef6fd/#d9eaf8, navy #0c2236, action blue #1769d1, logo red for paw accents only. |
| Type | Figtree only (existing, self-hosted). Personality comes from scale, weight and tight display tracking. |

## What is rebuilt
1. **Design system** (`assets/css/main.css` rewritten). No card surfaces, pills or soft shadows as layout. Hairline rules, full-bleed and cropped image windows, fluid spacing tied to content, and a flexible container (full / wide / text / narrow).
2. **Homepage**, in the directive's conversion order:
   Hero (real photos, Book + Call + WhatsApp)
   → What the clinic is (statement + facts rule)
   → Care index (list + contextual image)
   → "Not every pet looks the same" (pinned horizontal species journey; native swipe on touch)
   → Diagnostics (large photo, scan reveal, verified test labels)
   → Surgery band
   → Doctors (editorial spreads)
   → Care journey 01–05 (sticky, image transitions)
   → Pet parents' words
   → Blog (lead + rows)
   → Find the clinic (address-first, compact map 400×240)
   → Appointment (progressive stepper)
   → Quick answers
   → Footer as the final conversion screen.
3. **Navigation:** Care, Exotic care, Doctors, Gallery, Blog, FAQ, Visit, plus a persistent "Book appointment". It compresses on scroll. The mobile menu is full-screen and touch-first.
4. **Contact system:** the supplied cat assets are used for Call and WhatsApp on every page.
   - Desktop: a fixed lower-right dock with labels. It retreats while the booking form or footer is in view.
   - Mobile: a bottom bar with the cat assets. It hides while a form field is focused.
5. **Appointment:** a step-by-step flow (patient → need → day and time → details) with a live WhatsApp preview. Without JS, all steps show.
6. **Inner pages:**
   - Services hub: editorial index.
   - Service pages: split hero, prose, and a ruled side rail.
   - About / Doctors: spreads plus a timeline rule.
   - Gallery: a sequenced archive with the existing accessible lightbox.
   - Blog index: rows, not cards.
   - Posts: editorial layout, with the previously unstyled callouts now styled.
   - FAQs, Contact and 404: restyled.
7. **Motion** (`motion.js` rewritten) uses a different pattern per section:
   - clip-path mask reveals
   - kinetic hero type
   - horizontal pinned journey
   - sticky image cross-cuts
   - diagnostic scan sweep
   - iris band

   No global fade-up. `prefers-reduced-motion` gets static layouts.
8. **Paw language:** the paw cursor stays on desktop. Click prints use a pool of 12, last ~750 ms, and never appear on form fields.
9. **Removed:** the ECG preloader (it delayed content), the dog-hug pop-up, card grids, the hero photo wall, the 6,800 px species atlas, and tag pills.

## QA to run before reporting
Build; link check (`scripts/check-links.js`); console errors on every template; viewports at 1440/1280/1024/768/430/390/375/320; horizontal-overflow scan; keyboard pass (nav, menu, stepper, lightbox); reduced motion; heading outline; alt text; JSON-LD parse; image weight on the homepage.
