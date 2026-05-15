"use client";

import { useState } from "react";
import s from "./PricingDumbSimple.module.css";

type Term = 3 | 6;
const RATE: Record<Term, number> = { 3: 20, 6: 14 };
const TOTAL: Record<Term, number> = { 3: 50, 6: 74 };
const ALLIN: Record<Term, number> = { 3: 60, 6: 84 };

export default function PricingDumbSimpleMockup() {
  return (
    <main>
      <Frame
        tag="Concept 1"
        title="One number, one slider"
        notes="ONE big number on the page. Toggle between 3mo and 6mo. The number updates. That's it. No breakdown, no math, no two-card comparison. Tap 'What's included' if you want detail."
      >
        <OneNumber />
      </Frame>

      <Frame
        tag="Concept 2"
        title="Two stark prices, side-by-side rows"
        notes="No card stack. Just two rows: '3 MONTHS — $50K' and '6 MONTHS — $74K'. One total per row, large. No supporting math anywhere. Footer: 'Includes the 3-Week Accelerator + monthly engagement.'"
      >
        <TwoStark />
      </Frame>

      <Frame
        tag="Concept 3"
        title="The combined package (one card)"
        notes="Drops the two-box model. One unified offer card: 'The A2 Engagement.' Toggle 3mo/6mo, one total shows ($50K or $74K). Below: 3-bullet inclusion list. No math visible."
      >
        <Combined />
      </Frame>

      <Frame
        tag="Concept 4"
        title="Pay this, then this (zero math)"
        notes="Pure plain English. Two cards. Each says ONE thing. Accelerator: '$10K. Once.' Engine: '$20K/month. Or $14K/month for 6.' That's literally the whole pricing. Total never shown — the buyer can do it on a call."
      >
        <PayThis />
      </Frame>

      <Frame
        tag="Concept 5"
        title="Single all-in cost"
        notes="One big total ($60K or $84K all-in). No mention of Accelerator separately. No mention of credit. Just 'The engagement costs $X total.' Most stripped-down possible. Drop the 'Accelerator' and 'Engine' framing entirely from the pricing page — it lives in 'What's included.'"
        hideIntro
      >
        <AllIn />
      </Frame>
    </main>
  );
}

