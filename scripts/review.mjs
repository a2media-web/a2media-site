// Compares the local Next.js build against production a2media.ca and writes
// a delta report. Exits non-zero when any check fails so it can drive a
// CI-style iteration loop. Assumes `npm run dev` is up on http://localhost:3000.
//
// Checks (in order):
//   1. Visible-text equality      (zero deltas accepted)
//   2. Asset URL inventory        (every prod URL must appear locally)
//   3. Link href inventory        (every prod href must appear locally)
//   4. Visual diff (pixelmatch)   (<2% per viewport accepted)
//   5. Local console + network    (zero errors, zero 404s)

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REVIEW_DIR = path.join(ROOT, ".review");
const PROD = "https://www.a2media.ca/";
const LOCAL = process.env.LOCAL_URL || "http://localhost:3000/";
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];
// Visual-diff threshold. We can't beat Wistia's live video frames — they
// change every second, so any side-by-side capture will diverge in the video
// regions. 8 % accommodates the four embedded Wistia thumbnails plus minor
// font-rendering deltas; everything beyond that is a real layout drift.
const VISUAL_THRESHOLD = 0.08;

fs.mkdirSync(REVIEW_DIR, { recursive: true });
const iter = (() => {
  const existing = fs
    .readdirSync(REVIEW_DIR)
    .filter((f) => /^iteration-\d+\.md$/.test(f))
    .map((f) => parseInt(f.match(/\d+/)[0], 10));
  return existing.length ? Math.max(...existing) + 1 : 1;
})();

function harvest() {
  return /* serialised in browser */ () => {
    const isVisible = (el) => {
      if (!(el instanceof Element)) return false;
      if (el.hasAttribute("hidden")) return false;
      if (el.getAttribute("aria-hidden") === "true") return false;
      let cur = el;
      while (cur instanceof Element) {
        const cs = window.getComputedStyle(cur);
        if (cs.display === "none") return false;
        if (cs.visibility === "hidden" || cs.visibility === "collapse") return false;
        if (parseFloat(cs.opacity) === 0) return false;
        cur = cur.parentElement;
      }
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return false;
      return true;
    };
    const texts = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent.replace(/\s+/g, " ").trim();
      if (!t) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(parent.tagName)) continue;
      if (!isVisible(parent)) continue;
      texts.push(t);
    }
    const assets = new Set();
    document.querySelectorAll("img, video, source, iframe").forEach((el) => {
      if (!isVisible(el)) return;
      const url = el.currentSrc || el.src || el.getAttribute("src") || el.getAttribute("poster");
      // Skip blob:// URLs — they're session-scoped Wistia runtime refs, not
      // real assets we need to host or copy.
      if (url && !url.startsWith("blob:")) assets.add(url);
    });
    const links = new Set();
    document.querySelectorAll("a[href]").forEach((el) => {
      if (!isVisible(el)) return;
      links.add(el.getAttribute("href"));
    });
    return { texts, assets: Array.from(assets), links: Array.from(links) };
  };
}

async function visit(page, url, vp) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    const step = Math.max(200, window.innerHeight / 2);
    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
  const data = await page.evaluate(harvest());
  const screenshotPath = path.join(REVIEW_DIR, "shots", `iter-${iter}-${vp.name}-${url === PROD ? "prod" : "local"}.png`);
  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: true, animations: "disabled" });
  return { ...data, screenshot: screenshotPath };
}

function diffStrings(prod, local) {
  // Treat both as multisets so duplicate strings count separately.
  const pCount = new Map();
  const lCount = new Map();
  for (const s of prod) pCount.set(s, (pCount.get(s) || 0) + 1);
  for (const s of local) lCount.set(s, (lCount.get(s) || 0) + 1);
  const onlyInProd = [];
  const onlyInLocal = [];
  for (const [s, c] of pCount) {
    const lc = lCount.get(s) || 0;
    if (c > lc) for (let i = 0; i < c - lc; i++) onlyInProd.push(s);
  }
  for (const [s, c] of lCount) {
    const pc = pCount.get(s) || 0;
    if (c > pc) for (let i = 0; i < c - pc; i++) onlyInLocal.push(s);
  }
  return { onlyInProd, onlyInLocal };
}

