// build-posts.js
// Reads all markdown files in _posts/, converts to posts.json
// Run this before deploying (Cloudflare Pages build command: npm run build)

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

function escapeHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function absImg(img) {
  if (!img) return 'https://www.shivrajpetclinicpune.com/images/logo.png';
  return img.indexOf('http') === 0 ? img : ('https://www.shivrajpetclinicpune.com' + img);
}

// Static pages under /blog/ are one directory deep. An absolute path like
// "/images/x.jpg" only resolves correctly when the site is served from its
// real domain root — it breaks when someone opens the file directly on their
// own computer (file://), since "/" then means the filesystem root, not the
// site root. Relative paths work in both cases, so every image reference
// inside a /blog/ page must go through this first.
function relImg(img) {
  if (!img) return '';
  if (img.indexOf('http') === 0) return img;
  return img.indexOf('/') === 0 ? ('..' + img) : img;
}

// Internal links in post content were written as onclick="openPost('slug')" for the
// old JS-overlay reader. On a real static page, that has to become a real href to a
// sibling file. Service/index links used root-relative style (blog.html's own level);
// from inside /blog/, they need a ../ prefix instead.
function fixContentLinksForStaticPage(html) {
  return html
    .replace(/href="javascript:void\(0\)"\s+onclick="openPost\('([a-z0-9\-]+)'\)"/g, 'href="$1.html"')
    .replace(/href="services\//g, 'href="../services/')
    .replace(/href="index\.html/g, 'href="../index.html')
    .replace(/href="pet-care-faqs\.html/g, 'href="../pet-care-faqs.html');
}

function renderPostPage(slug, p, allPosts) {
  const related = Object.values(allPosts)
    .filter(o => o.slug !== slug && o.cat === p.cat)
    .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
    .slice(0, 3);

  const canonicalUrl = `https://www.shivrajpetclinicpune.com/blog/${slug}.html`;
  const content = fixContentLinksForStaticPage(p.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": p.title,
    "description": p.summary,
    "image": absImg(p.img),
    "author": {"@type": "Person", "name": "Dr. Pritesh Vidhate"},
    "publisher": {"@type": "VeterinaryCare", "name": "Shivraj Pet Clinic & Lab", "url": "https://www.shivrajpetclinicpune.com"},
    "datePublished": p.dateISO,
    "mainEntityOfPage": canonicalUrl
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shivrajpetclinicpune.com/index.html"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.shivrajpetclinicpune.com/blog.html"},
      {"@type": "ListItem", "position": 3, "name": p.title, "item": canonicalUrl}
    ]
  };

  const relatedHtml = related.length ? `
<div class="related-section">
  <h3>Related Articles</h3>
  <div class="related-grid">
    ${related.map(r => `<a href="${r.slug}.html" class="related-card">
      <img src="${relImg(r.img)}" alt="${escapeHtml(r.title)}" loading="lazy" onerror="this.style.display='none'">
      <div class="rc-body"><h4>${escapeHtml(r.title)}</h4></div>
    </a>`).join('\n    ')}
  </div>
</div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-94PYDYSWKF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-94PYDYSWKF');
</script>
<meta charset="UTF-8">
<link rel="canonical" href="${canonicalUrl}">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(p.title)} | Shivraj Pet Clinic Pune</title>
<meta name="description" content="${escapeHtml(p.summary)}">
<meta name="robots" content="index, follow">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHtml(p.title)}">
<meta property="og:description" content="${escapeHtml(p.summary)}">
<meta property="og:image" content="${absImg(p.img)}">
<meta property="og:url" content="${canonicalUrl}">
<meta name="twitter:card" content="summary_large_image">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
${fs.readFileSync(path.join(__dirname, '_blog_style_block.css'), 'utf8')}
h1.post-h1{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,4vw,2.4rem);line-height:1.25;color:var(--ink);margin-bottom:14px}
.post-page-wrap{max-width:760px;margin:0 auto;padding:100px 20px 60px}
.breadcrumb-nav{font-size:.8rem;color:var(--muted);margin-bottom:20px}
.breadcrumb-nav a{color:var(--teal);text-decoration:none}
.breadcrumb-nav a:hover{text-decoration:underline}
.post-cta-box{background:linear-gradient(135deg,#163e57,#1e5f8c);border-radius:16px;padding:28px 24px;color:#fff;text-align:center;margin:40px 0}
.post-cta-box h3{color:#fff;margin-bottom:8px}
.post-cta-box p{opacity:.85;margin-bottom:18px;font-size:.9rem}
.post-cta-box .btn{display:inline-block;background:#fff;color:var(--teal);padding:12px 26px;border-radius:50px;text-decoration:none;font-weight:700;margin:0 6px 8px}
.post-cta-box .btn-outline2{background:transparent;border:1.5px solid rgba(255,255,255,.5);color:#fff}
.related-section{margin:48px 0}
.related-section h3{font-size:1.1rem;margin-bottom:16px;color:var(--ink)}
.related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px}
.related-card{display:block;text-decoration:none;color:inherit;border:1px solid var(--line);border-radius:12px;overflow:hidden;transition:box-shadow .2s;background:#fff}
.related-card:hover{box-shadow:var(--sh)}
.related-card img{width:100%;height:110px;object-fit:contain;background:#f3ede3;display:block}
.related-card .rc-body{padding:12px 14px}
.related-card h4{font-size:.85rem;line-height:1.35;color:var(--ink);font-weight:600}
.back-link{display:inline-block;margin-top:8px;color:var(--teal);font-weight:600;text-decoration:none;font-size:.88rem}
.back-link:hover{text-decoration:underline}
@media(max-width:600px){.post-page-wrap{padding:90px 16px 50px}}
</style>
<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
</head>
<body>
<nav id="mainNav">
  <div class="nav-inner">
    <a href="../index.html" class="logo-wrap">
      <img src="../images/logo.png" alt="Shivraj Pet Clinic" class="logo-img" onerror="this.style.display='none'">
      <div class="logo-text"><strong>Shivraj Pet Clinic</strong><span>&amp; Lab &middot; Pimple Nilakh</span></div>
    </a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../index.html#services">Services</a></li>
      <li><a href="../about.html">About</a></li>
      <li><a href="../gallery.html">Gallery &amp; Team</a></li>
      <li><a href="../blog.html" class="active">Blog</a></li>
      <li><a href="../pet-care-faqs.html">Pet Care FAQs</a></li>
      <li><a href="../index.html#book" class="nav-cta">Book Appointment</a></li>
    </ul>
    <button class="hamburger" onclick="document.getElementById('mobBlogPost').classList.toggle('open')" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mob-menu" id="mobBlogPost">
  <a href="../index.html">Home</a>
  <a href="../index.html#services">Services</a>
  <a href="../about.html">About</a>
  <a href="../gallery.html">Gallery &amp; Team</a>
  <a href="../pet-care-faqs.html">Pet Care FAQs</a>
  <a href="../index.html#book">Book Appointment</a>
</div>

<article class="post-page-wrap">
  <div class="breadcrumb-nav"><a href="../index.html">Home</a> / <a href="../blog.html">Blog</a> / ${escapeHtml(p.title)}</div>
  <div class="post-cat-tag">${p.catLabel}</div>
  <h1 class="post-h1">${escapeHtml(p.title)}</h1>
  <div class="post-meta-full"><span>${p.date}</span><span>Dr. Pritesh Vidhate</span><span>${p.read} min read</span></div>
  ${p.img ? `<img src="${relImg(p.img)}" alt="${escapeHtml(p.title)}" class="post-hero-img" onerror="this.style.display='none'">` : ''}
  <div class="post-content">${content}</div>

  <div class="post-cta-box">
    <h3>Concerned About Your Pet?</h3>
    <p>Same-day consultations usually available. Call or book online.</p>
    <a href="tel:+917756965169" class="btn">Call 077569 65169</a>
    <a href="../index.html#book" class="btn btn-outline2">Book Appointment</a>
  </div>

  ${relatedHtml}

  <a href="../blog.html" class="back-link">&larr; Back to All Articles</a>
</article>

<footer>
  <strong>Shivraj Pet Clinic &amp; Lab</strong> &bull; Shop B-4, Alpine Avenue, Pimple Nilakh, Pune 411027 &bull; +91 77569 65169<br>
  <span style="opacity:.6;font-size:.75rem">&copy; 2026 Shivraj Pet Clinic. All rights reserved.</span>
</footer>
<script>
window.addEventListener('scroll', function() {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 8);
});
</script>
</body>
</html>`;
}

function generatePostPages(posts) {
  const BLOG_DIR = path.join(__dirname, 'blog');
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR);

  // Remove any previously-generated page whose source post no longer exists.
  // Without this, a deleted/merged post's old .html file stays live on the
  // site indefinitely — stale, unlinked, but still crawlable.
  const validSlugs = new Set(Object.keys(posts));
  const existing = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.html'));
  let removed = 0;
  existing.forEach(f => {
    const slug = f.replace(/\.html$/, '');
    if (!validSlugs.has(slug)) {
      fs.unlinkSync(path.join(BLOG_DIR, f));
      removed++;
    }
  });
  if (removed) console.log(`Removed ${removed} orphaned blog page(s) with no matching post.`);

  let count = 0;
  Object.keys(posts).forEach(slug => {
    const html = renderPostPage(slug, posts[slug], posts);
    fs.writeFileSync(path.join(BLOG_DIR, `${slug}.html`), html);
    count++;
  });
  console.log(`Generated ${count} static blog/*.html pages.`);
}

