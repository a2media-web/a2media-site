import s from "./PricingConnector.module.css";

export default function PricingConnectorMockup() {
  return (
    <main>
      <Frame
        tag="Variant A"
        title="Credit Token Flight"
        notes="A pill-shaped '+ $9.5K Credit' token flies from the Accelerator card across to the Engine card on a loop. Most literal: the credit-back story is told visually, no copy required. Best for first-time visitors who haven't read the fine print yet."
      >
        <DuoCards>
          <div className={`${s.slot} ${s.aSlot}`}>
            <div className={s.aTrack} aria-hidden />
            <div className={s.aToken} aria-hidden>$9.5K Credit</div>
          </div>
        </DuoCards>
      </Frame>

      <Frame
        tag="Variant B"
        title="Particle Stream"
        notes="Glowing dots (neon → purple → lilac) drift continuously from left card to right card along a soft gradient rail. Most ambient and atmospheric — feels like value flowing between two halves of one engine. Best if you want it to read as alive without saying anything specific."
      >
        <DuoCards>
          <div className={`${s.slot} ${s.bSlot}`}>
            <div className={s.bRail} aria-hidden />
            <div className={`${s.bParticle} ${s.bP1}`} aria-hidden />
            <div className={`${s.bParticle} ${s.bP2}`} aria-hidden />
            <div className={`${s.bParticle} ${s.bP3}`} aria-hidden />
            <div className={`${s.bParticle} ${s.bP4}`} aria-hidden />
            <span className={s.bLabel}>Credit flows forward</span>
          </div>
        </DuoCards>
      </Frame>

      <Frame
        tag="Variant C"
        title="Synced Bridge"
        notes="Static bridge between cards with a centered pill ('Credit Applied → Engine'). Both ends pulse in sequence — green dot pulses, then purple dot pulses — like a handshake. Most architectural and brand-confident, doesn't rely on continuous motion to communicate."
      >
        <DuoCards>
          <div className={`${s.slot} ${s.cSlot}`}>
            <div className={s.cBridge}>
              <div className={s.cBridgeLine} aria-hidden>
                <span className={`${s.cDot} ${s.cDotLeft}`} />
                <span className={s.cBridgeCenter}>
                  <b>$9.5K</b> Applied
                </span>
                <span className={`${s.cDot} ${s.cDotRight}`} />
              </div>
              <span className={s.cBridgeFoot}>Step 1 → Step 2</span>
            </div>
          </div>
        </DuoCards>
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

function DuoCards({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.duo}>
      <div className={s.card}>
        <span className={`${s.badge} ${s.badgeGreen}`}>Step One</span>
        <h3 className={s.planName}>The 3-Week Accelerator</h3>
        <div>
          <span className={s.priceMain}>$9.5K</span>
          <span className={s.priceUnit}>one-time</span>
        </div>
        <p className={s.desc}>
          Full funnel video strategy + 3 videos in 3 weeks.{" "}
          <span className={s.accent}>
            We credit the $9.5K towards your 6-month engagement.
          </span>
        </p>
      </div>

      {children}

      <div className={`${s.card} ${s.cardFeatured}`}>
        <span className={`${s.badge} ${s.badgePurple}`}>Step Two</span>
        <h3 className={s.planName}>The Video Growth Engine</h3>
        <div>
          <span className={s.priceMain}>$20K</span>
          <span className={s.priceUnit}>/ month</span>
        </div>
        <div className={s.priceFoot}>
          <b>6-month engagement</b> · $120K total commitment
        </div>
        <p className={s.desc}>
          Your dedicated pipeline video team. We shorten your sales cycle and
          build the video engine your competitors wish they had.
        </p>
      </div>
    </div>
  );
}
