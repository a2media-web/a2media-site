"use client";

/* Disqualifier · Variant 06 — The Roster
   8 slots. 7 booked. 1 pulsing open. Hard capacity cap visualized.
   Psych hook: scarcity made literal. You see the cap. */

import React from "react";

export default function Disq6Roster() {
  const slots = Array.from({ length: 8 }, (_, i) => i);
  return (
    <section style={S.shell}>
      <style>{`@keyframes d6pulse{0%,100%{box-shadow:0 0 0 0 rgba(102,247,142,0.55)}50%{box-shadow:0 0 0 16px rgba(102,247,142,0)}}`}</style>
      <div style={S.inner}>
        <span style={S.eyebrow}>Our roster</span>
        <h2 style={S.h2}>
          We work with 8 clients.{" "}
          <span style={S.accent}>We have 1 spot.</span>
        </h2>
        <p style={S.lede}>
          Hard cap. When the roster fills, intake closes until a slot opens.
          The next opening lands in October.
        </p>
        <div style={S.grid}>
          {slots.map((i) => {
            const open = i === 7;
            return (
              <div key={i} style={open ? S.slotOpen : S.slotFilled}>
                <span style={open ? S.openTag : S.bookedTag}>
                  {open ? "Open · Q4" : "Booked"}
                </span>
              </div>
            );
          })}
        </div>
        <a href="#" style={S.cta}>
          See if you fit the 1 spot <span aria-hidden>→</span>
        </a>
        <p style={S.fineprint}>
          Average client tenure: 18 months. Spots rarely move.
        </p>
      </div>
    </section>
  );
}

const S = {
  shell: { background: "#0d0536", color: "#fff", padding: "clamp(72px,9vw,128px) 24px", fontFamily: "var(--a2-sans)" } as React.CSSProperties,
  inner: { maxWidth: 980, margin: "0 auto", textAlign: "center" } as React.CSSProperties,
  eyebrow: { display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a33ff", marginBottom: 18 } as React.CSSProperties,
  h2: { fontSize: "clamp(34px,4.6vw,54px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" } as React.CSSProperties,
  accent: { fontFamily: "var(--a2-display)", fontStyle: "italic", fontWeight: 500, color: "#5a33ff" } as React.CSSProperties,
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.6 } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, maxWidth: 720, margin: "0 auto 44px" } as React.CSSProperties,
  slotFilled: { aspectRatio: "1.4 / 1", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg,rgba(90,51,255,0.22),rgba(90,51,255,0.06))", border: "1px solid rgba(90,51,255,0.35)" } as React.CSSProperties,
  slotOpen: { aspectRatio: "1.4 / 1", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(102,247,142,0.05)", border: "2px dashed rgba(102,247,142,0.55)", animation: "d6pulse 1.9s ease-in-out infinite" } as React.CSSProperties,
  openTag: { fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#66f78e" } as React.CSSProperties,
  bookedTag: { fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" } as React.CSSProperties,
  cta: { display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 34px", background: "#5a33ff", color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 999, textDecoration: "none", boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.45)" } as React.CSSProperties,
  fineprint: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 22 } as React.CSSProperties,
};
