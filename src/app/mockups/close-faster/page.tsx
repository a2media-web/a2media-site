"use client";

/* ------------------------------------------------------------------ *
   MOCKUP · /mockups/close-faster
   Five "unorthodox" ways to transition out of the hero into a
   "we close deals faster" beat near the top of the page.
   Every transition is an editing metaphor — the hero literally gets
   cut/trimmed/fast-forwarded into the stat. Review-only.
 * ------------------------------------------------------------------ */

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./closeFaster.module.css";

/* --- tiny scroll helpers --- */
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function useProgress(ref: RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      setP(total > 0 ? clamp01(-rect.top / total) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

const HERO_TAIL = (
  <>
    These days, anyone can make a video.
    <br />
    We&apos;re the team that makes sure{" "}
    <span className={styles.pop}>yours convert.</span>
  </>
);

/* ============================= A — Timeline Trim ============================= */
function OptionA() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const trim = win(p, 0.2, 0.78);
  const days = Math.round(lerp(60, 35, trim));
  const clipPct = lerp(94, 55, trim); // 35/60 of the track, with headroom
  const echo = 1 - win(p, 0.1, 0.4);
  const reveal = win(p, 0.5, 0.86);

  return (
    <section id="a" className={styles.opt} ref={ref}>
      <div className={styles.stick}>
        <span className={styles.tag}>Option A · <b>Timeline Trim</b></span>
        <div className={styles.stage}>
          <div style={{ position: "relative", minHeight: "clamp(120px,22vh,180px)" }}>
            <p
              className={styles.heroEcho}
              style={{ position: "absolute", inset: 0, opacity: echo }}
            >
              {HERO_TAIL}
            </p>
            <div
              className={styles.statWrap}
              style={{
                position: "absolute",
                inset: 0,
                opacity: reveal,
                transform: `translateY(${lerp(16, 0, reveal)}px)`,
              }}
            >
              <div className={styles.bigStat}>
                60 <span className={styles.pur}>→</span>{" "}
                <span className={styles.teal}>35</span>
              </div>
              <div className={styles.statLabel}>days to close</div>
            </div>
          </div>

          {/* the edit timeline that does the trimming */}
          <div className={styles.tl} aria-hidden>
            <div className={styles.ticks}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
            <div className={styles.tlGhost} style={{ left: `${clipPct}%`, right: "8px" }} />
            <div className={styles.tlClip} style={{ width: `calc(${clipPct}% - 8px)` }}>
              {days} days
            </div>
            <div className={styles.playhead} style={{ left: `${clipPct}%` }} />
          </div>
          <p className={styles.statSub} style={{ opacity: reveal }}>
            We trim your sales cycle like a bad take.
          </p>
        </div>
        <p className={styles.note}>
          Transition: an edit timeline slides up out of the hero; the playhead drags the
          trim handle and the clip snaps from 60 days to 35. Stat: 40% faster close (PartnerHacker).
        </p>
      </div>
    </section>
  );
}

/* ============================= B — Hard Cut ============================= */
function OptionB() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const cover = 1 - Math.abs(2 * p - 1); // 0 → 1 → 0 (bars meet at the middle)
  const barH = cover * 52;
  const showStat = p >= 0.5;
  const cutOn = win(cover, 0.8, 1);

  return (
    <section id="b" className={styles.opt} ref={ref}>
      <div className={styles.stick}>
        <span className={styles.tag}>Option B · <b>Hard Cut</b></span>
        <div className={styles.stage}>
          {showStat ? (
            <div className={styles.statWrap}>
              <div className={styles.statLabel} style={{ marginBottom: 6, opacity: 0.8 }}>
                Deals close
              </div>
              <div className={styles.bigStat}>
                <span className={styles.teal}>35%</span> faster
              </div>
              <p className={styles.statSub}>Hard cut to results.</p>
            </div>
          ) : (
            <p className={styles.heroEcho}>{HERO_TAIL}</p>
          )}
        </div>

        <div className={styles.barTop} style={{ height: `${barH}svh` }} aria-hidden />
        <div className={styles.barBot} style={{ height: `${barH}svh` }} aria-hidden />
        <div className={styles.cutLabel} style={{ opacity: cutOn }} aria-hidden>
          <span className={styles.recDot} /> CUT · 00:35
        </div>

        <p className={styles.note}>
          Transition: cinematic letterbox bars pinch the hero to black (a scene cut), flash
          a timecode, then open on the payoff. Stat: 35% faster close rates (aggregate).
        </p>
      </div>
    </section>
  );
}

