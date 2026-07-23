import styles from "./Pain.module.css";

const PAIN_POINTS = [
  {
    // \n forces "It flopped." onto its own line, mirroring the main heading.
    title: "You tried copying your competitors.\nIt flopped.",
    desc: "Your team was convinced that copying the competition was the answer. It wasn't. But trust us, there's a 99% chance it didn't work for them either.",
  },
  {
    title: "You became the video department.",
    desc: "Video wasn't in your job description. But somehow you got stuck figuring it out, and it's hard af.",
  },
  {
    title: "You know video works. You just can't prove it yet.",
    desc: "You keep waiting for the ONE video that will justify all the spend. It's never coming.",
  },
];

export default function Pain() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          <span>You tried video.</span>
          <span>It sucked.</span>
        </h2>
        <p className={styles.body}>
          If you&apos;re anything like our clients, you&apos;ve tried the freelancer,
          the &ldquo;insane&rdquo; AI tool, or maybe even hiring in-house. The videos
          looked fine&hellip; But nothing changed, and you can&apos;t quite put your
          finger on why.
        </p>
        <div className={styles.painRow}>
          {PAIN_POINTS.map((p) => (
            <div key={p.title} className={styles.painItem}>
              <div className={styles.painTitle}>
                {p.title.split("\n").map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
              <div className={styles.painDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
