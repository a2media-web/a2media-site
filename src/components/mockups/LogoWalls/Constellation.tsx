"use client";

/* Constellation — logos as nodes floating on a starfield with dotted
   connecting lines drawn between selected pairs. Static. Premium,
   distinctive, implies a "network" of clients. */

import { LOGOS } from "./logos";
import styles from "./Constellation.module.css";

type Node = { name: string; x: number; y: number };

const NODES: Node[] = [
  { name: "Shopify",        x: 18, y: 22 },
  { name: "Okta",           x: 42, y: 12 },
  { name: "Crossbeam",      x: 68, y: 18 },
  { name: "ActiveCampaign", x: 88, y: 32 },
  { name: "Brainlabs",      x: 78, y: 56 },
  { name: "BlueConic",      x: 56, y: 50 },
  { name: "Chili Piper",    x: 30, y: 50 },
  { name: "Slate",          x: 10, y: 58 },
  { name: "Sendoso",        x: 24, y: 82 },
  { name: "Close",          x: 50, y: 86 },
  { name: "Warmly",         x: 76, y: 82 },
  { name: "Miovision",      x: 92, y: 70 },
];

// hand-picked edges to draw a clean web (not too dense)
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [4, 5], [5, 6], [6, 7], [7, 0],
  [5, 9], [9, 10], [10, 4],
  [6, 8], [8, 9], [11, 4], [11, 10],
  [1, 5], [2, 5],
];

export default function ConstellationWall() {
  return (
    <section className={styles.section}>
      <div className={styles.starfield} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Constellation</p>
          <h2 className={styles.title}>
            A network of teams <em>moving pipeline</em> with video.
          </h2>
        </header>

        <div className={styles.stage}>
          <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
              />
            ))}
          </svg>

          {NODES.map((n) => {
            const l = LOGOS.find((x) => x.name === n.name);
            return (
              <div
                key={n.name}
                className={styles.node}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                aria-label={n.name}
              >
                {l?.src && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={l.src} alt={n.name} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
