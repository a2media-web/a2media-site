"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts8Slot.module.css";

/**
 * Option 8: Slot machine.
 *
 * Six vertical drum reels. Each reel spins infinite digits, then lands
 * on its target value. Reels stop one at a time, cha-cha-CHA style.
 * "JACKPOT" overlay flashes once all reels settle. Casino metaphor +
 * the "we pay out" wordplay. Loud, memorable, on-brand-with-a-wink.
 */

const STATS = [
  { value: "30+", label: "B2B Brands Served" },
  { value: "18mo", label: "Avg. Client Tenure" },
  { value: "35%", label: "Faster Close Rates" },
  { value: "72hr", label: "Avg. Turnaround" },
  { value: "600+", label: "Videos Delivered" },
  { value: "4.9/5", label: "Client Rating" },
];

export default function Receipts8Slot() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [spinning, setSpinning] = useState<boolean[]>(() => STATS.map(() => false));
  const [settled, setSettled] = useState(false);
  const [pull, setPull] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting && pull === 0) setPull(1);
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [pull]);

  useEffect(() => {
    if (pull === 0) return;
    setSettled(false);
    setSpinning(STATS.map(() => true));
    const stops: ReturnType<typeof setTimeout>[] = [];
    STATS.forEach((_, i) => {
      stops.push(
        setTimeout(() => {
          setSpinning((prev) => {
            const next = [...prev];
            next[i] = false;
            return next;
          });
          if (i === STATS.length - 1) {
            setTimeout(() => setSettled(true), 350);
          }
        }, 900 + i * 320),
      );
    });
    return () => stops.forEach(clearTimeout);
  }, [pull]);

  return (
    <section ref={ref as unknown as React.RefObject<HTMLDivElement>} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>House always pays out.</p>

        <div className={styles.machine}>
          <div className={styles.bezel}>
            <div className={styles.reels}>
              {STATS.map((s, i) => (
                <div key={s.label} className={styles.reelSlot}>
                  <div className={`${styles.reel} ${spinning[i] ? styles.spinning : ""}`}>
                    {/* During spin, show a long blurred strip of random-looking values. */}
                    <span>{s.value}</span>
                    <span>—</span>
                    <span>—</span>
                    <span>—</span>
                    <span>—</span>
                    <span>{s.value}</span>
                  </div>
                  <p className={styles.reelLabel}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className={`${styles.jackpot} ${settled ? styles.jackpotShow : ""}`}>
              <span>★ JACKPOT ★</span>
            </div>
          </div>
          <button
            type="button"
            className={styles.lever}
            onClick={() => setPull((p) => p + 1)}
            aria-label="Pull lever to respin"
          >
            <span className={styles.leverBall} />
            <span className={styles.leverRod} />
            <span className={styles.leverText}>PULL TO RESPIN</span>
          </button>
        </div>
      </div>
    </section>
  );
}
