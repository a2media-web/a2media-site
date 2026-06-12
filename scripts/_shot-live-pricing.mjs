import { chromium } from "playwright";

const out = "./.review/pricing-options-5";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 1400 },
  deviceScaleFactor: 1,
});
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
await page.waitForSelector("#Pricing", { timeout: 60000 });

const section = await page.$("#Pricing");
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await section.screenshot({ path: `${out}/live-pricing-collapsed.png` });

// expand all three
const headers = await page.$$("#Pricing .collapse button, #Pricing button");
for (const h of headers) {
  try { await h.click(); await page.waitForTimeout(150); } catch {}
}
await page.waitForTimeout(500);
await section.screenshot({ path: `${out}/live-pricing-open.png` });

await browser.close();
console.log("done");
