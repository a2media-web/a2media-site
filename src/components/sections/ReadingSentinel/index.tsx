"use client";

/* C-3-3 — Reading Sentinel.
 * Cards anchored at top of section as a sticky header. All 3 panels render
 * vertically below. Active card highlights based on which panel is in
 * viewport (IntersectionObserver per panel). Cards become a "you are here"
 * indicator.
 */

import { useEffect, useRef, useState } from "react";
import { STUDIES, TICKER, range } from "../StoryScroll/_shared";
import styles from "./ReadingSentinel.module.css";

export default function ReadingSentinel() {
  const morphRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(STUDIES[0].id);

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

  // IntersectionObserver: active card = whichever panel is most in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).dataset.id;
          if (id) setActiveId(id);
        }
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    Object.values(panelRefs.current).forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const failOpacity = 1 - range(progress, 0.3, 0.55);
  const successOpacity = range(progress, 0.4, 0.7);

  const scrollToStudy = (id: string) => {
    const el = panelRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

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
              Three teams. Scroll to read each, or jump via the sentinel cards.
            </p>
          </div>

          {/* SENTINEL CURTAIN — pinned at top, auto-highlights based on
              which panel is currently being read */}
          <div className={styles.cardsSticky}>
            <div className={styles.cardRow}>
              {STUDIES.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                    onClick={() => scrollToStudy(s.id)}
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
          </div>

          {/* All 3 panels stacked vertically */}
          <div className={styles.studyStack}>
            {STUDIES.map((study, i) => (
              <div
                key={study.id}
                ref={(el) => {
                  panelRefs.current[study.id] = el;
                }}
                data-id={study.id}
                className={styles.studyBlock}
              >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
