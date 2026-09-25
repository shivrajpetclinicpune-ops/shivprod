const photos = require('../data/photos');
const meta = require('../data/photos.meta.json');
const clinic = require('../data/clinic');
const { icon } = require('./icons');

const PHOTO = Object.fromEntries(photos.map((p) => [p.id, p]));

// Sound cue hooks (core.js plays them, rate-limited): dog-related → bark, cat-related → meow.
const soundFor = (text) => (/\b(dogs?|pupp(y|ies)|canine)\b/i.test(text) ? 'dog' : /\b(cats?|kittens?|feline)\b/i.test(text) ? 'cat' : '');
const soundAttr = (text) => { const s = soundFor(text); return s ? ` data-sound="${s}"` : ''; };

// Owner rule: the clinic is always "Shivraj Pet Clinic & Lab", never just "Shivraj".
const brandHtml = (s) => String(s ?? '')
  .replace(/\bShivraj Pet Clinic\b(?!\s*(?:&amp;|&)\s*Lab)(?!\s*(?:&amp;|&)\s*Exotic)/g, 'Shivraj Pet Clinic &amp; Lab')
  .replace(/(^|[\s>(“"'])Shivraj\b(?!\s*Pet)/g, '$1Shivraj Pet Clinic &amp; Lab');
const brandText = (s) => brandHtml(s).replace(/&amp;/g, '&');

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function photo(id) {
  const p = PHOTO[id];
  if (!p) throw new Error(`Unknown photo id: ${id}`);
  return { ...p, ...meta[id] };
}

// SEO-friendly generated filename: <photo-id>-shivraj-pet-clinic-<width>.<ext>
const file = (id, w, ext) => `/images/p/${id}-shivraj-pet-clinic-${w}.${ext}`;

// Responsive photo.
//   fit:'cover'   (default) fills its frame, cropped around the photo's hand-set focal point (`pos`).
//   fit:'natural' the frame takes the photo's own aspect ratio (nothing cropped).
// Owner decision 2026-09-25: focal-point crops are allowed; the gallery lightbox always shows the whole photo.
function picture(id, { sizes = '100vw', eager = false, cls = '', alt, fit = 'cover', pos } = {}) {
  const p = photo(id);
  const set = (ext) => p.widths.map((w) => `${file(id, w, ext)} ${w}w`).join(', ');
  return `<span class="pic pic--${fit}${cls ? ' ' + cls : ''}" data-photo="${id}" style="--ar:${p.w}/${p.h};--pos:${pos || p.pos || '50% 50%'};--dom:${p.color}">`
    + `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">`
    + `<source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">`
    + `<img class="pic__main" src="${file(id, p.fallback, 'jpg')}" width="${p.w}" height="${p.h}" alt="${esc(alt ?? p.alt)}"`
    + ` ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture></span>`;
}

const imgUrl = (id, w = 960) => {
  const p = photo(id);
  const width = p.widths.find((x) => x >= w) || p.widths[p.widths.length - 1];
  return file(id, width, 'webp');
};
const absImg = (id) => `${clinic.site}${file(id, photo(id).fallback, 'jpg')}`;

const label = (text, cls = '') => `<span class="label${cls ? ' ' + cls : ''}">${text}</span>`;

const btn = (href, text, { variant = 'primary', ic = 'arrow', attrs = '' } = {}) =>
  `<a class="btn btn--${variant}" href="${href}" ${attrs}><span class="btn__label">${text}</span><span class="btn__ic">${icon(ic)}</span></a>`;

const waLink = (text) => `${clinic.whatsapp}?text=${encodeURIComponent(text)}`;

// The supplied cat artwork is the clinic's contact identity: used for every Call / WhatsApp control.
const CAT = {
  call: { src: '/images/ui/call-cat-button-shivraj-pet-clinic', w: 192, h: 190 },
  wa: { src: '/images/ui/whatsapp-cat-button-shivraj-pet-clinic', w: 192, h: 192 },
};
const catImg = (kind, px = 96) => `<img class="cat cat--${kind}" src="${CAT[kind].src}-${px > 96 ? 192 : 96}.webp" srcset="${CAT[kind].src}-96.webp 96w, ${CAT[kind].src}-192.webp 192w, ${CAT[kind].src}-320.webp 320w" sizes="${px}px" width="${CAT[kind].w}" height="${CAT[kind].h}" alt="" decoding="async" loading="lazy">`;

// Call / WhatsApp pair with the cat artwork (hero, footer, visit, service pages).
function contactPair({ waText = 'Hi Shivraj Pet Clinic & Lab, I’d like to book an appointment.', cls = '' } = {}) {
  return `<div class="cpair${cls ? ' ' + cls : ''}">
    <a class="cpair__a" href="tel:${clinic.phone}">${catImg('call', 56)}<span><small>Call the clinic</small>${clinic.phoneDisplay}</span></a>
    <a class="cpair__a" href="${waLink(waText)}" target="_blank" rel="noopener">${catImg('wa', 56)}<span><small>WhatsApp us</small>Message the clinic</span></a>
  </div>`;
}

function sectionHead({ kicker, title, intro = '', id = '', cls = '' }) {
  return `<header class="shead${cls ? ' ' + cls : ''}">
    ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
    <h2 class="display"${id ? ` id="${id}"` : ''}>${title}</h2>
    ${intro ? `<p class="shead__intro">${intro}</p>` : ''}
  </header>`;
}

function statusPill(cls = '') {
  return `<span class="status${cls ? ' ' + cls : ''}" data-status aria-live="polite"><span class="status__dot"></span><span class="status__text">${clinic.hoursText}</span></span>`;
}

function hoursTable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const rows = days.map((d) => {
    const closed = !clinic.openDays.includes(d);
    return `<li class="hours__row${closed ? ' is-closed' : ''}" data-day="${d}"><span class="hours__day">${d}</span>`
      + (closed ? `<span class="hours__time">Closed</span>`
        : `<span class="hours__time">${clinic.hoursRanges.map((r) => `<span>${r}</span>`).join('<br>')}</span>`)
      + `</li>`;
  }).join('');
  return `<ul class="hours" data-hours>${rows}</ul>`;
}

function faqList(items, { open = -1 } = {}) {
  return `<div class="faq">${items.map((f, i) => `<details class="faq__item"${i === open ? ' open' : ''}>
      <summary class="faq__q"><span>${esc(f.q)}</span><span class="faq__ic">${icon('plus')}</span></summary>
      <div class="faq__a">${f.aHtml || `<p>${esc(f.a)}</p>`}</div>
    </details>`).join('')}</div>`;
}

const SPECIES_OPTIONS = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Turtle / tortoise', 'Reptile', 'Guinea pig / hamster', 'Other'];
const VISIT_TYPES = ['General check-up', 'Vaccination', 'Illness / consultation', 'Lab tests', 'X-ray / sonography', 'Surgery consultation', 'Exotic pet visit', 'Emergency', 'Other'];

// Appointment request → WhatsApp. A progressive four-step flow (booking.js); every step is
// visible and usable without JavaScript. Never claims a confirmed appointment.
function bookingComposer(uid = 'bk') {
  const chips = (name, opts) => opts.map((lbl) =>
    `<label class="chip"${soundAttr(lbl)}><input type="radio" name="${name}" value="${esc(lbl)}"><span>${esc(lbl)}</span></label>`).join('');
  const slotChips = (list) => list.map((s) => `<label class="chip chip--slot"><input type="radio" name="slot" value="${esc(s)}"><span>${esc(s)}</span></label>`).join('');
  const nav = (first, last) => `<div class="bk__nav">${first ? '' : '<button type="button" class="bk__back" data-bk-back>Back</button>'}${last ? '' : '<button type="button" class="btn btn--primary btn--sm" data-bk-next><span class="btn__label">Continue</span></button>'}</div>`;
  const steps = ['Patient', 'Need', 'Day & time', 'Your details'];
  return `<form class="bk" data-composer novalidate aria-describedby="${uid}-note">
    <div class="bk__flow">
      <ol class="bk__progress" aria-hidden="true">${steps.map((s, i) => `<li${i === 0 ? ' class="is-on"' : ''} data-bk-dot>${s}</li>`).join('')}</ol>
      <p class="sr" aria-live="polite" data-bk-status></p>
      <fieldset class="bk__step" data-step>
        <legend class="bk__q">Who’s coming in?</legend>
        <div class="chips">${chips('species', SPECIES_OPTIONS)}</div>
        <p class="bk__err" data-err="species" role="alert"></p>
        ${nav(true, false)}
      </fieldset>
      <fieldset class="bk__step" data-step>
        <legend class="bk__q">What do you need?</legend>
        <div class="chips">${chips('visit', VISIT_TYPES)}</div>
        <p class="bk__err" data-err="visit" role="alert"></p>
        ${nav(false, false)}
      </fieldset>
      <fieldset class="bk__step" data-step>
        <legend class="bk__q">When suits you?</legend>
        <div class="field">
          <label for="${uid}-date">Date <small>(closed on Wednesdays)</small></label>
          <input id="${uid}-date" name="date" type="date" required>
          <p class="bk__err" data-err="date" role="alert"></p>
        </div>
        <p class="bk__sub">Morning</p>
        <div class="chips chips--slots">${slotChips(clinic.slots.morning)}</div>
        <p class="bk__sub">Evening</p>
        <div class="chips chips--slots">${slotChips(clinic.slots.evening)}</div>
        <p class="bk__hint">3:00–5:00 PM is usually reserved for surgery. For anything urgent, please <a href="tel:${clinic.phone}">call the clinic</a>.</p>
        <p class="bk__err" data-err="slot" role="alert"></p>
        ${nav(false, false)}
      </fieldset>
      <fieldset class="bk__step" data-step>
        <legend class="bk__q">Who should we reply to?</legend>
        <div class="field-row">
          <div class="field"><label for="${uid}-name">Your name</label><input id="${uid}-name" name="name" autocomplete="name" required><p class="bk__err" data-err="name" role="alert"></p></div>
          <div class="field"><label for="${uid}-pet">Pet’s name <small>(optional)</small></label><input id="${uid}-pet" name="pet"></div>
        </div>
        <div class="field"><label for="${uid}-note-in">Anything we should know? <small>(optional)</small></label><textarea id="${uid}-note-in" name="note" rows="3" maxlength="300"></textarea></div>
        ${nav(false, true)}
      </fieldset>
    </div>
    <aside class="bk__preview" aria-label="WhatsApp message preview">
      <p class="label">Your request, as it will be sent</p>
      <div class="bk__msg" data-preview aria-live="polite">Hi Shivraj Pet Clinic &amp; Lab! I’d like to request an appointment.</div>
      <button class="btn btn--primary btn--block" type="submit"><span class="btn__label">Send request on WhatsApp</span><span class="btn__ic">${icon('whatsapp')}</span></button>
      <p class="bk__note" id="${uid}-note">This opens WhatsApp with your request filled in. <strong>Your appointment is confirmed only when the clinic replies.</strong> Prefer to talk? <a href="tel:${clinic.phone}">Call ${clinic.phoneDisplay}</a>.</p>
    </aside>
  </form>`;
}

// Blog cover: real clinic photo when one fits the topic, else the post's own stock image (illustrative).
function postCover(p, { sizes = '100vw', eager = false, alt } = {}) {
  if (p.photo) return picture(p.photo, { sizes, eager, alt });
  return `<span class="pic pic--cover pic--stock"><img class="pic__main" src="${esc(p.img)}" width="800" height="500" alt="${esc(alt ?? p.title)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" referrerpolicy="no-referrer"></span>`;
}
const coverUrl = (p) => (p.photo ? absImg(p.photo) : p.img);

// Vertical clinic reel: muted inline loop when visible (motion permitting); tap for sound + controls.
const VIDEOS = Object.fromEntries(require('../data/videos').map((v) => [v.id, v]));
function reel(id, { cls = '' } = {}) {
  const v = VIDEOS[id];
  return `<figure class="vreel${cls ? ' ' + cls : ''}" data-vreel>
    <div class="vreel__frame">
      <video muted playsinline loop preload="none" poster="/media/${id}.webp" width="540" height="960" aria-label="${esc(v.title)}"><source src="/media/${id}.mp4" type="video/mp4"></video>
      <button type="button" class="vreel__sound" data-vreel-sound aria-pressed="false">${icon('plus')}<span>Play with sound</span></button>
    </div>
    <figcaption>${label(v.caption)}<span>${esc(v.title)}</span></figcaption>
  </figure>`;
}
const videoSchema = (id) => {
  const v = VIDEOS[id];
  return { '@context': 'https://schema.org', '@type': 'VideoObject', name: v.title, description: v.desc, thumbnailUrl: `${clinic.site}/media/${id}.jpg`,
    contentUrl: `${clinic.site}/media/${id}.mp4`, uploadDate: '2026-09-25', duration: v.duration, publisher: { '@id': `${clinic.site}/#clinic` } };
};
const videosFor = (pagePath) => Object.values(VIDEOS).filter((v) => v.pages.includes(pagePath)).map((v) => v.id);

// Supporting map: compact live embed (never the dominant element) + a directions link.
function mapEmbed(cls = '') {
  return `<figure class="map${cls ? ' ' + cls : ''}"><iframe src="${clinic.mapsEmbed}" title="Map: ${esc(clinic.name)}, Vishal Nagar, Pimple Nilakh, Pune" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <figcaption><a href="${clinic.mapsUrl}" target="_blank" rel="noopener" data-directions>Open in Google Maps ${icon('arrowUpRight')}</a></figcaption></figure>`;
}

// Street split into short lines (CMS-editable in data/cms/site.json, so never hard-coded here).
const streetLines = () => { const p = clinic.address.street.split(/,\s*/); return [p.slice(0, 2).join(', '), p.slice(2).join(', ')].filter(Boolean); };
const addressBlock = () => `<address class="addr">
    <strong>${esc(clinic.name)}</strong>
    ${streetLines().map((l) => `<span>${esc(l)}</span>`).join('')}
    <span>${esc(clinic.address.locality)}, Pune ${esc(clinic.address.pin)}</span>
    <span class="muted">${esc(clinic.address.landmark)}</span>
  </address>`;

// Shared inner-page header: breadcrumb, kicker, h1, lead, optional cropped photo window.
function pageHead({ crumbs = [], kicker = '', title, lead = '', img, imgPos, extra = '', cls = '' }) {
  const trail = [['Home', '/'], ...crumbs];
  const bc = trail.map(([t, href], i) => (i === trail.length - 1 ? `<span aria-current="page">${t}</span>` : `<a href="${href}">${t}</a>`)).join('<span aria-hidden="true">/</span>');
  return `<header class="phead${img ? ' phead--img' : ''}${cls ? ' ' + cls : ''}">
    <div class="wrap phead__grid">
      <div class="phead__copy">
        <nav class="crumbs" aria-label="Breadcrumb">${bc}</nav>
        ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
        <h1 class="display display--page">${title}</h1>
        ${lead ? `<p class="phead__lead">${lead}</p>` : ''}
        ${extra}
      </div>
      ${img ? `<figure class="phead__img" data-mask="up">${picture(img, { sizes: '(min-width:1024px) 42vw, 100vw', eager: true, pos: imgPos })}</figure>` : ''}
    </div>
  </header>`;
}

module.exports = { pageHead, file, mapEmbed, addressBlock, brandHtml, brandText, soundFor, soundAttr, reel, videoSchema, videosFor, postCover, coverUrl, esc, photo, picture, imgUrl, absImg, label, btn, waLink, catImg, contactPair, sectionHead, statusPill, hoursTable, faqList, bookingComposer, PHOTO };
