"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process3Cinematic.module.css";

/**
 * Option 3: Cinematic 3-act storyboard.
 *
 * Three full-width "act" panels stacked vertically. Each panel has a
 * massive ACT card on the left and the step content on the right.
 * Letterboxed top/bottom black bars give the film-frame feel. As the
 * user scrolls, each act fades in independently. Most on-brand for a
 * video agency — the website itself reads like a film.
 */

const ACTS = [
  {
    actNum: "I",
    timeStamp: "00:01:00",
    title: "The 3-Week Jumpstart.",
    subtitle: "We learn your buyer. Then we plan the engine.",
    desc:
      "We study your buyer psychology. Sales calls, competitor content, comments, anywhere your buyers show up online. Then we build your custom video roadmap, write your scripts, and map out exactly what to create and how to distribute it.",
    beat: "ICP RESEARCH · ROADMAP · SCRIPTS",
  },
  {
    actNum: "II",
    timeStamp: "00:21:00",
    title: "Engine. Built.",
    subtitle: "We design the system. Then we ship videos every week.",
    desc:
      "We design the video system that works for your team, then script, edit, and ship world-class videos in 48 to 72 hours. New videos every week, all tailored to your buyers.",
    beat: "DESIGN · EDIT · SHIP",
  },
  {
    actNum: "III",
    timeStamp: "06:00:00",
    title: "Pipeline. Built.",
    subtitle: "Sales sends your videos. Prospects show up educated.",
    desc:
      "Within a month, your sales team has videos they're proud to send out. Prospects show up to calls already educated. By month 6, video becomes one of your main drivers of buyer trust.",
    beat: "PIPELINE · TRUST · COMPOUND",
  },
];

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.35 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      opts,
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, inView };
}

function Act({ act, index }: { act: typeof ACTS[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div ref={ref} className={`${styles.act} ${inView ? styles.actIn : ""}`}>
      <div className={styles.actNum}>
        <span className={styles.actLabel}>ACT</span>
        <span className={styles.actRoman}>{act.actNum}</span>
        <span className={styles.actStamp}>{act.timeStamp}</span>
      </div>
      <div className={styles.actBody}>
        <p className={styles.beat}>{act.beat}</p>
        <h3 className={styles.actTitle}>{act.title}</h3>
        <p className={styles.actSubtitle}>{act.subtitle}</p>
        <p className={styles.actDesc}>{act.desc}</p>
        <div className={styles.frameBars} aria-hidden />
      </div>
      {index < ACTS.length - 1 && (
        <div className={styles.cutTo}>
          <span className={styles.cutText}>CUT TO</span>
          <span className={styles.cutLine} />
        </div>
      )}
    </div>
  );
}

export default function Process3Cinematic() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.preroll}>
          <span className={styles.crew}>A2 MEDIA STUDIOS</span>
          <span className={styles.presents}>presents</span>
        </div>
        <h2 className={styles.heading}>
          A three-act story.<br />
          <span className={styles.italic}>Yours.</span>
        </h2>
        {ACTS.map((act, i) => (
          <Act key={act.actNum} act={act} index={i} />
        ))}
      </div>
    </section>
  );
}
