# 03 — Information Architecture / Sitemap

## Primary navigation
Home · Services (→ /services/) · Exotic Centre (→ /services/exotic-animal-centre) · About · Gallery · Journal (/blog) · FAQs · **[Book an appointment]**
Utility: live open/closed status · Call · WhatsApp.
Mobile: full-screen menu plus a persistent bottom action bar (Call / WhatsApp / Book).

## Routes (canonical = clean URL, served by Cloudflare Pages from `<name>.html`)
```
/                                   index.html
/about                              about.html
/services/                          services/index.html          NEW hub
/services/preventive-medicine       services/preventive-medicine.html
/services/clinical-medicine
/services/exotic-animal-centre
/services/pathology-lab
/services/digital-xray
/services/sonography
/services/vet-pharmacy
/services/dog-neutering
/services/cat-spaying
/services/soft-tissue-surgery
/services/orthopedic-surgery
/services/dog-tumor-surgery
/services/foreign-body-removal-surgery
/services/emergency-surgery
/services/ct-scan-mri               kept (indexed); referral-only; not in menus (C5)
/gallery
/pet-care-faqs
/blog                               static index, 184 posts
/blog/<slug>                        184 generated posts
/contact                            NEW Visit & Book
/404
/admin/                             Decap CMS (unchanged)
/pet-hospital-near-me               301 → /#book (unchanged)
```

## Service taxonomy (used by the hub and home index)
1. **Everyday care:** Preventive Medicine · Clinical Medicine · Vet Pharmacy
2. **Exotic Animal Centre:** Exotic Animal Centre
3. **Diagnostics:** Pathology Lab · Digital X-Ray · Sonography · (CT/MRI referral, hub footnote only)
4. **Surgery:** Dog Neutering · Cat Spaying · Soft Tissue · Orthopedic · Dog Tumor · Foreign Body Removal · Emergency Surgery

## Home narrative order
Hero → Species atlas → The Shivraj difference → Services index → Exotic Animal Centre → Diagnostic journey → Surgery → Doctors → Gallery reel → Words from pet parents → Book → Visit (hours/map) → Footer.
This follows the master prompt order with one merge: "Clinical care / treatment" is folded into the Diagnostic journey's final "Treatment" step, which avoids a thin section with no new facts.

## Internal linking
- Every service page links to 3 related services, the relevant species atlas entry, related blog posts (by category) and the booking section.
- Blog posts link to their category's service page (dog/cat → clinical medicine; exotic → exotic centre; surgery → the surgery hub; health → preventive medicine).
- The footer links to all services, all key pages, the areas served and the NAP.
