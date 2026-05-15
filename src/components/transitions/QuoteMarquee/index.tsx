import styles from "./QuoteMarquee.module.css";

const ROW_A = [
  "“Best video team we’ve ever worked with.”",
  "Reveal merged with Crossbeam.",
  "5,000+ summit attendees.",
  "100+ videos shipped.",
  "“They actually understand B2B buyers.”",
  "8x engagement vs industry average.",
];

const ROW_B = [
  "“They get our buyers.”",
  "Closed $600K in attributed revenue.",
  "8 months from launch to acquisition.",
  "22K+ new organic subscribers.",
  "“Our sales cycle dropped 40%.”",
  "$900K+ in sponsorships closed.",
];

export default function QuoteMarquee() {
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>What clients say</p>
      <div className={styles.row}>
        <div className={`${styles.track} ${styles.left}`}>
          {[...ROW_A, ...ROW_A].map((q, i) => (
            <span key={`a-${i}`} className={styles.quote}>
              {q}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.track} ${styles.right}`}>
          {[...ROW_B, ...ROW_B].map((q, i) => (
            <span key={`b-${i}`} className={styles.quote}>
              {q}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
