"use client";

import { useState } from "react";
import styles from "./Process2Scrubber.module.css";

/**
 * Option 2: Interactive timeline scrubber.
 *
 * The most interactive option. A horizontal range input the user drags
 * to "fast-forward" through their first six months with A2. The display
 * panel below shows what's happening at that point — what their team is
 * doing, what's shipping, what's hitting pipeline.
 *
 * Three discrete "checkpoints" with smooth interpolation between them.
 */

const CHECKPOINTS = [
  { value: 0, label: "Day 0",  state: "Where you are now" },
  { value: 25, label: "Week 1", state: "Step 1: The 3-Week Jumpstart" },
  { value: 50, label: "Week 4", state: "Step 2: Video Engine Live" },
  { value: 100, label: "Month 6", state: "Step 3: Pipeline Compounds" },
];

const STAGE_CONTENT: Record<number, { eyebrow: string; title: string; bullets: string[]; metric: string; metricLabel: string }> = {
  0: {
    eyebrow: "BEFORE A2",
    title: "Video is a side project nobody owns.",
    bullets: [
      "Reps complain there's nothing to send",
      "Marketing ships content sales never uses",
      "Channel mix slide looks the same every quarter",
    ],
    metric: "0",
    metricLabel: "Videos in active deals",
  },
  1: {
    eyebrow: "STEP 1",
    title: "The 3-Week Jumpstart.",
    bullets: [
      "Buyer psychology research from sales calls",
      "Custom video roadmap mapped to your funnel",
      "Scripts written and distribution mapped",
    ],
    metric: "3",
    metricLabel: "Sales-ready videos in 3 weeks",
  },
  2: {
    eyebrow: "STEP 2",
    title: "Your Video Engine is live.",
    bullets: [
      "New videos shipping every week",
      "48 to 72 hour turnaround on every brief",
      "Editor team treats your account like talent",
    ],
    metric: "4-6",
    metricLabel: "Videos shipping per week",
  },
  3: {
    eyebrow: "STEP 3",
    title: "Videos build pipeline.",
    bullets: [
      "Sales sends videos in active deals",
      "Prospects show up educated",
      "Video becomes a primary pipeline driver",
    ],
    metric: "35%",
    metricLabel: "Faster close rates",
  },
};

function nearestCheckpoint(v: number): number {
  if (v < 12) return 0;
  if (v < 38) return 1;
  if (v < 75) return 2;
  return 3;
}

export default function Process2Scrubber() {
  const [value, setValue] = useState(0);
  const stage = nearestCheckpoint(value);
  const content = STAGE_CONTENT[stage];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Drag the slider</p>
        <h2 className={styles.heading}>
          Fast-forward your <span className={styles.italic}>first six months</span>.
        </h2>

        <div className={styles.controls}>
          <div className={styles.scrubber}>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className={styles.range}
              aria-label="Timeline scrubber"
            />
            <div className={styles.ticks}>
              {CHECKPOINTS.map((c) => (
                <div
                  key={c.label}
                  className={`${styles.tick} ${stage === CHECKPOINTS.indexOf(c) ? styles.tickActive : ""}`}
                  style={{ left: `${c.value}%` }}
                >
                  <span className={styles.tickDot} />
                  <span className={styles.tickLabel}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={styles.fastForward}
            onClick={() => setValue((v) => (v >= 100 ? 0 : Math.min(100, v + 25)))}
            aria-label="Skip to next stage"
          >
            Skip ahead →
          </button>
        </div>

        <div className={styles.stage} key={stage}>
          <div className={styles.stageHead}>
            <p className={styles.stageEyebrow}>{content.eyebrow}</p>
            <h3 className={styles.stageTitle}>{content.title}</h3>
          </div>

          <div className={styles.stageBody}>
            <ul className={styles.bullets}>
              {content.bullets.map((b) => (
                <li key={b}>
                  <span className={styles.bulletDot} />
                  {b}
                </li>
              ))}
            </ul>
            <div className={styles.metricBlock}>
              <div className={styles.metric}>{content.metric}</div>
              <div className={styles.metricLabel}>{content.metricLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
