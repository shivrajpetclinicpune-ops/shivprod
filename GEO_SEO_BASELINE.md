# GEO/SEO Baseline — before changes

**Measured:** 2026-11-17 · **Code:** commit `cc4e51c` on `main` (matches the live site, https://www.shivrajpetclinicpune.com, 200 OK on all key routes)
**Method:** the installed `geo` skill (zubair-trabzada/geo-seo-claude): its category weights, plus a script audit of all 208 built pages (`.geo-work/audit.js`) and live web searches.

## Baseline GEO score: ~57 / 100 (Poor–Fair)

The figures are estimates scored against the skill's rubric. Only the technical numbers come from measurement.

| Category (skill weight) | Score | Why |
|---|---|---|
| AI Citability (25%) | 62 | Good: 86-question FAQ page, FAQs on every service page, a direct-answer home FAQ and an llms.txt. Gap: no page answers "rabbit vet / bird vet / turtle vet in Pune" directly; all species were folded into one Exotic Animal Centre page. |
| Brand Authority (20%) | 25 | A web search for the brand and for the domain returned **no results from the clinic's own site**, only directory listings. DocIndia shows outdated details (Dr. Pritesh "4 years" experience) and an unrelated "Branch 1 Thanesar, Haryana". No Wikipedia/Wikidata, Reddit or YouTube presence observed. Not on WabbitWiki's Pune rabbit-vet list. |
| Content E-E-A-T (20%) | 70 | Named vets with MSVC registration numbers, a "medically reviewed by" line on service pages, and author bylines. Gaps: author schema was a bare name; credentials were not in structured data. |
| Technical (15%) | 78 | Static HTML (fully crawlable), AI crawlers allowed, llms.txt, sitemap with images, canonicals, Open Graph. Gaps: **205/208 titles over 60 characters**, **70 meta descriptions over 160**. |
| Schema (10%) | 65 | VeterinaryCare + LocalBusiness on every page, FAQPage, BreadcrumbList, BlogPosting. Errors: each service page declared a separate **MedicalBusiness** (implying 15 businesses); doctors were bare Person names; no fee, founder or service catalogue. |
| Platform (10%) | 40 | Search engines surface Vetic's programmatic location pages and directories for every target query; the clinic site was not observed in any result. |

Weighted: 0.25·62 + 0.20·25 + 0.20·70 + 0.15·78 + 0.10·65 + 0.10·40 = **56.7**

## Measured technical baseline (208 pages)

| Check | Baseline |
|---|---|
| Titles > 60 chars | 205 |
| Descriptions > 160 chars | 70 |
| Duplicate titles / descriptions | 0 / 0 |
| JSON-LD parse errors | 0 |
| Pages with one H1, no heading skips | all (`scripts/qa-static.js`: no issues) |
| Broken internal links | 0 (`scripts/check-links.js`) |
| Internal links into weak service pages (from page bodies) | Orthopedic Surgery 3, Vet Pharmacy 3, Dog Neutering 4, Cat Spaying 5 |
| Species-specific pages (rabbit, bird, turtle/reptile, small mammal) | 0 |
| robots.txt AI crawlers named | 6 |

## Facts conflict log (not changed — owner decision 2026-11-17)

| Item | Brief said | Site records | Decision |
|---|---|---|---|
| Opening time | 10:00 AM | 10:30 AM (site, schema, docs; Practo shows 10:00) | Keep 10:30; fix Practo |
| Dr. Pritesh | Owner; BVMS, M.V.Sc.; 24+ years | Head Veterinarian; B.V.Sc. & A.H., M.V.Sc.; no year count; founder is Dr. Shivaji (33+ yrs) | Keep site records |
