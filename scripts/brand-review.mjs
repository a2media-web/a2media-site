// Verifies the A2 brand is actually rendered, not just present in CSS.
// Loads localhost:3000 headless and walks the rendered DOM to check:
//   - Night Core (#0a0a0a or close) is the dominant background
//   - Electric Purple (#a855f7) appears in hero / CTAs / headlines
//   - Galano Grotesque is the active font in body text
//   - Awesome Serif Italic shows up in at least one editorial moment
//   - No green + teal mix on the same page
//   - Logo is present in nav and footer
// Failures get written to .review/brand-iteration-N.md.
//
// Run AFTER `npm run dev` is up.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REVIEW_DIR = path.join(ROOT, ".review");
fs.mkdirSync(REVIEW_DIR, { recursive: true });
const URL = process.env.LOCAL_URL || "http://localhost:3000/";

const NIGHT_CORE = "#0a0a0a";
const ELECTRIC_PURPLE = "#a855f7";
const ELECTRIC_NEON = "#4ade80";
const CREAM = "#f5f0e8";

const iter = (() => {
  const files = fs
    .readdirSync(REVIEW_DIR)
    .filter((f) => /^brand-iteration-\d+\.md$/.test(f));
  return files.length ? Math.max(...files.map((f) => parseInt(f.match(/\d+/)[0], 10))) + 1 : 1;
})();

const hexToRgb = (hex) => {
  const v = parseInt(hex.replace("#", ""), 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
};
const colorClose = (rgbStr, hex, tolerance = 12) => {
  const m = rgbStr.match(/\d+/g);
  if (!m) return false;
  const t = hexToRgb(hex);
  return (
    Math.abs(parseInt(m[0]) - t.r) < tolerance &&
    Math.abs(parseInt(m[1]) - t.g) < tolerance &&
    Math.abs(parseInt(m[2]) - t.b) < tolerance
  );
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);

const audit = await page.evaluate(
  ({ NIGHT_CORE, ELECTRIC_PURPLE, ELECTRIC_NEON, CREAM }) => {
    const close = (rgb, hex, tol = 12) => {
      const m = rgb.match(/\d+/g);
      if (!m) return false;
      const v = parseInt(hex.replace("#", ""), 16);
      const r = (v >> 16) & 255,
        g = (v >> 8) & 255,
        b = v & 255;
      return Math.abs(+m[0] - r) < tol && Math.abs(+m[1] - g) < tol && Math.abs(+m[2] - b) < tol;
    };

    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
    const dominantBg = bodyBg && bodyBg !== "rgba(0, 0, 0, 0)" ? bodyBg : htmlBg;

    // Headlines: any <h1>, <h2> visible at top of page
    const headlines = Array.from(document.querySelectorAll("h1, h2"))
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })
      .slice(0, 12);
    const headlineColors = headlines.map((el) => window.getComputedStyle(el).color);
    // Brand rule 2 says Electric Purple "leads every asset" via headlines /
    // CTAs / primary emphasis. A common pattern is purple-painted emphasis
    // words inside an otherwise white headline (e.g., `<h1>Hire 9 People.
    // <span class="purple">Or Just Us.</span></h1>`). Check both the
    // headline element itself and any span / em / strong / b / i descendant.
    const headlineHasPurple = headlines.some((el) => {
      if (close(window.getComputedStyle(el).color, ELECTRIC_PURPLE, 30)) return true;
      const accents = el.querySelectorAll("span, em, strong, b, i");
      for (const child of accents) {
        if (close(window.getComputedStyle(child).color, ELECTRIC_PURPLE, 30)) return true;
      }
      return false;
    });

    // CTAs: anchors that look like buttons (have padding, background, text on dark, etc.)
    const ctas = Array.from(document.querySelectorAll('a[href^="#"], a[class*="btn"], button')).slice(
      0,
      40,
    );
    const ctaColors = ctas
      .map((el) => {
        const cs = window.getComputedStyle(el);
        return { bg: cs.backgroundColor, color: cs.color };
      })
      .filter((x) => x.bg && x.bg !== "rgba(0, 0, 0, 0)");
    const ctaHasPurple = ctaColors.some(
      (x) => close(x.bg, ELECTRIC_PURPLE, 40) || close(x.color, ELECTRIC_PURPLE, 40),
    );

    // Body font family
    const bodyFont = window.getComputedStyle(document.body).fontFamily;
    const galanoActive = /galano/i.test(bodyFont);

    // Awesome Serif somewhere on the page
    const allFonts = new Set();
    document.querySelectorAll("h1,h2,h3,h4,p,div,span").forEach((el) => {
      const f = window.getComputedStyle(el).fontFamily;
      if (f) allFonts.add(f);
    });
    const awesomeSerifActive = Array.from(allFonts).some((f) => /awesome serif/i.test(f));

    // Logo present in nav and footer
    const navLogo = !!document.querySelector(
      ".navbar img, .navbar svg, header img[alt*='A2'], header img[alt*='a2']",
    );
    const footerLogo = !!document.querySelector(
      "footer img, footer svg, [class*='footer'] img, [class*='footer'] svg",
    );

    // Green + teal cohabitation
    const colors = new Set();
    document.querySelectorAll("*").forEach((el) => {
      const cs = window.getComputedStyle(el);
      [cs.color, cs.backgroundColor, cs.borderColor].forEach((c) => {
        if (c && c.startsWith("rgb")) colors.add(c);
      });
    });
    const hasNeonGreen = Array.from(colors).some((c) => close(c, ELECTRIC_NEON, 25));
    const hasAquaTeal = Array.from(colors).some((c) => {
      const m = c.match(/\d+/g);
      if (!m) return false;
      const r = +m[0],
        g = +m[1],
        b = +m[2];
      return r < 80 && g > 180 && b > 180;
    });

    // Cream usage
    const hasCream = Array.from(colors).some((c) => close(c, CREAM, 15));

    // Dominant bg sample — pick a few large containers
    const bigBgs = Array.from(document.querySelectorAll("body, main, section, header, footer")).map(
      (el) => window.getComputedStyle(el).backgroundColor,
    );

    return {
      bodyBg,
      dominantBg,
      bigBgs: bigBgs.slice(0, 8),
      headlineColors: headlineColors.slice(0, 6),
      headlineHasPurple,
      ctaHasPurple,
      ctaColors: ctaColors.slice(0, 6),
      bodyFont,
      galanoActive,
      awesomeSerifActive,
      navLogo,
      footerLogo,
      hasNeonGreen,
      hasAquaTeal,
      hasCream,
    };
  },
  { NIGHT_CORE, ELECTRIC_PURPLE, ELECTRIC_NEON, CREAM },
);

