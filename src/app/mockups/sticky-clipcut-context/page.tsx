/* MOCKUP · /mockups/sticky-clipcut-context
   Clip-Cut as a sticky scroll section in the real flow:
   Hero -> Pain -> [sticky Clip-Cut] -> Guide. */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Guide from "@/components/sections/Guide";
import StickyClipCut from "./StickyClipCut";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pain />
      <StickyClipCut />
      <Guide />
    </main>
  );
}
