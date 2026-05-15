import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(".review/section-shots");
fs.mkdirSync(OUT, { recursive: true });

const NAMES = [
  "Nav",
  "Hero",
  "Pain",
  "Guide",
  "LogoStrip",
  "Receipts",
  "VideoHybrid",
  "TransformSticky",
  "CaseStudies",
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

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Slow scroll to load lazy assets
await page.evaluate(async () => {
  const step = 400;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
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
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" && r.width < 200) return false;
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
      id: el.id || null,
    };
  });
});

console.log(`found ${sections.length} sections`);

for (let i = 0; i < Math.min(NAMES.length, sections.length); i++) {
  const name = NAMES[i];
  const num = String(i + 1).padStart(2, "0");
  const s = sections[i];

  // Hide the fixed Nav for every non-Nav capture so it doesn't overlay
  // the section being shot. Restore at end of loop.
  await page.evaluate((isNav) => {
    const nav = document.body.children[0];
    if (nav && nav.tagName.toLowerCase() === "header") {
      nav.style.visibility = isNav ? "visible" : "hidden";
    }
  }, name === "Nav");

  // Scroll the section to be in viewport (top of section at y=0)
  await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 4)), s.top);
  await page.waitForTimeout(250);

  // Re-measure since fixed elements / lazy content may shift on scroll
  const live = await page.evaluate((idx) => {
    const all = Array.from(document.body.children).filter((el) => {
      const tag = el.tagName.toLowerCase();
      if (["script", "style", "noscript"].includes(tag)) return false;
      const r = el.getBoundingClientRect();
      if (r.height < 20) return false;
      const cs = getComputedStyle(el);
      if (cs.position === "fixed" && r.width < 200) return false;
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

  const clip = {
    x: Math.max(0, Math.floor(live.left)),
    y: Math.max(0, Math.floor(live.top)),
    width: Math.min(1280 - Math.max(0, Math.floor(live.left)), Math.ceil(live.width)),
    height: Math.ceil(live.height),
  };

  const file = path.join(OUT, `${num}-${name}.png`);
  await page.screenshot({ path: file, clip, fullPage: true });
  console.log(`✅ ${num} ${name} (${clip.width}×${clip.height})`);
}

await browser.close();
console.log("done");
