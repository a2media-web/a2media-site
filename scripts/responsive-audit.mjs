import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve(".review/responsive/sections");
fs.mkdirSync(OUT, { recursive: true });

const NAMES = [
  "Nav",
  "Hero",
  "Pain",
  "Guide",
  "LogoStrip",
  "Receipts",
  "ScrubReel",
  "StickyCurtain",
  "Process",
  "Editors",
  "ComparisonTable",
  "ClientTestimonials",
  "Pricing",
  "CustomProjects",
  "Guarantee",
  "FAQ",
  "FinalCTA",
  "TrailingTestimonial",
  "Footer",
];

const VIEWPORT = { width: 390, height: 844 };
const issues = [];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

await page.evaluate(async () => {
  const step = 400;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(800);

const sections = await page.evaluate(() => {
  const all = Array.from(document.body.children).filter((el) => {
    const tag = el.tagName.toLowerCase();
    if (["script", "style", "noscript"].includes(tag)) return false;
    const r = el.getBoundingClientRect();
    if (r.height < 20) return false;
    return true;
  });
  return all.map((el) => {
    const r = el.getBoundingClientRect();
    return {
      top: r.top + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
      height: r.height,
      tag: el.tagName.toLowerCase(),
    };
  });
});

for (let i = 0; i < Math.min(NAMES.length, sections.length); i++) {
  const name = NAMES[i];
  const num = String(i + 1).padStart(2, "0");
  const s = sections[i];

  // Hide nav for non-Nav captures
  await page.evaluate((isNav) => {
    const nav = document.body.children[0];
    if (nav && nav.tagName.toLowerCase() === "header") {
      nav.style.visibility = isNav ? "visible" : "hidden";
    }
  }, name === "Nav");

  await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 4)), s.top);
  await page.waitForTimeout(300);

  // Detect issues per section
  const sectionIssues = await page.evaluate(
    ({ idx, viewportW }) => {
      const el = Array.from(document.body.children).filter((el) => {
        const tag = el.tagName.toLowerCase();
        if (["script", "style", "noscript"].includes(tag)) return false;
        const r = el.getBoundingClientRect();
        if (r.height < 20) return false;
        return true;
      })[idx];
      if (!el) return [];

      const probs = [];
      const r = el.getBoundingClientRect();
      if (r.width > viewportW + 1)
        probs.push(`section width ${r.width}px > viewport ${viewportW}px`);

      // Find any descendant overflowing horizontally
      const all = el.querySelectorAll("*");
      for (const node of all) {
        const nr = node.getBoundingClientRect();
        if (nr.width > viewportW + 1 && nr.width > 0) {
          const nodeId =
            node.tagName.toLowerCase() +
            (node.className ? "." + String(node.className).slice(0, 40) : "");
          probs.push(`overflow: ${nodeId} = ${Math.round(nr.width)}px`);
          break; // one is enough per section
        }
      }

      // Tap targets <44px
      const interactive = el.querySelectorAll("a, button");
      let smallTaps = 0;
      for (const node of interactive) {
        const nr = node.getBoundingClientRect();
        if (nr.width > 0 && nr.height > 0 && (nr.height < 36 || nr.width < 36))
          smallTaps++;
      }
      if (smallTaps > 0) probs.push(`${smallTaps} tap target(s) <36px`);

      // Tiny font sizes
      const small = Array.from(all).filter((n) => {
        const fs = parseFloat(getComputedStyle(n).fontSize);
        return fs > 0 && fs < 12 && (n.textContent || "").trim().length > 3;
      });
      if (small.length > 0) probs.push(`${small.length} text node(s) <12px`);

      return probs;
    },
    { idx: i, viewportW: VIEWPORT.width },
  );

  const file = path.join(OUT, `${num}-${name}.png`);
  const live = await page.evaluate((idx) => {
    const all = Array.from(document.body.children).filter((el) => {
      const tag = el.tagName.toLowerCase();
      if (["script", "style", "noscript"].includes(tag)) return false;
      const r = el.getBoundingClientRect();
      if (r.height < 20) return false;
      return true;
    });
    const el = all[idx];
    const r = el.getBoundingClientRect();
    return {
      top: r.top + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
      height: r.height,
    };
  }, i);

  await page.screenshot({
    path: file,
    fullPage: true,
    clip: {
      x: Math.max(0, Math.floor(live.left)),
      y: Math.max(0, Math.floor(live.top)),
      width: Math.min(VIEWPORT.width, Math.ceil(live.width)),
      height: Math.min(2400, Math.ceil(live.height)),
    },
  });
  console.log(`${num} ${name}: ${sectionIssues.length === 0 ? "✓ clean" : sectionIssues.join("; ")}`);
  if (sectionIssues.length > 0) issues.push({ num, name, sectionIssues });
}

await browser.close();
fs.writeFileSync(
  path.join(OUT, "_summary.json"),
  JSON.stringify({ viewport: VIEWPORT, issues }, null, 2),
);
console.log(`\n${issues.length} sections with issues. Summary saved.`);
