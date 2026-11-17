# Deployment Checklist

All work is committed on the local branch **`geo-seo-upgrade`**. Nothing has been pushed or deployed.
Production = remote **`shivraj`** (github.com/shivrajpetclinicpune-ops/shivprod), branch `main`. Its last commit, `cc4e51c`, matches the live site.
Vercel builds on push (`npm run build` → static files). `.vercelignore` keeps the reports, PDF and working folders off the live site.

## A. Review (10 minutes)

```bash
cd "C:/Users/manda/OneDrive/Desktop/new project/shivraj/rebuild"
git checkout geo-seo-upgrade
git log --oneline -3
git diff main --stat -- src data build.js scripts      # source changes only
npm run build && npm run serve                          # then open http://localhost:4321
```

Check these pages in the browser:
- /services/rabbit-vet · /services/bird-vet · /services/turtle-reptile-vet · /services/guinea-pig-hamster-vet
- /services/exotic-animal-centre (new "Care by species" list; "Beak, nail & dental care" heading)
- /contact (new "Common questions" FAQ at the bottom)
- / (home: 4 new quick answers at the bottom)
- /llms.txt and /llms-full.txt

## B. Deploy

```bash
git checkout main
git merge --ff-only geo-seo-upgrade
npm run build
node scripts/qa-static.js          # expect: no issues
node scripts/check-links.js        # expect: missing 0
git push shivraj main              # Vercel deploys production from this
```

If you also keep the `origin` mirror (github.com/mandarcasm/shivraj-pet-clinic-v3) in sync: `git push origin main`.

## C. Verify live (5 minutes after deploy)

- https://www.shivrajpetclinicpune.com/services/rabbit-vet returns 200
- https://www.shivrajpetclinicpune.com/sitemap.xml lists the 4 new `/services/*-vet` URLs
- https://www.shivrajpetclinicpune.com/robots.txt names 14 crawlers
- Paste a service page URL into https://search.google.com/test/rich-results : expect Breadcrumb + FAQ detected, no errors
- https://validator.schema.org/ on the home page: expect VeterinaryCare with no errors
- Confirm https://www.shivrajpetclinicpune.com/AUDIT_REPORT.md returns **404** (reports must not be public)

## D. External tasks (only the owner can do these; they matter most for Brand Authority)

1. **Google Search Console:** verify the domain, submit `sitemap.xml`, and use URL Inspection → "Request indexing" on the home page, the 4 new species pages and /services/exotic-animal-centre. (The clinic's site was not returned by web search even for its own name.)
2. **Google Business Profile:**
   - Category "Veterinarian"; add the secondary categories that apply.
   - Hours exactly: Mon, Tue, Thu–Sun, 10:30–1:30 and 3:00–8:30; Wednesday closed.
   - Add services: Rabbit vet, Bird vet, Turtle & reptile vet, Pathology lab, Digital X-ray, Sonography, Surgery.
   - Website link: https://www.shivrajpetclinicpune.com
   - Post the real clinic photos.
   - Answer the Q&A section with the same answers as the site FAQs.
3. **Practo:** opening time shows **10:00 AM**; change it to 10:30 AM (or tell us if 10:00 is correct and the site should change).
4. **DocIndia** (docindia.org/doctors/pune/dr-pritesh-veterinary): shows "4 years experience" and a "Branch 1, Thanesar, Haryana". Claim and correct the profile, or request removal.
5. **Justdial / Sulekha / myUpchar:** make the name, address, phone and hours match the site exactly.
6. **WabbitWiki** (wabbitwiki.com/wiki/India → Greater Pune): ask to be added as a rabbit-savvy vet.
7. **Reviews:** start sending the messages in `REVIEW_REQUEST_TEMPLATES.md` (one per visit, every customer, no incentives).
8. **Confirm two existing claims:**
   - The three testimonials in `data/clinic.js` (flagged "pending owner confirmation").
   - "Hundreds of exotic patients every year" on the Exotic Animal Centre page.
9. **Facts conflict** (decided: site records kept): if Dr. Pritesh's credentials should read "BVMS, M.V.Sc., 24+ years", edit `data/clinic.js` → `doctors[0]` and rebuild.

## E. Re-check in 2–4 weeks (PDF Step 6)

From a browser in Pune (or with location set to Pune), search for:
- "rabbit vet Pune", "bird vet Pune", "exotic pet vet Pune", "vet clinic Pimple Nilakh"
- "turtle vet Pune", "pet blood test Pune"

Note whether the site or an AI Overview mentions the clinic. Then rerun `/geo audit https://www.shivrajpetclinicpune.com` in Claude Code and compare against GEO_SEO_BASELINE.md.
