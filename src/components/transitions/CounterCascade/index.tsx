"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CounterCascade.module.css";

const STATS = [
  { target: 600, prefix: "$", suffix: "K", label: "Reveal — closed-won revenue", delay: 0 },
  { target: 22, prefix: "", suffix: "K", label: "Auth0 — new organic subs", delay: 200 },
  { target: 900, prefix: "$", suffix: "K+", label: "PartnerHacker — sponsorships", delay: 400 },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({
  target,
  prefix,
  suffix,
  active,
  delay,
}: {
  target: number;
  prefix: string;
  suffix: string;
  active: boolean;
  delay: number;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const startAt = performance.now() + delay;
    const duration = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = (t - startAt) / duration;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const e = Math.min(1, elapsed);
      setV(target * easeOutCubic(e));
      if (e < 1) raf = requestAnimationFrame(tick);
      else setV(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, delay]);
  return (
    <>
      {prefix}
      {Math.round(v).toLocaleString()}
      {suffix}
    </>
  );
}

export default function CounterCascade() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The headline numbers</p>
        <div className={styles.row}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.num}>
                <Counter
                  target={s.target}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  active={active}
                  delay={s.delay}
                />
              </div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
        <p className={styles.tagline}>
          Three teams. Three stories. <span>Same engine.</span>
        </p>
        <div className={styles.chevron} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
