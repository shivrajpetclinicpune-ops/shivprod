// build-posts.js
// Reads all markdown files in _posts/, converts to posts.json
// Runs automatically on every Netlify build (see netlify.toml)

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, '_posts');
const OUT_FILE = path.join(__dirname, 'posts.json');

const CAT_LABELS = {
  dog: '🐕 Dogs',
  cat: '🐈 Cats',
  exotic: '🐰 Exotic Animals',
  surgery: '🔬 Surgery & Lab',
  health: '💉 Vaccination & Health'
};

function slugFromFilename(filename) {
  // Expected: YYYY-MM-DD-slug.md
  const base = filename.replace(/\.md$/, '');
  const match = base.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  return match ? match[1] : base;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No _posts directory found. Writing empty posts.json');
    fs.writeFileSync(OUT_FILE, JSON.stringify({}, null, 2));
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = {};

  files.forEach(filename => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
    const { data, content } = matter(raw);

    const slug = data.slug || slugFromFilename(filename);
    const dateISO = data.date ? new Date(data.date).toISOString().split('T')[0] : '2026-01-01';
    const cat = data.cat || 'dog';
    const catLabel = data.catLabel || CAT_LABELS[cat] || cat;

    // Convert markdown body to HTML (gray-matter content may already be HTML — marked passes HTML through)
    const htmlContent = marked.parse(content.trim());

    posts[slug] = {
      slug: slug,
      title: data.title || slug,
      cat: cat,
      catLabel: catLabel,
      date: formatDate(dateISO),
      dateISO: dateISO,
      read: String(data.read || 3),
      img: data.img || '',
      summary: data.summary || '',
      content: htmlContent
    };
  });

  // Sort newest first (used by build only for logging; blog.html sorts itself too)
  const sorted = Object.values(posts).sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));

  fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Built posts.json with ${sorted.length} posts:`);
  sorted.forEach(p => console.log(`  - ${p.dateISO}  ${p.slug}`));
}

main();