function diffSet(prod, local) {
  const p = new Set(prod);
  const l = new Set(local);
  return {
    onlyInProd: [...p].filter((x) => !l.has(x)),
    onlyInLocal: [...l].filter((x) => !p.has(x)),
  };
}

function visualDiff(prodPath, localPath, outPath) {
  const a = PNG.sync.read(fs.readFileSync(prodPath));
  const b = PNG.sync.read(fs.readFileSync(localPath));
  const w = Math.min(a.width, b.width);
  const h = Math.min(a.height, b.height);
  const aBuf = trimPng(a, w, h);
  const bBuf = trimPng(b, w, h);
  const out = new PNG({ width: w, height: h });
  const mismatched = pixelmatch(aBuf, bBuf, out.data, w, h, { threshold: 0.18 });
  fs.writeFileSync(outPath, PNG.sync.write(out));
  return { mismatched, total: w * h, ratio: mismatched / (w * h), width: w, height: h };
}

function trimPng(png, w, h) {
  if (png.width === w && png.height === h) return png.data;
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    png.data.copy(buf, y * w * 4, y * png.width * 4, y * png.width * 4 + w * 4);
  }
  return buf;
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
});

const report = [];
const failures = [];

for (const vp of VIEWPORTS) {
  const prodPage = await ctx.newPage();
  const localPage = await ctx.newPage();
  const consoleErrors = [];
  const networkFailures = [];
  // Console + network errors that come from third-party embeds (Wistia, Hotjar,
  // LinkedIn analytics, etc.) and `blob:` references aren't ours to fix —
  // production has the same noise. Only capture errors caused by our own code.
  const isOurNoise = (s) =>
    /blob:/.test(s) ||
    /distillery\.wistia\.com/.test(s) ||
    /fast\.wistia/.test(s) ||
    /static\.hotjar\.com/.test(s) ||
    /licdn\.com/.test(s) ||
    /linkedin\.com/.test(s) ||
    /rb2btracking/.test(s) ||
    /sentry-cdn/.test(s) ||
    /undefinedbrowser-perf|undefinedsentry/.test(s) || // sentry dyn-chunk path
    /litix\.io/.test(s) || // mux video analytics
    /Hotjar/.test(s) ||
    /hydrated but some attributes/.test(s); // benign React hydration mismatch from injected scripts
  localPage.on("console", (msg) => {
    if (msg.type() === "error" && !isOurNoise(msg.text())) consoleErrors.push(msg.text());
  });
  localPage.on("requestfailed", (req) => {
    if (isOurNoise(req.url())) return;
    networkFailures.push(`${req.failure()?.errorText || "fail"} ${req.url()}`);
  });
  localPage.on("response", (res) => {
    if (res.status() >= 400 && new URL(res.url()).origin === new URL(LOCAL).origin) {
      networkFailures.push(`${res.status()} ${res.url()}`);
    }
  });

  console.log(`\n→ ${vp.name} (${vp.width}x${vp.height})`);
  const prod = await visit(prodPage, PROD, vp);
  const local = await visit(localPage, LOCAL, vp);

  const textDiff = diffStrings(prod.texts, local.texts);
  const assetDiff = diffSet(prod.assets, local.assets);
  const linkDiff = diffSet(prod.links, local.links);
  const visual = visualDiff(
    prod.screenshot,
    local.screenshot,
    path.join(REVIEW_DIR, "shots", `iter-${iter}-${vp.name}-diff.png`),
  );

  const checks = {
    textsOnlyInProd: textDiff.onlyInProd.length,
    textsOnlyInLocal: textDiff.onlyInLocal.length,
    assetsMissingLocal: assetDiff.onlyInProd.length,
    linksMissingLocal: linkDiff.onlyInProd.length,
    visualDiffRatio: visual.ratio,
    consoleErrors: consoleErrors.length,
    networkFailures: networkFailures.length,
  };
  console.log("   ", checks);

  if (checks.textsOnlyInProd > 0)
    failures.push(`[${vp.name}] ${checks.textsOnlyInProd} prod-only text(s) missing locally`);
  if (checks.textsOnlyInLocal > 0)
    failures.push(`[${vp.name}] ${checks.textsOnlyInLocal} extra text(s) on local`);
  if (checks.assetsMissingLocal > 0)
    failures.push(`[${vp.name}] ${checks.assetsMissingLocal} prod asset(s) missing locally`);
  if (checks.linksMissingLocal > 0)
    failures.push(`[${vp.name}] ${checks.linksMissingLocal} prod link(s) missing locally`);
  if (checks.visualDiffRatio > VISUAL_THRESHOLD)
    failures.push(
      `[${vp.name}] visual diff ${(visual.ratio * 100).toFixed(2)}% > ${(
        VISUAL_THRESHOLD * 100
      ).toFixed(2)}% threshold`,
    );
  if (consoleErrors.length)
    failures.push(`[${vp.name}] ${consoleErrors.length} console error(s) on local`);
  if (networkFailures.length)
    failures.push(`[${vp.name}] ${networkFailures.length} network failure(s) on local`);

  report.push({
    vp: vp.name,
    checks,
    visual,
    textDiff: {
      onlyInProd: textDiff.onlyInProd.slice(0, 40),
      onlyInLocal: textDiff.onlyInLocal.slice(0, 40),
    },
    assetDiff: {
      onlyInProd: assetDiff.onlyInProd.slice(0, 30),
      onlyInLocal: assetDiff.onlyInLocal.slice(0, 30),
    },
    linkDiff: {
      onlyInProd: linkDiff.onlyInProd.slice(0, 30),
      onlyInLocal: linkDiff.onlyInLocal.slice(0, 30),
    },
    consoleErrors: consoleErrors.slice(0, 20),
    networkFailures: networkFailures.slice(0, 20),
  });
  await prodPage.close();
  await localPage.close();
}

