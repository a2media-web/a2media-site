"use client";

/* ──────────────────────────────────────────────────────────────────────────
   Mockup route: /mockups/cost-comparison
   Two ways to ship the "what does this actually cost" section.

   Variant A — Static Cost Reframe. You author the comparison. No interaction.
   Variant B — Interactive ROI Calculator. The buyer drives the numbers and
               watches the gap move. Same section, upgraded.

   Cost model (honest, defensible):
   - In-house = 1 content strategist ($95K) + editors (1 per ~8 videos/mo,
     $80K each) + software/tools ($12K/yr) + 25% benefits/overhead on salary.
   - A2 Video Growth Engine = blended monthly retainer, scales with volume:
     4-8 vids → $14K, 9-12 → $17K, 13+ → $20K.
   ────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";

/* ---- shared cost math ----------------------------------------------------- */

const STRATEGIST = 95_000;
const EDITOR = 80_000;
const SOFTWARE = 12_000;
const OVERHEAD = 0.25; // benefits, payroll tax, equipment, PTO

function inHouseAnnual(videosPerMonth: number) {
  const editors = Math.max(1, Math.ceil(videosPerMonth / 8));
  const salary = STRATEGIST + editors * EDITOR;
  return Math.round(salary * (1 + OVERHEAD) + SOFTWARE);
}

function a2Monthly(videosPerMonth: number) {
  if (videosPerMonth <= 8) return 14_000;
  if (videosPerMonth <= 12) return 17_000;
  return 20_000;
}

