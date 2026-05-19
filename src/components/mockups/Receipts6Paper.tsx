"use client";

import styles from "./Receipts6Paper.module.css";

/**
 * Option 6: Classic paper receipt.
 *
 * The section is rendered as a printed thermal receipt. Monospace,
 * dashed dividers, line items, total band, barcode footer. Plays on the
 * wordmark ("The Receipts") with a literal visual.
 *
 * Uses ONLY the 6 existing stats — no client-named outcomes mixed in.
 */

const LINE_ITEMS = [
  { sku: "BRD-25", desc: "B2B SaaS brands served",      value: "25+" },
  { sku: "TEN-18", desc: "Avg. client tenure",           value: "18 mo" },
  { sku: "CLS-35", desc: "Faster close rates",           value: "35%" },
  { sku: "TRN-72", desc: "Avg. turnaround times",        value: "72 hr" },
  { sku: "DLV-VID", desc: "Videos delivered, total",    value: "550+" },
  { sku: "RTG-49", desc: "Client rating",                value: "4.9 / 5" },
];

export default function Receipts6Paper() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>Itemized.</p>
      </div>

      <div className={styles.receiptWrap}>
        <div className={styles.receipt}>
          <div className={styles.receiptHead}>
            <p className={styles.brand}>A2 MEDIA</p>
            <p className={styles.tagline}>CONTENT THAT CONVERTS</p>
            <p className={styles.meta}>
              a2media.ca &middot; ORDER #{new Date().getFullYear()}
            </p>
            <p className={styles.meta}>
              {new Date().toLocaleDateString("en-US", { dateStyle: "long" }).toUpperCase()}
            </p>
          </div>

          <div className={styles.dashed} />

          <div className={styles.cols}>
            <span>SKU</span>
            <span>ITEM</span>
            <span className={styles.right}>QTY</span>
          </div>

          <div className={styles.dashed} />

          <ul className={styles.lines}>
            {LINE_ITEMS.map((item) => (
              <li key={item.sku} className={styles.line}>
                <span className={styles.sku}>{item.sku}</span>
                <span className={styles.desc}>{item.desc}</span>
                <span className={`${styles.value} ${styles.right}`}>{item.value}</span>
              </li>
            ))}
          </ul>

          <div className={styles.dashed} />

          <div className={styles.total}>
            <span>SUBTOTAL</span>
            <span className={styles.right}>6 RECEIPTS</span>
          </div>
          <div className={styles.total}>
            <span>STATUS</span>
            <span className={styles.right}>PAID IN PIPELINE</span>
          </div>

          <div className={styles.dashed} />

          <p className={styles.footnote}>
            *** THANK YOU FOR YOUR INTEREST ***<br />
            BOOK A CALL AT cal.com/a2media/meeting
          </p>
          <div className={styles.barcode}>
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <p className={styles.barcodeId}>A2M-{new Date().getFullYear()}-RCPT</p>
        </div>
      </div>
    </section>
  );
}
