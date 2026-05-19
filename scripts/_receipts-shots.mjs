import { chromium } from "playwright";
import fs from "node:fs";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "laptop-1024",  width: 1024, height: 768 },
  { name: "tablet-768",   width: 768,  height: 1024 },
  { name: "mobile-390",   width: 390,  height: 844 },
  { name: "mobile-360",   width: 360,  height: 780 },
];

const OUT = "/tmp/receipts-shots";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() =>
    document.querySelector("#before-and-after")?.scrollIntoView({ behavior: "instant", block: "center" }),
  );
  // wait for the printer animation to finish (~4s)
  await page.waitForTimeout(4500);
  const sec = page.locator("#before-and-after");
  await sec.screenshot({ path: `${OUT}/${v.name}.png` });
  console.log("shot:", `${OUT}/${v.name}.png`);
  await ctx.close();
}
await browser.close();
