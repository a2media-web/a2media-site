/* MOCKUP · /mockups/calendar-push
   Calendar Tear-Off in the sticky push: Hero -> Pain -> [calendar pins,
   counts 60->35 as pages tear, then lifts up while Guide rises up] -> Guide. */

import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import CalendarPush from "./CalendarPush";

export default function Page() {
  return (
    <main>
      <Hero />
      <Pain />
      <CalendarPush />
    </main>
  );
}
