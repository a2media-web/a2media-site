"use client";

import { useState } from "react";
import styles from "./TabSwitcher.module.css";

const FORMATS = [
  {
    id: "shortform",
    label: "Short-Form",
    sub: "9:16 · LinkedIn + IG + TikTok",
    client: "Reveal · Founder hooks",
    image:
      "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538",
    aspect: "9 / 16",
  },
  {
    id: "longform",
    label: "Long-Form",
    sub: "16:9 · YouTube + Wistia",
    client: "Auth0 · Developer education series",
    image:
      "https://embed-ssl.wistia.com/deliveries/4a2bee14633e63ce6ec3418ca39101eeeb50cd7a.webp?image_crop_resized=960x540",
    aspect: "16 / 9",
  },
  {
    id: "demo",
    label: "Demo",
    sub: "16:9 · Sales enablement",
    client: "Close · Homepage product video",
    image:
      "https://embed-ssl.wistia.com/deliveries/b28891103db38be77b752b8b1b751b8f.webp?image_crop_resized=960x540",
    aspect: "16 / 9",
  },
  {
    id: "thoughtleadership",
    label: "Thought Leadership",
    sub: "1:1 · LinkedIn native",
    client: "Founder + executive talking heads",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/685583659fd2cbacac97456d_will-smith-new-headshot-credit-lorenzo-agius_wide-e7290985cc97649f61eb4c28e84d6b272f69202d.jpg",
    aspect: "16 / 9",
  },
  {
    id: "brand",
    label: "Brand Story",
    sub: "16:9 · Big swings",
    client: "PartnerHacker · Nearbound origin",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/685575c9a91573d1c350f372_Steven-Bartlett-Crop-3.png",
    aspect: "16 / 9",
  },
];

export default function TabSwitcher() {
  const [active, setActive] = useState(FORMATS[0].id);
  const current = FORMATS.find((f) => f.id === active) ?? FORMATS[0];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>What we make</p>
          <h2 className={styles.heading}>
            Pick a format. <span>See the work.</span>
          </h2>
        </div>

        <div className={styles.tabs} role="tablist">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={f.id === active}
              className={`${styles.tab} ${f.id === active ? styles.tabActive : ""}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.viewer} key={current.id}>
          <div
            className={styles.frame}
            style={{ aspectRatio: current.aspect }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.label}
              className={styles.media}
            />
            <div className={styles.shim} aria-hidden />
            <div className={styles.live}>
              <span className={styles.dot} /> Now playing
            </div>
          </div>
          <div className={styles.meta}>
            <div className={styles.metaLabel}>{current.label}</div>
            <div className={styles.metaSub}>{current.sub}</div>
            <div className={styles.metaClient}>{current.client}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
