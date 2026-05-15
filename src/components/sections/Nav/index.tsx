"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const A2_LOGO = "/a2-logo-mark.png";

const LINKS = [
  { href: "#our-process", label: "Our Process" },
  { href: "#Studies", label: "Case Studies" },
  { href: "#Pricing", label: "Pricing" },
  { href: "https://fast.wistia.com/embed/channel/fj6gynv9qi", label: "Our Portfolio", external: true },
  { href: "https://9yqatx.short.gy/vpYuEX", label: "The Vault", external: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.shell}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="A2 Media home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={A2_LOGO} alt="A2 Media" />
        </Link>

        <nav className={styles.menu}>
          {LINKS.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ) : (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ),
          )}
        </nav>

        <a href="#Pricing" className={styles.cta}>
          See if We&apos;re a Fit <span aria-hidden>→</span>
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" />
            )}
          </svg>
        </button>
      </div>

      <nav className={`${styles.overlay} ${open ? styles.open : ""}`}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noreferrer" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href="#Pricing" onClick={() => setOpen(false)}>
          See if We&apos;re a Fit →
        </a>
      </nav>
    </header>
  );
}
