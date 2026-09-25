const clinic = require('../../data/clinic');
const { groups, services } = require('../../data/services');
const { icon } = require('../icons');
const { picture, label, btn, waLink, esc, soundAttr, statusPill, hoursTable, bookingComposer, faqList, mapEmbed, addressBlock, contactPair, reel, videosFor, videoSchema, postCover, photo } = require('../components');

// Every sentence below is taken from verified clinic content (docs/04). No new claims.

// Hero: the one landscape frame that shows multispecies care in a single picture, plus a
// small window that cycles through other real patients.
const HERO_MAIN = 'cat-persian-guinea-pigs';
const HERO_CYCLE = [
  ['bird-sun-conure', 'Sun conure'], ['turtles-trio', 'Red-eared sliders'], ['dog-pug', 'Pug'],
  ['rabbit-white', 'Rabbit'], ['iguana-arm', 'Green iguana'],
];

// "Not every pet looks the same": verified species groups (docs/04), each with two real patients.
const SPECIES = [
  { id: 'dogs', name: 'Dogs', a: 'dog-pug', b: 'dog-labrador', line: 'Puppies to seniors: vaccinations, medicine, diagnostics and surgery.', link: '/services/clinical-medicine', faq: '/pet-care-faqs#dog-faqs' },
  { id: 'cats', name: 'Cats', a: 'cat-calico', b: 'cat-bella', line: 'Calm, cat-aware handling for check-ups, dental care and surgery.', link: '/services/cat-spaying', faq: '/pet-care-faqs#cat-faqs' },
  { id: 'rabbits', name: 'Rabbits', a: 'rabbit-white', b: 'rabbit-exam', line: 'Rabbit medicine, dental rasping, ultrasound and gaseous anaesthesia.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#rabbit-faqs' },
  { id: 'birds', name: 'Birds', a: 'bird-sun-conure', b: 'bird-cockatiel-pied', line: 'African greys, macaws, budgies, cockatiels, conures, finches and lovebirds.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#bird-faqs' },
  { id: 'turtles', name: 'Turtles & tortoises', a: 'turtles-trio', b: 'xray-turtle-plate', line: 'Shell, skin and nutrition, with digital X-ray for shells and skeletons.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#turtle-faqs' },
  { id: 'reptiles', name: 'Reptiles', a: 'iguana-arm', b: 'iguanas-basket', line: 'Iguanas and other lizards: handling, diet, skin and diagnostics.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#reptile-faqs' },
  { id: 'small', name: 'Guinea pigs & small pets', a: 'guinea-pigs-pair', b: 'squirrels-rescue', line: 'Guinea pigs, hamsters and gerbils, and the occasional rescued squirrel.', link: '/services/exotic-animal-centre', faq: '/pet-care-faqs#guineapig-faqs' },
];

// Ordered care journey: the one place numbering carries meaning (owner decision 2026-09-25).
const JOURNEY = [
  { t: 'Something feels wrong', d: 'Not eating, limping, a lump, a fluffed-up bird, a rabbit with no droppings. Call, WhatsApp or walk in during opening hours.', p: 'dog-golden-stairs' },
  { t: 'Consultation', d: `A full physical examination by a veterinarian who handles your species every week, from a Labrador to a red-eared slider. Consultation is ₹${clinic.fees.regular}, or ₹${clinic.fees.exotic} for exotic pets.`, p: 'dr-pritesh-dog' },
  { t: 'Diagnosis', d: 'Digital X-ray with instant images, sonography, and an in-house pathology lab where CBC and biochemistry are ready in 15–20 minutes.', p: 'xray-review-cat' },
  { t: 'Treatment', d: 'Results are explained before you leave. Then medication from the on-site pharmacy, a procedure, or surgery under gaseous anaesthesia.', p: 'team-cat-care' },
  { t: 'Recovery', d: 'Suture checks, re-tests and review visits are planned before your pet goes home, so recovery has a clear next step.', p: 'dr-shivaji-notes' },
];

