const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const clinic = require('../../data/clinic');
const { services } = require('../../data/services');
const { icon } = require('../icons');
const { label, esc, photo, picture, postCover, coverUrl, reel, videosFor, videoSchema, brandText, brandHtml, contactPair, pageHead, soundAttr } = require('../components');
const { breadcrumbs, postRow } = require('./service');

const POSTS_DIR = path.resolve(__dirname, '../../_posts');
const CATS = { dog: 'Dogs', cat: 'Cats', exotic: 'Exotic pets', surgery: 'Surgery & lab', health: 'Health & prevention' };
const CAT_SERVICE = { dog: 'clinical-medicine', cat: 'clinical-medicine', exotic: 'exotic-animal-centre', surgery: 'pathology-lab', health: 'preventive-medicine' };

// Legacy local covers → curated photo ids (same underlying photographs).
const LEGACY_COVER = {
  'bird-1': 'bird-cockatiel-lutino', 'bird-2': 'bird-parakeet-scale', 'cat-1': 'cat-calico', 'clinic-storefront': 'clinic-storefront',
  'dog-1': 'dog-pug', 'happy-pug': 'dog-pug', 'dog-2': 'dog-maltese', 'dog-clinic-waiting': 'dog-labrador', 'labrador-clinic': 'dog-labrador',
  'dr-pritesh-cat': 'dr-pritesh-microscope', 'dr-pritesh-dog-exam': 'dr-pritesh-dog', 'dr-pritesh-dog': 'dog-exam', 'clinical-medicine-dog': 'dog-exam',
  'dr-shivaji-parrot': 'dr-shivaji-parrot', 'exotic-2': 'iguana-arm', 'exotic-bird': 'bird-sun-conure', 'guinea-pigs-pair': 'guinea-pigs-pair',
  'parrot-stethoscope': 'bird-stethoscope', 'rabbit-exam': 'rabbit-exam', 'turtle-1': 'turtles-trio', 'turtle-exam': 'turtle-exam',
  lab: 'lab-analysers', 'surgery-2': 'surgery-ot-lights', xray: 'xray-room',
};
// Owner rule (C16): a real clinic photo only when it shows the SAME animal the post is about
// (species first, then topic). Posts about no particular animal get animal-free clinic photos.
// Otherwise the post keeps its stock cover, labelled as illustrative.
const SPECIES = [
  ['dog', /\b(dogs?|pupp(y|ies)|canine)\b/i, {
    surgery: ['surgery-frenchie'], imaging: ['sonography-puppy'], exam: ['dr-pritesh-dog', 'dog-exam'],
    any: ['dog-pug', 'dog-maltese', 'dog-labrador', 'dog-exam', 'dog-golden-stairs', 'dr-pritesh-dog'] }],
  ['cat', /\b(cats?|kittens?|feline)\b/i, {
    surgery: ['surgery-cat-team', 'dr-pritesh-dental', 'dr-pritesh-surgery', 'cat-anaesthesia-monitor'], imaging: ['xray-review-cat'],
    exam: ['cat-stethoscope', 'dr-pritesh-microscope', 'team-cat-care'],
    any: ['cat-calico', 'cat-persian-sitting', 'cat-bella', 'cat-stethoscope', 'team-cat-care'] }],
  ['bird', /\b(birds?|parrots?|budgies?|cockatiels?|avian|feathers?|beaks?|conures?|lovebirds?)\b/i, {
    any: ['bird-alexandrine', 'bird-sun-conure', 'bird-cockatiel-lutino', 'bird-stethoscope', 'bird-cockatiel-pied', 'bird-parakeet-closeup', 'bird-cockatiel-cage', 'dr-shivaji-parrot', 'bird-parakeet-scale'] }],
  ['rabbit', /\b(rabbits?|bunn(y|ies))\b/i, { imaging: ['rabbit-sonography'], any: ['rabbit-white', 'rabbit-exam', 'rabbit-sonography'] }],
  ['guinea', /\b(guinea pigs?|hamsters?|gerbils?)\b/i, { any: ['guinea-pigs-pair'] }],
  ['turtle', /\b(turtles?|tortoises?|shell)\b/i, { imaging: ['xray-turtle-plate', 'xray-turtle-unit', 'xray-review-turtle'], any: ['turtles-trio', 'turtle-exam', 'dr-pritesh-turtle'] }],
  ['reptile', /\b(reptiles?|iguanas?|lizards?)\b/i, { any: ['iguana-arm', 'iguanas-basket'] }],
];
const TOPIC = [
  ['surgery', /surg|neuter|spay|tumou?r|foreign|operat|dental|teeth|scaling/i],
  ['imaging', /x-?ray|ultrasound|sonograph|radiograph/i],
  ['exam', /check-?up|exam|test|blood|cbc|lab|biochem|diagnos|visit/i],
];
const NEUTRAL = [
  [/x-?ray|ultrasound|sonograph/i, ['xray-room', 'sonography-machine']],
  [/blood|cbc|lab|test|biochem|patholog|urine|stone|diagnos/i, ['lab-analysers', 'bladder-stones', 'dr-shivaji-notes']],
  [/surg|operat|anaesth|anesth/i, ['surgery-ot-lights', 'surgery-team-xray-arm', 'surgery-supervision']],
  [/clinic|vet near|neighbourhood|pimple|wakad|pcmc|in pune|veterinary care guide|choose/i, ['clinic-signboard', 'clinic-storefront', 'dr-shivaji-desk', 'pharmacy-shelves']],
];
const CAT_SPECIES = { dog: 'dog', cat: 'cat' };
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const pick = (pool, slug) => pool[hash(slug) % pool.length];

