import s from "./GuaranteeDisplay.module.css";

export default function GuaranteeDisplayMockup() {
  return (
    <main>
      <Frame
        tag="Option 1"
        title="Magazine Pull-Quote"
        notes="No box. No border. Massive italic Awesome Serif type — the guarantee reads like a quote pulled from an interview. Most editorial, most premium, most A2-brand-voice."
      >
        <div className={s.pullQuote}>
          <span className={s.pullQuoteMark}>&ldquo;</span>
          <p className={s.pullQuoteText}>
            If we don&apos;t hit your goal by contract end, we{" "}
            <em>keep working for you free</em> until we do.
          </p>
          <div className={s.pullQuoteAttr}>The A2 Guarantee</div>
        </div>
      </Frame>

      <Frame
        tag="Option 2"
        title="Signed Promise"
        notes="Frames the guarantee as a personal note from Ademola, with a handwritten signature at the bottom. Says 'a person is on the hook for this, not a company.' Owner-backed credibility."
      >
        <div className={s.signedWrap}>
          <div className={s.signedLabel}>A personal guarantee</div>
          <p className={s.signedText}>
            If we don&apos;t hit your goal by contract end, my team keeps working for you for free until we do. <b>You won&apos;t need to ask twice.</b>
          </p>
          <div className={s.signedSigBlock}>
            <span className={s.signedSig}>Ademola</span>
            <div className={s.signedSigMeta}>
              <b>Ademola Adelakun</b>
              Founder, A2 Media
            </div>
          </div>
        </div>
      </Frame>

      <Frame
        tag="Option 3"
        title="Official Seal"
        notes="A round notary-style seal on the left with arched text, paired with the guarantee copy on the right. Feels like an official, binding promise — the kind of mark you'd see on a legal document or certified product."
      >
        <div className={s.sealStage}>
          <div className={s.seal}>
            <svg className={s.sealSvg} viewBox="0 0 220 220">
              <defs>
                <path
                  id="topArc"
                  d="M 30,110 A 80,80 0 0 1 190,110"
                  fill="none"
                />
                <path
                  id="bottomArc"
                  d="M 30,110 A 80,80 0 0 0 190,110"
                  fill="none"
                />
              </defs>
              <circle
                cx="110"
                cy="110"
                r="100"
                fill="none"
                stroke="rgba(90, 51, 255, 0.45)"
                strokeWidth="2"
              />
              <circle
                cx="110"
                cy="110"
                r="86"
                fill="none"
                stroke="rgba(255, 255, 255, 0.10)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <text
                fill="rgba(255, 255, 255, 0.85)"
                fontSize="11"
                fontWeight="800"
                letterSpacing="3"
              >
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                  OFFICIAL · A2 GUARANTEE
                </textPath>
              </text>
              <text
                fill="rgba(255, 255, 255, 0.55)"
                fontSize="9"
                fontWeight="700"
                letterSpacing="3"
              >
                <textPath
                  href="#bottomArc"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  · RESULTS GUARANTEED ·
                </textPath>
              </text>
            </svg>
            <div className={s.sealCenter}>
              <div className={s.sealShield}>🛡</div>
              <div className={s.sealCenterText}>
                We work
                <br />
                till you win
              </div>
            </div>
          </div>
          <div className={s.sealPromise}>
            <div className={s.sealPromiseLabel}>The A2 Guarantee</div>
            <p className={s.sealPromiseText}>
              If we don&apos;t hit your agreed goal by contract end, we keep
              working for you for free until we do.
            </p>
          </div>
        </div>
      </Frame>

      <Frame
        tag="Option 4"
        title="Marquee Ticker"
        notes="Full-width scrolling band. The guarantee repeats horizontally with separator stars. Reads like a movie marquee or stadium ribbon — bold, confident, hard to miss. Pairs visually with the logo strip you have on the page."
      >
        <div className={s.tickerOuter}>
          <div className={s.tickerTrack}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={s.tickerItem}>
                <span className={s.tickerStar}>★</span>
                <span>
                  We work for <em>free</em> until you win
                </span>
                <span className={s.tickerStar}>★</span>
                <span>
                  The <em>A2 Guarantee</em>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Frame>

      <Frame
        tag="Option 5"
        title="Stamp on the Engine card"
        notes="Removes the dedicated Guarantee section entirely. A tilted 'GUARANTEED' stamp graphic lives on the Engine pricing card. The guarantee becomes a property of the offer, not a standalone moment. Most architectural — fewer sections, stronger payoff."
      >
        <div className={s.stampStage}>
          <div className={s.stampCard}>
            <span className={s.stampBadge}>Then</span>
            <h3 className={s.stampName}>The Video Growth Engine</h3>
            <div className={s.stampPrice}>
              $14K — $20K<small>/ month</small>
            </div>
            <p className={s.stampDesc}>
              Pick 3 or 6 months. Longer = Lower monthly rate.
            </p>

            <div className={s.stampOverlay} aria-hidden>
              <svg className={s.stampOverlaySvg} viewBox="0 0 156 156">
                <circle
                  cx="78"
                  cy="78"
                  r="72"
                  fill="rgba(13, 5, 54, 0.95)"
                  stroke="rgba(102, 247, 142, 0.85)"
                  strokeWidth="2"
                />
                <circle
                  cx="78"
                  cy="78"
                  r="64"
                  fill="none"
                  stroke="rgba(102, 247, 142, 0.30)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              </svg>
              <div className={s.stampOverlayLabel}>
                <span className="top">A2</span>
                <span className="mid">GUARANTEED</span>
                <span className="bot">or we work free</span>
              </div>
            </div>
          </div>
        </div>
        <p className={s.stampFootnote}>
          <b>The A2 Guarantee:</b> if we don&apos;t hit your agreed goal by
          contract end, we keep working for you for free until we do.
        </p>
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
