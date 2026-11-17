const clinic = require('../../data/clinic');
const { services, groups } = require('../../data/services');
const extracted = require('../../data/extracted.json');
const { speciesPages } = require('../../data/species-pages');
const { icon } = require('../icons');
const { picture, btn, faqList, absImg, esc, statusPill, photo, postCover, reel, videosFor, videoSchema, soundAttr, brandHtml, brandText, contactPair, pageHead } = require('../components');

const BY_SLUG = Object.fromEntries(services.map((s) => [s.slug, s]));
// Owner correction (2026-09-25): no emergency service outside opening hours or on Wednesdays.
const HOURS_ONLY = 'Emergency care is available during our opening hours only: Mon, Tue, Thu–Sun, 10:30 AM–1:30 PM and 3:00–8:30 PM. We are closed on Wednesdays and do not offer after-hours emergency service. Outside these hours, please contact a 24-hour veterinary hospital.';
const FAQ_FIX = { 'Are you open for emergencies on Wednesday (your day off)?': 'No. Wednesday is our weekly off and we do not offer emergency service outside opening hours. On Wednesdays or after hours, please contact a 24-hour veterinary hospital.' };
// Legacy bodies sometimes jump h2 → h4; with no h3 present, the h4s are really the next level down.
// Owner rule: the clinic offers no grooming. Beak/nail trims and rabbit dental rasping are medical care.
const noGrooming = (h) => h.replace(/Grooming &amp; Maintenance|Grooming & Maintenance/g, 'Beak, nail &amp; dental care');
const levels = (h) => (/<h3[\s>]/.test(h) ? h : h.replace(/<(\/?)h4(?=[\s>])/g, '<$1h3'));
const CONTENT = Object.fromEntries([...extracted.services, ...speciesPages].map((s) => [s.slug, {
  ...s,
  title: brandText(s.title), description: brandText(s.description), h1: brandText(s.h1), lead: brandText(s.lead), body: brandHtml(s.body),
  faqs: s.faqs.map((f) => ({ q: brandText(f.q), a: brandText(FAQ_FIX[f.q] || f.a) })),
  body: s.slug === 'emergency-surgery' ? `<aside class="note note--warn"><strong>Opening hours only.</strong> ${HOURS_ONLY}</aside>${levels(brandHtml(s.body))}` : levels(noGrooming(brandHtml(s.body))),
}]));

// Legacy titles leaned on "Wakad & Pimple Saudagar" although the clinic is in Pimple Nilakh;
// keep those search terms but lead with the true location.
// Search titles ≤60 characters so they are not cut off; location detail lives in the H1, description and body.
const TITLES = {
  'cat-spaying': 'Cat Spaying in Pune | Shivraj Pet Clinic & Lab',
  'clinical-medicine': 'Vet Consultation in Pune | Shivraj Pet Clinic & Lab',
  'ct-scan-mri': 'CT Scan & MRI Referral for Pets | Shivraj Pet Clinic & Lab',
  'digital-xray': 'Digital X-Ray for Pets in Pune | Shivraj Pet Clinic & Lab',
  'dog-neutering': 'Dog Neutering in Pune | Shivraj Pet Clinic & Lab',
  'dog-tumor-surgery': 'Dog Tumor Surgery in Pune | Shivraj Pet Clinic & Lab',
  'emergency-surgery': 'Emergency Pet Surgery in Pune | Shivraj Pet Clinic & Lab',
  'exotic-animal-centre': 'Exotic Pet Vet in Pune | Shivraj Pet Clinic & Lab',
  'foreign-body-removal-surgery': 'Foreign Body Removal for Pets | Shivraj Pet Clinic & Lab',
  'orthopedic-surgery': 'Pet Orthopedic Surgery in Pune | Shivraj Pet Clinic & Lab',
  'pathology-lab': 'Pet Pathology Lab in Pune | Shivraj Pet Clinic & Lab',
  'preventive-medicine': 'Pet Vaccination in Pune | Shivraj Pet Clinic & Lab',
  'soft-tissue-surgery': 'Soft Tissue Surgery for Pets | Shivraj Pet Clinic & Lab',
  'sonography': 'Pet Ultrasound in Pune | Shivraj Pet Clinic & Lab',
  'vet-pharmacy': 'Vet Pharmacy in Pune | Shivraj Pet Clinic & Lab',
};
const DESCRIPTIONS = {
  'cat-spaying': 'Cat spaying at Shivraj Pet Clinic & Lab, Pimple Nilakh, Pune, near Wakad and Pimple Saudagar: same-day surgery under gas anaesthesia, 10-day suture check.',
  'preventive-medicine': 'Pet vaccination, deworming and wellness checks for dogs, cats, rabbits and exotic pets at Shivraj Pet Clinic & Lab, Pimple Nilakh, Pune.',
  sonography: 'In-clinic pet ultrasound at Shivraj Pet Clinic & Lab, Pimple Nilakh, Pune, including early pregnancy confirmation and foetal heartbeat checks for dogs and cats.',
};
const localise = (t) => t.replace(/in Wakad & Pimple Saudagar/i, 'in Pimple Nilakh, Wakad & Pimple Saudagar');

