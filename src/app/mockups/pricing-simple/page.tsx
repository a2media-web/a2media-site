"use client";

import { useState } from "react";
import s from "./PricingSimple.module.css";

type Term = 3 | 6;
const RATE: Record<Term, number> = { 3: 20, 6: 14 };
// Engine cost after $10K credit applied (Engine subtotal − $10K)
const ENGINE_NET: Record<Term, number> = { 3: 50, 6: 74 };

export default function PricingSimpleMockup() {
  return (
    <main>
      <Frame
        tag="Concept 1"
        title="Two big buttons"
        notes="Two giant cards. Each shows ONE number: $50K or $74K. That's the cost of the Engine after your $10K Accelerator credit is applied. Tiny supporting line beneath. No tables, no toggles, no math. Christina sees the total in 1 second."
      >
        <TwoBigButtons />
      </Frame>

      <Frame
        tag="Concept 2"
        title="One math equation"
        notes="Single card with a giant math equation written out. $60K − $10K = $50K (or $84K − $10K = $74K). Toggle between 3mo and 6mo. The math is done IN PUBLIC. No way to be confused. Brutalist clarity."
      >
        <MathEquation />
      </Frame>

      <Frame
        tag="Concept 3"
        title="Timeline of payments"
        notes="Single horizontal timeline showing the journey: Pay $10K → Engine for 3 or 6 months → Final total. Each node is a moment in time with a price attached. Reads like a roadmap, not a pricing table."
      >
        <Timeline />
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
        <p className={s.intro}>{notes}</p>
        {children}
      </div>
    </section>
  );
}

/* ============ Concept 1 — Two Big Buttons ============ */
function TwoBigButtons() {
  return (
    <div className={s.bigGrid}>
      <div className={s.bigCard}>
        <div className={s.bigLabel}>3 Months</div>
        <div className={s.bigNumber}>$50K</div>
        <div className={s.bigSub}>
          <b>$10K</b> Accelerator + <b>$20K/mo</b> for 3 months − <b>$10K</b> credit
        </div>
        <div className={s.bigDivider} />
        <p className={s.bigPlain}>
          The flexible option. Start with the 3-Week Accelerator, then a 3-month engagement to prove value.
        </p>
        <a className={s.bigCta}>Choose 3 months</a>
        <div className={s.bigIncluded}>
          <span>What&apos;s included</span>
          <span className={s.plus}>+</span>
        </div>
      </div>

      <div className={`${s.bigCard} ${s.bigCardFeatured}`}>
        <div className={s.bigLabel}>6 Months · Best value</div>
        <div className={s.bigNumber}>$74K</div>
        <div className={s.bigSub}>
          <b>$10K</b> Accelerator + <b>$14K/mo</b> for 6 months − <b>$10K</b> credit
        </div>
        <div className={s.bigDivider} />
        <p className={s.bigPlain}>
          The locked-in option. Lower monthly rate. Cancel the question of "are we doing video next quarter?" for half a year.
        </p>
        <a className={s.bigCta}>Choose 6 months</a>
        <div className={s.bigIncluded}>
          <span>What&apos;s included</span>
          <span className={s.plus}>+</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Concept 2 — Math Equation ============ */
function MathEquation() {
  const [term, setTerm] = useState<Term>(3);
  const monthly = RATE[term];
  const subtotal = monthly * term;
  const total = ENGINE_NET[term];

  return (
    <div className={s.mathCard}>
      <div className={s.mathTabs}>
        {([3, 6] as Term[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTerm(t)}
            className={`${s.mathTab} ${term === t ? s.mathTabActive : ""}`}
          >
            {t} months
          </button>
        ))}
      </div>

      <div className={s.equation}>
        <span className={s.eqNum}>${monthly}K</span>
        <span className={s.eqOp}>×</span>
        <span className={s.eqNum}>{term}</span>
        <span className={s.eqOp}>−</span>
        <span className={s.eqNum}>$10K</span>
        <span className={`${s.eqOp} ${s.eqEquals}`}>=</span>
        <span className={s.eqResult}>${total}K</span>
      </div>
      <div className={s.eqLabels}>
        <span>Monthly</span>
        <span>Months</span>
        <span>Credit</span>
        <span className={s.total}>Your Engine Cost</span>
      </div>

      <p className={s.mathDesc}>
        Plus your <b>$10K Accelerator</b> upfront, which we credit back into the
        engagement. <b>${total}K all-in for {term} months</b> of dedicated video work.
      </p>

      <a className={s.mathCta}>See if We&apos;re a Fit</a>
    </div>
  );
}

/* ============ Concept 3 — Timeline ============ */
function Timeline() {
  const [term, setTerm] = useState<Term>(3);
  const monthly = RATE[term];
  const total = ENGINE_NET[term];

  return (
    <div className={s.tlCard}>
      <div className={s.tlTabs}>
        {([3, 6] as Term[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTerm(t)}
            className={`${s.tlTab} ${term === t ? s.tlTabActive : ""}`}
          >
            {t}-month engagement
          </button>
        ))}
      </div>

      <div className={s.timeline}>
        <div className={`${s.tlNode} ${s.tlNodeActive}`}>
          <div className={s.tlWhen}>Day 1</div>
          <div className={s.tlEvent}>3-Week Accelerator</div>
          <div className={s.tlPay}>
            $10K
            <small>one-time</small>
          </div>
        </div>
        <div className={`${s.tlNode} ${s.tlNodeActive}`}>
          <div className={s.tlWhen}>Week 4 +</div>
          <div className={s.tlEvent}>Video Growth Engine</div>
          <div className={s.tlPay}>
            ${monthly}K
            <small>per month · {term} months</small>
          </div>
        </div>
        <div className={`${s.tlNode} ${s.tlNodeFinal}`}>
          <div className={s.tlWhen}>End of term</div>
          <div className={s.tlEvent}>Total spent</div>
          <div className={s.tlPay}>
            ${total}K
            <small>all-in</small>
          </div>
        </div>
      </div>

      <div className={s.tlBottom}>
        <p className={s.tlBottomText}>
          Your <b>$10K Accelerator</b> credits back into your monthly rate, so
          your <b>${term}-month total is ${total}K</b>. No hidden fees.
        </p>
        <a className={s.tlCta}>See if We&apos;re a Fit</a>
      </div>

      <div className={s.tlIncluded}>
        <span>What&apos;s included</span>
        <span className={s.plus}>+</span>
      </div>
    </div>
  );
}
