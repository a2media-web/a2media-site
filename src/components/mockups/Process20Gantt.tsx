"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process20Gantt.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Editor-timeline alternative #1: Gantt-style project timeline.
 *
 * Same "horizontal progression" vibe as the Premiere timeline, but
 * dressed as a project plan everyone reads. Three horizontal bars (one
 * per step), spanning the weeks they cover. A "today" indicator marker
 * slides left to right, filling bars as it passes. Cards beneath give
 * the full live step copy.
 *
 * Reads instantly to CMOs / Heads of Marketing / anyone who's seen a
 * project plan in Notion, Asana, or a deck.
 */

// Step Three ends at 98% (not 100%) so the NOW label always has 2% of
// breathing room before the right edge — keeps it from kissing the chart
// boundary on tablet widths.
const BARS = [
  { label: "Step One", start: 0,  end: 18, weekLabel: "Weeks 1–3" },
  { label: "Step Two", start: 16, end: 70, weekLabel: "Weeks 4–12" },
  { label: "Step Three", start: 60, end: 98, weekLabel: "Weeks 13–26" },
];

export default function Process20Gantt() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [today, setToday] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const targets = [18, 60, 98];
            targets.forEach((t, i) => setTimeout(() => setToday(t), 1100 + i * 1300));
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
        <p className={styles.eyebrow}>The plan · 6 months</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.gantt}>
          <div className={styles.body}>
            <div className={styles.labelCol}>
              {BARS.map((b) => (
                <div key={b.label} className={styles.labelRow}>
                  <span className={styles.barLabelStep}>{b.label}</span>
                  <span className={styles.barLabelWeeks}>{b.weekLabel}</span>
                </div>
              ))}
            </div>

            <div className={styles.timelineCol}>
              <div className={styles.scale}>
                {["MONTH 1", "MONTH 2", "MONTH 3", "MONTH 4", "MONTH 5", "MONTH 6"].map((m, i) => (
                  <div key={i} className={styles.scaleCell}>
                    <span className={styles.scaleLabel}>{m}</span>
                  </div>
                ))}
              </div>

              <div className={styles.tracks}>
                {BARS.map((b) => {
                  const fillStart = b.start;
                  const fillEnd = Math.min(b.end, Math.max(b.start, today));
                  const fillWidth = Math.max(0, fillEnd - fillStart);
                  const isActive = today >= b.start && today <= b.end;
                  return (
                    <div key={b.label} className={styles.barTrack}>
                      <div
                        className={`${styles.barOutline} ${isActive ? styles.barOutlineActive : ""}`}
                        style={{ left: `${b.start}%`, width: `${b.end - b.start}%` }}
                      >
                        <div
                          className={styles.barFill}
                          style={{ left: 0, width: `${(fillWidth / (b.end - b.start)) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* NOW indicator lives inside the timeline column so left:% maps
                    correctly to month positions, not to the whole row. */}
                <div className={styles.today} style={{ left: `${today}%` }} aria-hidden>
                  <span className={styles.todayDot} />
                  <span className={styles.todayLine} />
                  <span className={styles.todayLabel}>NOW</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cards}>
            {PROCESS_STEPS.map((s, i) => {
              const isActive = today >= BARS[i].start && today <= BARS[i].end;
              const isDone = today > BARS[i].end;
              return (
                <div
                  key={s.title}
                  className={`${styles.card} ${isActive ? styles.cardActive : ""} ${isDone ? styles.cardDone : ""}`}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.cardChip}>
                      {isDone ? "✓ COMPLETE" : isActive ? "● IN PROGRESS" : "○ UPCOMING"}
                    </span>
                  </div>
                  <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
