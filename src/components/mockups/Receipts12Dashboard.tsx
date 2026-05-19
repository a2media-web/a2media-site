"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts12Dashboard.module.css";

/**
 * Option 12: Automotive dashboard cluster.
 *
 * Six analog gauges (speedometer / tachometer style). Each needle
 * sweeps from 0 to its position when the section enters viewport. Tick
 * marks around each dial, red zones for the high end. Pure motion +
 * craft. Reads as "performance" and "precision" without saying it.
 */

const GAUGES = [
  { value: 30,  max: 50,  unit: "+",   label: "Brands Served",    redline: 40 },
  { value: 18,  max: 24,  unit: "mo",  label: "Avg Tenure",       redline: 20 },
  { value: 35,  max: 50,  unit: "%",   label: "Faster Close",     redline: 40 },
  { value: 72,  max: 96,  unit: "hr",  label: "Turnaround",       redline: 80 },
  { value: 600, max: 800, unit: "+",   label: "Videos Delivered", redline: 650 },
  { value: 4.9, max: 5,   unit: "/5",  label: "Client Rating",    redline: 4.8 },
];

const NEEDLE_SWEEP = 240; // degrees the needle can travel

function Gauge({ g, fire, idx }: { g: typeof GAUGES[number]; fire: boolean; idx: number }) {
  const [angle, setAngle] = useState(-120);
  useEffect(() => {
    if (!fire) return;
    const target = -120 + (g.value / g.max) * NEEDLE_SWEEP;
    // small per-gauge stagger so all six don't sweep in lockstep
    const t = setTimeout(() => setAngle(target), idx * 120);
    return () => clearTimeout(t);
  }, [fire, g.value, g.max, idx]);

  return (
    <div className={styles.gauge}>
      <div className={styles.dial}>
        <svg className={styles.dialSvg} viewBox="0 0 200 200" aria-hidden>
          {/* outer ring */}
          <circle cx="100" cy="100" r="92" className={styles.dialRing} />
          {/* tick marks — major every 30deg, minor every 10deg */}
          {Array.from({ length: 25 }).map((_, i) => {
            const a = (-120 + i * 10) * (Math.PI / 180);
            const isMajor = i % 3 === 0;
            const inner = isMajor ? 70 : 76;
            const outer = 84;
            const isRedline = (i / 24) * g.max >= g.redline;
            return (
              <line
                key={i}
                x1={100 + Math.cos(a) * inner}
                y1={100 + Math.sin(a) * inner}
                x2={100 + Math.cos(a) * outer}
                y2={100 + Math.sin(a) * outer}
                className={isRedline ? styles.tickRed : isMajor ? styles.tickMajor : styles.tickMinor}
              />
            );
          })}
          {/* needle */}
          <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px" }} className={styles.needleWrap}>
            <line x1="100" y1="100" x2="100" y2="22" className={styles.needle} />
            <circle cx="100" cy="100" r="9" className={styles.needleHub} />
            <circle cx="100" cy="100" r="3" className={styles.needleHubDot} />
          </g>
        </svg>
        <div className={styles.readout}>
          <span className={styles.value}>
            {g.value}
            <span className={styles.unit}>{g.unit}</span>
          </span>
          <span className={styles.label}>{g.label}</span>
        </div>
      </div>
    </div>
  );
}

export default function Receipts12Dashboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [fire, setFire] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setFire(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref as unknown as React.RefObject<HTMLDivElement>} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Instrument cluster, redline edition.</p>

        <div className={styles.cluster}>
          {GAUGES.map((g, i) => (
            <Gauge key={g.label} g={g} fire={fire} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
