# 00 — Documentation Requirements Matrix

Project: Shivraj Pet Clinic & Lab — full website remaster (Pune / PCMC)
Rulebook: WORM-AI Master Website Development Rulebook V4 · Master prompt: `SHIVRAJ_CLAUDE_MASTER_PROMPT.md`
Owner direction (2026-09-25): "current site is shit — rebuild with lots of animations and creativity at max level", "full of animations and SEO and mobile friendly", "use as many pics from the folders as possible, no duplicates", "do not deploy".

| # | Document | Required? | Reason / trigger | Inputs / sources | Owner | Status | Last updated |
|---|---|---|---|---|---|---|---|
| 01 | PRD | YES | Non-trivial site | Master prompt, owner messages, current site | AI + Owner | Draft | 2026-09-25 |
| 02 | Brand & Visual Direction | YES | Core | Logo, real photo library, anti-generic rules | AI | Draft | 2026-09-25 |
| 03 | Information Architecture | YES | Core; 15 service pages + 184 posts | Current routes, sitemap | AI | Draft | 2026-09-25 |
| 04 | Content Source-of-Truth | YES | Core; many internal conflicts found | Current site, Practo, Justdial snippet, supplied docs | AI + Owner | Draft — **owner review needed** | 2026-09-25 |
| 05 | Animation / Motion Spec | YES | Motion-heavy brief | Owner direction | AI | Draft | 2026-09-25 |
| 06 | Responsive Spec | YES | Core | — | AI | Draft | 2026-09-25 |
| 07 | TRD | YES | Core | Existing repo (static + Decap + CF Pages) | AI | Draft | 2026-09-25 |
| 08 | Asset Map | YES | Large image library, duplicates | Asset audit script output | AI | Draft | 2026-09-25 |
| 09 | SEO / Accessibility | YES | Core; local SEO critical | Live-site SEO audit | AI | Draft | 2026-09-25 |
| 10 | Skills / Tools Matrix | YES | Core | Installed skills list | AI | Draft | 2026-09-25 |
| 11 | QA / Test Plan | YES | Core | — | AI | Draft | 2026-09-25 |
| 12 | Claude Master Prompt | YES | Core | Master prompt + decisions | AI | Draft | 2026-09-25 |
| 13 | Final Release Gate | YES | Core | QA results | AI + Owner | Pending QA | 2026-09-25 |
| 14 | User Journey / UX Flow | YES | Appointment funnel via WhatsApp | Current booking JS | AI | Draft (conditional/) | 2026-09-25 |
| 15 | Feature Specification | YES | Booking composer, gallery lightbox, species atlas, blog filter | — | AI | Draft (merged into 14) | 2026-09-25 |
| 16 | Design System Spec | YES | Multi-page, long-lived, CMS-fed | 02 | AI | Draft (conditional/) | 2026-09-25 |
| 17 | Component Architecture Map | YES | Template-generated static site with shared partials | build.js | AI | Draft (in 07) | 2026-09-25 |
| 18 | Data / Content Model | YES | Structured clinic data + blog front-matter | data/*.js, _posts | AI | Draft (in 07) | 2026-09-25 |
| 19 | API / Integration Spec | YES | WhatsApp, Maps, GA4, Decap CMS OAuth worker | Existing code | AI | Draft (conditional/) | 2026-09-25 |
| 20 | Auth / Authorization | NO | Only Decap CMS login, unchanged external GitHub OAuth worker; no new auth | — | — | N/A | 2026-09-25 |
| 21 | Security Hardening | NO (light) | Static site; no user data stored; covered by `_headers` note in 07 | — | — | N/A | 2026-09-25 |
| 22 | Performance Budget | YES | Image-heavy + animation-heavy | — | AI | Draft (conditional/) | 2026-09-25 |
| 23 | 3D / WebGL Spec | NO | 3D adds no clinical value here; motion via GSAP/CSS only | — | — | N/A | 2026-09-25 |
| 24 | Content Migration Plan | YES | Replaces indexed site | Current site | AI | Draft (conditional/) | 2026-09-25 |
| 25 | Redirect / URL Migration Map | YES | Canonical .html→clean, legacy Wix 404s | Live audit | AI | Draft (conditional/) | 2026-09-25 |
| 26 | Analytics / Measurement | YES | GA4 + call/WhatsApp/booking events | Existing gtag | AI | Draft (in 19) | 2026-09-25 |
| 27 | CRO Specification | YES | Bookings are the primary goal | — | AI | Draft (in 14) | 2026-09-25 |
| 28 | E-commerce | NO | No online sales | — | — | N/A | — |
| 29 | Booking / Reservation Spec | YES | Appointment request flow | Current booking JS | AI | Draft (in 14) | 2026-09-25 |
| 30 | CMS / Admin Spec | YES (short) | Decap CMS must keep working | admin/config.yml | AI | Draft (in 07) | 2026-09-25 |
| 31 | i18n | NO | English only today; Marathi/Hindi not requested | — | — | N/A | — |
| 32 | Legal / Compliance | NO (flag) | No data collected on server; WhatsApp handoff only. Privacy page recommended to owner | — | Owner | Flagged | 2026-09-25 |
| 33 | Deployment / Infra Plan | YES (short) | Cloudflare Pages + DNS apex issue — **not executed** | Live audit | AI | Draft (in 25) | 2026-09-25 |
| 34 | Backup / Rollback | YES (short) | Replacing production site | — | AI | Draft (in 13) | 2026-09-25 |
| 35 | Browser/Device Matrix | NO | Standard browsers; covered by 11 | — | — | N/A | — |
| 36 | Formal a11y audit | NO | Covered by 09 + 11 checks | — | — | N/A | — |
| P1 | Photography Usage Guide | YES (project-specific) | Real photo library is primary visual source | Asset audit | AI | In 08 | 2026-09-25 |
