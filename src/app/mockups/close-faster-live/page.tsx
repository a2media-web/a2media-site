/* MOCKUP · /mockups/close-faster-live
   The Timeline Trim "close faster" beat shown IN CONTEXT: the real Hero,
   then the new section, then the real Pain section — so the hero -> section
   -> "You tried video" flow can be judged for real. Not wired into the
   live homepage. */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import CloseFaster from "./CloseFaster";

export default function Page() {
  return (
    <main>
      <Hero />
      <CloseFaster />
      <Pain />
    </main>
  );
}
