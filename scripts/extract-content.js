// One-off migration: pulls the verified long-form content (service pages, FAQs,
// doctor qualifications) out of the legacy site so the rebuild re-presents the
// same facts in the new design. Output: data/extracted.json (committed).
const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const LEGACY = path.resolve(__dirname, '../../_original/shivprod-main');
const OUT = path.resolve(__dirname, '../data/extracted.json');

const read = (p) => parse(fs.readFileSync(path.join(LEGACY, p), 'utf8'));
const text = (n) => (n ? n.text.replace(/\s+/g, ' ').trim() : '');

// Legacy links pointed at .html files and dead anchors; map them to clean URLs.
const LINK_FIXES = [
  [/(\.\.\/)?index\.html#services/g, '/services/'],
  [/(\.\.\/)?index\.html#book/g, '/#book'],
  [/(\.\.\/)?index\.html(#[\w-]+)?/g, '/$2'],
  [/(\.\.\/)?pet-care-faqs\.html/g, '/pet-care-faqs'],
  [/(\.\.\/)?about\.html/g, '/about'],
  [/(\.\.\/)?gallery\.html/g, '/gallery'],
  [/(\.\.\/)?blog\.html/g, '/blog'],
  [/\.\.\/blog\/([\w-]+)\.html/g, '/blog/$1'],
  [/href="(?:\.\.\/services\/|services\/)?([\w-]+)\.html"/g, 'href="/services/$1"'],
];

function cleanBody(html) {
  let out = html;
  for (const [re, rep] of LINK_FIXES) out = out.replace(re, rep);
  return out
    .replace(/\s+onclick="[^"]*"/g, '')
    .replace(/\s+style="[^"]*"/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractService(file) {
  const doc = read(`services/${file}`);
  const hero = doc.querySelector('.page-hero');
  const main = doc.querySelector('.svc-main');
  const heroPs = hero.querySelectorAll('p').map(text).filter((t) => !/Medically reviewed/i.test(t));

  const faqs = main.querySelectorAll('.faq-item').map((it) => ({
    q: text(it.querySelector('.faq-q')),
    a: text(it.querySelector('.faq-a')),
  }));

  main.querySelectorAll('.svc-img-strip, .faq-item').forEach((n) => n.remove());
  main.querySelectorAll('h2').forEach((h) => { if (/Frequently Asked/i.test(h.text)) h.remove(); });
  main.querySelectorAll('.symptom-grid').forEach((g) => {
    const items = g.querySelectorAll('.symptom-chip').map((c) => `<li>${c.innerHTML.trim()}</li>`).join('');
    g.replaceWith(`<ul class="chips">${items}</ul>`);
  });
  main.querySelectorAll('.info-box').forEach((b) => b.replaceWith(`<aside class="note">${b.innerHTML}</aside>`));

  return {
    slug: file.replace(/\.html$/, ''),
    title: text(doc.querySelector('title')),
    description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    tag: text(hero.querySelector('.tag')),
    h1: text(hero.querySelector('h1')),
    lead: heroPs.join(' '),
    body: cleanBody(main.innerHTML),
    faqs,
  };
}

function extractFaqPage() {
  const doc = read('pet-care-faqs.html');
  const groups = [];
  doc.querySelectorAll('[id$="-faqs"]').forEach((sec) => {
    const heading = text(sec.querySelector('h2')) || sec.id;
    const items = sec.querySelectorAll('.faq-item').map((it) => ({
      q: text(it.querySelector('.faq-q, .faq-question, button, h3')),
      a: cleanBody((it.querySelector('.faq-a, .faq-answer, .faq-body') || it).innerHTML),
    }));
    if (items.length) groups.push({ id: sec.id, heading, items });
  });
  return groups;
}

function extractQualifications() {
  const doc = read('about.html');
  const lists = doc.querySelectorAll('ul').map((ul) => ul.querySelectorAll('li').map(text)).filter((l) => l.length);
  return lists;
}

const services = fs.readdirSync(path.join(LEGACY, 'services')).filter((f) => f.endsWith('.html')).map(extractService);
const faqGroups = extractFaqPage();
const aboutLists = extractQualifications();

fs.writeFileSync(OUT, JSON.stringify({ services, faqGroups, aboutLists }, null, 2));
console.log(`services: ${services.length}, faq groups: ${faqGroups.map((g) => `${g.id}=${g.items.length}`).join(' ')}, about lists: ${aboutLists.length}`);
