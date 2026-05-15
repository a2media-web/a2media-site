import s from "./PricingClarity.module.css";

export default function PricingClarityMockup() {
  return (
    <main>
      <Frame
        tag="Variant A"
        title="Intro sentence above the cards"
        notes="Single sentence sits above both cards explaining the order and clarifying the credit math. Cards stay almost identical to live. Lowest risk, highest clarity-per-pixel. The Accelerator's 'we credit' line is removed because the intro now carries that load."
      >
        <div className={s.intro}>
          Every engagement starts with the <b>3-Week Accelerator</b>.{" "}
          <span className={s.accent}>Your $10K rolls into the discounted monthly rates below.</span>
        </div>
        <div className={s.grid2}>
          <AcceleratorCard hideCreditCopy />
          <EngineCard />
        </div>
      </Frame>

      <Frame
        tag="Variant B"
        title="Connector between the cards"
        notes="Same intro sentence as A, plus a 'Then →' pill bridging the two cards. Strongest visual signal that Accelerator → Engine is one path, not two parallel choices. Badges are renamed: 'Start Here' and 'Then'."
      >
        <div className={s.intro}>
          Every engagement starts with the <b>3-Week Accelerator</b>.{" "}
          <span className={s.accent}>Your $10K rolls into the discounted monthly rates below.</span>
        </div>
        <div className={s.grid3}>
          <AcceleratorCard hideCreditCopy badge="Start Here" badgeClass={`${s.badge} ${s.badgeBright}`} />
          <div className={s.connector}>
            <span className={s.connectorLine} aria-hidden />
            <span className={s.connectorPill}>
              Then <span className={s.arrow}>→</span>
            </span>
          </div>
          <EngineCard badge="Then" badgeClass={`${s.badge} ${s.badgePurpleSolid}`} />
        </div>
      </Frame>

      <Frame
        tag="Variant C"
        title="Section heading + Engine credit note"
        notes="Adds a proper section heading + sub-line above the two cards. Adds a small green pill on the Engine card explicitly stating 'Includes your $10K Accelerator credit.' Most editorial, most explicit on the math."
      >
        <div className={s.sectionHead}>
          <span className={s.sectionHeadEyebrow}>How it works</span>
          <h2 className={s.sectionHeadTitle}>
            Two steps. <em>One discounted rate.</em>
          </h2>
          <p className={s.sectionHeadSub}>
            Start with the 3-Week Accelerator. Your $10K rolls into the discounted monthly rate when you sign your engagement.
          </p>
        </div>
        <div className={s.grid2}>
          <AcceleratorCard hideCreditCopy descMuted="The required first step before any monthly engagement." />
          <EngineCard showCreditNote />
        </div>
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

function AcceleratorCard({
  hideCreditCopy = false,
  descMuted,
  badge = "Step One",
  badgeClass,
}: {
  hideCreditCopy?: boolean;
  descMuted?: string;
  badge?: string;
  badgeClass?: string;
}) {
  return (
    <div className={s.card}>
      <span className={badgeClass ?? `${s.badge} ${s.badgeGreen}`}>{badge}</span>
      <h3 className={s.planName}>The 3-Week Accelerator</h3>
      <div className={s.price}>
        $10K<small>one-time</small>
      </div>
      <p className={s.desc}>
        Full funnel video strategy + 4 videos in 3 weeks.
        {!hideCreditCopy ? (
          <>
            {" "}
            <span className={s.descAccent}>
              We credit the $10K towards your monthly engagement.
            </span>
          </>
        ) : null}
      </p>
      {descMuted ? <p className={s.descMuted}>{descMuted}</p> : null}
      <a className={`${s.cta} ${s.ctaOutline}`}>Book a Discovery Call</a>
    </div>
  );
}

function EngineCard({
  showCreditNote = false,
  badge = "Step Two",
  badgeClass,
}: {
  showCreditNote?: boolean;
  badge?: string;
  badgeClass?: string;
}) {
  return (
    <div className={`${s.card} ${s.featured}`}>
      <span className={badgeClass ?? `${s.badge} ${s.badgePurple}`}>{badge}</span>
      <h3 className={s.planName}>The Video Growth Engine</h3>
      <div className={s.priceRow}>
        <span className={s.priceCrossed}>$20K</span>
        <span className={s.price}>
          $17K<small>/ month</small>
        </span>
      </div>
      {showCreditNote ? (
        <span className={s.creditNote}>Includes your $10K Accelerator credit</span>
      ) : null}
      <p className={s.desc}>
        Your dedicated pipeline video team. We shorten your sales cycle,
        generate qualified demos, and build the video engine your competitors
        wish they had.
      </p>

      <div className={s.tenureSlider}>
        <div className={s.tenureTrack}>
          <div className={s.tenureRail} aria-hidden />
          <div className={s.tenureFill} style={{ right: "100%" }} aria-hidden />
          <div className={s.tenureStops}>
            <div className={`${s.tenureStop} ${s.tenureStopActive}`}>
              <span className={s.tenureStopRate}>$17K</span>
              <span className={s.tenureStopDot} />
              <span className={s.tenureStopLabel}>3 months</span>
            </div>
            <div className={s.tenureStop}>
              <span className={s.tenureStopRate}>$15K</span>
              <span className={s.tenureStopDot} />
              <span className={s.tenureStopLabel}>6 months</span>
            </div>
          </div>
        </div>
      </div>

      <a className={`${s.cta} ${s.ctaFilled}`}>See if We&apos;re a Fit</a>
    </div>
  );
}
