"use client";

/* LinkedIn banner re-imagine — 5 POW options.
   Every banner is locked to 1584 × 396 (LinkedIn personal-profile banner).
   Rendered with container-query units (cqw) so proportions stay EXACT at any
   display scale. All on-brand: Night Core bg, Electric Purple leading,
   Galano-forward, Awesome Serif Italic only for accents. No cream.

   Profile-photo safe zone: on a personal banner the photo covers roughly the
   bottom-left ~18% width. A dashed guide marks it; keep critical content clear. */

import React from "react";

const NIGHT = "#0D0536";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const TEAL = "#28DFE8";
const NEON = "#66F78E";

// Real logos the site already uses — white-filtered for the dark banner
const LOGOS = [
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/65e9e913df3011054a62442e_Okta_Logo_White_Medium.png", alt: "Okta", scale: 1 },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/64cc83f851512b1224dc1573_SHOP_BIG.D-bc80c1f3.png", alt: "Shopify", scale: 1 },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f1d717fe36ab2b51b4d2a4_chili%20piper.png", alt: "Chili Piper", scale: 1 },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/66c5f4f2fcc977d035928abc_CB.svg", alt: "Crossbeam", scale: 1.05 },
  { src: "/logos/Slate.png", alt: "Slate", scale: 1 },
];

function TrustStrip({ max = 5, note = "+ 40 more" }: { max?: number; note?: string }) {
  return (
    <div className="lb-trust">
      <span className="lb-trust-label">Trusted by</span>
      {LOGOS.slice(0, max).map((l) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={l.alt} src={l.src} alt={l.alt} className="lb-logo" style={{ transform: `scale(${l.scale})` }} />
      ))}
      <span className="lb-trust-note">{note}</span>
    </div>
  );
}

/* ---------- 1. Hero echo ---------- */
function B1() {
  return (
    <div className="lb lb1">
      <div className="lb-glow lb-glow-r" />
      <span className="lb-url">WWW.A2MEDIA.CA</span>
      <div className="lb1-stack">
        <div className="lb1-l1">Going viral is cool.</div>
        <div className="lb1-l2">Making money is <span className="teal">cooler.</span></div>
      </div>
    </div>
  );
}

/* ---------- 2. Outcome claim ---------- */
function B2() {
  return (
    <div className="lb lb2">
      <div className="lb-glow lb-glow-r" />
      <span className="lb-url">WWW.A2MEDIA.CA</span>
      <div className="lb2-head">
        Your videos should be<br />
        <span className="purple">closing deals.</span>
      </div>
      <div className="lb2-trust"><TrustStrip max={5} note="+ 40 more" /></div>
    </div>
  );
}

