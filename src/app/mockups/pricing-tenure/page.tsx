"use client";

import { useState } from "react";
import s from "./PricingTenure.module.css";

type Term = 3 | 6 | 12;
const RATES: Record<Term, number> = { 3: 20000, 6: 18000, 12: 15000 };
const STOPS: Term[] = [3, 6, 12];

const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}K` : `$${n}`;

export default function PricingTenureMockup() {
  return (
    <main>
      <Frame
        tag="Variant A"
        title="Reveal Below"
        notes="Hero stays at $20K/month (anchor). Slider lives below with a small reveal panel that updates with the selected term. Most stable, hero never moves."
      >
        <RevealBelow />
      </Frame>

      <Frame
        tag="Variant B"
        title="Dynamic Hero"
        notes="The big $20K hero price morphs as you drag the slider — $20K → $18K → $15K. Slider becomes the direct control for the headline number. Most dramatic, most connected."
      >
        <DynamicHero />
      </Frame>

      <Frame
        tag="Variant C"
        title="Inline Stop Labels"
        notes="Each slider stop has its rate printed directly above it ($20K / $18K / $15K). Active stop is bigger and white. All three prices visible at once."
      >
        <InlineStops />
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

function CardShell({
  heroRate,
  children,
}: {
  heroRate: number;
  children: React.ReactNode;
}) {
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <div>
        <span className={s.priceMain}>{fmt(heroRate)}</span>
        <span className={s.priceUnit}>/ month</span>
      </div>
      <div className={s.priceFoot}>
        <b>3–12 month engagement</b>
      </div>
      {children}
    </div>
  );
}

function SnapTrack({
  active,
  onSelect,
}: {
  active: Term;
  onSelect: (t: Term) => void;
}) {
  const fillRight = active === 3 ? "100%" : active === 6 ? "50%" : "0%";
  return (
    <>
      <div className={s.track}>
        <div className={s.rail} />
        <div className={s.fill} style={{ right: fillRight }} />
        <div className={s.stops}>
          {STOPS.map((t) => (
            <button
              key={t}
              type="button"
              aria-label={`${t} months`}
              className={`${s.stop} ${active === t ? s.stopActive : ""}`}
              onClick={() => onSelect(t)}
            />
          ))}
        </div>
      </div>
      <div className={s.ticks}>
        {STOPS.map((t) => (
          <span key={t} className={active === t ? s.tickActive : ""}>
            {t} months
          </span>
        ))}
      </div>
    </>
  );
}

function RevealBelow() {
  const [term, setTerm] = useState<Term>(6);
  return (
    <CardShell heroRate={20000}>
      <div className={s.sliderBlock}>
        <div className={s.sliderHead}>
          <span>Engagement length</span>
          <b>
            {term} months · {fmt(RATES[term])}/mo
          </b>
        </div>
        <SnapTrack active={term} onSelect={setTerm} />
        <div className={s.aReveal}>
          <span className={s.aRevealLabel}>Your rate</span>
          <span className={s.aRevealRate}>
            {fmt(RATES[term])}
            <small>/ month</small>
          </span>
        </div>
      </div>
    </CardShell>
  );
}

function DynamicHero() {
  const [term, setTerm] = useState<Term>(6);
  const baseline = RATES[3];
  const savings = (baseline - RATES[term]) * term;
  return (
    <CardShell heroRate={RATES[term]}>
      {term !== 3 ? (
        <div className={s.bSavingsRow}>
          <span className={s.bSavings}>Save {fmt(baseline - RATES[term])}/mo</span>
          <span className={s.bSavingsLine}>
            <b>{fmt(savings)}</b> saved over {term} months
          </span>
        </div>
      ) : null}
      <div className={s.sliderBlock}>
        <div className={s.sliderHead}>
          <span>Engagement length</span>
          <b>{term} months</b>
        </div>
        <SnapTrack active={term} onSelect={setTerm} />
      </div>
    </CardShell>
  );
}

function InlineStops() {
  const [term, setTerm] = useState<Term>(6);
  const fillRight = term === 3 ? "100%" : term === 6 ? "50%" : "0%";
  return (
    <CardShell heroRate={20000}>
      <div className={s.sliderBlock}>
        <div className={s.sliderHead}>
          <span>Engagement length</span>
          <b>{term} months</b>
        </div>
        <div className={s.cTrack}>
          <div className={s.cRail} />
          <div className={s.cFill} style={{ right: fillRight }} />
          <div className={s.cStops}>
            {STOPS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={`${s.cStop} ${term === t ? s.cStopActive : ""}`}
              >
                <span className={s.cStopRate}>{fmt(RATES[t])}</span>
                <span className={s.cStopDot} />
                <span className={s.cStopLabel}>{t}mo</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );
}
