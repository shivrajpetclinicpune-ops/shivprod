/* Shivraj — core interactions (every page). No dependencies. */
(() => {
  const d = document;
  const html = d.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const track = (name, label) => { if (typeof window.gtag === 'function') window.gtag('event', name, { event_category: 'engagement', event_label: label }); };

  /* ---------- Nav: scrolled / hide-on-down / progress ---------- */
  const nav = d.querySelector('[data-nav]');
  const progress = d.querySelector('[data-progress]');
  let ticking = false;
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 10);
    nav.classList.toggle('is-compact', y > 140);
    const max = d.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Full-screen menu ---------- */
  const menu = d.querySelector('[data-menu]');
  const toggle = d.querySelector('[data-menu-toggle]');
  function setMenu(open) {
    if (!menu || !toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    d.body.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      setTimeout(() => menu.querySelector('a')?.focus(), 300);
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 760);
    }
  }
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => { if (e.target.closest('[data-menu-link]')) setMenu(false); });
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && d.body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); } });

  /* ---------- Open-now status (Asia/Kolkata) + today's row ---------- */
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const HOURS = (() => { try { return JSON.parse(d.body.dataset.hours); } catch (e) { return { days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], sessions: [['10:30', '13:30'], ['15:00', '20:30']] }; } })();
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const SESSIONS = HOURS.sessions.map(([o, c]) => [toMin(o), toMin(c)]);
  const fmt = (m) => { const h = Math.floor(m / 60); const mm = String(m % 60).padStart(2, '0'); return `${((h + 11) % 12) + 1}:${mm} ${h >= 12 ? 'PM' : 'AM'}`; };
  function clinicStatus() {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const openDay = (dd) => HOURS.days.includes(DAYS[dd]);
    if (openDay(day)) {
      for (const [a, b] of SESSIONS) if (mins >= a && mins < b) return { open: true, text: `Open now · until ${fmt(b)}`, day };
      const next = SESSIONS.find(([a]) => mins < a);
      if (next) return { open: false, text: `Closed now · opens ${fmt(next[0])}`, day };
    }
    let nd = (day + 1) % 7; while (!openDay(nd)) nd = (nd + 1) % 7;
    return { open: false, text: `${openDay(day) ? 'Closed now' : `Closed ${DAYS[day]}s`} · opens ${DAYS[nd].slice(0, 3)} ${fmt(SESSIONS[0][0])}`, day };
  }
  function paintStatus() {
    const s = clinicStatus();
    d.querySelectorAll('[data-status]').forEach((el) => {
      el.classList.toggle('is-open', s.open);
      const t = el.querySelector('.status__text');
      if (t) t.textContent = el.classList.contains('status--nav') ? (s.open ? 'Open now' : 'Closed now') : s.text;
    });
    d.querySelectorAll('[data-hours] [data-day]').forEach((row) => row.classList.toggle('is-today', row.dataset.day === DAYS[s.day]));
  }
  paintStatus();
  setInterval(paintStatus, 60000);

  /* ---------- Pet sound cues (rate-limited, engagement-gated, mutable) ---------- */
  const SOUNDS = {
    dog: '/media/sounds/dog-bark-shivraj-pet-clinic-pune.mp3',
    cat: '/media/sounds/cat-meow-shivraj-pet-clinic-pune.mp3',
    happy: '/media/sounds/happy-cat-appointment-booked-shivraj-pet-clinic.mp3',
  };
  const GAP = 4 * 60 * 1000;
  const startedAt = Date.now();
  let engaged = false;
  try {
    const pages = Number(sessionStorage.getItem('sh-pages') || 0) + 1;
    sessionStorage.setItem('sh-pages', String(pages));
    if (pages > 1) engaged = true;
  } catch (e) { /* ignore */ }
  addEventListener('scroll', () => { if (scrollY > 600) engaged = true; }, { passive: true });
  const soundToggle = d.querySelector('[data-sound-toggle]');
  const isMuted = () => store.get('sh-sound-muted') === '1';
  function paintSoundToggle() {
    if (!soundToggle) return;
    const on = !isMuted();
    soundToggle.setAttribute('aria-pressed', String(on));
    soundToggle.setAttribute('aria-label', on ? 'Pet sounds on — click to mute' : 'Pet sounds off — click to turn on');
  }
  paintSoundToggle();
  soundToggle?.addEventListener('click', () => { store.set('sh-sound-muted', isMuted() ? '0' : '1'); paintSoundToggle(); });
  window.shivrajSound = function (name, { requireEngagement = true } = {}) {
    if (!SOUNDS[name] || isMuted()) return false;
    if (requireEngagement && !engaged && Date.now() - startedAt < 15000) return false;
    if (Date.now() - Number(store.get('sh-sound-last') || 0) < GAP) return false;
    const a = new Audio(SOUNDS[name]);
    a.volume = name === 'happy' ? 0.45 : 0.35;
    store.set('sh-sound-last', String(Date.now()));
    a.play().catch(() => {});
    window.__soundUntil = Date.now() + (name === 'happy' ? 0 : 650);
    return true;
  };
  d.addEventListener('click', (e) => {
    const el = e.target.closest('[data-sound]');
    if (el) window.shivrajSound(el.dataset.sound);
  }, true);

  /* ---------- Dog-hug pop-up: 2 s on directions / dog content, separate 4-min cooldowns ---------- */
  const hug = d.querySelector('[data-hug]');
  let hugOnReturn = false;
  function showHug(kind, { force = false } = {}) {
    if (!hug) return;
    const key = `sh-hug-${kind}`;
    if (!force && Date.now() - Number(store.get(key) || 0) < GAP) return;
    store.set(key, String(Date.now()));
    if (kind === 'directions') {
      // Maps opens in a new tab/app: if this page gets hidden, replay the pop-up when the visitor returns.
      hugOnReturn = true;
      setTimeout(() => { hugOnReturn = false; }, 60000);
    }
    const img = hug.querySelector('img');
    img.loading = 'eager';
    hug.classList.remove('is-on');
    void hug.offsetWidth;
    hug.classList.add('is-on');
    clearTimeout(hug._t);
    hug._t = setTimeout(() => hug.classList.remove('is-on'), 2000);
  }
  d.addEventListener('visibilitychange', () => {
    if (d.visibilityState === 'visible' && hugOnReturn) { hugOnReturn = false; setTimeout(() => showHug('directions', { force: true }), 400); }
  });
  // Arriving on dog content (post page, or after clicking a dog link on the previous page).
  try {
    if (sessionStorage.getItem('sh-hug-pending') === 'dog' || d.body.dataset.cat === 'dog') setTimeout(() => showHug('dog'), 900);
    sessionStorage.removeItem('sh-hug-pending');
  } catch (e) { /* ignore */ }
  d.addEventListener('click', (e) => {
    const el = e.target.closest('a, button, label');
    if (!el) return;
    if (el.matches('[data-directions]') || /maps\.google|google\.com\/maps/.test(el.getAttribute('href') || '')) {
      const href = el.getAttribute('href');
      if (hug && Date.now() - Number(store.get('sh-hug-directions') || 0) >= GAP && href) {
        e.preventDefault();
        const note = hug.querySelector('[data-hug-note]');
        if (note) note.textContent = 'Opening directions to Shivraj Pet Clinic & Lab…';
        showHug('directions');
        hugOnReturn = false;
        setTimeout(() => { location.href = href; }, 2000);
      }
      return;
    }
    if (el.dataset.sound === 'dog') {
      if (el.tagName === 'A' && el.target !== '_blank') { try { sessionStorage.setItem('sh-hug-pending', 'dog'); } catch (err) { /* ignore */ } } else showHug('dog');
    }
  });

  /* ---------- Analytics (legacy events preserved) ---------- */
  d.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('tel:')) track('phone_click', href);
    else if (href.includes('wa.me')) track('whatsapp_click', href);
    else if (href.includes('#book')) track('book_appointment_click', href);
    if (a.hasAttribute('data-directions')) track('directions_click', href);
  });

  /* ---------- Page transitions ---------- */
  const curtain = d.querySelector('[data-transition]');
  if (html.classList.contains('pt-enter') && curtain) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      html.classList.remove('pt-enter');
      curtain.classList.add('is-leave');
      setTimeout(() => curtain.classList.remove('is-leave'), 700);
    }));
  }
  if (!reduced && curtain) {
    d.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname.startsWith('/admin')) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // in-page anchor
      if (/\.(mp4|mp3|jpg|png|webp|pdf)$/i.test(url.pathname)) return;
      e.preventDefault();
      curtain.classList.add('is-in');
      try { sessionStorage.setItem('sh-pt', '1'); } catch (err) { /* ignore */ }
      const wait = Math.max(420, (window.__soundUntil || 0) - Date.now());
      setTimeout(() => { location.href = url.href; }, wait);
    });
    addEventListener('pageshow', (e) => { if (e.persisted) curtain.classList.remove('is-in', 'is-leave'); });
  }

  /* ---------- Paw prints on deliberate clicks / taps (pooled, never on form fields) ---------- */
  if (!reduced) {
    const MAX = 12; // directive: at most ~12 visible marks, each ~750 ms
    const layer = d.createElement('div');
    layer.className = 'pawprints';
    layer.setAttribute('aria-hidden', 'true');
    d.body.appendChild(layer);
    const pool = Array.from({ length: MAX }, () => {
      const el = d.createElement('span');
      el.className = 'pawprint';
      layer.appendChild(el);
      return el;
    });
    let next = 0;
    let last = 0;
    d.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || !e.isPrimary) return;
      if (e.target.closest('input, textarea, select, label, [contenteditable], .lightbox, video, iframe, .prose')) return;
      const now = performance.now();
      if (now - last < 140) return; // rapid clicking never floods
      last = now;
      const el = pool[next]; next = (next + 1) % MAX;
      const touch = e.pointerType !== 'mouse';
      el.classList.remove('is-on');
      el.style.setProperty('--x', `${e.clientX + (Math.random() * 10 - 5)}px`);
      el.style.setProperty('--y', `${e.clientY + (Math.random() * 10 - 5)}px`);
      el.style.setProperty('--r', `${Math.round(Math.random() * 50 - 25)}deg`);
      el.style.setProperty('--s', touch ? '1.25' : '1');
      void el.offsetWidth; // restart animation on a recycled print
      el.classList.add('is-on');
    }, { passive: true });
  }

  /* ---------- Contact system: dock retreats near forms + footer; mobile bar hides while typing ---------- */
  const away = [...d.querySelectorAll('.bk, [data-foot], .lightbox')];
  if (away.length && 'IntersectionObserver' in window) {
    const onScreen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      d.body.classList.toggle('dock-away', onScreen.size > 0);
    }, { threshold: 0.08 });
    away.forEach((el) => io.observe(el));
  }
  d.addEventListener('focusin', (e) => { if (e.target.matches('input:not([type="radio"]), textarea, select')) d.body.classList.add('bar-away'); });
  d.addEventListener('focusout', () => setTimeout(() => { if (!d.activeElement?.matches('input:not([type="radio"]), textarea, select')) d.body.classList.remove('bar-away'); }, 50));

  /* ---------- Cinematic image hover (desktop) / tap focus (touch) ---------- */
  const cine = d.querySelectorAll('[data-cine]');
  if (cine.length && !reduced) {
    if (finePointer) {
      cine.forEach((fig) => {
        let raf = 0;
        fig.addEventListener('pointermove', (e) => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            const r = fig.getBoundingClientRect();
            fig.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
            fig.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
            raf = 0;
          });
        });
        fig.addEventListener('pointerenter', () => fig.classList.add('is-cine'));
        fig.addEventListener('pointerleave', () => { fig.classList.remove('is-cine'); fig.style.setProperty('--mx', 0); fig.style.setProperty('--my', 0); });
      });
    } else {
      cine.forEach((fig) => fig.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;
        const on = !fig.classList.contains('is-cine');
        cine.forEach((f) => f.classList.remove('is-cine'));
        fig.classList.toggle('is-cine', on);
      }));
    }
  }

  /* ---------- Magnetic primary buttons (fine pointers only) ---------- */
  if (finePointer && !reduced) {
    d.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }


  /* ---------- Clinic reels: muted autoplay in view, tap for sound ---------- */
  const reels = [...d.querySelectorAll('[data-vreel]')];
  if (reels.length) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      const v = en.target.querySelector('video');
      if (en.isIntersecting) { v.play().catch(() => {}); } else if (v.muted) { v.pause(); }
    }), { threshold: [0, 0.45, 0.8] });
    reels.forEach((r) => {
      io.observe(r);
      const v = r.querySelector('video');
      const btn = r.querySelector('[data-vreel-sound]');
      btn.addEventListener('click', () => {
        const on = v.muted;
        reels.forEach((o) => { if (o !== r) { const ov = o.querySelector('video'); ov.muted = true; o.querySelector('[data-vreel-sound]').setAttribute('aria-pressed', 'false'); o.querySelector('[data-vreel-sound] span').textContent = 'Play with sound'; } });
        v.muted = !on;
        if (on) { v.currentTime = 0; v.play().catch(() => {}); v.controls = true; track('video_sound_on', v.getAttribute('aria-label')); }
        btn.setAttribute('aria-pressed', String(on));
        btn.querySelector('span').textContent = on ? 'Mute' : 'Play with sound';
      });
    });
  }

  /* ---------- Blog post: reading progress + TOC highlight ---------- */
  const readBar = d.querySelector('[data-read-progress]');
  const body = d.querySelector('.post__body');
  if (readBar && body) {
    addEventListener('scroll', () => {
      const r = body.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight * 0.6)));
      readBar.style.transform = `scaleX(${p})`;
    }, { passive: true });
    const links = [...d.querySelectorAll('.post__toc a')];
    if (links.length) {
      const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
      const io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { links.forEach((a) => a.classList.remove('is-on')); map.get(en.target.id)?.classList.add('is-on'); }
      }), { rootMargin: '-20% 0px -70% 0px' });
      map.forEach((a, id) => { const h = d.getElementById(id); if (h) io.observe(h); });
    }
  }
})();
