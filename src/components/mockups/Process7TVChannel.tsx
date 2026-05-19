"use client";

import { useState } from "react";
import styles from "./Process7TVChannel.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * CRT TV with channel-changer.
 *
 * Old TV cabinet with a screen displaying one step at a time. A remote
 * sits next to it with three CH buttons. Clicking a channel snaps to
 * that step with a brief static / scanline burst. Scanlines + curvature
 * stay on the screen.
 *
 * Step content rendered verbatim from the live copy.
 */

const CHANNELS = ["CH 01", "CH 02", "CH 03"];

export default function Process7TVChannel() {
  const [idx, setIdx] = useState(0);
  const [staticing, setStaticing] = useState(false);

  const change = (next: number) => {
    if (next === idx) return;
    setStaticing(true);
    setTimeout(() => {
      setIdx(next);
      setStaticing(false);
    }, 280);
  };

  const step = PROCESS_STEPS[idx];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The A2 Network · 3 channels</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.setup}>
          <div className={styles.tv}>
            <div className={styles.knobs}>
              <span className={styles.knob} />
              <span className={styles.knob} />
            </div>
            <div className={styles.screenFrame}>
              <div className={styles.screen}>
                {staticing && <div className={styles.static} aria-hidden />}
                <div className={`${styles.broadcast} ${staticing ? styles.broadcastHidden : ""}`} key={idx}>
                  <div className={styles.channelBadge}>
                    <span className={styles.recDot} />
                    LIVE · {CHANNELS[idx]}
                  </div>
                  <p className={styles.stepEyebrow}>{step.eyebrow}</p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
                <div className={styles.scanlines} aria-hidden />
              </div>
            </div>
            <div className={styles.brand}>A2 · MEDIA</div>
            <div className={styles.legs}>
              <span /><span />
            </div>
          </div>

          <div className={styles.remote}>
            <p className={styles.remoteLabel}>CHANGE CHANNEL</p>
            {CHANNELS.map((ch, i) => (
              <button
                key={ch}
                type="button"
                className={`${styles.remoteBtn} ${idx === i ? styles.remoteBtnActive : ""}`}
                onClick={() => change(i)}
              >
                <span className={styles.btnLight} />
                <span className={styles.btnLabel}>{ch}</span>
              </button>
            ))}
            <div className={styles.remoteFoot}>
              <span className={styles.brandLogo}>A2</span>
              <span>REMOTE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
