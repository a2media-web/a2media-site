"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process35Shorts.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Video concept: vertical Shorts feed inside a phone.
 *
 * Phone bezel framing. Three Shorts stack vertically and auto-scroll
 * one-up every ~3 seconds. Each Short is one step (eyebrow + title in
 * giant caption text, with floating like/comment/share icons and a
 * "swipe up" hint between). View counter ticks up as each Short comes
 * into frame. Reads as "this is what content looks like in the wild."
 */

const VIEWS = ["12.4K", "48.2K", "184K"];
const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process35Shorts() {
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
            const loop = () => {
              i = (i + 1) % 3;
              setActive(i);
              setTimeout(loop, 3200);
            };
            setTimeout(loop, 1800);
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
        <p className={styles.eyebrow}>YouTube Shorts · the feed</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.stage}>
          <div className={styles.phone}>
            <div className={styles.notch} />
            <div className={styles.screen}>
              <div className={styles.feed} style={{ transform: `translateY(-${active * 100}%)` }}>
                {PROCESS_STEPS.map((s, i) => (
                  <div
                    key={s.title}
                    className={styles.short}
                    style={{ background: `radial-gradient(circle at 30% 20%, ${COLORS[i]}33, var(--a2-night-core) 70%)` }}
                  >
                    <div className={styles.shortBg}>
                      <span className={styles.bgDot} style={{ background: COLORS[i] }} />
                      <span className={styles.bgDot2} style={{ background: COLORS[i] }} />
                    </div>
                    <div className={styles.shortTop}>
                      <span className={styles.live}>● LIVE EDIT</span>
                      <span className={styles.dur}>0:{(15 + i * 8).toString().padStart(2, "0")}</span>
                    </div>
                    <div className={styles.shortMid}>
                      <p className={styles.eyebrowShort}>{s.eyebrow.replace(":", "")}</p>
                      <h3 className={styles.titleShort}>{s.title}</h3>
                    </div>
                    <div className={styles.shortBottom}>
                      <div className={styles.handle}>
                        <span className={styles.avatar}>A2</span>
                        <span className={styles.handleText}>@a2media</span>
                        <button type="button" className={styles.followBtn}>Subscribed</button>
                      </div>
                      <p className={styles.caption}>{s.desc.slice(0, 90)}…</p>
                    </div>
                    <div className={styles.shortSide}>
                      <SideIcon label="❤" count={VIEWS[i]} />
                      <SideIcon label="💬" count={i === 0 ? "124" : i === 1 ? "892" : "2.1K"} />
                      <SideIcon label="↗" count="Share" />
                      <SideIcon label="≡" count="Save" />
                    </div>
                    <div className={styles.swipeHint}>swipe up ↑</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.homebar} />
          </div>

          <div className={styles.cards}>
            <p className={styles.cardsTitle}>What you&apos;re watching:</p>
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.title} className={`${styles.card} ${active === i ? styles.cardOn : ""}`}>
                <span className={styles.cardChip} style={{ borderColor: COLORS[i], color: COLORS[i] }}>
                  Now playing
                </span>
                <p className={styles.cardEyebrow}>{s.eyebrow}</p>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SideIcon({ label, count }: { label: string; count: string }) {
  return (
    <div className={styles.sideIcon}>
      <span className={styles.sideGlyph}>{label}</span>
      <span className={styles.sideCount}>{count}</span>
    </div>
  );
}
