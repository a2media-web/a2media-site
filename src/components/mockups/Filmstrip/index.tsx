import styles from "./Filmstrip.module.css";

const FRAMES = [
  { label: "Short-Form Hooks", image: "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538" },
  { label: "Long-Form Episodes", image: "https://embed-ssl.wistia.com/deliveries/4a2bee14633e63ce6ec3418ca39101eeeb50cd7a.webp?image_crop_resized=960x540" },
  { label: "Product & Demo", image: "https://embed-ssl.wistia.com/deliveries/b28891103db38be77b752b8b1b751b8f.webp?image_crop_resized=960x540" },
  { label: "Thought Leadership", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/685583659fd2cbacac97456d_will-smith-new-headshot-credit-lorenzo-agius_wide-e7290985cc97649f61eb4c28e84d6b272f69202d.jpg" },
  { label: "Brand Stories", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/685575c9a91573d1c350f372_Steven-Bartlett-Crop-3.png" },
  { label: "Customer Reels", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/6855796f57835e2853587700_Ali_Abdaal_m3ulli.jpg" },
];

export default function Filmstrip() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>What we make</p>
        <h2 className={styles.heading}>
          A reel of <span>everything we ship.</span>
        </h2>
        <p className={styles.sub}>Drag · scroll · or hover to pause the strip.</p>
      </div>

      <div className={styles.cinema}>
        <div className={styles.sprocketTop} aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className={styles.stripWrap}>
          <div className={styles.strip}>
            {[...FRAMES, ...FRAMES].map((f, i) => (
              <div key={i} className={styles.frame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.image} alt={f.label} />
                <div className={styles.gradient} aria-hidden />
                <div className={styles.label}>
                  <span className={styles.idx}>
                    {String((i % FRAMES.length) + 1).padStart(2, "0")}
                  </span>
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sprocketBottom} aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className={styles.playhead} aria-hidden>
          <div className={styles.playheadLine} />
          <div className={styles.playheadDot} />
        </div>
      </div>
    </section>
  );
}
