"use client";

/* BookingProvider
   Holds the in-page Cal booking modal state and renders the desktop
   button-morph transition that grows the clicked CTA into the modal shape.

   Phases (desktop):
     idle      → no overlay
     morphing  → purple pill grows from button origin to modal silhouette
                 (backdrop fading in beneath it)
     open      → real BookingModal fades in at modal position; the morph
                 pill fades out in the SAME 240ms window so the handoff is
                 a crossfade instead of a hard cut
     closing   → BookingModal fades out, then unmounts

   Mobile (<720px) bypasses everything and navigates straight to cal.com so
   the visitor gets Cal's native mobile booking flow.

   Usage:
     const { open } = useBookingModal();
     <button onClick={(e) => open("meeting", e)}>Book a Call</button>

   Passing the click event is what enables the morph transition. Omit it
   (or call open() with no event) and the modal fades in centered. */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import BookingModal from "./BookingModal";

const MORPH_MS = 560;
const CROSSFADE_MS = 260;
const MODAL_WIDTH = 880;
const MODAL_HEIGHT = 540;

type Origin = { x: number; y: number; width: number; height: number };

type Phase =
  | { kind: "idle" }
  | { kind: "morphing"; slug: string; origin: Origin }
  | { kind: "open"; slug: string; origin: Origin | null };

type Ctx = {
  open: (slug?: string, e?: React.MouseEvent<HTMLElement>) => void;
  close: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });

  const open = useCallback(
    (slug = "engine", e?: React.MouseEvent<HTMLElement>) => {
      if (typeof window !== "undefined" && window.innerWidth < 720) {
        window.location.href = `https://cal.com/a2media/${slug}`;
        return;
      }

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
        window.setTimeout(
          () => setPhase({ kind: "open", slug, origin }),
          MORPH_MS,
        );
      } else {
        setPhase({ kind: "open", slug, origin: null });
      }
    },
    [],
  );

  const close = useCallback(() => {
    setPhase({ kind: "idle" });
  }, []);

  // The morph layer stays mounted through both "morphing" and "open" so the
  // shell that grew from the button doesn't disappear — it just crossfades
  // into the real modal sitting on top of it at the exact same position.
  const showMorph =
    (phase.kind === "morphing" || phase.kind === "open") &&
    (phase.kind === "morphing" ? phase.origin : phase.origin) !== null;

  return (
    <BookingContext.Provider value={{ open, close }}>
      {children}
      {showMorph && phase.kind !== "idle" && phase.origin && (
        <MorphLayer
          origin={phase.origin}
          fading={phase.kind === "open"}
        />
      )}
      <BookingModal
        open={phase.kind === "open"}
        onClose={close}
        calSlug={phase.kind === "open" ? phase.slug : undefined}
        hideOwnBackdrop={phase.kind === "open" && phase.origin !== null}
      />
    </BookingContext.Provider>
  );
}

// Components rendered inside mockups (or any tree without BookingProvider) get
// a no-op fallback so the build doesn't crash and the mockup still renders.
const NOOP: Ctx = { open: () => {}, close: () => {} };

export function useBookingModal(): Ctx {
  return useContext(BookingContext) ?? NOOP;
}

/* ---------- Morph layer ----------
   Renders the dark blurred backdrop (so the page behind dims) AND a purple
   gradient pill that starts at the clicked button's position+size and
   transitions to the modal silhouette in the viewport center. When the
   provider flips to "open" the pill fades out via the `fading` prop while
   the BookingModal fades in at the exact same position, so visually the
   pill becomes the modal with no harsh seam. */

function MorphLayer({
  origin,
  fading,
}: {
  origin: Origin;
  fading: boolean;
}) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
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
      {/* Backdrop fades in during morph; stays through the open phase so the
          modal doesn't need its own (avoiding double-backdrop opacity). */}
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
      {/* The morph shell itself. Crossfades out once the modal mounts on top. */}
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          background: "linear-gradient(135deg, #5A33FF, #8F45EE)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(90,51,255,0.45)",
          transition: [
            `top ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05)`,
            `left ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05)`,
            `width ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05)`,
            `height ${MORPH_MS}ms cubic-bezier(.2,.7,.2,1.05)`,
            `border-radius ${MORPH_MS}ms ease`,
            `opacity ${CROSSFADE_MS}ms ease`,
          ].join(", "),
          opacity: fading ? 0 : 1,
          pointerEvents: "none",
          ...(armed ? endStyle : startStyle),
        }}
      />
    </>
  );
}
