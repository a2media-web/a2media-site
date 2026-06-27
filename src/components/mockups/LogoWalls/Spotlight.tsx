"use client";

/* Spotlight Wall — one large featured logo at a time with a stat/quote
   beside it. Auto-rotates every 5s. Clickable thumbs for the rest. */

import { useEffect, useState } from "react";
import { LOGOS } from "./logos";
import styles from "./Spotlight.module.css";

const SPOTLIGHTS = [
  {
    name: "Shopify",
    stat: "30% faster sales cycle on enterprise outbound video.",
    attribution: "Enterprise Sales",
  },
  {
    name: "Okta",
    stat: "8x more demos booked from a single quarter of video.",
    attribution: "Demand Gen",
  },
  {
    name: "Brainlabs",
    stat: "Pipeline lift across 3 categories in 60 days.",
    attribution: "Performance Marketing",
  },
  {
    name: "ActiveCampaign",
    stat: "Cut content production cost in half. Doubled output.",
    attribution: "Marketing Ops",
  },
  {
    name: "Slate",
    stat: "Brand films that customers actually shared.",
    attribution: "Brand & Comms",
  },
  {
    name: "Miovision",
    stat: "Sales enablement assets the team actually uses.",
    attribution: "Field Marketing",
  },
];

const ROTATE_MS = 5000;

export default function SpotlightWall() {
  const [active, setActive] = useState(0);
  const current = SPOTLIGHTS[active];
  const currentLogo = LOGOS.find((l) => l.name === current.name);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % SPOTLIGHTS.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Trusted by</p>
          <h2 className={styles.title}>
            Real teams. <em>Real results.</em>
          </h2>
          <p className={styles.sub}>
            The clients on this wall hired us to do one job: build video that
            moves pipeline. Tap any logo to see what shipped.
          </p>
          <div className={styles.thumbRow}>
            {SPOTLIGHTS.map((s, i) => {
              const l = LOGOS.find((x) => x.name === s.name);
              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`${styles.thumb} ${i === active ? styles.active : ""}`}
                  aria-label={s.name}
                >
                  {l?.src && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={l.src} alt={s.name} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.stage}>
          {currentLogo?.src && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={currentLogo.src} alt={current.name} className={styles.heroLogo} />
          )}
          <p className={styles.stat}>&ldquo;{current.stat}&rdquo;</p>
          <p className={styles.attribution}>
            <strong>{current.name}</strong> · {current.attribution}
          </p>
        </div>
      </div>
    </section>
  );
}
