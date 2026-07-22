import styles from "./Pain.module.css";

const PAIN_POINTS = [
  {
    title: "You've tried copying your competitors. It didn't work.",
    desc: "You saw what your competitors were posting and made the same thing. It didn't work because those videos were built for their buyers, not yours.",
  },
  {
    title: "You became the video department.",
    desc: "Nobody hired you to produce content. But somehow you're sourcing editors, chasing approvals, and explaining why last quarter's videos didn't move pipeline.",
  },
  {
    title: "You know video should work. You just can't prove it yet.",
    desc: "You've tried using video in a dozen different ways and none of it connects to revenue. Every quarter you have to explain why.",
  },
];

export default function Pain() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          <span>You&apos;ve tried video.</span>
          <span>It didn&apos;t move the needle.</span>
        </h2>
        <p className={styles.body}>
          You hired a freelancer, bought an AI tool, or tried it in-house. The
          videos looked fine. But nothing changed, your sales team never used
          them, your pipeline stayed flat, and you&apos;re left wondering if video
          actually works in B2B.
        </p>
        <div className={styles.painRow}>
          {PAIN_POINTS.map((p) => (
            <div key={p.title} className={styles.painItem}>
              <div className={styles.painTitle}>{p.title}</div>
              <div className={styles.painDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