function hero() {
  const cycle = HERO_CYCLE.map(([id, name], i) => `<figure class="hero__cyc${i === 0 ? ' is-on' : ''}" data-cyc>${picture(id, { sizes: '(min-width:1024px) 16vw, 34vw', alt: i === 0 ? undefined : '' })}<figcaption>${name}</figcaption></figure>`).join('');
  return `<section class="hero" aria-labelledby="hero-title" data-hero>
  <div class="hero__copy">
    <p class="kicker" data-hero-in>Pimple Nilakh, Pune <span aria-hidden="true">·</span> Since ${clinic.founded}</p>
    <h1 class="hero__title" id="hero-title">
      <span class="hero__l"><span>Care for</span></span>
      <span class="hero__l"><span>every</span></span>
      <span class="hero__l hero__l--accent"><span>companion.</span></span>
    </h1>
    <p class="hero__lede" data-hero-in>Shivraj Pet Clinic &amp; Lab is a two-generation veterinary clinic for dogs, cats, birds, rabbits, turtles and exotic pets, with its own pathology lab, digital X-ray and sonography.</p>
    <div class="hero__cta" data-hero-in>
      ${btn('#book', 'Book an appointment', { attrs: 'data-magnetic' })}
      ${statusPill('status--hero')}
    </div>
    ${contactPair({ cls: 'cpair--hero' })}
  </div>
  <div class="hero__media">
    <figure class="hero__main" data-hero-main>${picture(HERO_MAIN, { sizes: '(min-width:1024px) 56vw, 100vw', eager: true, pos: '48% 55%' })}</figure>
    <div class="hero__window" data-hero-cycle aria-label="More of our patients">${cycle}</div>
  </div>
  <nav class="hero__species" aria-label="Species we treat">
    <p class="label">We treat</p>
    <ul>${SPECIES.map((s) => `<li><a href="#sp-${s.id}"${soundAttr(s.name)}>${s.name}</a></li>`).join('')}</ul>
  </nav>
</section>`;
}

function intro() {
  return `<section class="intro" aria-labelledby="intro-title">
  <div class="wrap intro__grid">
    <h2 class="kicker" id="intro-title">What the clinic is</h2>
    <p class="intro__text" data-words>A father-and-son practice in Pimple Nilakh <span class="intro__win" aria-hidden="true">${picture('clinic-signboard', { sizes: '12rem', alt: '', pos: '50% 35%' })}</span> since ${clinic.founded}. Dr. Shivaji brings three decades of field and pathology experience. Dr. Pritesh leads day-to-day clinical care, exotic medicine and surgery. Diagnostics happen in the same building <span class="intro__win" aria-hidden="true">${picture('lab-analysers', { sizes: '12rem', alt: '' })}</span> so decisions don’t wait on outside labs.</p>
    <dl class="facts">
      <div><dt>${clinic.founded}</dt><dd>Founded in Pimple Nilakh by Dr. Shivaji B. Vidhate.</dd></div>
      <div><dt>33+ yrs</dt><dd>Dr. Shivaji’s veterinary experience. Retired District Animal Husbandry Officer, Pune.</dd></div>
      <div><dt>15–20 min</dt><dd>For CBC and biochemistry results in the in-house pathology lab.</dd></div>
      <div><dt>₹${clinic.fees.regular} <small>/ ₹${clinic.fees.exotic}</small></dt><dd>Consultation, regular / exotic pets. Payable at the clinic.</dd></div>
    </dl>
  </div>
</section>`;
}

function care() {
  const visible = services.filter((s) => !s.hidden);
  const first = visible[0];
  const blocks = groups.map((g) => {
    const list = visible.filter((s) => s.group === g.id);
    return `<div class="care__group">
      <h3 class="care__g"><span>${g.name}</span><small>${g.kicker}</small></h3>
      <figure class="care__gimg">${picture(list[0].photo, { sizes: '92vw', alt: '' })}</figure>
      <ul class="care__list">${list.map((s) => `<li><a class="care__row" href="/services/${s.slug}" data-care="${s.photo}" data-blurb="${esc(s.blurb)}"${soundAttr(s.name)}>
        <span class="care__name">${s.name}</span>
        <span class="care__blurb">${s.blurb}</span>
        <span class="care__arrow">${icon('arrowUpRight')}</span>
      </a></li>`).join('')}</ul>
    </div>`;
  }).join('');
  const stage = [...new Set(visible.map((s) => s.photo))].map((id, i) => `<div class="care__shot${i === 0 ? ' is-on' : ''}" data-care-shot="${id}">${picture(id, { sizes: '40vw', alt: '' })}</div>`).join('');
  return `<section class="care" id="services" aria-labelledby="care-title">
  <div class="wrap care__grid">
    <div class="care__index">
      <header class="shead">
        <p class="kicker">Care &amp; services</p>
        <h2 class="display" id="care-title">Everything your pet needs, under one roof.</h2>
        <p class="shead__intro">${visible.length} services across everyday care, exotic medicine, diagnostics and surgery.</p>
      </header>
      ${blocks}
      <p class="care__all">${btn('/services/', 'All services', { variant: 'ghost' })}</p>
    </div>
    <div class="care__stage" aria-hidden="true">
      <div class="care__frame">${stage}</div>
      <p class="care__caption" data-care-caption>${first.blurb}</p>
    </div>
  </div>
</section>`;
}

