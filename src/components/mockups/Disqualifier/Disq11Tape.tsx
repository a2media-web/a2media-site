"use client";

/* Disqualifier · Variant 11 — The Interview Tape
   3 anonymized rejection transcripts. Specific dates, real reasons.
   Psych hook: receipts > claims. Specificity is undeniable. */

import React from "react";

const TAPES = [
  {
    date: "APR 28, 2026",
    company: "Series A fintech, US",
    reason:
      "They wanted 4 thumbnails a week. We do not do thumbnails. Passed.",
  },
  {
    date: "APR 19, 2026",
    company: "Bootstrapped B2B SaaS, EU",
    reason:
      "Founder wanted to film himself on his phone. We are an editing shop, not a film crew. Passed.",
  },
  {
    date: "APR 11, 2026",
    company: "Mid-market agency, Canada",
    reason:
      "They wanted us to white-label. We only work direct with the brand. Passed.",
  },
];

export default function Disq11Tape() {
  return (
    <section style={S.shell}>
      <div style={S.inner}>
        <span style={S.eyebrow}>Recent passes</span>
        <h2 style={S.h2}>
          We turned these down in the <span style={S.accent}>last 30 days.</span>
        </h2>
        <p style={S.lede}>
          Three of the passes from April. Anonymized. The reasons are verbatim.
        </p>

        <div style={S.grid}>
          {TAPES.map((t, i) => (
            <div key={i} style={S.card}>
              <div style={S.cardTop}>
                <span style={S.passTag}>PASS</span>
                <span style={S.date}>{t.date}</span>
              </div>
              <div style={S.company}>{t.company}</div>
              <p style={S.reason}>“{t.reason}”</p>
              <div style={S.cardFoot}>
                <span style={S.transcript}>· transcript ·</span>
              </div>
            </div>
          ))}
        </div>

        <p style={S.kicker}>
          We log every pass. If your fit is unclear, this is how we decide.
        </p>
        <a href="#" style={S.cta}>
          Test your fit on a call <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

const S = {
  shell: { background: "#0d0536", color: "#fff", padding: "clamp(72px,9vw,128px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 1080, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  eyebrow: { display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a33ff", marginBottom: 18 } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" } as React.CSSProperties,
  accent: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5a33ff" } as React.CSSProperties,
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 52px", lineHeight: 1.6 } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, textAlign: "left", marginBottom: 36 } as React.CSSProperties,
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px 26px 22px", position: "relative" } as React.CSSProperties,
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } as React.CSSProperties,
  passTag: { fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", color: "#ff5e7a", padding: "4px 10px", border: "1px solid rgba(255,94,122,0.4)", borderRadius: 4 } as React.CSSProperties,
  date: { fontSize: 11.5, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" } as React.CSSProperties,
  company: { fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 } as React.CSSProperties,
  reason: { fontSize: 16.5, lineHeight: 1.55, color: "#fff", margin: "0 0 22px", fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 400 } as React.CSSProperties,
  cardFoot: { borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12, textAlign: "center" } as React.CSSProperties,
  transcript: { fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" } as React.CSSProperties,
  kicker: { fontSize: 16, color: "rgba(255,255,255,0.78)", maxWidth: 600, margin: "0 auto 26px", lineHeight: 1.55 } as React.CSSProperties,
  cta: { display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 34px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.45)" } as React.CSSProperties,
};
