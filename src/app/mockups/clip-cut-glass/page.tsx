/* MOCKUP · /mockups/clip-cut-glass
   Close-Faster in a Glass Panel, shown in context: Hero -> Pain ->
   Glass Close-Faster -> Guide. Below the first section, above the other. */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Guide from "@/components/sections/Guide";
import GlassCloseFaster from "./GlassCloseFaster";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pain />
      <GlassCloseFaster />
      <Guide />
    </main>
  );
}
