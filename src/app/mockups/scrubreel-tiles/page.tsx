import styles from "./TileVariants.module.css";

const SAMPLE = [
  { idx: 1, client: "BLUECONIC", label: "Brand Refresh", sub: "Turn your new look into an iconic video." },
  { idx: 2, client: "SHOPIFY", label: "Customer Stories", sub: "Make your customers look good." },
  { idx: 3, client: "REVEAL", label: "Episodic Series", sub: "Keep bringing your prospects back with addictive content." },
];

export default function ScrubReelTilesMockup() {
  return (
    <main>
      <Frame
        tag="Current"
        title="Number-only badge"
        notes="What's on the site now — just an ordinal '01 / 02 / 03' badge in the top-left corner."
      >
        {SAMPLE.map((s) => (
          <Tile key={`cur-${s.idx}`} label={s.label} sub={s.sub}>
            <div className={styles.badgeA}>
              {String(s.idx).padStart(2, "0")}
            </div>
          </Tile>
        ))}
      </Frame>

      <Frame
        tag="Option A"
        title="Swap-out — client name replaces the number"
        notes="Same pill, same position, same styling — but the text becomes the client name. Minimal visual change, maximum brand recall."
      >
        {SAMPLE.map((s) => (
          <Tile key={`a-${s.idx}`} label={s.label} sub={s.sub}>
            <div className={styles.badgeA}>{s.client}</div>
          </Tile>
        ))}
      </Frame>

      <Frame
        tag="Option B"
        title="Stacked badge — ordinal on top, client below"
        notes="Keeps the '01 / 02 / 03' sense of order, adds the client name in a second line inside the same badge. Most information-dense."
      >
        {SAMPLE.map((s) => (
          <Tile key={`b-${s.idx}`} label={s.label} sub={s.sub}>
            <div className={styles.badgeB}>
              <span className={styles.num}>
                {String(s.idx).padStart(2, "0")}
              </span>
              <span className={styles.client}>{s.client}</span>
            </div>
          </Tile>
        ))}
      </Frame>

      <Frame
        tag="Option C"
        title="Two-badge — number left, client name right"
        notes="Number stays in its original spot (now muted), client name lives in its own filled-purple pill in the top-right. Most prominent client read."
      >
        {SAMPLE.map((s) => (
          <Tile key={`c-${s.idx}`} label={s.label} sub={s.sub}>
            <div className={styles.badgeC}>
              {String(s.idx).padStart(2, "0")}
            </div>
            <div className={styles.clientC}>{s.client}</div>
          </Tile>
        ))}
      </Frame>
    </main>
  );
}

function Frame({
  tag,
  title,
  notes,
  children,
}: {
  tag: string;
  title: string;
  notes: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.frame}>
      <span className={styles.tag}>{tag}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.notes}>{notes}</p>
      <div className={styles.row}>{children}</div>
    </section>
  );
}

function Tile({
  label,
  sub,
  children,
}: {
  label: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.tile}>
      <div className={styles.bg} aria-hidden />
      <div className={styles.shim} aria-hidden />
      {children}
      <div className={styles.meta}>
        <div className={styles.label}>{label}</div>
        <div className={styles.subLabel}>{sub}</div>
      </div>
    </div>
  );
}
