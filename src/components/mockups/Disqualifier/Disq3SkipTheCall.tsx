"use client";

import styles from "./Disq3SkipTheCall.module.css";
import { FIT_NO } from "./_copy";

/**
 * Variant 3: "Skip the call if..."
 *
 * Headline-driven, single-column, conversational. Asks Christina to
 * self-disqualify before booking. Respects her time. Mirrors her own
 * internal voice — she's already doing this filter mentally; the page
 * just names it. Closing line flips: "If none of those, here's what
 * happens on the call."
 */

const FLIPS = [
  { what: "We open with",   detail: "What you've already tried — and why you think it didn't stick." },
  { what: "We don't open with", detail: "What we do, our deck, our awards, our process diagram." },
  { what: "You walk away with",  detail: "A 1-page note for your CMO. Even if we don't end up working together." },
];

export default function Disq3SkipTheCall() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Read this first</p>
        <h2 className={styles.heading}>
          Skip the call <span className={styles.accent}>if any of these are true.</span>
        </h2>

        <div className={styles.skipList}>
          {FIT_NO.map((r, i) => (
            <div key={r} className={styles.skipRow}>
              <span className={styles.skipNum}>0{i + 1}</span>
              <span className={styles.skipText}>{r}</span>
            </div>
          ))}
        </div>

        <div className={styles.transition}>
          <span className={styles.transitionLine} />
          <span className={styles.transitionLabel}>If none of those, here&apos;s what the call looks like</span>
          <span className={styles.transitionLine} />
        </div>

        <div className={styles.flipGrid}>
          {FLIPS.map((f) => (
            <div key={f.what} className={styles.flipCard}>
              <p className={styles.flipWhat}>{f.what}</p>
              <p className={styles.flipDetail}>{f.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
