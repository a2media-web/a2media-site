import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve(".review/responsive");
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1280, height: 900 },
];

const browser = await chromium.launch();
for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 1.5,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  // Detect horizontal overflow
  const overflow = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      windowInnerWidth: window.innerWidth,
      overflowX: document.body.scrollWidth - window.innerWidth,
    };
  });

  const out = path.join(OUT, `_${v.name}.png`);
  await page.screenshot({ path: out, fullPage: true });
  console.log(`✅ ${v.name} ${v.width}x${v.height} → overflow: ${overflow.overflowX}px → ${out}`);
  await ctx.close();
}
await browser.close();
