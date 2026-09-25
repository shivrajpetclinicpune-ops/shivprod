# 25 — Redirect / URL Migration Map (implemented in `_redirects`)

| Old URL | New | Code | Why |
|---|---|---|---|
| `/*.html` (all pages) | clean URL | 308 (Cloudflare Pages automatic) | Canonicals now clean — no redirect chains |
| `/blog.html`, `/blog` | `/blog/` | 301 | Blog index moved into the blog folder |
| `/pet-hospital-near-me` | `/#book` | 301 | Kept from legacy |
| `/admin` | `/admin/` | 301 | Kept from legacy |
| `/post/exotic-pet-care-in-pune-trusted-veterinary-support-at-shivraj-pet-clinic` | `/blog/exotic-pet-care-pune` | 301 | Old Wix URL still in Google (404 on live) |
| `/post/*` | `/blog/` | 301 | Other Wix posts |
| `/service-page/consultation` · `/in-house-sonography` · `/pharmacy-mini-pet-shop` · `/whiskers-pet-shop` · `/*` | matching service / `/services/` | 301 | Old Wix service pages |
| `/about-3` | `/about` | 301 | Old Wix page |
| `/blog/neutering-rabbits-pune` | `/blog/neutering-rabbits` | 301 | Duplicate post that existed only on live |
| `/index` | `/` | 301 | Hygiene |

All 15 service URLs, all 184 post URLs, `/about`, `/gallery`, `/pet-care-faqs` are preserved. New: `/services/` hub, `/contact`. Apex→www redirect must be set in the Cloudflare dashboard (cannot be done in `_redirects`).
