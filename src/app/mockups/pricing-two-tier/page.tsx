"use client";

import { useState } from "react";
import s from "./PricingTwoTier.module.css";

const TERMS = [
  { months: 3, rate: 17, label: "$17K", total: 51, savedVs3mo: 0 },
  { months: 6, rate: 15, label: "$15K", total: 90, savedVs3mo: 12 },
] as const;

type Idx = 0 | 1;

export default function PricingTwoTierMockup() {
  const [idx, setIdx] = useState<Idx>(0);
  const fillRight = idx === 0 ? "100%" : "0%";
  const term = TERMS[idx];

  return (
    <main>
      <section className={s.frame}>
        <div className={s.frameInner}>
          <span className={s.tag}>Two-tier preview</span>
          <h2 className={s.title}>Accelerator + Engine, two engagement stops</h2>
          <p className={s.notes}>
            Drag the slider on the Engine card. 3 months $17K/mo · 6 months $15K/mo. Hero price morphs as you drag. 12-month tier handled as a private renewal conversation, not on the public page.
          </p>

          <div className={s.grid}>
            {/* Accelerator */}
            <div className={s.card}>
              <span className={`${s.badge} ${s.badgeGreen}`}>Step One</span>
              <h3 className={s.planName}>The 3-Week Accelerator</h3>
              <div className={s.price}>
                $10K<small>one-time</small>
              </div>
              <p className={s.desc}>
                Full funnel video strategy + 4 videos in 3 weeks.{" "}
                <span className={s.descAccent}>
                  We credit the $10K towards your monthly engagement.
                </span>
              </p>
              <a className={`${s.cta} ${s.ctaOutline}`}>Book a Discovery Call</a>
            </div>

            {/* Engine */}
            <div className={`${s.card} ${s.featured}`}>
              <span className={`${s.badge} ${s.badgePurple}`}>Step Two</span>
              <h3 className={s.planName}>The Video Growth Engine</h3>
              <div className={s.priceRow}>
                <span className={s.priceCrossed}>$20K</span>
                <span className={s.price}>
                  {term.label}
                  <small>/ month</small>
                </span>
              </div>

              <p className={s.desc}>
                Your dedicated pipeline video team. We shorten your sales cycle,
                generate qualified demos, and build the video engine your
                competitors wish they had.
              </p>

              <div className={s.tenureSlider}>
                <div className={s.tenureTrack}>
                  <div className={s.tenureRail} aria-hidden />
                  <div
                    className={s.tenureFill}
                    style={{ right: fillRight }}
                    aria-hidden
                  />
                  <div className={s.tenureStops}>
                    {TERMS.map((t, i) => (
                      <button
                        key={t.months}
                        type="button"
                        onClick={() => setIdx(i as Idx)}
                        className={`${s.tenureStop} ${
                          idx === i ? s.tenureStopActive : ""
                        }`}
                        aria-label={`${t.months} months — ${t.label} per month`}
                      >
                        <span className={s.tenureStopRate}>{t.label}</span>
                        <span className={s.tenureStopDot} />
                        <span className={s.tenureStopLabel}>
                          {t.months} months
                        </span>
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={1}
                    value={idx}
                    onChange={(e) =>
                      setIdx(Number(e.target.value) as Idx)
                    }
                    className={s.tenureDragOverlay}
                    aria-label="Engagement length"
                  />
                </div>
              </div>

              <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
