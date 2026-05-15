"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./KineticReel.module.css";

const FORMATS = [
  {
    word: "shorts",
    label: "Short-Form Hooks",
    image:
      "https://embed-ssl.wistia.com/deliveries/b48839a85b16ec9f5c92e0b8805c7587.webp?image_crop_resized=960x538",
  },
  {
    word: "longform",
    label: "Long-Form Episodes",
    image:
      "https://embed-ssl.wistia.com/deliveries/4a2bee14633e63ce6ec3418ca39101eeeb50cd7a.webp?image_crop_resized=960x540",
  },
  {
    word: "demos",
    label: "Product & Demo Videos",
    image:
      "https://embed-ssl.wistia.com/deliveries/b28891103db38be77b752b8b1b751b8f.webp?image_crop_resized=960x540",
  },
  {
    word: "ads",
    label: "Brand Ads",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/685575c9a91573d1c350f372_Steven-Bartlett-Crop-3.png",
  },
  {
    word: "stories",
    label: "Customer Stories",
    image:
      "https://cdn.prod.website-files.com/64bfb907363259218e796320/6855796f57835e2853587700_Ali_Abdaal_m3ulli.jpg",
  },
];

export default function KineticReel() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out" | "idle">("idle");
  const fadeMs = 600;
  const holdMs = 2400;
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cycle = () => {
      if (cancelled) return;
      setPhase("out");
      const t1 = window.setTimeout(() => {
        if (cancelled) return;
        setIdx((i) => (i + 1) % FORMATS.length);
        setPhase("in");
        const t2 = window.setTimeout(() => {
          if (cancelled) return;
          setPhase("idle");
        }, fadeMs);
        tRef.current = t2 as unknown as number;
      }, fadeMs);
      tRef.current = t1 as unknown as number;
    };
    const id = window.setInterval(cycle, holdMs + fadeMs * 2);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, []);

  const swapClass =
    phase === "out" ? styles.swapOut : phase === "in" ? styles.swapIn : "";

  const current = FORMATS[idx];

  return (
    <section className={styles.section}>
      <div className={styles.veil} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we make</p>
        <h2 className={styles.heading}>
          We make{" "}
          <em className={`${styles.swap} ${swapClass}`}>{current.word}</em>
        </h2>
        <p className={styles.sub}>
          One creative team. Every format your buyers actually watch.
        </p>

        <div className={styles.frame}>
          <div className={styles.frameBezel} aria-hidden />
          <div className={styles.frameNotch} aria-hidden />
          <div className={styles.frameInner}>
            {FORMATS.map((f, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={f.word}
                src={f.image}
                alt={f.label}
                className={`${styles.media} ${i === idx ? styles.activeMedia : ""}`}
              />
            ))}
            <div className={styles.frameOverlay} aria-hidden />
            <div className={styles.frameLabel}>
              <span className={styles.dot} /> {current.label}
            </div>
          </div>
        </div>

        <div className={styles.dots}>
          {FORMATS.map((_, i) => (
            <span
              key={i}
              className={`${styles.dotInd} ${i === idx ? styles.dotActive : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
