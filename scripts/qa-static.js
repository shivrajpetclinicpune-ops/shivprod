// Static QA over built HTML: JSON-LD parses, one h1, no skipped heading levels, img alt present,
// unique ids, title/description/canonical present, no bare "Shivraj" brand in visible text.
const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const ROOT = process.cwd();
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (['node_modules', '_original', 'admin', '.gstack', 'docs', 'src', 'data', 'scripts', 'media', 'images', 'assets'].includes(f)) continue;
    if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) files.push(p);
  }
})(ROOT);
const issues = {};
const add = (k, v) => { (issues[k] = issues[k] || []).push(v); };
for (const f of files) {
  const rel = path.relative(ROOT, f);
  const html = fs.readFileSync(f, 'utf8');
  const doc = parse(html);
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((s) => { try { JSON.parse(s.text); } catch (e) { add('jsonld', rel); } });
  const h1 = doc.querySelectorAll('h1').length;
  if (h1 !== 1) add('h1!=1', `${rel} (${h1})`);
  let prev = 1;
  doc.querySelectorAll('main h1, main h2, main h3, main h4').forEach((h) => {
    const lv = Number(h.tagName[1]);
    if (lv > prev + 1) add('heading-skip', `${rel}: h${prev}→h${lv} "${h.text.trim().slice(0, 40)}"`);
    prev = lv;
  });
  doc.querySelectorAll('img').forEach((i) => { if (i.getAttribute('alt') === undefined) add('img-no-alt', `${rel} ${i.getAttribute('src')}`); });
  const ids = {};
  doc.querySelectorAll('[id]').forEach((e) => { const id = e.id; if (ids[id]) add('dup-id', `${rel} #${id}`); ids[id] = 1; });
  if (!doc.querySelector('title')?.text) add('no-title', rel);
  if (!doc.querySelector('meta[name="description"]')) add('no-desc', rel);
  if (!doc.querySelector('link[rel="canonical"]') ) add('no-canonical', rel);
  const text = doc.querySelector('main')?.text || '';
  const bare = text.match(/\bShivraj\b(?!\s*Pet)/g);
  if (bare) add('bare-brand', `${rel} (${bare.length})`);
}
console.log('pages', files.length);
for (const [k, v] of Object.entries(issues)) console.log(`${k}: ${v.length}\n  ` + [...new Set(v)].slice(0, 6).join('\n  '));
if (!Object.keys(issues).length) console.log('no issues');
