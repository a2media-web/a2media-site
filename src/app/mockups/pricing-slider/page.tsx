"use client";

import { useState } from "react";
import s from "./PricingSlider.module.css";

const DESC =
  "Your dedicated pipeline video team. We shorten your sales cycle, generate qualified demos, and build the video engine your competitors wish they had.";

type Length = 3 | 6 | 12;

type Tier = {
  months: Length;
  monthly: number;
  effectiveMonthly: number;
  total: number;
  badge?: { kind: "credit" | "save"; label: string };
};

const TIERS: Record<Length, Tier> = {
  3: { months: 3, monthly: 20000, effectiveMonthly: 20000, total: 60000 },
  6: {
    months: 6,
    monthly: 20000,
    effectiveMonthly: 18417,
    total: 110500,
    badge: { kind: "credit", label: "Includes $9.5K Accelerator credit" },
  },
  12: {
    months: 12,
    monthly: 18000,
    effectiveMonthly: 18000,
    total: 216000,
    badge: { kind: "save", label: "Save $24K" },
  },
};

const fmtMoney = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}K` : `$${n}`;

function PriceBlock({ tier }: { tier: Tier }) {
  return (
    <div className={s.priceBlock}>
      <div className={s.priceRow}>
        <span className={s.priceMain}>{fmtMoney(tier.effectiveMonthly)}</span>
        <span className={s.priceUnit}>/ month</span>
      </div>
      <div className={s.priceSub}>
        <b>{tier.months}-month engagement</b> · {fmtMoney(tier.total)} total
      </div>
      {tier.badge ? (
        <div
          className={tier.badge.kind === "credit" ? s.creditBadge : s.discountBadge}
        >
          {tier.badge.label}
        </div>
      ) : null}
    </div>
  );
}

export default function PricingSliderMockup() {
  return (
    <main>
      <Frame
        tag="Option A"
        title="Snap Slider"
        notes="Classic horizontal slider with three snap points (3 / 6 / 12). The fill bar grows as you select longer engagements. Drag or tap a stop. Most physical."
      >
        <SnapSlider />
      </Frame>

      <Frame
        tag="Option B"
        title="Pill Segments"
        notes="Three pills in a row, each labeled with the engagement length + a tiny savings sub-label. Click to select. Cleanest, most discoverable. Reads as a real UI control, not a 'gimmick.'"
      >
        <PillSegments />
      </Frame>

      <Frame
        tag="Option C"
        title="Tile Selector"
        notes="Three side-by-side tiles, each shows the per-month price and a savings/credit flag. The selected tile glows purple. Most info-dense — buyer can see all three options at once before picking."
      >
        <TileSelector />
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

function SnapSlider() {
  const [months, setMonths] = useState<Length>(6);
  const stops: Length[] = [3, 6, 12];
  const fillRight = months === 3 ? "100%" : months === 6 ? "50%" : "0%";
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <PriceBlock tier={TIERS[months]} />

      <div className={s.aLabelRow}>
        <span>Engagement length</span>
        <b>{months} months</b>
      </div>
      <div className={s.aTrack}>
        <div className={s.aRail} />
        <div className={s.aFill} style={{ right: fillRight }} />
        <div className={s.aStops}>
          {stops.map((m) => (
            <button
              key={m}
              type="button"
              aria-label={`${m} months`}
              className={`${s.aStop} ${months === m ? s.aStopActive : ""}`}
              onClick={() => setMonths(m)}
            />
          ))}
        </div>
      </div>
      <div className={s.aTicks}>
        {stops.map((m) => (
          <span key={m} className={months === m ? s.aTickActive : ""}>
            {m}mo
          </span>
        ))}
      </div>

      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function PillSegments() {
  const [months, setMonths] = useState<Length>(6);
  const stops: { months: Length; sub: string }[] = [
    { months: 3, sub: "No discount" },
    { months: 6, sub: "+ Credit" },
    { months: 12, sub: "Save $24K" },
  ];
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <PriceBlock tier={TIERS[months]} />

      <div className={s.bGroup}>
        {stops.map((stop) => (
          <button
            key={stop.months}
            type="button"
            className={`${s.bSeg} ${months === stop.months ? s.bSegActive : ""}`}
            onClick={() => setMonths(stop.months)}
          >
            <span>{stop.months} months</span>
            <span className={s.bSegSub}>{stop.sub}</span>
          </button>
        ))}
      </div>

      <p className={s.desc}>{DESC}</p>
    </div>
  );
}

function TileSelector() {
  const [months, setMonths] = useState<Length>(6);
  const stops: Length[] = [3, 6, 12];
  return (
    <div className={s.card}>
      <span className={s.badge}>Step Two</span>
      <h2 className={s.planName}>The Video Growth Engine</h2>
      <PriceBlock tier={TIERS[months]} />

      <div className={s.cGrid}>
        {stops.map((m) => {
          const tier = TIERS[m];
          const active = months === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMonths(m)}
              className={`${s.cTile} ${active ? s.cTileActive : ""}`}
            >
              <div className={s.cTileLabel}>{m} months</div>
              <div className={s.cTileMonthly}>{fmtMoney(tier.effectiveMonthly)}</div>
              <div className={s.cTileMonthlyUnit}>per month</div>
              {tier.badge ? (
                <span
                  className={`${s.cTileFlag} ${tier.badge.kind === "credit" ? s.cTileFlagCredit : ""}`}
                >
                  {tier.badge.kind === "credit" ? "Credit" : "Save $24K"}
                </span>
              ) : (
                <span className={`${s.cTileFlag} ${s.cTileFlagPlaceholder}`}>—</span>
              )}
            </button>
          );
        })}
      </div>

      <p className={s.desc}>{DESC}</p>
    </div>
  );
}
