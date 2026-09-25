// Builds responsive AVIF/WebP/JPEG variants for every curated photo in data/photos.js.
// Output: images/p/<id>-<width>.<ext> + data/photos.meta.json (intrinsic sizes + LQIP colour).
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const photos = require('../data/photos');

const ROOTS = {
  A: path.resolve(__dirname, '../../uss only what needed'),
  B: path.resolve(__dirname, '../../_original/shivprod-main/images'),
};
const OUT_DIR = path.resolve(__dirname, '../images/p');
const META = path.resolve(__dirname, '../data/photos.meta.json');
const WIDTHS = [480, 960, 1600];

fs.mkdirSync(OUT_DIR, { recursive: true });

async function processPhoto(p) {
  const [root, rel] = p.src.split(/:(.+)/);
  const file = path.join(ROOTS[root], rel);
  const base = sharp(file, { failOn: 'none' }).rotate();
  const { info: { width, height } } = await base.clone().toBuffer({ resolveWithObject: true });
  const widths = WIDTHS.filter((w) => w < width).concat(width <= 1600 ? [width] : []).filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    const img = base.clone().resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(OUT_DIR, `${p.id}-shivraj-pet-clinic-${w}.avif`));
    await img.clone().webp({ quality: 74 }).toFile(path.join(OUT_DIR, `${p.id}-shivraj-pet-clinic-${w}.webp`));
  }
  const fallbackW = widths.find((w) => w >= 960) || widths[widths.length - 1];
  await base.clone().resize({ width: fallbackW }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT_DIR, `${p.id}-shivraj-pet-clinic-${fallbackW}.jpg`));
  const { dominant } = await base.clone().stats();
  const hex = '#' + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, '0')).join('');
  return { id: p.id, w: width, h: height, widths, fallback: fallbackW, color: hex };
}

async function logo() {
  const src = path.join(ROOTS.A, 'new shivraj logo.png');
  const out = path.resolve(__dirname, '../images');
  const trimmed = await sharp(src).trim({ threshold: 20 }).toBuffer();
  await sharp(trimmed).resize({ width: 480 }).png({ compressionLevel: 9 }).toFile(path.join(out, 'logo.png'));
  await sharp(trimmed).resize({ width: 480 }).webp({ quality: 90 }).toFile(path.join(out, 'logo.webp'));
  // Square mark crop (the framed animal cluster centred above the wordmark) for favicon / apple-touch.
  const mark = sharp(src).extract({ left: 240, top: 38, width: 222, height: 162 });
  await mark.clone().resize(180, 180, { fit: 'contain', background: '#f4efe6' }).png().toFile(path.join(out, 'apple-touch-icon.png'));
  await mark.clone().resize(512, 512, { fit: 'contain', background: '#f4efe6' }).png().toFile(path.join(out, 'icon-512.png'));
  await mark.clone().resize({ height: 120 }).png({ compressionLevel: 9 }).toFile(path.join(out, 'mark.png'));
  await mark.clone().resize({ height: 120 }).webp({ quality: 90 }).toFile(path.join(out, 'mark.webp'));
  await mark.clone().resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(out, 'favicon-48.png'));
}

async function ogImage(meta) {
  // 1200x630 social card from the hero photo, darkened for legibility (text is added by the platforms' titles).
  const hero = photos.find((p) => p.id === 'cat-persian-guinea-pigs');
  const [root, rel] = hero.src.split(/:(.+)/);
  await sharp(path.join(ROOTS[root], rel)).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true }).toFile(path.resolve(__dirname, '../images/og-default.jpg'));
}

(async () => {
  const meta = {};
  for (const p of photos) {
    try {
      meta[p.id] = await processPhoto(p);
      process.stdout.write('.');
    } catch (e) {
      console.error(`\nFAILED ${p.id} (${p.src}): ${e.message}`);
      process.exitCode = 1;
    }
  }
  await logo();
  await ogImage(meta);
  fs.writeFileSync(META, JSON.stringify(meta, null, 2));
  console.log(`\n${Object.keys(meta).length}/${photos.length} photos processed → images/p`);
})();
