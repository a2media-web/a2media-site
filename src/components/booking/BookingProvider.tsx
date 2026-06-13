"use client";

/* BookingProvider
   Holds the in-page Cal booking modal state. Two phases on desktop:
     1. "morphing"  — the clicked button morphs into the modal silhouette
     2. "open"      — the real BookingModal fades in over the morph
   Mobile (<720px) bypasses both and navigates straight to cal.com so the
   visitor gets Cal's native mobile booking flow.

   Usage:
     const { open } = useBookingModal();
     <button onClick={(e) => open("meeting", e)}>Book a Call</button>

   Passing the click event is what enables the Button Morph transition.
   Omit it (or call open() without args) and you get a no-origin fallback
   that fades the modal in from screen center.

   Defaults to the "engine" slug if no argument is passed. */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import BookingModal from "./BookingModal";

const MORPH_MS = 580;
const MODAL_WIDTH = 880;
const MODAL_HEIGHT = 540;

type Origin = { x: number; y: number; width: number; height: number };

type Phase =
  | { kind: "idle" }
  | { kind: "morphing"; slug: string; origin: Origin | null }
  | { kind: "open"; slug: string };

type Ctx = {
  open: (slug?: string, e?: React.MouseEvent<HTMLElement>) => void;
  close: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });

  const open = useCallback(
    (slug = "engine", e?: React.MouseEvent<HTMLElement>) => {
      // On mobile the in-page iframe is cramped and the pitch panel pushes the
      // calendar below the fold. Navigate to cal.com directly so the visitor
      // gets Cal's native mobile booking flow.
      if (typeof window !== "undefined" && window.innerWidth < 720) {
        window.location.href = `https://cal.com/a2media/${slug}`;
        return;
      }

      // If a click event was passed, capture the button's center + size so the
      // morph can start from the exact element the user clicked.
      let origin: Origin | null = null;
      if (e?.currentTarget instanceof HTMLElement) {
        const rect = e.currentTarget.getBoundingClientRect();
        origin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }

      if (origin) {
        setPhase({ kind: "morphing", slug, origin });
        window.setTimeout(() => setPhase({ kind: "open", slug }), MORPH_MS);
      } else {
        setPhase({ kind: "open", slug });
      }
    },
    [],
  );

  const close = useCallback(() => {
    setPhase({ kind: "idle" });
  }, []);

  return (
    <BookingContext.Provider value={{ open, close }}>
      {children}
      {phase.kind === "morphing" && phase.origin && (
        <MorphLayer origin={phase.origin} />
      )}
      <BookingModal
        open={phase.kind === "open"}
        onClose={close}
        calSlug={phase.kind === "open" ? phase.slug : undefined}
      />
    </BookingContext.Provider>
  );
}

// Components rendered inside mockups (or any tree without BookingProvider) get a
// no-op fallback so the build doesn't crash and the mockup still renders.
const NOOP: Ctx = { open: () => {}, close: () => {} };

export function useBookingModal(): Ctx {
  return useContext(BookingContext) ?? NOOP;
}

/* ---------- Morph layer ---------- */
/* Renders a purple pill at the clicked button's position+size, then on the
   next paint transitions to the modal silhouette in the viewport center. */

function MorphLayer({ origin }: { origin: Origin }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    // Double-rAF so the browser commits the "start" frame before we flip to
    // the "end" state — otherwise the transition gets skipped.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setArmed(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  const startStyle: React.CSSProperties = {
    top: origin.y - origin.height / 2,
    left: origin.x - origin.width / 2,
    width: origin.width,
    height: origin.height,
    borderRadius: 999,
  };

  const endStyle: React.CSSProperties = {
    top: `calc(50vh - ${MODAL_HEIGHT / 2}px)`,
    left: `calc(50vw - ${MODAL_WIDTH / 2}px)`,
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    borderRadius: 18,
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(7,2,31,0.78)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 99,
          opacity: armed ? 1 : 0,
          transition: `opacity ${MORPH_MS}ms ease`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          background: "linear-gradient(135deg, #5A33FF, #8F45EE)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(90,51,255,0.45)",
          transition: `top ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05),
                       left ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05),
                       width ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05),
                       height ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05),
                       border-radius ${MORPH_MS}ms ease`,
          pointerEvents: "none",
          ...(armed ? endStyle : startStyle),
        }}
      />
    </>
  );
}
