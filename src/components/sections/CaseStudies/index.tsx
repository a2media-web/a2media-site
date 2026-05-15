"use client";

import { useState } from "react";
import styles from "./CaseStudies.module.css";

type Study = {
  id: string;
  name: string;
  shortName: string;
  outcome: string;
  shortOutcome: string;
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
    shortName: "Reveal",
    outcome: "40% faster close, $600K revenue",
    shortOutcome: "$600K revenue",
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
      emphasis: "merged with Crossbeam. Their marketing engine helped make it happen.",
    },
  },
  {
    id: "okta",
    name: "Okta (Auth0)",
    shortName: "Okta",
    outcome: "22K subs, 35% of event signups",
    shortOutcome: "22K subs",
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
      emphasis: "Video now drives event registrations, developer adoption, and stakeholder buy-in.",
    },
  },
  {
    id: "partnerhacker",
    name: "PartnerHacker",
    shortName: "PH",
    outcome: "From $0 to acquired in 8 months",
    shortOutcome: "Acquired 8mo",
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

export default function CaseStudies() {
  const [active, setActive] = useState(STUDIES[0].id);
  const study = STUDIES.find((s) => s.id === active) ?? STUDIES[0];

  return (
    <section id="Studies" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Case Studies</h2>
        <p className={styles.sub}>
          Here&apos;s what happens when you start building trust and community
          with video.
        </p>

        <div className={styles.tabs} role="tablist">
          {STUDIES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={s.id === active}
              className={`${styles.tab} ${s.id === active ? styles.tabActive : ""}`}
              onClick={() => setActive(s.id)}
            >
              <div className={styles.tabName}>{s.name}</div>
              <div className={styles.tabOutcome}>{s.outcome}</div>
            </button>
          ))}
        </div>

        <div className={styles.panel} role="tabpanel">
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
              <span className={styles.gear} aria-hidden>⚙</span>{" "}
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
    </section>
  );
}
