"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process38Frameio.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * Video concept: Frame.io review/approve interface.
 *
 * Big video player center-stage. Three comment pins anchored at three
 * timecodes on the scrubber. Right rail = comments list, each pinned
 * by Ademola: "STEP ONE: COMPLETE ✓" with avatar + timestamp.
 * Playhead sweeps through, each comment lights up as the playhead
 * crosses its pin. This is the exact surface their videos get delivered
 * on — playing the agency's medium back at the visitor.
 */

const PINS = [18, 50, 86];
const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

export default function Process38Frameio() {
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
            const duration = 5800;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              setPlayhead(p * 96);
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

  const active = playhead < PINS[0] + 2 ? 0 : playhead < PINS[1] + 2 ? 1 : 2;
  const passed = (i: number) => playhead >= PINS[i];
  const totalSec = 95;
  const cur = Math.floor((playhead / 96) * totalSec);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Frame.io · A2_Process_v3_FINAL.mp4</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.app}>
          {/* top bar */}
          <div className={styles.topbar}>
            <span className={styles.appName}>frame.io</span>
            <span className={styles.crumb}>A2 Media / Client Deliverables / A2_Process_v3_FINAL.mp4</span>
            <span className={styles.statusChip}>Needs Review · 3 comments</span>
            <button type="button" className={styles.approveBtn}>✓ Approve</button>
          </div>

          <div className={styles.workspace}>
            <main className={styles.playerWrap}>
              <div className={styles.player} style={{ background: `radial-gradient(circle at 30% 20%, ${COLORS[active]}55, var(--a2-night-core) 65%)` }}>
                <div className={styles.broll}>
                  <span className={styles.brollDot} style={{ background: COLORS[active] }} />
                  <span className={styles.brollDot2} style={{ background: COLORS[active] }} />
                </div>
                <div className={styles.playerContent}>
                  <p className={styles.frameEyebrow} style={{ color: COLORS[active] }}>{PROCESS_STEPS[active].eyebrow.replace(":", "")}</p>
                  <h3 className={styles.frameTitle}>{PROCESS_STEPS[active].title}</h3>
                  <p className={styles.frameBody}>{PROCESS_STEPS[active].desc}</p>
                </div>
                <div className={styles.bigPlay}>▶</div>
                <div className={styles.tc}>0:{cur.toString().padStart(2, "0")} / 1:35</div>
                <div className={styles.cc}>CC · 4K · v3 FINAL</div>
              </div>

              {/* scrubber + comment pins */}
              <div className={styles.scrubWrap}>
                <div className={styles.scrub}>
                  <div className={styles.scrubFill} style={{ width: `${playhead}%` }} />
                  <div className={styles.scrubHead} style={{ left: `${playhead}%` }} />
                  {PINS.map((p, i) => (
                    <div
                      key={i}
                      className={`${styles.pin} ${passed(i) ? styles.pinPassed : ""}`}
                      style={{ left: `${p}%`, background: COLORS[i] }}
                      title={`Comment ${i + 1}`}
                    >
                      <span className={styles.pinNum}>{i + 1}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.transport}>
                  <span>⏮</span><span className={styles.playBtn}>▶</span><span>⏭</span>
                  <span className={styles.tcSmall}>0:{cur.toString().padStart(2, "0")}</span>
                  <span className={styles.speed}>1.0x</span>
                  <span style={{ marginLeft: "auto" }}>🔊 ⤢</span>
                </div>
              </div>
            </main>

            {/* right rail: comments */}
            <aside className={styles.comments}>
              <div className={styles.commentHead}>
                <span>3 Comments</span>
                <span className={styles.commentFilter}>Resolved (3/3)</span>
              </div>
              {PROCESS_STEPS.map((s, i) => (
                <div key={s.title} className={`${styles.comment} ${passed(i) ? styles.commentOn : ""}`}>
                  <div className={styles.commentTop}>
                    <span className={styles.commentAvatar}>A</span>
                    <div className={styles.commentMeta}>
                      <span className={styles.commentName}>Ademola Adelakun</span>
                      <span className={styles.commentTime}>at 0:{PINS[i].toString().padStart(2, "0")}</span>
                    </div>
                    <span
                      className={styles.commentPin}
                      style={{ background: COLORS[i] }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <p className={styles.commentEyebrow}>{s.eyebrow.toUpperCase().replace(":", "")} · COMPLETE</p>
                  <h4 className={styles.commentTitle}>{s.title}</h4>
                  <p className={styles.commentBody}>{s.desc}</p>
                  {passed(i) && <p className={styles.commentResolved}>✓ Resolved by Ademola</p>}
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
