import Process from "@/components/sections/Process";
import Process41YTUpload from "@/components/mockups/Process41YTUpload";
import Process63Carousel from "@/components/mockups/Process63Carousel";
import Process64ChannelRow from "@/components/mockups/Process64ChannelRow";
import Process65Checklist from "@/components/mockups/Process65Checklist";
import Process66Tabs from "@/components/mockups/Process66Tabs";
import Process67Odometer from "@/components/mockups/Process67Odometer";
import Process68WatchPage from "@/components/mockups/Process68WatchPage";

const SECTIONS: { tag: string; title: string; sub: string; Render: () => React.ReactElement }[] = [
  { tag: "Reference · live",  title: "Current Gantt (a2media.ca)",      sub: "What's on the site today, for comparison.", Render: Process },
  { tag: "Reference · liked", title: "YouTube Upload Manager (original)", sub: "The one you liked but said was too busy. The 5 below are net-new simpler concepts in the same family.", Render: Process41YTUpload },

  { tag: "New 01",  title: "Carousel · one card at a time", sub: "Single big card auto-cycles between the 3 steps. Only one is on screen at any moment. Dot indicators below. Maximum focus, zero competing elements.", Render: Process63Carousel },
  { tag: "New 02",  title: "Channel home row",             sub: "Three video thumbnails in a clean horizontal row — like the 'Latest videos' strip on a YouTube channel page. No app chrome, no progress bars. Title + view count + 'Now playing' badge on the active one.", Render: Process64ChannelRow },
  { tag: "New 03",  title: "Checklist",                    sub: "Three to-do items. Each transitions empty → spinner → ✓ in sequence. Universal Linear/Notion/Apple-Notes to-do pattern. Zero learning curve.", Render: Process65Checklist },
  { tag: "New 04",  title: "Tabs",                         sub: "Three tabs at the top, one content panel below that shows the active step. Auto-cycles, also clickable. Universal browser/app metaphor.", Render: Process66Tabs },
  { tag: "New 05",  title: "Big odometer",                 sub: "One gigantic '01 / 03' number flips through 01, 02, 03. Title + one-line description below. The eye has literally nowhere else to go. Most minimal single-focal-point version possible.", Render: Process67Odometer },

  { tag: "Merge",   title: "Watch page (carousel + channel row)", sub: "The hybrid I suggested. Big featured 'player' card on top auto-cycles through the 3 steps (carousel mechanic). Below: a small 'Up next' row of 3 thumbnails (channel-row layout). The active one is highlighted. Click any thumbnail to jump.", Render: Process68WatchPage },
];

function Label({ idx }: { idx: number }) {
  const o = SECTIONS[idx];
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
      {SECTIONS.map((s, i) => (
        <div key={s.tag}>
          <Label idx={i} />
          <s.Render />
        </div>
      ))}
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