function species() {
  const panels = SPECIES.map((s, i) => `<article class="sp sp--${(i % 3) + 1}" id="sp-${s.id}" aria-labelledby="sp-${s.id}-h" data-sp>
      <figure class="sp__a" data-sp-img>${picture(s.a, { sizes: '(min-width:1024px) 34vw, 78vw' })}</figure>
      <figure class="sp__b" data-sp-img>${picture(s.b, { sizes: '(min-width:1024px) 16vw, 40vw' })}</figure>
      <div class="sp__text">
        <h3 class="sp__name" id="sp-${s.id}-h">${s.name}</h3>
        <p>${s.line}</p>
        <p class="sp__links"><a class="link-arrow" href="${s.link}"${soundAttr(s.name)}>Care for ${s.name.toLowerCase()} ${icon('arrow')}</a><a href="${s.faq}">FAQs</a></p>
      </div>
    </article>`).join('');
  return `<section class="exo" id="exotic" aria-labelledby="exo-title" data-theme="dark" data-exo>
  <div class="exo__pin" data-exo-pin>
    <header class="exo__head wrap">
      <div>
        <p class="kicker">Exotic Animal Centre</p>
        <h2 class="display display--xl" id="exo-title">Not every pet<br>looks the same.</h2>
      </div>
      <p class="exo__intro">Birds, rabbits, turtles, iguanas and guinea pigs each need different handling, diets, anaesthesia and diagnostics. Here they get it, including gaseous (inhalation) anaesthesia and digital X-ray. Exotic consultation ₹${clinic.fees.exotic}.</p>
    </header>
    <div class="exo__track" data-exo-track tabindex="0" role="region" aria-label="Species we treat. Scroll sideways to see all">${panels}
      <div class="sp sp--end"><p class="display">One clinic for all of them.</p>${btn('/services/exotic-animal-centre', 'Inside the Exotic Animal Centre', { variant: 'light' })}</div>
    </div>
    <ol class="exo__rail" aria-hidden="true">${SPECIES.map((s, i) => `<li${i === 0 ? ' class="is-on"' : ''} data-exo-dot>${s.name}</li>`).join('')}</ol>
  </div>
</section>`;
}

function diagnostics() {
  const tags = [['CBC', 18, 22], ['Biochemistry', 62, 16], ['Urinalysis', 30, 64], ['Cytology', 70, 58]];
  return `<section class="dx" id="diagnostics" aria-labelledby="dx-title">
  <div class="dx__grid">
    <figure class="dx__frame" data-scan>
      ${picture('lab-analysers', { sizes: '(min-width:1024px) 62vw, 100vw' })}
      <span class="dx__scan" aria-hidden="true"></span>
      <ul class="dx__tags" aria-hidden="true">${tags.map(([t, x, y], i) => `<li style="--x:${x}%;--y:${y}%;--i:${i}">${t}</li>`).join('')}</ul>
      <figcaption>In-house haematology and biochemistry analysers</figcaption>
    </figure>
    <div class="dx__copy">
      <p class="kicker">Diagnostics</p>
      <h2 class="display" id="dx-title">Answers in the same building.</h2>
      <p>Decisions don’t wait on outside labs. Most results are read at the clinic, often during the same visit.</p>
      <ul class="dx__list">
        <li><a href="/services/pathology-lab"><strong>Pathology lab</strong><span>Blood panels, urinalysis and cytology. CBC and biochemistry ready in 15–20 minutes.</span>${icon('arrow')}</a></li>
        <li><a href="/services/digital-xray"><strong>Digital X-ray</strong><span>Instant images, for dogs, cats and exotic patients alike.</span>${icon('arrow')}</a></li>
        <li><a href="/services/sonography"><strong>Sonography</strong><span>Ultrasound imaging at the clinic, including pregnancy confirmation.</span>${icon('arrow')}</a></li>
      </ul>
    </div>
    <figure class="dx__side dx__side--a">${picture('xray-turtle-plate', { sizes: '(min-width:1024px) 18vw, 45vw' })}</figure>
    <figure class="dx__side dx__side--b">${picture('sonography-puppy', { sizes: '(min-width:1024px) 18vw, 45vw' })}</figure>
  </div>
</section>`;
}

