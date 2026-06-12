"use client";

import styles from "./Disq4Letter.module.css";

/**
 * Variant 4: Letter from Ademola.
 *
 * Drops the agency mask entirely. First-person, intimate letter format
 * on a paper-ish background. Names the invisible work explicitly:
 * 9pm editing, exec no-shows, the "accidental video department" feeling.
 * This is the only variant that mentions Christina's pain by name
 * before asking her to disqualify. Builds trust before the filter.
 */

export default function Disq4Letter() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A note from Ademola</p>

        <div className={styles.letter}>
          <div className={styles.letterHead}>
            <div className={styles.avatar}>AA</div>
            <div className={styles.fromTo}>
              <span className={styles.from}>Ademola Adelakun</span>
              <span className={styles.fromSub}>Founder, A2 Media · written Tuesday morning</span>
            </div>
            <span className={styles.stamp}>Personal note</span>
          </div>

          <div className={styles.letterBody}>
            <p className={styles.greeting}>Hey,</p>

            <p>
              If you&apos;re reading this far, I&apos;m guessing two things are true.
              You&apos;ve tried video before and it didn&apos;t stick. And you&apos;re
              tired of being the person editing footage at 9pm because no one
              else can.
            </p>

            <p>
              I&apos;ve seen that exact shape of frustration on dozens of discovery
              calls this year. So before you book, I want to be honest about
              who this works for.
            </p>

            <p className={styles.subHead}>It works if:</p>
            <ul className={styles.list}>
              <li>You&apos;re a $10-50M B2B SaaS with active pipeline.</li>
              <li>You&apos;ve tried video and you know the hard part isn&apos;t the editing.</li>
              <li>Your sales team is repeating themselves on every call.</li>
              <li>You need a story to tell your CMO. Not just another vendor.</li>
            </ul>

            <p className={styles.subHead}>It doesn&apos;t work if:</p>
            <ul className={styles.list}>
              <li>You&apos;re shopping the cheapest editor.</li>
              <li>You want to disappear from this and let us handle everything.</li>
              <li>You can&apos;t get one executive to commit two hours a month.</li>
              <li>You&apos;re under $5M ARR. Come back when you cross it.</li>
            </ul>

            <p>
              If we&apos;re a fit, the call below is worth it. If we&apos;re not,
              I&apos;d rather you find out from this paragraph than from forty
              minutes you don&apos;t get back.
            </p>

            <p className={styles.signoff}>
              Either way, I&apos;ll be in your corner.
            </p>

            <div className={styles.signature}>
              <span className={styles.scrawl}>— Ademola</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