function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: clinic.site + path })),
  };
}

const SPECIES_LINKS = () => {
  const list = services.filter((x) => x.group === 'exotic' && x.slug !== 'exotic-animal-centre' && !x.hidden);
  return list.length ? `<section class="svc__species" aria-labelledby="sp-h"><h2 id="sp-h">Care by species</h2><ul>${list.map((x) => `<li><a href="/services/${x.slug}"><strong>${x.name}</strong>: ${esc(x.blurb)}</a></li>`).join('')}</ul></section>` : '';
};

function servicePage(slug, posts) {
  const s = BY_SLUG[slug];
  const c = CONTENT[slug];
  const pageTitle = TITLES[slug] || localise(c.title);
  const pageDesc = DESCRIPTIONS[slug] || c.description;
  const group = groups.find((g) => g.id === s.group);
  const related = s.related.map((r) => BY_SLUG[r]).filter(Boolean);
  const pick = (c.posts || []).map((sl) => posts.find((p) => p.slug === sl)).filter(Boolean);
  const relatedPosts = (pick.length ? pick : posts.filter((p) => p.cat === s.blogCat)).slice(0, 4);
  const path = `/services/${slug}`;
  const vids = videosFor(path);
  const scan = s.group === 'diagnostics' ? '<span class="dx__scan" aria-hidden="true"></span>' : '';
  const trail = [['Home', '/'], ['Care', '/services/'], [s.name, path]];

  const body = `<article class="svc svc--${s.group}">
  <header class="svc__hero">
    <div class="wrap svc__hero-grid">
      <div class="svc__hero-copy">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services/">Care</a><span aria-hidden="true">/</span><span aria-current="page">${s.name}</span></nav>
        <p class="kicker">${esc(c.tag || group.name)}</p>
        <h1 class="display display--page">${esc(c.h1)}</h1>
        <p class="svc__lead">${esc(c.lead)}</p>
        <div class="svc__cta">${btn('/#book', 'Book an appointment')}</div>
        ${contactPair({ waText: `Hi Shivraj Pet Clinic & Lab, I'd like to ask about ${s.name}.` })}
        <p class="svc__review">${icon('check')} Medically reviewed by <a href="/about#pritesh">Dr. Pritesh S. Vidhate</a>, ${clinic.doctors[0].creds}</p>
      </div>
      <figure class="svc__hero-img"${scan ? ' data-scan' : ' data-mask="up"'}>
        ${picture(s.photo, { sizes: '(min-width:1024px) 44vw, 100vw', eager: true })}
        ${scan}
      </figure>
    </div>
  </header>
  <div class="wrap svc__grid">
    <div class="svc__main prose">
      ${vids.length ? `<div class="svc__reel">${vids.map((id) => reel(id)).join('')}</div>` : ''}
      ${slug === 'exotic-animal-centre' ? SPECIES_LINKS() : ''}
      ${c.body}
      ${c.faqs.length ? `<section class="svc__faq" aria-labelledby="faq-h"><h2 id="faq-h">Frequently asked questions</h2>${faqList(c.faqs, { open: 0 })}</section>` : ''}
    </div>
    <aside class="rail" aria-label="Book and visit">
      <div class="rail__sec">
        <p class="label">Book this service</p>
        <p class="rail__big">Same clinic. Same doctors. One message away.</p>
        <a class="btn btn--primary btn--block" href="/#book"><span class="btn__label">Book an appointment</span><span class="btn__ic">${icon('arrow')}</span></a>
        <a class="rail__call" href="tel:${clinic.phone}">${icon('phone')} ${clinic.phoneDisplay}</a>
      </div>
      <div class="rail__sec">
        <p class="label">Hours</p>
        ${statusPill()}
        <p>Mon, Tue, Thu–Sun<br>${clinic.hoursRanges.join('<br>')}<br>Wednesday closed</p>
        <p class="muted">Consultation ₹${clinic.fees.regular} · Exotic ₹${clinic.fees.exotic}</p>
      </div>
      <div class="rail__sec">
        <p class="label">Related care</p>
        <ul class="rail__links">${related.map((r) => `<li><a href="/services/${r.slug}"${soundAttr(r.name)}><span>${r.name}</span>${icon('arrow')}</a></li>`).join('')}</ul>
      </div>
    </aside>
  </div>
  ${relatedPosts.length ? `<section class="wrap svc__posts" aria-labelledby="rp-h">
    <h2 class="display display--sm" id="rp-h">From the blog</h2>
    <div class="rows">${relatedPosts.map((p) => postRow(p)).join('')}</div>
  </section>` : ''}
</article>`;

  // A service page describes a Service the clinic offers, on a medically reviewed page (not a second business).
  const medical = {
    '@context': 'https://schema.org', '@type': 'MedicalWebPage',
    '@id': `${clinic.site}${path}#webpage`,
    url: clinic.site + path,
    name: pageTitle,
    description: pageDesc,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${clinic.site}/#website` },
    reviewedBy: { '@id': `${clinic.site}/about#pritesh` },
    primaryImageOfPage: absImg(s.photo),
    mainEntity: {
      '@type': 'Service',
      '@id': `${clinic.site}${path}#service`,
      name: s.name,
      serviceType: s.name,
      description: c.description,
      provider: { '@id': `${clinic.site}/#clinic` },
      areaServed: clinic.areas.map((a) => ({ '@type': 'Place', name: `${a}, Pune` })),
      ...(s.group === 'exotic' ? { offers: { '@type': 'Offer', name: 'Exotic pet consultation', price: clinic.fees.exotic, priceCurrency: 'INR' } } : {}),
    },
  };
  const faqSchema = c.faqs.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : null;

  return {
    path,
    title: pageTitle,
    description: pageDesc,
    image: absImg(s.photo),
    imageAlt: photo(s.photo).alt,
    schema: [breadcrumbs(trail), medical, faqSchema, ...vids.map(videoSchema)].filter(Boolean),
    body,
    bodyClass: 'page-service',
  };
}

