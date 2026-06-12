"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process48Notion.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simple concept #4: Notion database / table view.
 *
 * The exact UI every modern SaaS team lives in. Three rows in a Notion
 * database — Status property pill cycles "Not started" → "In progress"
 * → "Done" as each row processes. Each row has an emoji icon, title,
 * status pill, assignee avatar, and a due date column. Crisp, familiar,
 * zero learning curve.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const ICONS = ["🧠", "🎬", "🚀"];
const ASSIGNEES = [
  { name: "Kim",     initials: "KP", color: "#5A33FF" },
  { name: "Ademola", initials: "AA", color: "#8F45EE" },
  { name: "Mats",    initials: "MV", color: "#28DFE8" },
];
const DATES = ["Week 1-2", "Week 3-12", "Week 13-26"];

export default function Process48Notion() {
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

  const statusOf = (i: number) => {
    if (progress[i] >= 100) return "done";
    if (running === i)      return "doing";
    return "todo";
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Notion · A2 Media Engagement DB</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.crumb}>Workspace / A2 Media / 📋 Engagement Plan</span>
            <span className={styles.share}>Share</span>
            <span className={styles.menu}>···</span>
          </div>

          <div className={styles.page}>
            <h3 className={styles.pageTitle}>
              <span className={styles.pageIcon}>📋</span>
              <span>How we turn video into pipeline</span>
            </h3>
            <p className={styles.pageDesc}>3 phases · auto-sorted by status · last edited just now</p>

            <div className={styles.viewTabs}>
              <span className={styles.viewTabActive}>All phases</span>
              <span className={styles.viewTab}>By status</span>
              <span className={styles.viewTab}>By owner</span>
              <span className={styles.viewTab}>Timeline</span>
              <span style={{ marginLeft: "auto" }} className={styles.viewFilter}>+ Add filter</span>
            </div>

            <div className={styles.table}>
              <div className={styles.colHead}>
                <span style={{ flex: 1 }}>Name</span>
                <span style={{ width: 140 }}>Status</span>
                <span style={{ width: 140 }}>Owner</span>
                <span style={{ width: 110 }}>Timeline</span>
                <span style={{ width: 80, textAlign: "right" }}>Progress</span>
              </div>

              {PROCESS_STEPS.map((s, i) => {
                const status = statusOf(i);
                return (
                  <div key={s.title} className={`${styles.row} ${status === "doing" ? styles.rowDoing : ""}`}>
                    <div className={styles.nameCol}>
                      <span className={styles.rowIcon}>{ICONS[i]}</span>
                      <div className={styles.nameText}>
                        <span className={styles.rowTitle}>{s.title}</span>
                        <span className={styles.rowSub}>{s.eyebrow.replace(":", "")}</span>
                      </div>
                    </div>
                    <div className={styles.statusCol}>
                      <span className={`${styles.statusChip} ${styles[`status_${status}`]}`}>
                        <span className={styles.statusDot} style={status === "doing" ? { background: COLORS[i] } : {}} />
                        {status === "todo"  && "Not started"}
                        {status === "doing" && "In progress"}
                        {status === "done"  && "Done"}
                      </span>
                    </div>
                    <div className={styles.ownerCol}>
                      <span className={styles.avatar} style={{ background: ASSIGNEES[i].color }}>{ASSIGNEES[i].initials}</span>
                      <span className={styles.ownerName}>{ASSIGNEES[i].name}</span>
                    </div>
                    <div className={styles.dateCol}>
                      <span className={styles.dateChip}>📅 {DATES[i]}</span>
                    </div>
                    <div className={styles.progressCol}>
                      <div className={styles.bar}>
                        <div className={styles.fill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                      </div>
                      <span className={styles.progressNum}>{Math.floor(progress[i])}%</span>
                    </div>
                  </div>
                );
              })}

              <div className={styles.addRow}>+ New phase</div>
            </div>

            <div className={styles.footer}>
              <span>Count: <b>3</b></span>
              <span>Done: <b>{progress.filter((p) => p >= 100).length}/3</b></span>
              <span style={{ marginLeft: "auto" }}>Synced from CRM</span>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.card} ${progress[i] > 0 ? styles.cardOn : ""}`}>
              <p className={styles.cardEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
