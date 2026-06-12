"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process36Premiere.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Video concept: Adobe Premiere Pro timeline panel.
 *
 * Multitrack NLE: V2 (text/effects), V1 (b-roll), V1 (main), A1 (dialog),
 * A2 (music). Three clips run across V1 in sequence — one per step.
 * Playhead sweeps left-to-right. Toolbar at top, source monitor on the
 * upper-left shows the active step's "frame." Authentically editor-y
 * but legible as "process" to any CMO who's watched someone edit.
 */

const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];
const CLIPS = [
  { start: 2,  end: 30, label: "01_research.mov" },
  { start: 32, end: 64, label: "02_engine.mov" },
  { start: 66, end: 96, label: "03_pipeline.mov" },
];

export default function Process36Premiere() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [playhead, setPlayhead] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            const start = performance.now();
            const duration = 5200;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              setPlayhead(p * 98);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const activeStep =
    playhead < CLIPS[0].end ? 0 :
    playhead < CLIPS[1].end ? 1 : 2;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Premiere Pro · Sequence 01_A2_Process</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          {/* top bar */}
          <div className={styles.titlebar}>
            <span className={styles.dot} style={{ background: "#ff5f56" }} />
            <span className={styles.dot} style={{ background: "#ffbd2e" }} />
            <span className={styles.dot} style={{ background: "#27c93f" }} />
            <span className={styles.appName}>Adobe Premiere Pro · A2_Process.prproj</span>
          </div>

          {/* top split: source monitor + program monitor */}
          <div className={styles.monitors}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>Source · {CLIPS[activeStep].label}</div>
              <div className={styles.monitor} style={{ background: `radial-gradient(circle at 40% 30%, ${COLORS[activeStep]}44, #0a0a0a 70%)` }}>
                <div className={styles.frameLabel}>
                  <span className={styles.frameEyebrow}>{PROCESS_STEPS[activeStep].eyebrow}</span>
                  <span className={styles.frameTitle}>{PROCESS_STEPS[activeStep].title}</span>
                </div>
                <span className={styles.tc}>00:00:{Math.floor(playhead / 2).toString().padStart(2, "0")}:14</span>
              </div>
            </div>
            <div className={styles.panel}>
              <div className={styles.panelHead}>Program · A2_Process</div>
              <div className={styles.monitor} style={{ background: `linear-gradient(135deg, ${COLORS[activeStep]}33, var(--a2-night-core))` }}>
                <p className={styles.programCopy}>{PROCESS_STEPS[activeStep].desc}</p>
                <span className={styles.tc}>STEP {activeStep + 1}/3</span>
              </div>
            </div>
          </div>

          {/* timeline panel */}
          <div className={styles.timelinePanel}>
            <div className={styles.panelHead}>
              Timeline · Sequence 01
              <span className={styles.tools}>
                <span>▶</span><span>■</span><span>⌥</span><span>⌘</span>
              </span>
            </div>
            <div className={styles.ruler}>
              {Array.from({ length: 11 }).map((_, i) => (
                <span key={i} className={styles.tick}>{i * 10}s</span>
              ))}
            </div>

            <div className={styles.tracks}>
              <Track label="V2" sub="Captions">
                <div className={styles.captionClip} style={{ left: `${CLIPS[activeStep].start}%`, width: `${CLIPS[activeStep].end - CLIPS[activeStep].start}%` }}>
                  {PROCESS_STEPS[activeStep].eyebrow.replace(":", "")}
                </div>
              </Track>
              <Track label="V1" sub="Main">
                {CLIPS.map((c, i) => {
                  const done = playhead >= c.end;
                  const cur  = playhead >= c.start && playhead < c.end;
                  return (
                    <div
                      key={c.label}
                      className={`${styles.clip} ${cur ? styles.clipActive : ""} ${done ? styles.clipDone : ""}`}
                      style={{
                        left: `${c.start}%`,
                        width: `${c.end - c.start}%`,
                        background: COLORS[i],
                      }}
                    >
                      <span className={styles.clipName}>{c.label}</span>
                      <div className={styles.waveform}>
                        {Array.from({ length: 12 }).map((_, j) => (
                          <span key={j} style={{ height: `${30 + Math.sin(i + j) * 30 + j * 4}%` }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </Track>
              <Track label="A1" sub="Dialog">
                {CLIPS.map((c, i) => (
                  <div key={c.label} className={styles.audioClip} style={{ left: `${c.start}%`, width: `${c.end - c.start}%`, background: `${COLORS[i]}55` }}>
                    <div className={styles.audioWave}>
                      {Array.from({ length: 24 }).map((_, j) => (
                        <span key={j} style={{ height: `${20 + Math.abs(Math.sin(i * 2 + j * 0.8)) * 60}%`, background: COLORS[i] }} />
                      ))}
                    </div>
                  </div>
                ))}
              </Track>
              <Track label="A2" sub="Music bed">
                <div className={styles.musicBed} style={{ left: "2%", width: "94%" }}>
                  <div className={styles.musicWave}>
                    {Array.from({ length: 60 }).map((_, j) => (
                      <span key={j} style={{ height: `${30 + Math.abs(Math.sin(j * 0.4)) * 40}%` }} />
                    ))}
                  </div>
                </div>
              </Track>

              <div className={styles.playhead} style={{ left: `${playhead}%` }}>
                <span className={styles.playheadFlag}>{Math.floor(playhead / 2).toString().padStart(2, "0")}s</span>
                <span className={styles.playheadLine} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.title} className={`${styles.card} ${activeStep >= i ? styles.cardOn : ""}`}>
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

function Track({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className={styles.track}>
      <div className={styles.trackLabel}>
        <span className={styles.trackTag}>{label}</span>
        <span className={styles.trackSub}>{sub}</span>
      </div>
      <div className={styles.trackBody}>{children}</div>
    </div>
  );
}
