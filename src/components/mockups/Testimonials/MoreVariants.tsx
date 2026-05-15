"use client";

import { useState } from "react";
import VideoStage from "./VideoStage";
import SenjaEmbed from "./SenjaEmbed";
import { TESTIMONIAL_VIDEO_ID, ambientSrc } from "./data";
import s from "./Variants.module.css";

/* F — Curtain Hero: full-width video banner top, Senja below */
export function CurtainHero() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.eyebrow}>Don&apos;t take our word for it</p>
          <h2 className={s.title}>
            Hear it <em>from the teams</em> we&apos;ve built for.
          </h2>
        </div>
        <div className={s.curtainStage}>
          <VideoStage label="Watch the stories" />
        </div>
        <SenjaEmbed />
      </div>
    </section>
  );
}

/* G — Senja-Led: wall first, then video CTA reveal at bottom */
export function SenjaLed() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.eyebrow}>Reviews from real clients</p>
          <h2 className={s.title}>
            They keep <em>showing up</em> to say it.
          </h2>
        </div>
        <div className={s.senjaLed}>
          <div className={s.embed}>
            <SenjaEmbed />
          </div>
          <div className={s.head} style={{ marginBottom: 24 }}>
            <p className={s.eyebrow}>Want to hear it on video?</p>
            <h3 className={s.title} style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
              Click the reel <em>below</em>.
            </h3>
          </div>
          <div className={s.cta}>
            <VideoStage label="Watch the reel" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* H — Sticky Diptych: video sticky left, Senja scrolling right */
export function StickyDiptych() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.eyebrow}>Testimonials</p>
          <h2 className={s.title}>
            Watch on the left. <em>Read on the right.</em>
          </h2>
        </div>
        <div className={s.diptych}>
          <div className={s.diptychLeft}>
            <VideoStage label="Click for audio" />
          </div>
          <div className={s.diptychRight}>
            <SenjaEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}

/* I — Tabbed Toggle */
export function TabbedToggle() {
  const [tab, setTab] = useState<"watch" | "read">("watch");
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.eyebrow}>Testimonials</p>
          <h2 className={s.title}>
            However you want it. <em>Watch or read.</em>
          </h2>
          <div className={s.tabs} style={{ marginTop: 24 }}>
            <button
              type="button"
              className={`${s.tab} ${tab === "watch" ? s.tabActive : ""}`}
              onClick={() => setTab("watch")}
            >
              Watch
            </button>
            <button
              type="button"
              className={`${s.tab} ${tab === "read" ? s.tabActive : ""}`}
              onClick={() => setTab("read")}
            >
              Read
            </button>
          </div>
        </div>
        <div className={s.panel}>
          {tab === "watch" ? (
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <VideoStage label="Click to watch with audio" />
            </div>
          ) : (
            <SenjaEmbed />
          )}
        </div>
      </div>
    </section>
  );
}

/* J — Editorial Pull-Quote with inline video */
export function EditorialPullQuote() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.pullQuote}>
          <div>
            <p className={s.pullQuoteText}>
              So good our clients <em>can&apos;t stop talking about us</em>.
            </p>
            <div className={s.pullQuoteAside}>
              Press play to hear it. Scroll to read it.
            </div>
          </div>
          <VideoStage label="Click to watch" smallButton />
        </div>
        <SenjaEmbed />
      </div>
    </section>
  );
}

/* K — Stat Banner Open */
export function StatBannerOpen() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.eyebrow}>Receipts, not promises</p>
          <h2 className={s.title}>
            The numbers, <em>then the voices</em>.
          </h2>
        </div>
        <div className={s.statBanner}>
          <div className={s.statCell}>
            <div className={s.statNum}>
              600<span>+</span>
            </div>
            <div className={s.statLabel}>Sales-driven videos</div>
          </div>
          <div className={s.statCell}>
            <div className={s.statNum}>
              35<span>%</span>
            </div>
            <div className={s.statLabel}>Faster close rates</div>
          </div>
          <div className={s.statCell}>
            <div className={s.statNum}>
              5<span>★</span>
            </div>
            <div className={s.statLabel}>On every review</div>
          </div>
        </div>
        <div className={s.statCenterStage}>
          <VideoStage label="Click to watch" />
        </div>
        <SenjaEmbed />
      </div>
    </section>
  );
}

/* L — Background Video Ambient */
export function BackgroundVideo() {
  return (
    <section className={s.bgVideoSection}>
      <div className={s.bgVideoFrame} aria-hidden>
        <iframe
          src={ambientSrc(TESTIMONIAL_VIDEO_ID)}
          title="Ambient testimonial video"
          allow="autoplay; fullscreen"
          tabIndex={-1}
        />
      </div>
      <div className={s.bgVignette} aria-hidden />
      <div className={s.bgInner}>
        <div className={s.head}>
          <p className={s.eyebrow}>Don&apos;t take our word for it</p>
          <h2 className={s.title}>
            <em>Listen</em> to what our clients say.
          </h2>
          <p className={s.sub}>
            Real marketing leaders. Real pipeline. Real reviews.
          </p>
        </div>
        <div className={s.glassCard}>
          <SenjaEmbed />
        </div>
        <div className={s.bgCta}>
          <ExpandToFullVideoButton />
        </div>
      </div>
    </section>
  );
}

function ExpandToFullVideoButton() {
  return (
    <div style={{ display: "inline-block" }}>
      <VideoStage
        label="Watch the full reel"
        smallButton
        ghost
        style={{ width: 320, borderRadius: 14 }}
      />
    </div>
  );
}

/* M — Sandwiched Senja: small video top + big Senja + small video bottom */
export function SandwichedSenja() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.eyebrow}>Testimonials</p>
          <h2 className={s.title}>
            Hear it. Read it. <em>Believe it.</em>
          </h2>
        </div>
        <div className={s.smallVideoTop}>
          <VideoStage label="Press play" smallButton />
        </div>
        <div className={s.connector}>The wall of love</div>
        <SenjaEmbed />
        <div className={s.smallVideoBottom}>
          <VideoStage label="Watch the full reel" smallButton />
        </div>
      </div>
    </section>
  );
}

/* N — Side Quote + Video */
export function SideQuoteVideo() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.head}>
          <p className={s.eyebrow}>What our clients say</p>
          <h2 className={s.title}>
            In their words. <em>On their terms.</em>
          </h2>
        </div>
        <div className={s.sideQuote}>
          <div>
            <p className={s.sideQuoteText}>
              &ldquo;Working with A2 changed how we approach video. They brought a
              level of strategy we hadn&apos;t seen anywhere.&rdquo;
            </p>
            <div className={s.sideQuoteAttr}>
              <strong>From the reel</strong>
              Hit play to hear the full conversation.
            </div>
          </div>
          <VideoStage label="Click to watch" />
        </div>
        <SenjaEmbed />
      </div>
    </section>
  );
}

/* O — Magazine Cover */
export function MagazineCover() {
  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden />
      <div className={s.inner}>
        <div className={s.coverWrap}>
          <div className={s.coverStage}>
            <VideoStage label="Click to watch with audio" />
          </div>
          <div className={s.coverOverlay}>
            <h2>
              The <em>proof</em> is in the playback.
            </h2>
            <p>
              Marketing leaders, founders, and operators on what working with A2
              Media actually looks like.
            </p>
          </div>
        </div>
        <SenjaEmbed />
      </div>
    </section>
  );
}
