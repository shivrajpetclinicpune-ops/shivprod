const clinic = require('../data/clinic');
const { services } = require('../data/services');
const { icon } = require('./icons');
const { esc, statusPill, absImg, catImg, contactPair, addressBlock, mapEmbed } = require('./components');

const SITE = clinic.site;
const url = (p) => SITE + (p === '/' ? '/' : p);
const ASSET_V = Date.now().toString(36); // cache-bust on each build

// Sitewide LocalBusiness entity (referenced by @id from page schemas).
function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['VeterinaryCare', 'LocalBusiness'],
    '@id': `${SITE}/#clinic`,
    name: clinic.name,
    alternateName: clinic.alt,
    url: SITE + '/',
    logo: `${SITE}/images/logo.png`,
    image: [`${SITE}/images/og-default.jpg`, absImg('clinic-signboard'), absImg('clinic-storefront')],
    description: 'Multispecies veterinary clinic in Pimple Nilakh, Pune (PCMC) since 2013: dogs, cats, birds, rabbits, turtles and exotic pets. In-house pathology lab, digital X-ray, sonography and surgery under gaseous anaesthesia.',
    telephone: clinic.phone,
    email: clinic.email,
    foundingDate: String(clinic.founded),
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.locality,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.pin,
      addressCountry: clinic.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: clinic.mapsUrl,
    areaServed: clinic.areas.map((a) => ({ '@type': 'Place', name: `${a}, Pune` })),
    openingHoursSpecification: clinic.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: clinic.openDays, opens: h.open, closes: h.close,
    })),
    employee: clinic.doctors.map((d) => ({ '@type': 'Person', name: d.name, jobTitle: d.role })),
    sameAs: [clinic.socials.instagram, clinic.socials.facebook, clinic.socials.practo],
  };
}

const NAV = [
  ['/services/', 'Care'],
  ['/services/exotic-animal-centre', 'Exotic care'],
  ['/about', 'Doctors'],
  ['/gallery', 'Gallery'],
  ['/blog/', 'Blog'],
  ['/pet-care-faqs', 'FAQ'],
  ['/contact', 'Visit'],
];

function isCur(href, path) {
  if (href === '/services/') return path.startsWith('/services/') && path !== '/services/exotic-animal-centre';
  return href === path || (href !== '/' && path.startsWith(href));
}

