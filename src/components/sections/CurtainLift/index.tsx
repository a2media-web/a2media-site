"use client";

/* C-3-2 — Curtain Lift.
 * Cards live ONCE in the DOM. During the morph sticky scroll, they're
 * rendered via position:fixed at calculated Y (center → top). When panel
 * area arrives at the cards' anchor, they're switched to position:sticky
 * inside panel area — same DOM elements, no re-render, smooth handoff.
 * Like a curtain rising from center to top and pinning there.
 */

import { useEffect, useRef, useState } from "react";
import { STUDIES, TICKER, range } from "../StoryScroll/_shared";
import styles from "./CurtainLift.module.css";

const ANCHOR_TOP_PX = 100;

export default function CurtainLift() {
  const morphRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [cardsFixed, setCardsFixed] = useState(true);
  const [activeId, setActiveId] = useState(STUDIES[0].id);
  const study = STUDIES.find((s) => s.id === activeId) ?? STUDIES[0];

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = morphRef.current;
      const slot = slotRef.current;
      if (!w || !slot) return;
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);

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
  const headingOpacity = (1 - range(progress, 0.55, 0.78)) * successOpacity;

  // Cards visible during success phase. Position interpolates from
  // viewport center down to the anchor at top:100px.
  const cardsOpacity = range(progress, 0.45, 0.7);
  // Lift progress: 0 = center of viewport, 1 = anchor (top:100px)
  const liftProgress = range(progress, 0.55, 0.85);

  // top: lerp(50vh, ANCHOR_TOP_PX)
  const cardsTopVh = 50 - liftProgress * 50;
  const cardsTopPx = liftProgress * ANCHOR_TOP_PX;
  // translateY: lerp(-50%, 0)
  const cardsTransY = -(1 - liftProgress) * 50;

  const cards = (
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
  );

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

      {/* CURTAIN LIFT — single set of cards, fixed during morph, sticky
          after handoff. */}
      {cardsFixed ? (
        <div
          className={styles.cardsFixed}
          style={{
            opacity: cardsOpacity,
            top: `calc(${cardsTopVh}vh + ${cardsTopPx}px)`,
            transform: `translate(-50%, ${cardsTransY}%)`,
          }}
        >
          {cards}
        </div>
      ) : null}

      <div className={styles.panelArea}>
        <div className={styles.panelInner}>
          <div className={styles.panelHead}>
            <p className={styles.panelEyebrow}>The receipts</p>
            <h2 className={styles.panelHeading}>Case Studies</h2>
          </div>

          {/* Slot — when cards are NOT fixed, they live HERE as
              position:sticky so they remain pinned while panel scrolls. */}
          <div ref={slotRef} className={styles.cardsSlot}>
            {!cardsFixed ? (
              <div className={styles.cardsSticky}>{cards}</div>
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
