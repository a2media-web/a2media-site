"use client";

import styles from "./Receipts2Marquee.module.css";

/**
 * Option 2: Marquee ticker.
 *
 * Single horizontal row of the 6 stats, scrolling continuously. Loops
 * forever, pauses on hover. Compact + energetic. Reads as motion without
 * dominating the page. Good for a quick proof beat between heavier
 * sections.
 */

const STATS = [
  { value: "25+", label: "B2B Brands Served" },
  { value: "18mo", label: "Avg. Client Tenure" },
  { value: "35%", label: "Faster Close Rates" },
  { value: "72hr", label: "Avg. Turnaround Times" },
  { value: "550+", label: "Videos Delivered" },
  { value: "4.9/5", label: "Client Rating" },
];

export default function Receipts2Marquee() {
  // Triple the loop so even very wide screens don't see the seam.
  const loop = [...STATS, ...STATS, ...STATS];
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
      </div>
      <div className={styles.marqueeWrap}>
        <div className={styles.track}>
          {loop.map((s, i) => (
            <div key={`${s.label}-${i}`} className={styles.cell}>
              <span className={styles.value}>{s.value}</span>
              <span className={styles.dot} aria-hidden>•</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
