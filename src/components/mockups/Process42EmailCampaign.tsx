"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process42EmailCampaign.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Easy-to-follow concept #2: Email campaign send queue (Mailchimp-style).
 *
 * The surface every marketer recognizes: outbound campaign queue. Three
 * campaigns stacked, each shows recipients filling up (0 → 4,500) as it
 * sends. Status chips cycle Scheduled → Sending → Delivered. Right rail
 * tally of total delivered. Perfect for the marketing-leader ICP.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const TOTALS = [4500, 12800, 38400];
const OPENS  = ["—", "—", "—"];

export default function Process42EmailCampaign() {
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
                else if (idx < 2) setTimeout(() => runJob(idx + 1), 320);
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
    if (progress[i] >= 100) return "delivered";
    if (running === i) return "sending";
    return "scheduled";
  };

  const totalSent = progress.reduce((acc, p, i) => acc + Math.floor((p / 100) * TOTALS[i]), 0);
  const totalAll  = TOTALS.reduce((a, b) => a + b, 0);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Campaign Manager · Outbound queue</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.brand}>
              <span className={styles.brandIcon}>✉</span>
              <span>Campaign Manager</span>
            </span>
            <span className={styles.crumb}>A2 Media · Audience: B2B SaaS leaders</span>
            <span className={styles.tally}>Sent today: <b>{totalSent.toLocaleString()}</b></span>
            <button type="button" className={styles.composeBtn}>+ New campaign</button>
          </div>

          <div className={styles.tableHead}>
            <span style={{ width: 36 }}></span>
            <span style={{ flex: 1 }}>Subject &amp; segment</span>
            <span style={{ width: 90, textAlign: "right" }}>Recipients</span>
            <span style={{ width: 240 }}>Send progress</span>
            <span style={{ width: 110, textAlign: "right" }}>Status</span>
          </div>

          {PROCESS_STEPS.map((s, i) => {
            const status = statusOf(i);
            const sent = Math.floor((progress[i] / 100) * TOTALS[i]);
            return (
              <div key={s.title} className={`${styles.row} ${status === "sending" ? styles.rowActive : ""} ${status === "delivered" ? styles.rowDone : ""}`}>
                <span className={styles.colorTag} style={{ background: COLORS[i] }} />
                <div className={styles.nameCol}>
                  <div className={styles.subject}>{s.title}</div>
                  <div className={styles.subline}>
                    <span className={styles.segChip}>{s.eyebrow.replace(":", "")}</span>
                    <span className={styles.subSub}>To: {i === 0 ? "Marketing leaders · 4.5K" : i === 1 ? "Marketing + Sales · 12.8K" : "Full B2B SaaS list · 38.4K"}</span>
                  </div>
                </div>
                <div className={styles.recipients}>
                  <span className={styles.recNum}>{sent.toLocaleString()}</span>
                  <span className={styles.recOf}>/ {TOTALS[i].toLocaleString()}</span>
                </div>
                <div className={styles.progressCol}>
                  <div className={styles.bar}>
                    <div className={styles.fill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                    {status === "sending" && <div className={styles.shimmer} />}
                  </div>
                  <span className={styles.progressText}>{Math.floor(progress[i])}%</span>
                </div>
                <span className={styles.statusCol}>
                  {status === "scheduled" && <span className={`${styles.chip} ${styles.chipScheduled}`}>⏱ Scheduled</span>}
                  {status === "sending"   && <span className={`${styles.chip} ${styles.chipSending}`}>↑ Sending</span>}
                  {status === "delivered" && <span className={`${styles.chip} ${styles.chipDelivered}`}>✓ Delivered</span>}
                </span>
              </div>
            );
          })}

          <div className={styles.statusbar}>
            <div className={styles.overallBar}>
              <div className={styles.overallFill} style={{ width: `${(totalSent / totalAll) * 100}%` }} />
            </div>
            <span>
              <b>{totalSent.toLocaleString()}</b> of {totalAll.toLocaleString()} delivered
            </span>
            <span style={{ marginLeft: "auto" }} className={styles.rate}>Average send rate: 24K/hr</span>
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
