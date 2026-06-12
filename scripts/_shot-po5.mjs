import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const out = '.review/pricing-options-5';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1320, height: 900 }, deviceScaleFactor: 2 });
const resp = await p.goto('http://localhost:3000/mockups/pricing-options-5', { waitUntil: 'networkidle', timeout: 60000 });
console.log('status', resp.status());
await p.waitForTimeout(1400);
for (const id of ['v28','v29','v30']) {
  const el = await p.$('#' + id);
  if (!el) { console.log('MISSING', id); continue; }
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  await el.screenshot({ path: `${out}/${id}.png` });
  console.log('shot', id);
}
// expanded view of v28: click all "What's included" buttons inside it
const btns = await p.$$('#v28 button');
for (const btn of btns) { await btn.click(); await p.waitForTimeout(150); }
await p.waitForTimeout(700);
const v28 = await p.$('#v28');
await v28.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
await v28.screenshot({ path: `${out}/v28-open.png` });
console.log('shot v28-open');
await b.close(); console.log('done');
