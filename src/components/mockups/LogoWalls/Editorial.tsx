import { LOGOS } from "./logos";
import styles from "./Editorial.module.css";

const SIZE_PATTERN = ["s3", "s2", "s1", "s4", "s2", "s1", "s3", "s2", "s4", "s1"];
const ITALIC_INDEXES = new Set([2, 9, 16, 21]);

export default function EditorialWall() {
  return (
    <section className={styles.section}>
      <div className={styles.ambient} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Trusted by</span>
          <h2 className={styles.title}>
            Names you know. <em>Work that closed.</em>
          </h2>
        </div>

        <div className={styles.wall}>
          {LOGOS.map((l, i) => {
            const sizeKey = SIZE_PATTERN[i % SIZE_PATTERN.length];
            const sizeClass = styles[sizeKey];
            const isItalic = ITALIC_INDEXES.has(i);
            const cls = [
              styles.word,
              sizeClass,
              isItalic ? styles.italic : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <span key={l.name}>
                <span className={cls}>{l.name}</span>
                {i < LOGOS.length - 1 && (
                  <span className={styles.divider} aria-hidden />
                )}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
