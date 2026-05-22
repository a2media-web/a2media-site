"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrubReel.module.css";

const FORMATS = [
  {
    label: "Shorts & Ads",
    sub: "Reels and paid ads built for the feed.",
    videoId: "apivro02ry",
    aspect: "9 / 16",
    client: "BlueConic",
  },
  {
    label: "Sizzle reel",
    sub: "Trailers that bring the hype.",
    videoId: "io59i5b5fc",
    aspect: "16 / 9",
    client: "A2 Media",
  },
  {
    label: "Customer Stories",
    sub: "Make your customers look good.",
    videoId: "wyj54nrmol",
    aspect: "16 / 9",
    client: "Chili Piper",
  },
  {
    label: "Storytelling",
    sub: "Entertain your customers while teaching them.",
    videoId: "cbksj45v2l",
    aspect: "16 / 9",
    client: "Slate",
  },
  {
    label: "Animated Explainers",
    sub: "Visualize what cameras can't capture.",
    videoId: "qidqrdit0r",
    aspect: "16 / 9",
    client: "Close",
  },
  {
    label: "Talking Head Videos",
    sub: "Founder and executive thought leadership.",
    videoId: "stlupwk5hi",
    aspect: "16 / 9",
    client: "Asana",
  },
  {
    label: "Brand Refresh",
    sub: "Turn your new look into an iconic video.",
    videoId: "vunc7n43g5",
    aspect: "16 / 9",
    client: "A2 Media",
  },
  {
    label: "Episodic Series",
    sub: "Keep bringing your prospects back with addictive content.",
    videoId: "bdvyv8woqp",
    aspect: "16 / 9",
    client: "Close",
  },
  {
    label: "YouTube Series",
    sub: "Make your audience love learning things with you.",
    videoId: "5trb6a2h4p",
    aspect: "16 / 9",
    client: "Powerchord",
  },
  {
    label: "Product Launches",
    sub: "Keep your customers excited about what's coming.",
    videoId: "qrr3taje3a",
    aspect: "16 / 9",
    client: "Warmly",
  },
];

const ambientSrc = (id: string) =>
  `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&muted=true&endVideoBehavior=loop&playButton=false&smallPlayButton=false&fullscreenButton=false&playbar=false&volumeControl=false&controlsVisibleOnLoad=false&seo=false&videoFoam=true`;

const lightboxSrc = (id: string) =>
  `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&seo=false&videoFoam=true`;

export default function ScrubReel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  const open = FORMATS.find((f) => f.videoId === openId);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const strip = stripRef.current;
      if (!strip) return;
      const overflow = strip.scrollWidth - window.innerWidth;
      setMaxTranslate(Math.max(0, overflow + 32));
    };
    const update = () => {
      raf = 0;
      const w = wrapRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const t = window.setTimeout(measure, 800);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Lock body scroll + close on ESC
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openId]);

  const translatePx = -(progress * maxTranslate);

  return (
    <section ref={wrapRef} id="work" className={styles.wrap}>
      <div className={styles.sticky}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>What we make</p>
          <h2 className={styles.heading}>
            Any video format you can think of,{" "}
            <span>we make it.</span>
          </h2>
        </div>

        <div className={styles.viewport}>
          <div
            ref={stripRef}
            className={styles.strip}
            style={{ transform: `translate3d(${translatePx}px, 0, 0)` }}
          >
            {FORMATS.map((f, i) => (
              <button
                key={f.videoId}
                type="button"
                className={styles.card}
                style={{ aspectRatio: f.aspect }}
                onClick={() => setOpenId(f.videoId)}
                aria-label={`Play ${f.label}`}
              >
                <div className={styles.frameInner}>
                  <iframe
                    className={styles.media}
                    src={ambientSrc(f.videoId)}
                    title={`${f.label} ambient`}
                    allow="autoplay; fullscreen"
                    aria-hidden
                    tabIndex={-1}
                  />
                </div>
                <div className={styles.shim} aria-hidden />
                <div className={styles.idx}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={styles.client}>{f.client}</div>
                <div className={styles.playOverlay} aria-hidden>
                  <div className={styles.playBtn}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className={styles.playLabel}>Click to watch</div>
                </div>
                <div className={styles.meta}>
                  <div className={styles.label}>{f.label}</div>
                  <div className={styles.subLabel}>{f.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className={styles.footer}>
          <span className={styles.scrollHint}>Scroll to explore →</span>
          <a
            href="https://fast.wistia.com/embed/channel/fj6gynv9qi"
            target="_blank"
            rel="noreferrer"
            className={styles.portfolioBtn}
          >
            See our full portfolio <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {open ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={open.label}
          onClick={() => setOpenId(null)}
        >
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setOpenId(null)}
            aria-label="Close video"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
              <path d="M6 6L18 18M6 18L18 6" />
            </svg>
          </button>
          <div
            className={styles.lightboxFrame}
            style={{ aspectRatio: open.aspect }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className={styles.lightboxMedia}
              src={lightboxSrc(open.videoId)}
              title={open.label}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
          <div className={styles.lightboxMeta}>
            <div className={styles.lightboxLabel}>{open.label}</div>
            <div className={styles.lightboxSub}>{open.sub}</div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