function surgery() {
  const surg = services.filter((s) => s.group === 'surgery' && !s.hidden);
  return `<section class="iris" id="surgery" aria-labelledby="iris-title" data-theme="dark" data-iris>
  <div class="iris__img" data-iris-img>${picture('surgery-ot-lights', { sizes: '100vw', pos: '50% 35%' })}</div>
  <div class="iris__copy wrap">
    <p class="kicker">Surgery</p>
    <h2 class="display display--xl" id="iris-title">Under the lights,<br>nothing is routine.</h2>
    <p>Pre-surgery bloodwork in our own lab the same morning. Gaseous anaesthesia, gentler on heart and lungs, with faster recovery. Suture checks and follow-ups planned before your pet goes home.</p>
    <ul class="iris__list">${surg.map((s) => `<li><a href="/services/${s.slug}"${soundAttr(s.name)}>${s.name}</a></li>`).join('')}</ul>
  </div>
</section>`;
}

function doctors() {
  const [pritesh, shivaji] = clinic.doctors;
  const spread = (d, portrait, flip) => `<article class="dr${flip ? ' dr--flip' : ''}" aria-labelledby="dr-${d.id}">
      <figure class="dr__img" data-mask="${flip ? 'right' : 'left'}">${picture(portrait, { sizes: '(min-width:1024px) 40vw, 100vw' })}</figure>
      <div class="dr__body">
        <p class="label">${d.role}</p>
        <h3 class="dr__name" id="dr-${d.id}">${d.name}</h3>
        <p class="dr__creds">${d.creds}${d.years ? ` · ${d.years} years of experience` : ''}<br><span class="muted">${d.reg}</span></p>
        <p>${d.bio}</p>
        <p class="dr__focus"><span class="label">Focus</span> ${d.focus.join(', ')}</p>
      </div>
    </article>`;
  const tech = clinic.team[0];
  return `<section class="drs" id="doctors" aria-labelledby="drs-title">
  <div class="wrap">
    ${sectionHead('The doctors', 'The people behind the stethoscope.', 'drs-title')}
    ${spread(shivaji, 'dr-shivaji-portrait', false)}
    ${spread(pritesh, 'dr-pritesh-microscope', true)}
    ${tech ? `<div class="drs__team">
      <figure class="drs__tech">${picture(tech.photo, { sizes: '8rem', alt: '', pos: '72% 40%' })}</figure>
      <p><strong>${tech.name}</strong>, ${tech.role}. ${tech.bio}</p>
      <a class="link-arrow" href="/about">Qualifications, training &amp; the full story ${icon('arrow')}</a>
    </div>` : ''}
  </div>
</section>`;
}

function journey() {
  const steps = JOURNEY.map((s, i) => `<li class="jr__step${i === 0 ? ' is-on' : ''}" data-jr-step>
      <span class="jr__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <div class="jr__txt">
        <h3 class="jr__t">${s.t}</h3>
        <p>${s.d}</p>
      </div>
      <figure class="jr__inline">${picture(s.p, { sizes: '92vw', alt: '' })}</figure>
    </li>`).join('');
  const shots = JOURNEY.map((s, i) => `<figure class="jr__shot${i === 0 ? ' is-on' : ''}" data-jr-shot>${picture(s.p, { sizes: '(min-width:1024px) 44vw, 1px' })}</figure>`).join('');
  return `<section class="jr" id="journey" aria-labelledby="jr-title" data-journey>
  <div class="wrap jr__grid">
    <div class="jr__stage" aria-hidden="true"><div class="jr__frame">${shots}</div></div>
    <div class="jr__col">
      ${sectionHead('The care journey', 'From the first worry to a full recovery.', 'jr-title')}
      <ol class="jr__steps"><span class="jr__line" aria-hidden="true"><i data-jr-bar></i></span>${steps}</ol>
    </div>
  </div>
</section>`;
}

