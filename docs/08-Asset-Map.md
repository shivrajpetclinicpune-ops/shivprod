# 08 — Asset Map

**Source audit:** 481 image copies were scanned: loose files in `uss only what needed/`, members of both nested zips, and legacy `images/`.
- SHA1 hashing plus perceptual dHash/aHash reduced them to **199 distinct images**.
- Near-identical burst shots were collapsed to one frame each.
- The audit data (`audit.json`, contact sheets) is kept in the session scratchpad. The curated result is committed as `data/photos.js`.

## Published photos
- **63 real clinic photographs**, one per scene, with no duplicates.
- Each has a descriptive alt text/caption, SEO filename, focal tags and a section assignment.
- Generated files: `images/p/<id>-shivraj-pet-clinic-<width>.{avif,webp,jpg}` at 480/960/1600 px widths, 361 files in total, produced by `npm run images`.
- **No photo is ever cropped** (owner rule). Frames either follow the photo's own aspect ratio (`fit:'natural'`) or show the whole photo with a soft blurred backdrop.

## Other media
| Asset | File(s) | Use |
|---|---|---|
| Logo (owner) | `images/logo.png/.webp`, `mark.*`, favicon set | Nav, schema, icons |
| Call / WhatsApp cat buttons (owner) | `images/ui/call-cat-button-*`, `whatsapp-cat-button-*` (background removed) | Every call/WhatsApp control, desktop dock, mobile action bar |
| Dog-hug pop-up (owner) | `images/ui/dog-hug-shivraj-pet-clinic-and-lab-*.webp` | 2 s full-screen flash before the Maps redirect and on dog content, with a separate 4-minute cooldown for each. ⚠ **This is fan art of a trademarked cartoon (Courage the Cowardly Dog). The owner must confirm rights before launch.** Disable with `hugPopup.enabled` in `data/clinic.js` |
| Paw cursor | `images/ui/paw-cursor-*.svg` (drawn for project) | Desktop cursor and pressed state |
| Clinic reels (owner, 4) | `media/reel-*.mp4` + poster | Home "On camera", cat spaying, pathology lab, sonography, exotic centre, bird first-aid post. Muted autoplay loop. The lab reel carries a "runway" watermark (possible AI processing; owner to confirm) |
| Pet sounds (owner, 3) | `media/sounds/dog-bark-…mp3`, `cat-meow-…mp3`, `happy-cat-appointment-booked-…mp3` | Dog/cat clicks and booking submit. Plays only after engagement, at most once per 4 min, with a mute toggle |
| Fonts | `assets/fonts/figtree-var.woff2` (SIL OFL) | All text |

## Not published (by design)
- Graphic surgery and wound photos.
- Lab reports showing client names; ultrasound frames with patient names.
- The bio-medical-waste invoice (contains bank details) and the unrelated IT invoice.
- Unrelated "tushar" interior photos.
- AI-generated reel stills (80s "Tuffy" scenes and posters) and designed social posters, since they are not clinic photography.
- Vaccine price cards (prices unconfirmed).
- The low-resolution client-home photos (consent not given).

## Blog covers
- **160 of 184** posts show a real clinic photo of the **same species** as the post. The species is taken from the title, or from the category when the title doesn't name one; the topic (surgery, imaging or examination) then narrows the choice.
- Posts about no particular animal use animal-free clinic photos.
- **24 posts** keep their original stock image, captioned "Illustrative stock photo".
