const clinic = require('../../data/clinic');
const extracted = require('../../data/extracted.json');
const { icon } = require('../icons');
const { picture, faqList, btn, absImg, brandHtml, brandText, pageHead } = require('../components');
const { breadcrumbs } = require('./service');

const GROUP_META = {
  'dog-faqs': ['dog', 'Dogs', 'dog-pug'], 'cat-faqs': ['cat', 'Cats', 'cat-calico'], 'bird-faqs': ['bird', 'Birds', 'bird-alexandrine'],
  'turtle-faqs': ['turtle', 'Turtles & tortoises', 'turtles-trio'], 'reptile-faqs': ['lizard', 'Reptiles', 'iguana-arm'],
  'rabbit-faqs': ['rabbit', 'Rabbits', 'rabbit-white'], 'guineapig-faqs': ['guinea', 'Guinea pigs', 'guinea-pigs-pair'],
};
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

module.exports = function faqs() {
  const groups = extracted.faqGroups;
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const tabs = groups.map((g) => {
    const [, name] = GROUP_META[g.id];
    return `<a class="tab" href="#${g.id}" data-jump>${name}<sup>${g.items.length}</sup></a>`;
  }).join('');
  const sections = groups.map((g) => {
    const [, name, pic] = GROUP_META[g.id];
    return `<section class="faqg" id="${g.id}" aria-labelledby="${g.id}-h" data-faq-group>
      <header class="faqg__head">
        <figure class="faqg__img">${picture(pic, { sizes: '(min-width:1024px) 14rem, 30vw', alt: '' })}</figure>
        <div><h2 class="display display--sm" id="${g.id}-h">${name}</h2><p class="muted">${g.items.length} questions</p></div>
      </header>
      ${faqList(g.items.map((it) => ({ q: brandText(it.q), aHtml: brandHtml(it.a) })))}
    </section>`;
  }).join('');

  const search = `<div class="search search--lg" role="search">
      ${icon('search')}<label class="sr" for="faq-q">Search questions</label>
      <input id="faq-q" type="search" placeholder="Search e.g. vaccination, not eating, shell" data-faq-search autocomplete="off">
    </div>
    <p class="search__status muted" aria-live="polite" data-faq-status></p>`;
  const body = `${pageHead({ crumbs: [['FAQ', '/pet-care-faqs']], kicker: 'Pet care FAQ', title: 'Dog, cat &amp; exotic pet health questions, answered.', lead: `${total} answers from the vets at Shivraj Pet Clinic &amp; Lab, Pune. General guidance only. If your pet is unwell, <a href="tel:${clinic.phone}">call the clinic</a>.`, extra: search })}
  <div class="wrap">
    <nav class="tabs tabs--sticky" aria-label="Jump to species">${tabs}</nav>
    <div class="faqs">${sections}</div>
    <div class="faqs__cta">${btn('/#book', 'Still unsure? Book a consultation')}</div>
  </div>`;

  const schema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: groups.flatMap((g) => g.items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: strip(it.a) } }))),
  };
  return {
    path: '/pet-care-faqs',
    title: 'Dog, Cat, Bird & Exotic Pet FAQs | Shivraj Pet Clinic & Lab Pune',
    description: `${total} answers to common dog, cat, bird, rabbit, turtle, reptile and guinea pig health questions from the vets at Shivraj Pet Clinic & Lab, Pimple Nilakh, Pune.`,
    image: absImg('turtles-trio'),
    schema: [breadcrumbs([['Home', '/'], ['Pet Care FAQs', '/pet-care-faqs']]), schema],
    body,
    bodyClass: 'page-faqs',
    scripts: ['listing'],
  };
};
