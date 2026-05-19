"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts9Bloomberg.module.css";

/**
 * Option 9: Bloomberg / trading terminal.
 *
 * Black background, monospace amber/green text, command-line prompt
 * feel. Types out a query, then "fetches" each stat line by line with
 * a blinking cursor between rows. Reads like a finance terminal output.
 *
 * Wildly distinctive for B2B SaaS. The aesthetic is "we're so confident
 * we let the data speak in raw form."
 */

const PROMPT = "$ a2media stats --window=all --format=table";

const STATS = [
  { key: "BRANDS_SERVED",  value: "30+",   delta: "+5 QoQ"   },
  { key: "CLIENT_TENURE",  value: "18mo",  delta: "+2.4mo YoY" },
  { key: "CLOSE_RATE",     value: "35%",   delta: "faster"   },
  { key: "TURNAROUND",     value: "72hr",  delta: "p95"      },
  { key: "VIDEOS_SHIPPED", value: "600+",  delta: "lifetime" },
  { key: "CLIENT_RATING",  value: "4.9/5", delta: "n=24"     },
];

export default function Receipts9Bloomberg() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [rowsShown, setRowsShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const promptTick = setInterval(() => {
      i++;
      setTypedPrompt(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        clearInterval(promptTick);
        // Reveal rows one at a time after the prompt finishes typing.
        let r = 0;
        const rowTick = setInterval(() => {
          r++;
          setRowsShown(r);
          if (r >= STATS.length) clearInterval(rowTick);
        }, 220);
      }
    }, 32);
    return () => clearInterval(promptTick);
  }, [started]);

  return (
    <section ref={ref as unknown as React.RefObject<HTMLDivElement>} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Raw output from the terminal.</p>

        <div className={styles.terminal}>
          <div className={styles.titlebar}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.title}>a2media-bash &mdash; 80×24</span>
          </div>
          <div className={styles.screen}>
            <p className={styles.line}>
              <span className={styles.amber}>{typedPrompt}</span>
              {typedPrompt.length < PROMPT.length && <span className={styles.cursor}>▌</span>}
            </p>

            {typedPrompt.length === PROMPT.length && (
              <>
                <p className={styles.line}><span className={styles.dim}>fetching ... </span><span className={styles.green}>OK</span></p>
                <p className={styles.line}>
                  <span className={styles.dim}>┌─────────────────────┬─────────┬──────────────┐</span>
                </p>
                <p className={styles.line}>
                  <span className={styles.dim}>│</span>
                  <span className={styles.headerCell}> METRIC              </span>
                  <span className={styles.dim}>│</span>
                  <span className={styles.headerCell}> VALUE   </span>
                  <span className={styles.dim}>│</span>
                  <span className={styles.headerCell}> DELTA        </span>
                  <span className={styles.dim}>│</span>
                </p>
                <p className={styles.line}>
                  <span className={styles.dim}>├─────────────────────┼─────────┼──────────────┤</span>
                </p>
                {STATS.slice(0, rowsShown).map((s) => (
                  <p key={s.key} className={styles.line}>
                    <span className={styles.dim}>│</span>
                    <span className={styles.cell}> {pad(s.key, 19)} </span>
                    <span className={styles.dim}>│</span>
                    <span className={styles.cellValue}> {pad(s.value, 7)} </span>
                    <span className={styles.dim}>│</span>
                    <span className={styles.cell}> {pad(s.delta, 12)} </span>
                    <span className={styles.dim}>│</span>
                  </p>
                ))}
                {rowsShown === STATS.length && (
                  <>
                    <p className={styles.line}>
                      <span className={styles.dim}>└─────────────────────┴─────────┴──────────────┘</span>
                    </p>
                    <p className={styles.line}>
                      <span className={styles.green}>6 rows returned in 12ms.</span>
                    </p>
                    <p className={styles.line}>
                      <span className={styles.amber}>$ </span><span className={styles.cursor}>▌</span>
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function pad(s: string, n: number) {
  if (s.length >= n) return s.slice(0, n);
  return s + " ".repeat(n - s.length);
}
