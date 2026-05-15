"use client";

import { useEffect, useState, ReactNode, CSSProperties } from "react";
import { TESTIMONIAL_VIDEO_ID, ambientSrc, lightboxSrc } from "./data";
import styles from "./VideoStage.module.css";

type Props = {
  label?: string;
  smallButton?: boolean;
  ghost?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function VideoStage({
  label = "Click to watch with audio",
  smallButton = false,
  ghost = false,
  className,
  style,
  children,
}: Props) {
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

  const stageClass = [
    styles.stage,
    ghost ? styles.stageGhost : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        type="button"
        className={stageClass}
        style={style}
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
          <div
            className={`${styles.playBtn} ${smallButton ? styles.playBtnSm : ""}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width={smallButton ? 18 : 26} height={smallButton ? 18 : 26}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {label ? <div className={styles.playLabel}>{label}</div> : null}
        </div>
        {children}
      </button>

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
    </>
  );
}
