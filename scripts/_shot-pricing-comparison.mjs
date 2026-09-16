/* Two shots of the Pricing section:
   1. live a2media.ca (BEFORE)
   2. localhost:3000/mockups/pricing-with-starting-at (AFTER, new Engine display)

   Outputs to /private/tmp/... scratchpad so they can be opened & shared. */

import { chromium } from "playwright";

const OUT_DIR = "/private/tmp/claude-501/-Users-ademolaadelakun-Downloads-Claude-Code-Design-Agent/adaaaad0-ab83-4286-bfde-a1b7cc481d87/scratchpad";

const browser = await chromium.launch();

async function shootLive() {
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1200 },
    deviceScaleFactor: 2,
  });
  await page.goto("https://a2media.ca/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#Pricing", { timeout: 60000 });
  const section = await page.$("#Pricing");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  const out = `${OUT_DIR}/pricing-current-live.png`;
  await section.screenshot({ path: out });
  console.log(`wrote ${out}`);
  await page.close();
}

async function shootLocalMockup() {
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1200 },
    deviceScaleFactor: 2,
  });
  await page.goto("http://localhost:3010/mockups/pricing-with-starting-at", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#mockup-wrap", { timeout: 15000 });
  await page.waitForTimeout(800);
  const wrap = await page.$("#mockup-wrap");
  if (!wrap) {
    console.error("no #mockup-wrap");
    process.exit(1);
  }
  const out = `${OUT_DIR}/pricing-new-mockup.png`;
  await wrap.screenshot({ path: out });
  console.log(`wrote ${out}`);
  await page.close();
}

try {
  await shootLive();
  await shootLocalMockup();
} finally {
  await browser.close();
}
