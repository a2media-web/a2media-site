"use client";

import { useEffect } from "react";

const SENJA_ID = "451c1026-14eb-4fd0-8620-ac52a79d8d1e";

export default function SenjaEmbed() {
  useEffect(() => {
    const existing = document.querySelector(
      `script[data-senja="${SENJA_ID}"]`,
    );
    if (existing) return;
    const s = document.createElement("script");
    s.src = `https://widget.senja.io/widget/${SENJA_ID}/platform.js`;
    s.async = true;
    s.dataset.senja = SENJA_ID;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      className="senja-embed"
      data-id={SENJA_ID}
      data-mode="shadow"
      data-lazyload="false"
      style={{ display: "block", width: "100%" }}
    />
  );
}
