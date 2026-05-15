import styles from "./FinalCTA.module.css";

const AVATARS = [
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f28dfc62947225c4c99_1770923418055.png",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f286dce40d7485b4d3a_1767315543111.jpeg",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f287ead7017925ff94f_1735224274497.jpeg",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/69921f28c84070bd03569d5d_1747749050965.jpeg",
  "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f4361b24f74f27e5a2a996_1719406706007-p-130x130q80.jpeg",
];

export default function FinalCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.proofRow}>
          <div className={styles.avatars}>
            {AVATARS.map((src, i) => (
              <span key={i} className={styles.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
              </span>
            ))}
          </div>
          <p className={styles.proof}>
            <strong>25+ B2B teams</strong> already building trust through video.
          </p>
        </div>

        <h2 className={styles.title}>
          Your brand deserves <span>content that converts.</span>
        </h2>

        <p className={styles.sub}>
          Let&apos;s build a video strategy that turns viewers into pipeline.
        </p>

        <a
          href="https://cal.com/a2media/meeting"
          target="_blank"
          rel="noreferrer"
          className={styles.btn}
        >
          Book a Discovery Call <span aria-hidden>→</span>
        </a>

        <div className={styles.note}>Free · 30 minutes · No commitment</div>
      </div>
    </section>
  );
}
