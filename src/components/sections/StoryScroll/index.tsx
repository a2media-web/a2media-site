"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StoryScroll.module.css";

const TICKER = [
  "deals stalling in the pipeline",
  "leads who've never heard your name",
  "$30K brand video sitting on a homepage",
  "content that gets likes but not pipeline",
  "demo no-shows",
  "prospects don't understand what you do",
  "buyers ghosting after the first call",
  "reps re-explaining the product on every call",
  "zero inbound from organic",
  "prospects can't differentiate you from competitors",
  "sales sending decks nobody opens",
  "warm leads going cold between touches",
];

type Study = {
  id: string;
  name: string;
  bigStat: string;
  bigLabel: string;
  bigSub: string;
  tabName: string;
  tabOutcome: string;
  stats: { num: string; label: string; sub?: string }[];
  before: string;
  after: string;
  videoEngine: { title: string; body: string };
  closingPill?: { text: string; emphasis: string };
};

const STUDIES: Study[] = [
  {
    id: "reveal",
    name: "Reveal",
    bigStat: "$600K",
    bigLabel: "closed-won revenue",
    bigSub: "from video at Reveal",
    tabName: "Reveal",
    tabOutcome: "$600K · 40% faster close",
    stats: [
      { num: "$600K", label: "Closed-won revenue", sub: "attributed to video" },
      { num: "40%", label: "Faster time to close", sub: "(60 → 35 days)" },
      { num: "7,000", label: "Attendees at their", sub: "virtual summit" },
      { num: "100+", label: "Videos produced", sub: "in 1.5 years" },
    ],
    before:
      "Reveal had no video content, no content marketing, and no content team. Their sales team was closing deals in 60 days with zero marketing air cover, relying entirely on outbound and word of mouth.",
    after:
      "Sales reps started sending videos directly to prospects. Buyers were showing up to calls already educated from LinkedIn. The sales cycle compressed by 40%, and video-attributed deals closed $600K in revenue over 1.5 years.",
    videoEngine: {
      title: "The Video Engine (in collaboration with PartnerHacker)",
      body:
        "We stood up Reveal's entire content engine from scratch. We built out their video marketing strategy from TOFU to BOFU. Created 100+ videos across the full spectrum: LinkedIn thought leadership, YouTube education, outbound sales enablement, top-of-funnel comedy, webinars, and more. We also helped promote and produce the Nearbound Summit, a 7,000-person virtual summit that generated pipeline and put Reveal at the center of the partner-led growth conversation.",
    },
    closingPill: {
      text: "Reveal later",
      emphasis:
        "merged with Crossbeam. Their marketing engine helped make it happen.",
    },
  },
  {
    id: "okta",
    name: "Auth0 (Okta)",
    bigStat: "22K+",
    bigLabel: "new subscribers",
    bigSub: "added organically at Auth0",
    tabName: "Auth0 (Okta)",
    tabOutcome: "22K subs · 5.2M views",
    stats: [
      { num: "5.2M+", label: "Total video views", sub: "across channels" },
      { num: "22K+", label: "New subscribers", sub: "added organically" },
      { num: "35%", label: "Video-sourced", sub: "event registrations" },
      { num: "2", label: "YouTube channels", sub: "revived & scaled" },
    ],
    before:
      "Auth0's YouTube channel was stalling. Losing subscribers monthly despite existing content. Years of paid ad spend had inflated view counts, but organic engagement was flat. The channel needed a strategy that turned views into real developer engagement and event registrations.",
    after:
      "The channel went from bleeding subscribers to 22K+ new organic subscribers and 5.2M+ views with minimal ad spend. Video content drove 35% of registrations for Oktane and Developer Day virtual events, turning content into a measurable pipeline driver for developer signups and product adoption.",
    videoEngine: {
      title: "The Video Engine",
      body:
        "We revived Auth0's YouTube channel and took them multichannel across YouTube, LinkedIn, and TikTok. We launched focused developer education series, produced content for the main Okta channel, and built video funnels that drove developer signups for the Oktane and Developer Day virtual events. Instead of chasing virality, we created consistent streams of content that educated developers and fostered community, turning Auth0 into a trusted resource for developers globally.",
    },
    closingPill: {
      text: "Engagement ongoing since Feb 2024.",
      emphasis:
        "Video now drives event registrations, developer adoption, and stakeholder buy-in.",
    },
  },
  {
    id: "partnerhacker",
    name: "PartnerHacker",
    bigStat: "8 mo",
    bigLabel: "from launch to acquired",
    bigSub: "PartnerHacker, $0 → exit",
    tabName: "PartnerHacker",
    tabOutcome: "$0 to acquired in 8mo",
    stats: [
      { num: "$900K+", label: "Closed-won", sub: "in sponsorships" },
      { num: "5,000", label: "Attendees at their", sub: "virtual summit" },
      { num: "8 mo", label: "From launch", sub: "to acquisition" },
      { num: "50", label: "Videos", sub: "produced" },
    ],
    before:
      "PartnerHacker was a brand new company with a hypothesis: partnerships needed its own media brand. They had an audience, but no video team and a small content library. They needed to turn attention into authority fast in a space dominated by established players.",
    after:
      "We became their first video hire and built the content engine from day one. Within months, PartnerHacker was recognized at events, leading conversations on LinkedIn, and positioned as the definitive voice in the partnerships space. Alongside them, using video, we coined Nearbound, a term that became an industry standard alongside inbound and outbound. It showed up on hiring boards, was adopted by other companies to describe their go-to-market motions, and the term has since evolved into ELG (Ecosystem Led Growth).",
    videoEngine: {
      title: "The Video Engine",
      body:
        "We produced 50 pieces of content across webinars, podcasts, short video clips, and full-funnel video (top, middle, and bottom of funnel). We helped host the largest partnerships webinar in history at the time (5,000 attendees), closed $900K+ in sponsorships, and built the video presence that made PartnerHacker synonymous with partner-led growth.",
    },
    closingPill: {
      text: "PartnerHacker was",
      emphasis:
        "acquired just 8 months after launch. Content made the brand impossible to ignore.",
    },
  },
];

