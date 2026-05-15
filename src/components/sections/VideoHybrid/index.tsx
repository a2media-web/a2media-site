import styles from "./VideoHybrid.module.css";

const FEATURED = "https://fast.wistia.net/embed/iframe/io59i5b5fc?seo=false&videoFoam=true";

const THUMBS = [
  {
    client: "Asana",
    title: "Sample Edit",
    image: "https://embed-ssl.wistia.com/deliveries/b28891103db38be77b752b8b1b751b8f.webp?image_crop_resized=960x540",
  },
  {
    client: "Close",
    title: "HomePage Product Video",
    image: "https://embed-ssl.wistia.com/deliveries/4a2bee14633e63ce6ec3418ca39101eeeb50cd7a.webp?image_crop_resized=960x540",
  },
  {
    client: "PowerChord",
    title: "YouTube Series",
    image: "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538",
  },
];

export default function VideoHybrid() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Our Work</p>
          <h2 className={styles.heading}>Content That Converts</h2>
        </div>

        <div className={styles.featured}>
          <iframe
            src={FEATURED}
            allow="autoplay; fullscreen"
            title="A2 Media featured reel"
          />
        </div>

        <div className={styles.thumbRow}>
          {THUMBS.map((t) => (
            <div key={t.client} className={styles.thumb}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.image} alt={`${t.client} ${t.title}`} />
              <div className={styles.thumbLabel}>
                <div className={styles.thumbClient}>{t.client}</div>
                <div className={styles.thumbTitle}>{t.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.intro}>
          <h3 className={styles.introHeading}>What We Create</h3>
          <p className={styles.categories}>
            Short-Form <span>•</span> Long-Form <span>•</span> Product &amp; Explainers <span>•</span> Thought Leadership <span>•</span> Brand Stories
          </p>
        </div>

        <div className={styles.ctaRow}>
          <a
            href="https://fast.wistia.com/embed/channel/fj6gynv9qi"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtn}
          >
            View Full Portfolio <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
