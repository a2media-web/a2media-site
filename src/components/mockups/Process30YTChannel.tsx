"use client";

import styles from "./Process30YTChannel.module.css";
import { PROCESS_HEADING, PROCESS_STEPS } from "./_processSteps";

/**
 * YouTube concept #1: Channel page.
 *
 * Familiar channel-header layout — banner, profile circle, channel name,
 * subscribe button, then a "Recent uploads" row with 3 video thumbnails.
 * Each thumbnail is one step. Each has a duration badge, view counts,
 * and an "X weeks ago" timestamp. Most universally recognizable YouTube
 * surface.
 */

const THUMBS = [
  { dur: "3:00", views: "12K views", when: "3 weeks ago" },
  { dur: "5:42", views: "28K views", when: "1 month ago" },
  { dur: "4:18", views: "47K views", when: "6 months ago" },
];

export default function Process30YTChannel() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>@a2media · Subscribed · 22.5K</p>
        <h2 className={styles.heading}>{PROCESS_HEADING}</h2>

        <div className={styles.channel}>
          <div className={styles.banner} aria-hidden>
            <span className={styles.bannerBlur1} />
            <span className={styles.bannerBlur2} />
            <span className={styles.bannerWordmark}>A2 MEDIA</span>
            <span className={styles.bannerTagline}>Content That Converts</span>
          </div>

          <div className={styles.identity}>
            <div className={styles.avatar}>
              <span className={styles.avatarLetters}>A2</span>
            </div>
            <div className={styles.identityBody}>
              <h3 className={styles.channelName}>
                A2 Media <span className={styles.verifiedDot} aria-label="verified">✓</span>
              </h3>
              <p className={styles.channelMeta}>@a2media · 22.5K subscribers · 600+ videos</p>
              <p className={styles.channelDesc}>Sales-driven video for B2B SaaS teams.</p>
            </div>
            <button type="button" className={styles.subscribeBtn}>Subscribed</button>
          </div>

          <div className={styles.tabs}>
            <span className={styles.tabActive}>HOME</span>
            <span className={styles.tab}>VIDEOS</span>
            <span className={styles.tab}>PLAYLISTS</span>
            <span className={styles.tab}>ABOUT</span>
          </div>

          <p className={styles.rowTitle}>Recent uploads</p>

          <div className={styles.videos}>
            {PROCESS_STEPS.map((s, i) => (
              <article key={s.title} className={styles.video}>
                <div className={styles.thumb}>
                  <span className={styles.thumbStep}>0{i + 1}</span>
                  <span className={styles.thumbBrand}>{s.title.split(" ").slice(0, 3).join(" ")}</span>
                  <span className={styles.thumbDur}>{THUMBS[i].dur}</span>
                </div>
                <div className={styles.videoMeta}>
                  <p className={styles.stepEyebrow}>{s.eyebrow}</p>
                  <h4 className={styles.stepTitle}>{s.title}</h4>
                  <p className={styles.videoStats}>
                    {THUMBS[i].views} · {THUMBS[i].when}
                  </p>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
