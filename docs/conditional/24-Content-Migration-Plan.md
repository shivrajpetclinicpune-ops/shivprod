# 24 — Content Migration Plan (done)
- Service pages: body, H1, lead, meta and FAQs extracted verbatim from legacy HTML by `scripts/extract-content.js` → `data/extracted.json`; links rewritten to clean URLs; brand name normalised; emergency FAQ corrected per owner.
- 86 pet-care FAQs, doctor qualifications and continuing education migrated the same way.
- 184 blog posts: `_posts/*.md` copied unchanged (CMS source of truth); rendered by the new template; hotlinked stock images in bodies stripped; covers per 08.
- Homepage/about copy rewritten for UX only where facts are unchanged (see 04 for every fact's source).
- Removed: unverifiable rating numbers, "2,500+ families", "12+ years" badge, on-site CT claim, dead booking/Google-Sheets code.
