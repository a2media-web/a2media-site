/* MOCKUP · /mockups/clip-cut-tumble
   Final Tumble & Drift: cut frames turn gray + translucent right before they
   fall, then tumble away. Goes live below the Pain section once approved. */

import TumbleFinal from "./TumbleFinal";

export default function Page() {
  return (
    <main style={{ background: "#07021F" }}>
      <header
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "68px 24px 8px",
          textAlign: "center",
          color: "#fff",
          fontFamily: "var(--a2-sans)",
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8F45EE", margin: "0 0 12px" }}>
          Tumble &amp; Drift · final
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.62)", maxWidth: 620, margin: "0 auto" }}>
          Cut frames turn gray and translucent right before they tumble away. Slow loop, re-cuts
          every 10 seconds. Scroll down and give it a few seconds.
        </p>
      </header>
      <TumbleFinal />
    </main>
  );
}
