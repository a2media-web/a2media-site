import styles from "./Process.module.css";

const STEPS = [
  {
    eyebrow: "Step One:",
    title: "The 3-Week Jumpstart",
    desc:
      "We study your buyer psychology — sales calls, competitor content, comments, anywhere your buyers show up online. Then we build your custom video roadmap, write your scripts, and map out exactly what to create and how to distribute it.",
  },
  {
    eyebrow: "Step Two:",
    title: "We Build Your Video Engine.",
    desc:
      "We design the video system that works for your team, then script, edit, and give world-class quality videos within 48-72 hours. We give you videos every week, all tailored to your buyers.",
  },
  {
    eyebrow: "Step Three:",
    title: "Your Videos Build Pipeline.",
    desc:
      "Within a month, your sales team has videos they're proud to send out. Prospects show up to calls already educated. By month 6, video becomes one of your main drivers of buyer trust.",
  },
];

export default function Process() {
  return (
    <section id="our-process" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          3 Steps to <span>Turning Video Into Pipeline</span>
        </h2>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s.title} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div className={styles.stepEyebrow}>{s.eyebrow}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <div className={styles.ctaTitle}>Let&apos;s Talk.</div>
          <a
            href="https://cal.com/a2media/meeting"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtn}
          >
            Book a Discovery Call <span aria-hidden>→</span>
          </a>
          <div className={styles.ctaNote}>Free 30-minute call · No commitment</div>
        </div>
      </div>
    </section>
  );
}