/* ---------- 3. Proof number ---------- */
function B3() {
  return (
    <div className="lb lb3">
      <div className="lb-glow lb-glow-c" />
      <span className="lb-url">WWW.A2MEDIA.CA</span>
      <div className="lb3-wrap">
        <div className="lb3-num">$600K+</div>
        <div className="lb3-cap">
          in pipeline, <span className="serif">from video.</span>
          <div className="lb3-sub">A2 Media · Content That Converts</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. Brand confidence ---------- */
function B4() {
  return (
    <div className="lb lb4">
      <div className="lb-glow lb-glow-full" />
      <div className="lb4-center">
        <div className="lb4-mark">A2 MEDIA</div>
        <div className="lb4-tag"><span className="serif">Content That Converts.</span></div>
        <div className="lb4-url">WWW.A2MEDIA.CA</div>
      </div>
    </div>
  );
}

/* ---------- 5. Trust-led ---------- */
function B5() {
  return (
    <div className="lb lb5">
      <div className="lb-glow lb-glow-r" />
      <span className="lb-url">WWW.A2MEDIA.CA</span>
      <div className="lb5-head">
        The video team behind<br />
        <span className="teal">Okta, Shopify + 40 more.</span>
      </div>
      <div className="lb5-logos">
        {LOGOS.map((l) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={l.alt} src={l.src} alt={l.alt} className="lb-logo" style={{ transform: `scale(${l.scale})` }} />
        ))}
      </div>
    </div>
  );
}

function Frame({ n, title, note, children, showSafe = true }: { n: number; title: string; note: string; children: React.ReactNode; showSafe?: boolean }) {
  return (
    <section className="frame">
      <div className="frame-head">
        <span className="frame-num">OPTION {n}</span>
        <span className="frame-title">{title}</span>
        <span className="frame-dim">1584 × 396</span>
      </div>
      <p className="frame-note">{note}</p>
      <div className="banner-outer">
        {children}
        {showSafe && <div className="safe-zone" aria-hidden title="Profile photo safe zone" />}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <style>{CSS}</style>
      <header className="pg-head">
        <p className="pg-eyebrow">Mockup · LinkedIn banner re-imagine</p>
        <h1 className="pg-title">5 POW options · <span className="teal">locked 1584 × 396</span></h1>
        <p className="pg-lede">
          All on-brand (Night Core dark, Electric Purple, Galano). The dashed
          circle marks the profile-photo safe zone — critical content stays
          clear of it. Each strips the old banner&apos;s text way down.
        </p>
      </header>

      <Frame n={1} title="Hero echo" note="Mirrors the live site hero. 'cooler' in teal. Zero body copy. Maximum brevity = maximum POW. Best if the banner should feel like a continuation of the site.">
        <B1 />
      </Frame>
      <Frame n={2} title="Outcome claim" note="The proven message, cut to the bone. Drops the long sub entirely, keeps one tight trust strip. 'closing deals' in Electric Purple. Classic + confident.">
        <B2 />
      </Frame>
      <Frame n={3} title="Proof number" note="Leads with the number. '$600K+' is the first thing the eye hits. Proof-first — strongest for a cold audience who doesn't know A2 yet.">
        <B3 />
      </Frame>
      <Frame n={4} title="Brand confidence" note="Almost no words. Big wordmark + tagline in Awesome Serif Italic. The POW is the restraint — says 'we don't need to explain ourselves.'">
        <B4 />
      </Frame>
      <Frame n={5} title="Trust-led" note="Names the marquee clients IN the headline. Social proof is the hook. Logos as the supporting beat. Best if Okta/Shopify recognition does your selling.">
        <B5 />
      </Frame>
    </main>
  );
}

const CSS = `
  main { background: #07021F; min-height: 100vh; font-family: var(--a2-sans, system-ui); color: #fff; padding-bottom: 100px; }
  .teal { color: ${TEAL}; }
  .purple { color: ${PURPLE}; }
  .serif { font-family: var(--a2-display, Georgia, serif); font-style: italic; font-weight: 500; }

  .pg-head { text-align: center; padding: 48px 32px 36px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .pg-eyebrow { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: ${LILAC}; font-weight: 800; margin: 0; }
  .pg-title { font-size: 30px; font-weight: 800; margin: 10px 0 12px; letter-spacing: -0.02em; }
  .pg-lede { font-size: 14px; color: rgba(255,255,255,0.72); max-width: 720px; margin: 0 auto; line-height: 1.55; }

  .frame { padding: 44px 32px 8px; border-bottom: 1px solid rgba(255,255,255,0.06); max-width: 1680px; margin: 0 auto; }
  .frame-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
  .frame-num { padding: 5px 12px; background: rgba(102,247,142,0.12); border: 1px solid ${NEON}55; border-radius: 999px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.18em; color: ${NEON}; }
  .frame-title { font-size: 15px; font-weight: 700; }
  .frame-dim { margin-left: auto; font-family: ui-monospace, Menlo, monospace; font-size: 11.5px; color: rgba(255,255,255,0.45); letter-spacing: 0.04em; border: 1px solid rgba(255,255,255,0.14); border-radius: 6px; padding: 3px 8px; }
  .frame-note { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; margin: 0 0 16px; max-width: 900px; }

  /* The banner canvas — locked aspect, exact proportions via cqw */
  .banner-outer { position: relative; width: 100%; max-width: 1584px; aspect-ratio: 1584 / 396; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
  .lb { container-type: inline-size; position: absolute; inset: 0; background: ${NIGHT}; overflow: hidden; }

  .safe-zone { position: absolute; left: 2.3%; bottom: -18%; width: 10%; aspect-ratio: 1; border: 2px dashed rgba(255,255,255,0.28); border-radius: 50%; pointer-events: none; }

  .lb-glow { position: absolute; pointer-events: none; filter: blur(40cqw); }
  .lb-glow-r { width: 60cqw; height: 60cqw; right: -10cqw; top: -20cqw; background: radial-gradient(circle, rgba(90,51,255,0.55), transparent 65%); }
  .lb-glow-c { width: 70cqw; height: 70cqw; left: 15cqw; top: -25cqw; background: radial-gradient(circle, rgba(90,51,255,0.4), transparent 65%); }
  .lb-glow-full { width: 100cqw; height: 80cqw; left: 20cqw; top: -20cqw; background: radial-gradient(circle, rgba(90,51,255,0.45), rgba(40,223,232,0.12) 40%, transparent 70%); }

  .lb-url { position: absolute; top: 5.5cqw; right: 3cqw; font-size: 1.15cqw; font-weight: 700; letter-spacing: 0.22em; color: ${LILAC}; }

  .lb-logo { height: 2.4cqw; width: auto; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.9; }
  .lb-trust { display: flex; align-items: center; gap: 3cqw; }
  .lb-trust-label { font-size: 1cqw; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
  .lb-trust-note { font-family: var(--a2-display, Georgia, serif); font-style: italic; font-size: 1.3cqw; color: rgba(255,255,255,0.55); }

  /* 1 — Hero echo */
  .lb1-stack { position: absolute; right: 3cqw; top: 50%; transform: translateY(-50%); text-align: right; }
  .lb1-l1 { font-size: 5.4cqw; font-weight: 800; line-height: 1.02; letter-spacing: -0.02em; color: #fff; }
  .lb1-l2 { font-size: 5.4cqw; font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; color: #fff; }

  /* 2 — Outcome claim */
  .lb2-head { position: absolute; right: 3cqw; top: 26%; text-align: right; font-size: 5.2cqw; font-weight: 800; line-height: 1.04; letter-spacing: -0.02em; color: #fff; }
  .lb2-trust { position: absolute; right: 3cqw; bottom: 7%; }

  /* 3 — Proof number */
  .lb3-wrap { position: absolute; right: 3cqw; top: 50%; transform: translateY(-50%); display: flex; align-items: center; gap: 2.5cqw; }
  .lb3-num { font-size: 10cqw; font-weight: 900; line-height: 0.9; letter-spacing: -0.03em; color: ${PURPLE}; text-shadow: 0 0 6cqw rgba(90,51,255,0.5); }
  .lb3-cap { font-size: 3.4cqw; font-weight: 700; line-height: 1.1; color: #fff; }
  .lb3-sub { font-size: 1.15cqw; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-top: 1cqw; }

  /* 4 — Brand confidence */
  .lb4-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1cqw; }
  .lb4-mark { font-size: 8cqw; font-weight: 900; letter-spacing: 0.02em; color: #fff; line-height: 1; }
  .lb4-tag { font-size: 3cqw; color: ${TEAL}; line-height: 1; }
  .lb4-url { font-size: 1.1cqw; font-weight: 700; letter-spacing: 0.22em; color: rgba(255,255,255,0.55); margin-top: 1.4cqw; }

  /* 5 — Trust-led */
  .lb5-head { position: absolute; right: 3cqw; top: 22%; text-align: right; font-size: 4.3cqw; font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; color: #fff; }
  .lb5-logos { position: absolute; right: 3cqw; bottom: 9%; display: flex; align-items: center; gap: 3cqw; }
`;
