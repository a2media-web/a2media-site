"use client";

import { useState } from "react";
import s from "./PricingVariants.module.css";

const DESC =
  "Your dedicated pipeline video team. We shorten your sales cycle, generate qualified demos, and build the video engine your competitors wish they had.";

export default function PricingDisplayMockup() {
  return (
    <main>
      <Frame
        tag="Current"
        title="What's live now"
        notes="$120K with '6-month engagement' subtitle. Big total leads. The number Christina sees first is the one that triggers escalation."
      >
        <CurrentVariant />
      </Frame>

      <Frame
        tag="Option A"
        title="Big Monthly Hero"
        notes="$20K/month becomes the hero. Total + commitment shown as small print below. Most direct way to reframe sticker shock."
      >
        <OptionA />
      </Frame>

      <Frame
        tag="Option B"
        title="Stacked Equal Weight"
        notes="Two prices side by side, monthly on left (highlighted purple), total on right. Visually says 'here's the unit and here's the commitment.' Most transparent."
      >
        <OptionB />
      </Frame>

      <Frame
        tag="Option C"
        title="Interactive Toggle"
        notes="Monthly / Total tabs. User picks the unit they want to see. Active by default on Monthly. Most modern, most SaaS-y."
      >
        <OptionC />
      </Frame>

      <Frame
        tag="Option D"
        title="Math Breakdown Pill"
        notes="$20K/month hero, with the math ($20K × 6 = $120K) shown as a small badge underneath. Says 'we're not hiding the total.' Most defensible."
      >
        <OptionD />
      </Frame>

      <Frame
        tag="Option E"
        title="Anchored Comparison"
        notes="$20K/month hero with a green anchor badge underneath: 'Less than one in-house video editor.' Reframes against a budget bucket she already knows. Most persuasive but pushiest."
      >
        <OptionE />
      </Frame>

      <Frame
        tag="Option F"
        title="Receipt / Invoice Block"
        notes="Pricing rendered as a typewritten invoice. Itemizes the deal: $20K × 6 months. Anti-marketing aesthetic. Most disarming. Speaks to a CFO-brain Christina who's tired of marketing-page theater."
      >
        <OptionF />
      </Frame>

      <Frame
        tag="Option G"
        title="Per-Video Price"
        notes="Reframes the unit entirely. $1,500 per video × 80+ videos = $120K. Now she's not buying a 'service,' she's buying assets at a per-unit price. Best if 'how many videos' is the actual objection."
      >
        <OptionG />
      </Frame>

      <Frame
        tag="Option H"
        title="Cost of Inaction Anchor"
        notes="Two columns side by side: 'Another quarter of unproven video spend' vs. 'A team that proves video ROI in 6 months.' Aggressive reframe — your competitor isn't the next agency, it's the status quo."
      >
        <OptionH />
      </Frame>

      <Frame
        tag="Option I"
        title="Interactive Slider"
        notes="Drag a slider from month 1 to month 6. Total updates live. Visual proof that the price scales with commitment. Most playful, most modern. Risk: feels gimmicky if the buyer is already serious."
      >
        <OptionI />
      </Frame>

      <Frame
        tag="Option J"
        title="6-Month Timeline Grid"
        notes="Six small purple cells (Month 01–06), each with $20K. Visually maps the engagement to a calendar. Says 'here's exactly what you're committing to.' Most architectural / planning-friendly."
      >
        <OptionJ />
      </Frame>
    </main>
  );
}

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
    <section className={s.frame}>
      <div className={s.frameInner}>
        <span className={s.tag}>{tag}</span>
        <h2 className={s.title}>{title}</h2>
        <p className={s.notes}>{notes}</p>
        {children}
      </div>
    </section>
  );
}

