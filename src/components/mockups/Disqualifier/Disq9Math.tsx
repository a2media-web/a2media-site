"use client";

/* Disqualifier · Variant 09 — The Capacity Math
   Visualized equation reveals the 8-client cap as math, not selectivity.
   Psych hook: honest constraint > gatekeeping. Math reads true. */

import React from "react";

export default function Disq9Math() {
  return (
    <section style={S.shell}>
      <div style={S.inner}>
        <span style={S.eyebrow}>Why we say no a lot</span>
        <h2 style={S.h2}>
          It is not selectivity. <span style={S.accent}>It is math.</span>
        </h2>
        <p style={S.lede}>
          A senior editor can do real work for one client. Multiply across the
          team and the cap reveals itself.
        </p>

        <div style={S.equationBox}>
          {/* line 1 */}
          <div style={S.equationLine}>
            <Term big="10" label="editors" />
            <Op>×</Op>
            <Term big="30" label="hrs / week each" />
            <Op>=</Op>
            <Term big="300" label="production hours" highlight />
          </div>
          {/* line 2 */}
          <div style={S.equationLine}>
            <Term big="300" label="hrs / week" />
            <Op>÷</Op>
            <Term big="35" label="hrs avg per client" />
            <Op>=</Op>
            <Term big="≈8" label="active clients" highlight />
          </div>
          {/* total */}
          <div style={S.totalRow}>
            <span style={S.totalLabel}>The cap</span>
            <span style={S.totalBig}>8 active clients.</span>
          </div>
        </div>

        <p style={S.kicker}>
          Today we run at 8. Every yes costs another client their senior editor.
          That is why the answer is usually no.
        </p>
        <a href="#" style={S.cta}>
          See if you fit the 1 spot <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

function Term({ big, label, highlight }: { big: string; label: string; highlight?: boolean }) {
  return (
    <div style={S.term}>
      <div style={highlight ? S.termBigHi : S.termBig}>{big}</div>
      <div style={S.termLabel}>{label}</div>
    </div>
  );
}

function Op({ children }: { children: React.ReactNode }) {
  return <div style={S.op}>{children}</div>;
}

const S = {
  shell: { background: "#0d0536", color: "#fff", padding: "clamp(72px,9vw,128px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 960, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  eyebrow: { display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a33ff", marginBottom: 18 } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" } as React.CSSProperties,
  accent: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5a33ff" } as React.CSSProperties,
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.6 } as React.CSSProperties,
  equationBox: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: "44px 28px", margin: "0 0 36px" } as React.CSSProperties,
  equationLine: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: 36 } as React.CSSProperties,
  term: { display: "flex", flexDirection: "column", alignItems: "center", minWidth: 110 } as React.CSSProperties,
  termBig: { fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "#fff", lineHeight: 1, fontVariantNumeric: "tabular-nums" } as React.CSSProperties,
  termBigHi: { fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "#5a33ff", lineHeight: 1, fontVariantNumeric: "tabular-nums" } as React.CSSProperties,
  termLabel: { fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: 8 } as React.CSSProperties,
  op: { fontSize: 28, color: "rgba(255,255,255,0.45)", fontWeight: 500 } as React.CSSProperties,
  totalRow: { display: "flex", alignItems: "baseline", justifyContent: "center", gap: 18, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.14)" } as React.CSSProperties,
  totalLabel: { fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" } as React.CSSProperties,
  totalBig: { fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" } as React.CSSProperties,
  kicker: { fontSize: 16, color: "rgba(255,255,255,0.78)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.55 } as React.CSSProperties,
  cta: { display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 34px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.45)" } as React.CSSProperties,
};
