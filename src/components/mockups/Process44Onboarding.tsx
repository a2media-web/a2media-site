"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process44Onboarding.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Easy-to-follow concept #4: SaaS onboarding checklist.
 *
 * The setup checklist every SaaS shows on first login (Notion, Linear,
 * Stripe, ClickUp). Big "Setup completion" progress ring at the top with
 * percentage filling. Three checklist items below — each unchecks → spins
 * → checks ✓ in sequence with its body collapsing/expanding. Tasks have
 * micro-checklists inside that tick off too. Familiar to anyone who's
 * ever signed up for SaaS.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const SUBTASKS = [
  ["Study buyer psychology",  "Audit sales calls",   "Map distribution plan"],
  ["Design the video system", "Script & edit week 1", "Ship videos in 48-72hr"],
  ["Sales team enabled",      "Prospects pre-educated", "Pipeline attributed"],
];

export default function Process44Onboarding() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [progress, setProgress] = useState([0, 0, 0]);
  const [running, setRunning] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const runJob = (idx: number) => {
              setRunning(idx);
              const start = performance.now();
              const dur = 2400;
              const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                setProgress((prev) => { const n = [...prev]; n[idx] = p * 100; return n; });
                if (p < 1) requestAnimationFrame(tick);
                else if (idx < 2) setTimeout(() => runJob(idx + 1), 360);
                else setRunning(3);
              };
              requestAnimationFrame(tick);
            };
            setTimeout(() => runJob(0), 500);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stateOf = (i: number) => {
    if (progress[i] >= 100) return "done";
    if (running === i)      return "doing";
    return "todo";
  };

  const overall = progress.reduce((a, b) => a + b, 0) / 3;
  const overallPct = Math.floor(overall);
  const dashOffset = 188 - (188 * overallPct) / 100; // circumference of r=30 circle

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Media · Engagement setup</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.header}>
            <div className={styles.headerCopy}>
              <p className={styles.welcome}>Welcome to your video engine</p>
              <h3 className={styles.headerTitle}>3 things we&apos;ll knock out together</h3>
              <p className={styles.headerSub}>Each step unlocks the next. By month 6, video becomes one of your main drivers of buyer trust.</p>
            </div>
            <div className={styles.ringWrap}>
              <svg viewBox="0 0 80 80" className={styles.ring}>
                <circle cx="40" cy="40" r="30" className={styles.ringTrack} />
                <circle cx="40" cy="40" r="30" className={styles.ringFill} strokeDasharray="188" strokeDashoffset={dashOffset} />
              </svg>
              <div className={styles.ringInner}>
                <span className={styles.ringPct}>{overallPct}%</span>
                <span className={styles.ringLabel}>complete</span>
              </div>
            </div>
          </div>

          <div className={styles.checklist}>
            {PROCESS_STEPS.map((s, i) => {
              const state = stateOf(i);
              const subDone = (j: number) => {
                if (state === "done") return true;
                if (state === "doing") return progress[i] > (j + 0.5) * (100 / SUBTASKS[i].length);
                return false;
              };
              return (
                <div key={s.title} className={`${styles.task} ${styles[`task_${state}`]}`}>
                  <div className={styles.taskHead}>
                    <button type="button" className={styles.check} aria-label={`Step ${i + 1} state: ${state}`}>
                      {state === "done"  && <span className={styles.checkDone} style={{ background: COLORS[i], borderColor: COLORS[i] }}>✓</span>}
                      {state === "doing" && <span className={styles.checkDoing} style={{ borderColor: COLORS[i] }}><span className={styles.checkSpin} style={{ borderTopColor: COLORS[i] }} /></span>}
                      {state === "todo"  && <span className={styles.checkTodo}>{i + 1}</span>}
                    </button>
                    <div className={styles.taskTitleCol}>
                      <p className={styles.taskEyebrow} style={{ color: state === "todo" ? "rgba(13,5,54,0.4)" : COLORS[i] }}>{s.eyebrow}</p>
                      <h4 className={styles.taskTitle}>{s.title}</h4>
                    </div>
                    <span className={`${styles.chip} ${styles[`chip_${state}`]}`}>
                      {state === "done" ? "Complete" : state === "doing" ? "In progress" : "Up next"}
                    </span>
                  </div>

                  <div className={styles.taskBody}>
                    <p className={styles.taskDesc}>{s.desc}</p>
                    <ul className={styles.subtasks}>
                      {SUBTASKS[i].map((label, j) => (
                        <li key={label} className={`${styles.subItem} ${subDone(j) ? styles.subDone : ""}`}>
                          <span className={styles.subCheck} style={subDone(j) ? { background: COLORS[i], borderColor: COLORS[i] } : {}}>
                            {subDone(j) ? "✓" : ""}
                          </span>
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.statusbar}>
            <div className={styles.barFull}>
              <div className={styles.barFullFill} style={{ width: `${overallPct}%` }} />
            </div>
            <span><b>{overallPct}%</b> of setup complete · {overallPct === 100 ? "🎉 Engine running" : "Auto-saving as you go"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
