"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts13Printer.module.css";

/**
 * Option 13: Live thermal printer.
 *
 * A receipt that's actively printing in real-time. Lines unspool out of
 * a printer head at the top with a subtle whir animation. New lines
 * arrive one at a time as if being mechanically fed. Different from the
 * static paper receipt — this one is happening NOW.
 *
 * The printer is mounted to the section so the paper appears to be
 * physically connected to a device, not just decorative.
 */

const LINES = [
  { kind: "head",  text: "A2 MEDIA — CONTENT THAT CONVERTS" },
  { kind: "meta",  text: "a2media.ca" },
  { kind: "div",   text: "" },
  { kind: "col",   text: "ITEM                          VALUE" },
  { kind: "div",   text: "" },
  { kind: "line",  text: "B2B SaaS brands served         30+" },
  { kind: "line",  text: "Avg. client tenure             18mo" },
  { kind: "line",  text: "Faster close rates             35%" },
  { kind: "line",  text: "Avg. turnaround                72hr" },
  { kind: "line",  text: "Videos delivered, total        600+" },
  { kind: "line",  text: "Client rating                  4.9/5" },
  { kind: "div",   text: "" },
  { kind: "total", text: "TOTAL: OUR VIDEOS PRINT REVENUE" },
  { kind: "div",   text: "" },
  { kind: "foot",  text: "*** THANK YOU FOR YOUR INTEREST ***" },
  { kind: "foot",  text: "cal.com/a2media/meeting" },
];

export default function Receipts13Printer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const printerRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [printed, setPrinted] = useState(0);
  const [whirring, setWhirring] = useState(false);

  // Observe the printer card specifically (not the whole section). Fires
  // once when the printer is roughly half on screen, then disconnects so
  // it never re-triggers. Ref-guard prevents racing if the observer
  // delivers two intersecting entries before disconnect lands.
  useEffect(() => {
    const target = printerRef.current ?? ref.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || firedRef.current) continue;
          firedRef.current = true;
          io.disconnect();
          setWhirring(true);
          let i = 0;
          const id = setInterval(() => {
            i++;
            setPrinted(i);
            if (i >= LINES.length) {
              clearInterval(id);
              setTimeout(() => setWhirring(false), 600);
            }
          }, 220);
        }
      },
      { threshold: 0.45 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref as unknown as React.RefObject<HTMLDivElement>} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>What we&apos;ve accomplished in 4 years.</p>

        <div className={styles.machine} ref={printerRef}>
          <div className={`${styles.printer} ${whirring ? styles.whir : ""}`}>
            <div className={styles.printerBody}>
              <div className={styles.indicator} />
              <span className={styles.printerLabel}>A2-RCPT &middot; 80MM</span>
              <span className={styles.feedDot} />
              <span className={styles.feedDot} />
            </div>
            <div className={styles.printerSlot} />
            <div className={styles.printerTeeth}>
              {Array.from({ length: 32 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>

          <div className={styles.paper}>
            <div className={styles.paperRoll}>
              {LINES.slice(0, printed).map((l, i) => (
                <p
                  key={i}
                  className={`${styles.row} ${styles[l.kind] ?? ""}`}
                >
                  {l.kind === "div" ? <span className={styles.dashed}>·······································</span> : l.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
