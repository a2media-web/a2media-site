"use client";

/* Honeycomb Wall — logos rendered inside hexagonal glassmorphic cells
   arranged in a honeycomb tiling. Premium, distinctive shape. */

import { LOGOS } from "./logos";
import styles from "./Honeycomb.module.css";

const ROW_A = ["Shopify", "Okta", "Crossbeam", "ActiveCampaign", "Chili Piper", "Close", "Slate"];
const ROW_B = ["BlueConic", "Brainlabs", "Warmly", "Sendoso", "Reveal", "Goldcast"];
const ROW_C = ["Miovision", "Stran", "ContactMonkey", "Cority", "UBS", "Treasury4", "Rebuy"];

export default function HoneycombWall() {
  const get = (name: string) => LOGOS.find((l) => l.name === name);
  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Honored to work with</p>
          <h2 className={styles.title}>
            One <em>hive</em>. Endless content.
          </h2>
        </header>

        <div className={styles.honeycomb}>
          <div className={styles.row}>
            {ROW_A.map((name) => <Cell key={name} l={get(name)} name={name} />)}
          </div>
          <div className={`${styles.row} ${styles.rowOffset}`}>
            {ROW_B.map((name) => <Cell key={name} l={get(name)} name={name} />)}
          </div>
          <div className={`${styles.row} ${styles.rowOffset}`}>
            {ROW_C.map((name) => <Cell key={name} l={get(name)} name={name} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({
  l,
  name,
}: {
  l: { name: string; src?: string } | undefined;
  name: string;
}) {
  return (
    <div className={styles.cell}>
      {l?.src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={l.src} alt={name} loading="lazy" />
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
}
