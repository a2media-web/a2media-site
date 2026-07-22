"use client";

import styles from "./Hero.module.css";

const TRUST_LOGOS = [
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/65e9e913df3011054a62442e_Okta_Logo_White_Medium.png", alt: "Okta" },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/64cc83f851512b1224dc1573_SHOP_BIG.D-bc80c1f3.png", alt: "Shopify", className: "shopify" },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f1d717fe36ab2b51b4d2a4_chili%20piper.png", alt: "Chili Piper", className: "chili" },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/66c5f4f2fcc977d035928abc_CB.svg", alt: "Crossbeam", className: "hideOnMobile" },
  { src: "/logos/Slate.png", alt: "Slate", className: "slate" },
  { src: "/logos/wishly.png", alt: "Wishly Group", className: "wishly hideOnMobile" },
];

export default function Hero() {
  return (
    <header id="Hero" className={styles.section}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/videos/hero-bg.mp4"
        aria-hidden
      />
      <div className={styles.veil} aria-hidden />

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden />
          600+ Sales-Driven Videos for B2B SaaS Teams
        </p>

        <h1 className={styles.title}>
          <span className={styles.line}>Going viral is cool.</span>
          <span className={styles.line}>
            Making money is <span className={styles.teal}>cooler.</span>
          </span>
        </h1>

        <p className={styles.sub}>
          We study the shit out of your buyers. Then ideate, build, and edit the videos that convert them without them ever feeling sold to.
        </p>

        <div className={styles.ctas}>
          <a href="#Pricing" className={styles.btnPrimary}>
            See if we&apos;re a fit <span aria-hidden>→</span>
          </a>
          <a href="#work" className={styles.btnGhost}>
            See the work
          </a>
        </div>

        <div className={styles.trust}>
          <p className={styles.trustLabel}>Trusted by</p>
          <div className={styles.trustRow}>
            {TRUST_LOGOS.map((l) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={l.alt}
                src={l.src}
                alt={l.alt}
                className={l.className
                  ?.split(" ")
                  .map((c) => styles[c])
                  .join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
