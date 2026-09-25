const clinic = require('../../data/clinic');
const { icon } = require('../icons');
const { statusPill, hoursTable, bookingComposer, absImg, esc, mapEmbed, addressBlock, contactPair, pageHead } = require('../components');
const { breadcrumbs } = require('./service');

module.exports = function contact() {
  const body = `${pageHead({ crumbs: [['Visit', '/contact']], kicker: 'Visit & book', title: 'Vet clinic in Pimple Nilakh, Pune.', lead: 'On Aundh–Wakad Road in Vishal Nagar, a few minutes from Wakad, Pimple Saudagar, Baner and Aundh.', img: 'clinic-storefront', extra: statusPill('status--big') })}

  <section class="visit visit--page" aria-labelledby="find-title">
    <div class="wrap visit__grid">
      <div class="visit__where">
        <h2 class="kicker" id="find-title">Find the clinic</h2>
        ${addressBlock()}
        <div class="visit__cta">
          <a class="btn btn--primary" href="${clinic.mapsUrl}" target="_blank" rel="noopener" data-directions><span class="btn__label">Get directions</span><span class="btn__ic">${icon('pin')}</span></a>
        </div>
        ${contactPair()}
        <p class="visit__mail"><a href="mailto:${clinic.email}">${icon('mail')} ${esc(clinic.email)}</a></p>
      </div>
      <div class="visit__hours">
        <h2 class="label">Opening hours</h2>
        ${hoursTable()}
        <p class="muted">Consultation ₹${clinic.fees.regular} · Exotic pets ₹${clinic.fees.exotic}. Emergencies are seen during opening hours only; please call before you travel.</p>
      </div>
      <div class="visit__aids">${mapEmbed()}</div>
    </div>
  </section>

  <section class="book" id="book" aria-labelledby="book-title">
    <div class="wrap book__grid">
      <header class="book__head">
        <p class="kicker">Appointment</p>
        <h2 class="display" id="book-title">Request an appointment.</h2>
        <p>Answer four quick questions and we’ll turn them into a WhatsApp message to the clinic. Walk-ins are also welcome during opening hours.</p>
      </header>
      ${bookingComposer('contact')}
    </div>
  </section>`;

  return {
    path: '/contact',
    title: 'Visit & Book | Shivraj Pet Clinic & Lab, Vishal Nagar, Pimple Nilakh, Pune',
    description: `Directions, hours and appointments for Shivraj Pet Clinic & Lab: Shop B-4, Alpine Avenue, Aundh–Wakad Road, Pimple Nilakh, Pune 411027. Call or WhatsApp ${clinic.phoneDisplay}.`,
    image: absImg('clinic-storefront'),
    schema: [breadcrumbs([['Home', '/'], ['Visit & book', '/contact']]), { '@context': 'https://schema.org', '@type': 'ContactPage', url: `${clinic.site}/contact`, about: { '@id': `${clinic.site}/#clinic` } }],
    body,
    bodyClass: 'page-contact',
    scripts: ['booking'],
  };
};
