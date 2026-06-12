"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process16YouTubeChapters.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * YouTube-style video player with chapter markers.
 *
 * A familiar UI: video frame on top with chapter title overlay, a red
 * scrubber bar below with three chapter ticks, and "up next" thumbnails
 * below that. The scrubber animates from left to right, snapping to
 * each chapter and updating the title overlay + thumbnails.
 *
 * Plays directly to a video agency's medium. Most universal UI pattern.
 */

const CHAPTER_LENGTHS = [38, 38, 39]; // % of timeline each chapter occupies
const CHAPTER_STARTS = [0, 38, 76];

export default function Process16YouTubeChapters() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [progress, setProgress] = useState(8); // playhead %
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const targets = [38, 76, 96];
            targets.forEach((p, i) => {
              setTimeout(() => {
                setProgress(p);
                setActiveIdx(Math.min(i + 1, 2));
              }, 1400 + i * 1800);
            });
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const jumpToChapter = (i: number) => {
    setProgress(CHAPTER_STARTS[i] + 4);
    setActiveIdx(i);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Media · 3 chapters · 6:00</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.player}>
          <div className={styles.video}>
            <div className={styles.chapterOverlay}>
              <span className={styles.chapterBadge}>CHAPTER {activeIdx + 1} / 3</span>
              <p className={styles.stepEyebrow}>{PROCESS_STEPS[activeIdx].eyebrow}</p>
              <h3 className={styles.stepTitle}>{PROCESS_STEPS[activeIdx].title}</h3>
              <p className={styles.stepDesc}>{PROCESS_STEPS[activeIdx].desc}</p>
            </div>
            <div className={styles.videoControls} aria-hidden>
              <button type="button" className={styles.playBtn}>▶</button>
              <span className={styles.timecode}>{toTC(progress)} / 06:00</span>
              <span className={styles.flexSpace} />
              <span className={styles.qualityBadge}>4K</span>
              <span className={styles.qualityBadge}>HD</span>
            </div>
          </div>

          <div className={styles.scrubBar}>
            <div className={styles.scrubTrack}>
              {CHAPTER_LENGTHS.map((len, i) => (
                <div
                  key={i}
                  className={`${styles.chapterSegment} ${i <= activeIdx ? styles.chapterSegmentOn : ""}`}
                  style={{ width: `calc(${len}% - 2px)` }}
                />
              ))}
              <div className={styles.playhead} style={{ left: `${progress}%` }} aria-hidden>
                <span className={styles.playheadDot} />
              </div>
            </div>
            <div className={styles.chapterLabels}>
              {PROCESS_STEPS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  className={`${styles.chapterLabel} ${i === activeIdx ? styles.chapterLabelActive : ""}`}
                  onClick={() => jumpToChapter(i)}
                  style={{ left: `${CHAPTER_STARTS[i] + CHAPTER_LENGTHS[i] / 2}%` }}
                >
                  <span className={styles.chapterLabelTime}>{toTC(CHAPTER_STARTS[i])}</span>
                  <span className={styles.chapterLabelName}>{s.title.replace(/[.…]$/, "")}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.upnext}>
            <p className={styles.upnextHead}>Up next in this video</p>
            <div className={styles.upnextGrid}>
              {PROCESS_STEPS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  className={`${styles.upnextCard} ${i === activeIdx ? styles.upnextCardActive : ""}`}
                  onClick={() => jumpToChapter(i)}
                >
                  <div className={styles.upnextThumb}>
                    <span className={styles.upnextChapterNum}>0{i + 1}</span>
                    <span className={styles.upnextDuration}>2:00</span>
                  </div>
                  <p className={styles.upnextTitle}>{s.title}</p>
                  <p className={styles.upnextEyebrow}>{s.eyebrow.replace(":", "")}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function toTC(pct: number): string {
  const secs = Math.floor((pct / 100) * 360); // 6 min total
  const m = String(Math.floor(secs / 60)).padStart(1, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}