function CurrentVariant() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
          $120K
        </span>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
          6-month engagement
        </span>
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionA() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.aPrice}>
        <span className={s.aBig}>$20K</span>
        <span className={s.aUnit}>/ month</span>
      </div>
      <div className={s.aFoot}>
        <strong>6-month engagement</strong> · $120K total commitment
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionB() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.bRow}>
        <div className={`${s.bCol} ${s.bHighlight}`}>
          <div className={s.bColLabel}>Monthly</div>
          <div className={s.bColPrice}>$20K</div>
          <div className={s.bColSub}>per month</div>
        </div>
        <div className={s.bDiv} aria-hidden />
        <div className={s.bCol}>
          <div className={s.bColLabel}>Total</div>
          <div className={s.bColPrice}>$120K</div>
          <div className={s.bColSub}>6-month engagement</div>
        </div>
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionC() {
  const [view, setView] = useState<"monthly" | "total">("monthly");
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.cTabs}>
        <button
          type="button"
          onClick={() => setView("monthly")}
          className={`${s.cTab} ${view === "monthly" ? s.cTabActive : ""}`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setView("total")}
          className={`${s.cTab} ${view === "total" ? s.cTabActive : ""}`}
        >
          Total
        </button>
      </div>
      {view === "monthly" ? (
        <>
          <div className={s.cPrice}>
            <span className={s.cBig}>$20K</span>
            <span className={s.cUnit}>/ month</span>
          </div>
          <div className={s.cFoot}>6-month engagement · $120K total</div>
        </>
      ) : (
        <>
          <div className={s.cPrice}>
            <span className={s.cBig}>$120K</span>
            <span className={s.cUnit}>over 6 months</span>
          </div>
          <div className={s.cFoot}>Works out to $20K / month</div>
        </>
      )}
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionD() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.dPrice}>
        <span className={s.dBig}>$20K</span>
        <span className={s.dUnit}>/ month</span>
      </div>
      <div className={s.dMath}>
        <b>$20K</b>
        <span>×</span>
        <b>6 months</b>
        <span className={s.equals}>=</span>
        <b>$120K total</b>
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionE() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.ePrice}>
        <span className={s.eBig}>$20K</span>
        <span className={s.eUnit}>/ month</span>
      </div>
      <div className={s.eAnchor}>Less than one in-house video editor</div>
      <div className={s.eFoot}>6-month engagement · $120K total</div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionF() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.fReceipt}>
        <div className={s.fHeader}>
          <span>The Engine</span>
          <span>6-month engagement</span>
        </div>
        <div className={s.fRow}>
          <span>Monthly rate</span>
          <b>$20,000</b>
        </div>
        <div className={s.fRow}>
          <span>Term</span>
          <b>× 6 months</b>
        </div>
        <div className={s.fTotal}>
          <span className={s.fTotalLabel}>Total commitment</span>
          <span className={s.fTotalNum}>$120,000</span>
        </div>
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionG() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.gPriceRow}>
        <span className={s.gBig}>$1,500</span>
        <span className={s.gUnit}>/ per video</span>
      </div>
      <div className={s.gBreakdown}>
        <span className={s.gChip}>
          <strong>80+</strong>&nbsp;videos
        </span>
        <span className={s.gChip}>
          <strong>6</strong>&nbsp;months
        </span>
        <span className={s.gChip}>
          <strong>$120K</strong>&nbsp;total
        </span>
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionH() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.hWrap}>
        <div className={`${s.hCol} ${s.hColBad}`}>
          <div className={s.hLabel}>Status quo</div>
          <div className={s.hLine}>Another quarter of unproven video spend.</div>
        </div>
        <div className={s.hVs}>VS</div>
        <div className={`${s.hCol} ${s.hColGood}`}>
          <div className={s.hLabel}>The Engine</div>
          <div className={s.hLine}>A team that proves video ROI in 6 months.</div>
        </div>
      </div>
      <div className={s.hFoot}>
        <b>$20K / month</b> · 6-month engagement · $120K total
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionI() {
  const [months, setMonths] = useState(6);
  const total = 20 * months;
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.iBig}>${total}K</div>
      <div className={s.iSub}>
        Total commitment over <b style={{ color: "#fff" }}>{months} month{months !== 1 ? "s" : ""}</b>
        &nbsp;· $20K / month
      </div>
      <div className={s.iSliderLabel}>
        <span>Engagement length</span>
        <span>{months} {months === 1 ? "month" : "months"}</span>
      </div>
      <input
        type="range"
        min={1}
        max={6}
        value={months}
        onChange={(e) => setMonths(parseInt(e.target.value))}
        className={s.iSlider}
        aria-label="Engagement length in months"
      />
      <div className={s.iTicks}>
        <span>1mo</span>
        <span>6mo min.</span>
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function OptionJ() {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div className={s.jBig}>$20K / month</div>
      <div className={s.jSub}>The 6-month engagement, mapped:</div>
      <div className={s.jTimeline}>
        {[1, 2, 3, 4, 5, 6].map((m) => (
          <div key={m} className={s.jCell}>
            <div className={s.jMonth}>M{String(m).padStart(2, "0")}</div>
            <div className={s.jAmt}>$20K</div>
          </div>
        ))}
      </div>
      <div className={s.jFoot}>
        <span>Total commitment</span>
        <b>$120,000</b>
      </div>
      <p className={s.desc}>{DESC}</p>
    </div>
  );
}
