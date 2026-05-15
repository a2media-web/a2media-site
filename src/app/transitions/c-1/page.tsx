import StoryScrollV1 from "@/components/sections/StoryScrollV1";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header style={hdr}>
        <Link href="/transitions/c-2" style={navLink}>→ C-2</Link>
        <Link href="/transitions/c-3" style={navLink}>→ C-3</Link>
        <Link href="/transitions/c" style={navLink}>← original C</Link>
        <div style={{ marginTop: 12 }}>
          <span style={tag}>Option 1</span>
        </div>
        <h1 style={title}>Cards Stay Big — Anchor at Top</h1>
        <p style={sub}>
          Cards translate UP only (no scale, no restyle). They become a 3-up
          summary header for the active case study panel below. Active state
          is highlighted with Electric Purple border + glow + dot indicator.
        </p>
      </header>
      <StoryScrollV1 />
    </>
  );
}

const hdr: React.CSSProperties = { background: "#000", color: "#fff", padding: "32px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" };
const tag: React.CSSProperties = { display: "inline-block", padding: "4px 12px", background: "rgba(90, 51, 255, 0.18)", border: "1px solid rgba(90, 51, 255, 0.45)", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a33ff", marginBottom: "10px" };
const title: React.CSSProperties = { fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 };
const sub: React.CSSProperties = { fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "8px auto 0", maxWidth: "640px", lineHeight: 1.5 };
const navLink: React.CSSProperties = { display: "inline-block", margin: "0 4px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a33ff", border: "1px solid rgba(90, 51, 255, 0.4)", borderRadius: "999px" };
