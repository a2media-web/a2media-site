"use client";

/* Disqualifier · Variant 10 — The Anti-CTA
   "Don't click this" button. 4-checkbox self-disqualifier. CTA only
   unlocks when all 4 are checked.
   Psych hook: reverse psychology + behavioral commitment. */

import React, { useMemo, useState } from "react";

const CHECKS = [
  "We are above $2M ARR.",
  "We have a B2B SaaS product, not B2C or services.",
  "We have a marketing team that can act on strategy.",
  "We treat content as pipeline, not awareness.",
];

export default function Disq10AntiCTA() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const allYes = useMemo(() => checked.every(Boolean), [checked]);

  return (
    <section style={S.shell}>
      <div style={S.inner}>
        <span style={S.eyebrow}>Before you book</span>
        <h2 style={S.h2}>
          Most readers should <span style={S.accent}>not</span> click this button.
        </h2>
        <p style={S.lede}>
          Check the boxes that are true for your company. The button unlocks
          if all four are true.
        </p>

        <div style={S.checkBox}>
          {CHECKS.map((c, i) => (
            <label key={i} style={S.checkRow}>
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={(e) =>
                  setChecked((prev) => prev.map((v, j) => (j === i ? e.target.checked : v)))
                }
                style={S.checkInput}
              />
              <span style={{ ...S.checkText, color: checked[i] ? "#fff" : "rgba(255,255,255,0.65)" }}>
                {c}
              </span>
            </label>
          ))}
        </div>

        <div style={S.ctaBox}>
          <button
            type="button"
            disabled={!allYes}
            style={allYes ? S.ctaActive : S.ctaLocked}
          >
            {allYes ? "Book a discovery call →" : "Locked. 4 of 4 needed."}
          </button>
          <p style={S.ctaSub}>
            {allYes
              ? "OK. You cleared the bar. We will not waste the call."
              : `${checked.filter(Boolean).length} of 4 . the rest of the call would be us saying no.`}
          </p>
        </div>

        <p style={S.fineprint}>
          If you do not clear all 4, we will politely pass on the call.
          Save us both 30 minutes.
        </p>
      </div>
    </section>
  );
}

const S = {
  shell: { background: "#0d0536", color: "#fff", padding: "clamp(72px,9vw,128px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 760, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  eyebrow: { display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a33ff", marginBottom: 18 } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" } as React.CSSProperties,
  accent: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5a33ff" } as React.CSSProperties,
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 540, margin: "0 auto 44px", lineHeight: 1.6 } as React.CSSProperties,
  checkBox: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "20px 26px", textAlign: "left", marginBottom: 32 } as React.CSSProperties,
  checkRow: { display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" } as React.CSSProperties,
  checkInput: { width: 18, height: 18, marginTop: 2, accentColor: "#5a33ff", cursor: "pointer", flexShrink: 0 } as React.CSSProperties,
  checkText: { fontSize: 15.5, lineHeight: 1.5, transition: "color 180ms" } as React.CSSProperties,
  ctaBox: { marginBottom: 22 } as React.CSSProperties,
  ctaLocked: { padding: "18px 34px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", fontSize: 16, fontWeight: 600, borderRadius: 999, border: "1px dashed rgba(255,255,255,0.15)", cursor: "not-allowed" } as React.CSSProperties,
  ctaActive: { padding: "18px 34px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, border: "none", cursor: "pointer", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.55), 0 0 60px rgba(90,51,255,0.35)" } as React.CSSProperties,
  ctaSub: { fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 14, lineHeight: 1.5 } as React.CSSProperties,
  fineprint: { fontSize: 13, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto", lineHeight: 1.55 } as React.CSSProperties,
};
