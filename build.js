// build.js — generates the whole static site (Cloudflare Pages build command: npm run build).
// Pages are written to the repo root so the existing hosting + Decap CMS setup keeps working.
const fs = require('fs');
const path = require('path');
const clinic = require('./data/clinic');
const { services } = require('./data/services');
const { layout } = require('./src/layout');
const { loadPosts, postPage, blogIndex, CATS } = require('./src/pages/blog');
const { servicePage, servicesHub } = require('./src/pages/service');

const ROOT = __dirname;
const TODAY = new Date().toISOString().split('T')[0];
const written = [];

function fileFor(p) {
  if (p === '/') return 'index.html';
  if (p.endsWith('/')) return `${p.slice(1)}index.html`;
  return `${p.slice(1)}.html`;
}

function write(page) {
  const file = path.join(ROOT, fileFor(page.path));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const html = layout(page);
  fs.writeFileSync(file, html);
  written.push({ ...page, html: page.path.startsWith('/blog/') ? '' : html });
}

const posts = loadPosts();

// ── Pages
write(require('./src/pages/home')(posts));
write(require('./src/pages/about')());
write(servicesHub());
services.forEach((s) => write(servicePage(s.slug, posts)));
write(require('./src/pages/gallery')());
write(require('./src/pages/faqs')());
write(require('./src/pages/contact')());
write(require('./src/pages/notfound')());

// ── Blog posts (remove orphans first so deleted CMS posts don't linger)
const BLOG_DIR = path.join(ROOT, 'blog');
fs.mkdirSync(BLOG_DIR, { recursive: true });
const valid = new Set(posts.map((p) => `${p.slug}.html`));
fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html') && f !== 'index.html' && !valid.has(f)).forEach((f) => fs.unlinkSync(path.join(BLOG_DIR, f)));
posts.forEach((p) => write(postPage(p, posts)));
write(blogIndex(posts));

// ── posts.json (kept for compatibility with anything reading the legacy feed)
fs.writeFileSync(path.join(ROOT, 'posts.json'), JSON.stringify(Object.fromEntries(posts.map((p) => [p.slug, {
  slug: p.slug, title: p.title, cat: p.cat, catLabel: CATS[p.cat], dateISO: p.dateISO, read: p.read, summary: p.summary, url: `/blog/${p.slug}`,
}])), null, 1));

// ── sitemap.xml (clean canonical URLs only; 404 excluded)
const priority = (p) => (p === '/' ? '1.0' : p.startsWith('/blog/') ? '0.6' : p.startsWith('/services/') ? '0.85' : '0.8');
const lastmod = (pg) => { const p = posts.find((q) => `/blog/${q.slug}` === pg.path); return p ? (p.updatedISO || p.dateISO) : TODAY; };
// Image sitemap: every real clinic photo on each page, with its caption (alt text).
const imagesOf = (html) => {
  const seen = new Set();
  return [...html.matchAll(/<img class="pic__main" src="([^"]+)"[^>]*alt="([^"]*)"/g)]
    .filter(([, src]) => !seen.has(src) && seen.add(src)).slice(0, 60)
    .map(([, src, alt]) => `<image:image><image:loc>${clinic.site}${src}</image:loc>${alt ? `<image:caption>${alt}</image:caption>` : ''}</image:image>`).join('');
};
// URLs that redirect elsewhere (vercel.json) must not be listed in the sitemap.
const redirected = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).redirects.map((r) => r.source));
const urls = written.filter((pg) => !pg.noindex && !redirected.has(pg.path)).map((pg) =>
  `  <url><loc>${clinic.site}${pg.path}</loc><lastmod>${lastmod(pg)}</lastmod><priority>${priority(pg.path)}</priority>${imagesOf(pg.html || '')}</url>`);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`);

// ── robots.txt (same policy as legacy: everything allowed, /admin blocked, AI crawlers welcome)
// Search and AI-answer crawlers are named explicitly so a future blanket rule cannot shut them out by accident.
const bots = ['*', 'Googlebot', 'Bingbot', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Applebot', 'Applebot-Extended'];
fs.writeFileSync(path.join(ROOT, 'robots.txt'), bots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /admin\n`).join('\n') + `\nSitemap: ${clinic.site}/sitemap.xml\n`);

