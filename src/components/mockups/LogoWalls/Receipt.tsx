"use client";

/* Receipt Wall — the client list rendered as a printed receipt. Plays off
   the existing PrintJobPopup aesthetic. Quirky, memorable, on-brand. */

import { LOGOS } from "./logos";
import styles from "./Receipt.module.css";

const RECEIPT_CLIENTS = [
  { name: "Shopify",        ref: "SHOP-001" },
  { name: "Okta",           ref: "OKTA-014" },
  { name: "Crossbeam",      ref: "XBM-007"  },
  { name: "ActiveCampaign", ref: "AC-022"   },
  { name: "Brainlabs",      ref: "BRL-019"  },
  { name: "BlueConic",      ref: "BC-012"   },
  { name: "Chili Piper",    ref: "CP-031"   },
  { name: "Close",          ref: "CLO-008"  },
  { name: "Slate",          ref: "SLA-026"  },
  { name: "Warmly",         ref: "WRM-016"  },
  { name: "Sendoso",        ref: "SND-009"  },
  { name: "Reveal",         ref: "RVL-011"  },
  { name: "Miovision",      ref: "MIO-035"  },
  { name: "Stran",          ref: "STR-038"  },
];

export default function ReceiptWall() {
  return (
    <section className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Receipts</p>
          <h2 className={styles.title}>
            We don&apos;t do <em>logo soup</em>.
          </h2>
          <p className={styles.sub}>
            Every client gets a paid receipt for every video. Here&apos;s a
            real one. The full list is longer than this page can hold.
          </p>
          <div className={styles.metric}>
            <strong>The Tally</strong>
            38 active accounts · 412 videos shipped this year ·
            $87M+ in attributed pipeline tracked across our clients.
          </div>
        </div>

        <div className={styles.receiptWrap}>
          <div className={styles.receipt}>
            <div className={styles.brand}>
              <h3>A2 MEDIA</h3>
              <p>Content That Converts</p>
            </div>

            <div className={styles.meta}>
              <span>Order #00482</span>
              <span>This Quarter</span>
            </div>

            <div className={styles.label}>Clients Served</div>
            {RECEIPT_CLIENTS.map((c) => (
              <div key={c.name} className={styles.line}>
                <span>{c.name}</span>
                <span>{c.ref}</span>
              </div>
            ))}

            <div className={styles.total}>
              <span className={styles.totalLabel}>Pipeline Lifted</span>
              <span className={styles.totalNum}>+$87M</span>
            </div>

            <p className={styles.footer}>Thank you for shipping with us</p>
          </div>
        </div>
      </div>
    </section>
  );
}
