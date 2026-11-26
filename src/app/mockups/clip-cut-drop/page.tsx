/* MOCKUP · /mockups/clip-cut-drop
   Three "Drop to the Floor" styles to choose from. Same copy; cut frames
   fade to transparent as they fall, slow loop every 10s, no scissors.
   The chosen one goes live below the Pain section. Not wired in yet. */

import DropClips from "./DropClips";

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
          Drop to the Floor · pick a style
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.62)", maxWidth: 620, margin: "0 auto" }}>
          Same copy on all three. Frames fade to transparent as they fall, the loop is slow, and it
          re-cuts every 10 seconds. Scroll to each and give it a few seconds.
        </p>
      </header>
      <DropClips />
    </main>
  );
}
