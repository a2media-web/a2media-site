"use client";

/* C-2-1 — Single Card Carousel.
 * Only ONE big card visible at a time. Below: pagination dots + arrows to
 * advance. Panel content for the active study renders beneath the card.
 */

import { useEffect, useRef, useState } from "react";
import { STUDIES, TICKER, range } from "../StoryScroll/_shared";
import styles from "./CardCarousel.module.css";

export default function CardCarousel() {
  const morphRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const study = STUDIES[activeIdx];

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
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const failOpacity = 1 - range(progress, 0.3, 0.55);
  const successOpacity = range(progress, 0.4, 0.7);

  const next = () => setActiveIdx((i) => (i + 1) % STUDIES.length);
  const prev = () => setActiveIdx((i) => (i - 1 + STUDIES.length) % STUDIES.length);

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
          </div>
        </div>
      </div>

      <div className={styles.panelArea}>
        <div className={styles.panelInner}>
          <div className={styles.panelHead}>
            <p className={styles.panelEyebrow}>The receipts</p>
            <h2 className={styles.panelHeading}>Case Studies</h2>
          </div>

          <div className={styles.carousel}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
              aria-label="Previous case study"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className={styles.cardWrap} key={study.id}>
              <div className={styles.card}>
                <div className={styles.bigStat}>{study.bigStat}</div>
                <div className={styles.bigLabel}>{study.bigLabel}</div>
                <div className={styles.bigSub}>{study.bigSub}</div>
              </div>
            </div>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
              aria-label="Next case study"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className={styles.dots} role="tablist">
            {STUDIES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`View ${s.name}`}
                className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ""}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className={styles.dotName}>{s.tabName}</span>
              </button>
            ))}
          </div>

          <div className={styles.panel} role="tabpanel" key={`panel-${study.id}`}>
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
                  <span className={styles.dotMark} /> Before A2
                </div>
                <p>{study.before}</p>
              </div>
              <div className={styles.block}>
                <div className={`${styles.blockLabel} ${styles.after}`}>
                  <span className={styles.dotMark} /> After A2
                </div>
                <p>{study.after}</p>
              </div>
            </div>

            <div className={styles.engine}>
              <div className={styles.engineLabel}>
                <span className={styles.gear} aria-hidden>⚙</span>{" "}
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
      </div>
    </section>
  );
}
