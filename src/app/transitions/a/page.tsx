import TransformSticky from "@/components/sections/TransformSticky";
import CompressedConnector from "@/components/transitions/CompressedConnector";
import CaseStudies from "@/components/sections/CaseStudies";
import Link from "next/link";

export default function TransitionAPage() {
  return (
    <>
      <header style={hdr}>
        <Link href="/transitions/b" style={navLink}>→ Try B</Link>
        <Link href="/transitions/c" style={navLink}>→ Try C</Link>
        <span style={tag}>Option A</span>
        <h1 style={title}>Tightened + Brand Connector</h1>
        <p style={sub}>
          Vertical Electric Purple line draws downward as you scroll, ending
          in a chevron pointing into Case Studies. Minimal, native-feeling.
        </p>
      </header>
      <TransformSticky />
      <CompressedConnector />
      <CaseStudies />
    </>
  );
}

const hdr: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "32px 24px",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};
const tag: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 12px",
  background: "rgba(90, 51, 255, 0.18)",
  border: "1px solid rgba(90, 51, 255, 0.45)",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#5a33ff",
  marginBottom: "10px",
};
const title: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: 0,
};
const sub: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.6)",
  margin: "8px auto 0",
  maxWidth: "560px",
  lineHeight: 1.5,
};
const navLink: React.CSSProperties = {
  display: "inline-block",
  margin: "0 8px",
  padding: "4px 10px",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#5a33ff",
  border: "1px solid rgba(90, 51, 255, 0.4)",
  borderRadius: "999px",
};
