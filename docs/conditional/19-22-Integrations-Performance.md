# 19 — Integrations
WhatsApp deep links · `tel:` · Google Maps (owner embed, lazy iframe, 200–240 px) · GA4 `G-94PYDYSWKF` · Sveltia/Decap CMS (GitHub backend `shivrajpetclinicpune-ops/shivprod`, OAuth worker unchanged). CMS collections: Blog, Gallery uploads, Clinic settings (announcement, contact/hours/fees, doctors & team, testimonials, services) → `data/cms/*.json`, read at build time.

# 22 — Performance budget
Images: AVIF/WebP at 480/960/1600 with `sizes`, lazy below the fold, intrinsic width/height (no layout shift). Fonts: one 20 KB variable woff2, preloaded. JS: GSAP+ScrollTrigger (~70 KB gz, vendored, deferred) + ~12 KB own code; paw prints use a 5-element pool; marquees pause off-screen; videos `preload="metadata"`, autoplay muted only while visible. Budget: LCP < 2.5 s on 4G, CLS < 0.05, JS < 110 KB gz. **Lighthouse not yet run.**
