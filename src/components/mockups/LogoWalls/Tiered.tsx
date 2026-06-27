"use client";

/* Tiered Wall — three horizontal tiers separated by labelled dividers.
   Hero (Marquee names) → Growth (mid-sized) → Plus More (small / faded).
   Pure static. Visual hierarchy + plenty of breathing room. */

import { LOGOS } from "./logos";
import styles from "./Tiered.module.css";

const HERO = ["Shopify", "Okta", "Crossbeam", "Brainlabs", "ActiveCampaign"];
const GROWTH = ["BlueConic", "Chili Piper", "Close", "Slate", "Sendoso", "Warmly", "Reveal"];
const REST = [
  "Goldcast", "Miovision", "Stran", "ContactMonkey",
  "Cority", "UBS", "Treasury4", "Rebuy", "Nice Commerce", "Infinite Lambda",
];

export default function TieredWall() {
  const get = (name: string) => LOGOS.find((l) => l.name === name);
  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Trusted by</p>
          <h2 className={styles.title}>
            Real B2B teams. <em>Real pipeline.</em>
          </h2>
        </header>

        <div className={styles.tier}>
          <div className={styles.tierLabel}><span>Marquee Accounts</span></div>
          <div className={styles.rowHero}>
            {HERO.map((name) => {
              const l = get(name);
              return l?.src ? (
                <div key={name} className={styles.cell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={name} loading="lazy" />
                </div>
              ) : null;
            })}
          </div>
        </div>

        <div className={styles.tier}>
          <div className={styles.tierLabel}><span>Growth Stage</span></div>
          <div className={styles.rowMid}>
            {GROWTH.map((name) => {
              const l = get(name);
              return l?.src ? (
                <div key={name} className={styles.cell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={name} loading="lazy" />
                </div>
              ) : null;
            })}
          </div>
        </div>

        <div className={styles.tier}>
          <div className={styles.tierLabel}><span>+ Plenty More</span></div>
          <div className={styles.rowSmall}>
            {REST.map((name) => {
              const l = get(name);
              return l?.src ? (
                <div key={name} className={styles.cell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={name} loading="lazy" />
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
