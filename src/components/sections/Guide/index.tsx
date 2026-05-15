import styles from "./Guide.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Very few people understand video and marketing as much as A2 Media. They are one of the best agencies out there, they don't just produce, they think strategically about every piece of content.",
    name: "Tobi Oluwole",
    role: "CEO, Magnate · 300K+ LinkedIn Followers",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/68a31f15cb721ef5a93c8741_zobi1kSGMj5s0f0ZI8vLyfW2jw.jpeg",
  },
  {
    quote:
      "A2 Media is one of the best video agencies we've ever worked with. They understood our product, our audience, and delivered content that actually moved the needle for our marketing.",
    name: "Madeleine Work",
    role: "Sr. Product Marketing Manager, Chili Piper",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/68ffe07880d0ae5c085ec9e1_1758139797919.png",
  },
  {
    quote:
      "Working with A2 Media completely changed how we approach video. They brought a level of strategy and execution we hadn't seen from any other agency.",
    name: "Martin",
    role: "Owner, CEG Consult",
    avatar:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/699505f0ef9da222e04efd93_1741721282818.jpeg",
  },
];

export default function Guide() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>We&apos;ve been there</p>
        <h2 className={styles.heading}>
          We know what it&apos;s like to spend $30K
          <span className={styles.accent}>on a video that makes&nbsp;$0.</span>
        </h2>
        <p className={styles.body}>
          So we built A2 Media differently. Every video we make starts with one
          question:
          <br />
          <span className={styles.bodyEmphasis}>
            &ldquo;how does this video help close deals?&rdquo;
          </span>
        </p>

        <div className={styles.tGrid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={styles.tCard}>
              <p className={styles.tQuote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.tAuthor}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.tAvatar} src={t.avatar} alt={t.name} />
                <div>
                  <div className={styles.tName}>{t.name}</div>
                  <div className={styles.tRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
