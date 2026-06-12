"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process46SpotifyQueue.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Simple concept #2: Spotify "Now Playing" + queue.
 *
 * Big now-playing card at the top (album art = gradient, track title =
 * step title, artist = A2 Media). Progress bar 0→100%. Below: "Up next"
 * queue with the remaining two tracks. When one finishes, queue
 * advances. Every human under 50 has stared at this exact UI.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const DURATIONS = ["3:42", "5:18", "4:24"];

export default function Process46SpotifyQueue() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [active, setActive] = useState(-1);
  const [trackProgress, setTrackProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const runTrack = (idx: number) => {
              setActive(idx);
              const start = performance.now();
              const dur = 3200;
              const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                setTrackProgress(p * 100);
                if (p < 1) requestAnimationFrame(tick);
                else if (idx < 2) setTimeout(() => { setTrackProgress(0); runTrack(idx + 1); }, 320);
              };
              requestAnimationFrame(tick);
            };
            setTimeout(() => runTrack(0), 500);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const nowTrack = active < 0 ? 0 : active;
  const upcoming = PROCESS_STEPS.map((_, i) => i).filter((i) => i > active);
  const played   = PROCESS_STEPS.map((_, i) => i).filter((i) => i < active);
  const fmt = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;
  const totalSec = nowTrack === 0 ? 222 : nowTrack === 1 ? 318 : 264;
  const curSec = Math.floor((trackProgress / 100) * totalSec);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Now playing · A2 Media</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.brand}>
              <span className={styles.brandDot} />
              <span>Now Playing</span>
            </span>
            <span className={styles.crumb}>Playlist · Content That Converts</span>
            <span className={styles.shuffle}>↺ Repeat · all</span>
          </div>

          {/* Big now-playing card */}
          <div className={styles.player}>
            <div className={styles.art} style={{ background: `linear-gradient(135deg, ${COLORS[nowTrack]}, var(--a2-night-core))` }}>
              <div className={styles.artGlow} style={{ background: COLORS[nowTrack] }} />
              <span className={styles.artLabel}>A2</span>
              <span className={styles.equalizer}>
                <span style={{ background: COLORS[nowTrack] }} />
                <span style={{ background: COLORS[nowTrack] }} />
                <span style={{ background: COLORS[nowTrack] }} />
                <span style={{ background: COLORS[nowTrack] }} />
              </span>
            </div>
            <div className={styles.playerInfo}>
              <p className={styles.nowEyebrow}>{PROCESS_STEPS[nowTrack].eyebrow}</p>
              <h3 className={styles.nowTitle}>{PROCESS_STEPS[nowTrack].title}</h3>
              <p className={styles.nowArtist}>A2 Media · Content That Converts</p>

              <div className={styles.scrubWrap}>
                <span className={styles.tc}>{fmt(curSec)}</span>
                <div className={styles.scrub}>
                  <div className={styles.scrubFill} style={{ width: `${trackProgress}%`, background: COLORS[nowTrack] }} />
                  <div className={styles.scrubHead} style={{ left: `${trackProgress}%`, background: COLORS[nowTrack] }} />
                </div>
                <span className={styles.tc}>{DURATIONS[nowTrack]}</span>
              </div>

              <div className={styles.controls}>
                <span>⏮</span>
                <span className={styles.playBtn} style={{ background: COLORS[nowTrack] }}>▶</span>
                <span>⏭</span>
                <span style={{ marginLeft: "auto" }} className={styles.controlsRight}>🔀  ↺  🔊</span>
              </div>
            </div>
          </div>

          {/* Queue */}
          <div className={styles.queueHead}>
            <span>Up next</span>
            <span className={styles.queueCount}>{upcoming.length} tracks · A2 Media</span>
          </div>
          <div className={styles.queue}>
            {PROCESS_STEPS.map((s, i) => {
              const isNow  = i === nowTrack;
              const wasPlayed = played.includes(i);
              return (
                <div key={s.title} className={`${styles.queueRow} ${isNow ? styles.queueRowNow : ""} ${wasPlayed ? styles.queueRowDone : ""}`}>
                  <span className={styles.queueIdx}>
                    {wasPlayed ? "✓" : isNow ? <span className={styles.dotPulse} style={{ background: COLORS[i] }} /> : i + 1}
                  </span>
                  <div className={styles.queueArt} style={{ background: `linear-gradient(135deg, ${COLORS[i]}, var(--a2-night-core))` }}>
                    <span>A2</span>
                  </div>
                  <div className={styles.queueText}>
                    <div className={styles.queueTitle}>{s.title}</div>
                    <div className={styles.queueArtist}>A2 Media</div>
                  </div>
                  <span className={styles.queueDur}>{DURATIONS[i]}</span>
                  <span className={styles.queueStatus}>
                    {wasPlayed && <span className={`${styles.chip} ${styles.chipDone}`}>Played</span>}
                    {isNow     && <span className={`${styles.chip} ${styles.chipNow}`} style={{ color: COLORS[i], background: `${COLORS[i]}1f` }}>▶ Playing</span>}
                    {!isNow && !wasPlayed && <span className={`${styles.chip} ${styles.chipUp}`}>Up next</span>}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.statusbar}>
            Track {Math.min(nowTrack + 1, 3)} of 3 · Auto-play next on
            <span style={{ marginLeft: "auto" }} className={styles.brandTag}>A2 Media · Content That Converts</span>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.card} ${active >= i ? styles.cardOn : ""}`}>
              <p className={styles.cardEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
