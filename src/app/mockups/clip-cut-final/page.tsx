/* MOCKUP · /mockups/clip-cut-final
   Three Clip Cut treatments to choose from. Same copy on all three; each
   plays once on scroll-into-view, then re-cuts every 10s. The chosen one
   goes live below the Pain section. Not wired into the homepage yet. */

import ClipCuts from "./ClipCuts";

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
          Clip Cut · pick a treatment
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.62)", maxWidth: 620, margin: "0 auto" }}>
          Same copy on all three. Each plays its cut once when it scrolls into view, then re-cuts
          every 10 seconds. Scroll to each and watch it loop.
        </p>
      </header>
      <ClipCuts />
    </main>
  );
}
