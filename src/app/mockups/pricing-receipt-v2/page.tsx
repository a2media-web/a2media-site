"use client";

import { useState } from "react";
import s from "./PricingReceiptV2.module.css";

type Term = 3 | 6;

const RATE: Record<Term, number> = { 3: 20, 6: 14 };

export default function PricingReceiptV2Mockup() {
  const [term, setTerm] = useState<Term>(3);
  const monthly = RATE[term];
  const engineSubtotal = monthly * term;
  const total = 10 + engineSubtotal - 10; // Accelerator + Engine - credit
  const savedVs3mo = (RATE[3] - RATE[term]) * term;

  return (
    <main>
      <section className={s.frame}>
        <div className={s.frameInner}>
          <span className={s.tag}>Receipt + new pricing ($20K / $14K)</span>
          <h2 className={s.title}>
            One Path. <em>Two Steps.</em>
          </h2>
          <p className={s.intro}>
            Every engagement starts with the <b>3-Week Accelerator</b>.
            <br />
            <span className={s.introAccent}>
              Your $10K rolls into the discounted monthly rates below.
            </span>
          </p>

          <div className={s.grid}>
            {/* Accelerator */}
            <div className={s.card}>
              <span className={`${s.badge} ${s.badgeGreen}`}>Start Here</span>
              <h3 className={s.planName}>The 3-Week Accelerator</h3>
              <div className={s.priceMain}>
                $10K<small>one-time</small>
              </div>
              <p className={s.desc}>
                Full funnel video strategy + 4 videos in 3 weeks.{" "}
                <b>Required first step.</b>
              </p>
              <a className={`${s.cta} ${s.ctaOutline}`}>
                Book a Discovery Call
              </a>
              <div className={s.included}>
                <span>What&apos;s included</span>
                <span className={s.plus}>+</span>
              </div>
            </div>

            {/* Engine */}
            <div className={`${s.card} ${s.featured}`}>
              <span className={`${s.badge} ${s.badgePurple}`}>Then</span>
              <h3 className={s.planName}>The Video Growth Engine</h3>

              <div className={s.priceRow}>
                <span className={s.priceMain}>
                  ${monthly}K<small>/ month</small>
                </span>
                {term === 6 ? (
                  <span className={s.savingsPill}>
                    Save ${savedVs3mo}K vs 3-month
                  </span>
                ) : null}
              </div>

              <p className={s.desc}>
                Your dedicated pipeline video team. We shorten your sales cycle,
                generate qualified demos, and build the video engine your
                competitors wish they had.
              </p>

              <div className={s.toggleRow}>
                <span className={s.toggleLabel}>Engagement length</span>
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
              </div>

              <div className={s.receipt}>
                <div className={s.receiptHead}>
                  <span>Your engagement</span>
                  <span>
                    {term} months
                  </span>
                </div>
                <div className={s.receiptRow}>
                  <span>3-Week Accelerator (Step 1)</span>
                  <b>$10,000</b>
                </div>
                <div className={s.receiptRow}>
                  <span>
                    Engine · ${monthly},000 × {term} months
                  </span>
                  <b>${engineSubtotal.toLocaleString()}</b>
                </div>
                <div className={s.receiptRow}>
                  <span>Accelerator credit applied</span>
                  <span className={s.credit}>− $10,000</span>
                </div>
                <div className={s.receiptDivider} />
                <div className={s.receiptTotal}>
                  <span className={s.receiptTotalLabel}>Your total</span>
                  <span className={s.receiptTotalValue}>
                    ${total.toLocaleString()}
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
        </div>
      </section>
    </main>
  );
}
