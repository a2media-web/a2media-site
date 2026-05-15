import styles from "./PhoneStack.module.css";

const PHONES = [
  {
    label: "Founder Hooks",
    sub: "9:16 · LinkedIn + IG",
    image:
      "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538",
    pos: "left",
  },
  {
    label: "Customer Stories",
    sub: "9:16 · TikTok native",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/6855796f57835e2853587700_Ali_Abdaal_m3ulli.jpg",
    pos: "center",
  },
  {
    label: "Sales Reels",
    sub: "9:16 · Outbound enabled",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/685583659fd2cbacac97456d_will-smith-new-headshot-credit-lorenzo-agius_wide-e7290985cc97649f61eb4c28e84d6b272f69202d.jpg",
    pos: "right",
  },
];

export default function PhoneStack() {
  return (
    <section className={styles.section}>
      <div className={styles.veil} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>What we make</p>
          <h2 className={styles.heading}>
            Built for the <span>feed.</span>
          </h2>
          <p className={styles.sub}>
            Vertical video that out-performs static posts on every B2B feed.
          </p>
        </div>

        <div className={styles.stage}>
          {PHONES.map((p) => (
            <div key={p.label} className={`${styles.phone} ${styles[p.pos]}`}>
              <div className={styles.frame}>
                <div className={styles.notch} aria-hidden />
                <div className={styles.screen}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.label} />
                  <div className={styles.gradient} aria-hidden />
                  <div className={styles.live}>
                    <span className={styles.dot} /> Auto-play
                  </div>
                  <div className={styles.caption}>
                    <div className={styles.captionLabel}>{p.label}</div>
                    <div className={styles.captionSub}>{p.sub}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
