"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const SWAP_WORDS = [
  "closing deals",
  "driving pipeline",
  "converting buyers",
  "building trust",
];

const TRUST_LOGOS = [
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/65e9e913df3011054a62442e_Okta_Logo_White_Medium.png", alt: "Okta" },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/64cc83f851512b1224dc1573_SHOP_BIG.D-bc80c1f3.png", alt: "Shopify", className: "shopify" },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/67f1d717fe36ab2b51b4d2a4_chili%20piper.png", alt: "Chili Piper", className: "chili" },
  { src: "https://cdn.prod.website-files.com/64bfb907363259218e796320/66c5f4f2fcc977d035928abc_CB.svg", alt: "Crossbeam", className: "hideOnMobile" },
  { src: "/logos/Slate.png", alt: "Slate", className: "slate" },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out" | "idle">("idle");
  const fadeMs = 700;
  const holdMs = 2400;
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cycle = () => {
      if (cancelled) return;
      // Out
      setPhase("out");
      const swapTimeout = window.setTimeout(() => {
        if (cancelled) return;
        setWordIndex((i) => (i + 1) % SWAP_WORDS.length);
        setPhase("in");
        const idleTimeout = window.setTimeout(() => {
          if (cancelled) return;
          setPhase("idle");
        }, fadeMs);
        rafRef.current = idleTimeout as unknown as number;
      }, fadeMs);
      rafRef.current = swapTimeout as unknown as number;
    };
    const id = window.setInterval(cycle, holdMs + fadeMs * 2);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      if (rafRef.current) window.clearTimeout(rafRef.current);
    };
  }, []);

  const italicClass =
    phase === "out" ? styles.italicOut : phase === "in" ? styles.italicIn : "";

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
          <span className={styles.line}>Your videos should be</span>
          <span className={`${styles.line} ${styles.lineDesktop}`}>
            <em className={`${styles.italic} ${italicClass}`}>
              {SWAP_WORDS[wordIndex]}
            </em>
            <span>for you.</span>
          </span>
          <span className={`${styles.line} ${styles.lineMobile}`} aria-hidden>
            <em className={styles.italic}>closing deals</em>
            <span>for you.</span>
          </span>
        </h1>

        <p className={styles.sub}>
          We go deep on your buyer psychology, map out 6&nbsp;months of video, then
          hand your team content that looks as good as it performs.
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
                className={l.className ? styles[l.className] : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
