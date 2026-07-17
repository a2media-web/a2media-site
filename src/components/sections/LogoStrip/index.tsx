import { LOGOS, logoSrc } from "@/components/mockups/LogoWalls/logos";
import styles from "./LogoStrip.module.css";

function buildSlice(start: number, length: number) {
  const out: typeof LOGOS = [];
  for (let i = 0; i < length; i++) {
    out.push(LOGOS[(start + i) % LOGOS.length]);
  }
  return out;
}

export default function LogoStrip() {
  const renderItem = (l: (typeof LOGOS)[number], key: string) => {
    const src = logoSrc(l);
    const scale = l.scale ?? 1;
    const imgClass = l.noFilter ? styles.imgRaw : styles.imgFiltered;
    const cellClass = l.desktopOnly
      ? `${styles.cell} ${styles.hideOnMobile}`
      : styles.cell;
    return (
      <div key={key} className={cellClass}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={l.name}
            loading="lazy"
            className={imgClass}
            style={{ ["--logo-scale" as string]: scale }}
          />
        ) : (
          <span className={styles.text}>{l.name}</span>
        )}
      </div>
    );
  };

  const farItems = buildSlice(0, 14);
  const midItems = buildSlice(7, 14);
  const nearItems = buildSlice(14, 14);
  const farBack = buildSlice(3, 14);

  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />

      <div className={styles.header}>
        <h2 className={styles.title}>Trusted by Billion Dollar Brands</h2>
      </div>

      <div className={styles.stack}>
        <div
          className={`${styles.row} ${styles.far}`}
          style={{ ["--dur" as string]: "95s" }}
        >
          {farItems.map((l, i) => renderItem(l, `far-a-${l.name}-${i}`))}
          {farItems.map((l, i) => renderItem(l, `far-b-${l.name}-${i}`))}
        </div>

        <div
          className={`${styles.row} ${styles.mid} ${styles.reverse}`}
          style={{ ["--dur" as string]: "70s" }}
        >
          {midItems.map((l, i) => renderItem(l, `mid-a-${l.name}-${i}`))}
          {midItems.map((l, i) => renderItem(l, `mid-b-${l.name}-${i}`))}
        </div>

        <div
          className={`${styles.row} ${styles.near}`}
          style={{ ["--dur" as string]: "50s" }}
        >
          {nearItems.map((l, i) => renderItem(l, `near-a-${l.name}-${i}`))}
          {nearItems.map((l, i) => renderItem(l, `near-b-${l.name}-${i}`))}
        </div>

        <div
          className={`${styles.row} ${styles.far} ${styles.reverse}`}
          style={{ ["--dur" as string]: "110s" }}
        >
          {farBack.map((l, i) => renderItem(l, `farb-a-${l.name}-${i}`))}
          {farBack.map((l, i) => renderItem(l, `farb-b-${l.name}-${i}`))}
        </div>
      </div>
    </section>
  );
}
