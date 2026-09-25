# 09 — SEO & Accessibility

## SEO (implemented)
- **Titles and descriptions:** every page has a unique title and meta description. Service titles lead with Pimple Nilakh and keep the legacy Wakad / Pimple Saudagar terms.
- **Canonicals:** canonical URLs are the clean, extensionless forms (e.g. `/about`), which fixes the legacy `.html` canonicals that 308-redirected.
- **Social tags:** Open Graph and Twitter cards on every page. Per-page images are real clinic photos.
- **JSON-LD:**
  - Sitewide `VeterinaryCare`/`LocalBusiness` with NAP, geo, hours, areas served and doctors.
  - `WebSite`, `BreadcrumbList`, `MedicalBusiness` (services), `FAQPage` (home, services, 86 pet-care Q&As, post FAQs), `BlogPosting`, `Blog`, `ImageGallery`, `AboutPage`, `ContactPage`, `VideoObject` (reels).
  - The unverifiable `aggregateRating` was removed (see 04, C8).
- **Sitemap:** `sitemap.xml` has 206 URLs **plus an image sitemap** of 267 real photos with captions. `robots.txt` and `llms.txt` are regenerated on every build.
- **Image SEO:**
  - Descriptive filenames (`<subject>-shivraj-pet-clinic-<w>.webp`).
  - Descriptive alt text on every photo, and visible captions in the gallery.
  - CMS gallery uploads require a description field, which is used as both alt text and caption.
- **Brand consistency:** the name is always "Shivraj Pet Clinic & Lab". A build-time normaliser rewrites legacy copy that says "Shivraj Pet Clinic" or just "Shivraj".
- **Local NAP:** identical in the footer, the contact page and the schema.
- **Redirects:** legacy Wix URLs, `/blog.html` → `/blog/`, the duplicate live-only post, and `/pet-hospital-near-me` (see conditional/25).

## Accessibility (implemented)
- **Structure:** semantic landmarks, a skip link, a single H1 per page and a logical heading order.
- **Keyboard:** visible focus rings. The menu, lightbox (focus trap, Esc, arrow keys) and FAQ `<details>` are all keyboard operable.
- **Pointer vs touch:** nothing depends on hover. The paw cursor and cinematic hover apply only on fine pointers, with touch equivalents.
- **Forms:** labelled fields, inline error messages (no `alert()`), `aria-invalid`, and 16 px inputs to avoid iOS zoom.
- **Touch targets:** at least 44 px.
- **Contrast:** navy on white is about 15:1, and the blue primary button text meets AA.
- **Reduced motion:** turns off paw prints, marquees and scroll motion. The preloader is skipped and content is always visible.
- **Sound:** pet sounds have a visible mute toggle, and videos are muted with a "Play with sound" control.
