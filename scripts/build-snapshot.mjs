// Package the current local site into a single self-contained HTML file
// that Claude Design (claude.ai's design environment) can ingest.
//
// What gets inlined:
//   - public/styles/production.css       → <style> in <head>
//   - public/fonts/*.otf                 → @font-face data URIs
//   - public/favicon.png                 → data URI
//   - public/scripts/*.js                → inline <script> blocks
//
// What stays remote:
//   - External CDN libraries (jQuery, GSAP, Wistia E-v1, Senja)
//     because those URLs work from anywhere
//   - Image / video assets on cdn.prod.website-files.com and Wistia
//
// What gets stripped:
//   - Analytics that would error inside Claude Design's preview
//     (Hotjar, Sentry, LinkedIn Insight, RB2B, banner / cookie loaders)
//
// Outputs (in dist/):
//   a2media-snapshot.html             full snapshot, scripts intact
//   a2media-snapshot-structure.html   structure + styles only, no scripts
//
// The structure-only fallback exists in case Claude Design rejects the
// full file as too large, since visual design only needs markup + styles.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "dist");
fs.mkdirSync(OUT_DIR, { recursive: true });

const bodyHtml = fs.readFileSync(
  path.join(ROOT, ".crawl", "processed", "body.html"),
  "utf8",
);
const css = fs.readFileSync(
  path.join(ROOT, "public", "styles", "production.css"),
  "utf8",
);
const headJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, ".crawl", "processed", "head.json"), "utf8"),
);

// ─── Font data URIs ───────────────────────────────────────────────────
const fontDir = path.join(ROOT, "public", "fonts");
const fontMeta = [
  { file: "GalanoGrotesqueRegular.otf", family: "Galano Grotesque", weight: 400, style: "normal" },
  { file: "GalanoGrotesqueMedium.otf", family: "Galano Grotesque", weight: 500, style: "normal" },
  { file: "GalanoGrotesqueSemiBold.otf", family: "Galano Grotesque", weight: 600, style: "normal" },
  { file: "GalanoGrotesqueBold.otf", family: "Galano Grotesque", weight: 700, style: "normal" },
  { file: "AwesomeSerif-ExtraTall.otf", family: "Awesome Serif", weight: 400, style: "normal" },
  { file: "AwesomeSerifItalic-ExtraTall.otf", family: "Awesome Serif", weight: 400, style: "italic" },
];
const fontFaces = fontMeta
  .map(({ file, family, weight, style }) => {
    const data = fs.readFileSync(path.join(fontDir, file)).toString("base64");
    return `@font-face{font-family:'${family}';font-weight:${weight};font-style:${style};font-display:swap;src:url(data:font/otf;base64,${data}) format('opentype');}`;
  })
  .join("\n");

// ─── Favicon data URI ─────────────────────────────────────────────────
const favBuf = fs.readFileSync(path.join(ROOT, "public", "favicon.png"));
const favDataUri = `data:image/png;base64,${favBuf.toString("base64")}`;

// ─── Inline local /scripts/*.js into the body ─────────────────────────
const scriptsDir = path.join(ROOT, "public", "scripts");
let bodyInlined = bodyHtml;
for (const file of fs.readdirSync(scriptsDir)) {
  const src = `/scripts/${file}`;
  const content = fs.readFileSync(path.join(scriptsDir, file), "utf8");
  // Match <script src="/scripts/X.js" ...></script> in any order of attrs
  const re = new RegExp(
    `<script[^>]*\\bsrc=\\"${src.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\"[^>]*></script>`,
    "g",
  );
  if (!re.test(bodyInlined)) {
    console.warn(`   ! ${src} not referenced in body.html, skipping inline`);
    continue;
  }
  bodyInlined = bodyInlined.replace(
    new RegExp(
      `<script[^>]*\\bsrc=\\"${src.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\"[^>]*></script>`,
      "g",
    ),
    `<script>/* inlined from ${src} */\n${content}\n</script>`,
  );
}

