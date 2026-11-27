/* MOCKUP · /mockups/clipcut-push
   Clip-Cut handoff as a vertical push: Hero -> Pain -> [clip-cut pins, then
   lifts up while Guide rises up to take its place] -> Guide (continues). */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import ClipCutPush from "./ClipCutPush";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pain />
      {/* ClipCutPush reveals Guide behind it as it lifts away */}
      <ClipCutPush />
    </main>
  );
}
