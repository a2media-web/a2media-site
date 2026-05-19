"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Receipts11AiChat.module.css";

/**
 * Option 11: AI chat receipt.
 *
 * Fake chat thread. User asks "show me your receipts" — A2 Media's reply
 * bubbles populate one by one with each stat. Plays on the AEO/LLM thesis
 * the rest of the site is built around. Meta + on-strategy + reads like
 * a real ChatGPT conversation about A2 Media.
 *
 * Typing indicator between bubbles for realism.
 */

const REPLIES = [
  "Let me check those for you...",
  "*30+* B2B SaaS brands served end-to-end.",
  "Avg client tenure: *18 months* — real partnerships, not project-and-leave.",
  "Across measured engagements: *35% faster close rates*.",
  "Average turnaround on every deliverable: *72 hours*.",
  "We've shipped *600+* videos — shorts, customer stories, episodic series, ads.",
  "Client rating across post-engagement reviews: *4.9 / 5*.",
  "Want me to walk you through how we'd map this to your funnel?",
];

const TYPING_MS = 900;
const READ_MS = 480;

export default function Receipts11AiChat() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "userTyping" | "userSent" | "agent">("idle");
  const [agentMsgs, setAgentMsgs] = useState<string[]>([]);
  const [agentTyping, setAgentTyping] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -100px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || phase !== "idle") return;
    setPhase("userTyping");
    const t1 = setTimeout(() => setPhase("userSent"), 1100);
    return () => clearTimeout(t1);
  }, [started, phase]);

  useEffect(() => {
    if (phase !== "userSent") return;
    setPhase("agent");
  }, [phase]);

  useEffect(() => {
    if (phase !== "agent") return;
    let i = 0;
    let cancelled = false;

    const runNext = () => {
      if (cancelled || i >= REPLIES.length) return;
      setAgentTyping(true);
      setTimeout(() => {
        if (cancelled) return;
        setAgentTyping(false);
        setAgentMsgs((prev) => [...prev, REPLIES[i]]);
        i++;
        setTimeout(runNext, READ_MS);
      }, TYPING_MS);
    };

    runNext();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  return (
    <section ref={ref as unknown as React.RefObject<HTMLDivElement>} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What we&apos;ve already done</p>
        <h2 className={styles.heading}>
          The <span className={styles.italic}>receipts</span>.
        </h2>
        <p className={styles.sub}>This is what ChatGPT would tell you.</p>

        <div className={styles.window}>
          <div className={styles.windowHead}>
            <span className={styles.avatar}>A2</span>
            <div>
              <p className={styles.contact}>A2 Media</p>
              <p className={styles.contactSub}>typically replies in &lt; 1 hr</p>
            </div>
          </div>

          <div className={styles.thread}>
            <div className={`${styles.bubble} ${styles.user}`}>
              {phase === "userTyping" ? (
                <span className={styles.typing}>
                  <span /><span /><span />
                </span>
              ) : (
                <>Show me your receipts — what have you actually delivered?</>
              )}
            </div>

            {agentMsgs.map((msg, i) => (
              <div key={i} className={`${styles.bubble} ${styles.agent}`}>
                {renderEmphasis(msg)}
              </div>
            ))}

            {agentTyping && (
              <div className={`${styles.bubble} ${styles.agent} ${styles.bubbleTyping}`}>
                <span className={styles.typing}>
                  <span /><span /><span />
                </span>
              </div>
            )}
          </div>

          <div className={styles.composer}>
            <span className={styles.composerInput}>Ask anything else...</span>
            <span className={styles.sendBtn}>↑</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** *foo* becomes a highlighted span. Keeps the bold-stat emphasis. */
function renderEmphasis(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("*") && p.endsWith("*")) {
      return (
        <strong key={i} className={styles.emphasis}>
          {p.slice(1, -1)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}