/* ============================= C — Odometer Countdown ============================= */
function OptionC() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const cp = win(p, 0.2, 0.84);
  const n = Math.round(lerp(60, 35, cp));
  const echo = 1 - win(p, 0.08, 0.36);
  const show = win(p, 0.22, 0.56);
  const motion = Math.sin(clamp01(cp) * Math.PI); // peaks mid-count
  const glow = 20 + motion * 40;

  return (
    <section id="c" className={styles.opt} ref={ref}>
      <div className={styles.stick}>
        <span className={styles.tag}>Option C · <b>Odometer Countdown</b></span>
        <div className={styles.stage}>
          <div style={{ position: "relative", minHeight: "clamp(180px,40vh,320px)" }}>
            <p
              className={styles.heroEcho}
              style={{ position: "absolute", inset: 0, opacity: echo, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <span>{HERO_TAIL}</span>
            </p>
            <div
              className={styles.statWrap}
              style={{ position: "absolute", inset: 0, opacity: show, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
            >
              <div
                className={styles.bigStat}
                style={{
                  fontVariantNumeric: "tabular-nums",
                  textShadow: `0 0 ${glow}px rgba(40,223,232,${0.3 + motion * 0.4})`,
                  color: motion > 0.15 ? "var(--a2-aqua-teal)" : "var(--a2-white)",
                  transition: "color 200ms linear",
                }}
              >
                {n}
              </div>
              <div className={styles.statLabel} style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}>
                days to close
              </div>
              <p className={styles.statSub}>Same pipeline. Weeks off the clock.</p>
            </div>
          </div>
        </div>
        <p className={styles.note}>
          Transition: as the hero scrolls off, a giant counter rolls 60 → 35, the teal glow
          intensifying mid-count. Stat: 42% shorter sales cycle, shown in real days.
        </p>
      </div>
    </section>
  );
}

/* ============================= D — Velocity Streak ============================= */
const LINES = [8, 20, 33, 46, 58, 70, 82];
function OptionD() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const dp = win(p, 0.15, 0.82);
  const echo = 1 - win(p, 0.1, 0.42);
  const show = win(p, 0.58, 0.95);
  const dash = 920 * (1 - dp);

  return (
    <section id="d" className={styles.opt} ref={ref}>
      <div className={styles.stick}>
        <span className={styles.tag}>Option D · <b>Velocity Streak</b></span>

        <div className={styles.speedlines} aria-hidden>
          {LINES.map((top, i) => {
            const spread = (i - 3) / 3; // -1..1
            const prog = win(dp, i * 0.05, i * 0.05 + 0.5);
            return (
              <i
                key={i}
                style={{
                  top: `${50 + spread * 26}%`,
                  left: `${lerp(-30, 85, prog)}%`,
                  width: `${lerp(40, 260, prog)}px`,
                  opacity: Math.sin(prog * Math.PI) * 0.9,
                }}
              />
            );
          })}
        </div>

        <svg className={styles.streakSvg} viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="vstreak" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#5a33ff" />
              <stop offset="1" stopColor="#28dfe8" />
            </linearGradient>
          </defs>
          <line
            x1="40"
            y1="200"
            x2="960"
            y2="200"
            stroke="url(#vstreak)"
            strokeWidth="4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeDasharray: 920, strokeDashoffset: dash, filter: "drop-shadow(0 0 10px rgba(40,223,232,0.6))" }}
          />
        </svg>

        <div className={styles.stage}>
          <div style={{ position: "relative", minHeight: "clamp(150px,34vh,260px)" }}>
            <p className={styles.heroEcho} style={{ position: "absolute", inset: 0, opacity: echo, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>{HERO_TAIL}</span>
            </p>
            <div className={styles.statWrap} style={{ position: "absolute", inset: 0, opacity: show, transform: `translateX(${lerp(40, 0, show)}px)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className={styles.bigStat}>
                <span className={styles.teal}>30–50%</span> faster
              </div>
              <div className={styles.statLabel}>to close</div>
              <p className={styles.statSub}>Because buyers show up already sold.</p>
            </div>
          </div>
        </div>
        <p className={styles.note}>
          Transition: the hero&apos;s teal &ldquo;convert&rdquo; glow stretches into a speed
          trail that whips across and drops you on the stat. Stat: your existing 30–50% faster line.
        </p>
      </div>
    </section>
  );
}

/* ============================= E — Calendar Shred ============================= */
const SHREDS = Array.from({ length: 11 }).map((_, i) => ({
  t: i / 11,
  left: 10 + ((i * 37) % 80),
  w: 30 + ((i * 53) % 90),
  rot: ((i * 47) % 40) - 20,
}));
function OptionE() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useProgress(ref);
  const ep = win(p, 0.2, 0.82);
  const day = Math.round(lerp(60, 35, ep));
  const echo = 1 - win(p, 0.08, 0.36);
  const calIn = win(p, 0.18, 0.46);
  const show = win(p, 0.62, 0.95);

  return (
    <section id="e" className={styles.opt} ref={ref}>
      <div className={styles.stick}>
        <span className={styles.tag}>Option E · <b>Calendar Shred</b></span>

        {/* torn day-pages flying to the cutting room floor */}
        <div style={{ position: "absolute", inset: 0, zIndex: 25, pointerEvents: "none" }} aria-hidden>
          {SHREDS.map((s, i) => {
            const fly = win(ep, s.t * 0.7, s.t * 0.7 + 0.3);
            return (
              <div
                key={i}
                className={styles.shred}
                style={{
                  left: `${s.left}%`,
                  top: `${lerp(44, 92, fly)}%`,
                  width: `${s.w}px`,
                  height: "4px",
                  opacity: fly > 0 && fly < 1 ? 0.8 : 0,
                  transform: `rotate(${s.rot * fly}deg) translateY(${fly * 40}px)`,
                }}
              />
            );
          })}
        </div>

        <div className={styles.stage}>
          <div style={{ position: "relative", minHeight: "clamp(220px,46vh,360px)" }}>
            <p className={styles.heroEcho} style={{ position: "absolute", inset: 0, opacity: echo, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>{HERO_TAIL}</span>
            </p>
            <div style={{ position: "absolute", inset: 0, opacity: calIn, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className={styles.cal} aria-hidden>
                <div className={styles.calHead}>Sales Cycle</div>
                <div className={styles.calBody}>
                  <div className={styles.calDay} style={{ fontVariantNumeric: "tabular-nums", color: ep > 0.9 ? "var(--a2-aqua-teal)" : "var(--a2-white)" }}>
                    {day}
                  </div>
                  <div className={styles.calUnit}>days</div>
                </div>
              </div>
              <p className={styles.statSub} style={{ opacity: show }}>
                25 days hit the cutting room floor. 60 → 35.
              </p>
            </div>
          </div>
        </div>
        <p className={styles.note}>
          Transition: the hero fades to a desk calendar; days fast-forward off the pad and
          drop away, stopping at 35. Stat: 40% faster close, 25 days saved.
        </p>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.legend}>
        <p className={styles.kicker}>Mockup · Close-faster transitions</p>
        <h1 className={styles.legendTitle}>
          Five ways to <em>cut</em> from the hero into &ldquo;we close deals faster.&rdquo;
        </h1>
        <p className={styles.legendBody}>
          This beat slots in right after the hero, before the pain section: lead with the
          outcome, then agitate. Every option opens on the hero&apos;s tail and transitions
          with an editing metaphor only a video team can pull off. Scroll each one slowly.
          Real numbers, no inventions.
        </p>
        <nav className={styles.jump}>
          <a href="#a">A · Timeline Trim</a>
          <a href="#b">B · Hard Cut</a>
          <a href="#c">C · Odometer</a>
          <a href="#d">D · Velocity Streak</a>
          <a href="#e">E · Calendar Shred</a>
        </nav>
      </header>

      <OptionA />
      <OptionB />
      <OptionC />
      <OptionD />
      <OptionE />

      <footer style={{ textAlign: "center", padding: "60px 24px 90px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
        Mockup only · not wired into the live page yet · pick a direction and I&apos;ll build it for real.
      </footer>
    </main>
  );
}
