import { chromium } from "playwright";

const out = "./.review/pricing-options-5";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 1200 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/mockups/direction-banner", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(700);
const el = await page.$("main > div");
await el.screenshot({ path: `${out}/direction-banner.png` });
await browser.close();
console.log("done");