function coverFor(slug, title, img, cat) {
  // Posts whose original cover was a real clinic photo keep that same photograph.
  const legacy = /\/images\/(?:gallery|services)\/([\w-]+)\.(?:jpg|jpeg|png)$/i.exec(img || '');
  if (legacy && LEGACY_COVER[legacy[1]]) return LEGACY_COVER[legacy[1]];
  // species named in the title (first mention wins), else the post category
  const found = SPECIES.map(([id, re, pools]) => [id, title.search(re), pools]).filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1])[0]
    || (CAT_SPECIES[cat] && SPECIES.find(([id]) => id === CAT_SPECIES[cat]).map((v, k) => (k === 1 ? 0 : v)));
  if (found) {
    const pools = found[2];
    const topic = TOPIC.find(([k, re]) => pools[k] && re.test(title));
    return pick(topic ? pools[topic[0]] : pools.any, slug);
  }
  if (cat === 'exotic') return null; // an exotic post with no clear species: keep its stock image rather than guess
  const neutral = NEUTRAL.find(([re]) => re.test(title));
  if (neutral) return pick(neutral[1], slug);
  return /^https:\/\//.test(img || '') ? null : 'clinic-signboard';
}

const fixLinks = (html) => html
  .replace(/href="javascript:void\(0\)"\s+onclick="openPost\('([a-z0-9-]+)'\)"/g, 'href="/blog/$1"')
  .replace(/href="(?:\.\.\/)?services\/([\w-]+)\.html"/g, 'href="/services/$1"')
  .replace(/href="(?:\.\.\/)?index\.html#services"/g, 'href="/services/"')
  .replace(/href="(?:\.\.\/)?index\.html(#[\w-]+)?"/g, 'href="/$1"')
  .replace(/href="(?:\.\.\/)?(about|gallery|pet-care-faqs|blog)\.html(#[\w-]+)?"/g, 'href="/$1$2"')
  .replace(/href="(?:\.\.\/)?blog\/([\w-]+)\.html"/g, 'href="/blog/$1"')
  .replace(/<img\b[^>]*src="https:\/\/images\.pexels\.com[^"]*"[^>]*>/g, '') // strip hotlinked stock inside bodies
  // Legacy "Quick Facts" boxes open with an <h4> before any <h2>: it is a label, not a heading level.
  .replace(/(<div class="post-quickfacts">\s*)<h4>(.*?)<\/h4>/g, '$1<p class="qf-h">$2</p>');

function slugFromFilename(f) {
  const base = f.replace(/\.md$/, '');
  const m = base.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  return m ? m[1] : base;
}

