import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve(".review/section-shots");
const SHOTS = [
  ["16", "Guarantee"],
  ["17", "FAQ"],
  ["18", "FinalCTA"],
  ["19", "TrailingTestimonial"],
  ["20", "Footer"],
];

const cards = SHOTS.map(([n, name]) => {
  const file = path.join(DIR, `${n}-${name}.png`);
  const data = fs.readFileSync(file).toString("base64");
  return { n, name, data };
});

const html = `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #1a1a1a; font-family: -apple-system, system-ui, sans-serif; }
  .row {
    display: flex;
    gap: 24px;
    padding: 32px;
    align-items: flex-start;
  }
  .card {
    flex: 0 0 auto;
    width: 380px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .label {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }
  .label span {
    color: #a855f7;
    margin-right: 8px;
    font-weight: 700;
  }
  .frame {
    background: #000;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0,0,0,0.45);
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
</style></head>
<body>
  <div class="row">
    ${cards.map(c => `
      <div class="card">
        <div class="label"><span>#${c.n}</span>${c.name}</div>
        <div class="frame"><img src="data:image/png;base64,${c.data}" /></div>
      </div>
    `).join("")}
  </div>
</body></html>`;

const tmp = path.resolve(".review/section-shots/_collage.html");
fs.writeFileSync(tmp, html);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 2080, height: 1200 }, deviceScaleFactor: 1.5 });
const page = await ctx.newPage();
await page.goto("file://" + tmp, { waitUntil: "load" });
await page.waitForTimeout(300);
const out = path.resolve(".review/section-shots/_collage.png");
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("collage saved →", out);
