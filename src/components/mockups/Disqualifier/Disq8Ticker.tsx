"use client";

/* Disqualifier · Variant 08 — Live Rejection Ticker
   Big counter + auto-scrolling vertical ticker of recent rejections.
   Psych hook: motion + dated specifics read as credible, not curated. */

import React, { useEffect, useState } from "react";

const REJECTIONS = [
  { date: "MAY 14", reason: "Pre-seed, no marketing team yet" },
  { date: "MAY 09", reason: "B2C ecommerce, wrong fit" },
  { date: "MAY 02", reason: "Sub $500K ARR, retainer math does not work" },
  { date: "APR 28", reason: "Wanted 4 thumbnails a week. We do not do thumbnails" },
  { date: "APR 19", reason: "Founder wanted to film on his phone. We edit, we do not film" },
  { date: "APR 11", reason: "Agency wanted us to white-label. We work direct only" },
  { date: "APR 03", reason: "Asked for 30-day pilot. We run 3 month minimums" },
  { date: "MAR 28", reason: "Wanted us to manage paid spend. Out of scope" },
  { date: "MAR 21", reason: "Single founder, no buyer to talk to" },
  { date: "MAR 14", reason: "Crypto. Not our sector" },
];

export default function Disq8Ticker() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset((o) => (o + 1) % REJECTIONS.length), 2200);
    return () => clearInterval(id);
  }, []);
  // duplicate the list for seamless wrap
  const list = [...REJECTIONS, ...REJECTIONS];
  return (
    <section style={S.shell}>
      <style>{`@keyframes d8live{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
      <div style={S.inner}>
        <span style={S.eyebrow}>Intake receipts</span>
        <div style={S.numberRow}>
          <span style={S.bigNum}>47</span>
          <div style={S.numberMeta}>
            <div style={S.numberLabel}>Rejected this year</div>
            <div style={S.live}>
              <span style={S.dot} /> Live . updated weekly
            </div>
          </div>
        </div>
        <p style={S.lede}>
          Receipts, not theater. Every pass we made in the last 8 weeks,
          dated, with the reason.
        </p>
        <div style={S.tickerBox}>
          <div style={S.fadeTop} />
          <div
            style={{
              ...S.tickerInner,
              transform: `translateY(-${offset * 54}px)`,
            }}
          >
            {list.map((r, i) => (
              <div key={i} style={S.row}>
                <span style={S.tag}>REJECTED</span>
                <span style={S.date}>{r.date}</span>
                <span style={S.reason}>{r.reason}</span>
              </div>
            ))}
          </div>
          <div style={S.fadeBottom} />
        </div>
        <a href="#" style={S.cta}>
          See if you make it past the filter <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

const S = {
  shell: { background: "#0d0536", color: "#fff", padding: "clamp(72px,9vw,128px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 920, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  eyebrow: { display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a33ff", marginBottom: 18 } as React.CSSProperties,
  numberRow: { display: "inline-flex", alignItems: "center", gap: 22, marginBottom: 18 } as React.CSSProperties,
  bigNum: { fontSize: "clamp(96px,14vw,180px)", fontWeight: 700, lineHeight: 0.9, color: "#fff", letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" } as React.CSSProperties,
  numberMeta: { textAlign: "left", display: "flex", flexDirection: "column", gap: 8 } as React.CSSProperties,
  numberLabel: { fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)" } as React.CSSProperties,
  live: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#66f78e" } as React.CSSProperties,
  dot: { width: 8, height: 8, borderRadius: 999, background: "#66f78e", animation: "d8live 1.4s ease-in-out infinite" } as React.CSSProperties,
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.6 } as React.CSSProperties,
  tickerBox: { position: "relative", maxWidth: 760, margin: "0 auto 36px", height: 216, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", textAlign: "left" } as React.CSSProperties,
  tickerInner: { transition: "transform 600ms cubic-bezier(0.22,0.61,0.36,1)" } as React.CSSProperties,
  row: { display: "grid", gridTemplateColumns: "92px 64px 1fr", alignItems: "center", gap: 18, padding: "16px 24px", height: 54, borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" } as React.CSSProperties,
  tag: { fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", color: "#ff5e7a", padding: "4px 8px", border: "1px solid rgba(255,94,122,0.35)", borderRadius: 4, textAlign: "center" } as React.CSSProperties,
  date: { fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" } as React.CSSProperties,
  reason: { fontSize: 13.5, color: "rgba(255,255,255,0.85)" } as React.CSSProperties,
  fadeTop: { position: "absolute", top: 0, left: 0, right: 0, height: 40, background: "linear-gradient(180deg,#0d0536,transparent)", pointerEvents: "none", zIndex: 2 } as React.CSSProperties,
  fadeBottom: { position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(0deg,#0d0536,transparent)", pointerEvents: "none", zIndex: 2 } as React.CSSProperties,
  cta: { display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 34px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.45)" } as React.CSSProperties,
};
