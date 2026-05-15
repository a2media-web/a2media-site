import { LOGOS, logoSrc } from "./logos";
import styles from "./Belt3D.module.css";

export default function Belt3DWall() {
  const renderItem = (l: (typeof LOGOS)[number], key: string) => {
    const src = logoSrc(l);
    return (
      <div key={key} className={styles.cell}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={l.name} loading="lazy" />
        ) : (
          <span className={styles.text}>{l.name}</span>
        )}
      </div>
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden />

      <div className={styles.header}>
        <span className={styles.eyebrow}>Trusted by</span>
        <h2 className={styles.title}>
          A reel of clients <em>who actually closed deals</em>.
        </h2>
      </div>

      <div className={styles.stage}>
        <div className={styles.viewport}>
          <div className={styles.row}>
            {LOGOS.map((l, i) => renderItem(l, `${l.name}-${i}-a`))}
            {LOGOS.map((l, i) => renderItem(l, `${l.name}-${i}-b`))}
          </div>
        </div>
      </div>
    </section>
  );
}
