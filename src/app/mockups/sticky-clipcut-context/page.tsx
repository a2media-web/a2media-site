/* MOCKUP · /mockups/sticky-clipcut-context
   Clip-Cut as a sticky scroll section in the real flow:
   Hero -> Pain -> [sticky Clip-Cut] -> Guide. */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Guide from "@/components/sections/Guide";
import StickyClipCut from "./StickyClipCut";
import styles from "./stickyClip.module.css";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pain />
      <StickyClipCut />
      <div className={styles.guideOverlap}>
        <Guide />
      </div>
    </main>
  );
}
