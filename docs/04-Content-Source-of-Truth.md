# 04 — Content / Source-of-Truth Map

Source priority (master prompt): 1 owner-provided → 2 supplied local files & real assets → 3 verified current website → 4 verified external sources.
Rule: conflicts are **documented, not silently reconciled**. The "Site decision" column records what the rebuild displays *until the owner confirms*.

## 1. Verified facts used on the site

| Fact | Value used | Sources |
|---|---|---|
| Legal / display name | **Shivraj Pet Clinic & Lab** (secondary: "Exotic Animal Centre") | JSON-LD, all footers, Facebook page name, BMW invoice ("SHIVRAJ PET CLINIC AND LAB") |
| Address | **Shop No. B-4, Alpine Avenue, Aundh–Wakad Road, Vishal Nagar, Pimple Nilakh, Pune 411027** (landmark: near Jagtap Dairy) | Site JSON-LD; Practo; Justdial snippet; bio-medical-waste invoice (supplied PDF) |
| Phone / WhatsApp | **+91 77569 65169** · `tel:+917756965169` · `https://wa.me/917756965169` | Every page; Practo; Justdial; invoice |
| Geo | 18.5883921, 73.7822047 | Site JSON-LD |
| Google Maps place | `https://www.google.com/maps/place/...0x3bc2b93d19aeeeef:0xbb41140a3a0bac96` (full link in `data/clinic.js`) | Site |
| Hours | **Mon, Tue, Thu, Fri, Sat, Sun: 10:30 AM–1:30 PM & 3:00 PM–8:30 PM · Wednesday closed** | JSON-LD, hours table, all service pages, llms.txt |
| Established | 2013 | All pages |
| Consultation fee | ₹300 regular · ₹400 exotic pets (payable at clinic) | Index FAQ, llms.txt; Practo ₹300 |
| Doctors | Dr. Pritesh S. Vidhate — Head Veterinarian · Dr. Shivaji B. Vidhate — Founder & Senior Veterinarian, M.V.Sc. (Pathology), 33+ yrs, Retired District Animal Husbandry Officer, Pune | about.html, gallery.html, index |
| Support staff | Mr. Deepak Joshi — Veterinary Technician | gallery.html |
| Species | Dogs, cats, birds (African grey, macaw, budgie, cockatiel, finch, lovebird), rabbits, turtles & tortoises, reptiles incl. iguanas, guinea pigs, hamsters & gerbils | FAQs, exotic page, gallery (iguanas, squirrel rescue photos) |
| Services (live pages) | Preventive Medicine, Clinical Medicine, Exotic Animal Centre, Pathology Lab, Digital X-Ray, Sonography, Vet Pharmacy, Dog Neutering, Cat Spaying, Dog Tumor Surgery, Orthopedic Surgery, Soft Tissue Surgery, Foreign Body Removal, Emergency Surgery, CT/MRI (referral coordination) | services/*.html |
| Lab turnaround | CBC & biochemistry "ready in 15–20 minutes"; histopathology sent to external labs | pathology-lab.html |
| Exotic anaesthesia | Gaseous (inhalation) anaesthesia | exotic-animal-centre.html |
| Booking | WhatsApp request — **not** an instant confirmation | index.html JS |
| Instagram | `https://www.instagram.com/shivraj_petclinic_pune/` | Older site copy + live web search (see conflict C9) |
| Facebook | `https://www.facebook.com/people/Shivraj-Pet-Clinic-Exotic-Animal-Centre/61559604395021/` | Site |
| Practo | `https://www.practo.com/pune/clinic/shivraj-pet-clinic-and-lab-pimple-nilakh` | Site; fetched 2026-09-25 |
| Areas served | Pimple Nilakh, Vishal Nagar, Wakad, Pimple Saudagar, Baner, Aundh (PCMC/Pune) | JSON-LD areaServed, FAQ schema, reel README |
| GA4 | `G-94PYDYSWKF` + events phone_click / whatsapp_click / book_appointment_click | Site |

## 2. Conflicts register

| ID | Topic | Conflicting values | Site decision (pending owner) |
|---|---|---|---|
| C1 | Dr. Pritesh's M.V.Sc. specialisation | "M.V.Sc. (Medicine)" (doctor cards, 4 posts) vs "BVSc & AH, MVSc (Veterinary Epidemiology & Preventive Medicine)" (15 service pages, 151 posts, Practo) | Use **B.V.Sc. & A.H., M.V.Sc. (Veterinary Epidemiology & Preventive Medicine)**, the majority value, which the external Practo listing also supports. **Owner to confirm.** |
| C2 | Experience years | "33+ years" (Dr. Shivaji), "33+ years combined" (about meta), "12+ Years Veterinary Experience" hero badge, "24+ years" in 9 blog posts | Display only **Dr. Shivaji: 33+ years** and **"Since 2013"**. Blog post bodies are left unchanged (owner content) and the issue is flagged. |
| C3 | Hours wording | Split hours (canonical) vs "10:30AM–8:30PM" (no break) in 2 places; Practo opens **10:00**; sangvi.com "9–6 daily" | Use the canonical split hours everywhere. Practo and directory listings need updating by the owner. |
| C4 | Bookable evening slots | Hours say 3:00 PM, but the booking form offers slots from 5 PM (HTML comment: "3–5 removed (surgery block)") | Booking slots are 10:30–1:30 and 5:00–8:30, with a note: "3–5 PM is usually reserved for surgery — call for urgent cases." |
| C5 | CT scan | about.html "CT scan on-site" vs CT page "referral coordination" vs homepage "temporarily disabled per client request" | CT is **not** featured on the home page or in navigation. The `/services/ct-scan-mri` URL is kept as a referral-coordination page, not linked from the menu. The "on-site CT" claim is removed. |
| C6 | Sonography scope | Sonography page is pregnancy-focused; other pages claim general diagnostic ultrasound; Dr. Pritesh's CE includes thoracic/abdominal ultrasonography | Say "Sonography (ultrasound)" and keep the page's own scope. No new capability claims. **Owner to confirm** whether abdominal diagnostics are offered. |
| C7 | Deworming schedule | Two schedules on the preventive page | Both kept verbatim on the service page; flagged. |
| C8 | Ratings | Site: "4.5★ Google / 4.5 Justdial / 5.0 Practo / 307+ reviews", JSON-LD aggregateRating 4.5/307. Verified: Practo 5.0 (20 stories); Justdial 4.5/307 from a **search snippet only**; Google rating **not verifiable** | **No star numbers shown.** "Read reviews" links go to Practo, Justdial and Google Maps. `aggregateRating` is removed from the schema (mixed-platform aggregate = policy risk). |
| C9 | Instagram handle | `@shivrajpetclinic` (JSON-LD, reel README) vs `@shivraj_petclinic_pune` (older site copy, live profile found) | Use `shivraj_petclinic_pune`. **Owner to confirm.** |
| C10 | Website domain | Reel README says `www.shivrajpetclinic.com`; live site is `www.shivrajpetclinicpune.com` | Use `shivrajpetclinicpune.com`. |
| C11 | Testimonials | 2 quotes on current home page (Sneha R., Kavita S.) with no platform or date | Shown as "Words from pet parents", attributed as on the current site. **Owner to confirm they are genuine**; otherwise remove. |
| C12 | "2,500+ pet families", "8+ species" | Current-site claims, unsourced | "8+ species" is kept (the verified species list covers 8 groups). "2,500+" is **not shown** until the owner confirms. |
| C13 | Second location | wakad.in lists "Shivraj Pet Clinic, Samarth Colony, Wakad, 075883 28469". Supplied "BRANCH 2" PDF is a waste-disposal invoice for the **same** Pimple Nilakh address | Single location only. **Owner to confirm** whether the wakad.in listing is theirs; if not, it is a stale or foreign listing. |
| C14 | "Same two doctors every visit" vs named technician | about.html vs gallery.html | The team section shows both doctors and the technician. The "same two doctors" phrase is dropped. |
| C15 | Maps embed | Embed place ID and coordinates differ from the place link | The rebuild uses a coordinates/name query embed plus the canonical place link. |
| C16 | Blog covers | 158 of 184 posts hotlink Pexels stock | The template swaps stock covers for real clinic photos matched by category (see 08). Post bodies are unchanged. |
| C17 | Service page links | "Rabbit Neutering" → dog-neutering; lab/sonography links → `index#services` | Fixed to the correct pages. |

| C18 | Doctor in the grey-scrubs photos | Owner's rename manifest says the senior doctor is Dr. Shivaji. The image audit thinks he may differ from the man in the legacy "Dr. Shivaji" photos | Captioned as Dr. Shivaji per the manifest (owner-provided, highest priority). **Owner to confirm.** |
| C19 | Email and branches | The visiting card shows shivrajpetclinic@gmail.com and **Branch 1: Samarth Colony, Jagtap Dairy, Pimple Nilakh**. The signboard shows "Branch-2", and M.V.Sc. (Medicine) Reg. MSVC 9959 / M.V.Sc. (Pathology) Reg. MSVC 3182 | The email and registration numbers are shown. Only the Alpine Avenue branch is listed. **Owner to confirm whether Branch 1 is still operating.** |
| C20 | Emergency service | Legacy FAQ implied Wednesday emergency help | **Owner (2026-09-25): no emergency service outside opening hours.** Site copy, service FAQ, booking form and footer were updated. |
| C21 | Testimonial (new) | Review text visible in owner reel V1 (Vikash Shelke, cat spay) | Only the clearly legible sentences are quoted. |

## 3. Must NOT be invented / must NOT be published
- No new doctors, credentials, awards, prices, stats, reviews, equipment or partnerships.
- **Private files, never published:** Bella cat lab reports (client name), bio-medical-waste invoice (bank details), TECHSAVVY IT invoice (unrelated), and any photo showing client data or phone screenshots.
- Reel README "1980s" scenes are fictional trend visuals and are **not** clinic history.
- AI-generated or 80s-reel imagery is not used as clinic photography.

## 4. Missing information (flagged)
- Email address (none exists).
- Emergency / after-hours policy beyond "call first".
- Owner-approved review quotes; Google Business profile URL (only the Maps place link is known).
- Parking/landmark directions beyond "near Jagtap Dairy, Aundh–Wakad Road".