function words() {
  const [lead, ...rest] = clinic.testimonials;
  const q = (t, cls) => `<blockquote class="quote ${cls}"><p>“${esc(t.quote)}”</p><footer>${esc(t.name)} <span>· ${esc(t.pet)}</span></footer></blockquote>`;
  return `<section class="words" aria-labelledby="words-title">
  <div class="wrap">
    <h2 class="kicker" id="words-title">Words from pet parents</h2>
    <div class="words__grid">
      ${lead ? q(lead, 'quote--lead') : ''}
      <div class="words__rest">${rest.map((t) => q(t, '')).join('')}</div>
    </div>
    <p class="words__links">Read and leave reviews on ${clinic.reviews.map((r) => `<a href="${r.url}" target="_blank" rel="noopener">${r.name}</a>`).join(', ').replace(/, ([^,]*)$/, ' and $1')}.</p>
  </div>
</section>`;
}

function onCamera() {
  const vids = videosFor('home');
  return `<section class="cam" aria-labelledby="cam-title">
  <div class="wrap cam__grid">
    <div class="cam__head">
      ${sectionHead('Real clinic, real patients', 'No stock photos. Just real days at the clinic.', 'cam-title')}
      <p>Short clips filmed at the clinic. They play muted; tap one for sound.</p>
      ${btn('/gallery', 'Open the gallery', { variant: 'ghost' })}
    </div>
    <div class="cam__reels">${vids.map((id) => reel(id)).join('')}</div>
  </div>
</section>`;
}

function blog(posts) {
  // Lead with the newest post that has a real clinic photo, then one per category for variety.
  const lead = posts.find((p) => p.photo) || posts[0];
  const seen = new Set();
  const rows = posts.filter((p) => p !== lead && !seen.has(p.cat) && seen.add(p.cat)).slice(0, 4);
  return `<section class="jot" aria-labelledby="jot-title">
  <div class="wrap">
    <div class="jot__head">
      ${sectionHead('Pet health blog', 'Pet health, explained by vets.', 'jot-title')}
      <a class="link-arrow" href="/blog/">All ${posts.length} articles ${icon('arrow')}</a>
    </div>
    <div class="jot__grid">
      <a class="jot__lead" href="/blog/${lead.slug}"${soundAttr(lead.title)}>
        <figure>${postCover(lead, { sizes: '(min-width:1024px) 46vw, 100vw', alt: '' })}</figure>
        <span class="label">${lead.catName} · ${lead.read} min read</span>
        <h3>${esc(lead.title)}</h3>
        <p>${esc(lead.summary)}</p>
      </a>
      <ul class="jot__rows">${rows.map((p) => `<li><a href="/blog/${p.slug}"${soundAttr(p.title)}><span class="label">${p.catName}</span><strong>${esc(p.title)}</strong><span class="jot__meta">${p.read} min read ${icon('arrow')}</span></a></li>`).join('')}</ul>
    </div>
  </div>
</section>`;
}

function visit() {
  return `<section class="visit" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit__grid">
    <div class="visit__where">
      <p class="kicker">Find the clinic</p>
      <h2 class="display" id="visit-title">Find us in Pimple Nilakh.</h2>
      ${addressBlock()}
      <div class="visit__cta">
        <a class="btn btn--primary" href="${clinic.mapsUrl}" target="_blank" rel="noopener" data-directions><span class="btn__label">Get directions</span><span class="btn__ic">${icon('pin')}</span></a>
      </div>
      <p class="visit__areas"><span class="label">A few minutes from</span> ${clinic.areas.filter((a) => a !== 'Pimple Nilakh').join(', ')}</p>
    </div>
    <div class="visit__hours">
      <h3 class="label">Opening hours</h3>
      ${statusPill('status--big')}
      ${hoursTable()}
    </div>
    <div class="visit__aids">
      ${mapEmbed()}
      <figure class="visit__sign">${picture('clinic-storefront', { sizes: '(min-width:1024px) 22vw, 92vw' })}<figcaption>Look for this storefront on Aundh–Wakad Road.</figcaption></figure>
    </div>
  </div>
</section>`;
}

