"use client";

import styles from "./Process6Calendar.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Calendar / planner pages.
 *
 * Three calendar pages pinned to a wall: Week 1 / Week 4 / Month 6. Each
 * page hosts one of the live steps verbatim, with circled dates and
 * handwritten margin notes. Pages have a slight rotation and hover-lift.
 * Time-anchored, tactile, planner-aesthetic.
 */

const PAGES = [
  { month: "WEEK 1",  detail: "ICP RESEARCH · ROADMAP · SCRIPTS",     dateCircle: "1" },
  { month: "WEEK 4",  detail: "VIDEO ENGINE LIVE · WEEKLY CADENCE",  dateCircle: "22" },
  { month: "MONTH 6", detail: "SALES SEND · BUYERS EDUCATED · COMPOUND", dateCircle: "30" },
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function Process6Calendar() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Planner</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.pinboard}>
          {PROCESS_STEPS.map((step, i) => {
            const page = PAGES[i];
            return (
              <div key={page.month} className={`${styles.page} ${styles[`page${i}`]}`}>
                <span className={styles.pin} aria-hidden />
                <div className={styles.pageHead}>
                  <span className={styles.pageMonth}>{page.month}</span>
                  <span className={styles.pageDetail}>{page.detail}</span>
                </div>

                <div className={styles.miniCal}>
                  <div className={styles.miniRow}>
                    {DAYS.map((d) => (
                      <span key={d} className={styles.miniDayHead}>{d}</span>
                    ))}
                  </div>
                  {[0, 1, 2, 3].map((row) => (
                    <div key={row} className={styles.miniRow}>
                      {[0, 1, 2, 3, 4, 5, 6].map((col) => {
                        const dayNum = row * 7 + col + 1;
                        const isCircled = String(dayNum) === page.dateCircle;
                        return (
                          <span
                            key={col}
                            className={`${styles.miniDay} ${isCircled ? styles.miniDayCircled : ""}`}
                          >
                            {dayNum <= 30 ? dayNum : ""}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className={styles.pageBody}>
                  <p className={styles.stepEyebrow}>{step.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>

                <span className={styles.margin}>★</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
