"use client";

import styles from "./Disq1SaidNoTo.module.css";
import { FIT_NO } from "./_copy";

/**
 * Variant 1: "We've said no to 47 companies this year."
 *
 * Stat-led. Big number anchors the left side. Reasons we passed listed
 * on the right. Anti-sales positioning — Christina trusts honesty over
 * polish. Bold number is the social-proof inverse: scarcity by selection,
 * not by stock.
 */

export default function Disq1SaidNoTo() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Before you book</p>
        <h2 className={styles.heading}>
          We&apos;ve said no to <span className={styles.accent}>47 companies</span> this year.
        </h2>
        <p className={styles.sub}>
          We take five clients per quarter. So we say no a lot. Here&apos;s why we usually pass.
        </p>

        <div className={styles.grid}>
          <div className={styles.statCol}>
            <div className={styles.bigNum}>47</div>
            <p className={styles.statLabel}>companies we&apos;ve turned away in 2026</p>
            <div className={styles.statDivider} />
            <div className={styles.subStat}><b>92%</b> wrong stage or scope</div>
            <div className={styles.subStat}><b>8%</b> wrong moment in their roadmap</div>
            <div className={styles.subStat}><b>0%</b> regretted</div>
          </div>

          <div className={styles.reasonsCol}>
            <p className={styles.reasonHead}>If any of these sound like you, don&apos;t book.</p>
            <ul className={styles.reasonList}>
              {FIT_NO.map((r) => (
                <li key={r} className={styles.reason}>
                  <span className={styles.reasonMark}>×</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className={styles.reasonFoot}>
              If none of those sound like you, the call below makes sense.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