// ─── Strip analytics that would error inside Claude Design ────────────
const analyticsPatterns = [
  /<script[^>]*src=\"https?:\/\/[^\"]*hotjar\.com[^\"]*\"[^>]*><\/script>/g,
  /<script[^>]*src=\"https?:\/\/[^\"]*sentry-cdn\.com[^\"]*\"[^>]*><\/script>/g,
  /<script[^>]*src=\"https?:\/\/snap\.licdn\.com[^\"]*\"[^>]*><\/script>/g,
  /<script[^>]*src=\"https?:\/\/[^\"]*bestfreecdn\.com[^\"]*\"[^>]*><\/script>/g,
];
let stripped = 0;
for (const re of analyticsPatterns) {
  bodyInlined = bodyInlined.replace(re, () => {
    stripped++;
    return "";
  });
}
// Also strip the inline Hotjar bootstrap and any inline LinkedIn/sentry inits
bodyInlined = bodyInlined
  .replace(/<script>\s*\(function\(h,o,t,j,a,r\)\s*\{[\s\S]*?_hjSettings[\s\S]*?<\/script>/g, () => {
    stripped++;
    return "";
  })
  .replace(/<script>\s*_linkedin_partner_id[\s\S]*?<\/script>/g, () => {
    stripped++;
    return "";
  });

// ─── Snapshot meta — hooks Claude Design must preserve ────────────────
const hooks = {
  classes: [
    "w-dropdown",
    "w-dropdown-toggle",
    "w-dropdown-list",
    "w-nav",
    "w-nav-button",
    "w-nav-overlay",
    "w-nav-menu",
    "a2cs-tab",
    "a2cs-active",
    "a2cs-panel",
    "a2cs-tabs",
    "a2p-collapse",
    "a2p-collapse-hdr",
    "a2p-collapse-body",
    "a2p-card",
    "faq-section",
    "question-container",
    "question-container-copy",
    "question-text",
    "answer",
    "answer-text",
    "dropdown-toggle",
    "dropdown-list",
    "r-card",
    "r-number",
    "r-label",
    "f-ticker-item",
    "wistia_embed",
  ],
  ids: [
    "Hero",
    "FAQ-Section",
    "Studies",
    "Pricing",
    "our-process",
    "work",
    "before-and-after",
    "a2TransformWrap",
    "a2FailLayer",
    "a2ScrollHint",
    "a2ContinueChevron",
    "a2StickyLead",
    "a2-prod-replica",
  ],
};
const meta = {
  built: new Date().toISOString(),
  source: "scripts/build-snapshot.mjs",
  notes:
    "Claude Design: please preserve every class/id in `hooks`. They drive interactions (FAQ accordion, case study tabs, sticky scroll, pricing toggle, hamburger nav, Wistia players). Anything else (colors, fonts, spacing, gradients, glow, layout within a section) is fair game.",
  hooks,
};
const metaScript = `<script id="a2-snapshot-meta" type="application/json">\n${JSON.stringify(meta, null, 2)}\n</script>`;

// ─── Compose full HTML ────────────────────────────────────────────────
const buildHtml = (body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${headJson.title}</title>
<meta name="description" content="${headJson.description.replace(/"/g, "&quot;")}">
<meta property="og:title" content="${(headJson.ogTitle || "").replace(/"/g, "&quot;")}">
<meta property="og:description" content="${(headJson.ogDescription || "").replace(/"/g, "&quot;")}">
${headJson.ogImage ? `<meta property="og:image" content="${headJson.ogImage}">` : ""}
<meta name="twitter:card" content="${headJson.twitterCard || "summary_large_image"}">
<link rel="icon" href="${favDataUri}">
<style>${fontFaces}</style>
<style>${css}</style>
</head>
<body class="${headJson.bodyClass || ""}">
${metaScript}
${body}
</body>
</html>`;

// Full snapshot — keeps scripts so the file behaves like the live site
const fullHtml = buildHtml(bodyInlined);
const outFull = path.join(OUT_DIR, "a2media-snapshot.html");
fs.writeFileSync(outFull, fullHtml);

// Structure-only fallback — strips every <script> tag for visual design only
const bodyStructureOnly = bodyInlined.replace(/<script[\s\S]*?<\/script>/g, "");
const structureHtml = buildHtml(bodyStructureOnly);
const outStructure = path.join(OUT_DIR, "a2media-snapshot-structure.html");
fs.writeFileSync(outStructure, structureHtml);

const sizeFull = fs.statSync(outFull).size;
const sizeStructure = fs.statSync(outStructure).size;
console.log(`✓ ${path.relative(ROOT, outFull)}: ${(sizeFull / 1024).toFixed(0)} KB`);
console.log(`✓ ${path.relative(ROOT, outStructure)}: ${(sizeStructure / 1024).toFixed(0)} KB`);
console.log(`✓ analytics scripts stripped: ${stripped}`);
console.log(`✓ snapshot-meta hooks: ${hooks.classes.length} classes, ${hooks.ids.length} ids`);
console.log(`\nDrop a2media-snapshot.html into Claude Design first.`);
console.log(`If it bounces as too large, use a2media-snapshot-structure.html.`);
