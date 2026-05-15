import styles from "./MarqueeWall.module.css";

const ROW_A = [
  { label: "Sales-Ready Demo", image: "https://embed-ssl.wistia.com/deliveries/4a2bee14633e63ce6ec3418ca39101eeeb50cd7a.webp?image_crop_resized=960x540" },
  { label: "Founder Hook", image: "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538" },
  { label: "Product Explainer", image: "https://embed-ssl.wistia.com/deliveries/b28891103db38be77b752b8b1b751b8f.webp?image_crop_resized=960x540" },
  { label: "Customer Reel", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/6855796f57835e2853587700_Ali_Abdaal_m3ulli.jpg" },
  { label: "Brand Story", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/685575c9a91573d1c350f372_Steven-Bartlett-Crop-3.png" },
  { label: "Webinar Cut-Down", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/685583659fd2cbacac97456d_will-smith-new-headshot-credit-lorenzo-agius_wide-e7290985cc97649f61eb4c28e84d6b272f69202d.jpg" },
];

const ROW_B = [
  { label: "Outbound Loom", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/685575c9a91573d1c350f372_Steven-Bartlett-Crop-3.png" },
  { label: "Thought Leadership", image: "https://embed-ssl.wistia.com/deliveries/4a2bee14633e63ce6ec3418ca39101eeeb50cd7a.webp?image_crop_resized=960x540" },
  { label: "TikTok Native", image: "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538" },
  { label: "Event Recap", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/6855796f57835e2853587700_Ali_Abdaal_m3ulli.jpg" },
  { label: "Sales Pitch Deck", image: "https://embed-ssl.wistia.com/deliveries/b28891103db38be77b752b8b1b751b8f.webp?image_crop_resized=960x540" },
  { label: "Series Episode", image: "https://cdn.prod.website-files.com/64bfb907363259218e796320/685583659fd2cbacac97456d_will-smith-new-headshot-credit-lorenzo-agius_wide-e7290985cc97649f61eb4c28e84d6b272f69202d.jpg" },
];

export default function MarqueeWall() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>What we make</p>
        <h2 className={styles.heading}>
          A wall of <span>video that moves pipeline.</span>
        </h2>
      </div>

      <div className={styles.row}>
        <div className={`${styles.track} ${styles.left}`}>
          {[...ROW_A, ...ROW_A].map((item, i) => (
            <div key={`a-${i}`} className={styles.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.label} />
              <div className={styles.tileLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.track} ${styles.right}`}>
          {[...ROW_B, ...ROW_B].map((item, i) => (
            <div key={`b-${i}`} className={styles.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.label} />
              <div className={styles.tileLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
