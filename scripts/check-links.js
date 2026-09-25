// QA: every internal src/href/srcset/poster in the built HTML must resolve to a file.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', '_posts', 'admin', '.git', 'docs', 'scripts', 'src', 'data']);
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    if (SKIP.has(f)) continue;
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(ROOT);

const missing = new Map();
let refs = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:src|href|srcset|poster)="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      let u = part.trim().split(' ')[0];
      if (!u.startsWith('/') || u.startsWith('//')) continue;
      u = u.split('#')[0].split('?')[0];
      if (!u || u === '/') continue;
      refs++;
      const fp = path.join(ROOT, u);
      const ok = fs.existsSync(fp) || fs.existsSync(`${fp}.html`) || fs.existsSync(path.join(fp, 'index.html'));
      if (!ok) missing.set(u, (missing.get(u) || 0) + 1);
    }
  }
}
console.log(`pages ${files.length}, internal refs ${refs}, missing ${missing.size}`);
[...missing].slice(0, 30).forEach(([u, n]) => console.log(`  MISSING ${u} (${n}x)`));
process.exitCode = missing.size ? 1 : 0;
