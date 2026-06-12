"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process37OBSControl.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Video concept: OBS Studio livestream control room.
 *
 * Mission-control vibe. Left rail = Scene list (3 scenes, one per step).
 * Right rail = audio mixers + viewer count. Center = big PROGRAM preview
 * (active scene) with smaller PREVIEW thumb above it (next scene queued).
 * Scene auto-cuts every ~3s. LIVE indicator pulses. Audio meters bounce.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const VIEWERS = [124, 482, 1240];

export default function Process37OBSControl() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 220);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            let i = 0;
            const loop = () => {
              i = (i + 1) % 3;
              setActive(i);
              setTimeout(loop, 3200);
            };
            setTimeout(loop, 1600);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const nextScene = (active + 1) % 3;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>OBS Studio · A2_Pipeline_Live</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          <div className={styles.topbar}>
            <span className={styles.appName}>● OBS Studio · Streaming</span>
            <span className={styles.live}>
              <span className={styles.liveDot} /> LIVE · {VIEWERS[active].toLocaleString()} watching
            </span>
            <span className={styles.recTime}>REC 02:{(14 + active * 8).toString().padStart(2, "0")}:31</span>
          </div>

          <div className={styles.grid}>
            {/* Left rail: Scenes */}
            <aside className={styles.sidebar}>
              <div className={styles.sideHead}>SCENES</div>
              {PROCESS_STEPS.map((s, i) => (
                <button
                  type="button"
                  key={s.title}
                  className={`${styles.sceneRow} ${active === i ? styles.sceneRowActive : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.sceneNum} style={{ background: COLORS[i] }}>{i + 1}</span>
                  <span className={styles.sceneLabel}>{s.title}</span>
                  {active === i && <span className={styles.onAir}>ON AIR</span>}
                </button>
              ))}
              <div className={styles.sideHead} style={{ marginTop: 18 }}>SOURCES</div>
              <div className={styles.sourceRow}>👁 Webcam</div>
              <div className={styles.sourceRow}>🖥 Screen Share</div>
              <div className={styles.sourceRow}>🎵 Music Bed</div>
              <div className={styles.sourceRow}>📺 Lower Third</div>
            </aside>

            {/* Center: monitors */}
            <main className={styles.main}>
              <div className={styles.monitorPair}>
                <div className={styles.preview}>
                  <div className={styles.monitorLabel}>PREVIEW · NEXT SCENE</div>
                  <div className={styles.screen} style={{ background: `radial-gradient(circle at 70% 30%, ${COLORS[nextScene]}55, var(--a2-night-core) 65%)` }}>
                    <div className={styles.frameInner}>
                      <p className={styles.frameEyebrow}>{PROCESS_STEPS[nextScene].eyebrow.replace(":", "")}</p>
                      <p className={styles.frameTitleSm}>{PROCESS_STEPS[nextScene].title}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.program}>
                  <div className={styles.monitorLabel} style={{ color: "#ff4d4d" }}>● PROGRAM · ON AIR</div>
                  <div className={styles.screenBig} style={{ background: `radial-gradient(circle at 30% 30%, ${COLORS[active]}66, var(--a2-night-core) 65%)` }}>
                    <div className={styles.broll}>
                      <span className={styles.brollDot} style={{ background: COLORS[active] }} />
                      <span className={styles.brollDot2} style={{ background: COLORS[active] }} />
                    </div>
                    <div className={styles.programInner}>
                      <p className={styles.frameEyebrow} style={{ color: COLORS[active] }}>{PROCESS_STEPS[active].eyebrow.replace(":", "")}</p>
                      <h3 className={styles.frameTitle}>{PROCESS_STEPS[active].title}</h3>
                      <p className={styles.programCopy}>{PROCESS_STEPS[active].desc}</p>
                    </div>
                    <div className={styles.lowerThird}>
                      <span className={styles.l3Bug} style={{ background: COLORS[active] }}>A2</span>
                      <span className={styles.l3Text}>A2 Media · Content That Converts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.transition}>
                <span>FADE</span><span>CUT</span><span className={styles.transitionActive}>STINGER</span>
                <span style={{ marginLeft: "auto" }}>Duration: 320ms</span>
              </div>
            </main>

            {/* Right rail: audio mixer */}
            <aside className={styles.mixer}>
              <div className={styles.sideHead}>AUDIO MIXER</div>
              {[
                { label: "Host Mic", color: COLORS[active] },
                { label: "B-Roll",   color: "#28DFE8" },
                { label: "Music",    color: "#66F78E" },
              ].map((m) => (
                <div key={m.label} className={styles.meterRow}>
                  <div className={styles.meterLabel}>{m.label}</div>
                  <div className={styles.meterBar}>
                    {Array.from({ length: 18 }).map((_, j) => {
                      const lvl = Math.abs(Math.sin(tick * 0.3 + j * 0.4)) * 18;
                      return <span key={j} style={{ opacity: j < lvl ? 1 : 0.18, background: j > 14 ? "#ff4d4d" : j > 11 ? "#ffbd2e" : m.color }} />;
                    })}
                  </div>
                  <div className={styles.meterDb}>-{(14 - active * 3).toString().padStart(2, "0")}dB</div>
                </div>
              ))}

              <div className={styles.sideHead} style={{ marginTop: 18 }}>STATS</div>
              <div className={styles.stat}><span>Viewers</span><b>{VIEWERS[active].toLocaleString()}</b></div>
              <div className={styles.stat}><span>Bitrate</span><b>6400 kbps</b></div>
              <div className={styles.stat}><span>FPS</span><b>30</b></div>
              <div className={styles.stat}><span>Dropped</span><b style={{ color: "#66F78E" }}>0</b></div>
            </aside>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.card} ${active === i ? styles.cardOn : ""}`}>
              <span className={styles.cardChip} style={{ borderColor: COLORS[i], color: COLORS[i] }}>SCENE {i + 1}</span>
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