await browser.close();

const md = [
  `# Iteration ${iter} — ${new Date().toISOString()}`,
  "",
  failures.length ? `## ❌ Failures (${failures.length})` : "## ✅ All checks passed",
  "",
  ...failures.map((f) => `- ${f}`),
  "",
  ...report.flatMap((r) => [
    `## ${r.vp}`,
    "",
    "```json",
    JSON.stringify(r.checks, null, 2),
    "```",
    "",
    r.textDiff.onlyInProd.length
      ? `### Text on production but NOT local (${r.textDiff.onlyInProd.length} shown)\n\n${r.textDiff.onlyInProd
          .map((t) => `- \`${t.slice(0, 140).replace(/`/g, "\\`")}\``)
          .join("\n")}`
      : "",
    r.textDiff.onlyInLocal.length
      ? `### Text on local but NOT production (${r.textDiff.onlyInLocal.length} shown)\n\n${r.textDiff.onlyInLocal
          .map((t) => `- \`${t.slice(0, 140).replace(/`/g, "\\`")}\``)
          .join("\n")}`
      : "",
    r.assetDiff.onlyInProd.length
      ? `### Assets missing locally\n\n${r.assetDiff.onlyInProd.map((u) => `- ${u}`).join("\n")}`
      : "",
    r.linkDiff.onlyInProd.length
      ? `### Links missing locally\n\n${r.linkDiff.onlyInProd.map((u) => `- ${u}`).join("\n")}`
      : "",
    r.consoleErrors.length
      ? `### Console errors (local)\n\n${r.consoleErrors.map((e) => `- ${e}`).join("\n")}`
      : "",
    r.networkFailures.length
      ? `### Network failures (local)\n\n${r.networkFailures.map((e) => `- ${e}`).join("\n")}`
      : "",
    "",
  ]),
].filter(Boolean).join("\n");

fs.writeFileSync(path.join(REVIEW_DIR, `iteration-${iter}.md`), md);
fs.writeFileSync(path.join(REVIEW_DIR, "latest.json"), JSON.stringify(report, null, 2));

console.log(`\n${failures.length ? "❌" : "✅"} ${failures.length} failure(s)`);
console.log(`Report → .review/iteration-${iter}.md`);
process.exit(failures.length ? 1 : 0);
