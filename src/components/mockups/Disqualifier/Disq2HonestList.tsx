"use client";

import styles from "./Disq2HonestList.module.css";
import { FIT_NO, FIT_YES } from "./_copy";
// both arrays used below

/**
 * Variant 2: The honest two-column list.
 *
 * "Right fit" green column vs "Not right fit" red column. Direct,
 * peer-to-peer, no design tricks. Christina responds to plain
 * practitioner voice over polished agency claims. The honesty IS the
 * positioning.
 */

export default function Disq2HonestList() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Before you book</p>
        <h2 className={styles.heading}>
          Honest version of who we work with.
        </h2>
        <p className={styles.sub}>
          Five clients per quarter means we&apos;re picky. Here&apos;s the truth about
          who this works for and who should keep looking.
        </p>

        <div className={styles.cols}>
          <div className={`${styles.col} ${styles.yes}`}>
            <div className={styles.colHead}>
              <span className={styles.colTag}>If this is you</span>
              <h3 className={styles.colTitle}>Book the call</h3>
            </div>
            <ul className={styles.list}>
              {FIT_YES.map((r) => (
                <li key={r} className={styles.item}>
                  <span className={styles.markYes}>✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.col} ${styles.no}`}>
            <div className={styles.colHead}>
              <span className={`${styles.colTag} ${styles.colTagNo}`}>If this is you</span>
              <h3 className={`${styles.colTitle} ${styles.colTitleNo}`}>Don&apos;t book yet</h3>
            </div>
            <ul className={styles.list}>
              {FIT_NO.map((r) => (
                <li key={r} className={styles.item}>
                  <span className={styles.markNo}>×</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className={styles.colFoot}>
              We&apos;ll save us both an hour. Come back when one of these changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
