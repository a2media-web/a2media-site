import styles from "./CustomProjects.module.css";

export default function CustomProjects() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <a
            href="https://9yqatx.short.gy/qeI5KF"
            target="_blank"
            rel="noreferrer"
            className={styles.card}
          >
            <div className={styles.line} />
            <div className={styles.top}>
              <h3 className={styles.name}>One-Off Video Projects</h3>
              <span className={styles.badge}>Custom Quote</span>
            </div>
            <p className={styles.desc}>
              Got a video that needs the A2 Polish? We take a few one-off
              projects each quarter. Tell us the scope, we&apos;ll tell you the
              price.
            </p>
            <span className={styles.cta}>
              Get in touch <span aria-hidden>→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
