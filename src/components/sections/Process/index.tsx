"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process.module.css";
import { useBookingModal } from "@/components/booking/BookingProvider";

/**
 * Engagement checklist — the live 3-step layout for a2media.ca.
 *
 * SaaS-onboarding pattern (Linear/Notion/Stripe style). On first
 * scroll-in, all three steps animate sequentially: each takes ~5s
 * (enters "in progress" → marks "done" at 2.2s → next step starts at
 * 5s). After all three complete, the section rests for ~3.5s, then
 * resets and loops forever.
 *
 * Full step descriptions preserved from the previous Gantt layout.
 *
 * REVERT to the Gantt layout by restoring from _backup-gantt.tsx.txt /
 * _backup-gantt.module.css.txt in this same folder.
 */

const HEADING = "3 Steps to Turning Video Into Pipeline";
const COLORS = ["#5A33FF", "#8F45EE", "#28DFE8"];

const STEPS = [
  {
    eyebrow: "Step One:",
    title: "The 2-Week Jumpstart",
    desc: "We study your buyer psychology — sales calls, competitor content, comments, anywhere your buyers show up online. Then we build your custom video roadmap. Where we tell you what you should be creating and how to distribute it. All based on our research.",
  },
  {
    eyebrow: "Step Two:",
    title: "We Build Your Video Engine.",
    desc: "We design the video system that works for your team, then script, edit, and give world-class quality videos within 48-72 hours. We give you videos every week, all tailored to your buyers.",
  },
  {
    eyebrow: "Step Three:",
    title: "Your Videos Build Pipeline.",
    desc: "Within a month, your sales team has videos they're proud to send out. Prospects show up to calls already educated. By month 6, video becomes one of your main drivers of buyer trust.",
  },
];

type StepState = "todo" | "doing" | "done";

const STEP_MS = 5000;      // total dwell per step
const DONE_AT_MS = 2200;   // when "doing" flips to "done" within a step
const REST_MS = 3500;      // pause with all 3 done before looping

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [stateArr, setStateArr] = useState<StepState[]>(["todo", "todo", "todo"]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const setOne = (idx: number, s: StepState) => {
      setStateArr((prev) => {
        const next = [...prev];
        next[idx] = s;
        return next;
      });
    };

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const runStep = (idx: number) => {
      setOne(idx, "doing");
      schedule(() => setOne(idx, "done"), DONE_AT_MS);
      schedule(() => {
        if (idx < STEPS.length - 1) {
          runStep(idx + 1);
        } else {
          // All done — hold the finish pose, then reset and loop.
          schedule(() => {
            setStateArr(["todo", "todo", "todo"]);
            schedule(() => runStep(0), 500);
          }, REST_MS);
        }
      }, STEP_MS);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            io.disconnect();
            schedule(() => runStep(0), 400);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const doneCount = stateArr.filter((s) => s === "done").length;

  return (
    <section ref={sectionRef} id="our-process" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The plan · 4-6 months</p>
        <h2 className={styles.heading}>{HEADING}</h2>

        <div className={styles.list}>
          <div className={styles.listHead}>
            <span className={styles.listTitle}>A2 Media · 3 things to check off</span>
            <span className={styles.listProgress}>{doneCount}/3</span>
          </div>

          {STEPS.map((s, i) => {
            const state = stateArr[i];
            return (
              <div key={s.title} className={`${styles.item} ${styles[`item_${state}`]}`}>
                <span className={styles.check}>
                  {state === "todo"  && <span className={styles.checkEmpty} />}
                  {state === "doing" && (
                    <span className={styles.checkSpin} style={{ borderTopColor: COLORS[i] }} />
                  )}
                  {state === "done"  && (
                    <span className={styles.checkDone} style={{ background: COLORS[i], borderColor: COLORS[i] }}>✓</span>
                  )}
                </span>
                <div className={styles.itemBody}>
                  <p className={styles.itemEyebrow} style={{ color: COLORS[i] }}>{s.eyebrow}</p>
                  <h3 className={styles.itemTitle}>{s.title}</h3>
                  <p className={styles.itemDesc}>{s.desc}</p>
                </div>
                <span className={styles.stateTag}>
                  {state === "todo"  && "Up next"}
                  {state === "doing" && "In progress"}
                  {state === "done"  && "Done"}
                </span>
              </div>
            );
          })}
        </div>

        <ProcessCta />
      </div>
    </section>
  );
}

function ProcessCta() {
  const { open } = useBookingModal();
  return (
    <div className={styles.cta}>
      <div className={styles.ctaTitle}>Be the team buyers already trust. With video.</div>
      <button
        type="button"
        onClick={(e) => open("meeting", e)}
        className={styles.ctaBtn}
        style={{ cursor: "pointer", fontFamily: "inherit", border: "none" }}
      >
        Book a Discovery Call <span aria-hidden>→</span>
      </button>
      <div className={styles.ctaNote}>Free 30-minute call · No commitment</div>
    </div>
  );
}

