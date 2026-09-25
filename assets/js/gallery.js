/* Gallery: category filter + accessible lightbox (keyboard, swipe, focus return). */
(() => {
  const d = document;
  const items = [...d.querySelectorAll('.gal__item')];
  const status = d.querySelector('[data-filter-status]');

  d.querySelectorAll('[data-filter]').forEach((btn) => btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    d.querySelectorAll('[data-filter]').forEach((b) => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    let shown = 0;
    items.forEach((it) => { const show = cat === 'all' || it.dataset.cat === cat; it.hidden = !show; if (show) shown++; });
    if (status) status.textContent = `Showing ${shown} photos`;
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.gsap.fromTo(items.filter((i) => !i.hidden), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.6, ease: 'expo.out' });
    }
    window.ScrollTrigger?.refresh();
  }));

  const lb = d.querySelector('[data-lb]');
  if (!lb) return;
  const img = lb.querySelector('[data-lb-img]');
  const cap = lb.querySelector('[data-lb-cap]');
  const count = lb.querySelector('[data-lb-count]');
  let list = [];
  let idx = 0;
  let opener = null;

  function show(i) {
    idx = (i + list.length) % list.length;
    const b = list[idx];
    img.src = b.dataset.full;
    img.alt = b.dataset.caption;
    cap.textContent = b.dataset.caption;
    count.textContent = `${idx + 1} / ${list.length}`;
  }
  function open(btn) {
    list = items.filter((it) => !it.hidden).map((it) => it.querySelector('[data-lightbox]'));
    opener = btn;
    lb.hidden = false;
    d.body.style.overflow = 'hidden';
    show(list.indexOf(btn));
    lb.querySelector('[data-lb-close]').focus();
  }
  function close() {
    lb.hidden = true;
    d.body.style.overflow = '';
    img.removeAttribute('src');
    opener?.focus();
  }
  d.querySelectorAll('[data-lightbox]').forEach((b) => b.addEventListener('click', () => open(b)));
  lb.querySelector('[data-lb-close]').addEventListener('click', close);
  lb.querySelector('[data-lb-prev]').addEventListener('click', () => show(idx - 1));
  lb.querySelector('[data-lb-next]').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  d.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'Tab') { // keep focus inside the dialog
      const f = [...lb.querySelectorAll('button')];
      const i = f.indexOf(d.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  let sx = null;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    sx = null;
  });
})();