function syncSitemap(posts) {
  const SITEMAP = path.join(__dirname, 'sitemap.xml');
  if (!fs.existsSync(SITEMAP)) return;
  let xml = fs.readFileSync(SITEMAP, 'utf8');

  // Remove any previously-generated blog post entries (marked by comment fence)
  // so re-running the build never duplicates or leaves stale slugs behind.
  const startMarker = '<!-- BLOG_POSTS_START -->';
  const endMarker = '<!-- BLOG_POSTS_END -->';
  const startIdx = xml.indexOf(startMarker);
  const endIdx = xml.indexOf(endMarker);
  if (startIdx !== -1 && endIdx !== -1) {
    xml = xml.slice(0, startIdx) + xml.slice(endIdx + endMarker.length);
  }

  const entries = Object.values(posts)
    .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
    .map(p => `  <url><loc>https://www.shivrajpetclinicpune.com/blog/${p.slug}.html</loc><lastmod>${p.dateISO}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
    .join('\n');

  const block = `${startMarker}\n${entries}\n${endMarker}\n`;
  xml = xml.replace('</urlset>', block + '</urlset>');
  fs.writeFileSync(SITEMAP, xml);
  console.log(`Synced sitemap.xml with ${Object.keys(posts).length} blog post URLs.`);
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

  generatePostPages(posts);
  syncSitemap(posts);

  // Keep blog.html's FALLBACK_POSTS in sync automatically — this used to be
  // hand-maintained and silently went stale (10 posts vs 30+ actual).
  // Now it's regenerated from the same source of truth on every build.
  const BLOG_HTML = path.join(__dirname, 'blog.html');
  if (fs.existsSync(BLOG_HTML)) {
    let blogHtml = fs.readFileSync(BLOG_HTML, 'utf8');
    const marker = 'var FALLBACK_POSTS = ';
    const start = blogHtml.indexOf(marker);
    // NOTE: do not use indexOf(';') to find the end of this block — post content
    // frequently contains semicolons (e.g. "80–95%; without treatment...") which
    // truncates the object mid-string and corrupts the file. Anchor on the next
    // known statement instead, which is stable regardless of post content.
    const resumeAnchor = 'var POSTS = {};';
    const resumeIdx = blogHtml.indexOf(resumeAnchor, start);
    if (start !== -1 && resumeIdx !== -1) {
      const newBlock = marker + JSON.stringify(posts) + ';\n';
      blogHtml = blogHtml.slice(0, start) + newBlock + blogHtml.slice(resumeIdx);
      fs.writeFileSync(BLOG_HTML, blogHtml);
      console.log(`Synced FALLBACK_POSTS in blog.html with all ${sorted.length} posts.`);
    } else {
      console.log('WARNING: FALLBACK_POSTS marker or resume anchor not found in blog.html — skipped sync.');
    }
  }
}

main();
