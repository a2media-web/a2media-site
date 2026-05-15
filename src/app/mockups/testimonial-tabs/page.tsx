import styles from "./TabVariants.module.css";

export default function TestimonialTabsMockup() {
  return (
    <main>
      <Frame
        tag="Current"
        notes="Where we are now — inactive tab is faded grey, container is barely visible."
      >
        <CurrentTabs />
      </Frame>

      <Frame
        tag="Option A · Bigger & Bolder"
        notes="Same structure, but larger padding, heavier font weight, brighter inactive state, and a more visible pill container."
      >
        <OptionATabs />
      </Frame>

      <Frame
        tag="Option B · Active Glow"
        notes="Active tab gets a strong purple aura + glassmorphic container. Inactive tab is full-white text. Most dramatic, most A2-on-brand."
      >
        <OptionBTabs />
      </Frame>

      <Frame
        tag="Option C · Both Filled"
        notes="No container. Each tab is a standalone pill with its own background. Most prominent — both tabs read as buttons."
      >
        <OptionCTabs />
      </Frame>
    </main>
  );
}

function Frame({
  tag,
  notes,
  children,
}: {
  tag: string;
  notes: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.frame}>
      <span className={styles.tag}>{tag}</span>
      <h2 className={styles.title}>Our Customers Love Us.</h2>
      {children}
      <p className={styles.notes}>{notes}</p>
    </section>
  );
}

function CurrentTabs() {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 4,
        padding: 4,
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius: 999,
      }}
    >
      <button
        type="button"
        style={{
          padding: "10px 22px",
          fontSize: 14,
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.65)",
          background: "transparent",
          border: 0,
          borderRadius: 999,
          cursor: "pointer",
        }}
      >
        Individual Reviews
      </button>
      <button
        type="button"
        style={{
          padding: "10px 22px",
          fontSize: 14,
          fontWeight: 600,
          color: "#fff",
          background: "var(--a2-electric-purple)",
          border: 0,
          borderRadius: 999,
          cursor: "pointer",
        }}
      >
        Compilation
      </button>
    </div>
  );
}

function OptionATabs() {
  return (
    <div className={styles.aTabs}>
      <button type="button" className={styles.aTab}>Individual Reviews</button>
      <button type="button" className={`${styles.aTab} ${styles.aActive}`}>Compilation</button>
    </div>
  );
}

function OptionBTabs() {
  return (
    <div className={styles.bTabs}>
      <button type="button" className={styles.bTab}>Individual Reviews</button>
      <button type="button" className={`${styles.bTab} ${styles.bActive}`}>Compilation</button>
    </div>
  );
}

function OptionCTabs() {
  return (
    <div className={styles.cTabs}>
      <button type="button" className={styles.cTab}>Individual Reviews</button>
      <button type="button" className={`${styles.cTab} ${styles.cActive}`}>Compilation</button>
    </div>
  );
}
