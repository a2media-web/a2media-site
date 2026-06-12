"use client";

/* Disqualifier · Variant 07 — The Waitlist
   6-month calendar booked out. Email signup for the next opening.
   Psych hook: time-based scarcity. Premium agencies have wait times. */

import React, { useState } from "react";

const MONTHS = [
  { m: "MAY", state: "Full" },
  { m: "JUN", state: "Full" },
  { m: "JUL", state: "Full" },
  { m: "AUG", state: "Full" },
  { m: "SEP", state: "Full" },
  { m: "OCT", state: "1 spot" },
];

export default function Disq7Waitlist() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section style={S.shell}>
      <div style={S.inner}>
        <span style={S.eyebrow}>Intake calendar</span>
        <h2 style={S.h2}>
          We open intake when a client <span style={S.accent}>cycles out.</span>
        </h2>
        <p style={S.lede}>
          The next opening lands in October. There is one spot.
        </p>
        <div style={S.grid}>
          {MONTHS.map((m) => {
            const open = m.state !== "Full";
            return (
              <div key={m.m} style={open ? S.cardOpen : S.cardFull}>
                <div style={open ? S.monthOpen : S.monthFull}>{m.m}</div>
                <div style={open ? S.stateOpen : S.stateFull}>{m.state}</div>
              </div>
            );
          })}
        </div>
        <div style={S.formBox}>
          <p style={S.formLabel}>Get notified when October opens.</p>
          {sent ? (
            <p style={S.sent}>
              ✓ You are on the list. We email when intake opens.
            </p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              style={S.form}
            >
              <input
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={S.input}
              />
              <button type="submit" style={S.btn}>Join waitlist</button>
            </form>
          )}
          <p style={S.fineprint}>
            We do not list a public calendar. We list a queue.
          </p>
        </div>
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
  lede: { fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto 52px", lineHeight: 1.6 } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, maxWidth: 820, margin: "0 auto 48px" } as React.CSSProperties,
  cardFull: { padding: "26px 14px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" } as React.CSSProperties,
  cardOpen: { padding: "26px 14px", borderRadius: 14, background: "linear-gradient(160deg,rgba(90,51,255,0.28),rgba(90,51,255,0.06))", border: "1px solid rgba(90,51,255,0.55)", textAlign: "center", boxShadow: "0 0 40px rgba(90,51,255,0.3)" } as React.CSSProperties,
  monthFull: { fontSize: 14, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", marginBottom: 8 } as React.CSSProperties,
  monthOpen: { fontSize: 14, fontWeight: 700, letterSpacing: "0.18em", color: "#fff", marginBottom: 8 } as React.CSSProperties,
  stateFull: { fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" } as React.CSSProperties,
  stateOpen: { fontSize: 13, fontWeight: 700, color: "#66f78e", letterSpacing: "0.04em" } as React.CSSProperties,
  formBox: { maxWidth: 480, margin: "0 auto", padding: "26px 28px", borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" } as React.CSSProperties,
  formLabel: { fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 14, fontWeight: 600 } as React.CSSProperties,
  form: { display: "flex", gap: 8 } as React.CSSProperties,
  input: { flex: 1, padding: "13px 16px", borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 14, outline: "none" } as React.CSSProperties,
  btn: { padding: "13px 22px", borderRadius: 999, background: "#5a33ff", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" } as React.CSSProperties,
  sent: { fontSize: 14, color: "#66f78e", margin: 0 } as React.CSSProperties,
  fineprint: { fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 16 } as React.CSSProperties,
};
