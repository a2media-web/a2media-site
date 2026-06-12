"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process34YTNotifications.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * YouTube concept #5: Bell-icon notification feed.
 *
 * The dropdown panel that opens when you click the bell. A purple
 * unread-count badge pulses; the panel reveals 3 notification rows
 * one at a time, each is one step. Each row has the channel avatar,
 * notification body, thumbnail, and timestamp ("just now / 1 week ago /
 * 6 months ago"). The bell wiggles when a new notification arrives.
 */

const NOTIFICATION_TIMES = ["6 months ago", "3 weeks ago", "Just now"];

export default function Process34YTNotifications() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [revealed, setRevealed] = useState(0);
  const [bellShakeKey, setBellShakeKey] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            [1, 2, 3].forEach((n) =>
              setTimeout(() => {
                setRevealed(n);
                setBellShakeKey((k) => k + 1);
              }, 700 + n * 800),
            );
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
        <p className={styles.eyebrow}>You have {revealed} new notification{revealed === 1 ? "" : "s"}</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div className={styles.bellWrap}>
              <span
                key={bellShakeKey}
                className={`${styles.bell} ${revealed > 0 ? styles.bellShake : ""}`}
                aria-hidden
              >🔔</span>
              {revealed > 0 && <span className={styles.bellBadge}>{revealed}</span>}
            </div>
            <h3 className={styles.panelTitle}>Notifications</h3>
            <button type="button" className={styles.markRead}>Mark all as read</button>
          </div>

          <div className={styles.notifications}>
            {[...PROCESS_STEPS].reverse().map((s, reverseI) => {
              const stepIdx = PROCESS_STEPS.length - 1 - reverseI;
              const visibleAtOrAfter = stepIdx + 1; // step 0 visible at revealed=1, etc.
              const visible = revealed >= visibleAtOrAfter;
              const isNewest = stepIdx === revealed - 1;
              return (
                <article
                  key={s.title}
                  className={`${styles.notif} ${visible ? styles.notifIn : ""} ${isNewest ? styles.notifUnread : ""}`}
                >
                  <div className={styles.notifAvatar}>
                    <span>A2</span>
                    <span className={styles.notifSourceIcon}>▶</span>
                  </div>
                  <div className={styles.notifBody}>
                    <p className={styles.notifLine}>
                      <span className={styles.notifChannel}>A2 Media</span> uploaded:
                    </p>
                    <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                    <h4 className={styles.stepTitle}>{s.title}</h4>
                    <p className={styles.stepDesc}>{s.desc}</p>
                    <p className={styles.notifTime}>{NOTIFICATION_TIMES[stepIdx]}</p>
                  </div>
                  <div className={styles.notifThumb}>
                    <span className={styles.notifThumbStep}>0{stepIdx + 1}</span>
                    <span className={styles.notifThumbPlay}>▶</span>
                  </div>
                  {isNewest && <span className={styles.unreadDot} aria-hidden />}
                </article>
              );
            })}
          </div>

          <div className={styles.panelFoot}>
            <button type="button" className={styles.viewAll}>View all notifications</button>
          </div>
        </div>
      </div>
    </section>
  );
}
