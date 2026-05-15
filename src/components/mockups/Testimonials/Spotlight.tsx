"use client";

import { useEffect, useState } from "react";
import {
  TESTIMONIAL_VIDEO_ID,
  QUOTES,
  ambientSrc,
  lightboxSrc,
} from "./data";
import styles from "./Spotlight.module.css";

export default function SpotlightTestimonials() {
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

  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Don&apos;t take our word for it</p>
        <h2 className={styles.title}>
          Hear it <em>from the teams</em> we&apos;ve built for.
        </h2>
        <p className={styles.sub}>
          Real marketing leaders. Real pipeline. Pull the audio up and listen.
        </p>

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
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="28"
                height="28"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className={styles.playLabel}>Watch the stories</div>
          </div>
        </button>

        <div className={styles.cast}>
          {QUOTES.map((q) => (
            <div key={q.name} className={styles.castItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.avatar} src={q.avatar} alt={q.name} />
              <div className={styles.castMeta}>
                <div className={styles.castName}>{q.name}</div>
                <div className={styles.castRole}>{q.role}</div>
              </div>
            </div>
          ))}
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              width="22"
              height="22"
            >
              <path d="M6 6L18 18M6 18L18 6" />
            </svg>
          </button>
          <div
            className={styles.lightboxFrame}
            onClick={(e) => e.stopPropagation()}
          >
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
