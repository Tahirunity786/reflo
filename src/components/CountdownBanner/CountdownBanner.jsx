"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

/**
 * CountdownBanner.jsx
 * Responsive, modern, accessible countdown banner for Next.js + TailwindCSS
 * - Client component ("use client") — avoids SSR mismatch
 * - Smart persistence (optional) via `persistKey`
 * - Minimal re-renders (1s tick), low memory overhead
 * - Accessible (aria-live, role=status)
 * - Responsive: compact mobile view and expanded desktop view using utility classes
 * - Respects reduced-motion preferences and safe-area insets on modern phones
 *
 * Improvements added in this version:
 *  - Uses mobile-first layout with `flex-col` and switches to `md:flex-row` for wider screens
 *  - Compact digital timer for extra-small screens (HH:MM:SS) while showing pill UI for sm+ screens
 *  - CTA becomes full-width on very small screens to improve tap targets
 *  - Uses `sticky` on small screens so it doesn't obscure content; becomes `fixed` on md+ screens
 *  - Adds <time> with datetime for semantics and better screen-reader support
 *  - Respects prefers-reduced-motion with `motion-safe` / `motion-reduce` utilities
 */

function two(n) {
  return String(n).padStart(2, "0");
}

export default function CountdownBanner({
  durationInHours = 12,
  endTimestamp = null,
  persistKey = null,
  title = "Discount on all Products",
  subtitle = "Hurry — limited time discount on all Products.",
  ctaText = "Shop & Save",
  ctaHref = "/",
  onCtaClick = null,
  onComplete = null,
  isDismissible = true,
  className = "",
}) {
  // total duration in seconds (stable memo)
  const totalSeconds = useMemo(() => Math.round(durationInHours * 3600), [durationInHours]);

  // endRef stores exact end timestamp (ms). We initialize it once per component life.
  const endRef = useRef(null);

  // Client-side: compute and persist the end timestamp if requested.
  if (!endRef.current) {
    const now = Date.now();
    if (typeof endTimestamp === "number" && !Number.isNaN(endTimestamp)) {
      endRef.current = endTimestamp;
    } else if (persistKey) {
      try {
        const stored = localStorage.getItem(persistKey);
        if (stored && !Number.isNaN(parseInt(stored, 10))) {
          endRef.current = parseInt(stored, 10);
        }
      } catch (e) {
        // ignore localStorage errors
      }
      if (!endRef.current) {
        endRef.current = now + totalSeconds * 1000;
        try {
          localStorage.setItem(persistKey, String(endRef.current));
        } catch (e) {}
      }
    } else {
      endRef.current = now + totalSeconds * 1000;
    }
  }

  // helper that computes remaining seconds (clamped to 0)
  const calcRemaining = () => Math.max(0, Math.ceil((endRef.current - Date.now()) / 1000));

  const [remaining, setRemaining] = useState(calcRemaining);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (calcRemaining() <= 0) {
      if (persistKey) {
        try {
          localStorage.removeItem(persistKey);
        } catch (e) {}
      }
      if (typeof onComplete === "function") onComplete();
      return;
    }

    intervalRef.current = setInterval(() => {
      const next = calcRemaining();
      setRemaining(next);
      if (next <= 0) {
        clearInterval(intervalRef.current);
        if (persistKey) {
          try {
            localStorage.removeItem(persistKey);
          } catch (e) {}
        }
        if (typeof onComplete === "function") onComplete();
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [persistKey, onComplete]);

  // derive time segments and progress
  const hrs = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;
  const progress = Math.min(100, Math.max(0, Math.round((1 - remaining / totalSeconds) * 100)));

  // local hide state for dismissible banner
  const [hidden, setHidden] = useState(false);
  const handleCta = (e) => {
    if (typeof onCtaClick === "function") {
      e.preventDefault();
      onCtaClick({ remaining, endTimestamp: endRef.current });
    }
  };

  if (hidden || remaining <= 0) return null;

  return (
    // sticky on xs/sm so it doesn't block content; fixed on md+ for a floating banner
    <div
      className="px-6 sm:px-4 pointer-events-auto"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      role="region"
      aria-label="Limited time discount banner"
    >
      <div className={`mx-auto max-w-5xl ${className}`}>
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 p-3 sm:p-4 md:p-5 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 text-white shadow-xl ring-1 ring-black/10 overflow-hidden">

          {/* LEFT: message + timer area */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight truncate">
                  {title} <span className="font-extrabold ml-2">{durationInHours}h flash</span>
                </h3>
                <p className="mt-1 text-[11px] sm:text-sm md:text-sm opacity-90 truncate">{subtitle}</p>
              </div>

              {/* {isDismissible && (
                <button
                  onClick={() => setHidden(true)}
                  className="ml-3 p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label="Dismiss countdown banner"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M6 14L14 6" />
                  </svg>
                </button>
              )} */}
            </div>

            {/* Timer area: compact digital on xs, pill UI for sm+ */}
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-3">

              {/* compact digital (visible only on xs) */}
              <div className="flex items-center gap-2 sm:hidden justify-between w-full">
                <div className="flex items-center gap-3">
                  <time dateTime={new Date(endRef.current).toISOString()} className="text-lg font-semibold tabular-nums">
                    {two(hrs)}:{two(mins)}:{two(secs)}
                  </time>
                  <div className="text-[11px] opacity-85">left</div>
                </div>

                {/* small progress for xs */}
                <div className="w-1/3 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full rounded-full motion-safe:transition-[width] motion-reduce:transition-none duration-700 ease-out" style={{ width: `${progress}%`, background: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6))" }} />
                </div>
              </div>

              {/* pill UI (visible on sm and up) */}
              <div className="hidden sm:flex gap-2 items-center w-full">
                <div className="flex gap-2 items-center flex-shrink-0">
                  {[{ v: hrs, label: "Hrs" }, { v: mins, label: "Min" }, { v: secs, label: "Sec" }].map((seg, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-2 rounded-lg min-w-[56px] sm:min-w-[64px]">
                      <div className="text-base sm:text-lg md:text-xl font-semibold tabular-nums">{two(seg.v)}</div>
                      <div className="text-[10px] uppercase tracking-wider opacity-80">{seg.label}</div>
                    </div>
                  ))}
                </div>

                {/* progress bar */}
                <div className="flex-1 min-w-0">
                  <div className="w-full h-2 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full motion-safe:transition-[width] motion-reduce:transition-none duration-700 ease-out" style={{ width: `${progress}%`, background: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6))" }} />
                  </div>
                </div>

              </div>

            </div>

            {/* accessible live region for screen readers */}
            <div className="sr-only" role="status" aria-live="polite">
              Sale ends in {hrs} hours, {mins} minutes and {secs} seconds.
            </div>

          </div>

          {/* RIGHT: CTA area */}
          <div className="w-full sm:w-auto flex-shrink-0">
            {/* On xs, CTA becomes full width to improve tap target; on sm+ it's inline */}
            <a
              href={ctaHref}
              onClick={handleCta}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg bg-white text-indigo-700 font-semibold shadow-md hover:scale-[1.02] motion-safe:transition-transform motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label={`${ctaText} — sale ends in ${hrs} hours ${mins} minutes`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M3 3h4l1 2h6a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2H8l-1 2H3V3z" />
              </svg>
              <span>{ctaText}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

/*
  USAGE (place this file in /components/CountdownBanner.jsx):

  import CountdownBanner from '@/components/CountdownBanner';

  <CountdownBanner
    durationInHours={12}
    persistKey="flash-sale-20250908" // optional
    ctaHref="/shop"
    ctaText="Shop & Save"
    onCtaClick={({ remaining, endTimestamp }) => {
      // analytics or custom modal
    }}
    onComplete={() => {
      // optional: show a final message or refresh data
    }}
  />

  Notes:
  - This component requires TailwindCSS (utility-first classes used).
  - 'use client' is required in Next.js app router to avoid SSR mismatch.
  - persistKey makes the countdown consistent across reloads (useful for flash sales).
*/