// Editorial article row (blog index, related reading). Used instead of cards everywhere.
function postRow(p, { eager = false } = {}) {
  return `<a class="row" href="/blog/${p.slug}" data-cat="${p.cat}" data-text="${esc((p.title + ' ' + p.summary).toLowerCase())}"${soundAttr(p.cat === 'dog' || p.cat === 'cat' ? p.cat : p.title)}>
    <figure class="row__img">${postCover(p, { sizes: '(min-width:1024px) 14rem, 30vw', alt: '', eager })}</figure>
    <span class="row__cat label">${p.catName}</span>
    <span class="row__main"><strong class="row__t">${esc(p.title)}</strong><span class="row__sum">${esc(p.summary)}</span></span>
    <span class="row__meta">${p.read} min ${icon('arrow')}</span>
  </a>`;
}

function servicesHub() {
  const visible = services.filter((s) => !s.hidden);
  const sections = groups.map((g, gi) => {
    const list = visible.filter((s) => s.group === g.id);
    return `<section class="hub__group${gi % 2 ? ' hub__group--flip' : ''}" id="group-${g.id}" aria-labelledby="hub-${g.id}">
      <figure class="hub__img" data-mask="${gi % 2 ? 'right' : 'left'}">${picture(list[0].photo, { sizes: '(min-width:1024px) 38vw, 100vw' })}</figure>
      <div class="hub__body">
        <header class="hub__ghead"><p class="label">${g.kicker}</p><h2 class="display display--sm" id="hub-${g.id}">${g.name}</h2></header>
        <ul class="hub__rows">${list.map((s) => `<li><a href="/services/${s.slug}"${soundAttr(s.name)}><strong>${s.name}</strong><span>${s.blurb}</span>${icon('arrowUpRight')}</a></li>`).join('')}</ul>
        ${g.id === 'exotic' ? `<dl class="hub__facts">
          <div><dt>Species</dt><dd>Birds · Rabbits · Turtles &amp; tortoises · Iguanas &amp; lizards · Guinea pigs, hamsters &amp; gerbils</dd></div>
          <div><dt>Anaesthesia</dt><dd>Gaseous (inhalation) anaesthesia for procedures</dd></div>
          <div><dt>Consultation</dt><dd>₹${clinic.fees.exotic} for exotic pets, payable at the clinic</dd></div>
        </dl>` : ''}
      </div>
    </section>`;
  }).join('');
  const jump = `<ul class="hub-jump">${groups.map((g) => `<li><a href="#group-${g.id}">${g.name} <small>${visible.filter((s) => s.group === g.id).length}</small></a></li>`).join('')}</ul>`;
  const body = `${pageHead({ crumbs: [['Care', '/services/']], kicker: 'Care & services', title: 'Veterinary services in Pimple Nilakh, Pune.', lead: 'Everyday care, a dedicated Exotic Animal Centre, same-building diagnostics and surgery under gaseous anaesthesia, for dogs, cats, birds, rabbits, turtles and more.', extra: jump })}
  <div class="wrap hub">${sections}
    <p class="hub__note">${icon('xray')} Need CT or MRI? We coordinate <a href="/services/ct-scan-mri">referrals for advanced imaging</a>.</p>
  </div>`;
  return {
    path: '/services/',
    title: 'Veterinary Services in Pimple Nilakh, Pune | Shivraj Pet Clinic & Lab',
    description: 'Vaccination, consultations, exotic pet care, in-house lab, digital X-ray, sonography and surgery for dogs, cats, birds, rabbits and turtles in Pimple Nilakh, Pune.',
    schema: [breadcrumbs([['Home', '/'], ['Care', '/services/']]), {
      '@context': 'https://schema.org', '@type': 'ItemList',
      itemListElement: visible.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${clinic.site}/services/${s.slug}`, name: s.name })),
    }],
    body,
    bodyClass: 'page-hub',
  };
}

module.exports = { servicePage, servicesHub, postRow, breadcrumbs, CONTENT };
