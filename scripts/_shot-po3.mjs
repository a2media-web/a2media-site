import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const out = '.review/pricing-options-3';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1360, height: 900 }, deviceScaleFactor: 2 });
const resp = await p.goto('http://localhost:3000/mockups/pricing-options-3', { waitUntil: 'networkidle', timeout: 60000 });
console.log('status', resp.status());
await p.waitForTimeout(1400);
for (const id of ['v18','v19','v20','v21','v22']) {
  const el = await p.$('#' + id);
  if (!el) { console.log('MISSING', id); continue; }
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(350);
  await el.screenshot({ path: `${out}/${id}.png` });
  console.log('shot', id);
}
await b.close(); console.log('done');
