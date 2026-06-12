"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process21Podcast.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Editor-timeline alternative #2: Podcast / audio player.
 *
 * Same horizontal progression DNA, dressed as a podcast episode. A big
 * waveform stretches across the section, chapter markers at the 3 step
 * points, the playhead scrubs across. Below, an "Episode" panel shows
 * the current chapter's content. Recognizable to anyone who's used
 * Spotify, Apple Podcasts, Overcast, etc.
 */

const CHAPTER_STARTS = [4, 38, 72]; // % positions
const CHAPTER_ENDS = [38, 72, 100];

// Pre-built deterministic waveform heights so SSR + client match
const WAVEFORM_BARS = Array.from({ length: 84 }, (_, i) => {
  const v = (Math.sin(i * 0.63) + Math.cos(i * 0.32) + Math.sin(i * 0.21)) / 3;
  return 22 + Math.abs(v * 72);
});

export default function Process21Podcast() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [progress, setProgress] = useState(CHAPTER_STARTS[0]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            setPlaying(true);
            const targets = [38, 72, 96];
            targets.forEach((p, i) => {
              setTimeout(() => {
                setProgress(p);
                setActiveIdx(Math.min(i + 1, 2));
              }, 1200 + i * 1700);
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
    setProgress(CHAPTER_STARTS[i] + 2);
    setActiveIdx(i);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Pod · S1E01</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.player}>
          <div className={styles.head}>
            <div className={styles.cover}>
              <span className={styles.coverMark}>A2</span>
            </div>
            <div className={styles.meta}>
              <p className={styles.episodeTag}>EPISODE 01 · 6:00</p>
              <h3 className={styles.episodeTitle}>How A2 Media Builds Pipeline</h3>
              <p className={styles.chapterIndicator}>
                <span className={styles.recDot} />
                Now playing: Chapter {activeIdx + 1} · {PROCESS_STEPS[activeIdx].title.replace(/[.…]$/, "")}
              </p>
            </div>
            <button
              type="button"
              className={`${styles.playBtn} ${playing ? styles.playBtnOn : ""}`}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? "⏸" : "▶"}
            </button>
          </div>

          <div className={styles.waveformWrap}>
            <div className={styles.waveform}>
              {WAVEFORM_BARS.map((h, i) => {
                const pct = (i / WAVEFORM_BARS.length) * 100;
                const past = pct <= progress;
                return (
                  <span
                    key={i}
                    className={`${styles.waveBar} ${past ? styles.waveBarPast : ""}`}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
              {CHAPTER_STARTS.map((s, i) => (
                <span
                  key={i}
                  className={styles.chapterTick}
                  style={{ left: `${s}%` }}
                  aria-hidden
                />
              ))}
              <div className={styles.playhead} style={{ left: `${progress}%` }} aria-hidden>
                <span className={styles.playheadDot} />
              </div>
            </div>
            <div className={styles.chapterLabels}>
              {PROCESS_STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.chapterLabel} ${i === activeIdx ? styles.chapterLabelActive : ""}`}
                  onClick={() => jumpToChapter(i)}
                  style={{ left: `${(CHAPTER_STARTS[i] + CHAPTER_ENDS[i]) / 2}%` }}
                >
                  CHAPTER 0{i + 1}
                </button>
              ))}
            </div>
            <div className={styles.tcRow}>
              <span>{toTC(progress)}</span>
              <span>06:00</span>
            </div>
          </div>

          <div className={styles.transcript}>
            <p className={styles.transcriptHead}>TRANSCRIPT · CHAPTER {activeIdx + 1}</p>
            <p className={styles.stepEyebrow}>{PROCESS_STEPS[activeIdx].eyebrow}</p>
            <h4 className={styles.stepTitle}>{PROCESS_STEPS[activeIdx].title}</h4>
            <p className={styles.stepDesc}>{PROCESS_STEPS[activeIdx].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function toTC(pct: number): string {
  const secs = Math.floor((pct / 100) * 360);
  const m = Math.floor(secs / 60);
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}
