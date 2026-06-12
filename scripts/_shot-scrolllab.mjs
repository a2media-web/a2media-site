import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const out = '.review/inspo';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1.5 });
try {
  await p.goto('https://thescrolllab.com/', { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(2500);
  // try to jump to plans
  await p.evaluate(() => { const el = document.querySelector('#plans'); if (el) el.scrollIntoView(); });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/scrolllab-plans.png` });
  // also grab a full-ish page in two more shots
  await p.evaluate(() => window.scrollTo(0,0));
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/scrolllab-top.png` });
  console.log('scrolllab done');
} catch (e) { console.log('scrolllab err', e.message); }
await b.close();
