import styles from "./TrailingTestimonial.module.css";

export default function TrailingTestimonial() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <svg
          className={styles.glyph}
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8h-2z" />
        </svg>

        <p className={styles.quote}>
          <strong>A2 Media is in a league of its own.</strong>{" "}
          I thought I was done with agencies but the team at A2 absolutely
          knocked our launch videos out of the park. My calendar has been full
          for weeks. Can&apos;t recommend them enough.
        </p>

        <div className={styles.author}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.avatar}
            src="https://cdn.prod.website-files.com/64bfb907363259218e796320/67f808904a74c88bfd9282f7_1730194988558.jpeg"
            alt="Abtine Monavvari"
          />
          <div className={styles.meta}>
            <div className={styles.name}>Abtine Monavvari</div>
            <div className={styles.role}>CEO, Entries</div>
          </div>
        </div>
      </div>
    </section>
  );
}