// ── llms.txt (+ llms-full.txt with every service page's direct answer and FAQs)
const vis = services.filter((s) => !s.hidden);
const extracted = require('./data/extracted.json');
const faqTotal = extracted.faqGroups.reduce((n, g) => n + g.items.length, 0);
const strip = (h) => String(h).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/\s+/g, ' ').trim();
const [drP, drS] = clinic.doctors;
const KEY_FACTS = `## Key facts (verified by the clinic)
- Name: ${clinic.name} (also listed as ${clinic.alt})
- Type: multispecies veterinary clinic with an in-house pathology lab and an Exotic Animal Centre
- Address: ${clinic.address.street}, ${clinic.address.locality}, Pune, Maharashtra ${clinic.address.pin}, India (landmark: ${clinic.address.landmark})
- Phone / WhatsApp: ${clinic.phoneDisplay} · Email: ${clinic.email}
- Hours: ${clinic.hoursText}
- Consultation fee: ₹${clinic.fees.regular} (dogs and cats), ₹${clinic.fees.exotic} (exotic pets)
- Established: ${clinic.founded}
- Vets: ${drP.name}, ${drP.role} (${drP.creds}, ${drP.reg}); ${drS.name}, ${drS.role} (${drS.creds}, ${drS.years} years, retired District Animal Husbandry Officer, Pune, ${drS.reg})
- Species treated: dogs, cats, birds (budgies, cockatiels, lovebirds, conures, African greys, macaws, cockatoos, finches, canaries), rabbits, guinea pigs, hamsters, gerbils, turtles, tortoises, iguanas and other lizards
- On site: pathology lab (CBC and biochemistry in 15–20 minutes), digital X-ray, sonography, pharmacy, surgery under gaseous anaesthesia
- Walk-ins welcome during opening hours; appointments by phone or WhatsApp
- Not offered: grooming; after-hours or Wednesday emergency service (emergencies are seen during opening hours only)
- Areas served: ${clinic.areas.join(', ')} and the rest of Pune / Pimpri-Chinchwad
`;
fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# ${clinic.name}

> Multispecies veterinary clinic in Pimple Nilakh, Pune, India (PCMC), established ${clinic.founded}. Father-son team: Dr. Shivaji B. Vidhate (M.V.Sc. Pathology, 33+ years, retired District Animal Husbandry Officer, Pune) and Dr. Pritesh S. Vidhate (Head Veterinarian). In-house pathology lab (CBC & biochemistry in 15–20 minutes), digital X-ray, sonography, surgery under gaseous anaesthesia, and an Exotic Animal Centre for birds, rabbits, turtles, reptiles, guinea pigs and hamsters. Consultation ₹${clinic.fees.regular} (regular), ₹${clinic.fees.exotic} (exotic pets). Hours: ${clinic.hoursText}. Phone/WhatsApp: ${clinic.phoneDisplay}. Address: ${clinic.address.street}, ${clinic.address.locality}, Pune ${clinic.address.pin}.

${KEY_FACTS}

## Core pages
- [Home](${clinic.site}/): overview, species, services, booking, hours, location
- [About](${clinic.site}/about): doctors, qualifications, team
- [Services](${clinic.site}/services/): all services
- [Visit & book](${clinic.site}/contact): address, hours, map, appointment request
- [Gallery](${clinic.site}/gallery): real clinic photos
- [Pet care FAQs](${clinic.site}/pet-care-faqs): ${faqTotal} answers across ${extracted.faqGroups.length} species groups
- [Full text for AI assistants](${clinic.site}/llms-full.txt): every service page's direct answer and FAQs

## Services
${vis.map((s) => `- [${s.name}](${clinic.site}/services/${s.slug}): ${s.blurb}`).join('\n')}

## Blog
- [All ${posts.length} articles](${clinic.site}/blog/) · [sitemap](${clinic.site}/sitemap.xml)
`);
const { CONTENT } = require('./src/pages/service'); // brand- and owner-corrected copy (same text as the pages)
const qa = (f) => ['Q: ' + strip(f.q), 'A: ' + strip(f.a)].join('\n');
const fullSections = vis.map((s) => {
  const c = CONTENT[s.slug];
  if (!c) return '';
  return ['## ' + s.name, 'URL: ' + clinic.site + '/services/' + s.slug, '', strip(c.lead), '', (c.faqs || []).map(qa).join('\n\n'), ''].join('\n');
}).join('\n');
const faqText = extracted.faqGroups.map((g) => g.items.map((it) => qa({ q: it.q, a: it.a })).join('\n\n')).join('\n\n');
fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), ['# ' + clinic.name + ': full reference', '', KEY_FACTS, fullSections, '## Pet care FAQs', faqText, ''].join('\n'));

console.log(`Built ${written.length} pages (${posts.length} blog posts), sitemap with ${urls.length} URLs.`);