function Frame({
  tag,
  title,
  notes,
  children,
  hideIntro = false,
}: {
  tag: string;
  title: string;
  notes: string;
  children: React.ReactNode;
  hideIntro?: boolean;
}) {
  return (
    <section className={s.frame}>
      <div className={s.frameInner}>
        <span className={s.tag}>{tag}</span>
        <h2 className={s.title}>{title}</h2>
        <p className={s.intro}>{notes}</p>
        <div className={s.contextWrap}>
          <h3 className={s.contextHeading}>
            One Path. <em>Two Steps.</em>
          </h3>
          {!hideIntro ? (
            <p className={s.contextIntro}>
              Every engagement starts with the <b>3-Week Accelerator</b>.
              <br />
              <span className={s.contextIntroAccent}>
                Your $10K rolls into the discounted monthly rates below.
              </span>
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}

/* ============ Concept 1 — One number, one slider ============ */
function OneNumber() {
  const [term, setTerm] = useState<Term>(6);
  return (
    <div className={s.oneCard}>
      <div className={s.oneLabel}>Your total</div>
      <div className={s.oneNumber}>${TOTAL[term]}K</div>
      <div className={s.oneSub}>
        For a <b>{term}-month engagement</b> · plus the $10K Accelerator upfront
      </div>
      <div className={s.tabs}>
        {([3, 6] as Term[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTerm(t)}
            className={`${s.tab} ${term === t ? s.tabActive : ""}`}
          >
            {t} months
          </button>
        ))}
      </div>
      <div>
        <a className={s.oneCta}>See if We&apos;re a Fit</a>
      </div>
      <div className={s.oneIncluded}>
        <span>What&apos;s included</span>
        <span className={s.plus}>+</span>
      </div>
    </div>
  );
}

/* ============ Concept 2 — Two stark rows ============ */
function TwoStark() {
  return (
    <div className={s.oneCard} style={{ textAlign: "left" }}>
      <div className={s.twoLines}>
        <div className={s.twoRow}>
          <div>
            <div className={s.twoTerm}>3 Months</div>
            <span className={s.twoTermSub}>Test the relationship</span>
          </div>
          <div className={s.twoPrice}>$50K</div>
        </div>
        <div className={s.twoRow}>
          <div>
            <div className={s.twoTerm}>6 Months</div>
            <span className={s.twoTermSub}>Best value · save $36K vs 3-mo rate</span>
          </div>
          <div className={`${s.twoPrice} ${s.twoPriceFeatured}`}>$74K</div>
        </div>
        <div className={s.twoFoot}>
          Includes the <b>3-Week Accelerator</b> + monthly engagement.
          <br />
          One $10K Accelerator payment upfront. Monthly billing after.
        </div>
        <div className={s.twoCtas}>
          <a className={`${s.twoCta} ${s.twoCtaSecondary}`}>Choose 3 months</a>
          <a className={`${s.twoCta} ${s.twoCtaPrimary}`}>Choose 6 months</a>
        </div>
        <div className={s.twoIncluded}>
          <span>What&apos;s included</span>
          <span className={s.plus}>+</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Concept 3 — Combined single card ============ */
function Combined() {
  const [term, setTerm] = useState<Term>(6);
  return (
    <div className={s.combo}>
      <span className={s.comboEyebrow}>The A2 Engagement</span>
      <h3 className={s.comboTitle}>Strategy + ongoing video team</h3>

      <div className={s.comboFlexRow}>
        <div>
          <span className={s.comboPrice}>${TOTAL[term]}K</span>
          <span className={s.comboPriceSub}>· total for {term} months</span>
        </div>
        <div className={s.comboTabs}>
          {([3, 6] as Term[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={`${s.comboTab} ${term === t ? s.comboTabActive : ""}`}
            >
              {t} months
            </button>
          ))}
        </div>
      </div>

      <p className={s.comboDesc}>
        Every engagement starts with our <b>3-Week Accelerator</b> ($10K, paid
        once). Then we build your video pipeline on a monthly retainer.
      </p>

      <ul className={s.comboList}>
        <li className={s.comboItem}>
          <span className={s.check}>✓</span>
          <span>Full funnel video strategy + 4 videos in the first 3 weeks</span>
        </li>
        <li className={s.comboItem}>
          <span className={s.check}>✓</span>
          <span>10 to 12 done-for-you videos per month after that</span>
        </li>
        <li className={s.comboItem}>
          <span className={s.check}>✓</span>
          <span>72-hour turnaround, monthly strategy reviews, dedicated team</span>
        </li>
      </ul>

      <a className={s.comboCta}>See if We&apos;re a Fit</a>
      <div className={s.comboIncluded}>
        <span>Full breakdown</span>
        <span className={s.plus}>+</span>
      </div>
    </div>
  );
}

/* ============ Concept 4 — Pay this, then this ============ */
function PayThis() {
  return (
    <div
      className={s.oneCard}
      style={{
        textAlign: "left",
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        boxShadow: "none",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          alignItems: "stretch",
        }}
      >
        <PlainBlock
          tag="First"
          plan="The 3-Week Accelerator"
          big="$10K"
          unit="once"
          desc="Strategy + 4 videos. Three weeks. Required to start."
        />
        <PlainBlock
          tag="Then"
          plan="The Video Growth Engine"
          big="$14K — $20K"
          unit="per month"
          desc="Pick 3 or 6 months. Longer = lower monthly rate."
          featured
        />
      </div>
      <div
        className={s.twoFoot}
        style={{ borderTop: "1px solid rgba(255,255,255,0.10)", marginTop: 24 }}
      >
        We&apos;ll walk you through the exact total on your discovery call.
      </div>
      <div className={s.twoIncluded}>
        <span>What&apos;s included</span>
        <span className={s.plus}>+</span>
      </div>
    </div>
  );
}

function PlainBlock({
  tag,
  plan,
  big,
  unit,
  desc,
  featured = false,
}: {
  tag: string;
  plan: string;
  big: string;
  unit: string;
  desc: string;
  featured?: boolean;
}) {
  return (
    <div
      style={{
        padding: 28,
        background: featured
          ? "linear-gradient(180deg, rgba(90, 51, 255, 0.10) 0%, rgba(90, 51, 255, 0.02) 100%)"
          : "rgba(255, 255, 255, 0.02)",
        border: featured
          ? "1px solid rgba(90, 51, 255, 0.50)"
          : "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius: 16,
        boxShadow: featured
          ? "0 18px 50px rgba(90, 51, 255, 0.22)"
          : "none",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: featured ? "#5A33FF" : "rgba(255,255,255,0.55)",
          marginBottom: 12,
        }}
      >
        {tag}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 12,
        }}
      >
        {plan}
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {big}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.6)",
          marginTop: 6,
          marginBottom: 14,
        }}
      >
        {unit}
      </div>
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.75)",
        }}
      >
        {desc}
      </div>
    </div>
  );
}

/* ============ Concept 5 — Single all-in cost ============ */
function AllIn() {
  const [term, setTerm] = useState<Term>(6);
  return (
    <div className={s.oneCard}>
      <div className={s.oneLabel}>The engagement</div>
      <div className={s.oneNumber}>${ALLIN[term]}K</div>
      <div className={s.oneSub}>
        All-in over <b>{term} months</b>. Strategy + ongoing video.
      </div>
      <div className={s.tabs}>
        {([3, 6] as Term[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTerm(t)}
            className={`${s.tab} ${term === t ? s.tabActive : ""}`}
          >
            {t} months
          </button>
        ))}
      </div>
      <div>
        <a className={s.oneCta}>See if We&apos;re a Fit</a>
      </div>
      <div className={s.oneIncluded}>
        <span>What&apos;s included</span>
        <span className={s.plus}>+</span>
      </div>
    </div>
  );
}
