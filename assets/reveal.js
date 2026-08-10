/* ══════════════════════════════════════════════════════════════
   Shivraj Pet Clinic — shared scroll-reveal animation system
   Auto-tags common page patterns (section headers, card grids,
   FAQ items, callout boxes) with data-reveal, then fades/slides
   them in as they scroll into view. One file, every page.

   Deliberately does NOT touch the homepage hero (#hero) — that
   section is static/editorial by design, per client spec.

   Safety: if this script fails to load or errors out, nothing on
   the page is ever hidden — elements only get opacity:0 AFTER
   this script explicitly tags them.
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return; // respect the user's OS-level preference, no animation at all
  }

  function excluded(el) {
    return !!(
      el.closest("#hero") ||
      el.closest("nav") ||
      el.closest(".mob-nav") ||
      el.closest(".ticker-bar") ||
      el.closest(".qc-bar")
    );
  }

  function tag(el, type, delayMs) {
    if (!el || el.nodeType !== 1) return;
    if (el.hasAttribute("data-reveal")) return;
    if (excluded(el)) return;
    el.setAttribute("data-reveal", type || "up");
    if (delayMs) el.style.transitionDelay = delayMs + "ms";
  }

  function run() {
    // Section-level headers — always lead the sequence
    document.querySelectorAll(".tag").forEach(function (el) { tag(el, "up", 0); });
    document.querySelectorAll("h2.ttl").forEach(function (el) { tag(el, "up", 90); });
    document.querySelectorAll("p.sub").forEach(function (el) { tag(el, "up", 160); });
    document.querySelectorAll("h1").forEach(function (el) { tag(el, "up", 0); });

    // Any card/list grid site-wide: doc-grid, svc-grid, gal-grid, team-grid,
    // why-grid, mission-grid, story-grid, symptom-grid, posts-grid, faq-list,
    // related-list, svc-img-strip, etc. — stagger the direct children,
    // alternating left/right for a livelier, more visible sequence.
    var groupSelector = '[class*="grid"], [class*="strip"], .faq-list, .related-list, .gallery-grid';
    document.querySelectorAll(groupSelector).forEach(function (grid) {
      if (excluded(grid)) return;
      var kids = Array.prototype.slice.call(grid.children);
      var cols = window.getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      kids.forEach(function (kid, i) {
        var type = "up";
        if (cols >= 2) type = i % 2 === 0 ? "left" : "right";
        tag(kid, type, Math.min(i, 8) * 100);
      });
    });

    // Standalone cards/boxes not already covered by a grid group above
    var soloSelector = '[class*="card"], .info-box, .faq-item, .sidebar-cta, ' +
      ".post-highlight, .post-warning, .post-quickfacts, .doc-card, .t-card";
    document.querySelectorAll(soloSelector).forEach(function (el, i) {
      tag(el, i % 2 === 0 ? "left" : "right", 0);
    });

    // Blog post hero images and standalone lead photos
    document.querySelectorAll(".post-hero-img").forEach(function (el) { tag(el, "scale", 0); });
    document.querySelectorAll(".page-hero img, .about-photo, .svc-main img").forEach(function (el) { tag(el, "scale", 0); });

    // Species pills, symptom chips, breadcrumbs — small quick pops
    document.querySelectorAll(".symptom-chip, .animal-pill").forEach(function (el, i) {
      tag(el, "up", Math.min(i, 10) * 60);
    });

    var targets = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    targets.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
