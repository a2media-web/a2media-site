import StoryScrollV1Clean from "@/components/sections/StoryScrollV1Clean";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header style={hdr}>
        <Link href="/transitions/c-1-1" style={navLink}>→ C-1-1</Link>
        <Link href="/transitions/c-1-3" style={navLink}>→ C-1-3</Link>
        <Link href="/transitions/c-1" style={navLink}>← original C-1</Link>
        <div style={{ marginTop: 12 }}>
          <span style={tag}>Option 2</span>
        </div>
        <h1 style={title}>Drop the morph — heading-only sticky</h1>
        <p style={sub}>
          Sticky scroll only handles Without Video → With Video heading + a
          subtle &quot;keep scrolling&quot; cue. No cards inside the sticky.
          Below: cards appear ONCE in the panel area as the section header.
          Cleanest, simplest, no risk of duplication.
        </p>
      </header>
      <StoryScrollV1Clean />
    </>
  );
}

const hdr: React.CSSProperties = { background: "#000", color: "#fff", padding: "32px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" };
const tag: React.CSSProperties = { display: "inline-block", padding: "4px 12px", background: "rgba(90, 51, 255, 0.18)", border: "1px solid rgba(90, 51, 255, 0.45)", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a33ff", marginBottom: "10px" };
const title: React.CSSProperties = { fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 };
const sub: React.CSSProperties = { fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "8px auto 0", maxWidth: "640px", lineHeight: 1.5 };
const navLink: React.CSSProperties = { display: "inline-block", margin: "0 4px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a33ff", border: "1px solid rgba(90, 51, 255, 0.4)", borderRadius: "999px" };
