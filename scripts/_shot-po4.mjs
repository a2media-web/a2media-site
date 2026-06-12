import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const out = '.review/pricing-options-4';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1320, height: 900 }, deviceScaleFactor: 2 });
const resp = await p.goto('http://localhost:3000/mockups/pricing-options-4', { waitUntil: 'networkidle', timeout: 60000 });
console.log('status', resp.status());
await p.waitForTimeout(1400);
for (const id of ['v23','v24','v25','v26','v27']) {
  const el = await p.$('#' + id);
  if (!el) { console.log('MISSING', id); continue; }
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(350);
  await el.screenshot({ path: `${out}/${id}.png` });
  console.log('shot', id);
}
await b.close(); console.log('done');
