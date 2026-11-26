/* MOCKUP · /mockups/section-frame
   Five ways to make the Close-Faster section read as its own section while
   staying in the same dark family as the Guide section below it. Each
   treatment is shown with a Guide echo underneath so the separation reads. */

import styles from "./frame.module.css";

function CFContent() {
  return (
    <div className={styles.inner}>
      <h2 className={styles.heading}>
        Our clients close deals <span className={styles.teal}>40% faster.</span>
      </h2>
      <div className={styles.stat} aria-hidden>
        <span className={styles.from}>60</span>
        <span className={styles.arrow}>→</span>
        <span className={styles.to}>35</span>
      </div>
      <div className={styles.statUnit}>days to close</div>
      <div className={styles.strip} aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={styles.frame} />
        ))}
      </div>
      <p className={styles.sub}>because their prospects trust them before the first call.</p>
    </div>
  );
}

function GuideEcho() {
  return (
    <div className={styles.guide}>
      <h2 className={styles.guideH}>
        We know what it&apos;s like to spend $30K <em>on a video that makes $0.</em>
      </h2>
      <p className={styles.guideSub}>So we built A2 Media differently.</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.introKicker}>Make Close-Faster its own section</p>
        <p className={styles.introBody}>
          Same dark family as Guide, just framed so it reads as a distinct section. Each option is
          shown with the Guide section echoed underneath so you can see the separation.
        </p>
      </header>

      {/* 1 · Inset Rounded Card */}
      <div className={styles.block}>
        <span className={styles.tagChip}>Option 1 · <b>Inset Rounded Card</b></span>
        <div className={styles.t1}>
          <div className={styles.card}>
            <CFContent />
          </div>
        </div>
        <GuideEcho />
      </div>

      {/* 2 · Glass Panel */}
      <div className={styles.block}>
        <span className={styles.tagChip}>Option 2 · <b>Glass Panel</b></span>
        <div className={styles.t2}>
          <div className={styles.card}>
            <CFContent />
          </div>
        </div>
        <GuideEcho />
      </div>

      {/* 3 · Ambient Glow Wash */}
      <div className={styles.block}>
        <span className={styles.tagChip}>Option 3 · <b>Ambient Glow Wash</b></span>
        <div className={`${styles.sec} ${styles.t3}`}>
          <CFContent />
        </div>
        <GuideEcho />
      </div>

      {/* 4 · Hairline Brackets */}
      <div className={styles.block}>
        <span className={styles.tagChip}>Option 4 · <b>Hairline Brackets</b></span>
        <div className={`${styles.sec} ${styles.t4}`}>
          <CFContent />
        </div>
        <GuideEcho />
      </div>

      {/* 5 · Tonal Step */}
      <div className={styles.block}>
        <span className={styles.tagChip}>Option 5 · <b>Tonal Step</b></span>
        <div className={`${styles.sec} ${styles.t5}`}>
          <CFContent />
        </div>
        <GuideEcho />
      </div>

      <footer style={{ textAlign: "center", padding: "52px 24px 88px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · pick a framing and I&apos;ll apply it to the live section.
      </footer>
    </main>
  );
}
