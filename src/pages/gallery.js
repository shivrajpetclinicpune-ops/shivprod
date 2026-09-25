const clinic = require('../../data/clinic');
const photos = require('../../data/photos');
const { picture, imgUrl, absImg, esc, photo, pageHead } = require('../components');
const { breadcrumbs } = require('./service');

// First matching tag wins → one category per photo.
const CATS = [
  ['dogs', 'Dogs', ['dogs']], ['cats', 'Cats', ['cats']], ['birds', 'Birds', ['birds']],
  ['small', 'Rabbits & small pets', ['rabbits', 'smallpets']], ['reptiles', 'Turtles & reptiles', ['turtles', 'reptiles']],
  ['diagnostics', 'Lab & imaging', ['lab', 'xray', 'sonography', 'diagnostics']], ['surgery', 'Surgery', ['surgery']],
  ['people', 'Doctors, team & clinic', ['doctors', 'team', 'clinic', 'pharmacy']],
];
const EXCLUDE = new Set(['ct-workstation']); // CT hidden per client (C5)
// Photos where the patient matters more than the person/equipment tag.
const PRIORITY = ['dogs', 'cats', 'birds', 'rabbits', 'smallpets', 'turtles', 'reptiles'];

function catOf(p) {
  const animal = PRIORITY.find((t) => p.tags.includes(t) && !p.tags.includes('doctors') && !p.tags.includes('surgery') && !p.tags.includes('xray'));
  const tags = animal ? [animal] : p.tags;
  return (CATS.find(([, , ts]) => ts.some((t) => tags.includes(t))) || CATS[CATS.length - 1])[0];
}

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const CMS_CAT = { dogs: 'dogs', cats: 'cats', birds: 'birds', rabbits: 'small', reptiles: 'reptiles', surgery: 'surgery', team: 'people' };
function cmsPhotos() {
  const dir = path.resolve(__dirname, '../../images/gallery-data');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => matter(fs.readFileSync(path.join(dir, f), 'utf8')).data)
    .filter((d) => d.image).sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

// Curated sequence: a 12-column archive where every row closes cleanly.
//   full = 12 cols (strongly landscape frames only), wide = 8 cols, tall = 4 cols (same row height as wide).
// Portraits are interleaved round-robin across categories so the archive reads as a story, not a dump.
const FULL = ['clinic-signboard', 'guinea-pigs-pair', 'rabbit-sonography'];
const ROWS = [['full'], ['wide', 'tall'], ['tall', 'tall', 'tall'], ['tall', 'wide'], ['tall', 'tall', 'tall']];

function sequence(items) {
  const isLand = (p) => { const m = photo(p.id); return m.w / m.h > 1.05; };
  const full = FULL.map((id) => items.find((p) => p.id === id)).filter(Boolean);
  const wide = items.filter((p) => isLand(p) && !FULL.includes(p.id));
  const byCat = CATS.map(([id]) => items.filter((p) => !isLand(p) && p.cat === id));
  const tall = [];
  while (byCat.some((q) => q.length)) byCat.forEach((q) => { if (q.length) tall.push(q.shift()); });
  const out = [];
  for (let r = 0; full.length || wide.length || tall.length; r++) {
    ROWS[r % ROWS.length].forEach((slot) => {
      const src = slot === 'full' ? (full.length ? full : wide.length ? wide : tall) : slot === 'wide' ? (wide.length ? wide : tall) : (tall.length ? tall : wide);
      const p = src.shift();
      if (p) out.push({ ...p, shape: src === full ? 'full' : src === wide ? 'wide' : 'tall' });
    });
  }
  return out;
}

