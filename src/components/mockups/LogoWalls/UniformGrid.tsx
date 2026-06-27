"use client";

/* Uniform Grid — clean 6-column grid of identically sized cells with thin
   purple separator lines (1px border-style with cell hover-fill). Most
   conservative + scannable of the static variants. */

import { LOGOS } from "./logos";
import styles from "./UniformGrid.module.css";

const ORDER = [
  "Shopify", "Okta", "Crossbeam", "Brainlabs", "ActiveCampaign", "BlueConic",
  "Chili Piper", "Close", "Slate", "Warmly", "Sendoso", "Reveal",
  "Goldcast", "Miovision", "Stran", "ContactMonkey", "Cority", "UBS",
];

export default function UniformGridWall() {
  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Trusted by</p>
          <h2 className={styles.title}>
            <span className={styles.titleNum}>30+</span> B2B SaaS teams ship video with us.
          </h2>
        </header>

        <div className={styles.grid}>
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

        <p className={styles.footer}>
          <strong>+ 12 more</strong> we didn&apos;t fit on the wall.
        </p>
      </div>
    </section>
  );
}
