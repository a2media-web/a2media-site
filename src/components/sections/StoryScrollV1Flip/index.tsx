"use client";

/* C-1-1 — FLIP-style: ONE card row, position:fixed during sticky, switches
 * to position:relative once panel area scrolls into the cards' anchor
 * position. No duplicate render.
 */

import { useEffect, useRef, useState } from "react";
import { STUDIES, TICKER, range } from "../StoryScroll/_shared";
import styles from "./StoryScrollV1Flip.module.css";

const ANCHOR_TOP_PX = 120;

export default function StoryScrollV1Flip() {
  const morphRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cardSlotRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [cardsFixed, setCardsFixed] = useState(true);
  const [activeId, setActiveId] = useState(STUDIES[0].id);
  const study = STUDIES.find((s) => s.id === activeId) ?? STUDIES[0];

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const morph = morphRef.current;
      const slot = cardSlotRef.current;
      if (!morph || !slot) return;

      const morphRect = morph.getBoundingClientRect();
      const total = morph.offsetHeight - window.innerHeight;
      const scrolled = -morphRect.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);

      // Slot is the placeholder where cards LIVE in static layout. When the
      // slot's top is at or above the cards' anchor position, we hand off to
      // static rendering.
      const slotRect = slot.getBoundingClientRect();
      setCardsFixed(slotRect.top > ANCHOR_TOP_PX);
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

  const failOpacity = 1 - range(progress, 0.25, 0.4);
  const successOpacity = range(progress, 0.3, 0.5);
  const headingOpacity = (1 - range(progress, 0.55, 0.75)) * successOpacity;

  // Cards visible during success phase, slide up from below to anchor
  const cardsOpacity = range(progress, 0.45, 0.65);
  // translateY: 50vh (below center) -> 0 (anchor)
  const slideY = (1 - range(progress, 0.5, 0.78)) * 50;

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
          </div>
        </div>
      </div>

      {/* CARDS — position:fixed during morph, position:relative once panel
          area's slot reaches the anchor. The slot reserves space so layout
          doesn't shift when cards return to flow. */}
      {cardsFixed ? (
        <div
          className={styles.cardRowFixed}
          style={{
            opacity: cardsOpacity,
            transform: `translate(-50%, ${slideY}vh)`,
          }}
        >
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
                <div className={styles.bigSub}>{s.bigSub}</div>
                <div
                  className={styles.activeDot}
                  style={{ opacity: isActive ? 1 : 0 }}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      ) : null}

      <div ref={panelRef} className={styles.panelArea}>
        <div className={styles.panelInner}>
          <div className={styles.panelHead}>
            <p className={styles.panelEyebrow}>The receipts</p>
            <h2 className={styles.panelHeading}>Case Studies</h2>
            <p className={styles.panelSub}>
              Here&apos;s what happens when you start building trust and
              community with video.
            </p>
          </div>

          {/* Slot — reserves card-row space so panel content stays in place
              whether cards are fixed or static. When NOT fixed, cards are
              rendered HERE (inside the slot). */}
          <div ref={cardSlotRef} className={styles.cardSlot}>
            {!cardsFixed ? (
              <div className={styles.cardRow}>
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
                      <div className={styles.bigSub}>{s.bigSub}</div>
                      <div
                        className={styles.activeDot}
                        style={{ opacity: isActive ? 1 : 0 }}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
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
