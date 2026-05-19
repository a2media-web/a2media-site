"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process5MissionControl.module.css";

/**
 * Option 5: Mission control console.
 *
 * Three system panels arranged like an Apollo command desk. Each panel
 * has a status header, a row of indicator lights, a primary "ENGAGE"
 * button, and a system readout. As the user scrolls, each panel sequences
 * through STANDBY → ENGAGING → ONLINE. Clicking a panel re-runs that
 * system. NASA / NORAD / SpaceX dashboard energy.
 */

const SYSTEMS = [
  {
    id: "S-01",
    name: "BUYER PSYCHOLOGY",
    title: "The 3-Week Jumpstart",
    desc: "Sales calls, competitor content, comments. Custom roadmap, scripts written, distribution mapped.",
    indicators: ["RESEARCH", "ROADMAP", "SCRIPTS"],
  },
  {
    id: "S-02",
    name: "VIDEO ENGINE",
    title: "Build & Ship",
    desc: "Video system designed for your team. World-class edits in 48 to 72 hours. New videos every week.",
    indicators: ["DESIGN", "EDIT", "SHIP"],
  },
  {
    id: "S-03",
    name: "PIPELINE COMPOUND",
    title: "Trust & Pipeline",
    desc: "Sales sends in deals. Prospects educated. Video becomes a primary pipeline driver.",
    indicators: ["SEND", "TRUST", "COMPOUND"],
  },
];

type Status = "STANDBY" | "ENGAGING" | "ONLINE";

function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`${styles.pill} ${styles[`pill_${status}`]}`}>
      <span className={styles.pillDot} />
      {status}
    </span>
  );
}

export default function Process5MissionControl() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [statuses, setStatuses] = useState<Status[]>(["STANDBY", "STANDBY", "STANDBY"]);

  const engage = (i: number) => {
    setStatuses((prev) => {
      const next = [...prev];
      next[i] = "ENGAGING";
      return next;
    });
    setTimeout(() => {
      setStatuses((prev) => {
        const next = [...prev];
        next[i] = "ONLINE";
        return next;
      });
    }, 1100);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            // Sequence each system online with a small delay between
            [0, 1, 2].forEach((i) => setTimeout(() => engage(i), 800 + i * 1600));
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <p className={styles.eyebrow}>Mission Control · A2 Pipeline System</p>
            <h2 className={styles.heading}>
              Three systems. <span className={styles.italic}>One pipeline.</span>
            </h2>
          </div>
          <div className={styles.headRight}>
            <div className={styles.headRow}>
              <span>MISSION</span>
              <span>A2-{new Date().getFullYear()}</span>
            </div>
            <div className={styles.headRow}>
              <span>STATUS</span>
              <span className={styles.headStatus}>
                {statuses.every((s) => s === "ONLINE") ? "ALL SYSTEMS GO" : "ENGAGING"}
              </span>
            </div>
            <div className={styles.headRow}>
              <span>OPERATOR</span>
              <span>A.ADELAKUN</span>
            </div>
          </div>
        </div>

        <div className={styles.consoles}>
          {SYSTEMS.map((s, i) => (
            <div
              key={s.id}
              className={`${styles.console} ${statuses[i] === "ONLINE" ? styles.consoleOnline : ""} ${statuses[i] === "ENGAGING" ? styles.consoleEngaging : ""}`}
            >
              <div className={styles.consoleHead}>
                <span className={styles.systemId}>{s.id}</span>
                <StatusPill status={statuses[i]} />
              </div>
              <p className={styles.systemName}>{s.name}</p>

              <div className={styles.indicators}>
                {s.indicators.map((ind, j) => (
                  <div
                    key={ind}
                    className={`${styles.indicator} ${statuses[i] === "ONLINE" || (statuses[i] === "ENGAGING" && j === 0) ? styles.indicatorOn : ""}`}
                  >
                    <span className={styles.indicatorLight} />
                    <span className={styles.indicatorLabel}>{ind}</span>
                  </div>
                ))}
              </div>

              <h3 className={styles.systemTitle}>{s.title}</h3>
              <p className={styles.systemDesc}>{s.desc}</p>

              <button
                type="button"
                className={styles.engageBtn}
                onClick={() => engage(i)}
                disabled={statuses[i] === "ENGAGING"}
              >
                {statuses[i] === "ONLINE" ? "RE-ENGAGE" : "ENGAGE"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
