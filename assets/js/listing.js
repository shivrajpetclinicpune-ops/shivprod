/* Blog index (filter, search, show-more, legacy #slug links) and FAQ page (search). */
(() => {
  const d = document;
  const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s]/g, ' ');

  /* ---------- Blog index ---------- */
  const list = d.querySelector('[data-list]');
  if (list) {
    // Legacy blog.html#slug links → /blog/slug
    const hash = location.hash.slice(1);
    if (/^[a-z0-9-]{6,}$/.test(hash) && d.querySelector(`a[href="/blog/${hash}"]`)) { location.replace(`/blog/${hash}`); return; }

    const cards = [...list.querySelectorAll('.row')];
    const more = d.querySelector('[data-list-more]');
    const status = d.querySelector('[data-list-status]');
    const search = d.querySelector('[data-list-search]');
    const PAGE = 24;
    let cat = new URLSearchParams(location.search).get('cat') || 'all';
    let limit = PAGE;

    function apply() {
      const q = norm(search.value.trim());
      const matches = cards.filter((c) => (cat === 'all' || c.dataset.cat === cat) && (!q || norm(c.dataset.text).includes(q)));
      cards.forEach((c) => { c.hidden = true; });
      matches.slice(0, limit).forEach((c) => { c.hidden = false; });
      more.hidden = matches.length <= limit;
      status.textContent = q || cat !== 'all' ? `${matches.length} article${matches.length === 1 ? '' : 's'} found` : '';
      d.querySelectorAll('[data-filter]').forEach((b) => { const on = b.dataset.filter === cat; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
      window.ScrollTrigger?.refresh();
    }
    d.querySelectorAll('[data-filter]').forEach((b) => b.addEventListener('click', () => {
      cat = b.dataset.filter; limit = PAGE;
      const u = new URL(location.href);
      if (cat === 'all') u.searchParams.delete('cat'); else u.searchParams.set('cat', cat);
      history.replaceState(null, '', u);
      apply();
    }));
    let t;
    search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { limit = PAGE; apply(); }, 120); });
    more.addEventListener('click', () => { limit += PAGE; apply(); });
    apply();
  }

  /* ---------- FAQ page search ---------- */
  const fq = d.querySelector('[data-faq-search]');
  if (fq) {
    const groups = [...d.querySelectorAll('[data-faq-group]')];
    const status = d.querySelector('[data-faq-status]');
    let t;
    fq.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const q = norm(fq.value.trim());
        let total = 0;
        groups.forEach((g) => {
          let n = 0;
          g.querySelectorAll('.faq__item').forEach((it) => {
            const hit = !q || norm(it.textContent).includes(q);
            it.hidden = !hit;
            if (hit) n++;
            if (q && hit && n <= 2) it.open = true; else if (!q) it.open = false;
          });
          g.hidden = n === 0;
          total += n;
        });
        status.textContent = q ? `${total} matching answer${total === 1 ? '' : 's'}` : '';
        window.ScrollTrigger?.refresh();
      }, 150);
    });
  }
})();
