"use client";

import { useEffect, useRef, useState } from "react";
import baseStyles from "../sections/Receipts/Receipts.module.css";
import styles from "./ReceiptsPrinterDeco.module.css";

/**
 * Five variations of the live printer with different side-decoration
 * treatments to fill the desktop negative space.
 *
 * Each variant re-uses the live Receipts CSS module (baseStyles) for the
 * printer + paper, then layers a deco module per direction. The printer
 * markup, animation, and content stay identical across all five so the
 * only thing changing visually is the surrounding context.
 */

type LineKind = "head" | "div" | "col" | "line" | "total" | "foot";

const LINES: { kind: LineKind; text: string }[] = [
  { kind: "head",  text: "A2 MEDIA · CONTENT THAT CONVERTS" },
  { kind: "div",   text: "" },
  { kind: "col",   text: "ITEM                          VALUE" },
  { kind: "div",   text: "" },
  { kind: "line",  text: "B2B SaaS brands served         30+" },
  { kind: "line",  text: "Avg. client tenure             18mo" },
  { kind: "line",  text: "Faster close rates             35%" },
  { kind: "line",  text: "Avg. turnaround                72hr" },
  { kind: "line",  text: "Videos delivered, total        600+" },
  { kind: "line",  text: "Client rating                  4.9/5" },
  { kind: "div",   text: "" },
  { kind: "total", text: "TOTAL: OUR VIDEOS PRINT REVENUE" },
  { kind: "div",   text: "" },
  { kind: "foot",  text: "*** THANK YOU FOR YOUR INTEREST ***" },
];

function PrinterCard({ subtitle }: { subtitle: string }) {
  const machineRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const [printed, setPrinted] = useState(0);
  const [whirring, setWhirring] = useState(false);

  useEffect(() => {
    const target = machineRef.current;
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || firedRef.current) continue;
          firedRef.current = true;
          io.disconnect();
          setWhirring(true);
          let i = 0;
          const id = setInterval(() => {
            i++;
            setPrinted(i);
            if (i >= LINES.length) {
              clearInterval(id);
              setTimeout(() => setWhirring(false), 600);
            }
          }, 220);
        }
      },
      { threshold: 0.45 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div className={baseStyles.machine} ref={machineRef}>
      <div className={`${baseStyles.printer} ${whirring ? baseStyles.whir : ""}`}>
        <div className={baseStyles.printerBody}>
          <div className={baseStyles.indicator} />
          <span className={baseStyles.printerLabel}>A2-RCPT &middot; 80MM</span>
          <span className={baseStyles.feedDot} />
          <span className={baseStyles.feedDot} />
        </div>
        <div className={baseStyles.printerSlot} />
        <div className={baseStyles.printerTeeth}>
          {Array.from({ length: 32 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <div className={baseStyles.paper}>
        <div className={baseStyles.paperRoll}>
          {LINES.slice(0, printed).map((l, i) => (
            <p key={i} className={`${baseStyles.row} ${baseStyles[l.kind]}`}>
              {l.kind === "div" ? (
                <span className={baseStyles.dashed}>·······································</span>
              ) : (
                l.text
              )}
            </p>
          ))}
        </div>
      </div>
      {/* invisible aria for accessibility while subtitle context is in deco */}
      <span hidden>{subtitle}</span>
    </div>
  );
}

function Frame({
  className,
  children,
  title,
}: {
  className: string;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className={`${baseStyles.section} ${className}`}>
      <div className={baseStyles.inner}>
        <p className={baseStyles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={baseStyles.heading}>
          The <span className={baseStyles.italic}>receipts</span>.
        </h2>
        <p className={baseStyles.sub}>Helping B2B SaaS companies since 2023.</p>
        {children}
        <span hidden>{title}</span>
      </div>
    </section>
  );
}

/* ────────── Option A: Approved stamp + receipt-no watermark ────────── */
export function ReceiptsDecoA() {
  return (
    <Frame className={styles.frameA} title="Approved stamp + receipt-no.">
      <div className={styles.layoutCentered}>
        <span className={`${styles.watermark} ${styles.watermarkLeft}`}>
          RECEIPT No. 0042
          <span className={styles.watermarkBy}>ISSUED · A2 MEDIA</span>
        </span>
        <PrinterCard subtitle="A" />
        <span className={`${styles.stamp} ${styles.stampRight}`}>
          <span className={styles.stampInner}>
            <span className={styles.stampMain}>APPROVED</span>
            <span className={styles.stampSub}>FOR PIPELINE</span>
            <span className={styles.stampDate}>2026</span>
          </span>
        </span>
      </div>
    </Frame>
  );
}

/* ────────── Option B: Side-by-side brand mark + tagline column ────────── */
export function ReceiptsDecoB() {
  return (
    <Frame className={styles.frameB} title="Brand mark column">
      <div className={styles.layoutTwoCol}>
        <aside className={styles.brandCol}>
          <span className={styles.brandStamp}>A2</span>
          <p className={styles.brandLine}>The receipt every CMO wishes they could show their CFO.</p>
          <ul className={styles.brandList}>
            <li>End-to-end video engine</li>
            <li>Strategy, scripts, editing</li>
            <li>Pipeline-grade attribution</li>
          </ul>
        </aside>
        <PrinterCard subtitle="B" />
      </div>
    </Frame>
  );
}

/* ────────── Option C: Stack of receipts behind ────────── */
export function ReceiptsDecoC() {
  return (
    <Frame className={styles.frameC} title="Stack of receipts behind">
      <div className={styles.layoutStack}>
        <span className={`${styles.ghostReceipt} ${styles.ghostA}`} aria-hidden />
        <span className={`${styles.ghostReceipt} ${styles.ghostB}`} aria-hidden />
        <PrinterCard subtitle="C" />
      </div>
    </Frame>
  );
}

/* ────────── Option D: Floating sticky-note callouts ────────── */
export function ReceiptsDecoD() {
  return (
    <Frame className={styles.frameD} title="Sticky note callouts">
      <div className={styles.layoutCentered}>
        <span className={`${styles.sticky} ${styles.stickyA}`}>
          <span className={styles.stickyTape} />
          <span className={styles.stickyText}>$600K closed-won for <b>Reveal</b></span>
        </span>
        <span className={`${styles.sticky} ${styles.stickyB}`}>
          <span className={styles.stickyTape} />
          <span className={styles.stickyText}>22K subs in 12mo for <b>Auth0</b></span>
        </span>
        <span className={`${styles.sticky} ${styles.stickyC}`}>
          <span className={styles.stickyTape} />
          <span className={styles.stickyText}>Acquired in 8mo: <b>PartnerHacker</b></span>
        </span>
        <PrinterCard subtitle="D" />
      </div>
    </Frame>
  );
}

/* ────────── Option E: Clean side rails with vertical labels ────────── */
export function ReceiptsDecoE() {
  return (
    <Frame className={styles.frameE} title="Vertical side rails">
      <div className={styles.layoutCentered}>
        <span className={`${styles.rail} ${styles.railLeft}`}>
          <span>A2 MEDIA</span>
          <span>&middot;</span>
          <span>RECEIPT NO. 0042</span>
          <span>&middot;</span>
          <span>2023 — PRESENT</span>
        </span>
        <PrinterCard subtitle="E" />
        <span className={`${styles.rail} ${styles.railRight}`}>
          <span>CONTENT THAT CONVERTS</span>
          <span>&middot;</span>
          <span>VERIFIED OUTCOMES</span>
          <span>&middot;</span>
          <span>a2media.ca</span>
        </span>
      </div>
    </Frame>
  );
}