function loadPosts() {
  const posts = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
    const slug = data.slug || slugFromFilename(f);
    const dateISO = data.date ? new Date(data.date).toISOString().split('T')[0] : '2026-01-01';
    const cat = CATS[data.cat] ? data.cat : 'health';
    const title = brandText(data.title || slug);
    return {
      slug, title, cat, catName: CATS[cat], dateISO, read: String(data.read || 3), img: data.img || '', summary: brandText(data.summary || ''),
      photo: coverFor(slug, title, data.img, cat), content: brandHtml(fixLinks(marked.parse(content.trim()))),
    };
  });
  // Several files can share a slug (older copies of the same article). Like the legacy build,
  // the newest-dated file wins; each URL is generated once.
  const bySlug = new Map();
  for (const p of posts) { const cur = bySlug.get(p.slug); if (!cur || p.dateISO >= cur.dateISO) bySlug.set(p.slug, p); }
  return [...bySlug.values()].sort((a, b) => b.dateISO.localeCompare(a.dateISO) || a.slug.localeCompare(b.slug));
}

function tocOf(html) {
  const heads = [];
  let i = 0;
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (all, t) => {
    const id = `s-${++i}-${t.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)}`;
    heads.push([id, t.replace(/<[^>]+>/g, '')]);
    return `<h2 id="${id}">${t}</h2>`;
  });
  return { html: out, heads };
}

function faqSchemaOf(p) {
  const m = p.content.match(/<h2>Frequently Asked Questions<\/h2>([\s\S]*?)(?:<h2>|$)/);
  if (!m) return null;
  const pairs = [...m[1].matchAll(/<p><strong>(.*?)<\/strong><br>(.*?)<\/p>/g)];
  if (!pairs.length) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: pairs.map(([, q, a]) => ({ '@type': 'Question', name: q.replace(/<[^>]*>/g, ''), acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]*>/g, '') } })) };
}

function postPage(p, all) {
  const related = all.filter((o) => o.slug !== p.slug && o.cat === p.cat).slice(0, 4);
  const svc = services.find((s) => s.slug === CAT_SERVICE[p.cat]);
  const { html, heads } = tocOf(p.content);
  const pagePath = `/blog/${p.slug}`;
  const vids = videosFor(pagePath);
  const date = new Date(`${p.dateISO}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const body = `<article class="post" data-post>
  <div class="post__progress" aria-hidden="true"><span data-read-progress></span></div>
  <header class="post__head wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><a href="/blog/?cat=${p.cat}">${p.catName}</a></nav>
    <h1 class="display display--post">${esc(p.title)}</h1>
    <div class="post__intro">
      <p class="post__summary">${esc(p.summary)}</p>
      <p class="post__meta"><span class="post__by">${picture('dr-pritesh-microscope', { sizes: '44px', alt: '', pos: '62% 22%' })}</span><span>By <a href="/about#pritesh">Dr. Pritesh Vidhate</a><br><time datetime="${p.dateISO}">${date}</time> · ${p.read} min read</span></p>
    </div>
  </header>
  <figure class="post__cover">${postCover(p, { sizes: '100vw', eager: true, alt: p.photo ? undefined : '' })}<figcaption class="wrap">${p.photo ? `${esc(photo(p.photo).alt)}. Photographed at Shivraj Pet Clinic &amp; Lab.` : 'Illustrative stock photo, not a clinic patient.'}</figcaption></figure>
  <div class="wrap post__grid">
    ${heads.length > 2 ? `<nav class="post__toc" aria-label="In this article">${label('In this article')}<ol>${heads.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ol></nav>` : '<div></div>'}
    <div class="post__body prose">${vids.length ? `<div class="svc__reel">${vids.map((id) => reel(id)).join('')}</div>` : ''}${html}</div>
  </div>
  <aside class="post__cta" data-theme="dark" aria-label="Book a consultation">
    <div class="wrap post__cta-grid">
      <p class="post__cta-big">Concerned about your pet? Same-day consultations are usually available.</p>
      <div>
        <a class="btn btn--light" href="/#book"><span class="btn__label">Book an appointment</span><span class="btn__ic">${icon('arrow')}</span></a>
        ${contactPair({ cls: 'cpair--light', waText: `Hi Shivraj Pet Clinic & Lab, I read "${p.title}" and have a question.` })}
        ${svc ? `<p class="post__cta-svc">Related care: <a href="/services/${svc.slug}">${svc.name}</a></p>` : ''}
      </div>
    </div>
  </aside>
  ${related.length ? `<section class="wrap post__related" aria-labelledby="rel-h"><h2 class="display display--sm" id="rel-h">Keep reading</h2><div class="rows">${related.map((r) => postRow(r)).join('')}</div></section>` : ''}
</article>`;
  const article = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.summary, image: coverUrl(p),
    author: { '@type': 'Person', name: 'Dr. Pritesh Vidhate', url: `${clinic.site}/about#pritesh` },
    publisher: { '@id': `${clinic.site}/#clinic` }, datePublished: p.dateISO, dateModified: p.dateISO,
    mainEntityOfPage: clinic.site + pagePath, articleSection: p.catName,
  };
  return {
    path: pagePath,
    title: `${p.title} | Shivraj Pet Clinic & Lab, Pune`,
    description: p.summary,
    image: coverUrl(p),
    imageAlt: p.photo ? photo(p.photo).alt : p.title,
    ogType: 'article',
    schema: [breadcrumbs([['Home', '/'], ['Blog', '/blog/'], [p.title, pagePath]]), article, faqSchemaOf(p), ...vids.map(videoSchema)].filter(Boolean),
    body,
    bodyClass: 'page-post',
    dataCat: p.cat === 'dog' || /\b(dogs?|pupp(y|ies))\b/i.test(p.title) ? 'dog' : p.cat,
    scripts: [],
  };
}

