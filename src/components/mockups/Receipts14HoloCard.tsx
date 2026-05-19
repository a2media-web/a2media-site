"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts14HoloCard.module.css";

/**
 * Option 14: Holographic trading card.
 *
 * A premium "trading card" with the A2 Media wordmark on the front and
 * the six stats laid out on the back. Card flips on click OR on hover.
 * Holographic foil shimmer follows the cursor across the surface — a
 * subtle conic-gradient mask that catches "light." Reads as collectible,
 * premium, distinctive.
 */

const STATS = [
  { value: "30+",   label: "BRANDS SERVED" },
  { value: "18mo",  label: "AVG TENURE" },
  { value: "35%",   label: "FASTER CLOSE" },
  { value: "72hr",  label: "TURNAROUND" },
  { value: "600+",  label: "VIDEOS DELIVERED" },
  { value: "4.9/5", label: "CLIENT RATING" },
];

export default function Receipts14HoloCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50, ry: 0, rx: 0 });

  // Auto-flip when the card scrolls into view, then unlock click-to-flip
  useEffect(() => {
    if (!cardRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTimeout(() => setFlipped(true), 600);
            io.disconnect();
          }
        }
      },
      { threshold: 0.45 },
    );
    io.observe(cardRef.current);
    return () => io.disconnect();
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const rx = (y - 50) * -0.12; // tilt up/down
    const ry = (x - 50) * 0.16;  // tilt left/right
    setPos({ x, y, rx, ry });
  }
  function onLeave() {
    setPos({ x: 50, y: 50, rx: 0, ry: 0 });
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Limited edition. 1 / 1.</p>

        <div className={styles.stage}>
          <div
            ref={cardRef}
            className={styles.cardWrap}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            onClick={() => setFlipped((f) => !f)}
            style={{
              transform: `perspective(1200px) rotateX(${pos.rx}deg) rotateY(${pos.ry + (flipped ? 180 : 0)}deg)`,
            }}
          >
            {/* FRONT */}
            <div className={styles.card}>
              <div
                className={styles.holo}
                style={{
                  background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.7), transparent 38%), conic-gradient(from 0deg, #5A33FF, #66f78e, #28DFE8, #8F45EE, #ff66cc, #5A33FF)`,
                }}
              />
              <div className={styles.cardContent}>
                <p className={styles.cardTag}>A2 MEDIA · 2026</p>
                <p className={styles.cardTitle}>
                  THE <span className={styles.cardTitleItalic}>RECEIPTS</span>
                </p>
                <p className={styles.cardSub}>Foil edition · Holographic</p>
                <div className={styles.cardFlipHint}>↻ Click to flip</div>
              </div>
            </div>
            {/* BACK */}
            <div className={`${styles.card} ${styles.cardBack}`}>
              <div
                className={styles.holoBack}
                style={{
                  background: `radial-gradient(circle at ${100 - pos.x}% ${pos.y}%, rgba(255,255,255,0.45), transparent 35%)`,
                }}
              />
              <div className={styles.cardContent}>
                <p className={styles.backTag}>STATS</p>
                <div className={styles.backGrid}>
                  {STATS.map((s) => (
                    <div key={s.label} className={styles.statBlock}>
                      <span className={styles.statValue}>{s.value}</span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.backFoot}>a2media.ca · CERTIFIED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
