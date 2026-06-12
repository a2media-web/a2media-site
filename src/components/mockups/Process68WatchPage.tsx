"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process68WatchPage.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Merge: Carousel layout + Channel-row thumbnails.
 *
 * YouTube watch-page DNA. One big featured "player" card on top showing
 * the active step (thumbnail + title + desc). Below it: a small row of
 * 3 "Up next" thumbnails, one of which is the currently-playing one
 * (highlighted). Auto-cycles. Click any thumbnail to jump.
 *
 * Combines the focus of a carousel (one big thing on screen) with the
 * familiarity of a YouTube channel row (3 thumbnails visible).
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const VIEWS = ["12K views", "48K views", "184K views"];
const DUR = ["3:00", "5:42", "4:18"];

export default function Process68WatchPage() {
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
              i = (i + 1) % 3;
              setActive(i);
              setTimeout(tick, 3800);
            };
            setTimeout(tick, 3800);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const s = PROCESS_STEPS[active];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>From the channel</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.watch}>
          {/* Featured "player" card */}
          <div className={styles.player}>
            <div className={styles.playerThumb} style={{ background: `linear-gradient(135deg, ${COLORS[active]}, var(--a2-night-core))` }} key={active}>
              <div className={styles.thumbBg}>
                <span className={styles.bgDot} style={{ background: COLORS[active] }} />
                <span className={styles.bgDot2} style={{ background: COLORS[active] }} />
              </div>
              <div className={styles.playerOverlay}>
                <span className={styles.bigPlay}>▶</span>
              </div>
              <span className={styles.playerDur}>{DUR[active]}</span>
              <span className={styles.playerStep}>STEP {active + 1} OF 3</span>
              <div className={styles.scrub}>
                <div className={styles.scrubFill} style={{ background: COLORS[active] }} />
                <span className={styles.scrubHead} style={{ background: COLORS[active] }} />
              </div>
            </div>

            <div className={styles.playerMeta} key={`m-${active}`}>
              <p className={styles.playerEyebrow} style={{ color: COLORS[active] }}>{s.eyebrow}</p>
              <h3 className={styles.playerTitle}>{s.title}</h3>
              <p className={styles.playerDesc}>{s.desc}</p>
              <div className={styles.playerSub}>
                <span className={styles.channel}>
                  <span className={styles.channelAvatar}>A2</span>
                  A2 Media · {VIEWS[active]}
                </span>
                <span className={styles.dot} />
                <span className={styles.timeAgo}>{active === 0 ? "Week 1-2" : active === 1 ? "Week 3-12" : "Week 13-26"}</span>
              </div>
            </div>
          </div>

          {/* Up next queue */}
          <div className={styles.queueHead}>
            <span>Up next</span>
            <span className={styles.queueCount}>3 of 3 from A2 Media</span>
          </div>
          <div className={styles.queue}>
            {PROCESS_STEPS.map((step, i) => (
              <button
                key={step.title}
                type="button"
                className={`${styles.queueTile} ${active === i ? styles.queueTileOn : ""}`}
                onClick={() => setActive(i)}
              >
                <div className={styles.queueThumb} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                  <span className={styles.queueDur}>{DUR[i]}</span>
                  {active === i && <span className={styles.queueNow}>● Playing</span>}
                </div>
                <div className={styles.queueMeta}>
                  <span className={styles.queueStep}>Step {i + 1}</span>
                  <span className={styles.queueTitle}>{step.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
