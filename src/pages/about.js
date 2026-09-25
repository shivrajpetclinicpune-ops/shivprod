const clinic = require('../../data/clinic');
const extracted = require('../../data/extracted.json');
const { icon } = require('../icons');
const { picture, label, btn, absImg, esc, pageHead, contactPair } = require('../components');
const { breadcrumbs } = require('./service');

// about.html lists: [1] qualifications, [2] continuing education (both Dr. Pritesh).
const [, QUALS = [], CE = []] = extracted.aboutLists;

module.exports = function about() {
  const [pritesh, shivaji] = clinic.doctors;
  const list = (title, items) => (items.length ? `<details class="creds"><summary>${label(title)} <span class="muted">${items.length}</span><span class="faq__ic">${icon('plus')}</span></summary><ul>${items.map((q) => `<li>${esc(q)}</li>`).join('')}</ul></details>` : '');
  const spread = (d, portrait, second, flip, extra = '') => `<article class="dr dr--page${flip ? ' dr--flip' : ''}" id="${d.id}" aria-labelledby="bio-${d.id}">
      <figure class="dr__img" data-mask="${flip ? 'right' : 'left'}">${picture(portrait, { sizes: '(min-width:1024px) 40vw, 100vw' })}</figure>
      <div class="dr__body">
        <p class="label">${d.role}</p>
        <h2 class="dr__name" id="bio-${d.id}">${d.name}</h2>
        <p class="dr__creds">${d.creds}${d.years ? ` · ${d.years} years of experience` : ''}<br><span class="muted">${d.reg}</span></p>
        <p>${d.bio}</p>
        <p class="dr__focus"><span class="label">Focus</span> ${d.focus.join(', ')}</p>
        ${extra}
        <figure class="dr__second">${picture(second, { sizes: '(min-width:1024px) 16vw, 40vw' })}</figure>
      </div>
    </article>`;

  const timeline = [
    ['Before 2013', 'Dr. Shivaji B. Vidhate serves in field and companion animal medicine, retiring as District Animal Husbandry Officer, Pune.'],
    [String(clinic.founded), 'Shivraj Pet Clinic &amp; Lab opens in Pimple Nilakh.'],
    ['Today', 'A two-generation practice with an in-house pathology lab, digital X-ray, sonography, surgery under gaseous anaesthesia and a dedicated Exotic Animal Centre.'],
  ];

  const body = `${pageHead({ crumbs: [['Doctors', '/about']], kicker: 'Doctors & team', title: 'Two generations. One clinic.', lead: `Shivraj Pet Clinic &amp; Lab is a father-and-son veterinary practice in Pimple Nilakh, Pune, caring for dogs, cats, birds, rabbits, turtles and exotic animals since ${clinic.founded}.`, img: 'team-cat-care' })}

  <section class="tl" aria-labelledby="tl-title">
    <div class="wrap">
      <h2 class="sr" id="tl-title">Our story</h2>
      <ol class="tl__list">${timeline.map(([y, t]) => `<li><span class="tl__y">${y}</span><p>${t}</p></li>`).join('')}</ol>
    </div>
  </section>

  <div class="wrap drs drs--page">
    ${spread(shivaji, 'dr-shivaji-portrait', 'dr-shivaji-parrot', false)}
    ${spread(pritesh, 'dr-pritesh-microscope', 'dr-pritesh-turtle', true, `<div class="dr__lists">${list('Qualifications & training', QUALS)}${list('Continuing education', CE)}</div>`)}
  </div>

  <section class="team" aria-labelledby="team-title">
    <div class="wrap team__grid">
      <header class="shead"><p class="kicker">The team</p><h2 class="display" id="team-title">Calm hands in the theatre.</h2></header>
      ${clinic.team.map((m) => `<article class="team__m">
        <figure data-mask="up">${picture(m.photo, { sizes: '(min-width:1024px) 34vw, 92vw', pos: '72% 40%' })}</figure>
        <div><p class="label">${m.role}</p><h3>${m.name}</h3><p>${m.bio}</p></div>
      </article>`).join('')}
    </div>
  </section>

  <section class="band" data-theme="dark">
    <div class="wrap band__grid">
      <h2 class="display display--xl">Meet us in person.</h2>
      <div>
        <p>${esc(clinic.address.street)}, ${clinic.address.locality}, Pune ${clinic.address.pin}. ${clinic.hoursText}.</p>
        <div class="band__btns">${btn('/#book', 'Book an appointment', { variant: 'light' })}${btn('/contact', 'Visit & directions', { variant: 'ghost-light', ic: 'pin' })}</div>
        ${contactPair({ cls: 'cpair--light' })}
      </div>
    </div>
  </section>`;

  return {
    path: '/about',
    title: 'Doctors | Dr. Pritesh & Dr. Shivaji Vidhate | Shivraj Pet Clinic & Lab, Pune',
    description: 'Meet Dr. Shivaji B. Vidhate (M.V.Sc. Pathology, 33+ years, retired DAHO Pune) and Dr. Pritesh S. Vidhate, the father-and-son vets behind Shivraj Pet Clinic & Lab, Pimple Nilakh, since 2013.',
    image: absImg('team-cat-care'),
    schema: [breadcrumbs([['Home', '/'], ['Doctors', '/about']]), {
      '@context': 'https://schema.org', '@type': 'AboutPage', url: `${clinic.site}/about`, about: { '@id': `${clinic.site}/#clinic` },
      mainEntity: clinic.doctors.map((d) => ({ '@type': 'Person', name: d.name, jobTitle: d.role, worksFor: { '@id': `${clinic.site}/#clinic` }, image: absImg(d.photo) })),
    }],
    body,
    bodyClass: 'page-about',
  };
};
