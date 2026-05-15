import styles from "./Guarantee.module.css";

export default function Guarantee() {
  return (
    <section id="Guarantee" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.banner}>
          <span className={styles.shield} aria-hidden>🛡</span>
          <span className={styles.text}>
            <strong>The A2 Guarantee.</strong>{" "}
            If we don&apos;t hit our agreed goal by contract end, we keep
            working for you for free until we do.
          </span>
        </div>
      </div>
    </section>
  );
}
