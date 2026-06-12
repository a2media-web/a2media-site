"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process45SalesPipeline.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simple concept #1: HubSpot/Salesforce-style sales pipeline.
 *
 * Most on-brand surface possible — three deals advancing through the
 * pipeline stages. Each row = one deal = one step. Stage chips cycle
 * Lead → Qualified → Proposal → Closed-Won as the progress bar fills.
 * Deal values total up at the bottom. Maps directly to A2's value prop:
 * "video into pipeline."
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const DEALS = [
  { company: "Northwind SaaS",  contact: "Christina · CMO",          value: 48000 },
  { company: "Helios Cloud",    contact: "Marcus · VP Marketing",    value: 124000 },
  { company: "Atlas Analytics", contact: "Priya · Head of Demand Gen", value: 284000 },
];
const STAGES = ["Lead", "Qualified", "Proposal", "Closed-Won"];

export default function Process45SalesPipeline() {
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

  const stageOf = (i: number) => {
    if (progress[i] >= 100) return 3;
    if (progress[i] >= 66)  return 2;
    if (progress[i] >= 33)  return 1;
    if (running === i)      return 0;
    return -1;
  };

  const closedValue = progress.reduce((acc, p, i) => acc + (p >= 100 ? DEALS[i].value : 0), 0);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>CRM · Pipeline view</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.brand}>
              <span className={styles.brandIcon}>⚡</span>
              <span>Pipeline</span>
            </span>
            <span className={styles.crumb}>A2 Media · Q2 deals</span>
            <span className={styles.tally}>
              Closed-Won: <b>${(closedValue / 1000).toFixed(0)}K</b>
            </span>
            <button type="button" className={styles.addBtn}>+ New deal</button>
          </div>

          <div className={styles.tableHead}>
            <span style={{ width: 200 }}>Deal</span>
            <span style={{ width: 100, textAlign: "right" }}>Value</span>
            <span style={{ flex: 1 }}>Stage</span>
            <span style={{ width: 120, textAlign: "right" }}>Status</span>
          </div>

          {PROCESS_STEPS.map((s, i) => {
            const stage = stageOf(i);
            const isQueued = stage === -1;
            return (
              <div key={s.title} className={`${styles.row} ${!isQueued ? styles.rowLive : ""} ${stage === 3 ? styles.rowDone : ""}`}>
                <div className={styles.dealCol}>
                  <div className={styles.dealName}>{DEALS[i].company}</div>
                  <div className={styles.dealSub}>{DEALS[i].contact}</div>
                </div>
                <div className={styles.valueCol}>
                  <span className={styles.value}>${(DEALS[i].value / 1000).toFixed(0)}K</span>
                </div>
                <div className={styles.stageCol}>
                  <div className={styles.stageTrack}>
                    <div className={styles.stageFill} style={{ width: `${progress[i]}%`, background: COLORS[i] }} />
                    {STAGES.map((label, sIdx) => {
                      const done = stage >= sIdx;
                      return (
                        <div
                          key={label}
                          className={`${styles.stageNode} ${done ? styles.stageNodeDone : ""}`}
                          style={{ left: `${(sIdx / (STAGES.length - 1)) * 100}%` }}
                        >
                          <span className={styles.stageDot} style={done ? { background: COLORS[i], borderColor: COLORS[i] } : {}} />
                          <span className={styles.stageLabel}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <span className={styles.statusCol}>
                  {isQueued && <span className={`${styles.chip} ${styles.chipQueued}`}>○ Queued</span>}
                  {stage >= 0 && stage < 3 && <span className={`${styles.chip} ${styles.chipActive}`} style={{ background: `${COLORS[i]}1f`, color: COLORS[i] }}>● {STAGES[stage]}</span>}
                  {stage === 3 && <span className={`${styles.chip} ${styles.chipWon}`}>✓ Closed-Won</span>}
                </span>
              </div>
            );
          })}

          <div className={styles.statusbar}>
            <span className={styles.statusDot} />
            Pipeline value: <b>${((DEALS[0].value + DEALS[1].value + DEALS[2].value) / 1000).toFixed(0)}K</b> · Win rate: 100%
            <span style={{ marginLeft: "auto" }}>Average cycle: 6 months</span>
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
