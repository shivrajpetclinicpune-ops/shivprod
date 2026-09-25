/* Shivraj Pet Clinic & Lab — motion (docs/15). Each pattern has one job:
   hero entrance (orientation) · masked photo reveals (continuity) · intro words light up (reading pace)
   · care index image swap (context) · pinned species journey (multispecies story) · diagnostic scan
   (what the lab does) · surgery iris (focus) · care journey progression (sequence).
   Reduced motion: none of this runs; CSS shows everything in its final state. */
(() => {
  const d = document;
  const html = d.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 1024px)');
  const once = (els, cb, opts = { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }) => {
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); } }), opts);
    els.forEach((el) => io.observe(el));
  };

  clearTimeout(window.__mt);
  if (reduced) { html.classList.add('reveal-all'); }

  /* ---------- Hero entrance + patient window ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add('is-loaded')));
  const cyc = [...d.querySelectorAll('[data-cyc]')];
  if (cyc.length > 1 && !reduced) {
    let i = 0;
    let visible = true;
    const hero = d.querySelector('[data-hero]');
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
    setInterval(() => {
      if (!visible || d.hidden) return;
      const cur = cyc[i];
      i = (i + 1) % cyc.length;
      const next = cyc[i];
      next.querySelectorAll('img[loading="lazy"]').forEach((im) => { im.loading = 'eager'; });
      cur.classList.add('is-out');
      next.classList.add('is-on');
      setTimeout(() => cur.classList.remove('is-on', 'is-out'), 950);
    }, 3200);
  }

  /* ---------- Masked photo reveals ----------
     A fully clip-path-masked element never "intersects" in Chrome (and its lazy image never loads),
     so we watch the unmasked parent and reveal its masked children. */
  if (!reduced) {
    const masked = [...d.querySelectorAll('[data-mask]')];
    const parents = [...new Set(masked.map((el) => el.parentElement))];
    once(parents, (p) => p.querySelectorAll(':scope > [data-mask]').forEach((el) => el.classList.add('is-in')), { rootMargin: '0px 0px -10% 0px', threshold: 0 });
  }

  /* ---------- Intro statement: words light up at reading pace ---------- */
  const words = d.querySelector('[data-words]');
  // Desktop only: on a phone the half-grey paragraph reads as unfinished.
  if (words && !reduced && desktop.matches) {
    const wrap = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            if (/^\s+$/.test(t)) frag.appendChild(d.createTextNode(t));
            else { const s = d.createElement('span'); s.className = 'w'; s.textContent = t; frag.appendChild(s); }
          });
          n.replaceWith(frag);
        }
      });
    };
    wrap(words);
    const ws = [...words.querySelectorAll('.w')];
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = words.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.9 - r.top) / (r.height * 0.8 + innerHeight * 0.2)));
      const n = Math.round(p * ws.length * 1.15);
      ws.forEach((w, k) => w.classList.toggle('is-lit', k < n));
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
    paint();
  }

  /* ---------- Care index: the stage follows hover / keyboard focus ---------- */
  const shots = new Map([...d.querySelectorAll('[data-care-shot]')].map((s) => [s.dataset.careShot, s]));
  const caption = d.querySelector('[data-care-caption]');
  const rows = [...d.querySelectorAll('[data-care]')];
  if (shots.size && rows.length) {
    let current = rows[0];
    current.classList.add('is-on');
    const show = (row) => {
      if (row === current) return;
      current?.classList.remove('is-on');
      row.classList.add('is-on');
      current = row;
      shots.forEach((s, id) => s.classList.toggle('is-on', id === row.dataset.care));
      const shot = shots.get(row.dataset.care);
      shot?.querySelectorAll('img[loading="lazy"]').forEach((im) => { im.loading = 'eager'; });
      if (caption) caption.textContent = row.dataset.blurb;
    };
    rows.forEach((r) => { r.addEventListener('pointerenter', () => show(r)); r.addEventListener('focus', () => show(r)); });
  }

  /* ---------- Diagnostic scan (plays once when the photo arrives) ---------- */
  once([...d.querySelectorAll('[data-scan]')], (el) => {
    if (reduced) { el.classList.add('is-scanned'); return; }
    el.classList.add('is-scanning');
    setTimeout(() => el.classList.add('is-scanned'), 700);
  }, { threshold: 0.45 });

  /* ---------- Care journey: active step, photo cross-cut, progress line ---------- */
  const jr = d.querySelector('[data-journey]');
  if (jr) {
    const steps = [...jr.querySelectorAll('[data-jr-step]')];
    const jshots = [...jr.querySelectorAll('[data-jr-shot]')];
    const bar = jr.querySelector('[data-jr-bar]');
    const setStep = (i) => {
      steps.forEach((s, k) => s.classList.toggle('is-on', k === i));
      jshots.forEach((s, k) => s.classList.toggle('is-on', k === i));
      jshots[i + 1]?.querySelectorAll('img[loading="lazy"]').forEach((im) => { im.loading = 'eager'; });
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setStep(steps.indexOf(e.target)); }), { rootMargin: '-48% 0px -48% 0px' });
    steps.forEach((s) => io.observe(s));
    if (bar) {
      const list = jr.querySelector('.jr__steps');
      let raf = 0;
      const paint = () => { raf = 0; const r = list.getBoundingClientRect(); bar.style.setProperty('--p', Math.min(1, Math.max(0, (innerHeight * 0.5 - r.top) / r.height)).toFixed(3)); };
      addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
      paint();
    }
  }

  /* ---------- GSAP-driven pieces (desktop, motion allowed) ---------- */
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  if (!gsap || !ST || reduced) return;
  gsap.registerPlugin(ST);

  // "Not every pet looks the same": pinned horizontal journey through the species.
  const exo = d.querySelector('[data-exo]');
  if (exo) {
    const pin = exo.querySelector('[data-exo-pin]');
    const track = exo.querySelector('[data-exo-track]');
    const panels = [...exo.querySelectorAll('[data-sp]')];
    const dots = [...exo.querySelectorAll('[data-exo-dot]')];
    let st = null;
    const distance = () => Math.max(0, track.scrollWidth - innerWidth);
    const build = () => {
      if (st || !desktop.matches) return;
      exo.classList.add('exo-pinned');
      track.removeAttribute('tabindex');
      const tween = gsap.to(track, { x: () => -distance(), ease: 'none' });
      st = ST.create({
        trigger: exo, pin, start: 'top top', end: () => `+=${distance()}`, scrub: 0.5, animation: tween, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (self) => {
          // Positions come from scroll progress (the scrubbed transform renders a frame later than this callback).
          const shift = self.progress * distance();
          let active = 0;
          panels.forEach((p, k) => {
            const left = p.offsetLeft - shift;
            if (left < innerWidth * 1.4) p.querySelectorAll('img[loading="lazy"]').forEach((im) => { im.loading = 'eager'; });
            if (left < innerWidth * 0.92) p.classList.add('is-in');
            if (left < innerWidth * 0.5) active = k;
          });
          dots.forEach((dt, k) => dt.classList.toggle('is-on', k === active));
        },
      });
      panels.slice(0, 2).forEach((p) => p.classList.add('is-in'));
      // Species links (#sp-dogs …) scroll to where that panel is centred in the pinned journey.
      d.querySelectorAll('a[href^="#sp-"]').forEach((a) => a.addEventListener('click', (e) => {
        const panel = d.getElementById(a.getAttribute('href').slice(1));
        if (!panel || !st) return;
        e.preventDefault();
        const x = Math.min(distance(), Math.max(0, panel.offsetLeft - innerWidth * 0.12));
        scrollTo({ top: st.start + x, behavior: 'smooth' });
      }));
    };
    const kill = () => {
      if (!st) return;
      st.kill(true);
      st = null;
      gsap.set(track, { clearProps: 'transform' });
      exo.classList.remove('exo-pinned');
      track.setAttribute('tabindex', '0');
    };
    build();
    desktop.addEventListener('change', () => { if (desktop.matches) build(); else kill(); ST.refresh(); });
  }

  // Surgery: the photo opens like a theatre light as the band arrives (any viewport).
  const iris = d.querySelector('[data-iris]');
  if (iris) {
    const img = iris.querySelector('[data-iris-img]');
    gsap.fromTo(img, { '--r': '14%' }, { '--r': '150%', ease: 'none', scrollTrigger: { trigger: iris, start: 'top 85%', end: 'top 10%', scrub: 0.6 } });
  }

  // Images and fonts settle layout late on slow connections: recompute pin distances once they do.
  addEventListener('load', () => ST.refresh());
  d.fonts?.ready.then(() => ST.refresh());
})();
