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
const lastmod = (pg) => (posts.find((p) => `/blog/${p.slug}` === pg.path)?.dateISO || TODAY);
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
const bots = ['*', 'GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot', 'Bingbot'];
fs.writeFileSync(path.join(ROOT, 'robots.txt'), bots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /admin\n`).join('\n') + `\nSitemap: ${clinic.site}/sitemap.xml\n`);

// ── llms.txt
const vis = services.filter((s) => !s.hidden);
fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# ${clinic.name}

> Multispecies veterinary clinic in Pimple Nilakh, Pune, India (PCMC), established ${clinic.founded}. Father-son team: Dr. Shivaji B. Vidhate (M.V.Sc. Pathology, 33+ years, retired District Animal Husbandry Officer, Pune) and Dr. Pritesh S. Vidhate (Head Veterinarian). In-house pathology lab (CBC & biochemistry in 15–20 minutes), digital X-ray, sonography, surgery under gaseous anaesthesia, and an Exotic Animal Centre for birds, rabbits, turtles, reptiles, guinea pigs and hamsters. Consultation ₹${clinic.fees.regular} (regular), ₹${clinic.fees.exotic} (exotic pets). Hours: ${clinic.hoursText}. Phone/WhatsApp: ${clinic.phoneDisplay}. Address: ${clinic.address.street}, ${clinic.address.locality}, Pune ${clinic.address.pin}.

## Core pages
- [Home](${clinic.site}/): overview, species, services, booking, hours, location
- [About](${clinic.site}/about): doctors, qualifications, team
- [Services](${clinic.site}/services/): all services
- [Visit & book](${clinic.site}/contact): address, hours, map, appointment request
- [Gallery](${clinic.site}/gallery): real clinic photos
- [Pet care FAQs](${clinic.site}/pet-care-faqs): 86 answers across 7 species

## Services
${vis.map((s) => `- [${s.name}](${clinic.site}/services/${s.slug}): ${s.blurb}`).join('\n')}

## Blog
- [All ${posts.length} articles](${clinic.site}/blog/) · [sitemap](${clinic.site}/sitemap.xml)
`);

console.log(`Built ${written.length} pages (${posts.length} blog posts), sitemap with ${urls.length} URLs.`);
