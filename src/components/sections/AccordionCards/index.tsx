"use client";

/* C-2-2 — Accordion Below Cards.
 * 3 cards in a row at the top of the panel section, always visible. Click
 * any card → its panel content expands/reveals beneath that specific card
 * (accordion). Click another → previous collapses, new one opens.
 */

import { useEffect, useRef, useState } from "react";
import { STUDIES, TICKER, range } from "../StoryScroll/_shared";
import styles from "./AccordionCards.module.css";

export default function AccordionCards() {
  const morphRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [openId, setOpenId] = useState<string | null>(STUDIES[0].id);

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
            <p className={styles.panelSub}>
              Click any card to read the story.
            </p>
          </div>

          <div className={styles.cardRow}>
            {STUDIES.map((s) => {
              const isOpen = s.id === openId;
              return (
                <div key={s.id} className={styles.cardCol}>
                  <button
                    type="button"
                    className={`${styles.card} ${isOpen ? styles.cardActive : ""}`}
                    onClick={() => setOpenId(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                  >
                    <div className={styles.bigStat}>{s.bigStat}</div>
                    <div className={styles.bigLabel}>{s.bigLabel}</div>
                    <div className={styles.bigSub}>{s.bigSub}</div>
                    <span
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                      aria-hidden
                    >
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" width="16" height="16">
                        <path d="M5 8L10 13L15 8" />
                      </svg>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Accordion panel — sits beneath the active card column */}
          <div className={styles.accordionRow}>
            {STUDIES.map((s) => {
              const isOpen = s.id === openId;
              if (!isOpen) return null;
              return (
                <div
                  key={s.id}
                  className={styles.panel}
                  role="region"
                  aria-label={`${s.name} case study`}
                >
                  <div className={styles.connector} aria-hidden />
                  <div className={styles.stats}>
                    {s.stats.map((stat) => (
                      <div key={stat.label} className={styles.stat}>
                        <div className={styles.statNum}>{stat.num}</div>
                        <div className={styles.statLabel}>
                          {stat.label}
                          {stat.sub ? (
                            <>
                              <br />
                              <span className={styles.statSub}>{stat.sub}</span>
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
                      <p>{s.before}</p>
                    </div>
                    <div className={styles.block}>
                      <div className={`${styles.blockLabel} ${styles.after}`}>
                        <span className={styles.dotMark} /> After A2
                      </div>
                      <p>{s.after}</p>
                    </div>
                  </div>

                  <div className={styles.engine}>
                    <div className={styles.engineLabel}>
                      <span className={styles.gear} aria-hidden>⚙</span>{" "}
                      {s.videoEngine.title}
                    </div>
                    <p className={styles.engineBody}>{s.videoEngine.body}</p>
                  </div>

                  {s.closingPill ? (
                    <div className={styles.closingPill}>
                      {s.closingPill.text}{" "}
                      <strong>{s.closingPill.emphasis}</strong>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
