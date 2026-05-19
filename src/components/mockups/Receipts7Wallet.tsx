"use client";

import styles from "./Receipts7Wallet.module.css";

/**
 * Option 7: Stack of mini-receipts.
 *
 * Instead of one big receipt, six small individual receipts — one per
 * stat — pinned to the section like printed slips on a corkboard.
 * Slight rotation on each, soft drop shadows, overlapping at the edges.
 *
 * Playful + tactile. The "receipts" wordmark becomes literal AND plural.
 * Each slip is independently designed so the section feels collected, not
 * generated.
 */

const STATS = [
  { value: "25+", label: "B2B Brands Served", id: "BRD-25", date: "OUTBOUND" },
  { value: "18mo", label: "Avg. Client Tenure", id: "TEN-18", date: "RECURRING" },
  { value: "35%", label: "Faster Close Rates", id: "CLS-35", date: "OUTCOME" },
  { value: "72hr", label: "Turnaround Time", id: "TRN-72", date: "DELIVERY" },
  { value: "550+", label: "Videos Delivered", id: "DLV-VID", date: "TOTAL" },
  { value: "4.9/5", label: "Client Rating", id: "RTG-49", date: "REVIEWED" },
];

const ROTATIONS = [-3, 2, -1.5, 3, -2, 1.5];

export default function Receipts7Wallet() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Pinned, stamped, signed off.</p>
      </div>

      <div className={styles.board}>
        {STATS.map((s, i) => (
          <div
            key={s.id}
            className={styles.slip}
            style={{ ["--rot" as string]: `${ROTATIONS[i]}deg` }}
          >
            <div className={styles.slipHead}>
              <span className={styles.slipId}>{s.id}</span>
              <span className={styles.slipDate}>{s.date}</span>
            </div>
            <div className={styles.slipDashed} />
            <div className={styles.slipValue}>{s.value}</div>
            <p className={styles.slipLabel}>{s.label}</p>
            <div className={styles.slipDashed} />
            <p className={styles.slipStamp}>VERIFIED &middot; A2 MEDIA</p>
          </div>
        ))}
      </div>
    </section>
  );
}
