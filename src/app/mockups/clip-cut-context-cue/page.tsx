/* MOCKUP · /mockups/clip-cut-context-cue
   The Close-Faster beat with the Scroll-Cue Connector bridging into Guide,
   shown in the real flow: Hero -> Pain -> Close-Faster -> [cue] -> Guide. */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Guide from "@/components/sections/Guide";
import TumbleFinal from "../clip-cut-tumble/TumbleFinal";
import ScrollCue from "./ScrollCue";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pain />
      <TumbleFinal />
      <ScrollCue />
      <Guide />
    </main>
  );
}
