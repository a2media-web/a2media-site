"use client";

/* Mockup: /mockups/pricing-options
   4 treatments of the NEW money-model pricing block (post-Hormozi/Brunson).
   Reuses the live Pricing.module.css so the card look matches production.
   New copy: $8K Jumpstart reframed as 100%-credited (rollover), the guarantee
   surfaced, "Apply to Work With Us" prize-frame CTA, optional $2K audit rung,
   and 12-month-waives-setup continuity mechanic. Stacked so each can be
   screenshotted by its band id. No live files touched. */

import React from "react";
import styles from "../../../components/sections/Pricing/Pricing.module.css";

const APPLY = "https://9yqatx.short.gy/vQTine";
const FIT = "https://9yqatx.short.gy/ZJGUin";

function Band({
  id,
  label,
  blurb,
  children,
}: {
  id: string;
  label: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "var(--a2-night-core)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 0" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--a2-electric-neon)",
            border: "1px solid rgba(102,247,142,0.35)",
            borderRadius: 999,
            padding: "6px 14px",
            marginBottom: 12,
          }}
        >
          {label}
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, maxWidth: 760, margin: "0 0 8px", lineHeight: 1.5 }}>
          {blurb}
        </p>
      </div>
      {children}
    </section>
  );
}

export default function PricingOptions() {
  return (
    <main style={{ background: "var(--a2-night-core)", minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 8px" }}>
        <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 700, margin: 0 }}>
          Pricing block — 4 options
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8 }}>
          Same premium prices in all four. The difference is how the new offer structure is presented.
        </p>
      </div>

      {/* ============ OPTION 1 — THE CREDIT RECEIPT ============ */}
      <Band
        id="v1"
        label="Option 1 · The Credit Receipt"
        blurb="Reframes the $8K Jumpstart as the first two weeks of the engine, not a separate bet. The receipt makes the credit tangible: you pay $8K, it all comes back as engine credit, net cost to start is $0."
      >
        <div className={styles.section} style={{ paddingTop: 8 }}>
          <div className={styles.inner}>
            <h2 className={styles.heading}>
              One Path. <em>Two Steps.</em>
            </h2>
            <p className={styles.intro}>
              We take on a limited number of B2B SaaS teams each quarter.
              <br />
              <span className={styles.introAccent}>Every dollar of the Jumpstart credits toward your engine.</span>
            </p>

            <div className={styles.grid}>
              <div className={`${styles.card} ${styles.cardWhite}`}>
                <span className={`${styles.badge} ${styles.badgeBright}`}>Start Here</span>
                <h2 className={styles.planName}>The 2-Week Jumpstart</h2>
                <div className={styles.price}>$8K<small>one-time</small></div>

                <div className={styles.receipt}>
                  <div className={styles.receiptHead}>
                    <span>Your first 2 weeks</span>
                    <span>A2 MEDIA</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span>2-Week Jumpstart</span>
                    <b>$8,000</b>
                  </div>
                  <div className={styles.receiptRow}>
                    <span>Credited to your engine</span>
                    <span className={styles.creditAmt}>−$8,000</span>
                  </div>
                  <div className={styles.receiptDivider} />
                  <div className={styles.receiptTotal}>
                    <span className={styles.receiptTotalLabel}>Net to start engine</span>
                    <span className={styles.receiptTotalValue}>$0</span>
                  </div>
                </div>

                <p className={styles.desc}>
                  6-month video strategy + your first 3 videos. This isn&apos;t a bet on us. It&apos;s the first two weeks of the engine.
                </p>
                <a href={APPLY} target="_blank" rel="noreferrer" className={`${styles.cta} ${styles.ctaOutline}`}>
                  Apply to Work With Us
                </a>
              </div>

              <div className={`${styles.card} ${styles.featured}`}>
                <span className={`${styles.badge} ${styles.badgePurpleSolid}`}>Then</span>
                <h2 className={styles.planName}>The Video Growth Engine</h2>
                <div className={styles.price}>$15K — $25K<small>/ month</small></div>
                <p className={styles.desc}>
                  10 to 12 videos a month, 72-hour turnaround, a dedicated team that already knows your buyer.
                </p>
                <span className={styles.creditNote}>✓ Commit to 12 months and we waive the $8K setup</span>
                <a href={FIT} target="_blank" rel="noreferrer" className={`${styles.cta} ${styles.ctaFilled}`} style={{ marginTop: 18 }}>
                  See if We&apos;re a Fit
                </a>
              </div>
            </div>
          </div>
        </div>
      </Band>

      {/* ============ OPTION 2 — THREE-STEP LADDER (adds $2K audit) ============ */}
      <Band
        id="v2"
        label="Option 2 · Three-Step Ladder (adds the $2K Audit)"
        blurb="Inserts a low-friction $2K Buyer-Psychology Audit below the Jumpstart. The real cliff-fix: turns 'not ready for $8K' into a yes today. Every rung credits 100% into the next, so nothing is wasted moving up."
      >
        <div className={styles.section} style={{ paddingTop: 8 }}>
          <div className={styles.inner}>
            <h2 className={styles.heading}>
              One Path. <em>Three Steps.</em>
            </h2>
            <p className={styles.intro}>
              Start as small as you want. <span className={styles.introAccent}>Every step credits 100% toward the next.</span>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.25fr", gap: 20, alignItems: "start" }}>
              {/* Audit */}
              <div className={`${styles.card} ${styles.cardWhite}`}>
                <span className={`${styles.badge} ${styles.badgeBright}`}>Step 1</span>
                <h2 className={styles.planName}>Buyer-Psychology Audit</h2>
                <div className={styles.price}>$2K<small>one-time</small></div>
                <p className={styles.desc}>
                  A teardown of your current content against how your buyers actually decide. See how we think before you commit.
                </p>
                <span className={styles.creditNote}>✓ 100% credited upward</span>
                <a href={APPLY} target="_blank" rel="noreferrer" className={`${styles.cta} ${styles.ctaOutline}`} style={{ marginTop: 18 }}>
                  Apply
                </a>
              </div>

              {/* Jumpstart */}
              <div className={styles.card}>
                <span className={`${styles.badge} ${styles.badgePurple}`}>Step 2</span>
                <h2 className={styles.planName}>The 2-Week Jumpstart</h2>
                <div className={styles.price}>$8K<small>one-time</small></div>
                <p className={styles.desc}>
                  6-month video strategy + your first 3 videos. The full roadmap and proof of the engine.
                </p>
                <span className={styles.creditNote}>✓ 100% credited toward your retainer</span>
                <a href={APPLY} target="_blank" rel="noreferrer" className={`${styles.cta} ${styles.ctaOutline}`} style={{ marginTop: 18 }}>
                  Apply
                </a>
              </div>

              {/* Engine */}
              <div className={`${styles.card} ${styles.featured}`}>
                <span className={`${styles.badge} ${styles.badgePurpleSolid}`}>Step 3</span>
                <h2 className={styles.planName}>The Video Growth Engine</h2>
                <div className={styles.price}>$15K—$25K<small>/ mo</small></div>
                <p className={styles.desc}>
                  10 to 12 videos a month, 72-hour turnaround, dedicated team. Scripts engineered to close.
                </p>
                <span className={styles.creditNote}>✓ 12-month commitment waives the $8K setup</span>
                <a href={FIT} target="_blank" rel="noreferrer" className={`${styles.cta} ${styles.ctaFilled}`} style={{ marginTop: 18 }}>
                  See if We&apos;re a Fit
                </a>
              </div>
            </div>
          </div>
        </div>
      </Band>

      {/* ============ OPTION 3 — ANNUAL TOGGLE (waive setup) ============ */}
      <Band
        id="v3"
        label="Option 3 · Annual Commitment (waives the setup)"
        blurb="Leans on the continuity mechanic: show the 12-month state where the $8K setup is struck through and waived. Drops churn (Hormozi's data: annual billing cuts monthly churn from ~10% to ~2%) and makes the long commitment the obvious-value choice."
      >
        <div className={styles.section} style={{ paddingTop: 8 }}>
          <div className={styles.inner}>
            <h2 className={styles.heading}>
              Commit for the year. <em>We waive the setup.</em>
            </h2>
            <p className={styles.intro}>
              <span className={styles.introAccent}>12-month teams skip the $8,000 Jumpstart fee entirely.</span>
            </p>

            <div className={styles.grid}>
              <div className={`${styles.card} ${styles.cardWhite}`}>
                <span className={`${styles.badge} ${styles.badgeBright}`}>Start Here</span>
                <h2 className={styles.planName}>The 2-Week Jumpstart</h2>
                <div className={styles.priceRow}>
                  <span className={styles.priceCrossed}>$8,000</span>
                  <span className={styles.price} style={{ marginBottom: 0 }}>$0<small>on a 12-mo term</small></span>
                </div>
                <p className={styles.desc} style={{ marginTop: 16 }}>
                  6-month video strategy + your first 3 videos. Waived when you commit to the engine for a year.
                </p>
                <span className={styles.creditNote}>✓ Or pay $8K and run month-to-month</span>
                <a href={APPLY} target="_blank" rel="noreferrer" className={`${styles.cta} ${styles.ctaOutline}`} style={{ marginTop: 18 }}>
                  Apply to Work With Us
                </a>
              </div>

              <div className={`${styles.card} ${styles.featured}`}>
                <span className={`${styles.badge} ${styles.badgePurpleSolid}`}>The Engine</span>
                <h2 className={styles.planName}>The Video Growth Engine</h2>
                <div className={styles.price}>$15K — $25K<small>/ month</small></div>

                <div className={styles.tenureSlider}>
                  <div className={styles.tenureStops} style={{ position: "relative", padding: "0 8px" }}>
                    <div className={styles.tenureStop}>
                      <span className={styles.tenureStopRate}>$25K</span>
                      <span className={styles.tenureStopDot} />
                      <span className={styles.tenureStopLabel}>3 mo</span>
                    </div>
                    <div className={styles.tenureStop}>
                      <span className={styles.tenureStopRate}>$20K</span>
                      <span className={styles.tenureStopDot} />
                      <span className={styles.tenureStopLabel}>6 mo</span>
                    </div>
                    <div className={`${styles.tenureStop} ${styles.tenureStopActive}`}>
                      <span className={styles.tenureStopRate}>$15K</span>
                      <span className={styles.tenureStopDot} />
                      <span className={styles.tenureStopLabel}>12 mo · setup waived</span>
                    </div>
                  </div>
                </div>

                <p className={styles.desc}>Longer term, lower monthly rate, and the Jumpstart fee disappears.</p>
                <a href={FIT} target="_blank" rel="noreferrer" className={`${styles.cta} ${styles.ctaFilled}`}>
                  See if We&apos;re a Fit
                </a>
              </div>
            </div>
          </div>
        </div>
      </Band>

      {/* ============ OPTION 4 — APPLICATION-FIRST / PRIZE FRAME ============ */}
      <Band
        id="v4"
        label="Option 4 · Application-First (Prize Frame)"
        blurb="Leads with selectivity and the guarantee, Klaff-style. The buyer qualifies to you. The guarantee banner sits up top as the risk-reversal, the two steps sit underneath, and the only CTA is to apply. Most premium-feeling, lowest perceived sales pressure."
      >
        <div className={styles.section} style={{ paddingTop: 8 }}>
          <div className={styles.inner}>
            <h2 className={styles.heading}>
              We only win <em>when you do.</em>
            </h2>
            <p className={styles.intro}>
              We take on a limited number of B2B SaaS teams each quarter, because the guarantee means your result is on us.
            </p>

            {/* Guarantee banner */}
            <div
              style={{
                border: "1px solid rgba(102,247,142,0.4)",
                background: "linear-gradient(180deg, rgba(102,247,142,0.08), rgba(102,247,142,0.02))",
                borderRadius: 18,
                padding: "20px 24px",
                margin: "0 0 28px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "var(--a2-electric-neon)", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 12, marginBottom: 8 }}>
                The A2 Guarantee
              </div>
              <p style={{ color: "#fff", fontSize: 17, lineHeight: 1.5, margin: 0, maxWidth: 720, marginInline: "auto" }}>
                If we don&apos;t hit the goal we agreed on by the end of your contract, we keep working for free until we do. As long as you record and approve on schedule, the result is on us.
              </p>
            </div>

            <div className={styles.grid}>
              <div className={`${styles.card} ${styles.cardWhite}`}>
                <span className={`${styles.badge} ${styles.badgeBright}`}>Step 1</span>
                <h2 className={styles.planName}>The 2-Week Jumpstart</h2>
                <div className={styles.price}>$8K<small>one-time</small></div>
                <p className={styles.desc}>6-month video strategy + your first 3 videos. Credited 100% toward your engine.</p>
              </div>
              <div className={`${styles.card} ${styles.featured}`}>
                <span className={`${styles.badge} ${styles.badgePurpleSolid}`}>Step 2</span>
                <h2 className={styles.planName}>The Video Growth Engine</h2>
                <div className={styles.price}>$15K — $25K<small>/ month</small></div>
                <p className={styles.desc}>10 to 12 videos a month, 72-hour turnaround, dedicated team. 12-month term waives the setup.</p>
              </div>
            </div>

            <a
              href={APPLY}
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.ctaFilled}`}
              style={{ maxWidth: 420, margin: "28px auto 0" }}
            >
              Apply to Work With Us
            </a>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.55)", fontStyle: "italic", fontSize: 13.5, marginTop: 12 }}>
              If it&apos;s a fit, we&apos;ll send you a link to book a call. If it&apos;s not, we&apos;ll tell you straight.
            </p>
          </div>
        </div>
      </Band>
    </main>
  );
}
