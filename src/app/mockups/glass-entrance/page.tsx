"use client";

/* MOCKUP · /mockups/glass-entrance
   5 scroll-into-view entrance animations for the Glass Close-Faster card,
   with the content vertically centered. Scroll to each; scroll up + back
   down to replay. Not wired into the homepage. */

import { useEffect, useRef, useState } from "react";
import styles from "./entrance.module.css";

function EntranceCard({ option, tag, variant }: { option: string; tag: string; variant: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inview, setInview] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInview(entries[0].isIntersecting && entries[0].intersectionRatio > 0.35),
      { threshold: [0, 0.35, 0.6] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.block}>
      <span className={styles.tagChip}>
        Option {option} · <b>{tag}</b>
      </span>
      <div className={styles.wrap}>
        <div ref={ref} className={`${styles.card} ${styles[variant]} ${inview ? styles.inview : ""}`}>
          <div className={styles.inner}>
            <h2 className={`${styles.heading} ${styles.st} ${styles.st1}`}>
              Our clients close deals <span className={styles.teal}>40% faster.</span>
            </h2>
            <div className={`${styles.st} ${styles.st2}`}>
              <div className={styles.stat} aria-hidden>
                <span className={styles.from}>60</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.to}>35</span>
              </div>
              <div className={styles.statUnit}>days to close</div>
            </div>
            <div className={`${styles.strip} ${styles.st} ${styles.st3}`} aria-hidden>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={styles.frame} />
              ))}
            </div>
            <p className={`${styles.sub} ${styles.st} ${styles.st4}`}>
              because their prospects trust them before the first call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.introKicker}>Glass Close-Faster · entrance animation</p>
        <p className={styles.introBody}>
          Content is now vertically centered. Five entrance options that fire as the card scrolls
          into view. Scroll to each, then scroll up and back down to replay. The tile tumble loop
          still runs after the entrance in the real build.
        </p>
      </header>

      <EntranceCard option="1" tag="Rise + Fade" variant="vRise" />
      <EntranceCard option="2" tag="Scale In" variant="vScale" />
      <EntranceCard option="3" tag="Blur In" variant="vBlur" />
      <EntranceCard option="4" tag="Content Stagger" variant="vStagger" />
      <EntranceCard option="5" tag="Border Bloom" variant="vBloom" />

      <footer style={{ textAlign: "center", padding: "40px 24px 90px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · pick an entrance and I&apos;ll combine it with the tumble in the live section.
      </footer>
    </main>
  );
}
