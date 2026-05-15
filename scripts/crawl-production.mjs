// Crawl https://www.a2media.ca/ as the single source of truth for what is on
// production. Records ONLY elements that are actually visible to a real visitor.
// Hidden elements (display:none, visibility:hidden, opacity:0 after IX2 settle,
// hidden attr, aria-hidden=true) are dropped and logged in skipped-{vp}.json so
// you can audit what was excluded.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CRAWL_DIR = path.join(ROOT, ".crawl");
const TARGET = "https://www.a2media.ca/";
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

for (const sub of ["screenshots", "dom", "text", "meta", "inventory", "skipped", "css"]) {
  fs.mkdirSync(path.join(CRAWL_DIR, sub), { recursive: true });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchText(new URL(res.headers.location, url).toString()));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

const browser = await chromium.launch();
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
});

let firstStylesheets = null;

for (const vp of VIEWPORTS) {
  const page = await context.newPage();
  await page.setViewportSize({ width: vp.width, height: vp.height });

  console.log(`\n→ ${vp.name} (${vp.width}x${vp.height}) loading ${TARGET}`);
  await page.goto(TARGET, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);

  // Trigger every Webflow IX2 scroll-into-view animation by walking down the page.
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    const step = Math.max(200, window.innerHeight / 2);
    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });

  const harvest = await page.evaluate(() => {
    const cssPath = (el) => {
      const parts = [];
      let cur = el;
      while (cur && cur.nodeType === 1 && parts.length < 6) {
        let s = cur.tagName.toLowerCase();
        if (cur.id) {
          parts.unshift(`${s}#${cur.id}`);
          break;
        }
        if (typeof cur.className === "string" && cur.className.trim()) {
          const cls = cur.className.trim().split(/\s+/).slice(0, 2).join(".");
          if (cls) s += `.${cls}`;
        }
        parts.unshift(s);
        cur = cur.parentElement;
      }
      return parts.join(" > ");
    };

    const hideReason = (el) => {
      if (!(el instanceof Element)) return "non-element";
      if (el.hasAttribute("hidden")) return "hidden-attr";
      if (el.getAttribute("aria-hidden") === "true") return "aria-hidden";
      let cur = el;
      while (cur instanceof Element) {
        const cs = window.getComputedStyle(cur);
        if (cs.display === "none") return `display:none@${cur.tagName.toLowerCase()}`;
        if (cs.visibility === "hidden" || cs.visibility === "collapse")
          return `visibility:${cs.visibility}@${cur.tagName.toLowerCase()}`;
        if (parseFloat(cs.opacity) === 0) return `opacity:0@${cur.tagName.toLowerCase()}`;
        cur = cur.parentElement;
      }
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return "zero-size";
      return null;
    };

    const isVisible = (el) => hideReason(el) === null;

    const texts = [];
    const skipped = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent.replace(/\s+/g, " ").trim();
      if (!t) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(parent.tagName)) continue;
      const reason = hideReason(parent);
      const entry = { text: t, tag: parent.tagName.toLowerCase(), path: cssPath(parent) };
      if (reason) {
        entry.reason = reason;
        skipped.push(entry);
      } else {
        texts.push(entry);
      }
    }

    const seenAssets = new Set();
    const assets = [];
    document.querySelectorAll("img, video, source, iframe").forEach((el) => {
      if (!isVisible(el)) return;
      const url =
        el.currentSrc ||
        el.src ||
        el.getAttribute("src") ||
        el.getAttribute("poster") ||
        "";
      if (!url) return;
      const key = `${el.tagName}|${url}`;
      if (seenAssets.has(key)) return;
      seenAssets.add(key);
      assets.push({
        tag: el.tagName.toLowerCase(),
        url,
        alt: el.getAttribute("alt") || "",
        srcset: el.getAttribute("srcset") || "",
        path: cssPath(el),
      });
    });

    const links = [];
    document.querySelectorAll("a[href]").forEach((el) => {
      if (!isVisible(el)) return;
      const href = el.getAttribute("href") || "";
      const text = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
      links.push({ href, text, path: cssPath(el) });
    });

    const meta = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
      ogDescription:
        document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "",
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content") || "",
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content") || "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
      favicon:
        document.querySelector('link[rel="icon"]')?.getAttribute("href") ||
        document.querySelector('link[rel="shortcut icon"]')?.getAttribute("href") ||
        "",
      lang: document.documentElement.getAttribute("lang") || "",
      htmlClass: document.documentElement.className,
      bodyClass: document.body.className,
    };

    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(
      (l) => l.href,
    );
    const inlineCss = Array.from(document.querySelectorAll("style"))
      .map((s) => s.textContent || "")
      .join("\n\n/* --- next inline style block --- */\n\n");

    return { texts, skipped, assets, links, meta, stylesheets, inlineCss };
  });

  // Stylesheet content via fetch (one viewport's worth is enough — CSS doesn't
  // change per viewport on this site)
  if (!firstStylesheets) {
    firstStylesheets = harvest.stylesheets;
    let combined = "";
    for (const href of harvest.stylesheets) {
      try {
        const css = await fetchText(href);
        combined += `\n\n/* === SOURCE: ${href} === */\n${css}`;
      } catch (e) {
        combined += `\n\n/* === FAILED ${href}: ${e.message} === */\n`;
      }
    }
    if (harvest.inlineCss) {
      combined += `\n\n/* === INLINE <style> blocks === */\n${harvest.inlineCss}`;
    }
    fs.writeFileSync(path.join(CRAWL_DIR, "css", "production.css"), combined);
  }

  const html = await page.content();
  fs.writeFileSync(path.join(CRAWL_DIR, "dom", `${vp.name}.html`), html);
  fs.writeFileSync(
    path.join(CRAWL_DIR, "text", `${vp.name}.json`),
    JSON.stringify(harvest.texts, null, 2),
  );
  fs.writeFileSync(
    path.join(CRAWL_DIR, "meta", `${vp.name}.json`),
    JSON.stringify(harvest.meta, null, 2),
  );
  fs.writeFileSync(
    path.join(CRAWL_DIR, "inventory", `${vp.name}.json`),
    JSON.stringify(
      { assets: harvest.assets, links: harvest.links, stylesheets: harvest.stylesheets },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(CRAWL_DIR, "skipped", `${vp.name}.json`),
    JSON.stringify(harvest.skipped, null, 2),
  );

  await page.screenshot({
    path: path.join(CRAWL_DIR, "screenshots", `${vp.name}.png`),
    fullPage: true,
    animations: "disabled",
  });

  const skippedSample = harvest.skipped.slice(0, 5).map((s) => `   • [${s.reason}] ${s.text.slice(0, 70)}`).join("\n");
  console.log(
    `   visible texts: ${harvest.texts.length}  | skipped (hidden): ${harvest.skipped.length}  | assets: ${harvest.assets.length}  | links: ${harvest.links.length}`,
  );
  if (skippedSample) console.log(`   sample skipped:\n${skippedSample}`);
  await page.close();
}

await browser.close();
console.log(`\n✓ Crawl complete → ${path.relative(ROOT, CRAWL_DIR)}/`);
