"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process15Timeline.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Video editor timeline (Premiere / Final Cut feel).
 *
 * A multi-track editor timeline showing 3 clips on the V1 track, plus
 * waveforms below on A1. A scrubbing playhead crosses the timeline
 * left to right, snapping at each clip with a "now playing" highlight.
 * Click any clip to jump to it. Plays directly to the agency's craft.
 */

const CLIP_COLORS = ["#5A33FF", "#8F45EE", "#66F78E"];

export default function Process15Timeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [playhead, setPlayhead] = useState(8);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const POSITIONS = [8, 38, 68, 96];
            POSITIONS.slice(1).forEach((p, i) => {
              setTimeout(() => {
                setActiveIdx(i + 1);
                setPlayhead(p);
              }, 1600 + i * 1800);
            });
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tcToString = (pct: number) => {
    const secs = Math.floor((pct / 100) * 180); // pretend 3-minute timeline
    const mm = String(Math.floor(secs / 60)).padStart(2, "0");
    const ss = String(secs % 60).padStart(2, "0");
    return `00:${mm}:${ss}:00`;
  };

  const onClipClick = (i: number) => {
    setActiveIdx(i);
    setPlayhead([8, 38, 68][i]);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A2 Editor · Sequence 01</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.editor}>
          <div className={styles.viewer}>
            <div className={styles.viewerBadge}>
              <span className={styles.viewerDot} />
              PLAYING
            </div>
            <div className={styles.viewerStage}>
              <p className={styles.stepEyebrow}>{PROCESS_STEPS[activeIdx].eyebrow}</p>
              <h3 className={styles.stepTitle}>{PROCESS_STEPS[activeIdx].title}</h3>
              <p className={styles.stepDesc}>{PROCESS_STEPS[activeIdx].desc}</p>
            </div>
            <div className={styles.viewerHud}>
              <span>{tcToString(playhead)}</span>
              <span>03:00:00:00</span>
            </div>
          </div>

          <div className={styles.timeline}>
            <div className={styles.ruler}>
              {Array.from({ length: 13 }).map((_, i) => (
                <span key={i} className={styles.tick}>
                  <span className={styles.tickLabel}>{i * 15}s</span>
                </span>
              ))}
            </div>

            <div className={styles.track}>
              <span className={styles.trackLabel}>V1</span>
              <div className={styles.clips}>
                {PROCESS_STEPS.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    className={`${styles.clip} ${i === activeIdx ? styles.clipActive : ""}`}
                    style={{
                      left: `${[6, 36, 66][i]}%`,
                      background: CLIP_COLORS[i],
                    }}
                    onClick={() => onClipClick(i)}
                  >
                    <span className={styles.clipNum}>0{i + 1}</span>
                    <span className={styles.clipName}>{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`${styles.track} ${styles.trackAudio}`}>
              <span className={styles.trackLabel}>A1</span>
              <div className={styles.waveformWrap}>
                {Array.from({ length: 96 }).map((_, i) => (
                  <span
                    key={i}
                    className={styles.waveBar}
                    style={{
                      height: `${20 + ((Math.sin(i * 0.7) + Math.cos(i * 0.3) + 2) * 18)}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className={styles.playhead} style={{ left: `${playhead}%` }}>
              <span className={styles.playheadHead} />
              <span className={styles.playheadLine} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