module.exports = function gallery() {
  const items = sequence(photos.filter((p) => !EXCLUDE.has(p.id)).map((p) => ({ ...p, cat: catOf(p) })));
  const counts = Object.fromEntries(CATS.map(([id]) => [id, items.filter((i) => i.cat === id).length]));
  const filters = [['all', 'All', items.length], ...CATS.map(([id, name]) => [id, name, counts[id]])].filter(([, , n]) => n)
    .map(([id, name, n], i) => `<button type="button" class="tab${i === 0 ? ' is-on' : ''}" data-filter="${id}" aria-pressed="${i === 0}"${id === 'dogs' ? ' data-sound="dog"' : id === 'cats' ? ' data-sound="cat"' : ''}>${name}<sup>${n}</sup></button>`).join('');
  const uploads = cmsPhotos().map((d) => `<figure class="gal__item gal__item--tall" data-cat="${CMS_CAT[d.category] || 'people'}">
      <button type="button" class="gal__btn" data-lightbox="u" data-full="${esc(d.image)}" data-caption="${esc(d.title || '')}" aria-label="Enlarge: ${esc(d.title || 'clinic photo')}">
        <span class="pic pic--cover"><img class="pic__main" src="${esc(d.image)}" alt="${esc(d.title || 'Photo at Shivraj Pet Clinic & Lab')}" loading="lazy" decoding="async"></span>
      </button>
      <figcaption>${esc(d.title || '')}</figcaption>
    </figure>`).join('');
  const grid = items.map((p, i) => `<figure class="gal__item gal__item--${p.shape}" data-cat="${p.cat}">
      <button type="button" class="gal__btn" data-lightbox="${i}" data-full="${imgUrl(p.id, 1600)}" data-caption="${esc(p.alt)}" aria-label="Enlarge: ${esc(p.alt)}">
        ${picture(p.id, { sizes: p.shape === 'full' ? '100vw' : p.shape === 'wide' ? '(min-width:768px) 64vw, 92vw' : '(min-width:768px) 32vw, 46vw', eager: i < 2 })}
      </button>
      <figcaption><span class="label">${CATS.find(([id]) => id === p.cat)[1]}</span> ${esc(p.alt)}</figcaption>
    </figure>`).join('');

  const body = `${pageHead({ crumbs: [['Gallery', '/gallery']], kicker: 'Gallery', title: 'Real patients. Real clinic.', lead: `${items.length} photographs from Shivraj Pet Clinic &amp; Lab, every one taken at the clinic. No stock images, no staged models. Select any photo to see it whole.` })}
  <div class="wrap">
    <div class="tabs tabs--gal" role="group" aria-label="Filter photos">${filters}</div>
    <p class="sr" aria-live="polite" data-filter-status></p>
    <div class="gal" data-gallery>${uploads}${grid}</div>
  </div>
  <div class="lightbox" data-lb hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
    <button type="button" class="lightbox__close" data-lb-close aria-label="Close photo viewer">${require('../icons').icon('close')}</button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" data-lb-prev aria-label="Previous photo">${require('../icons').icon('arrow')}</button>
    <figure class="lightbox__fig"><img data-lb-img alt=""><figcaption data-lb-cap aria-live="polite"></figcaption></figure>
    <button type="button" class="lightbox__nav lightbox__nav--next" data-lb-next aria-label="Next photo">${require('../icons').icon('arrow')}</button>
    <p class="lightbox__count" data-lb-count></p>
  </div>`;

  return {
    path: '/gallery',
    title: 'Gallery: Real Patients & Clinic Photos | Shivraj Pet Clinic & Lab, Pune',
    description: 'Photos from Shivraj Pet Clinic & Lab, Pimple Nilakh: dogs, cats, parrots, rabbits, guinea pigs, turtles and iguanas, plus our lab, digital X-ray, sonography, surgery and team.',
    image: absImg('bird-alexandrine'),
    schema: [breadcrumbs([['Home', '/'], ['Gallery', '/gallery']]), {
      '@context': 'https://schema.org', '@type': 'ImageGallery', name: 'Shivraj Pet Clinic & Lab gallery', url: `${clinic.site}/gallery`,
      image: items.slice(0, 30).map((p) => ({ '@type': 'ImageObject', contentUrl: absImg(p.id), caption: p.alt })),
    }],
    body,
    bodyClass: 'page-gallery',
    scripts: ['gallery'],
  };
};
