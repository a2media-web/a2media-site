/* MOCKUP · /mockups/clip-cut-context
   The final Tumble & Drift "close faster" beat shown in the real homepage
   flow: Hero -> Pain (the section before) -> Close-Faster -> Guide (the
   section after). Lets the hand-off be judged top to bottom before go-live. */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Guide from "@/components/sections/Guide";
import TumbleFinal from "../clip-cut-tumble/TumbleFinal";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pain />
      <TumbleFinal />
      <Guide />
    </main>
  );
}
