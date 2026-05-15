import { LOGOS, logoSrc } from "./logos";
import styles from "./Marquee.module.css";

export default function MarqueeWall() {
  const half = Math.ceil(LOGOS.length / 2);
  const top = LOGOS.slice(0, half);
  const bottom = LOGOS.slice(half);

  const renderItem = (l: (typeof LOGOS)[number]) => {
    const src = logoSrc(l);
    return (
      <div key={`${l.name}-${l.domain ?? "txt"}`} className={styles.cell}>
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
          Billion-dollar brands. <em>Their best work.</em>
        </h2>
      </div>

      <div className={styles.viewport}>
        <div className={styles.row} style={{ ["--dur" as string]: "55s" }}>
          {top.map(renderItem)}
          {top.map((l) => renderItem({ ...l, name: l.name + "_dup" }))}
        </div>
        <div
          className={`${styles.row} ${styles.rowReverse}`}
          style={{ ["--dur" as string]: "70s" }}
        >
          {bottom.map(renderItem)}
          {bottom.map((l) => renderItem({ ...l, name: l.name + "_dup" }))}
        </div>
      </div>
    </section>
  );
}
