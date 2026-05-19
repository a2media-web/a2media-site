import Process from "@/components/sections/Process";
import Process4Conveyor from "@/components/mockups/Process4Conveyor";
import Process6Calendar from "@/components/mockups/Process6Calendar";
import Process7TVChannel from "@/components/mockups/Process7TVChannel";
import Process8Pinball from "@/components/mockups/Process8Pinball";
import Process9Corkboard from "@/components/mockups/Process9Corkboard";
import Process10GameLevels from "@/components/mockups/Process10GameLevels";

const OPTIONS = [
  { tag: "Current", title: "Live on a2media.ca", sub: "Three cards in a row with eyebrow + title + description, then a discovery-call CTA below. Reference only." },
  { tag: "Option 1 · KEEPER", title: "Production Line Conveyor", sub: "Yellow 'BRIEF' package travels along a belt, pausing at 3 machine stations carrying the full live copy, then drops into a green 'PIPELINE' bin. Status lights blink as each station activates. Industrial, mechanical, satisfying." },
  { tag: "Option 2", title: "Pinned Calendar Pages", sub: "Three planner pages (WEEK 1 / WEEK 4 / MONTH 6) pinned to a board, each with a mini-calendar with a circled key date, a red push-pin at the top, and the step copy below. Time-anchored, tactile, planner-aesthetic." },
  { tag: "Option 3", title: "CRT TV + Channel Remote", sub: "Old TV cabinet with scanlines, curvature, and a 'LIVE · CH 01' badge on screen. A remote sits beside it with 3 channel buttons — clicking flips the broadcast with a brief static burst. Retro broadcast vibe." },
  { tag: "Option 4", title: "Pinball Playfield", sub: "Tall pinball cabinet on the left: ball drops from the chute, bounces through 3 bumpers (each lights up as hit), and lands in a glowing green PIPELINE pocket. Step cards on the right light up as the ball arrives. Scoreboard ticks up. Playful, kinetic." },
  { tag: "Option 5", title: "Detective Corkboard", sub: "Three exhibits pinned to a cork wall with a red yarn string connecting them. Each exhibit is a Polaroid (handwritten step title) plus a yellow scrap note with the full description taped below. Case-file / investigation aesthetic." },
  { tag: "Option 6", title: "Pixel Game Levels", sub: "Worlds 1-1 / 1-2 / 1-3 in a vertical stack. Locked by default; unlocks one at a time as you scroll, with a coin-spin animation and a green ✓ stamp. Final 'PIPELINE BUILT' end-screen lights up at the bottom. Pure stop-scroll, on-brand for an unorthodox agency." },
];

function Label({ idx }: { idx: number }) {
  const o = OPTIONS[idx];
  return (
    <header style={labelHeader}>
      <span style={labelTag}>{o.tag}</span>
      <h1 style={labelTitle}>{o.title}</h1>
      <p style={labelSub}>{o.sub}</p>
    </header>
  );
}

export default function ProcessMockups() {
  return (
    <>
      <Label idx={0} />
      <Process />
      <Label idx={1} />
      <Process4Conveyor />
      <Label idx={2} />
      <Process6Calendar />
      <Label idx={3} />
      <Process7TVChannel />
      <Label idx={4} />
      <Process8Pinball />
      <Label idx={5} />
      <Process9Corkboard />
      <Label idx={6} />
      <Process10GameLevels />
    </>
  );
}

const labelHeader: React.CSSProperties = {
  background: "#000",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  padding: "32px 24px",
  textAlign: "center",
};
const labelTag: React.CSSProperties = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#8f45ee",
  border: "1px solid rgba(143,69,238,0.4)",
  padding: "4px 12px",
  borderRadius: 999,
  marginBottom: 12,
};
const labelTitle: React.CSSProperties = {
  fontFamily: "var(--a2-sans)",
  fontSize: 28,
  fontWeight: 600,
  color: "#fff",
  margin: "0 0 6px",
  letterSpacing: "-0.01em",
};
const labelSub: React.CSSProperties = {
  fontSize: 14,
  color: "rgba(255,255,255,0.6)",
  margin: "0 auto",
  maxWidth: 720,
  lineHeight: 1.55,
};
