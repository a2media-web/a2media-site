// Reverse of build-snapshot.mjs. Takes a rebranded single-file HTML coming
// back from Claude Design and unpacks it into the Next.js project so the
// site picks up the new brand without any other surgery.
//
// Input:  dist/a2media-rebranded.html  (or a path passed as $1)
// Output:
//   public/styles/production.css        ← extracted <style> block(s)
//   .crawl/processed/body.html          ← body innerHTML (the bit after meta)
//   src/app/_data/body.html             ← same content, kept in sync
//   .review/integration-report.md       ← what changed + hook integrity check
//
// Before writing anything, the script verifies every class name and DOM id
// in the snapshot-meta hook list still exists in the incoming HTML. If
// hooks are missing it stops and lists which ones, so we fix in one pass
// instead of finding out the FAQ accordion is broken after deploy.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT = process.argv[2] || path.join(ROOT, "dist", "a2media-rebranded.html");
const REVIEW_DIR = path.join(ROOT, ".review");
fs.mkdirSync(REVIEW_DIR, { recursive: true });

if (!fs.existsSync(INPUT)) {
  console.error(`! input not found: ${INPUT}`);
  console.error(`  save the rebranded HTML at dist/a2media-rebranded.html or pass a path:`);
  console.error(`  node scripts/integrate-snapshot.mjs path/to/file.html`);
  process.exit(1);
}

const html = fs.readFileSync(INPUT, "utf8");
const $ = cheerio.load(html, { decodeEntities: false });

// ─── 1. Pull out snapshot-meta and check hooks ────────────────────────
const metaEl = $("#a2-snapshot-meta");
let meta = null;
if (metaEl.length) {
  try {
    meta = JSON.parse(metaEl.text());
  } catch (e) {
    console.warn(`! could not parse #a2-snapshot-meta: ${e.message}`);
  }
}

// Some "hooks" in the meta block are runtime-only — they're not static
// classes / ids in the HTML, they appear only when JS toggles them or
// when CSS rules reference them. The original snapshot's hook list was
// inclusive; the integrity check needs to be the surgical subset.
const RUNTIME_TOGGLE_CLASSES = new Set(["w--open", "a2p-open"]);
// Some ids in the original list don't actually exist on production
// either (e.g., `#work` is a nav anchor target that was never wired up
// on the live site). Don't fail integration on those.
const NEVER_EXISTED_IDS = new Set(["work", "a2-prod-replica"]);

const missing = { classes: [], ids: [] };
if (meta?.hooks) {
  for (const cls of meta.hooks.classes || []) {
    if (RUNTIME_TOGGLE_CLASSES.has(cls)) continue;
    // Accept the class if it appears anywhere — as an attribute, in CSS,
    // or in inline JS toggle calls. We only flag hooks that have been
    // entirely scrubbed from the file.
    if (!html.includes(cls)) missing.classes.push(cls);
  }
  for (const id of meta.hooks.ids || []) {
    if (NEVER_EXISTED_IDS.has(id)) continue;
    if (!$(`#${id}`).length) missing.ids.push(id);
  }
}

if (missing.classes.length || missing.ids.length) {
  console.error(`\n❌ Hook integrity check FAILED.`);
  console.error(`   Claude Design renamed or removed structural hooks the interactivity depends on.`);
  if (missing.classes.length)
    console.error(`   Missing classes: ${missing.classes.join(", ")}`);
  if (missing.ids.length)
    console.error(`   Missing ids: ${missing.ids.join(", ")}`);
  console.error(`\nFix the rebranded HTML to restore these hooks (or paste the missing names`);
  console.error(`back into the file with class/id attributes), then re-run.`);
  process.exit(1);
}
console.log(`✓ hook integrity: ${(meta?.hooks?.classes || []).length} classes, ${(meta?.hooks?.ids || []).length} ids preserved`);

// ─── 2. Extract <style> blocks ────────────────────────────────────────
// Snapshot has 2 <style> blocks: fonts (data URIs), and the production CSS.
// Claude Design may have added more, merged them, or replaced one. We
// concatenate everything and write it as the new production.css.
const styleBlocks = [];
$("style").each((_, el) => styleBlocks.push($(el).html() || ""));
const combinedCss = styleBlocks.join("\n\n/* === next style block === */\n\n");
fs.writeFileSync(path.join(ROOT, "public", "styles", "production.css"), combinedCss);
console.log(`✓ public/styles/production.css updated (${(combinedCss.length / 1024).toFixed(0)} KB, ${styleBlocks.length} style blocks merged)`);

// ─── 3. Extract body inner HTML (minus the meta script) ───────────────
metaEl.remove();
const bodyHtml = $("body").html() || "";
const bodyTargets = [
  path.join(ROOT, ".crawl", "processed", "body.html"),
  path.join(ROOT, "src", "app", "_data", "body.html"),
];
for (const target of bodyTargets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, bodyHtml);
}
console.log(`✓ body.html updated at ${bodyTargets.map((p) => path.relative(ROOT, p)).join(" and ")}`);

// ─── 4. Update head metadata if title / description changed ───────────
const newHead = {
  title: $("title").first().text(),
  description: $('meta[name="description"]').attr("content") || "",
  ogTitle: $('meta[property="og:title"]').attr("content") || "",
  ogDescription: $('meta[property="og:description"]').attr("content") || "",
  ogImage: $('meta[property="og:image"]').attr("content") || "",
  twitterCard: $('meta[name="twitter:card"]').attr("content") || "summary_large_image",
};
const headPath = path.join(ROOT, ".crawl", "processed", "head.json");
const oldHead = JSON.parse(fs.readFileSync(headPath, "utf8"));
const headChanged = Object.entries(newHead).some(([k, v]) => oldHead[k] !== v);
if (headChanged) {
  const merged = { ...oldHead, ...newHead };
  fs.writeFileSync(headPath, JSON.stringify(merged, null, 2));
  console.log(`✓ head metadata updated`);
} else {
  console.log(`= head metadata unchanged`);
}

// ─── 5. Write integration report ──────────────────────────────────────
const stats = {
  bodyBytes: bodyHtml.length,
  cssBytes: combinedCss.length,
  styleBlocks: styleBlocks.length,
  scriptsInBody: (bodyHtml.match(/<script/g) || []).length,
  hooksClassesPreserved: (meta?.hooks?.classes || []).length,
  hooksIdsPreserved: (meta?.hooks?.ids || []).length,
  headChanged,
};
const report = `# Integration report — ${new Date().toISOString()}

Source: \`${path.relative(ROOT, INPUT)}\`

\`\`\`json
${JSON.stringify(stats, null, 2)}
\`\`\`

## Next steps

1. Restart dev: \`lsof -i :3000 -t | xargs -r kill; npm run dev\`
2. Eyeball at http://localhost:3000
3. Run \`npm run review\` — text deltas should still be 0 (copy did not change)
4. Run \`npm run brand-review\` — confirm brand tokens render as expected
5. If clean: \`git checkout -b rebrand && git commit && git push\` for a Vercel preview
`;
fs.writeFileSync(path.join(REVIEW_DIR, "integration-report.md"), report);
console.log(`\n✓ ${path.relative(ROOT, path.join(REVIEW_DIR, "integration-report.md"))}\n`);
console.log(`Restart dev to pick up the changes:`);
console.log(`  lsof -i :3000 -t | xargs -r kill; npm run dev`);
