"use client";

import { useState } from "react";
import s from "./PricingLivePreview.module.css";

const TERMS = [
  { months: 3, rate: 20, label: "$20K" },
  { months: 6, rate: 17, label: "$17K" },
  { months: 12, rate: 14, label: "$14K" },
] as const;

type Idx = 0 | 1 | 2;

export default function PricingLivePreviewMockup() {
  return (
    <main>
      <Frame
        tag="Variant A"
        title="Clean drop-in"
        notes="Pure slider, nothing else added. Headline price stays $20K, subtitle is '3–12 month engagement,' and the slider sits below as a quiet control. Most minimal — lets the slider do the work without sales-page chatter."
      >
        <PairA />
      </Frame>

      <Frame
        tag="Variant B"
        title="Slider + savings pill"
        notes="Same slider, but a small green 'Save $X/mo' pill appears in the slider header when 6mo or 12mo is selected. Disappears at 3mo. Subtle reinforcement without committing the whole card to ROI talk."
      >
        <PairB />
      </Frame>

      <Frame
        tag="Variant C"
        title="Slider + live comparison line"
        notes="Slider plus a small comparison panel below it: 'Vs $20K/mo · Save $X/mo · $Y total.' Updates live as you drag. Most CFO-defensible — does the savings math for the reader."
      >
        <PairC />
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

function AcceleratorCard() {
  return (
    <div className={s.card}>
      <span className={`${s.badge} ${s.badgeGreen}`}>Step One</span>
      <h3 className={s.planName}>The 3-Week Accelerator</h3>
      <div className={s.price}>
        $10K<small>one-time</small>
      </div>
      <p className={s.desc}>
        Full funnel video strategy + 4 videos in 3 weeks.{" "}
        <span className={s.descAccent}>
          We credit the $10K towards your engagement.
        </span>
      </p>
      <a className={`${s.cta} ${s.ctaOutline}`}>Book a Discovery Call</a>
    </div>
  );
}

function TenureSlider({
  idx,
  setIdx,
  rightSlot,
}: {
  idx: Idx;
  setIdx: (i: Idx) => void;
  rightSlot?: React.ReactNode;
}) {
  const fillRight = idx === 0 ? "100%" : idx === 1 ? "50%" : "0%";
  return (
    <div className={s.tenureSlider}>
      <div className={s.tenureHead}>
        <span>Engagement length</span>
        {rightSlot ?? <b>{TERMS[idx].months} months</b>}
      </div>
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
              <span className={s.tenureStopLabel}>{t.months}mo</span>
            </button>
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value) as Idx)}
          className={s.tenureDragOverlay}
          aria-label="Engagement length"
        />
      </div>
    </div>
  );
}

function EngineShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${s.card} ${s.featured}`}>
      <span className={`${s.badge} ${s.badgePurple}`}>Step Two</span>
      <h3 className={s.planName}>The Video Growth Engine</h3>
      <div className={s.price}>
        $20K<small>/ month</small>
      </div>
      <div className={s.priceFoot}>
        <b>3–12 month engagement</b>
      </div>
      {children}
      <p className={s.desc}>
        Your dedicated pipeline video team. We shorten your sales cycle,
        generate qualified demos, and build the video engine your competitors
        wish they had.
      </p>
      <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
    </div>
  );
}

function PairA() {
  const [idx, setIdx] = useState<Idx>(0);
  return (
    <div className={s.grid}>
      <AcceleratorCard />
      <EngineShell>
        <TenureSlider idx={idx} setIdx={setIdx} />
      </EngineShell>
    </div>
  );
}

function PairB() {
  const [idx, setIdx] = useState<Idx>(0);
  const savings = (TERMS[0].rate - TERMS[idx].rate) * 1000;
  const rightSlot =
    idx === 0 ? (
      <b>{TERMS[idx].months} months</b>
    ) : (
      <span className={s.savingsPill}>Save ${savings / 1000}K/mo</span>
    );
  return (
    <div className={s.grid}>
      <AcceleratorCard />
      <EngineShell>
        <TenureSlider idx={idx} setIdx={setIdx} rightSlot={rightSlot} />
      </EngineShell>
    </div>
  );
}

function PairC() {
  const [idx, setIdx] = useState<Idx>(0);
  const baseline = TERMS[0].rate;
  const current = TERMS[idx];
  const monthlySavings = baseline - current.rate;
  const total = current.rate * current.months;
  return (
    <div className={s.grid}>
      <AcceleratorCard />
      <EngineShell>
        <TenureSlider idx={idx} setIdx={setIdx} />
        <div className={s.compareLine}>
          {idx === 0 ? (
            <>
              <span>
                Entry rate · <b>${total}K</b> over {current.months} months
              </span>
              <span>Slide right to save</span>
            </>
          ) : (
            <>
              <span>
                Vs <b>$20K/mo</b> · <span className={s.save}>save ${monthlySavings}K/mo</span>
              </span>
              <span>
                <b>${total}K</b> total
              </span>
            </>
          )}
        </div>
      </EngineShell>
    </div>
  );
}
