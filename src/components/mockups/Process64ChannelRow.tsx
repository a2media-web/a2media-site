"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process64ChannelRow.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler new #2: Channel home row.
 *
 * Three video thumbnails in a clean horizontal row — like the "Latest
 * videos" strip on a YouTube channel page. No app chrome. Each
 * thumbnail has a title + view count below. One is "Now playing" with
 * a subtle highlight. Cycles automatically.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const VIEWS = ["12K views", "48K views", "184K views"];
const WHEN = ["3 weeks ago", "2 months ago", "6 months ago"];

export default function Process64ChannelRow() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            let i = 0;
            const tick = () => {
              setActive(i);
              i = (i + 1) % 3;
              setTimeout(tick, 3000);
            };
            tick();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>From the channel</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.row}>
          {PROCESS_STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={`${styles.tile} ${active === i ? styles.tileOn : ""}`}
              onClick={() => setActive(i)}
            >
              <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                <span className={styles.dur}>{i === 0 ? "3:00" : i === 1 ? "5:42" : "4:18"}</span>
                {active === i && <span className={styles.nowPlaying}>● Now playing</span>}
                <div className={styles.playOverlay}>
                  <span className={styles.playGlyph}>▶</span>
                </div>
              </div>
              <div className={styles.meta}>
                <h3 className={styles.tileTitle}>{s.title}</h3>
                <p className={styles.tileSub}>A2 Media · {VIEWS[i]} · {WHEN[i]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
