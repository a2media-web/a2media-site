"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LogoWall.module.css";

const ROW = [
  {
    name: "Reveal",
    headline: "Acquired by Crossbeam.",
    sub: "$600K · 40% faster close",
  },
  {
    name: "Auth0",
    headline: "Multi-year, 22K new subs.",
    sub: "5.2M+ views · 35% of event signups",
  },
  {
    name: "PartnerHacker",
    headline: "From $0 to acquired in 8 months.",
    sub: "$900K+ closed · 5,000 webinar attendees",
  },
];

export default function LogoWall() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The proof</p>
        <div className={styles.row}>
          {ROW.map((r, i) => (
            <div
              key={r.name}
              className={`${styles.cell} ${active ? styles.in : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={styles.logoMark}>
                <span className={styles.logoLetter}>
                  {r.name.charAt(0)}
                </span>
                <span className={styles.logoWord}>{r.name}</span>
              </div>
              <div className={styles.headline}>{r.headline}</div>
              <div className={styles.sub}>{r.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
