"use client";

/* Inline Row — tight single horizontal row of clean evenly-sized logos with a
   pill stat above + italic tagline below. The most compact static option —
   ~half the vertical height of the others. Slots between sections without
   demanding attention. */

import { LOGOS } from "./logos";
import styles from "./InlineRow.module.css";

const ORDER = [
  "Shopify", "Okta", "Crossbeam", "Brainlabs",
  "ActiveCampaign", "BlueConic", "Chili Piper", "Slate",
];

export default function InlineRowWall() {
  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.stat}>
          <span className={styles.statDot} />
          <span>
            <span className={styles.statNum}>30+</span> B2B SaaS teams ·{" "}
            <span className={styles.statNum}>$87M</span> in attributed pipeline
          </span>
        </div>

        <div className={styles.row}>
          {ORDER.map((name) => {
            const l = LOGOS.find((x) => x.name === name);
            if (!l?.src) return null;
            return (
              <div key={name} className={styles.cell}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={name} loading="lazy" />
              </div>
            );
          })}
        </div>

        <p className={styles.tagline}>
          A short list of the teams already shipping video that converts.
        </p>
      </div>
    </section>
  );
}
