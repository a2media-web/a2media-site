"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";
import { useBookingModal } from "@/components/booking/BookingProvider";

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "How much of our time will this actually take?",
    a: (
      <>
        <p>
          <strong>4 to 6 hours per month.</strong>
        </p>
        <p>
          AKA minimal. We built our process so you can stay focused on running
          your business. After an initial strategy session and a few async
          check-ins, we handle almost everything: strategy, scripts, creative
          direction, editing, and publishing. Most clients spend less than 2
          hours a week with us, and that time gets shorter as we learn your
          voice and brand.
        </p>
      </>
    ),
  },
  {
    q: "What do the first 30 days look like?",
    a: (
      <p>
        We start with a deep-dive into your ICP, your sales cycle, and the
        content gaps that are costing you pipeline. From there, we build a
        video strategy tailored to your buyer&apos;s journey. By the end of
        month one, you&apos;ll have a clear roadmap, your first 3 videos ready
        to use by your sales team, and then we get into systemizing it over
        the next 6 months.
      </p>
    ),
  },
  {
    q: "What happens after the 30-day accelerator?",
    a: (
      <p>
        You&apos;ll have a fully built video strategy and your first content
        in market. From there, most clients move into the Video Growth Engine,
        our ongoing retainer where we execute, optimize, and scale what&apos;s
        working. But there&apos;s no lock-in between plans. The Accelerator is
        designed to stand on its own, so if you want to take the playbook and
        run with it internally, you absolutely can.
      </p>
    ),
  },
  {
    q: "How do you measure results and prove ROI?",
    a: (
      <>
        <p>
          We use self-reported attribution (&ldquo;how did you hear about
          us?&rdquo; on forms and in sales calls) to capture the touchpoints
          analytics teams often miss, like someone binging your LinkedIn videos
          for weeks before booking a call. We also monitor last-touch
          attribution from your CRM to see which specific videos influenced
          closed deals. And we track leading indicators like time-to-close,
          video engagement from target accounts, and pipeline velocity.
        </p>
        <p>
          For example, one of our previous clients saw a 42% reduction in their
          sales cycle and $600K in video-attributed revenue. And we kept the
          tracking side of things simple.
        </p>
        <p>
          <strong>P.S.</strong> If your team already has a way of measuring,
          we layer into how you do it best.
        </p>
      </>
    ),
  },
  {
    q: "What if we’ve tried video before and it didn’t work?",
    a: (
      <p>
        That&apos;s actually most of our clients. Here&apos;s a pattern we see
        all the time: a company hires a freelancer or agency, gets a batch of
        nice-looking videos, posts them, and nothing happens. The issue
        wasn&apos;t the video itself, it was the absence of strategy. No ICP
        targeting, no distribution plan, no alignment with the sales cycle. So
        we&apos;ve committed to doing it differently. Every video we build is
        mapped to a specific stage, a specific audience, and a specific
        outcome.
      </p>
    ),
  },
  {
    q: "Can we use footage and content we already have?",
    a: (
      <p>
        Absolutely. We regularly repurpose existing webinars, podcasts, product
        demos, event recordings, and founder content into high-performing
        short-form and long-form video. If you&apos;ve got raw footage sitting
        in a Google Drive somewhere, we&apos;ll turn it into content that
        actually drives conversations. As long as it fits into the strategy
        that we&apos;ve set for you, that is.
      </p>
    ),
  },
  {
    q: "Why not just hire an in-house editor or use AI tools?",
    a: (
      <p>
        An in-house editor gives you execution but not strategy. AI gives you
        speed but not differentiation. You&apos;d still need a strategist, a
        creative director, a project manager, and a distribution plan, AKA 4+
        roles on top of the editor. We replace all of that. And unlike
        AI-generated content that your competitors can replicate overnight,
        the work we build together compounds over time and becomes impossible
        to copy.
      </p>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { open: openBooking } = useBookingModal();
  return (
    <section id="FAQ-Section" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Common questions</p>
          <h2 className={styles.heading}>
            Everything <span>you&apos;re wondering.</span>
          </h2>
          <p className={styles.sub}>
            The answers we give on most discovery calls. If yours isn&apos;t
            here, we&apos;ll cover it on the call.
          </p>
          <button
            type="button"
            onClick={() => openBooking("meeting")}
            className={styles.askLink}
            style={{ cursor: "pointer", fontFamily: "inherit", background: "none", border: "none", padding: 0 }}
          >
            Don&apos;t see your question? <span aria-hidden>→</span>
          </button>
        </div>
        <dl className={styles.list}>
          {QA.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className={`${styles.item} ${open ? styles.open : ""}`}
              >
                <dt>
                  <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className={styles.num}>{i + 1}</span>
                    <span className={styles.q}>{item.q}</span>
                    <svg
                      className={`${styles.chevron} ${open ? styles.open : ""}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M5 8L10 13L15 8" />
                    </svg>
                  </button>
                </dt>
                <dd className={`${styles.body} ${open ? styles.open : ""}`}>
                  <div className={styles.answer}>{item.a}</div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