function blogIndex(posts) {
  const feat = posts.find((p) => p.photo) || posts[0];
  const rest = posts.filter((p) => p !== feat);
  const counts = Object.fromEntries(Object.keys(CATS).map((c) => [c, posts.filter((p) => p.cat === c).length]));
  const filters = [['all', 'All', posts.length], ...Object.entries(CATS).map(([c, n]) => [c, n, counts[c]])]
    .map(([id, name, n], i) => `<button type="button" class="tab${i === 0 ? ' is-on' : ''}" data-filter="${id}" aria-pressed="${i === 0}"${id === 'dog' ? ' data-sound="dog"' : id === 'cat' ? ' data-sound="cat"' : ''}>${name}<sup>${n}</sup></button>`).join('');
  const body = `${pageHead({ crumbs: [['Blog', '/blog/']], kicker: 'Pet health blog', title: 'Pet health, explained by vets.', lead: `${posts.length} articles on dogs, cats, birds, rabbits, turtles and more, written for pet parents in Pune by the team at Shivraj Pet Clinic &amp; Lab.` })}
  <div class="wrap">
    <a class="feat" href="/blog/${feat.slug}"${soundAttr(feat.title)}>
      <figure class="feat__img" data-mask="up">${postCover(feat, { sizes: '(min-width:1024px) 58vw, 100vw', eager: true, alt: '' })}</figure>
      <div class="feat__body">${label(`Latest · ${feat.catName}`)}<h2 class="display display--sm">${esc(feat.title)}</h2><p>${esc(feat.summary)}</p><span class="link-arrow">Read the article ${icon('arrow')}</span></div>
    </a>
    <div class="listbar">
      <div class="tabs" role="group" aria-label="Filter articles">${filters}</div>
      <div class="search" role="search">${icon('search')}<label class="sr" for="blog-q">Search articles</label><input id="blog-q" type="search" placeholder="Search articles" data-list-search autocomplete="off"></div>
    </div>
    <p class="search__status muted" aria-live="polite" data-list-status></p>
    <div class="rows rows--index" data-list>${rest.map((p) => postRow(p)).join('')}</div>
    <div class="listing-more"><button type="button" class="btn btn--ghost" data-list-more hidden><span class="btn__label">Show more articles</span><span class="btn__ic">${icon('plus')}</span></button></div>
  </div>`;
  return {
    path: '/blog/',
    title: 'Pet Health Blog | Shivraj Pet Clinic & Lab Pune',
    description: `${posts.length} vet-written articles on dog, cat, bird, rabbit and turtle health: vaccination schedules, emergencies, diagnostics and exotic pet care from Shivraj Pet Clinic & Lab, Pune.`,
    image: coverUrl(feat),
    schema: [breadcrumbs([['Home', '/'], ['Blog', '/blog/']]), {
      '@context': 'https://schema.org', '@type': 'Blog', name: 'Shivraj Pet Clinic & Lab blog', url: `${clinic.site}/blog/`, publisher: { '@id': `${clinic.site}/#clinic` },
      blogPost: posts.slice(0, 20).map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${clinic.site}/blog/${p.slug}`, datePublished: p.dateISO })),
    }],
    body,
    bodyClass: 'page-blog',
    scripts: ['listing'],
  };
}

module.exports = { loadPosts, postPage, blogIndex, CATS };
