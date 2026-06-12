"use client";

import { useState } from "react";
import styles from "./Disq5Application.module.css";
import { FIT_YES } from "./_copy";

/**
 * Variant 5: Pre-call qualification form.
 *
 * Mimics a Linear/Typeform intake. Five checkboxes the visitor ticks
 * themselves. Tally at the bottom updates live: "3 of 5 — looks like
 * a fit." Implies actual selectivity and gives the visitor agency. The
 * "interactive" element keeps the eye engaged longer than passive copy.
 */

export default function Disq5Application() {
  const [checked, setChecked] = useState<boolean[]>(Array(FIT_YES.length).fill(false));
  const score = checked.filter(Boolean).length;

  const message =
    score === 0 ? "Tick the boxes that apply to you." :
    score < 3   ? "We'd probably pass right now. Come back when this changes." :
    score < 5   ? "Looks like a fit. Worth a 30-minute call." :
                  "Strong fit. The call is going to be a good one.";

  const messageColor =
    score === 0 ? "rgba(13,5,54,0.5)" :
    score < 3   ? "#c4322c" :
    score < 5   ? "var(--a2-electric-purple)" :
                  "#1f9a4a";

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Pre-call qualifier</p>
        <h2 className={styles.heading}>
          Tick the boxes that apply.
        </h2>
        <p className={styles.sub}>
          Five clients per quarter. Five questions. If three or more apply, the
          discovery call will be worth your time.
        </p>

        <div className={styles.form}>
          <div className={styles.formHead}>
            <span className={styles.formId}>FORM 01 · Engagement fit</span>
            <span className={styles.formStatus}>● Live · saves automatically</span>
          </div>

          <div className={styles.questions}>
            {FIT_YES.map((q, i) => (
              <label
                key={q}
                className={`${styles.question} ${checked[i] ? styles.questionOn : ""}`}
                onClick={() =>
                  setChecked((prev) => {
                    const next = [...prev];
                    next[i] = !next[i];
                    return next;
                  })
                }
              >
                <span className={`${styles.checkbox} ${checked[i] ? styles.checkboxOn : ""}`}>
                  {checked[i] && "✓"}
                </span>
                <span className={styles.questionText}>
                  <span className={styles.qNum}>Q{i + 1}.</span> {q}
                </span>
              </label>
            ))}
          </div>

          <div className={styles.scorebar}>
            <div className={styles.scoreLeft}>
              <span className={styles.scoreNum} style={{ color: messageColor }}>{score}/5</span>
              <span className={styles.scoreLabel}>fit signals</span>
            </div>
            <div className={styles.scoreMessage} style={{ color: messageColor }}>{message}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
