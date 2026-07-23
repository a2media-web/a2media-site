"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts.module.css";

/**
 * Live thermal printer receipts.
 *
 * Triggers when the printer is roughly half visible in viewport (single-
 * fire via ref guard). Whirs + feeds lines one at a time, ending on a
 * TOTAL summary line.
 *
 * REVERT to the previous staggered mosaic by:
 *   1. Restore from src/components/sections/Receipts/_backup-mosaic.tsx.txt
 *      and _backup-mosaic.module.css.txt
 *   2. Or import { Receipts4ClientCards } from "@/components/mockups/..."
 *      and re-export it as the default — same component, no styling drift.
 */

type LineKind = "head" | "meta" | "div" | "col" | "line" | "total" | "foot";

const LINES: { kind: LineKind; text: string }[] = [
  { kind: "head",  text: "A2 MEDIA · CONTENT THAT CONVERTS" },
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
  { kind: "total", text: "TOTAL: OUR VIDEOS PRINT MONEY" },
  { kind: "div",   text: "" },
  { kind: "foot",  text: "*** THANK YOU FOR YOUR INTEREST ***" },
];

export default function Receipts() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const machineRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [printed, setPrinted] = useState(0);
  const [whirring, setWhirring] = useState(false);

  // Observe the printer card specifically (not the whole section) so the
  // animation only kicks off when the printer is genuinely on screen, not
  // when its section's bottom edge is barely above the fold. Ref-guard
  // prevents double-fire if multiple intersecting entries land before the
  // disconnect() call resolves.
  useEffect(() => {
    const target = machineRef.current;
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
    <section ref={sectionRef} id="before-and-after" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Best in class since 2023. Just look at the receipts bb.</p>

        <div className={styles.stage}>
          <span
            className={`${styles.ghostReceipt} ${styles.ghostA}`}
            aria-hidden
          />
          <span
            className={`${styles.ghostReceipt} ${styles.ghostB}`}
            aria-hidden
          />

        <div className={styles.machine} ref={machineRef}>
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
                <p key={i} className={`${styles.row} ${styles[l.kind]}`}>
                  {l.kind === "div" ? (
                    <span className={styles.dashed}>
                      ·······································
                    </span>
                  ) : (
                    l.text
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
