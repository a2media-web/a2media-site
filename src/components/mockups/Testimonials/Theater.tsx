"use client";

import { useEffect, useState } from "react";
import {
  TESTIMONIAL_VIDEO_ID,
  QUOTES,
  ambientSrc,
  lightboxSrc,
} from "./data";
import styles from "./Theater.module.css";

export default function TheaterTestimonials() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const left = QUOTES[0];
  const right = [QUOTES[1], QUOTES[2]];

  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Testimonials</p>
          <h2 className={styles.title}>
            What our clients say <em>(in their own words).</em>
          </h2>
        </div>

        <div className={styles.theater}>
          <div className={`${styles.side} ${styles.sideLeft}`}>
            <div className={styles.card}>
              <p className={styles.quote}>&ldquo;{left.quote}&rdquo;</p>
              <div className={styles.author}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.avatar} src={left.avatar} alt={left.name} />
                <div>
                  <div className={styles.name}>{left.name}</div>
                  <div className={styles.role}>{left.role}</div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.stage}
            onClick={() => setOpen(true)}
            aria-label="Watch client testimonials"
          >
            <div className={styles.frameInner}>
              <iframe
                className={styles.media}
                src={ambientSrc(TESTIMONIAL_VIDEO_ID)}
                title="Client testimonials ambient"
                allow="autoplay; fullscreen"
                aria-hidden
                tabIndex={-1}
              />
            </div>
            <div className={styles.shim} aria-hidden />
            <div className={styles.playOverlay} aria-hidden>
              <div className={styles.playBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className={styles.playLabel}>Click to watch</div>
            </div>
          </button>

          <div className={`${styles.side} ${styles.sideRight}`}>
            {right.map((q) => (
              <div key={q.name} className={styles.card}>
                <p className={styles.quote}>&ldquo;{q.quote}&rdquo;</p>
                <div className={styles.author}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles.avatar} src={q.avatar} alt={q.name} />
                  <div>
                    <div className={styles.name}>{q.name}</div>
                    <div className={styles.role}>{q.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.footerCta}
            onClick={() => setOpen(true)}
          >
            Hear it on video <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close video"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
              <path d="M6 6L18 18M6 18L18 6" />
            </svg>
          </button>
          <div className={styles.lightboxFrame} onClick={(e) => e.stopPropagation()}>
            <iframe
              className={styles.lightboxMedia}
              src={lightboxSrc(TESTIMONIAL_VIDEO_ID)}
              title="Client testimonials"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
