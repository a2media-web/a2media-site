/**
 * Single source of truth for the process steps content used across all
 * Process mockup variants. Mirrors the live copy in
 * src/components/sections/Process/index.tsx verbatim — when the live copy
 * changes, update this file in lockstep (or vice versa).
 */

export const PROCESS_HEADING = "3 Steps to Turning Video Into Pipeline";

export type ProcessStep = {
  eyebrow: string;
  title: string;
  desc: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    eyebrow: "Step One:",
    title: "The 2-Week Jumpstart",
    desc: "We study your buyer psychology — sales calls, competitor content, comments, anywhere your buyers show up online. Then we build your custom video roadmap, write your scripts, and map out exactly what to create and how to distribute it.",
  },
  {
    eyebrow: "Step Two:",
    title: "We Build Your Video Engine.",
    desc: "We design the video system that works for your team, then script, edit, and give world-class quality videos within 48-72 hours. We give you videos every week, all tailored to your buyers.",
  },
  {
    eyebrow: "Step Three:",
    title: "Your Videos Build Pipeline.",
    desc: "Within a month, your sales team has videos they're proud to send out. Prospects show up to calls already educated. By month 6, video becomes one of your main drivers of buyer trust.",
  },
];

export const PROCESS_CTA = {
  title: "Let's Talk.",
  btn: "Book a Discovery Call",
  href: "https://cal.com/a2media/meeting",
  note: "Free 30-minute call · No commitment",
};
