import Process30YTChannel from "@/components/mockups/Process30YTChannel";
import Process31YTAnalytics from "@/components/mockups/Process31YTAnalytics";
import Process32YTComments from "@/components/mockups/Process32YTComments";
import Process33YTEndScreen from "@/components/mockups/Process33YTEndScreen";
import Process34YTNotifications from "@/components/mockups/Process34YTNotifications";

const SECTIONS: { tag: string; title: string; sub: string; Render: () => React.ReactElement }[] = [
  { tag: "YT · A", title: "Channel Page",       sub: "Full YouTube channel layout — banner, profile circle, subscribe button, then 'Recent uploads' with 3 video thumbnails as the steps. Most universally recognizable.", Render: Process30YTChannel },
  { tag: "YT · B", title: "Studio Analytics",   sub: "Creator dashboard. 3 stat cards (Watch hours / Subs / Views) animate up. A green growth line draws across the chart with 3 milestones — Step One → Step Two → Step Three. 'Look how this grows.'", Render: Process31YTAnalytics },
  { tag: "YT · C", title: "Comment Thread",     sub: "Three top comments PINNED BY A2 MEDIA. Creator avatar, verified check, hearts, likes, and 'View 12 replies'. Plays the social-proof angle of YouTube.", Render: Process32YTComments },
  { tag: "YT · D", title: "End-Screen Cards",   sub: "The 'video just ended' overlay. A faded thumbnail of the just-finished video sits behind. 3 end-screen cards zoom in one at a time + a red SUBSCRIBE chip in the corner.", Render: Process33YTEndScreen },
  { tag: "YT · E", title: "Notification Feed",  sub: "The bell-icon dropdown panel. Bell shakes, badge count ticks up, 3 notification rows reveal one at a time (newest at top). 'A2 Media uploaded: …' with thumbnails + timestamps.", Render: Process34YTNotifications },
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

export default function YouTubeProcessMockups() {
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
  color: "#ff0033",
  border: "1px solid rgba(255,0,51,0.45)",
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
