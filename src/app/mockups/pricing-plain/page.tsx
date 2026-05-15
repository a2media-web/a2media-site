"use client";

import { useState } from "react";
import s from "./PricingPlain.module.css";

type Term = 3 | 6;

const RATE: Record<Term, number> = { 3: 17, 6: 15 };
const TOTAL: Record<Term, number> = { 3: 51, 6: 90 };

export default function PricingPlainMockup() {
  return (
    <main>
      <Frame
        tag="Variant A"
        title="Plain English with total cards"
        notes="Two boxes stay. Engine card shows two side-by-side option tiles (3mo total / 6mo total). Plain copy on each. No strikethrough, no credit pill, no slider — just totals + a short plain-English sentence explaining what's in those numbers."
      >
        <PlainTotals />
      </Frame>

      <Frame
        tag="Variant B"
        title="Itemized receipt"
        notes="Engine card reads like an invoice. Line items: monthly rate × months = subtotal, minus $10K Accelerator credit, equals total. Math is explicit, nothing hidden. Toggles between 3mo and 6mo."
      >
        <Receipt />
      </Frame>

      <Frame
        tag="Variant C"
        title="Single unified engagement card"
        notes="Drops the two-box model entirely. One card titled 'The A2 Engagement' with two visible phases inside: Weeks 1-3 (Accelerator) and Months 1+ (Engine). One total line at the bottom that updates with the 3mo/6mo toggle. No connector needed — it's literally one thing."
      >
        <UnifiedCard />
      </Frame>

      <Frame
        tag="Variant D"
        title="Total cost first"
        notes="Engine card leads with the TOTAL ($51K or $90K), not the monthly rate. Below the total: a small breakdown showing 'Accelerator $10K + Engine $X × Y months'. The monthly rate is information you can derive, not the hero number."
      >
        <TotalFirst />
      </Frame>

      <Frame
        tag="Variant E"
        title="Q&A copy structure"
        notes="Cards keep the same shape but the copy is restructured as label / value rows. 'What you pay upfront', 'What you pay monthly', 'Total over your term', 'Your credit'. Plain English, anticipates the questions."
      >
        <QACopy />
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

function AcceleratorPlain() {
  return (
    <div className={s.card}>
      <span className={`${s.badge} ${s.badgeGreen}`}>Start Here</span>
      <h3 className={s.planName}>The 3-Week Accelerator</h3>
      <div className={s.aPrice}>
        $10K<small>one-time</small>
      </div>
      <p className={s.aPlain}>
        Strategy + 4 videos. Three weeks. <b>Required first step.</b>
      </p>
      <a className={`${s.cta} ${s.ctaOutline}`}>Book a Discovery Call</a>
      <div className={s.included}>
        <span>What&apos;s included</span>
        <span className={s.plus}>+</span>
      </div>
    </div>
  );
}

/* ============ Variant A — Plain totals ============ */
function PlainTotals() {
  const [term, setTerm] = useState<Term>(3);
  return (
    <div className={s.grid2}>
      <AcceleratorPlain />
      <div className={`${s.card} ${s.featured}`}>
        <span className={`${s.badge} ${s.badgePurple}`}>Then</span>
        <h3 className={s.planName}>The Video Growth Engine</h3>
        <p className={s.aPlain} style={{ marginTop: 0 }}>
          A monthly engagement after your Accelerator. Pick how long you want to commit. <b>Longer = lower monthly rate.</b>
        </p>
        <div className={s.aOptionRow}>
          {([3, 6] as Term[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={`${s.aOption} ${term === t ? s.aOptionActive : ""}`}
            >
              <div className={s.aOptionLabel}>{t} months</div>
              <div className={s.aOptionTotal}>${TOTAL[t]}K</div>
              <div className={s.aOptionRate}>${RATE[t]}K / month · all in</div>
            </button>
          ))}
        </div>
        <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
        <div className={s.included}>
          <span>What&apos;s included</span>
          <span className={s.plus}>+</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Variant B — Receipt ============ */
function Receipt() {
  const [term, setTerm] = useState<Term>(3);
  const monthly = RATE[term];
  const gross = monthly * term;
  return (
    <div className={s.grid2}>
      <AcceleratorPlain />
      <div className={`${s.card} ${s.featured}`}>
        <span className={`${s.badge} ${s.badgePurple}`}>Then</span>
        <h3 className={s.planName}>The Video Growth Engine</h3>

        <div className={s.bTabs}>
          {([3, 6] as Term[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={`${s.bTab} ${term === t ? s.bTabActive : ""}`}
            >
              {t} months
            </button>
          ))}
        </div>

        <div className={s.bReceipt}>
          <div className={s.bRow}>
            <span>Monthly rate</span>
            <b>${monthly},000</b>
          </div>
          <div className={s.bRow}>
            <span>Term</span>
            <b>× {term} months</b>
          </div>
          <div className={s.bRow}>
            <span>Subtotal</span>
            <b>${gross},000</b>
          </div>
          <div className={s.bRow}>
            <span>Less Accelerator credit</span>
            <b>− $10,000</b>
          </div>
          <div className={s.bDivider} />
          <div className={s.bTotal}>
            <span className={s.bTotalLabel}>Your total</span>
            <span className={s.bTotalAmount}>${gross - 10},000</span>
          </div>
        </div>

        <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
        <div className={s.included}>
          <span>What&apos;s included</span>
          <span className={s.plus}>+</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Variant C — Single unified engagement ============ */
function UnifiedCard() {
  const [term, setTerm] = useState<Term>(3);
  const total = 10 + RATE[term] * term;
  return (
    <div className={s.cCardSolo}>
      <span className={s.cEyebrow}>How it works</span>
      <h3 className={s.cTitle}>The A2 Engagement</h3>

      <div className={s.cPhase}>
        <div className={s.cPhaseHead}>
          <div>
            <div className={s.cPhaseLabel}>Weeks 1 – 3</div>
            <div className={s.cPhaseTitle}>The 3-Week Accelerator</div>
          </div>
          <div className={s.cPhasePrice}>
            $10K<small>one-time</small>
          </div>
        </div>
        <p className={s.cPhaseDesc}>
          Full funnel video strategy + 4 videos in 3 weeks.
        </p>
      </div>

      <div className={`${s.cPhase} ${s.cPhaseFeatured}`}>
        <div className={s.cPhaseHead}>
          <div>
            <div className={s.cPhaseLabel}>Months 1 +</div>
            <div className={s.cPhaseTitle}>The Video Growth Engine</div>
          </div>
          <div className={s.cPhasePrice}>
            ${RATE[term]}K<small>/ month</small>
          </div>
        </div>
        <p className={s.cPhaseDesc}>
          Your dedicated pipeline video team. Pick your commitment below.
        </p>
        <div className={s.cPhaseToggle}>
          {([3, 6] as Term[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={term === t ? s.cPhaseTabActive : ""}
            >
              {t} months
            </button>
          ))}
        </div>
      </div>

      <div className={s.cTotalLine}>
        <span className={s.cTotalLabel}>Total commitment</span>
        <span className={s.cTotalValue}>${total}K</span>
      </div>

      <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
      <div className={s.included}>
        <span>What&apos;s included</span>
        <span className={s.plus}>+</span>
      </div>
    </div>
  );
}

/* ============ Variant D — Total cost first ============ */
function TotalFirst() {
  const [term, setTerm] = useState<Term>(3);
  return (
    <div className={s.grid2}>
      <AcceleratorPlain />
      <div className={`${s.card} ${s.featured}`}>
        <span className={`${s.badge} ${s.badgePurple}`}>Then</span>
        <h3 className={s.planName}>The Video Growth Engine</h3>

        <div className={s.dHero}>
          <span className={s.dHeroBig}>${TOTAL[term]}K</span>
          <span className={s.dHeroUnit}>total · {term} months</span>
        </div>
        <div className={s.dSub}>
          Works out to <b>${RATE[term]}K / month</b>, all in.
        </div>

        <div className={s.dToggle}>
          {([3, 6] as Term[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={term === t ? s.dToggleActive : ""}
            >
              {t} months
            </button>
          ))}
        </div>

        <div className={s.dBreakdown}>
          <div className={s.dBreakdownRow}>
            <span>3-Week Accelerator (one-time)</span>
            <b>$10K</b>
          </div>
          <div className={s.dBreakdownRow}>
            <span>
              Engine · ${RATE[term]}K × {term} months
            </span>
            <b>${RATE[term] * term}K</b>
          </div>
          <div className={s.dBreakdownRow}>
            <span>Less Accelerator credit</span>
            <b>− $10K</b>
          </div>
        </div>

        <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
        <div className={s.included}>
          <span>What&apos;s included</span>
          <span className={s.plus}>+</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Variant E — Q&A copy ============ */
function QACopy() {
  const [term, setTerm] = useState<Term>(3);
  return (
    <div className={s.grid2}>
      <AcceleratorPlain />
      <div className={`${s.card} ${s.featured}`}>
        <span className={`${s.badge} ${s.badgePurple}`}>Then</span>
        <h3 className={s.planName}>The Video Growth Engine</h3>

        <div className={s.eToggle}>
          {([3, 6] as Term[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={term === t ? s.eToggleActive : ""}
            >
              {t} months
            </button>
          ))}
        </div>

        <div className={s.eQA}>
          <div className={s.eRow}>
            <span className={s.eRowLabel}>You pay</span>
            <span className={s.eRowValue}>
              ${RATE[term]}K / month
              <span className={s.muted}> · for {term} months</span>
            </span>
          </div>
          <div className={s.eRow}>
            <span className={s.eRowLabel}>Total</span>
            <span className={s.eRowValue}>${TOTAL[term]}K</span>
          </div>
          <div className={s.eRow}>
            <span className={s.eRowLabel}>Already in price</span>
            <span className={s.eRowValue}>
              <span className={s.muted}>$10K credit from your Accelerator.</span>
            </span>
          </div>
        </div>

        <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
        <div className={s.included}>
          <span>What&apos;s included</span>
          <span className={s.plus}>+</span>
        </div>
      </div>
    </div>
  );
}
