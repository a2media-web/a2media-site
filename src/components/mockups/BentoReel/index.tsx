import styles from "./BentoReel.module.css";

const FORMATS = [
  {
    label: "Long-Form Episode",
    sub: "16:9 · YouTube + Wistia",
    image:
      "https://embed-ssl.wistia.com/deliveries/4a2bee14633e63ce6ec3418ca39101eeeb50cd7a.webp?image_crop_resized=960x540",
    cell: "hero",
  },
  {
    label: "Short-Form Hook",
    sub: "9:16 · LinkedIn + IG",
    image:
      "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538",
    cell: "tall",
  },
  {
    label: "Product Demo",
    sub: "16:9 · Sales enablement",
    image:
      "https://embed-ssl.wistia.com/deliveries/b28891103db38be77b752b8b1b751b8f.webp?image_crop_resized=960x540",
    cell: "wide",
  },
  {
    label: "Thought Leadership",
    sub: "1:1 · LinkedIn native",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/685583659fd2cbacac97456d_will-smith-new-headshot-credit-lorenzo-agius_wide-e7290985cc97649f61eb4c28e84d6b272f69202d.jpg",
    cell: "small",
  },
  {
    label: "Customer Story",
    sub: "16:9 · Case study reel",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/6855796f57835e2853587700_Ali_Abdaal_m3ulli.jpg",
    cell: "small",
  },
];

export default function BentoReel() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we make</p>
        <h2 className={styles.heading}>
          Every format your <span>buyers</span> are watching.
        </h2>
        <p className={styles.sub}>
          Five video formats. One pipeline-driven strategy. Hover any cell to
          highlight.
        </p>

        <div className={styles.bento}>
          {FORMATS.map((f) => (
            <div
              key={f.label}
              className={`${styles.cell} ${styles[f.cell]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.image} alt={f.label} className={styles.media} />
              <div className={styles.shim} aria-hidden />
              <div className={styles.tag}>
                <span className={styles.live}>
                  <span className={styles.dot} /> Live reel
                </span>
              </div>
              <div className={styles.meta}>
                <div className={styles.label}>{f.label}</div>
                <div className={styles.subLabel}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
