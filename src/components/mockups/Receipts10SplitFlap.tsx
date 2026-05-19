"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts10SplitFlap.module.css";

/**
 * Option 10: Split-flap departure board.
 *
 * Airport / train station style. Each row is one stat. Characters cycle
 * rapidly through digits/letters before settling on the target — the
 * familiar mechanical click-clack feel of a Solari board. Adds gravitas
 * + a hint of retro tactility. Reads as "official" without being stuffy.
 */

const STATS = [
  { value: "30+",   label: "B2B BRANDS SERVED" },
  { value: "18MO",  label: "AVG CLIENT TENURE" },
  { value: "35%",   label: "FASTER CLOSE RATES" },
  { value: "72HR",  label: "AVG TURNAROUND" },
  { value: "600+",  label: "VIDEOS DELIVERED" },
  { value: "4.9/5", label: "CLIENT RATING" },
];

const FLAP_CHARS = "0123456789+%/.MOHR";

function FlapCell({ target, start }: { target: string; start: boolean }) {
  const [char, setChar] = useState(" ");
  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const total = 22 + Math.floor(Math.random() * 14);
    const id = setInterval(() => {
      frame++;
      if (frame >= total) {
        setChar(target);
        clearInterval(id);
      } else {
        setChar(FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)]);
      }
    }, 55);
    return () => clearInterval(id);
  }, [start, target]);
  return (
    <span className={styles.flap}>
      <span className={styles.flapChar}>{char}</span>
    </span>
  );
}

function FlapValue({ value, start }: { value: string; start: boolean }) {
  const chars = value.split("");
  return (
    <span className={styles.flapValue}>
      {chars.map((c, i) => (
        <FlapCell key={i} target={c} start={start} />
      ))}
    </span>
  );
}

export default function Receipts10SplitFlap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <section ref={ref as unknown as React.RefObject<HTMLDivElement>} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Now boarding at gate A2.</p>

        <div className={styles.board}>
          <div className={styles.boardHead}>
            <span className={styles.headCol}>STATUS</span>
            <span className={styles.headCol}>METRIC</span>
            <span className={`${styles.headCol} ${styles.right}`}>FIGURE</span>
            <span className={`${styles.headCol} ${styles.right}`}>UPDATED</span>
          </div>
          <div className={styles.divider} />
          {STATS.map((s) => (
            <div key={s.label} className={styles.row}>
              <span className={styles.status}>● LIVE</span>
              <span className={styles.label}>{s.label}</span>
              <span className={`${styles.value} ${styles.right}`}>
                <FlapValue value={s.value} start={started} />
              </span>
              <span className={`${styles.time} ${styles.right}`}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
