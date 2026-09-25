# 11 — QA / Test Plan & Results

## Automated
- `node build.js`: builds 207 pages (184 posts) and a sitemap of 206 URLs. **Pass.**
- `node scripts/check-links.js`: every internal src/href/srcset/poster across 207 pages resolves. There are 23,288 references and **0 missing**. **Pass.**
- `node --check` on all JavaScript. **Pass.**

## Browser (gstack headless Chromium, 2026-09-25)
| Check | Desktop 1440 | iPad 1024×1366 / 1366×1024 | Mobile 390 |
|---|---|---|---|
| No horizontal overflow (home, about, services, contact, gallery) | Pass | Home checked | Pass (a home overflow was found and fixed) |
| Console errors | 0 | — | 0 |
| Hero species rotator shows the full photo, frame follows ratio | Pass (fixed blank and letterbox bugs) | Visual | Visual |
| Species journey pinned horizontal (desktop) / vertical (mobile) | Pass | Visual | Pass |
| Nav: full links ≥1200 px, menu below (iPad) | Pass | Pass after fix | Pass |
| Blog index `/blog/` shows articles | Pass (24 + show more) | — | — |
| Dog-hug pop-up on directions click | Pass (class toggles). Full-screen flash then redirect implemented | — | — |
| Booking composer validation, Wednesday block, WhatsApp URL | Code review; manual test by owner recommended | | |

## Not yet verified (honest gaps)
- **Performance:** a Lighthouse run was not performed.
- **Real devices:** real iOS Safari and Android Chrome were not tested.
- **CMS:** the `/admin` editing flow requires the owner's GitHub login, so it is untested.
- **Sounds:** audible playback was not verified (the test browser is headless).
- **Pages:** every page was not screenshotted at every breakpoint. Home, about, services, contact, gallery and a service page were sampled.