// Helpers — clamp & lerp progress between two checkpoints
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const range = (p: number, start: number, end: number) =>
  clamp01((p - start) / (end - start));

export default function StoryScroll() {
  const morphRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(STUDIES[0].id);
  const study = STUDIES.find((s) => s.id === activeId) ?? STUDIES[0];

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = morphRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = total > 0 ? clamp01(scrolled / total) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Phase boundaries (within the morphArea sticky scroll, 0 → 1):
  //   0.00 – 0.30  : Fail layer fully shown, cards hidden
  //   0.30 – 0.45  : Fail wipes, success layer + cards rise
  //   0.45 – 0.65  : Cards fully shown in big format, viewer reads
  //   0.65 – 0.85  : Cards morph (translate up, scale down, restyle to tabs)
  //   0.85 – 1.00  : Cards now look like tabs, settled at top — handoff to panel
  const failOpacity = 1 - range(progress, 0.25, 0.4);
  const successOpacity = range(progress, 0.3, 0.5);
  const cardsAppear = range(progress, 0.35, 0.55);
  const morph = range(progress, 0.65, 0.85);
  // After morph completes the headline above the cards fades out so the
  // cards-as-tabs read as the "real" CaseStudies header.
  const headingOpacity = 1 - range(progress, 0.6, 0.8);

  return (
    <section className={styles.section}>
      {/* MORPH AREA — sticky 4-phase scroll */}
      <div ref={morphRef} className={styles.morphArea}>
        <div className={styles.morphSticky}>
          {/* FAIL layer */}
          <div
            className={styles.failLayer}
            style={{
              opacity: failOpacity,
              pointerEvents: failOpacity > 0.05 ? "auto" : "none",
            }}
            aria-hidden={failOpacity < 0.05}
          >
            <p className={styles.eyebrowFail}>Without Video Content</p>
            <h2 className={styles.headingFail}>
              You&apos;re spending more and closing less, because each one of
              your video attempts dies before it compounds.
            </h2>
            <div className={styles.tickerWrap}>
              <div className={styles.ticker}>
                {[...TICKER, ...TICKER].map((t, i) => (
                  <span key={i} className={styles.tickerItem}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className={styles.bottomFail}>There&apos;s a better way.</p>
          </div>

          {/* SUCCESS layer with morphing cards */}
          <div
            className={styles.successLayer}
            style={{ opacity: successOpacity }}
          >
            <div
              className={styles.successHead}
              style={{ opacity: headingOpacity }}
            >
              <p className={styles.eyebrowSuccess}>With Video Content</p>
              <h2 className={styles.headingSuccess}>
                Deals move faster because <span>your prospects already trust you.</span>
              </h2>
            </div>

            <div className={styles.cardRow}>
              {STUDIES.map((s, i) => {
                // Each card individually appears with a slight stagger
                const stagger = (cardsAppear - i * 0.08) > 0 ? 1 : 0;
                const cardOpacity =
                  stagger * range(progress, 0.35 + i * 0.04, 0.55 + i * 0.04);

                // Morph values
                const scale = 1 - morph * 0.42;
                // Translate Y: cards move from center to top
                const translateY = -morph * 36 + "vh";
                // Border radius: from card → pill
                const radius = `${14 + morph * 6}px`;
                // Background: white → soft purple tint
                const bg = `rgba(${255 - morph * 100}, ${
                  255 - morph * 220
                }, ${255 - morph * 0}, ${1 - morph * 0.93})`;
                const borderColor = morph < 0.3
                  ? `rgba(13, 5, 54, ${0.08 - morph * 0.2})`
                  : `rgba(90, 51, 255, ${0.1 + morph * 0.4})`;

                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                    style={{
                      opacity: cardOpacity,
                      transform: `translateY(${translateY}) scale(${scale})`,
                      borderRadius: radius,
                      background:
                        morph > 0.5
                          ? isActive
                            ? "rgba(90, 51, 255, 0.1)"
                            : "rgba(255, 255, 255, 0.7)"
                          : bg,
                      borderColor:
                        morph > 0.5 && isActive
                          ? "var(--a2-electric-purple)"
                          : borderColor,
                      pointerEvents: morph > 0.6 ? "auto" : "none",
                      cursor: morph > 0.6 ? "pointer" : "default",
                    }}
                    onClick={() => morph > 0.6 && setActiveId(s.id)}
                    aria-label={s.name}
                  >
                    {/* BIG state */}
                    <div
                      className={styles.bigState}
                      style={{
                        opacity: 1 - morph * 1.6,
                        transform: `scale(${1 + morph * 0.05})`,
                      }}
                      aria-hidden={morph > 0.5}
                    >
                      <div className={styles.bigStat}>{s.bigStat}</div>
                      <div className={styles.bigLabel}>{s.bigLabel}</div>
                      <div className={styles.bigSub}>{s.bigSub}</div>
                    </div>

                    {/* TAB state */}
                    <div
                      className={styles.tabState}
                      style={{
                        opacity: range(morph, 0.45, 0.85),
                      }}
                      aria-hidden={morph < 0.5}
                    >
                      <div className={styles.tabName}>{s.tabName}</div>
                      <div
                        className={styles.tabOutcome}
                        style={{
                          color: isActive
                            ? "var(--a2-electric-purple)"
                            : "rgba(13, 5, 54, 0.6)",
                        }}
                      >
                        {s.tabOutcome}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* PANEL AREA — case study details, with the same tab elements pinned at top */}
      <div className={styles.panelArea}>
        <div className={styles.panelInner}>
          <div className={styles.panelHead}>
            <p className={styles.panelEyebrow}>The receipts</p>
            <h2 className={styles.panelHeading}>Case Studies</h2>
            <p className={styles.panelSub}>
              Here&apos;s what happens when you start building trust and
              community with video.
            </p>
          </div>

          {/* Tabs (now in static flow, styled to match the morph end state exactly) */}
          <div className={styles.tabBar} role="tablist">
            {STUDIES.map((s) => {
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.staticTab} ${isActive ? styles.staticTabActive : ""}`}
                  onClick={() => setActiveId(s.id)}
                >
                  <div className={styles.tabName}>{s.tabName}</div>
                  <div className={styles.tabOutcome}>{s.tabOutcome}</div>
                </button>
              );
            })}
          </div>

          {/* Active study panel */}
          <div className={styles.panel} role="tabpanel" key={study.id}>
            <div className={styles.stats}>
              {study.stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <div className={styles.statNum}>{s.num}</div>
                  <div className={styles.statLabel}>
                    {s.label}
                    {s.sub ? (
                      <>
                        <br />
                        <span className={styles.statSub}>{s.sub}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.story}>
              <div className={styles.block}>
                <div className={`${styles.blockLabel} ${styles.before}`}>
                  <span className={styles.dot} /> Before A2
                </div>
                <p>{study.before}</p>
              </div>
              <div className={styles.block}>
                <div className={`${styles.blockLabel} ${styles.after}`}>
                  <span className={styles.dot} /> After A2
                </div>
                <p>{study.after}</p>
              </div>
            </div>

            <div className={styles.engine}>
              <div className={styles.engineLabel}>
                <span className={styles.gear} aria-hidden>
                  ⚙
                </span>{" "}
                {study.videoEngine.title}
              </div>
              <p className={styles.engineBody}>{study.videoEngine.body}</p>
            </div>

            {study.closingPill ? (
              <div className={styles.closingPill}>
                {study.closingPill.text}{" "}
                <strong>{study.closingPill.emphasis}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
