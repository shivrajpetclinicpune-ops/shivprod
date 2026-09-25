# 01 — Product Requirements Document

## Business
Shivraj Pet Clinic & Lab: a two-generation, multispecies veterinary clinic in Pimple Nilakh, Pune (PCMC), established 2013. It has an in-house pathology lab, digital X-ray, sonography, surgery under gaseous anaesthesia and an Exotic Animal Centre. See 04 for verified facts.

## Why rebuild
The owner considers the current site weak. It has a generic template feel, blue SaaS styling, repeated card grids and stock blog imagery. It also has technical debt:
- `.html` canonicals that 308-redirect
- dead booking code
- unverifiable rating claims
- conflicting facts

The client is paying for a visibly premium remaster. Brief: "not anything like the current site", "lots of animation", creativity and quality at maximum, mobile-friendly, SEO-strong, "use as many of the real pictures as possible, no duplicates".

## Audience
- Pet parents in Pimple Nilakh, Vishal Nagar, Wakad, Pimple Saudagar, Baner and Aundh, mostly on mobile and often anxious about a sick pet.
- Exotic-pet owners (birds, rabbits, turtles, reptiles, guinea pigs) searching for a vet who actually treats their species.
- Existing clients checking hours, directions and phone.

## Conversion goals
1. **Primary:** book an appointment. This composes a WhatsApp request to +91 77569 65169. It is honest that the clinic confirms; the site does not.
2. **Secondary:** call, WhatsApp, directions.
3. **Tertiary:** read a service or blog article, then book.

## Scope — pages
| Route | Status |
|---|---|
| `/` Home | Rebuilt: 14-section narrative (hero, species atlas, difference, services index, exotic centre, diagnostic journey, surgery, doctors, gallery, words, booking, visit, footer) |
| `/about` | Rebuilt: story, two generations, qualifications, team |
| `/services/` | **New** hub, replacing the dead `index.html#services` anchor links |
| `/services/<15 slugs>` | Rebuilt template; all content migrated verbatim |
| `/gallery` | Rebuilt: all curated real photos, filterable, lightbox |
| `/pet-care-faqs` | Rebuilt: 86 Q&As, species tabs, search |
| `/blog` + 184 `/blog/<slug>` | Rebuilt templates; CMS pipeline preserved |
| `/contact` | **New:** Visit & Book page for local SEO and a direct booking URL |
| `/404` | Rebuilt |

## Functional requirements
- Booking composer: species, visit type, date (Wednesdays blocked), slot and details. A live WhatsApp message preview is shown and the result opens in WhatsApp. Validation is inline (no `alert()`).
- A live "Open now / Closed" status computed in Asia/Kolkata time from the verified hours.
- Persistent mobile action bar with Call, WhatsApp and Book.
- Gallery filter and accessible lightbox with keyboard, swipe and Escape.
- Blog: category filter plus search, static-rendered for SEO.
- FAQ search and species filter.
- GA4 events preserved: `phone_click`, `whatsapp_click`, `book_appointment_click`. New: `booking_submit`, `directions_click`.
- Decap CMS (`/admin`) keeps working with the same `_posts` collection.

## Constraints
- No invented facts (see 04). No deploy, no DNS or production changes.
- Static hosting (Cloudflare Pages). Build command stays `npm run build`.
- Performance: see conditional/22-Performance-Budget.md.

## Success criteria
- Every existing indexed URL resolves (200 or 301).
- Lighthouse mobile targets: Performance ≥ 85, Accessibility ≥ 95, SEO 100.
- The owner can identify the site as a different, premium product.
