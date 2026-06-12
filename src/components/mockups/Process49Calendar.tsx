"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process49Calendar.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simple concept #5: Calendar / Calendly-style booked sessions.
 *
 * Aligned with the "Book a discovery call" CTA. Three booked sessions
 * stacked on a calendar week view. Each session card cycles status:
 * Scheduled → Confirmed → Joined. Time blocks light up in sequence.
 * Calendly DNA — green check + meeting attendees + duration.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const MEETINGS = [
  { day: "Mon", date: "May 25",  time: "10:00 AM", duration: "Week 1-2 kickoff",  attendees: 4 },
  { day: "Tue", date: "Jun 16",  time: "2:00 PM",  duration: "Engine review",     attendees: 6 },
  { day: "Wed", date: "Aug 12",  time: "11:30 AM", duration: "Pipeline check-in", attendees: 5 },
];

export default function Process49Calendar() {
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
    if (progress[i] >= 100) return "joined";
    if (progress[i] >= 50)  return "confirmed";
    if (running === i)      return "scheduled";
    return "pending";
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Schedule · A2 Media engagement</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.brand}>
              <span className={styles.brandIcon}>📅</span>
              <span>Bookings</span>
            </span>
            <span className={styles.crumb}>3 sessions scheduled · 6-month engagement</span>
            <button type="button" className={styles.bookBtn}>+ Book session</button>
          </div>

          <div className={styles.weekView}>
            <div className={styles.weekHead}>
              <span className={styles.weekTitle}>This engagement, week by week</span>
              <span className={styles.weekRange}>May 25, 2026 → Nov 25, 2026</span>
            </div>
            <div className={styles.weekRail}>
              <div className={styles.railLine} />
              {MEETINGS.map((m, i) => {
                const status = statusOf(i);
                const positionPct = i === 0 ? 6 : i === 1 ? 36 : 78;
                return (
                  <div
                    key={i}
                    className={`${styles.dotRail} ${status !== "pending" ? styles.dotRailLive : ""}`}
                    style={{ left: `${positionPct}%` }}
                  >
                    <span className={styles.railDot} style={status !== "pending" ? { background: COLORS[i], borderColor: COLORS[i] } : {}}>
                      {status === "joined" ? "✓" : i + 1}
                    </span>
                    <span className={styles.railDate}>{m.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.meetings}>
            {PROCESS_STEPS.map((s, i) => {
              const status = statusOf(i);
              const m = MEETINGS[i];
              return (
                <div key={s.title} className={`${styles.meeting} ${status !== "pending" ? styles.meetingLive : ""}`}>
                  <div className={styles.dayBlock} style={{ background: status !== "pending" ? COLORS[i] : "rgba(13,5,54,0.06)", color: status !== "pending" ? "#fff" : "rgba(13,5,54,0.4)" }}>
                    <span className={styles.dayName}>{m.day}</span>
                    <span className={styles.dayDate}>{m.date.split(" ")[1]}</span>
                    <span className={styles.dayMonth}>{m.date.split(" ")[0]}</span>
                  </div>

                  <div className={styles.meetingBody}>
                    <div className={styles.meetingHead}>
                      <div className={styles.meetingTitleCol}>
                        <p className={styles.meetingEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
                        <h3 className={styles.meetingTitle}>{s.title}</h3>
                      </div>
                      <span className={`${styles.statusPill} ${styles[`status_${status}`]}`}>
                        {status === "pending"   && <>○ Pending</>}
                        {status === "scheduled" && <>● Scheduled</>}
                        {status === "confirmed" && <>📩 Reminder sent</>}
                        {status === "joined"    && <>✓ Completed</>}
                      </span>
                    </div>

                    <p className={styles.meetingDesc}>{s.desc}</p>

                    <div className={styles.meetingMeta}>
                      <span className={styles.metaItem}>🕘 {m.time}</span>
                      <span className={styles.metaItem}>📌 {m.duration}</span>
                      <span className={styles.metaItem}>
                        <span className={styles.attendees}>
                          {Array.from({ length: m.attendees }).map((_, j) => (
                            <span key={j} className={styles.miniAvatar} style={{ background: COLORS[i], opacity: 0.6 + j * 0.1 }} />
                          ))}
                        </span>
                        {m.attendees} attendees
                      </span>
                      {status !== "pending" && (
                        <span style={{ marginLeft: "auto" }} className={styles.joinBtn}>
                          {status === "joined" ? "▶ View recording" : "→ Join call"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.statusbar}>
            <span className={styles.statusDot} />
            All sessions auto-confirmed · calendar invites sent
            <span style={{ marginLeft: "auto" }} className={styles.calLink}>cal.com/a2media</span>
          </div>
        </div>
      </div>
    </section>
  );
}
