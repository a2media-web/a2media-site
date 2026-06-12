import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const url = 'http://localhost:3000/mockups/pricing-options-2';
const out = '.review/pricing-options-2';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1320, height: 900 }, deviceScaleFactor: 2 });
const resp = await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
console.log('status', resp.status());
await p.waitForTimeout(1400);
for (const id of ['v16','v17']) {
  const el = await p.$('#' + id);
  if (!el) { console.log('MISSING', id); continue; }
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(350);
  await el.screenshot({ path: `${out}/${id}.png` });
  console.log('shot', id);
}
await b.close();
console.log('done');
