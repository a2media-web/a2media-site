import s from "./PricingFull.module.css";

const ENGINE_DESC =
  "Your dedicated pipeline video team. We shorten your sales cycle, generate qualified demos, and build the video engine your competitors wish they had.";
const ACCEL_DESC =
  "Full funnel video strategy + 3 videos in 3 weeks.";
const ACCEL_CREDIT =
  "We credit the $9.5K towards your 6-month engagement.";
const EXPANSION = ["Sizzle Reels", "Brand Refresh Launches", "Event Coverage"];

export default function PricingFullMockup() {
  return (
    <main>
      <Frame
        tag="Variant A"
        title="Two cards + Expansion strip below"
        notes="Same two-card structure you have now. Engine reframed to lead with $20K/month and the 6-month minimum + month-to-month after. A dashed-border 'expansion services' strip sits below both cards as unpriced badges. Closest to your current site, lowest risk."
      >
        <VariantA />
      </Frame>

      <Frame
        tag="Variant B"
        title="Engine-led with nested expansion"
        notes="Engine card visually dominates (1.4× width), Accelerator becomes a quieter side card. Expansion services live inside the Engine card as small chips, separated by a subtle divider. Frames the relationship as 'here's the main offer, and here's what you can layer on as a client.'"
      >
        <VariantB />
      </Frame>

      <Frame
        tag="Variant C"
        title="Vertical 3-step journey"
        notes="Three horizontal rows stacked. Step 01 Accelerator → Step 02 Engine (continuity, featured) → Step 03 Expansion (no price, just signal). Frames pricing as a journey, not a 'pick a plan' shop. Most narrative, most A2-distinct."
      >
        <VariantC />
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
      <div>
        <span className={s.priceMain}>$9.5K</span>
        <span className={s.priceUnit}>one-time</span>
      </div>
      <div className={s.priceFoot}>
        <span className={s.rec}>{ACCEL_CREDIT}</span>
      </div>
      <p className={s.desc}>{ACCEL_DESC}</p>
      <a className={`${s.cta} ${s.ctaOutline}`}>
        Book a Discovery Call <span aria-hidden>→</span>
      </a>
    </div>
  );
}

function EngineCard({ withNested = false }: { withNested?: boolean }) {
  return (
    <div className={`${s.card} ${s.featured} ${withNested ? s.bEngineCard : ""}`}>
      <span className={`${s.badge} ${s.badgePurple}`}>Step Two</span>
      <h3 className={s.planName}>The Video Growth Engine</h3>
      <div>
        <span className={s.priceMain}>$20K</span>
        <span className={s.priceUnit}>/ month</span>
      </div>
      <div className={s.priceFoot}>
        <b>6-month minimum.</b> Continues month-to-month after. Cancel anytime once minimum is met.
      </div>
      <p className={s.desc}>{ENGINE_DESC}</p>
      <a className={`${s.cta} ${s.ctaFilled}`}>
        See if We&apos;re a Fit <span aria-hidden>→</span>
      </a>
      {withNested ? (
        <div className={s.bNested}>
          <span className={s.bNestedLabel}>Expand the engagement</span>
          <h4 className={s.bNestedTitle}>Current clients can add</h4>
          <div className={s.bNestedRow}>
            {EXPANSION.map((e) => (
              <span key={e} className={s.bNestedChip}>{e}</span>
            ))}
          </div>
          <div className={s.bNestedFoot}>
            Priced separately when the moment makes sense.
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VariantA() {
  return (
    <>
      <div className={s.aGrid}>
        <AcceleratorCard />
        <EngineCard />
      </div>
      <div className={s.aExpansion}>
        <span className={s.aExpansionLabel}>Expand the engagement</span>
        <h4 className={s.aExpansionTitle}>
          Current clients can add separate engagements for:
        </h4>
        <div className={s.aExpansionRow}>
          {EXPANSION.map((e) => (
            <span key={e} className={s.aExpansionChip}>{e}</span>
          ))}
        </div>
        <div className={s.aExpansionFoot}>
          Priced per project. Brought up when the moment makes sense, not before.
        </div>
      </div>
    </>
  );
}

function VariantB() {
  return (
    <div className={s.bGrid}>
      <EngineCard withNested />
      <AcceleratorCard />
    </div>
  );
}

function VariantC() {
  return (
    <div className={s.cStack}>
      <div className={s.cStep}>
        <div className={s.cNum}>01</div>
        <div className={s.cBody}>
          <h3>The 3-Week Accelerator</h3>
          <p className={s.cStepDesc}>
            Full funnel video strategy + 3 videos in 3 weeks.{" "}
            <b>Credits the $9.5K towards your engagement.</b>
          </p>
        </div>
        <div className={s.cPrice}>
          <div className={s.cPriceMain}>
            $9.5K<small>one-time</small>
          </div>
        </div>
      </div>

      <div className={`${s.cStep} ${s.featured}`}>
        <div className={s.cNum}>02</div>
        <div className={s.cBody}>
          <h3>The Video Growth Engine</h3>
          <p className={s.cStepDesc}>
            Your dedicated pipeline video team. <b>6-month minimum, then month-to-month.</b>{" "}
            Cancel anytime once minimum is met.
          </p>
        </div>
        <div className={s.cPrice}>
          <div className={s.cPriceMain}>
            $20K<small>/ month</small>
          </div>
        </div>
      </div>

      <div className={s.cStep}>
        <div className={s.cNum}>03</div>
        <div className={s.cBody}>
          <h3>Expand the engagement</h3>
          <p className={s.cStepDesc}>
            Current clients can add separate engagements for big moments.
          </p>
          <div className={s.cChips}>
            {EXPANSION.map((e) => (
              <span key={e} className={s.cChip}>{e}</span>
            ))}
          </div>
        </div>
        <div className={s.cPrice}>
          <div className={s.cPriceWord}>Priced per project</div>
        </div>
      </div>
    </div>
  );
}