function inHouseHeadcount(videosPerMonth: number) {
  return 1 + Math.max(1, Math.ceil(videosPerMonth / 8));
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const fmtK = (n: number) => "$" + Math.round(n / 1000) + "K";

/* ---- page ----------------------------------------------------------------- */

export default function CostComparisonMockups() {
  return (
    <main style={{ background: "#07021f" }}>
      <Frame
        tag="Variant A"
        title="Static Cost Reframe"
        notes="You author the comparison. A fixed breakdown of an in-house video team versus the Engine retainer. Lowest build cost, zero interactivity. Reads as a confident statement — but it's your claim, so a skeptical buyer can dismiss it."
      >
        <StaticReframe />
      </Frame>

      <Frame
        tag="Variant B"
        title="Interactive ROI Calculator"
        notes="The buyer drags the slider and watches their own in-house cost climb past the A2 retainer. Same section, but the buyer reaches the conclusion themselves — far more persuasive, and it doubles as a qualifier (someone who needs 4 videos/mo sees a different story than someone who needs 16). This IS the cost comparison section."
      >
        <RoiCalculator />
      </Frame>
    </main>
  );
}

/* ---- VARIANT A: static -------------------------------------------------- */

function StaticReframe() {
  const lines = [
    { role: "Content strategist", detail: "Owns the roadmap, scripts, AEO", cost: STRATEGIST },
    { role: "Senior video editor", detail: "Long-form cuts + direction", cost: EDITOR },
    { role: "Editor / motion designer", detail: "Short-form cuts + graphics", cost: EDITOR },
    { role: "Software & tooling", detail: "Adobe, AI effects, AEO stack", cost: SOFTWARE },
  ];
  const salaryTotal = STRATEGIST + EDITOR * 2;
  const overheadCost = Math.round(salaryTotal * OVERHEAD);
  const inHouseYear = inHouseAnnual(10);
  const a2Year = a2Monthly(10) * 12;
  const saved = inHouseYear - a2Year;

  return (
    <section style={shell}>
      <div style={inner}>
        <p style={eyebrow}>The real math</p>
        <h2 style={h2}>
          Building this in-house costs more than{" "}
          <span style={serifAccent}>you think.</span>
        </h2>
        <p style={lede}>
          To ship 10 videos a month with real strategy behind them, here&apos;s the
          team you&apos;d hire — and what it actually runs per year.
        </p>

        <div style={twoCol}>
          {/* in-house */}
          <div style={{ ...card, background: "rgba(255,255,255,0.03)" }}>
            <span style={cardTag}>Build it in-house</span>
            <div style={lineList}>
              {lines.map((l) => (
                <div key={l.role} style={lineRow}>
                  <div>
                    <div style={lineRole}>{l.role}</div>
                    <div style={lineDetail}>{l.detail}</div>
                  </div>
                  <div style={lineCost}>{fmt(l.cost)}</div>
                </div>
              ))}
              <div style={lineRow}>
                <div>
                  <div style={lineRole}>Benefits & overhead</div>
                  <div style={lineDetail}>Payroll tax, PTO, equipment (25%)</div>
                </div>
                <div style={lineCost}>{fmt(overheadCost)}</div>
              </div>
            </div>
            <div style={totalRow}>
              <span>Per year</span>
              <span style={totalBig}>{fmt(inHouseYear)}</span>
            </div>
            <p style={fineprint}>
              Plus 3–4 months to hire, the management load, and the risk it walks
              out the door.
            </p>
          </div>

          {/* a2 */}
          <div style={{ ...card, ...cardFeatured }}>
            <span style={{ ...cardTag, ...cardTagBright }}>The Video Growth Engine</span>
            <div style={lineList}>
              {[
                "A content strategist, editors, and AEO — one team",
                "10–12 done-for-you videos a month",
                "72-hour turnaround, no hiring runway",
                "Monthly competitor audits + strategy reviews",
              ].map((f) => (
                <div key={f} style={engineFeat}>
                  <span style={chk}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ ...totalRow, borderColor: "rgba(90,51,255,0.35)" }}>
              <span>Per year</span>
              <span style={{ ...totalBig, color: "#fff" }}>{fmt(a2Year)}</span>
            </div>
            <p style={{ ...fineprint, color: "rgba(255,255,255,0.66)" }}>
              From {fmtK(a2Monthly(10))}/month. Starts shipping in week one.
            </p>
          </div>
        </div>

        <div style={verdict}>
          You save <strong style={{ color: "#66f78e" }}>{fmt(saved)} a year</strong>{" "}
          — and skip the hiring, the managing, and the turnover.
        </div>
        <a href="#" style={ctaBtn}>
          Book a discovery call <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

/* ---- VARIANT B: interactive calculator ---------------------------------- */

function RoiCalculator() {
  const [videos, setVideos] = useState(10);

  const inHouseYear = inHouseAnnual(videos);
  const a2Year = a2Monthly(videos) * 12;
  const saved = inHouseYear - a2Year;
  const heads = inHouseHeadcount(videos);

  // bar widths relative to the larger number
  const max = Math.max(inHouseYear, a2Year);
  const inHousePct = (inHouseYear / max) * 100;
  const a2Pct = (a2Year / max) * 100;

  return (
    <section style={shell}>
      <div style={inner}>
        <p style={eyebrow}>Run your own numbers</p>
        <h2 style={h2}>
          What would this cost <span style={serifAccent}>you?</span>
        </h2>
        <p style={lede}>
          Drag the slider to the volume you actually need. Watch what an in-house
          team costs against the Engine.
        </p>

        {/* control */}
        <div style={controlBox}>
          <div style={controlTopRow}>
            <span style={controlLabel}>Videos you want to publish each month</span>
            <span style={controlValue}>{videos}</span>
          </div>
          <input
            type="range"
            min={4}
            max={18}
            step={1}
            value={videos}
            onChange={(e) => setVideos(Number(e.target.value))}
            style={slider}
            aria-label="Videos per month"
          />
          <div style={sliderScale}>
            <span>4</span>
            <span>18</span>
          </div>
          <p style={controlNote}>
            That&apos;s a <strong>{heads}-person</strong> in-house team —{" "}
            {heads - 1} editor{heads - 1 > 1 ? "s" : ""} plus a content strategist.
          </p>
        </div>

        {/* bars */}
        <div style={barsBox}>
          <div style={barGroup}>
            <div style={barHead}>
              <span style={barName}>Build it in-house</span>
              <span style={barCost}>{fmt(inHouseYear)}<small style={barPer}>/yr</small></span>
            </div>
            <div style={barTrack}>
              <div
                style={{
                  ...barFill,
                  width: `${inHousePct}%`,
                  background: "rgba(255,255,255,0.16)",
                }}
              />
            </div>
          </div>

          <div style={barGroup}>
            <div style={barHead}>
              <span style={{ ...barName, color: "#fff" }}>A2 Video Growth Engine</span>
              <span style={{ ...barCost, color: "#fff" }}>
                {fmt(a2Year)}<small style={barPer}>/yr</small>
              </span>
            </div>
            <div style={barTrack}>
              <div
                style={{
                  ...barFill,
                  width: `${a2Pct}%`,
                  background: "linear-gradient(90deg,#5a33ff,#8f45ee)",
                  boxShadow: "0 0 30px rgba(90,51,255,0.55)",
                }}
              />
            </div>
          </div>
        </div>

        {/* verdict */}
        <div style={resultCard}>
          <div style={resultStat}>
            <span style={resultBig}>{fmt(saved)}</span>
            <span style={resultUnit}>saved per year with A2</span>
          </div>
          <div style={resultDivider} />
          <ul style={skipList}>
            <li><span style={chk}>✓</span> No 3–4 month hiring runway</li>
            <li><span style={chk}>✓</span> No managing, no turnover risk</li>
            <li><span style={chk}>✓</span> Strategy + AEO built in, not a separate hire</li>
          </ul>
        </div>

        <a href="#" style={ctaBtn}>
          See your exact monthly number on a call <span aria-hidden>→</span>
        </a>
        <p style={disclaimer}>
          Estimate based on US market salaries plus 25% benefits & overhead.
          Your discovery call gives you the exact figure.
        </p>
      </div>
    </section>
  );
}

/* ---- mockup frame (matches /mockups aesthetic) -------------------------- */

function Frame({
  tag,
  title,
  notes,
  children,
}: {
  tag: string;
  title: string;
  notes: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header style={frameHeader}>
        <span style={frameTag}>{tag}</span>
        <h1 style={frameTitle}>{title}</h1>
        <p style={frameNotes}>{notes}</p>
      </header>
      {children}
    </>
  );
}

/* ---- styles ------------------------------------------------------------- */

const frameHeader: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "48px 24px 28px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  textAlign: "center",
};
const frameTag: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 12px",
  background: "rgba(90,51,255,0.15)",
  border: "1px solid rgba(90,51,255,0.45)",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#5a33ff",
  marginBottom: "12px",
};
const frameTitle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: 0,
};
const frameNotes: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.65)",
  margin: "8px auto 0",
  maxWidth: "620px",
  lineHeight: 1.55,
};