function nav(path) {
  const links = NAV.map(([href, text]) => `<li><a href="${href}"${isCur(href, path) ? ' aria-current="page"' : ''}>${text}</a></li>`).join('');
  const menuLinks = [['/', 'Home'], ...NAV].map(([href, text]) =>
    `<li><a href="${href}"${isCur(href, path) || (href === '/' && path === '/') ? ' aria-current="page"' : ''} data-menu-link>${text}</a></li>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="nav" data-nav>
  <div class="nav__bar">
    <a class="brand" href="/" aria-label="${esc(clinic.name)}, home">
      <img class="brand__mark" src="/images/mark.webp" alt="" width="55" height="40">
      <span class="brand__word">Shivraj Pet Clinic <em>&amp;</em> Lab</span>
    </a>
    <nav class="nav__links" aria-label="Primary"><ul>${links}</ul></nav>
    <div class="nav__actions">
      <button class="nav__sound" type="button" data-sound-toggle aria-pressed="true" aria-label="Pet sounds on, click to mute" title="Pet sounds"><span class="nav__sound-bars" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <a class="btn btn--primary btn--sm nav__book" href="/#book"><span class="btn__label">Book appointment</span></a>
      <button class="nav__menu" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle><span class="nav__menu-t">Menu</span><span class="nav__burger" aria-hidden="true"><i></i><i></i></span></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" data-menu hidden>
  <div class="menu__inner">
    <nav aria-label="Menu"><ul class="menu__list">${menuLinks}</ul></nav>
    <div class="menu__side">
      <a class="btn btn--primary btn--block" href="/#book" data-menu-link><span class="btn__label">Book an appointment</span><span class="btn__ic">${icon('arrow')}</span></a>
      ${contactPair({ cls: 'cpair--menu' })}
      <p class="menu__meta">${esc(clinic.address.street)}, ${clinic.address.locality}<br>${clinic.hoursText}</p>
    </div>
  </div>
</div>`;
}

function footer(path) {
  const wa = `${clinic.whatsapp}?text=${encodeURIComponent('Hi Shivraj Pet Clinic & Lab, I need help with my pet.')}`;
  const svcLinks = services.filter((s) => !s.hidden).map((s) => `<li><a href="/services/${s.slug}">${s.name}</a></li>`).join('');
  return `<footer class="foot" data-theme="dark" data-foot>
  <div class="wrap foot__final">
    <p class="foot__big">Let’s get your pet the care they need.</p>
    <ul class="foot__acts">
      <li><a href="/#book"><span>Book an appointment</span>${icon('arrow')}</a></li>
      <li><a href="tel:${clinic.phone}">${catImg('call', 48)}<span>Call ${clinic.phoneDisplay}</span>${icon('arrow')}</a></li>
      <li><a href="${wa}" target="_blank" rel="noopener">${catImg('wa', 48)}<span>WhatsApp the clinic</span>${icon('arrow')}</a></li>
    </ul>
  </div>
  <div class="wrap foot__info">
    <div class="foot__where">
      <h2 class="label">Find the clinic</h2>
      ${addressBlock()}
      <p><a class="link-arrow" href="${clinic.mapsUrl}" target="_blank" rel="noopener" data-directions>Get directions ${icon('arrowUpRight')}</a></p>
      ${path === '/' || path === '/contact' ? '' : mapEmbed('map--foot')}
    </div>
    <div class="foot__col">
      <h2 class="label">Hours</h2>
      ${statusPill('status--foot')}
      <p>Mon, Tue, Thu–Sun<br>${clinic.hoursRanges.join('<br>')}<br>Wednesday closed</p>
      <p class="muted">Emergencies are seen during opening hours only.</p>
    </div>
    <div class="foot__col foot__col--care">
      <h2 class="label">Care</h2>
      <ul class="foot__list">${svcLinks}</ul>
    </div>
    <div class="foot__col">
      <h2 class="label">Clinic</h2>
      <ul class="foot__list">
        <li><a href="/about">Doctors &amp; team</a></li>
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/blog/">Pet health blog</a></li>
        <li><a href="/pet-care-faqs">Pet care FAQs</a></li>
        <li><a href="/contact">Visit &amp; book</a></li>
        <li><a href="mailto:${clinic.email}">${clinic.email}</a></li>
      </ul>
      <h2 class="label">Follow</h2>
      <ul class="foot__social">
        <li><a href="${clinic.socials.instagram}" target="_blank" rel="noopener">${icon('instagram')}<span>Instagram</span></a></li>
        <li><a href="${clinic.socials.facebook}" target="_blank" rel="noopener">${icon('facebook')}<span>Facebook</span></a></li>
        <li><a href="${clinic.socials.practo}" target="_blank" rel="noopener">${icon('star')}<span>Practo</span></a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot__legal">
    <p>© ${new Date().getFullYear()} ${esc(clinic.name)} · Pimple Nilakh, Pune · Since ${clinic.founded}</p>
    <p>Information on this site is general guidance, not a diagnosis. We do not offer after-hours emergency service.</p>
    <p class="foot__credit">Site by <a href="https://octora.tech" target="_blank" rel="noopener">octora.tech</a></p>
  </div>
</footer>
<aside class="dock" aria-label="Contact the clinic" data-dock>
  <a class="dock__a" href="tel:${clinic.phone}">${catImg('call', 72)}<span class="dock__lbl">Call the clinic<small>${clinic.phoneDisplay}</small></span></a>
  <a class="dock__a" href="${wa}" target="_blank" rel="noopener">${catImg('wa', 72)}<span class="dock__lbl">WhatsApp us<small>Replies during clinic hours</small></span></a>
</aside>
<nav class="actionbar" aria-label="Contact the clinic" data-actionbar>
  <a href="tel:${clinic.phone}">${catImg('call', 40)}<span>Call</span></a>
  <a href="${wa}" target="_blank" rel="noopener">${catImg('wa', 40)}<span>WhatsApp</span></a>
  <a class="actionbar__book" href="/#book">${icon('calendar')}<span>Book</span></a>
</nav>`;
}

function layout({ preload, title, description, path = '/', image, imageAlt, schema = [], body, scripts = [], bodyClass = '', noindex = false, ogType = 'website', dataCat = '' }) {
  const bodyAttrs = dataCat ? ` data-cat="${dataCat}"` : '';
  const canonical = url(path);
  const ogImage = image || `${SITE}/images/og-default.jpg`;
  const ld = [orgSchema(), ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  const pageScripts = scripts.map((s) => `<script src="/assets/js/${s}.js?v=${ASSET_V}" defer></script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en-IN" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#ffffff">
<meta name="geo.region" content="IN-MH"><meta name="geo.placename" content="Pimple Nilakh, Pune"><meta name="geo.position" content="${clinic.geo.lat};${clinic.geo.lng}"><meta name="ICBM" content="${clinic.geo.lat}, ${clinic.geo.lng}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(clinic.name)}">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:alt" content="${esc(imageAlt || 'Shivraj Pet Clinic & Lab, Pimple Nilakh, Pune')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/images/favicon-48.png" sizes="48x48" type="image/png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/figtree-var.woff2" as="font" type="font/woff2" crossorigin>
${preload ? `<link rel="preload" as="image" type="image/avif" href="${preload.href}" imagesrcset="${preload.srcset}" imagesizes="${preload.sizes}" fetchpriority="high">
` : ''}<link rel="stylesheet" href="/assets/css/main.css?v=${ASSET_V}">
<script>(function(d,s){d.classList.replace('no-js','js');try{if(sessionStorage.getItem('sh-pt')){d.classList.add('pt-enter');sessionStorage.removeItem('sh-pt')}}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');window.__mt=setTimeout(function(){d.classList.add('reveal-all')},3500)}})(document.documentElement)</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${clinic.ga4}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${clinic.ga4}');</script>
${ld}
</head>
<body class="${bodyClass}"${bodyAttrs} data-hours='${JSON.stringify({ days: clinic.openDays, sessions: clinic.hours.map((h) => [h.open, h.close]) })}'>
${clinic.notice && clinic.notice.enabled && clinic.notice.text ? `<div class="notice" role="status">${clinic.notice.link ? `<a href="${esc(clinic.notice.link)}">${esc(clinic.notice.text)}</a>` : esc(clinic.notice.text)}</div>` : ''}
<div class="transition" data-transition aria-hidden="true"></div>
${nav(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(path)}
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/core.js?v=${ASSET_V}" defer></script>
${pageScripts}
<script src="/assets/js/motion.js?v=${ASSET_V}" defer></script>
</body>
</html>`;
}

module.exports = { layout, url, SITE, orgSchema };
