import styles from "./Wishly.module.css";

/**
 * Review-only route for choosing Wishly's height in the Hero trust row.
 * Background + trustRow rules mirror Hero exactly, so this reads true.
 */

const WISHLY_RATIO = 335 / 97; // trimmed asset, 3.45:1

const WF = "https://cdn.prod.website-files.com/64bfb907363259218e796320";

const TRUST_LOGOS = [
  { src: `${WF}/65e9e913df3011054a62442e_Okta_Logo_White_Medium.png`, alt: "Okta" },
  { src: `${WF}/64cc83f851512b1224dc1573_SHOP_BIG.D-bc80c1f3.png`, alt: "Shopify", className: "shopify" },
  { src: `${WF}/67f1d717fe36ab2b51b4d2a4_chili%20piper.png`, alt: "Chili Piper", className: "chili" },
  { src: `${WF}/66c5f4f2fcc977d035928abc_CB.svg`, alt: "Crossbeam" },
  { src: "/logos/Slate.png", alt: "Slate", className: "slate" },
];

// Hero's base img height is 22px. Wishly is a stacked lockup, so it needs more
// box height to land its wordmark at the same optical weight as a plain wordmark.
// max-width:140px clamps anything above ~40px tall, so 38 is the practical ceiling.
const VARIANTS = [
  { h: 28, note: "Conservative. Reads as a peer, wordmark slightly light." },
  { h: 32, note: "Optical match. Wordmark lines up with Okta and Shopify." },
  { h: 38, note: "Assertive. Near the 40px max-width ceiling." },
];

export default function WishlyHeroMockup() {
  return (
    <main className={styles.section}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/videos/hero-bg.mp4"
        aria-hidden
      />
      <div className={styles.veil} aria-hidden />

      <div className={styles.body}>
        <h1 className={styles.pageTitle}>Wishly Group — Hero trust row sizing</h1>
        <p className={styles.pageNote}>
          Desktop only. Real hero video and veil behind it, trustRow rules copied verbatim from
          Hero. Dashed outline marks the new logo. Wishly is set to hide on mobile via the same
          hideOnMobile pattern Crossbeam already uses.
        </p>

        {VARIANTS.map((v) => {
          const w = Math.round(v.h * WISHLY_RATIO);
          return (
            <section key={v.h} className={styles.variant}>
              <div className={styles.variantLabel}>
                <span className={styles.sizeTag}>height: {v.h}px</span>
                <span className={styles.sizeMeta}>
                  renders {w} × {v.h} px · {v.note}
                </span>
              </div>

              <p className={styles.trustLabel}>Trusted by</p>

              <div className={styles.trustRow}>
                {TRUST_LOGOS.map((l) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    className={l.className ? styles[l.className] : undefined}
                  />
                ))}

                <span className={styles.subject}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/wishly.png"
                    alt="Wishly Group"
                    style={{ height: `${v.h}px` }}
                  />
                </span>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
