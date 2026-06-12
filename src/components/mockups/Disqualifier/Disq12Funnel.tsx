"use client";

/* Disqualifier · Variant 12 — The Funnel
   213 → 84 → 17 → 6, bars shrinking visually.
   Psych hook: drop-off felt visually. Easier to *feel* than to *read*. */

import React from "react";

const STAGES = [
  { n: 213, label: "Inbound enquiries", sub: "YTD 2026", pct: 100 },
  { n: 84, label: "Discovery calls taken", sub: "39% of inbound", pct: 39 },
  { n: 17, label: "Proposals sent", sub: "8% of inbound", pct: 8 },
  { n: 6, label: "Engagements signed", sub: "3% of inbound", pct: 3 },
];

export default function Disq12Funnel() {
  return (
    <section style={S.shell}>
      <div style={S.inner}>
        <span style={S.eyebrow}>Intake 2026 YTD</span>
        <h2 style={S.h2}>
          What the funnel <span style={S.accent}>actually looks like.</span>
        </h2>
        <p style={S.lede}>
          Of 213 companies that reached out this year, 6 became clients. Not
          because we are picky. Because the bar is real.
        </p>

        <div style={S.chart}>
          {STAGES.map((s, i) => {
            const last = i === STAGES.length - 1;
            return (
              <div key={s.label} style={S.row}>
                <div style={S.rowLabel}>
                  <div style={S.rowLabelTop}>{s.label}</div>
                  <div style={S.rowLabelSub}>{s.sub}</div>
                </div>
                <div style={S.barTrack}>
                  <div
                    style={{
                      ...S.barFill,
                      width: `${s.pct}%`,
                      background: last
                        ? "linear-gradient(90deg,#5a33ff,#8f45ee)"
                        : "rgba(255,255,255,0.14)",
                      boxShadow: last ? "0 0 30px rgba(90,51,255,0.55)" : "none",
                    }}
                  >
                    <span style={last ? S.barNumLast : S.barNum}>{s.n}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={S.kicker}>
          Yes is a high bar. Both directions.
        </p>
        <a href="#" style={S.cta}>
          See if you make it past the 17 <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

const S = {
  shell: { background: "#0d0536", color: "#fff", padding: "clamp(72px,9vw,128px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 1040, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  eyebrow: { display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a33ff", marginBottom: 18 } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" } as React.CSSProperties,
  accent: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5a33ff" } as React.CSSProperties,
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 580, margin: "0 auto 56px", lineHeight: 1.6 } as React.CSSProperties,
  chart: { display: "flex", flexDirection: "column", gap: 20, marginBottom: 42, textAlign: "left" } as React.CSSProperties,
  row: { display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center", gap: 22 } as React.CSSProperties,
  rowLabel: { display: "flex", flexDirection: "column", gap: 4 } as React.CSSProperties,
  rowLabelTop: { fontSize: 14, fontWeight: 700, color: "#fff" } as React.CSSProperties,
  rowLabelSub: { fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" } as React.CSSProperties,
  barTrack: { height: 56, background: "rgba(255,255,255,0.04)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" } as React.CSSProperties,
  barFill: { height: "100%", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 18, transition: "width 600ms cubic-bezier(0.22,0.61,0.36,1)", minWidth: 60 } as React.CSSProperties,
  barNum: { fontSize: 22, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" } as React.CSSProperties,
  barNumLast: { fontSize: 26, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums", textShadow: "0 0 12px rgba(0,0,0,0.4)" } as React.CSSProperties,
  kicker: { fontSize: 18, color: "#fff", maxWidth: 600, margin: "0 auto 30px", lineHeight: 1.55, fontFamily: "var(--a2-display)", fontStyle: "italic" } as React.CSSProperties,
  cta: { display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 34px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.45)" } as React.CSSProperties,
};
