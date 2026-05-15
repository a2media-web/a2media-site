import styles from "./SlantBoundary.module.css";

export default function SlantBoundary() {
  return (
    <section className={styles.section} aria-hidden>
      <div className={styles.blade} />
      <div className={styles.glow} />
    </section>
  );
}
