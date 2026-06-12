"use client";

/* Mockup: /mockups/fable-animations-comparison-pricing
   Round 2. Six new animation concepts, all categorically different from
   round one (no pen strikes, no odometers, no orbiting aurora borders).

   01 · Alt ComparisonTable · "The Receipt Printer"  · thermal tape prints the payroll
   02 · Alt ComparisonTable · "The Salary Skyline"   · live bar duel + gap bracket
   03 · Alt ComparisonTable · "The Payroll Scale"    · balance beam tips under 6 hires
   04 · Alt Pricing         · "The Podium Rise"      · tier cards rise, flagship lands highest
   05 · Alt Pricing         · "The Reveal Flip"      · flagship card flips to the value math
   06 · Alt Pricing         · "The Power Line"       · neon current charges the flagship

   Every loop is self-running (4 to 9 seconds) so a static screenshot lands
   mid-animation. CSS keyframes + light React state only. No libraries. */

import React, { useEffect, useState } from "react";

const NIGHT = "#0D0536";
const DEEP = "#07021f";
const PURPLE = "#5A33FF";
const LILAC = "#8F45EE";
const NEON = "#66F78E";
const WHITE = "#FFFFFF";
const GRAY = "#EFEFEF";

/* Remounts a subtree every `ms` so one-shot staggered CSS animations loop. */
function useLoopKey(ms: number) {
  const [k, setK] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setK((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return k;
}

/* ================================================================== */
/* Shared chrome                                                       */
/* ================================================================== */

const shell: Record<string, React.CSSProperties> = {
  tag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.16em",
    color: NEON,
    border: `1px solid ${NEON}55`,
    borderRadius: 999,
    padding: "5px 12px",
    marginBottom: 14,
  },
  title: {
    fontFamily: "var(--a2-sans)",
    fontSize: 30,
    fontWeight: 800,
    color: WHITE,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  italic: {
    fontFamily: "var(--a2-display)",
    fontStyle: "italic",
    fontWeight: 500,
    color: LILAC,
  },
  blurb: {
    fontSize: 14.5,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.62)",
    maxWidth: 680,
    margin: "0 0 26px",
  },
  stage: {
    position: "relative",
    background: `radial-gradient(120% 130% at 50% 0%, ${NIGHT} 0%, ${DEEP} 100%)`,
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function DemoShell({
  tag,
  title,
  italicWord,
  blurb,
  children,
}: {
  tag: string;
  title: string;
  italicWord: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 84 }}>
      <span style={shell.tag}>{tag}</span>
      <h2 style={shell.title}>
        {title} <span style={shell.italic}>{italicWord}</span>
      </h2>
      <p style={shell.blurb}>{blurb}</p>
      {children}
    </section>
  );
}

/* ================================================================== */
/* Demo 01 · Alt ComparisonTable · The Receipt Printer                 */
/* ================================================================== */

const RECEIPT_ROWS: [string, string][] = [
  ["5 SENIOR VIDEO EDITORS", "240,000"],
  ["1 CONTENT STRATEGIST", "48,000"],
  ["1 COPYWRITER", "42,000"],
  ["1 CONTENT CREATOR", "36,000"],
  ["1 ACCOUNT MANAGER", "40,000"],
  ["EQUIPMENT + SOFTWARE + AI", "30,000"],
];

function ReceiptRow({ left, right, bold }: { left: string; right: string; bold?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
        fontWeight: bold ? 800 : 500,
        padding: "2.5px 0",
      }}
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Dashes() {
  return <div style={{ borderTop: `1.5px dashed ${NIGHT}55`, margin: "7px 0" }} />;
}

function ReceiptPrinter() {
  return (
    <div style={{ ...shell.stage, padding: "44px 24px 0", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Printer body */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: 380,
            height: 50,
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
            border: "1px solid rgba(255,255,255,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 14px 30px rgba(0,0,0,0.45)",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 16,
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            A2 COST CHECK
          </span>
          {/* LED */}
          <span
            className="fb2-led"
            style={{
              position: "absolute",
              right: 16,
              width: 8,
              height: 8,
              borderRadius: 999,
              background: NEON,
              boxShadow: `0 0 10px ${NEON}`,
            }}
          />
          {/* slit */}
          <div
            style={{
              width: 312,
              height: 7,
              borderRadius: 4,
              background: DEEP,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
            }}
          />
          {/* print head glow at the slit */}
          <div
            className="fb2-printhead"
            style={{
              position: "absolute",
              bottom: -1,
              width: 300,
              height: 2,
              borderRadius: 2,
              background: PURPLE,
              boxShadow: `0 0 12px ${PURPLE}`,
            }}
          />
        </div>

        {/* Paper window */}
        <div
          style={{
            width: 300,
            height: 442,
            overflow: "hidden",
            position: "relative",
            marginTop: -4,
            zIndex: 2,
          }}
        >
          <div
            className="fb2-paper"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: GRAY,
              color: NIGHT,
              fontFamily: "'SF Mono', Menlo, Consolas, monospace",
              fontSize: 11,
              lineHeight: 1.5,
              padding: "16px 16px 0",
              boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ textAlign: "center", fontWeight: 800, letterSpacing: "0.1em" }}>
              A2 MEDIA
            </div>
            <div style={{ textAlign: "center", fontSize: 9.5, opacity: 0.7 }}>
              IN-HOUSE TEAM, 6 MONTHS
            </div>
            <Dashes />
            {RECEIPT_ROWS.map(([l, r]) => (
              <ReceiptRow key={l} left={l} right={r} />
            ))}
            <Dashes />
            <ReceiptRow left="IN-HOUSE TOTAL" right="$436,000+" bold />
            <ReceiptRow left="A2 MEDIA, SAME 6 MONTHS" right="$90,000" bold />
            <Dashes />
            <div
              style={{
                textAlign: "center",
                fontWeight: 800,
                fontSize: 13.5,
                color: PURPLE,
                padding: "4px 0 2px",
                letterSpacing: "0.04em",
              }}
            >
              *** YOU SAVE $346,000 ***
            </div>
            <div style={{ textAlign: "center", fontSize: 9.5, opacity: 0.75 }}>
              START IN 48 HOURS, NOT 6 MONTHS
            </div>
            <Dashes />
            {/* barcode */}
            <div
              style={{
                height: 26,
                margin: "6px 24px 4px",
                background:
                  `repeating-linear-gradient(90deg, ${NIGHT} 0 2px, transparent 2px 5px, ` +
                  `${NIGHT} 5px 6px, transparent 6px 10px, ${NIGHT} 10px 13px, transparent 13px 16px)`,
              }}
            />
            <div style={{ textAlign: "center", fontSize: 9, opacity: 0.6, paddingBottom: 10 }}>
              NO RECRUITING. NO RAMP TIME.
            </div>
            {/* zigzag tear edge */}
            <div
              style={{
                height: 10,
                margin: "0 -16px",
                backgroundImage:
                  `linear-gradient(135deg, ${GRAY} 50%, transparent 50%), ` +
                  `linear-gradient(225deg, ${GRAY} 50%, transparent 50%)`,
                backgroundSize: "14px 10px",
                backgroundRepeat: "repeat-x",
                transform: "translateY(10px)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Demo 02 · Alt ComparisonTable · The Salary Skyline                  */
/* ================================================================== */

const SEGS = [
  { label: "Editors · $240K", h: 165 },
  { label: "Strategist · $48K", h: 33 },
  { label: "Copywriter · $42K", h: 29 },
  { label: "Creator · $36K", h: 25 },
  { label: "Acct Mgr · $40K", h: 27 },
  { label: "Tools + AI · $30K", h: 21 },
];

function SalarySkyline() {
  const k = useLoopKey(8500);
  return (
    <div style={{ ...shell.stage, padding: "36px 0", minHeight: 460 }}>
      <div key={k} style={{ position: "relative", width: 620, height: 400 }}>
        {/* baseline */}
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 56,
            height: 1,
            background: "rgba(255,255,255,0.22)",
          }}
        />

        {/* In-house stacked bar */}
        <div
          style={{
            position: "absolute",
            left: 70,
            bottom: 57,
            width: 140,
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {SEGS.map((s, i) => (
            <div
              key={s.label}
              className="fb2-seg"
              style={
                {
                  "--h": `${s.h}px`,
                  animationDelay: `${0.3 + i * 0.45}s`,
                  background: i % 2 ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.16)",
                  borderTop: "1px solid rgba(255,255,255,0.22)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.75)",
                  whiteSpace: "nowrap",
                } as React.CSSProperties
              }
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* A2 bar */}
        <div
          className="fb2-seg"
          style={
            {
              "--h": "62px",
              animationDelay: "3.4s",
              position: "absolute",
              left: 300,
              bottom: 57,
              width: 140,
              background: `linear-gradient(180deg, ${LILAC}, ${PURPLE})`,
              borderTop: `3px solid ${NEON}`,
              boxShadow: `0 0 26px ${PURPLE}66`,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10.5,
              fontWeight: 800,
              color: WHITE,
              whiteSpace: "nowrap",
            } as React.CSSProperties
          }
        >
          A2 Media · $90K
        </div>

        {/* totals under bars */}
        <div
          style={{
            position: "absolute",
            left: 70,
            bottom: 26,
            width: 140,
            textAlign: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          In-house · $436K+
        </div>
        <div
          style={{
            position: "absolute",
            left: 300,
            bottom: 26,
            width: 140,
            textAlign: "center",
            fontSize: 13,
            fontWeight: 800,
            color: NEON,
          }}
        >
          A2 Media · $90K
        </div>

        {/* dashed guides from each bar top */}
        <div
          className="fb2-fadein"
          style={{
            animationDelay: "4.1s",
            position: "absolute",
            left: 212,
            bottom: 356,
            width: 344,
            borderTop: "1.5px dashed rgba(255,255,255,0.35)",
          }}
        />
        <div
          className="fb2-fadein"
          style={{
            animationDelay: "4.1s",
            position: "absolute",
            left: 442,
            bottom: 118,
            width: 114,
            borderTop: "1.5px dashed rgba(255,255,255,0.35)",
          }}
        />
        {/* gap bracket */}
        <div
          className="fb2-growup"
          style={{
            animationDelay: "4.3s",
            position: "absolute",
            left: 548,
            bottom: 119,
            height: 237,
            borderLeft: `2.5px dashed ${NEON}`,
          }}
        />
        <div
          className="fb2-fadein"
          style={{
            animationDelay: "4.8s",
            position: "absolute",
            left: 420,
            bottom: 210,
            width: 118,
            textAlign: "right",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: NEON, lineHeight: 1.1 }}>$346K</div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.7)" }}>
            you never
            <br />
            have to spend
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Demo 03 · Alt ComparisonTable · The Payroll Scale                   */
/* ================================================================== */

const BLOCKS = [
  { label: "$240K", top: 48, left: -70 },
  { label: "$48K", top: 48, left: 4 },
  { label: "$42K", top: 28, left: -70 },
  { label: "$36K", top: 28, left: 4 },
  { label: "$40K", top: 8, left: -70 },
  { label: "$30K", top: 8, left: 4 },
];

function Pan({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className={side === "left" ? "fb2-panL" : "fb2-panR"}
      style={{
        position: "absolute",
        top: 2,
        [side]: -2,
        width: 4,
        height: 4,
        transformOrigin: "2px 2px",
      }}
    >
      {/* strings */}
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 1,
          width: 2,
          height: 72,
          background: "rgba(255,255,255,0.3)",
          transformOrigin: "top center",
          transform: "rotate(20deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 1,
          width: 2,
          height: 72,
          background: "rgba(255,255,255,0.3)",
          transformOrigin: "top center",
          transform: "rotate(-20deg)",
        }}
      />
      {/* plate */}
      <div
        style={{
          position: "absolute",
          top: 68,
          left: -73,
          width: 150,
          height: 8,
          borderRadius: 5,
          background: "rgba(255,255,255,0.28)",
        }}
      />
      {children}
    </div>
  );
}

function PayrollScale() {
  const k = useLoopKey(9000);
  return (
    <div style={{ ...shell.stage, padding: "36px 0", minHeight: 440 }}>
      <div key={k} style={{ position: "relative", width: 560, height: 380 }}>
        {/* fulcrum */}
        <div
          style={{
            position: "absolute",
            left: 254,
            top: 176,
            width: 0,
            height: 0,
            borderLeft: "26px solid transparent",
            borderRight: "26px solid transparent",
            borderBottom: "130px solid rgba(255,255,255,0.10)",
          }}
        />
        {/* beam */}
        <div
          className="fb2-beam"
          style={{
            position: "absolute",
            left: 70,
            top: 168,
            width: 420,
            height: 8,
            borderRadius: 5,
            background: `linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0.18))`,
            transformOrigin: "center center",
          }}
        >
          {/* pivot dot */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -3,
              width: 14,
              height: 14,
              marginLeft: -7,
              borderRadius: 999,
              background: PURPLE,
              boxShadow: `0 0 14px ${PURPLE}`,
            }}
          />

          {/* LEFT pan: in-house payroll blocks */}
          <Pan side="left">
            {BLOCKS.map((b, i) => (
              <div
                key={b.label}
                className="fb2-drop"
                style={{
                  animationDelay: `${0.4 + i * 0.8}s`,
                  position: "absolute",
                  top: b.top,
                  left: b.left,
                  width: 66,
                  height: 20,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9.5,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {b.label}
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                top: 84,
                left: -73,
                width: 150,
                textAlign: "center",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.55)",
                whiteSpace: "nowrap",
              }}
            >
              IN-HOUSE · $436K+
            </div>
          </Pan>

          {/* RIGHT pan: the A2 chip */}
          <Pan side="right">
            <div
              style={{
                position: "absolute",
                top: 26,
                left: -45,
                width: 90,
                height: 42,
                borderRadius: 8,
                border: `1.5px solid ${NEON}`,
                background: "rgba(102,247,142,0.08)",
                boxShadow: `0 0 18px ${NEON}44`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 800, color: NEON, lineHeight: 1 }}>$90K</span>
              <span
                style={{
                  fontSize: 7.5,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                A2 MEDIA
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: 84,
                left: -73,
                width: 150,
                textAlign: "center",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: NEON,
                whiteSpace: "nowrap",
              }}
            >
              SAME OUTPUT
            </div>
          </Pan>
        </div>

        {/* caption */}
        <div
          className="fb2-fadein"
          style={{
            animationDelay: "5.6s",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 6,
            textAlign: "center",
            fontSize: 16,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Save over <strong style={{ color: NEON }}>$346,000</strong>, and start in{" "}
          <strong style={{ color: WHITE }}>48 hours</strong>.
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Mini pricing card (shared by demos 04, 05, 06)                      */
/* ================================================================== */

function MiniCard({
  name,
  price,
  unit,
  badge,
  accent,
  featured,
  width = 170,
  style,
  children,
}: {
  name: string;
  price: string;
  unit: string;
  badge: string;
  accent: string;
  featured?: boolean;
  width?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        width,
        padding: "18px 16px 16px",
        borderRadius: 16,
        background: featured
          ? "linear-gradient(180deg, rgba(90,51,255,0.16), rgba(255,255,255,0.03))"
          : "rgba(255,255,255,0.04)",
        border: featured ? `1px solid ${PURPLE}99` : "1px solid rgba(255,255,255,0.10)",
        borderTop: `3px solid ${accent}`,
        boxShadow: featured ? `0 12px 36px rgba(90,51,255,0.28)` : "0 10px 28px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      <span
        className={featured ? "fb2-minibadge" : undefined}
        style={{
          display: "inline-block",
          fontSize: 8.5,
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: accent,
          border: `1px solid ${accent}66`,
          borderRadius: 999,
          padding: "3px 8px",
          marginBottom: 10,
        }}
      >
        {badge}
      </span>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: WHITE, marginBottom: 6 }}>{name}</div>
      <div style={{ fontSize: 25, fontWeight: 800, color: WHITE, lineHeight: 1 }}>
        {price}{" "}
        <small style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
          {unit}
        </small>
      </div>
      {children}
    </div>
  );
}

/* ================================================================== */
/* Demo 04 · Alt Pricing · The Podium Rise                             */
/* ================================================================== */

function PodiumRise() {
  const k = useLoopKey(7000);
  return (
    <div style={{ ...shell.stage, minHeight: 420 }}>
      <div key={k} style={{ position: "relative", width: 640, height: 380 }}>
        {/* floor line */}
        <div
          style={{
            position: "absolute",
            left: 24,
            right: 24,
            bottom: 64,
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg, transparent, ${PURPLE}aa, transparent)`,
            zIndex: 3,
          }}
        />
        {/* pedestal glow under the flagship */}
        <div
          className="fb2-fadein"
          style={{
            animationDelay: "1.7s",
            position: "absolute",
            left: 200,
            bottom: 40,
            width: 250,
            height: 44,
            borderRadius: "50%",
            background: `radial-gradient(50% 50% at 50% 50%, ${PURPLE}66, transparent 70%)`,
            filter: "blur(6px)",
            zIndex: 1,
          }}
        />
        {/* mask: cards rise from behind the floor */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 64, overflow: "hidden", zIndex: 2 }}>
          <div
            className="fb2-rise"
            style={{ "--lift": "0px", animationDelay: "0.2s", position: "absolute", left: 44, bottom: 0 } as React.CSSProperties}
          >
            <MiniCard name="One-off Video" price="$2K" unit="starting" badge="ONE-TIME" accent={NEON} width={158} />
          </div>
          <div
            className="fb2-rise"
            style={{ "--lift": "0px", animationDelay: "0.5s", position: "absolute", left: 444, bottom: 0 } as React.CSSProperties}
          >
            <MiniCard name="2-Week Jumpstart" price="$8K" unit="one-time" badge="ONE-TIME" accent={NEON} width={158} />
          </div>
          <div
            className="fb2-rise"
            style={{ "--lift": "-30px", animationDelay: "0.9s", position: "absolute", left: 232, bottom: 0 } as React.CSSProperties}
          >
            <MiniCard
              name="Video Growth Engine"
              price="$15&ndash;25K"
              unit="/ month"
              badge="MOST POPULAR"
              accent={PURPLE}
              featured
              width={182}
            >
              <div
                style={{
                  marginTop: 12,
                  borderRadius: 10,
                  background: PURPLE,
                  color: WHITE,
                  textAlign: "center",
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: "9px 0",
                }}
              >
                See if We&apos;re a Fit
              </div>
            </MiniCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Demo 05 · Alt Pricing · The Reveal Flip                             */
/* ================================================================== */

function RevealFlip() {
  return (
    <div style={{ ...shell.stage, minHeight: 420, gap: 26, padding: "40px 0" }}>
      <MiniCard
        name="One-off Video"
        price="$2K"
        unit="starting"
        badge="ONE-TIME"
        accent={NEON}
        width={160}
        style={{ opacity: 0.45, transform: "scale(0.94)" }}
      />

      {/* flipping flagship */}
      <div style={{ width: 232, height: 296, perspective: 1200 }}>
        <div
          className="fb2-flip"
          style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          {/* FRONT: the price */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
            <MiniCard
              name="Video Growth Engine"
              price="$15&ndash;25K"
              unit="/ month"
              badge="MOST POPULAR"
              accent={PURPLE}
              featured
              width={232}
              style={{ height: "100%", boxSizing: "border-box" }}
            >
              <p style={{ fontSize: 12, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", margin: "12px 0 0" }}>
                We run your whole video department. Script to screen.
              </p>
              <div
                style={{
                  marginTop: 16,
                  borderRadius: 10,
                  background: PURPLE,
                  color: WHITE,
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "10px 0",
                }}
              >
                See if We&apos;re a Fit
              </div>
            </MiniCard>
          </div>

          {/* BACK: the value math */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: 16,
              border: `1px solid ${NEON}88`,
              borderTop: `3px solid ${NEON}`,
              background: `linear-gradient(180deg, rgba(102,247,142,0.10), rgba(255,255,255,0.03))`,
              boxShadow: `0 12px 36px rgba(102,247,142,0.18)`,
              padding: "18px 16px 16px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                alignSelf: "flex-start",
                fontSize: 8.5,
                fontWeight: 800,
                letterSpacing: "0.14em",
                color: NEON,
                border: `1px solid ${NEON}66`,
                borderRadius: 999,
                padding: "3px 8px",
                marginBottom: 10,
              }}
            >
              THE MATH
            </span>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: WHITE, marginBottom: 10 }}>
              What you actually get
            </div>
            {["10 to 12 videos every month", "72-hour turnaround", "Full video department, zero hires"].map(
              (b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    gap: 7,
                    fontSize: 11.5,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.45,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: NEON, fontWeight: 800 }}>+</span>
                  <span>{b}</span>
                </div>
              ),
            )}
            <div
              style={{
                fontFamily: "var(--a2-display)",
                fontStyle: "italic",
                fontSize: 13.5,
                color: NEON,
                margin: "auto 0 12px",
              }}
            >
              Under $2K per finished video.
            </div>
            <div
              style={{
                borderRadius: 10,
                border: `1.5px solid ${NEON}`,
                color: NEON,
                textAlign: "center",
                fontSize: 12,
                fontWeight: 700,
                padding: "9px 0",
              }}
            >
              See if We&apos;re a Fit
            </div>
          </div>
        </div>
      </div>

      <MiniCard
        name="2-Week Jumpstart"
        price="$8K"
        unit="one-time"
        badge="ONE-TIME"
        accent={NEON}
        width={160}
        style={{ opacity: 0.45, transform: "scale(0.94)" }}
      />
    </div>
  );
}

/* ================================================================== */
/* Demo 06 · Alt Pricing · The Power Line                              */
/* ================================================================== */

function PowerLine() {
  return (
    <div style={{ ...shell.stage, minHeight: 420 }}>
      <div style={{ position: "relative", width: 640, height: 360 }}>
        {/* cards */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 24,
            display: "flex",
            gap: 26,
          }}
        >
          <div className="fb2-pulse1" style={{ borderRadius: 16 }}>
            <MiniCard name="One-off Video" price="$2K" unit="starting" badge="ONE-TIME" accent={NEON} width={180} />
          </div>
          <div className="fb2-pulse2" style={{ borderRadius: 16 }}>
            <MiniCard name="2-Week Jumpstart" price="$8K" unit="one-time" badge="ONE-TIME" accent={NEON} width={180} />
          </div>
          <div className="fb2-pulse3" style={{ borderRadius: 16 }}>
            <MiniCard
              name="Video Growth Engine"
              price="$15&ndash;25K"
              unit="/ month"
              badge="MONTHLY"
              accent={PURPLE}
              featured
              width={180}
            >
              {/* charge meter */}
              <div style={{ marginTop: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 8.5,
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: 5,
                  }}
                >
                  <span>ENGINE</span>
                  <span style={{ color: NEON }}>CHARGING</span>
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.10)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="fb2-charge"
                    style={{
                      height: "100%",
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${PURPLE}, ${NEON})`,
                    }}
                  />
                </div>
              </div>
            </MiniCard>
          </div>
        </div>

        {/* taps from track up to each card */}
        {[112, 318, 524].map((x, i) => (
          <div
            key={x}
            className={`fb2-tap${i + 1}`}
            style={{
              position: "absolute",
              left: x,
              bottom: 62,
              width: 2,
              height: 30,
              background: "rgba(90,51,255,0.4)",
            }}
          />
        ))}

        {/* track */}
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 60,
            height: 2,
            borderRadius: 2,
            background: "rgba(90,51,255,0.35)",
          }}
        >
          {/* comet pulse */}
          <div
            className="fb2-comet"
            style={{
              position: "absolute",
              left: 0,
              top: -1,
              width: 110,
              height: 4,
              borderRadius: 4,
              background: `linear-gradient(90deg, transparent, ${NEON})`,
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -4,
                top: -3,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: NEON,
                boxShadow: `0 0 16px ${NEON}, 0 0 34px ${NEON}88`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 16,
            textAlign: "center",
            fontSize: 12.5,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          One-off projects credit toward the monthly plan. The current always ends at the Engine.
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Page                                                                */
/* ================================================================== */

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: NIGHT,
        fontFamily: "var(--a2-sans)",
        color: WHITE,
        padding: "72px 24px 120px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Frame header */}
        <header style={{ marginBottom: 64 }}>
          <span style={{ ...shell.tag, color: NEON }}>FABLE &middot; ROUND 2 &middot; COMPARISON + PRICING</span>
          <h1
            style={{
              fontFamily: "var(--a2-sans)",
              fontSize: 46,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              margin: "0 0 14px",
              lineHeight: 1.08,
            }}
          >
            Six More Ways <span style={shell.italic}>to Move</span>
          </h1>
          <p style={{ ...shell.blurb, fontSize: 16, maxWidth: 760 }}>
            Three new concepts for the ComparisonTable, three for Pricing. All categorically
            different from round one: no pen strikes, no odometers, no orbiting borders. Every loop
            runs itself, so scroll and watch.
          </p>
        </header>

        <DemoShell
          tag="Animation 01 &middot; Alt ComparisonTable"
          title="The Receipt"
          italicWord="Printer"
          blurb="The cost table becomes a literal receipt. A thermal printer feeds the in-house payroll out line by line, then the A2 total and the savings print as the proof at the bottom of the tape. Receipts are how people actually feel costs, so the metaphor does the persuading before the copy does."
        >
          <ReceiptPrinter />
        </DemoShell>

        <DemoShell
          tag="Animation 02 &middot; Alt ComparisonTable"
          title="The Salary"
          italicWord="Skyline"
          blurb="Both columns become live bars. The in-house stack climbs role by role to $436K while the A2 bar stops short at $90K, and a dashed neon bracket measures the gap between the two rooftops. The height difference is the whole argument, no reading required."
        >
          <SalarySkyline />
        </DemoShell>

        <DemoShell
          tag="Animation 03 &middot; Alt ComparisonTable"
          title="The Payroll"
          italicWord="Scale"
          blurb="A balance scale. Six salary blocks drop onto the in-house pan one by one and the beam tips harder with every hire, while the single A2 chip rises on the other side. It reframes the comparison from spend to weight: same output, a fraction of the load."
        >
          <PayrollScale />
        </DemoShell>

        <DemoShell
          tag="Animation 04 &middot; Alt Pricing"
          title="The Podium"
          italicWord="Rise"
          blurb="The three tiers enter like a podium ceremony. The side cards rise to the floor first, then the Engine overshoots above them and settles onto a glowing pedestal, badge popping last. Hierarchy gets built by choreography instead of dimming, so no tier ever looks like filler."
        >
          <PodiumRise />
        </DemoShell>

        <DemoShell
          tag="Animation 05 &middot; Alt Pricing"
          title="The Reveal"
          italicWord="Flip"
          blurb="The Engine card flips itself over every few seconds. The front face sells the price, the back face sells the math: what you actually get, and what it works out to per finished video. The flip earns the flagship a second look without the visitor lifting a finger."
        >
          <RevealFlip />
        </DemoShell>

        <DemoShell
          tag="Animation 06 &middot; Alt Pricing"
          title="The Power"
          italicWord="Line"
          blurb="A neon current runs beneath all three tiers. Each card lights up briefly as the pulse passes through it, then the full charge lands in the Engine and its meter fills. It quietly tells visitors how the offers connect: the one-off projects feed the flagship."
        >
          <PowerLine />
        </DemoShell>

        <footer style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
          Mockup only. No live files touched. Brand: Night Core #0D0536, Electric Purple #5A33FF,
          Flex Lilac #8F45EE, Electric Neon #66F78E.
        </footer>
      </div>

      {/* ============================ keyframes ============================ */}
      <style>{`
        /* shared */
        @keyframes fb2-fadein-kf {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fb2-fadein {
          opacity: 0;
          animation: fb2-fadein-kf 0.6s ease forwards;
        }

        /* 01 · receipt printer */
        @keyframes fb2-paper-kf {
          0%   { transform: translateY(-101%); animation-timing-function: steps(26, end); }
          62%  { transform: translateY(0); }
          90%  { transform: translateY(0); }
          97%  { transform: translateY(-101%); }
          100% { transform: translateY(-101%); }
        }
        .fb2-paper { animation: fb2-paper-kf 9s infinite; }

        @keyframes fb2-led-kf {
          0%, 60% { opacity: 1; }
          65%, 70% { opacity: 0.25; }
          75%, 100% { opacity: 1; }
        }
        .fb2-led { animation: fb2-led-kf 0.9s infinite; }

        @keyframes fb2-printhead-kf {
          0% { opacity: 1; }
          30% { opacity: 0.4; }
          55% { opacity: 1; }
          62% { opacity: 0; }
          90% { opacity: 0; }
          100% { opacity: 1; }
        }
        .fb2-printhead { animation: fb2-printhead-kf 9s infinite; }

        /* 02 · salary skyline */
        @keyframes fb2-seg-kf {
          from { height: 0; }
          to { height: var(--h); }
        }
        .fb2-seg {
          height: 0;
          animation: fb2-seg-kf 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes fb2-growup-kf {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .fb2-growup {
          transform-origin: bottom center;
          transform: scaleY(0);
          animation: fb2-growup-kf 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* 03 · payroll scale */
        @keyframes fb2-beam-kf {
          0%, 10% { transform: rotate(0deg); }
          14% { transform: rotate(-2.2deg); }
          19% { transform: rotate(-2.2deg); }
          23% { transform: rotate(-4.4deg); }
          28% { transform: rotate(-4.4deg); }
          32% { transform: rotate(-6.6deg); }
          37% { transform: rotate(-6.6deg); }
          41% { transform: rotate(-8.8deg); }
          46% { transform: rotate(-8.8deg); }
          50% { transform: rotate(-11deg); }
          55% { transform: rotate(-11deg); }
          59% { transform: rotate(-13deg); }
          100% { transform: rotate(-13deg); }
        }
        .fb2-beam { animation: fb2-beam-kf 9s ease both; }

        @keyframes fb2-pan-kf {
          0%, 10% { transform: rotate(0deg); }
          14% { transform: rotate(2.2deg); }
          19% { transform: rotate(2.2deg); }
          23% { transform: rotate(4.4deg); }
          28% { transform: rotate(4.4deg); }
          32% { transform: rotate(6.6deg); }
          37% { transform: rotate(6.6deg); }
          41% { transform: rotate(8.8deg); }
          46% { transform: rotate(8.8deg); }
          50% { transform: rotate(11deg); }
          55% { transform: rotate(11deg); }
          59% { transform: rotate(13deg); }
          100% { transform: rotate(13deg); }
        }
        .fb2-panL, .fb2-panR { animation: fb2-pan-kf 9s ease both; }

        @keyframes fb2-drop-kf {
          0% { transform: translateY(-150px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .fb2-drop {
          opacity: 0;
          animation: fb2-drop-kf 0.5s cubic-bezier(0.5, 0, 1, 1) both;
        }

        /* 04 · podium rise */
        @keyframes fb2-rise-kf {
          from { transform: translateY(112%); }
          to { transform: translateY(var(--lift)); }
        }
        .fb2-rise {
          transform: translateY(112%);
          animation: fb2-rise-kf 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes fb2-minibadge-kf {
          0% { transform: scale(0); }
          60% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }
        .fb2-rise .fb2-minibadge {
          transform: scale(0);
          animation: fb2-minibadge-kf 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 2s both;
        }

        /* 05 · reveal flip */
        @keyframes fb2-flip-kf {
          0%, 38% { transform: rotateY(0deg); }
          46%, 84% { transform: rotateY(180deg); }
          92%, 100% { transform: rotateY(360deg); }
        }
        .fb2-flip { animation: fb2-flip-kf 10s cubic-bezier(0.45, 0, 0.25, 1) infinite; }

        /* 06 · power line */
        @keyframes fb2-comet-kf {
          0% { transform: translateX(-110px); opacity: 0; }
          6% { opacity: 1; }
          94% { opacity: 1; }
          100% { transform: translateX(580px); opacity: 0; }
        }
        .fb2-comet { animation: fb2-comet-kf 4s linear infinite; }

        @keyframes fb2-pulseA-kf {
          0%, 100% { box-shadow: 0 0 0 rgba(90,51,255,0); }
          4% { box-shadow: 0 0 30px rgba(90,51,255,0.55); }
          16% { box-shadow: 0 0 0 rgba(90,51,255,0); }
        }
        .fb2-pulse1 { animation: fb2-pulseA-kf 4s linear infinite 0.55s; }
        .fb2-pulse2 { animation: fb2-pulseA-kf 4s linear infinite 1.95s; }

        @keyframes fb2-pulseC-kf {
          0%, 80% { box-shadow: 0 12px 36px rgba(90,51,255,0.28); }
          88% { box-shadow: 0 0 44px rgba(102,247,142,0.6); }
          100% { box-shadow: 0 12px 36px rgba(90,51,255,0.28); }
        }
        .fb2-pulse3 { animation: fb2-pulseC-kf 4s linear infinite; }

        @keyframes fb2-tap-kf {
          0%, 100% { background: rgba(90,51,255,0.4); }
          5% { background: #66F78E; box-shadow: 0 0 12px #66F78E; }
          14% { background: rgba(90,51,255,0.4); }
        }
        .fb2-tap1 { animation: fb2-tap-kf 4s linear infinite 0.55s; }
        .fb2-tap2 { animation: fb2-tap-kf 4s linear infinite 1.95s; }
        .fb2-tap3 { animation: fb2-tap-kf 4s linear infinite 3.35s; }

        @keyframes fb2-charge-kf {
          0%, 12% { width: 6%; }
          70% { width: 6%; }
          92%, 100% { width: 100%; }
        }
        .fb2-charge { width: 6%; animation: fb2-charge-kf 4s linear infinite; }
      `}</style>
    </main>
  );
}
