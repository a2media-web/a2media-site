"use client";

import { useState } from "react";
import styles from "./Pricing.module.css";

const ACCELERATOR_FEATURES = [
  "A clear content strategy built around your exact ICP",
  "3 high-impact videos you can use immediately",
  "Repeatable series concepts based on what your buyers search for",
  "A roadmap that shows how video will move pipeline",
];

const ENGINE_FEATURES = [
  "10 to 12 done-for-you videos per month (long-form + short-form cuts)",
  "AI-forward special effects for visuals you can't shoot with a camera",
  "AEO video ranking: be the first brand AI suggests to your buyers",
  "72-hour turnaround (most agencies take 1 to 2 weeks)",
  "Monthly strategy reviews where we look at what's actually converting, and double down on what's working",
  "A dedicated team that learns your voice and what your buyers want to hear",
  "Scripts engineered to move buyers from aware to ready to close",
  "Videos for every stage of the buyer journey, from discovery to close",
  "Steal what's working: we break down your competitors' best-performing videos",
  "1:1 executive video coaching for your leadership team",
  "Talent sourcing: we help you source creators for special high-stakes campaigns",
  "Monthly competitor video audits so you always know what's working in your space",
];

export default function Pricing() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  return (
    <section id="Pricing" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          One Path. <em>Two Steps.</em>
        </h2>
        <p className={styles.intro}>
          Every engagement starts with the <b>2-Week Jumpstart</b>.
          <br />
          <span className={styles.introAccent}>
            We&apos;ll walk you through your exact monthly total on your discovery call.
          </span>
        </p>

        <div className={styles.grid}>
          {/* Accelerator */}
          <div className={`${styles.card} ${styles.cardWhite}`}>
            <span className={`${styles.badge} ${styles.badgeBright}`}>Start Here</span>
            <h2 className={styles.planName}>The 2-Week Jumpstart</h2>
            <div className={styles.price}>$8K<small>one-time</small></div>
            <p className={styles.desc}>
              6-month video strategy + 3 videos. Required to start.
            </p>
            <a
              href="https://9yqatx.short.gy/vQTine"
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.ctaOutline}`}
            >
              Book a Discovery Call
            </a>
            <div className={styles.collapse}>
              <button
                type="button"
                className={`${styles.collapseHdr} ${!openA ? styles.pulse : ""}`}
                onClick={() => setOpenA((v) => !v)}
                aria-expanded={openA}
              >
                <h4>What&apos;s included</h4>
                <span className={`${styles.toggle} ${openA ? styles.open : ""}`}>+</span>
              </button>
              <div className={`${styles.collapseBody} ${openA ? styles.open : ""}`}>
                {ACCELERATOR_FEATURES.map((f) => (
                  <div key={f} className={styles.feat}>
                    <span className={styles.chk}>✓</span> <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engine */}
          <div className={`${styles.card} ${styles.featured}`}>
            <span className={`${styles.badge} ${styles.badgePurpleSolid}`}>Then</span>
            <h2 className={styles.planName}>The Video Growth Engine</h2>
            <div className={styles.price}>
              $14K — $20K<small>/ month</small>
            </div>
            <p className={styles.desc}>
              Pick 3 or 6 months. Longer = Lower monthly rate.
            </p>
            <a
              href="https://9yqatx.short.gy/ZJGUin"
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.ctaFilled}`}
            >
              See if We&apos;re a Fit
            </a>
            <div className={styles.collapse}>
              <button
                type="button"
                className={`${styles.collapseHdr} ${!openB ? styles.pulse : ""}`}
                onClick={() => setOpenB((v) => !v)}
                aria-expanded={openB}
              >
                <h4>What&apos;s included</h4>
                <span className={`${styles.toggle} ${openB ? styles.open : ""}`}>+</span>
              </button>
              <div className={`${styles.collapseBody} ${openB ? styles.open : ""}`}>
                <div className={styles.featLead}>
                  Everything in the 2-Week Jumpstart, plus:
                </div>
                {ENGINE_FEATURES.map((f) => (
                  <div key={f} className={`${styles.feat} ${styles.featPurple}`}>
                    <span className={styles.chk}>✓</span> <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
