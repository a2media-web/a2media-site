"use client";

/* Bento Wall — fixed asymmetric grid, no scrolling. Premium "wall of fame"
   feel. Mixed cell sizes signal hierarchy (Shopify huge, others medium). */

import { LOGOS } from "./logos";
import styles from "./Bento.module.css";

// Hand-picked subset to control the bento layout
const HERO = ["Shopify", "Okta"];
const WIDE = ["Brainlabs"];
const TALL = ["Crossbeam", "ActiveCampaign"];
const STD = [
  "BlueConic", "Chili Piper", "Close", "Slate", "Warmly",
  "Sendoso", "Reveal", "UBS", "Cority", "Goldcast",
  "Miovision", "Stran",
];

export default function BentoWall() {
  const get = (name: string) => LOGOS.find((l) => l.name === name);
  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Trusted</p>
          <h2 className={styles.title}>
            Every name on this wall <em>shipped video</em>
            <br />
            with our team.
          </h2>
        </header>

        <div className={styles.grid}>
          {HERO.map((name) => {
            const l = get(name);
            return l ? (
              <Cell key={name} l={l} cls={styles.heroL} />
            ) : null;
          })}
          {WIDE.map((name) => {
            const l = get(name);
            return l ? <Cell key={name} l={l} cls={styles.wide} /> : null;
          })}
          {TALL.map((name) => {
            const l = get(name);
            return l ? <Cell key={name} l={l} cls={styles.tall} /> : null;
          })}
          {STD.slice(0, 6).map((name) => {
            const l = get(name);
            return l ? <Cell key={name} l={l} cls={styles.std} /> : null;
          })}

          <div className={styles.featLine}>
            <strong>+ 30 more</strong>
            <span>
              Goldcast · Sendoso · Reveal · UBS · Cority · Miovision · Stran ·
              Treasury4 · Nice Commerce · Rebuy · Infinite Lambda
            </span>
          </div>

          {STD.slice(6).map((name) => {
            const l = get(name);
            return l ? <Cell key={name} l={l} cls={styles.std} /> : null;
          })}
        </div>
      </div>
    </section>
  );
}

function Cell({
  l,
  cls,
}: {
  l: { name: string; src?: string };
  cls: string;
}) {
  return (
    <div className={`${styles.cell} ${cls}`}>
      {l.src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={l.src} alt={l.name} loading="lazy" />
      ) : (
        <span>{l.name}</span>
      )}
    </div>
  );
}