function book() {
  return `<section class="book" id="book" aria-labelledby="book-title">
  <div class="wrap book__grid">
    <header class="book__head">
      <p class="kicker">Appointment</p>
      <h2 class="display" id="book-title">Book an appointment.</h2>
      <p>Answer four quick questions and we’ll turn them into a WhatsApp message to the clinic. Walk-ins are also welcome during opening hours.</p>
      ${contactPair({ cls: 'cpair--book', waText: 'Hi Shivraj Pet Clinic & Lab, I’d like to book an appointment.' })}
    </header>
    ${bookingComposer('home')}
  </div>
</section>`;
}

const sectionHead = (kicker, title, id) => `<header class="shead"><p class="kicker">${kicker}</p><h2 class="display" id="${id}">${title}</h2></header>`;

module.exports = function home(posts) {
  const faqs = [
    { q: 'What animals do you treat?', a: 'Dogs, cats, birds (including parrots, cockatiels, conures, budgies, lovebirds and finches), rabbits, guinea pigs, hamsters and gerbils, turtles and tortoises, and reptiles such as iguanas.' },
    { q: 'What are your timings?', a: `${clinic.hoursText}.` },
    { q: 'How much is a consultation?', a: `Regular consultation is ₹${clinic.fees.regular} and exotic pet consultation is ₹${clinic.fees.exotic}, payable at the clinic.` },
    { q: 'How fast are lab results?', a: 'CBC and biochemistry results from our in-house pathology lab are usually ready in 15–20 minutes, so treatment can start the same visit.' },
    { q: 'Do you handle emergencies?', a: 'Emergencies are seen during opening hours only. Please call +91 77569 65169 before you travel so the team can prepare. We do not offer after-hours or Wednesday emergency service.' },
    { q: 'How do I book?', a: `Use the appointment form to send a WhatsApp request, message us directly, or call ${clinic.phoneDisplay}. Your appointment is confirmed when the clinic replies. Walk-ins are welcome during opening hours.` },
  ];
  const quick = `<section class="qfaq" aria-labelledby="qfaq-title"><div class="wrap qfaq__grid">
    ${sectionHead('Quick answers', 'Before you visit.', 'qfaq-title')}
    <div>${faqList(faqs)}<p class="qfaq__more"><a class="link-arrow" href="/pet-care-faqs">86 more answers for dogs, cats, birds, rabbits and reptiles ${icon('arrow')}</a></p></div>
  </div></section>`;
  const body = [hero(), intro(), care(), species(), diagnostics(), surgery(), doctors(), journey(), words(), onCamera(), blog(posts), visit(), book(), quick].join('\n');
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  const webSite = { '@context': 'https://schema.org', '@type': 'WebSite', name: clinic.name, url: clinic.site + '/', publisher: { '@id': `${clinic.site}/#clinic` } };
  const p = photo(HERO_MAIN);
  return {
    path: '/',
    title: 'Shivraj Pet Clinic & Lab | Multispecies & Exotic Vet in Pimple Nilakh, Wakad, Pune',
    description: 'Two-generation multispecies vet in Pimple Nilakh, Pune since 2013. Dogs, cats, birds, rabbits, turtles & exotic pets. In-house lab (15–20 min results), digital X-ray, sonography, surgery. Call +91 77569 65169.',
    schema: [webSite, faqSchema, ...videosFor('home').map(videoSchema)],
    preload: { href: `/images/p/${HERO_MAIN}-shivraj-pet-clinic-960.avif`, srcset: p.widths.map((w) => `/images/p/${HERO_MAIN}-shivraj-pet-clinic-${w}.avif ${w}w`).join(', '), sizes: '(min-width:1024px) 56vw, 100vw' },
    body,
    bodyClass: 'page-home',
    scripts: ['booking'],
  };
};
