const clinic = require('../../data/clinic');
const { icon } = require('../icons');
const { statusPill, hoursTable, bookingComposer, absImg, esc, mapEmbed, addressBlock, contactPair, pageHead, faqList, sectionHead } = require('../components');
const { breadcrumbs } = require('./service');

// Direct answers to the questions people ask before a first visit (answer in the first sentence).
const VISIT_FAQS = [
  { q: 'Where exactly is the clinic?', a: `At ${clinic.address.street}, ${clinic.address.locality}, Pune ${clinic.address.pin}. It is on Aundh–Wakad Road near Jagtap Dairy, a few minutes from Wakad, Pimple Saudagar, Baner and Aundh.` },
  { q: 'Do I need an appointment?', a: `No, walk-ins are welcome during opening hours. Booking ahead by WhatsApp or a call to ${clinic.phoneDisplay} shortens your wait; your appointment is confirmed when the clinic replies.` },
  { q: 'What are the opening hours?', a: 'Monday, Tuesday and Thursday to Sunday, 10:30 AM–1:30 PM and 3:00–8:30 PM. The clinic is closed every Wednesday. 3–5 PM is usually reserved for surgery, so call ahead for urgent cases then.' },
  { q: 'How much does a consultation cost?', a: `A regular consultation is ₹${clinic.fees.regular} and an exotic pet consultation is ₹${clinic.fees.exotic}, paid at the clinic. Tests, medicines and procedures are charged separately.` },
  { q: 'Can you see my pet in an emergency?', a: 'Yes, during opening hours. Call before you travel so the team can prepare. The clinic does not offer after-hours or Wednesday emergency service; outside opening hours, contact a 24-hour veterinary hospital.' },
  { q: 'Which areas do your patients come from?', a: `Mostly ${clinic.areas.join(', ')} and the rest of Pune and Pimpri-Chinchwad. Exotic pet owners often travel further because few clinics in PCMC treat birds, rabbits and reptiles.` },
];

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
  </section>

  <section class="qfaq" aria-labelledby="vfaq-title"><div class="wrap qfaq__grid">
    ${sectionHead({ kicker: 'Before your visit', title: 'Common questions.', id: 'vfaq-title' })}
    <div>${faqList(VISIT_FAQS)}<p class="qfaq__more"><a class="link-arrow" href="/services/">See all services ${icon('arrow')}</a> · <a class="link-arrow" href="/pet-care-faqs">Pet health FAQs ${icon('arrow')}</a></p></div>
  </div></section>`;

  return {
    path: '/contact',
    title: 'Visit & Book | Shivraj Pet Clinic & Lab, Pimple Nilakh',
    description: `Directions, hours and appointments: Shop B-4, Alpine Avenue, Aundh–Wakad Road, Pimple Nilakh, Pune 411027. Walk-ins welcome. Call or WhatsApp ${clinic.phoneDisplay}.`,
    image: absImg('clinic-storefront'),
    schema: [breadcrumbs([['Home', '/'], ['Visit & book', '/contact']]), { '@context': 'https://schema.org', '@type': 'ContactPage', url: `${clinic.site}/contact`, about: { '@id': `${clinic.site}/#clinic` } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: VISIT_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }],
    body,
    bodyClass: 'page-contact',
    scripts: ['booking'],
  };
};
