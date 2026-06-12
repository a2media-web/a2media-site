import { chromium } from 'playwright';
const url = 'http://localhost:3000/mockups/pricing-options';
const out = '.review/pricing-options';
import { mkdirSync } from 'fs';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
const resp = await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
console.log('status', resp.status());
await p.waitForTimeout(1200);
for (const id of ['v1','v2','v3','v4']) {
  const el = await p.$('#' + id);
  if (!el) { console.log('MISSING', id); continue; }
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await el.screenshot({ path: `${out}/${id}.png` });
  console.log('shot', id);
}
await b.close();
console.log('done');