const shell: React.CSSProperties = {
  background: "#0d0536",
  color: "#fff",
  padding: "clamp(64px,8vw,110px) 24px",
  fontFamily: "var(--a2-sans)",
};
const inner: React.CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
  textAlign: "center",
};
const eyebrow: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#5a33ff",
  marginBottom: "14px",
};
const h2: React.CSSProperties = {
  fontSize: "clamp(32px,4.4vw,52px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  margin: "0 0 16px",
};
const serifAccent: React.CSSProperties = {
  fontFamily: "var(--a2-display)",
  fontStyle: "italic",
  fontWeight: 500,
  color: "#5a33ff",
};
const lede: React.CSSProperties = {
  fontSize: "16px",
  color: "rgba(255,255,255,0.7)",
  maxWidth: "560px",
  margin: "0 auto 44px",
  lineHeight: 1.6,
};

const twoCol: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "20px",
  textAlign: "left",
};
const card: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "22px",
  padding: "32px",
  backdropFilter: "blur(12px)",
};
const cardFeatured: React.CSSProperties = {
  background:
    "linear-gradient(160deg,rgba(90,51,255,0.22),rgba(90,51,255,0.05))",
  border: "1px solid rgba(90,51,255,0.5)",
  boxShadow: "0 0 60px rgba(90,51,255,0.25)",
};
const cardTag: React.CSSProperties = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.6)",
  marginBottom: "22px",
};
const cardTagBright: React.CSSProperties = { color: "#fff" };

