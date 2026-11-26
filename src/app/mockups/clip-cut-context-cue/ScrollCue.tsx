import styles from "./cue.module.css";

export default function ScrollCue() {
  return (
    <div className={styles.cue} aria-hidden>
      <div className={styles.line} />
      <div className={styles.dot} />
      <div className={styles.chevron}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
}
