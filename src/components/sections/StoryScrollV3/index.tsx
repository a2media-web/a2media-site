"use client";

/* Variant 3 — No tabs. Cards are previews; all 3 panels stacked.
 *  Phases: Without Video → With Video + 3 cards (preview) → cards scroll up
 *  out of view normally → 3 full case study panels render sequentially below.
 *  No clicking, no nav. Just scroll.
 */

import { useEffect, useRef, useState } from "react";
import { STUDIES, TICKER, range } from "../StoryScroll/_shared";
import styles from "./StoryScrollV3.module.css";

export default function StoryScrollV3() {
  const morphRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = morphRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const failOpacity = 1 - range(progress, 0.25, 0.45);
  const successOpacity = range(progress, 0.35, 0.6);

  return (
    <section className={styles.section}>
      <div ref={morphRef} className={styles.morphArea}>
        <div className={styles.morphSticky}>
          <div
            className={styles.failLayer}
            style={{
              opacity: failOpacity,
              pointerEvents: failOpacity > 0.05 ? "auto" : "none",
            }}
            aria-hidden={failOpacity < 0.05}
          >
            <p className={styles.eyebrowFail}>Without Video Content</p>
            <h2 className={styles.headingFail}>
              You&apos;re spending more and closing less, because each one of
              your video attempts dies before it compounds.
            </h2>
            <div className={styles.tickerWrap}>
              <div className={styles.ticker}>
                {[...TICKER, ...TICKER].map((t, i) => (
                  <span key={i} className={styles.tickerItem}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className={styles.bottomFail}>There&apos;s a better way.</p>
          </div>

          <div
            className={styles.successLayer}
            style={{ opacity: successOpacity }}
          >
            <p className={styles.eyebrowSuccess}>With Video Content</p>
            <h2 className={styles.headingSuccess}>
              Deals move faster because{" "}
              <span>your prospects already trust you.</span>
            </h2>
            <div className={styles.previewRow}>
              {STUDIES.map((s) => (
                <div key={s.id} className={styles.previewCard}>
                  <div className={styles.bigStat}>{s.bigStat}</div>
                  <div className={styles.bigLabel}>{s.bigLabel}</div>
                  <div className={styles.bigSub}>{s.bigSub}</div>
                </div>
              ))}
            </div>
            <p className={styles.scrollHint}>
              Three teams. Three stories. <span>Keep scrolling.</span>
            </p>
          </div>
        </div>
      </div>

      {/* All 3 case studies as full vertical panels */}
      <div className={styles.studyStack}>
        <div className={styles.studyHead}>
          <p className={styles.panelEyebrow}>The receipts</p>
          <h2 className={styles.panelHeading}>Case Studies</h2>
        </div>

        {STUDIES.map((study, i) => (
          <div key={study.id} className={styles.studyBlock}>
            <div className={styles.studyHeader}>
              <span className={styles.studyIdx}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className={styles.studyName}>{study.name}</div>
                <div className={styles.studyOutcome}>{study.tabOutcome}</div>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.stats}>
                {study.stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <div className={styles.statNum}>{s.num}</div>
                    <div className={styles.statLabel}>
                      {s.label}
                      {s.sub ? (
                        <>
                          <br />
                          <span className={styles.statSub}>{s.sub}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.story}>
                <div className={styles.block}>
                  <div className={`${styles.blockLabel} ${styles.before}`}>
                    <span className={styles.dot} /> Before A2
                  </div>
                  <p>{study.before}</p>
                </div>
                <div className={styles.block}>
                  <div className={`${styles.blockLabel} ${styles.after}`}>
                    <span className={styles.dot} /> After A2
                  </div>
                  <p>{study.after}</p>
                </div>
              </div>

              <div className={styles.engine}>
                <div className={styles.engineLabel}>
                  <span className={styles.gear} aria-hidden>
                    ⚙
                  </span>{" "}
                  {study.videoEngine.title}
                </div>
                <p className={styles.engineBody}>{study.videoEngine.body}</p>
              </div>

              {study.closingPill ? (
                <div className={styles.closingPill}>
                  {study.closingPill.text}{" "}
                  <strong>{study.closingPill.emphasis}</strong>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