const lineList: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};
const lineRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  padding: "14px 0",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
};
const lineRole: React.CSSProperties = { fontSize: "15px", fontWeight: 600 };
const lineDetail: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.5)",
  marginTop: "2px",
};
const lineCost: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
};
const engineFeat: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  fontSize: "15px",
  padding: "11px 0",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
  color: "rgba(255,255,255,0.9)",
};
const chk: React.CSSProperties = {
  color: "#66f78e",
  fontWeight: 700,
  flexShrink: 0,
};
const totalRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginTop: "20px",
  paddingTop: "18px",
  borderTop: "1px solid rgba(255,255,255,0.14)",
  fontSize: "14px",
  color: "rgba(255,255,255,0.6)",
};
const totalBig: React.CSSProperties = {
  fontSize: "30px",
  fontWeight: 700,
  color: "#fff",
  fontVariantNumeric: "tabular-nums",
};
const fineprint: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(255,255,255,0.45)",
  marginTop: "14px",
  lineHeight: 1.5,
};
const verdict: React.CSSProperties = {
  fontSize: "19px",
  margin: "40px auto 28px",
  maxWidth: "560px",
  lineHeight: 1.5,
};

/* calculator */
const controlBox: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "22px",
  padding: "28px 32px",
  textAlign: "left",
};
const controlTopRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};
const controlLabel: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.85)",
};
const controlValue: React.CSSProperties = {
  fontSize: "34px",
  fontWeight: 700,
  color: "#5a33ff",
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1,
};
const slider: React.CSSProperties = {
  width: "100%",
  accentColor: "#5a33ff",
  height: "6px",
  cursor: "pointer",
};
const sliderScale: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
  color: "rgba(255,255,255,0.4)",
  marginTop: "6px",
};
const controlNote: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.6)",
  marginTop: "16px",
};
const barsBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "26px",
  margin: "36px 0",
  textAlign: "left",
};
const barGroup: React.CSSProperties = {};
const barHead: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginBottom: "10px",
};
const barName: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.7)",
};
const barCost: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  fontVariantNumeric: "tabular-nums",
  color: "rgba(255,255,255,0.8)",
};
const barPer: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "rgba(255,255,255,0.4)",
  marginLeft: "3px",
};
const barTrack: React.CSSProperties = {
  height: "20px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "999px",
  overflow: "hidden",
};
const barFill: React.CSSProperties = {
  height: "100%",
  borderRadius: "999px",
  transition: "width 320ms cubic-bezier(0.22,0.61,0.36,1)",
};
const resultCard: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "28px",
  background:
    "linear-gradient(160deg,rgba(90,51,255,0.2),rgba(90,51,255,0.04))",
  border: "1px solid rgba(90,51,255,0.5)",
  borderRadius: "22px",
  padding: "30px 34px",
  textAlign: "left",
  boxShadow: "0 0 60px rgba(90,51,255,0.22)",
};
const resultStat: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};
const resultBig: React.CSSProperties = {
  fontSize: "42px",
  fontWeight: 700,
  color: "#66f78e",
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1,
};
const resultUnit: React.CSSProperties = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.7)",
  marginTop: "6px",
};
const resultDivider: React.CSSProperties = {
  width: "1px",
  alignSelf: "stretch",
  background: "rgba(255,255,255,0.14)",
};
const skipList: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  fontSize: "14px",
  color: "rgba(255,255,255,0.85)",
};
const ctaBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "34px",
  padding: "17px 34px",
  background: "#5a33ff",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "999px",
  textDecoration: "none",
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(90,51,255,0.45)",
};
const disclaimer: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.4)",
  marginTop: "20px",
  maxWidth: "480px",
  marginInline: "auto",
  lineHeight: 1.5,
};
