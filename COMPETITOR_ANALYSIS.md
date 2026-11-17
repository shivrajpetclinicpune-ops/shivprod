# Competitor Analysis — Pune / PCMC veterinary search (observed 2026-11-17)

**Important:** these are **web search results from a US-based search tool, observed on 2026-11-17**. They are not Google India rankings and not Google AI Overview answers. No ranking positions or AI answers are claimed. Treat them as a directional view of which sites the search ecosystem surfaces. To see real Google AI Overview answers for Pune, search from a Pune location (see DEPLOYMENT_CHECKLIST, step 6).

## 1. What appeared for each query

| Query | Sites/clinics surfaced | Shivraj site surfaced? |
|---|---|---|
| best exotic animal vet in Pune | Vetic (many programmatic "vet/dog/cat doctors Pune" pages), Petology Multispecies Veterinary Clinic (Bavdhan) | No |
| rabbit veterinarian Pune | WabbitWiki India list (The Exotics Vet, Aundh; Animal Ark Veterinary Multispecialty, 411021; Raintree Veterinary Clinic, 411013), Get Well Pet Clinic (Wagholi, via Yappe), Petology, Pets LifeLine (Baner), Vetic | No |
| bird / avian vet Pune parrot doctor | Vetic, DocIndia avian directory, Kerala avian hospital articles; **no named Pune avian vet found** | No |
| veterinary clinic Pimple Nilakh / Wakad / Pimple Saudagar | Vetic Wakad, DocIndia and myUpchar listings (Dr. Gawaskar's Pet Clinic, Dr. Madhavi's Pet Wellness Clinic); **DocIndia listing for Shivraj Pet Clinic and Lab** | Only via DocIndia |
| pet diagnostic laboratory Pune blood test dog | Vetic diagnostics pages, PVD India (Manjari), Vedh Laboratory (Undri), human labs | No |
| "Shivraj Pet Clinic" Pune / shivrajpetclinicpune.com | DocIndia profile only, plus Vetic pages | **No: the clinic's own site was not returned even for its brand name and domain** |

## 2. Main competitors

| | Vetic (chain, Wakad/Aundh and others) | Petology (Bavdhan) | The Exotics Vet / Animal Ark / Raintree | Shivraj Pet Clinic & Lab |
|---|---|---|---|---|
| Exotic focus | Not observed | Yes: "domestic pets and exotic animals", exotic & wildlife specialist | Listed for rabbits on WabbitWiki | **Yes: dedicated Exotic Animal Centre** (now with 4 species pages) |
| Site structure | Hundreds of programmatic pages per city, area, species and service (e.g. `/pune/vet-doctors-new`, `/clinics/pune/wakad`) | Booking page on a practice-management platform (vetPMS) | Not fetched | 212 static pages: 19 service pages, 185 articles, 86+ FAQs |
| Structured data | Yes: BreadcrumbList + Organization graph on the clinic page | None observed (0 JSON-LD blocks) | Not observed | VeterinaryCare + Service + MedicalWebPage + Person + FAQPage + BlogPosting |
| Area page | Yes: "Areas served" lists Pimple Nilakh, Pimple Saudagar | Not observed | Not observed | Contact page + area FAQ (Pimple Nilakh, Vishal Nagar, Wakad, Pimple Saudagar, Baner, Aundh) |
| 24/7 / grooming | Advertises 24×7 emergency and grooming | Not observed | — | Neither (opening hours only; no grooming), now stated plainly |
| Reviews shown | Testimonials on page | Not observed | — | Links to Practo/Justdial/Google; no review markup (correctly) |
| In-house lab | "Same-day results" | Not observed | — | **CBC and biochemistry in 15–20 minutes** |

## 3. Gaps the clinic had vs competitors (and status)

| Gap | Status |
|---|---|
| No page answering "rabbit vet / bird vet / turtle vet / guinea pig vet Pune" | **Fixed:** 4 species pages built |
| No explicit area answers (Vetic lists "areas served") | **Fixed:** contact-page area FAQ + `areaServed` schema |
| Brand entity weak; directories out of date (DocIndia "4 years", "Branch 1 Thanesar, Haryana") | **Owner action:** see DEPLOYMENT_CHECKLIST, external tasks |
| Not on WabbitWiki's Pune rabbit-vet list | **Owner action:** request a listing (wiki talk page / editors) |
| Fewer reviews visible than chains | **Owner action:** REVIEW_REQUEST_TEMPLATES.md |
| No Google Search Console verification evidence in repo | **Owner action:** verify the domain and submit the sitemap |

## 4. Where Shivraj is already stronger

- Real, named vets with registration numbers (competitor pages show first names or none).
- A genuine exotic service with real patient photos; no Pune avian specialist surfaced in search.
- Depth of answer content (185 vet-written articles, 86+ FAQs), which is material AI assistants can quote.
- In-house lab turnaround stated as a specific number.

Sources: vetic.in/clinics/pune/wakad, petology.vetpms.com, wabbitwiki.com/wiki/India, docindia.org/doctors/pune/dr-pritesh-veterinary, myupchar.com Pimple Saudagar veterinary listings, yappe.in Pune listings.
