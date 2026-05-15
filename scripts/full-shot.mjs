import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT_DIR = path.resolve(".review/section-shots");
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT = path.join(OUT_DIR, "_full-site.png");

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1.5,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Slow scroll to load lazy assets, then back to top
await page.evaluate(async () => {
  const step = 600;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(800);

await page.screenshot({ path: OUT, fullPage: true });
await browser.close();
console.log("full site →", OUT);
