"use client";

/* MOCKUP · /mockups/close-faster-fresh
   Five from-scratch ways to say "we close deals faster". Not the filmstrip.
   Not wired into the homepage. */

import { useEffect, useRef, useState } from "react";
import styles from "./fresh.module.css";

function useInview() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting && e[0].intersectionRatio > 0.4) setV(true); },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, v };
}

function Race() {
  const { ref, v } = useInview();
  return (
    <div className={`${styles.race} ${v ? styles.inview : ""}`} ref={ref}>
      <h3 className={styles.raceHead}>
        Same pipeline. <span className={styles.teal}>Our clients just finish first.</span>
      </h3>
      <div className={styles.raceRow}>
        <div className={styles.raceLabel}><span className={styles.muted}>Industry average</span><span className={styles.muted}>60 days</span></div>
        <div className={styles.raceTrack}><div className={`${styles.raceFill} ${styles.slow}`} /></div>
      </div>
      <div className={styles.raceRow}>
        <div className={styles.raceLabel}><span className={styles.win}>A2 Media clients</span><span className={styles.win}>35 days</span></div>
        <div className={styles.raceTrack}>
          <div className={`${styles.raceFill} ${styles.fast}`} />
          <div className={styles.raceFlag}>✓ Closed · 40% faster</div>
        </div>
      </div>
      <div className={styles.raceAxis}><span>0</span><span>15</span><span>30</span><span>45</span><span>60 days</span></div>
    </div>
  );
}

const STAGES = [
  ["Discovery", "Day 4"],
  ["Demo", "Day 12"],
  ["Proposal", "Day 24"],
  ["Closed Won", "Day 35"],
];

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.introKicker}>Close-faster · from scratch</p>
        <p className={styles.introBody}>
          Five different mediums for the same message (40% faster, 60 → 35 days, because their
          prospects trust them before the first call). No filmstrip. Pick a direction, not a polish.
        </p>
      </header>

      {/* 1 · Kinetic Headline */}
      <div className={styles.block}>
        <span className={styles.tag}>Idea 1 · <b>Kinetic Headline</b></span>
        <div className={styles.kinetic}>
          <p className={styles.kEyebrow}>The only metric your CFO remembers</p>
          <div className={styles.kBig}>40%</div>
          <div className={styles.kMid}>faster to close.</div>
          <p className={styles.kSub}>
            <b>60 → 35 days.</b> Because their prospects trust them before the first call.
          </p>
        </div>
      </div>

      {/* 2 · The Race */}
      <div className={styles.block}>
        <span className={styles.tag}>Idea 2 · <b>The Race</b></span>
        <Race />
      </div>

      {/* 3 · Deal-Stage UI */}
      <div className={styles.block}>
        <span className={styles.tag}>Idea 3 · <b>Deal-Stage UI</b></span>
        <div className={styles.ui}>
          <div className={styles.dealCard}>
            <div className={styles.dealTop}>
              <div className={styles.dealName}>Enterprise deal<span>Sourced from LinkedIn video</span></div>
              <span className={styles.wonBadge}>CLOSED WON</span>
            </div>
            <div className={styles.dealStages}>
              {STAGES.map(([s, d]) => (
                <div key={s} className={styles.stageRow}>
                  <span className={styles.dot}>✓</span>
                  {s}
                  <span className={styles.day}>{d}</span>
                </div>
              ))}
            </div>
            <div className={styles.dealFooter}>
              <div className={styles.big}>Closed in <b>35 days</b></div>
              <span className={styles.chip}>40% faster</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 · Split Diptych */}
      <div className={styles.block}>
        <span className={styles.tag}>Idea 4 · <b>Split Diptych</b></span>
        <div className={styles.diptych}>
          <div className={`${styles.dHalf} ${styles.dBefore}`}>
            <p className={styles.dKick}>Without video</p>
            <div className={styles.dNum}>60 days</div>
            <p className={styles.dCaption}>Still chasing the buyer.</p>
          </div>
          <div className={`${styles.dHalf} ${styles.dAfter}`}>
            <p className={styles.dKick}>With A2 Media</p>
            <div className={styles.dNum}>35 days</div>
            <p className={styles.dCaption}>Buyer shows up ready to sign.</p>
          </div>
        </div>
      </div>

      {/* 5 · Live Ticker Band */}
      <div className={styles.block}>
        <span className={styles.tag}>Idea 5 · <b>Live Ticker Band</b></span>
        <div style={{ padding: "70px 0" }}>
          <div className={styles.ticker}>
            <div className={styles.tickerRow}>
              {[0, 1].map((r) => (
                <span key={r}>
                  <span className={styles.tItem}>Sales cycle <i>▾</i> <b>40%</b></span>
                  <span className={styles.tItem}>Time to close <b>35 days</b></span>
                  <span className={styles.tItem}>60 <i>→</i> <b>35</b></span>
                  <span className={styles.tItem}>Trust built <b>before the first call</b></span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "48px 24px 90px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · pick a direction and I&apos;ll develop it properly.
      </footer>
    </main>
  );
}
