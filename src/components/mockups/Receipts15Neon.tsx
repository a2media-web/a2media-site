"use client";

import styles from "./Receipts15Neon.module.css";

/**
 * Option 15: Vintage neon sign.
 *
 * Big neon-tube text against a dark "brick wall" backdrop. Each stat is
 * a glowing tube. One of the tubes occasionally flickers (broken light).
 * Sign hangs from chains. Las Vegas / diner storefront energy. Bold,
 * unhinged, memorable.
 */

const STATS = [
  { value: "30+",   label: "BRANDS" },
  { value: "18mo",  label: "TENURE" },
  { value: "35%",   label: "CLOSE RATE" },
  { value: "72hr",  label: "TURNAROUND" },
  { value: "600+",  label: "VIDEOS" },
  { value: "4.9★",  label: "RATING" },
];

export default function Receipts15Neon() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Open 24/7. Vacancy: zero.</p>

        <div className={styles.signWrap}>
          <span className={styles.chain} />
          <span className={`${styles.chain} ${styles.chainRight}`} />

          <div className={styles.sign}>
            <p className={styles.neonOpen}>OPEN</p>
            <div className={styles.bulbStrip}>
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className={styles.bulb} style={{ animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>

            <div className={styles.grid}>
              {STATS.map((s, i) => (
                <div key={s.label} className={`${styles.tile} ${i === 3 ? styles.flicker : ""}`}>
                  <span className={styles.neonValue}>{s.value}</span>
                  <span className={styles.neonLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            <p className={styles.neonScript}>
              <span className={styles.scriptText}>a2media</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
