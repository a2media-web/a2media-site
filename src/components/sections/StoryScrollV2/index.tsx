"use client";

/* Variant 2 — Active card expands.
 *  Phases: Without Video → With Video + 3 cards (equal width) → as user
 *  scrolls past, layout shifts: the active card grows wider (2/4) and the
 *  other 2 cards compress to slimmer cards on the side. Click any inactive
 *  card → it expands, previous one compresses. Below the row: full panel.
 */

import { useEffect, useRef, useState } from "react";
import { STUDIES, TICKER, range } from "../StoryScroll/_shared";
import styles from "./StoryScrollV2.module.css";

export default function StoryScrollV2() {
  const morphRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(STUDIES[0].id);
  const study = STUDIES.find((s) => s.id === activeId) ?? STUDIES[0];

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

  const failOpacity = 1 - range(progress, 0.25, 0.4);
  const successOpacity = range(progress, 0.3, 0.5);
  const cardsAppear = range(progress, 0.35, 0.55);
  // 0 = equal-width row, 1 = active card 2x wider
  const expand = range(progress, 0.65, 0.85);
  const headingOpacity = 1 - range(progress, 0.6, 0.85);

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
            <div
              className={styles.successHead}
              style={{ opacity: headingOpacity }}
            >
              <p className={styles.eyebrowSuccess}>With Video Content</p>
              <h2 className={styles.headingSuccess}>
                Deals move faster because{" "}
                <span>your prospects already trust you.</span>
              </h2>
            </div>

            <div
              className={styles.cardRow}
              style={
                {
                  ["--expand" as string]: expand,
                } as React.CSSProperties
              }
            >
              {STUDIES.map((s, i) => {
                const stagger = cardsAppear - i * 0.08 > 0 ? 1 : 0;
                const cardOpacity =
                  stagger * range(progress, 0.35 + i * 0.04, 0.55 + i * 0.04);
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                    style={{
                      opacity: cardOpacity,
                      pointerEvents: expand > 0.4 ? "auto" : "none",
                      cursor: expand > 0.4 ? "pointer" : "default",
                    }}
                    onClick={() => expand > 0.4 && setActiveId(s.id)}
                    aria-pressed={isActive}
                  >
                    <div className={styles.bigStat}>{s.bigStat}</div>
                    <div className={styles.bigLabel}>{s.bigLabel}</div>
                    <div
                      className={styles.bigSub}
                      style={{
                        // Sub line shrinks/fades when card is compressed
                        opacity: isActive ? 1 : 1 - expand * 0.8,
                      }}
                    >
                      {s.bigSub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.panelArea}>
        <div className={styles.panelInner}>
          <div className={styles.panelHead}>
            <p className={styles.panelEyebrow}>The receipts</p>
            <h2 className={styles.panelHeading}>Case Studies</h2>
            <p className={styles.panelSub}>
              Click any card to read the story.
            </p>
          </div>

          {/* Same expanding card row in static flow */}
          <div className={`${styles.cardRow} ${styles.cardRowStatic}`}>
            {STUDIES.map((s) => {
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                  onClick={() => setActiveId(s.id)}
                  aria-pressed={isActive}
                >
                  <div className={styles.bigStat}>{s.bigStat}</div>
                  <div className={styles.bigLabel}>{s.bigLabel}</div>
                  <div
                    className={styles.bigSub}
                    style={{ opacity: isActive ? 1 : 0.4 }}
                  >
                    {s.bigSub}
                  </div>
                </button>
              );
            })}
          </div>

          <div className={styles.panel} role="tabpanel" key={study.id}>
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
