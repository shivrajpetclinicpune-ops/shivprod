/* Booking composer → WhatsApp request. Never claims a confirmed appointment. */
(() => {
  const PHONE = '917756965169';
  const d = document;

  // Today in Asia/Kolkata as YYYY-MM-DD, plus minutes since midnight.
  const istNow = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const iso = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  // Slot labels start at 10–12 (morning) or 5–8 (evening), so the hour alone is unambiguous.
  const slotStart = (label) => {
    const [, h, m] = label.match(/^(\d{1,2}):(\d{2})/);
    const hour = Number(h);
    return (hour <= 8 ? hour + 12 : hour) * 60 + Number(m);
  };
  const prettyDate = (v) => {
    const [y, mo, da] = v.split('-').map(Number);
    return new Date(y, mo - 1, da).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  d.querySelectorAll('[data-composer]').forEach((form) => {
    const date = form.querySelector('input[type="date"]');
    const preview = form.querySelector('[data-preview]');
    const errs = Object.fromEntries([...form.querySelectorAll('[data-err]')].map((e) => [e.dataset.err, e]));
    const val = (n) => (form.querySelector(`[name="${n}"]:checked`) || form.querySelector(`[name="${n}"]:not([type="radio"])`))?.value?.trim() || '';

    /* Progressive steps: one question at a time (all steps stay visible without JS). */
    const steps = [...form.querySelectorAll('[data-step]')];
    const dots = [...form.querySelectorAll('[data-bk-dot]')];
    const status = form.querySelector('[data-bk-status]');
    const STEP_OF = { species: 0, visit: 1, date: 2, slot: 2, name: 3 };
    let at = 0;
    form.classList.add('bk-stepped');
    function go(i, { focus = true } = {}) {
      at = Math.max(0, Math.min(steps.length - 1, i));
      steps.forEach((st, k) => st.classList.toggle('is-on', k === at));
      dots.forEach((dt, k) => { dt.classList.toggle('is-on', k === at); dt.classList.toggle('is-done', k < at); });
      if (status) status.textContent = `Step ${at + 1} of ${steps.length}: ${steps[at].querySelector('legend').textContent}`;
      if (focus) {
        const target = steps[at].querySelector('input:checked') || steps[at].querySelector('input:not(:disabled), textarea');
        target?.focus({ preventScroll: true });
        const top = form.getBoundingClientRect().top;
        if (top < 60 || top > innerHeight * 0.6) form.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }
    }
    const stepProblems = (i) => Object.entries(validate(false)).filter(([k]) => STEP_OF[k] === i);
    form.querySelectorAll('[data-bk-next]').forEach((b) => b.addEventListener('click', () => {
      const probs = stepProblems(at);
      if (probs.length) { probs.forEach(([k, msg]) => { errs[k].textContent = msg; }); return; }
      go(at + 1);
    }));
    form.querySelectorAll('[data-bk-back]').forEach((b) => b.addEventListener('click', () => go(at - 1)));
    // Single-choice questions advance by themselves once answered (keyboard users keep arrow-key control).
    form.addEventListener('click', (e) => {
      const input = e.target.closest('.chip')?.querySelector('input[name="species"], input[name="visit"]');
      if (!input || e.detail === 0) return;
      setTimeout(() => { if (input.checked && !(input.name === 'visit' && input.value === 'Emergency')) go(STEP_OF[input.name] + 1); }, 260);
    });
    go(0, { focus: false });

    const today = istNow();
    date.min = iso(today);
    const max = new Date(today); max.setDate(max.getDate() + 60);
    date.max = iso(max);

    function syncSlots() {
      const isToday = date.value === iso(istNow());
      const mins = istNow().getHours() * 60 + istNow().getMinutes();
      form.querySelectorAll('input[name="slot"]').forEach((r) => {
        const past = isToday && slotStart(r.value) <= mins;
        r.disabled = past;
        if (past && r.checked) r.checked = false;
      });
    }

    function message() {
      const species = val('species'); const pet = val('pet');
      const lines = ['Hi Shivraj Pet Clinic & Lab! I’d like to request an appointment.', ''];
      if (species) lines.push(`Patient: ${species}${pet ? ` (${pet})` : ''}`);
      if (val('visit')) lines.push(`Reason: ${val('visit')}`);
      if (date.value || val('slot')) lines.push(`Preferred: ${date.value ? prettyDate(date.value) : ''}${date.value && val('slot') ? ' · ' : ''}${val('slot')}`);
      if (val('name')) lines.push(`Name: ${val('name')}`);
      if (val('note')) lines.push(`Note: ${val('note')}`);
      lines.push('', 'Please confirm if this time works. Thank you!');
      return lines.join('\n');
    }

    function validate(show) {
      const problems = {};
      if (!val('species')) problems.species = 'Please choose the type of pet.';
      if (!val('visit')) problems.visit = 'Please choose a reason for the visit.';
      if (!date.value) problems.date = 'Please pick a date.';
      else if (new Date(`${date.value}T12:00:00`).getDay() === 3) problems.date = 'We’re closed on Wednesdays — please pick another day.';
      else if (date.value < date.min) problems.date = 'Please pick today or a future date.';
      if (!val('slot')) problems.slot = 'Please choose a time slot.';
      if (!val('name')) problems.name = 'Please tell us your name.';
      if (show) {
        Object.entries(errs).forEach(([k, el]) => { el.textContent = problems[k] || ''; });
        date.setAttribute('aria-invalid', String(!!problems.date));
        form.querySelector('[name="name"]').setAttribute('aria-invalid', String(!!problems.name));
      }
      return problems;
    }

    let typing;
    function render() {
      const text = message();
      clearTimeout(typing);
      // quick "typing" flourish on the newest characters only
      const current = preview.textContent;
      if (text.startsWith(current.slice(0, -1)) && text.length - current.length < 80 && text.length > current.length) {
        let n = current.length;
        const step = () => { n += 3; preview.textContent = text.slice(0, n); if (n < text.length) typing = setTimeout(step, 14); };
        step();
      } else preview.textContent = text;
      form.classList.toggle('is-ready', Object.keys(validate(false)).length === 0);
    }

    date.addEventListener('change', () => {
      if (date.value && new Date(`${date.value}T12:00:00`).getDay() === 3) errs.date.textContent = 'We’re closed on Wednesdays — please pick another day.';
      else errs.date.textContent = '';
      syncSlots();
      render();
    });
    form.addEventListener('input', render);
    form.addEventListener('change', (e) => {
      if (e.target.name && errs[e.target.name]) errs[e.target.name].textContent = '';
      if (e.target.name === 'visit' && e.target.value === 'Emergency') errs.visit.textContent = 'Emergencies are seen during opening hours only. Please call +91 77569 65169 before you travel. We don’t offer after-hours or Wednesday emergency service.';
      render();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const problems = validate(true);
      const first = Object.keys(problems)[0];
      if (first) {
        go(STEP_OF[first], { focus: false });
        const target = first === 'date' ? date : first === 'name' ? form.querySelector('[name="name"]') : form.querySelector(`[name="${first}"]`);
        target?.focus({ preventScroll: false });
        return;
      }
      const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message())}`;
      window.open(url, '_blank', 'noopener');
      if (typeof window.gtag === 'function') window.gtag('event', 'booking_submit', { event_category: 'engagement', event_label: `${val('species')} · ${val('visit')}` });
      if (window.shivrajSound) window.shivrajSound('happy', { requireEngagement: false });
      const note = form.querySelector('.bk__note');
      note.innerHTML = '<strong>WhatsApp opened with your request.</strong> Send the message there — the clinic will reply to confirm your slot. Didn’t open? <a href="' + url + '" target="_blank" rel="noopener">Tap here</a> or call <a href="tel:+917756965169">+91 77569 65169</a>.';
      note.setAttribute('role', 'status');
    });

    render();
  });
})();
