"use client";

import { useState } from "react";
import VideoStage from "@/components/mockups/Testimonials/VideoStage";
import SenjaEmbed from "@/components/mockups/Testimonials/SenjaEmbed";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const [tab, setTab] = useState<"compilation" | "individually">("individually");

  return (
    <section id="Testimonials" className={styles.section}>
      <div className={styles.aurora} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow} style={{ color: "var(--a2-aqua-teal)" }}>Testimonials</p>
          <h2 className={styles.title}>Our Customers Love Us.</h2>
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${tab === "individually" ? styles.tabActive : ""}`}
              onClick={() => setTab("individually")}
            >
              Individual Reviews
            </button>
            <button
              type="button"
              className={`${styles.tab} ${tab === "compilation" ? styles.tabActive : ""}`}
              onClick={() => setTab("compilation")}
            >
              Compilation
            </button>
          </div>
        </div>
        <div className={styles.panel}>
          {tab === "compilation" ? (
            <div className={styles.compilationWrap}>
              <VideoStage label="Click to watch with audio" />
            </div>
          ) : (
            <SenjaEmbed />
          )}
        </div>
      </div>
    </section>
  );
}
