"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process65Checklist.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simpler new #3: Checklist.
 *
 * Three to-do items. Each transitions: empty checkbox → loading spinner
 * → checked ✓. Universal to-do app pattern (Linear, Notion, Apple Notes).
 * Zero cognitive load. The "checking off" motion is satisfying and
 * reads instantly.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process65Checklist() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [stateArr, setStateArr] = useState<("todo" | "doing" | "done")[]>(["todo", "todo", "todo"]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const runOne = (idx: number) => {
              setStateArr((prev) => { const n = [...prev]; n[idx] = "doing"; return n; });
              setTimeout(() => {
                setStateArr((prev) => { const n = [...prev]; n[idx] = "done"; return n; });
                if (idx < 2) setTimeout(() => runOne(idx + 1), 380);
              }, 1600);
            };
            setTimeout(() => runOne(0), 600);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const doneCount = stateArr.filter((s) => s === "done").length;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Engagement checklist</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.list}>
          <div className={styles.listHead}>
            <span className={styles.listTitle}>A2 Media · 3 things to check off</span>
            <span className={styles.listProgress}>{doneCount}/3</span>
          </div>

          {PROCESS_STEPS.map((s, i) => {
            const state = stateArr[i];
            return (
              <div key={s.title} className={`${styles.item} ${styles[`item_${state}`]}`}>
                <span className={styles.check}>
                  {state === "todo"  && <span className={styles.checkEmpty} />}
                  {state === "doing" && <span className={styles.checkSpin} style={{ borderTopColor: COLORS[i] }} />}
                  {state === "done"  && <span className={styles.checkDone} style={{ background: COLORS[i], borderColor: COLORS[i] }}>✓</span>}
                </span>
                <div className={styles.itemBody}>
                  <h3 className={styles.itemTitle}>{s.title}</h3>
                  <p className={styles.itemDesc}>{s.desc.split(".")[0]}.</p>
                </div>
                <span className={styles.stateTag}>
                  {state === "todo"  && "To do"}
                  {state === "doing" && "In progress"}
                  {state === "done"  && "Done"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
