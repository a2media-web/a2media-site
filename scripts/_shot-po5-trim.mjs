import { chromium } from "playwright";

const url = "http://localhost:3000/mockups/pricing-options-5";
const out = "./.review/pricing-options-5";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1180, height: 1400 },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "networkidle" });

// Expand all three "What's included" toggles inside #v30
const headers = await page.$$("#v30 button");
for (const h of headers) {
  await h.click();
  await page.waitForTimeout(120);
}
await page.waitForTimeout(400);

const section = await page.$("#v30");
await section.screenshot({ path: `${out}/v30-trim-open.png` });

await browser.close();
console.log("done");
