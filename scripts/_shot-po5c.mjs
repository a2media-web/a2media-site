import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const out = '.review/pricing-options-5';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1320, height: 900 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3000/mockups/pricing-options-5', { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(1200);
let el = await p.$('#v30'); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
await el.screenshot({ path: `${out}/v30b.png` }); console.log('shot v30b');
const btns = await p.$$('#v30 button');
for (const btn of btns) { await btn.click(); await p.waitForTimeout(150); }
await p.waitForTimeout(700);
el = await p.$('#v30'); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
await el.screenshot({ path: `${out}/v30b-open.png` }); console.log('shot v30b-open');
await b.close(); console.log('done');
