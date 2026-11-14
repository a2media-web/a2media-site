"use client";

/* Mockup — the real logo wall (LogoStrip) with the 7 new logos added.
   Imports the live LOGOS array + LogoStrip styles, appends the new entries,
   and renders the exact 4-row marquee. Nothing here touches the live array;
   it's a preview of what logos.ts would look like with the additions. */

import { LOGOS, logoSrc, type Logo } from "@/components/mockups/LogoWalls/logos";
import styles from "@/components/sections/LogoStrip/LogoStrip.module.css";

const NEW_LOGOS: Logo[] = [
  { name: "Ceros", domain: "ceros.com", src: "/logos/ceros.webp", scale: 1.0 },
  { name: "SingleStore", domain: "singlestore.com", src: "/logos/singlestore.png", scale: 0.95 },
  { name: "CreatorIQ", domain: "creatoriq.com", src: "/logos/creatoriq.png", scale: 1.0 },
  { name: "ZEISS", domain: "zeiss.com", src: "/logos/zeiss.png", scale: 0.8 },
  { name: "Stage 2 Capital", domain: "stage2.capital", src: "/logos/stage2capital.webp", scale: 1.05 },
  { name: "Tavus", domain: "tavus.io", src: "/logos/tavus.png", scale: 0.8 },
  { name: "nilus", domain: "nilus.io", src: "/logos/nilus.png", scale: 1.3 },
];

const ALL = [...LOGOS, ...NEW_LOGOS];

function buildSlice(start: number, length: number) {
  const out: Logo[] = [];
  for (let i = 0; i < length; i++) out.push(ALL[(start + i) % ALL.length]);
  return out;
}

export default function Page() {
  const renderItem = (l: Logo, key: string) => {
    const src = logoSrc(l);
    const scale = l.scale ?? 1;
    const imgClass = l.noFilter ? styles.imgRaw : styles.imgFiltered;
    return (
      <div key={key} className={styles.cell}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={l.name} loading="lazy" className={imgClass} style={{ ["--logo-scale" as string]: scale }} />
        ) : (
          <span className={styles.text}>{l.name}</span>
        )}
      </div>
    );
  };

  const far = buildSlice(0, 16);
  const mid = buildSlice(8, 16);
  const near = buildSlice(ALL.length - 7, 16); // bias the near row toward the NEW logos
  const farBack = buildSlice(4, 16);

  return (
    <main style={{ background: "#07021F" }}>
      <div style={{ textAlign: "center", padding: "32px 24px 8px", color: "#fff", fontFamily: "system-ui" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8F45EE", fontWeight: 800, margin: 0 }}>Mockup · logo wall with 7 new logos</p>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>New: Ceros · SingleStore · CreatorIQ · ZEISS · Stage 2 Capital · Tavus · nilus. The &ldquo;near&rdquo; (sharpest) row is biased toward them so you can read them clearly.</p>
      </div>

      <section className={styles.section}>
        <div className={styles.aurora} aria-hidden />
        <div className={styles.header}>
          <h2 className={styles.title}>Trusted by Billion Dollar Brands</h2>
        </div>
        <div className={styles.stack}>
          <div className={`${styles.row} ${styles.far}`} style={{ ["--dur" as string]: "95s" }}>
            {far.map((l, i) => renderItem(l, `far-a-${l.name}-${i}`))}
            {far.map((l, i) => renderItem(l, `far-b-${l.name}-${i}`))}
          </div>
          <div className={`${styles.row} ${styles.mid} ${styles.reverse}`} style={{ ["--dur" as string]: "70s" }}>
            {mid.map((l, i) => renderItem(l, `mid-a-${l.name}-${i}`))}
            {mid.map((l, i) => renderItem(l, `mid-b-${l.name}-${i}`))}
          </div>
          <div className={`${styles.row} ${styles.near}`} style={{ ["--dur" as string]: "50s" }}>
            {near.map((l, i) => renderItem(l, `near-a-${l.name}-${i}`))}
            {near.map((l, i) => renderItem(l, `near-b-${l.name}-${i}`))}
          </div>
          <div className={`${styles.row} ${styles.far} ${styles.reverse}`} style={{ ["--dur" as string]: "110s" }}>
            {farBack.map((l, i) => renderItem(l, `fb-a-${l.name}-${i}`))}
            {farBack.map((l, i) => renderItem(l, `fb-b-${l.name}-${i}`))}
          </div>
        </div>
      </section>
    </main>
  );
}
