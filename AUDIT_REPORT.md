# GEO/SEO Audit Report — Shivraj Pet Clinic & Lab

**Site:** https://www.shivrajpetclinicpune.com · **Type:** local business (veterinary clinic) · **Pages:** 212 after changes (208 before)
**Tool:** `geo` skill (geo-seo-claude) methodology and weights; script audits of every built page; Playwright visual checks; live web searches.

## Scores

| Category | Weight | Before | After (estimate) |
|---|---|---|---|
| AI Citability | 25% | 62 | 72 |
| Brand Authority | 20% | 25 | 25 (needs off-site work) |
| Content E-E-A-T | 20% | 70 | 76 |
| Technical GEO | 15% | 78 | 88 |
| Schema & Structured Data | 10% | 65 | 86 |
| Platform Optimization | 10% | 40 | 45 |
| **Overall GEO score** | | **~57** | **~64** |

The "after" scores describe what the code now offers, not a measured change in rankings or AI answers. Those can only be observed 2–4 weeks after deployment (PDF Step 6). Brand Authority is capped by off-site signals, which no code change can fix.

## Prioritised findings

### P0 — Critical technical/indexing
| # | Finding | Status |
|---|---|---|
| P0-1 | The clinic's own domain was not returned by web search, even for its brand name; only directories appear. Likely causes: weak external signals and/or incomplete indexing. | **Owner:** verify in Google Search Console, submit sitemap, request indexing of key pages (checklist). No on-site blocker found: robots allows all, every page `index, follow`, canonical, sitemap valid. |
| P0-2 | No technical blockers found: 0 broken internal links, 0 JSON-LD errors, 1 H1 per page, no heading skips, AI crawlers allowed. | Verified |

### P1 — High-impact SEO/GEO
| # | Finding | Status |
|---|---|---|
| P1-1 | 205/208 titles over 60 chars (cut off in results) | **Fixed:** 71 left, all blog headlines that are themselves >60 |
| P1-2 | 70 meta descriptions over 160 chars | **Fixed:** 0 real (1 false positive from the checker) |
| P1-3 | No species pages for rabbit / bird / turtle & reptile / guinea pig & hamster queries | **Fixed:** 4 pages, answer-first leads, 5 FAQs each, FAQ schema |
| P1-4 | Service pages marked up as 15 separate `MedicalBusiness` entities | **Fixed:** `MedicalWebPage` (reviewedBy Dr. Pritesh) → `Service` (provider = the clinic) |
| P1-5 | Doctors were bare names in schema; blog author had no entity | **Fixed:** full `Person` entities (credentials, MSVC registration, focus areas), referenced by `@id` from blog posts and service pages |
| P1-6 | Clinic entity lacked fees, founder, services, species | **Fixed:** price range, consultation offers (₹300/₹400), founder, OfferCatalog of 18 services, `knowsAbout` species, Justdial in `sameAs` |

### P2 — Content and local
| # | Finding | Status |
|---|---|---|
| P2-1 | Blog posts linked only to one generic service per category | **Fixed:** topic-matched links (rabbit post → Rabbit Vet, hip dysplasia → Orthopedic Surgery…), plus `about` schema |
| P2-2 | Exotic page listed "Grooming & Maintenance", which conflicts with the no-grooming rule | **Fixed:** renamed "Beak, nail & dental care" (medical) |
| P2-3 | No direct answers to visit questions (walk-ins, Wednesday, fees, area, emergencies) on the contact page | **Fixed:** 6-question FAQ + FAQPage schema |
| P2-4 | Home FAQ lacked "where", "who", "Wednesday", "grooming?" | **Fixed:** 4 answers added |
| P2-5 | FAQ page species groups didn't link to care pages | **Fixed** |
| P2-6 | Testimonials in `data/clinic.js` are marked "pending owner confirmation" (C11) | **Owner action:** confirm or remove; not marked up as Review schema (correct) |
| P2-7 | Exotic page says "hundreds of exotic patients every year" (existing copy) | **Owner action:** confirm it is accurate, or soften it |

### P3 — Advanced
| # | Finding | Status |
|---|---|---|
| P3-1 | llms.txt had no explicit facts list; "86 answers" was hard-coded | **Fixed:** verified key-facts block, computed counts, new `llms-full.txt` (all service answers + FAQs) |
| P3-2 | robots.txt named 6 crawlers | **Fixed:** 14 search/AI crawlers explicitly allowed |
| P3-3 | Off-site entity work (GBP, directories, WabbitWiki, Wikidata) | **Owner action:** checklist |
| P3-4 | Lighthouse/Core Web Vitals not re-measured this session (no layout, CSS or JS weight changed) | Recommended after deploy |

## PDF checklist (Option C's 12 checks)
1 AI answer tester — no AI Overview could be observed from this environment; search results recorded · 2 Competitors — done · 3 Reviews — templates written; counts not visible on fetched pages · 4 Service pages — +4 · 5 FAQ coverage — +10 visit/home answers, +20 species FAQs · 6 Schema — upgraded · 7 GBP signals — checklist (cannot access the profile) · 8 NAP — consistent on site; DocIndia/Practo mismatches listed · 9 Trust — Person entities, registration numbers · 10 Technical access — robots/sitemap/llms verified · 11 Content gaps — see COMPETITOR_ANALYSIS · 12 Roadmap — this file.
