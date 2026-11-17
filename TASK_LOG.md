# Task Log — GEO/SEO mission (branch `geo-seo-upgrade`)

Status key: [x] done · [!] needs owner / external access

## Phase A — Discovery
- [x] Static site generator (`node build.js`), npm, Vercel (vercel.json) + legacy Cloudflare `_redirects`/`_headers`; production remote `shivraj/main` = live commit `cc4e51c`
- [x] Live site 200 on key routes; baseline build reproduces committed output (only cache-bust strings + sitemap dates differ)
- [x] Owner decisions: keep 10:30 AM; keep site doctor records; local branch commits only

## Phase B — GEO audit
- [x] Installed `geo` skill (zubair-trabzada/geo-seo-claude): full set of 15 sub-skills, 5 agents and scripts in `~/.claude`; verified it loads (`/geo`, `/geo-audit`, …)
- [x] Evaluated Cognitic-Labs/geoskills: overlaps the primary skill, not installed
- [x] Skill's parallel agents stopped (permission prompts); audit run in the main session with the skill's weights → GEO_SEO_BASELINE.md, AUDIT_REPORT.md
- [x] Settings: `~/.claude` and temp added as working dirs + tool allow-list (backup `settings.json.bak-geo-mission`)

## Phase C — Competitors
- [x] 7 searches + fetched Vetic Wakad, Petology, WabbitWiki → COMPETITOR_ANALYSIS.md

## Phase D — Roadmap
- [x] P0–P3 in AUDIT_REPORT.md

## Phase E — Implementation
- [x] 4 species pages (data/species-pages.js) + CMS entries
- [x] Service schema fix, titles ≤60, descriptions ≤160
- [x] Clinic entity, Person entities, blog author/about entities
- [x] Topic-matched blog → service links
- [x] Contact visit FAQ, 4 home FAQs, FAQ-page species links
- [x] "Grooming & Maintenance" → "Beak, nail & dental care"
- [x] robots.txt (14 bots), llms.txt key facts, llms-full.txt
- [x] REVIEW_REQUEST_TEMPLATES.md
- [x] .vercelignore for reports/PDF/working folders

## Phase F/G — Design preservation, test & repair
- [x] Fixed during testing:
  - Backslashes stripped from inserted regexes, which broke the llms-full whitespace regex and the blog topic regexes. Rewrote them and verified the output.
  - `sectionHead` signature mismatch on the contact page.
  - Line-ending churn: restored each file's original EOL style.
  - Sonography description claim tightened to match existing copy.
- [x] Build, qa-static, check-links, script audit, Playwright (1440/1280/390) all pass

## Needs owner
- [!] Search Console, Google Business Profile, Practo hours, DocIndia profile, Justdial/Sulekha NAP, WabbitWiki, reviews, testimonial + "hundreds of patients" confirmation → DEPLOYMENT_CHECKLIST.md §D
- [!] Production deploy → DEPLOYMENT_CHECKLIST.md §B
