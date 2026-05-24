import styles from "./Footer.module.css";

const NAV_LINKS = [
  { label: "Pricing", href: "#Pricing" },
  { label: "Our Work", href: "#work" },
  { label: "Process", href: "#our-process" },
  { label: "Receipts", href: "#before-and-after" },
  { label: "FAQ", href: "#FAQ-Section" },
  { label: "Blog", href: "/blog" },
];

const CONNECT_LINKS = [
  { label: "Book a Call", href: "https://cal.com/a2media/meeting", external: true },
  { label: "Email Us", href: "mailto:ademola@a2media.ca", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/a2media", external: true },
  { label: "Our Portfolio", href: "#work", external: false },
];

export default function Footer() {
  return (
    <footer className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.logo}
              src="https://cdn.prod.website-files.com/64bfb907363259218e796320/69bb4fea9bbb31477a24dbde_A2%20Media-Logo%20Lockup-Black.png"
              alt="A2 Media"
            />
            <p className={styles.tagline}>Content That Converts.</p>
            <p className={styles.positioning}>
              Sales-driven video for B2B SaaS teams.
            </p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <p className={styles.colHeading}>Site</p>
              <ul className={styles.list}>
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={styles.link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <p className={styles.colHeading}>Connect</p>
              <ul className={styles.list}>
                {CONNECT_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className={styles.link}
                      {...(l.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} A2 Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
