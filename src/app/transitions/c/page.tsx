import StoryScroll from "@/components/sections/StoryScroll";
import Link from "next/link";

export default function TransitionCPage() {
  return (
    <>
      <header style={hdr}>
        {["a", "b", "d", "e", "f", "g", "h"].map((k) => (
          <Link key={k} href={`/transitions/${k}`} style={navLink}>
            → {k.toUpperCase()}
          </Link>
        ))}
        <div style={{ marginTop: 12 }}>
          <span style={tag}>Option C — unified</span>
        </div>
        <h1 style={title}>StoryScroll: cards = tabs</h1>
        <p style={sub}>
          One sticky scroll, four phases: Without Video → With Video + 3
          client-attributed cards → cards morph (translate + scale + restyle)
          → tabs settle and case study panel reveals. The 3 stat cards are
          the SAME DOM elements that become the Reveal / Auth0 / PartnerHacker
          tabs — no duplication.
        </p>
      </header>
      <StoryScroll />
    </>
  );
}

const hdr: React.CSSProperties = { background: "#000", color: "#fff", padding: "32px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" };
const tag: React.CSSProperties = { display: "inline-block", padding: "4px 12px", background: "rgba(90, 51, 255, 0.18)", border: "1px solid rgba(90, 51, 255, 0.45)", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a33ff", marginBottom: "10px" };
const title: React.CSSProperties = { fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 };
const sub: React.CSSProperties = { fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "8px auto 0", maxWidth: "640px", lineHeight: 1.5 };
const navLink: React.CSSProperties = { display: "inline-block", margin: "0 4px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a33ff", border: "1px solid rgba(90, 51, 255, 0.4)", borderRadius: "999px" };
