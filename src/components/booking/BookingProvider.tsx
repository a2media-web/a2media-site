"use client";

/* BookingProvider
   Mounts a single BookingModal at app root and exposes a tiny hook so any
   CTA across the site can open it with a chosen Cal event slug.

   Usage:
     const { open } = useBookingModal();
     <button onClick={() => open("meeting")}>Book a Call</button>

   Defaults to the "engine" slug if no argument is passed. */

import React, { createContext, useContext, useState, useCallback } from "react";
import BookingModal from "./BookingModal";

type Ctx = {
  open: (slug?: string) => void;
  close: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; slug: string }>({
    open: false,
    slug: "engine",
  });

  const open = useCallback((slug = "engine") => {
    setState({ open: true, slug });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  return (
    <BookingContext.Provider value={{ open, close }}>
      {children}
      <BookingModal open={state.open} onClose={close} calSlug={state.slug} />
    </BookingContext.Provider>
  );
}

// Components rendered inside mockups (or any tree without BookingProvider) get a
// no-op fallback so the build doesn't crash and the mockup still renders.
const NOOP: Ctx = { open: () => {}, close: () => {} };

export function useBookingModal(): Ctx {
  return useContext(BookingContext) ?? NOOP;
}
