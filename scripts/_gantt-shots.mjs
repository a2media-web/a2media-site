import { chromium } from "playwright";
import fs from "node:fs";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-768",   width: 768,  height: 1024 },
  { name: "mobile-390",   width: 390,  height: 844 },
];

const OUT = "/tmp/gantt-shots";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/mockups/process", { waitUntil: "domcontentloaded", timeout: 60000 });
  // Scroll to the Gantt section — Timeline Alt 1
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll("h1"));
    const target = headers.find((h) => h.textContent?.includes("Gantt"));
    target?.scrollIntoView({ behavior: "instant", block: "start" });
  });
  // wait for animation
  await page.waitForTimeout(5000);
  // capture a tall slice
  await page.screenshot({ path: `${OUT}/${v.name}.png`, fullPage: false });
  console.log("shot:", `${OUT}/${v.name}.png`);
  await ctx.close();
}
await browser.close();
