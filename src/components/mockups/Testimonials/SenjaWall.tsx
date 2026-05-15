import SenjaEmbed from "./SenjaEmbed";
import styles from "./SenjaWall.module.css";

export default function SenjaWallTestimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Reviews from real clients</p>
        <h2 className={styles.title}>
          They keep <em>showing up</em> to say it.
        </h2>
        <p className={styles.sub}>
          Marketing leaders, founders, and operators on what working with A2
          Media actually looks like.
        </p>

        <div className={styles.embedWrap}>
          <SenjaEmbed />
        </div>
      </div>
    </section>
  );
}