await browser.close();

const failures = [];
const checks = [];
const record = (name, ok, detail = "") => {
  checks.push({ name, ok, detail });
  if (!ok) failures.push(`${name}${detail ? " — " + detail : ""}`);
};

record(
  "Night Core dominates body background",
  colorClose(audit.bodyBg, NIGHT_CORE, 25),
  `body bg = ${audit.bodyBg}`,
);
record(
  "Electric Purple appears in headlines",
  audit.headlineHasPurple,
  `headline colors: ${audit.headlineColors.join(", ")}`,
);
record(
  "Electric Purple appears in CTAs",
  audit.ctaHasPurple,
  `cta colors sample: ${JSON.stringify(audit.ctaColors).slice(0, 200)}`,
);
record("Galano Grotesque is active body font", audit.galanoActive, `body font = ${audit.bodyFont}`);
record("Awesome Serif appears at least once", audit.awesomeSerifActive);
record("Logo present in nav", audit.navLogo);
record("Logo present in footer", audit.footerLogo);
record(
  "Not mixing Electric Neon with Aqua Teal on same page",
  !(audit.hasNeonGreen && audit.hasAquaTeal),
  audit.hasNeonGreen && audit.hasAquaTeal ? "both detected" : "ok",
);

const md = [
  `# Brand review — iteration ${iter} — ${new Date().toISOString()}`,
  "",
  failures.length ? `## ❌ ${failures.length} failure(s)` : `## ✅ All brand checks passed`,
  "",
  ...failures.map((f) => `- ${f}`),
  "",
  "## Detail",
  "",
  "```json",
  JSON.stringify(audit, null, 2),
  "```",
  "",
  "## Checks",
  ...checks.map((c) => `- ${c.ok ? "✅" : "❌"} ${c.name}${c.detail ? " — " + c.detail.slice(0, 120) : ""}`),
].join("\n");

fs.writeFileSync(path.join(REVIEW_DIR, `brand-iteration-${iter}.md`), md);
console.log(`\n${failures.length ? "❌" : "✅"} ${failures.length} brand failure(s)`);
console.log(`Report → .review/brand-iteration-${iter}.md`);
process.exit(failures.length ? 1 : 0);
