"use client";

import styles from "./Process9Corkboard.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Detective corkboard with red string.
 *
 * Three Polaroid-style cards pinned to a cork wall, connected by red
 * yarn. Each card has a header label (handwritten font feel), the step
 * title typed out below, and the full description in a "scrap" of paper
 * underneath. Light rotation per card. Photocopy / case-file aesthetic.
 */

const POLAROID_LABELS = ["EXHIBIT 01", "EXHIBIT 02", "EXHIBIT 03"];

export default function Process9Corkboard() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Case File 2026 · A2 Media</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.board}>
          {/* red string connecting the three exhibits */}
          <svg className={styles.string} viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden>
            <path
              d="M 170 130 Q 320 360 500 200 Q 680 60 820 380"
              fill="none"
              stroke="#d6322f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {PROCESS_STEPS.map((s, i) => (
            <article key={s.title} className={`${styles.exhibit} ${styles[`exhibit${i}`]}`}>
              <span className={styles.pin} aria-hidden />
              <div className={styles.polaroid}>
                <div className={styles.photo}>
                  <span className={styles.photoLabel}>{POLAROID_LABELS[i]}</span>
                  <span className={styles.photoNum}>0{i + 1}</span>
                </div>
                <div className={styles.caption}>
                  <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                </div>
              </div>
              <div className={styles.scrap}>
                <p className={styles.scrapText}>{s.desc}</p>
                <span className={styles.tape} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
