import TransformSticky from "@/components/sections/TransformSticky";
import SlantBoundary from "@/components/transitions/SlantBoundary";
import CaseStudies from "@/components/sections/CaseStudies";
import Link from "next/link";

export default function TransitionDPage() {
  return (
    <>
      <header style={hdr}>
        {["a", "b", "c", "e", "f", "g", "h"].map((k) => (
          <Link key={k} href={`/transitions/${k}`} style={navLink}>
            → {k.toUpperCase()}
          </Link>
        ))}
        <div style={{ marginTop: 12 }}>
          <span style={tag}>Option D</span>
        </div>
        <h1 style={title}>Diagonal Slant Boundary</h1>
        <p style={sub}>
          Pure-CSS clip-path slant between sections. Subtle Electric Purple
          gradient inside the slanted blade and a faint glow underneath. The
          quietest of the bunch.
        </p>
      </header>
      <TransformSticky />
      <SlantBoundary />
      <CaseStudies />
    </>
  );
}

const hdr: React.CSSProperties = { background: "#000", color: "#fff", padding: "32px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" };
const tag: React.CSSProperties = { display: "inline-block", padding: "4px 12px", background: "rgba(90, 51, 255, 0.18)", border: "1px solid rgba(90, 51, 255, 0.45)", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a33ff", marginBottom: "10px" };
const title: React.CSSProperties = { fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 };
const sub: React.CSSProperties = { fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "8px auto 0", maxWidth: "560px", lineHeight: 1.5 };
const navLink: React.CSSProperties = { display: "inline-block", margin: "0 4px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a33ff", border: "1px solid rgba(90, 51, 255, 0.4)", borderRadius: "999px" };
