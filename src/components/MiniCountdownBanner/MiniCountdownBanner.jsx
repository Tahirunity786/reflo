"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * MiniFillBanner.jsx
 *
 * - Thick, modern, colorful gradient fill bar
 * - Starts at `fillStartPercent` and fills to 100% over `fillDurationHours`
 * - Persists start timestamp when `persistKey` is provided
 * - Brief shake every 5s (respects prefers-reduced-motion)
 * - Optimized: single 1s interval; onFull fired once when reached 100%
 *
 * Props:
 *  - fillStartPercent (number) default 60
 *  - fillDurationHours (number) default 2
 *  - persistKey (string|null) default null
 *  - urgencyText (string) optional small label
 *  - className (string) extra wrapper classes
 *  - onFull (fn) optional callback when reach 100%
 */

const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

export default function MiniCountdownBanner({
  fillStartPercent = 60,
  fillDurationHours = 2,
  persistKey = null,
  urgencyText = "Act fast — almost out of stock!",
  className = "",
  onFull = null,
}) {
  // Convert hours to ms (allow small fractional hours)
  const fillDurationMs = useMemo(() => Math.max(0.1, fillDurationHours) * 3600 * 1000, [fillDurationHours]);

  // Persistent start timestamp key
  const persistedStartKey = persistKey ? `${persistKey}-startTs` : null;

  // Initialize start timestamp (once)
  const startRef = useRef(null);
  if (!startRef.current) {
    const now = Date.now();
    if (persistedStartKey) {
      try {
        const stored = localStorage.getItem(persistedStartKey);
        if (stored && !Number.isNaN(parseInt(stored, 10))) {
          startRef.current = parseInt(stored, 10);
        }
      } catch (_) {
        /* ignore localStorage errors */
      }
      if (!startRef.current) {
        startRef.current = now;
        try {
          localStorage.setItem(persistedStartKey, String(now));
        } catch (_) {}
      }
    } else {
      startRef.current = now;
    }
  }

  // keep track if we have fired onFull already
  const firedOnFullRef = useRef(false);

  // percent state
  const computePercent = () => {
    const elapsed = Date.now() - startRef.current;
    const raw = fillStartPercent + ((elapsed / fillDurationMs) * (100 - fillStartPercent));
    return clamp(Math.round(raw));
  };
  const [percent, setPercent] = useState(() => computePercent());
  const [shake, setShake] = useState(false);

  // timers refs
  const intervalRef = useRef(null);
  const shakeTimerRef = useRef(null);
  const shakeTimeoutRef = useRef(null);

  useEffect(() => {
    // respects reduced motion
    const mediaQuery = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mediaQuery ? mediaQuery.matches : false;

    // single updater (runs every second)
    const update = () => {
      const p = computePercent();
      setPercent((prev) => (p !== prev ? p : prev));

      if (p >= 100 && !firedOnFullRef.current) {
        firedOnFullRef.current = true;
        if (typeof onFull === "function") {
          try { onFull(); } catch (_) {}
        }
      }
    };

    intervalRef.current = setInterval(update, 1000);
    update(); // initial

    // shake every 5s if user does not prefer reduced motion
    if (!reduced) {
      shakeTimerRef.current = setInterval(() => {
        const currentPercent = computePercent();
        if (currentPercent < 100) {
          setShake(true);
          clearTimeout(shakeTimeoutRef.current);
          shakeTimeoutRef.current = setTimeout(() => setShake(false), 700);
        }
      }, 5000); // 🔥 every 5s
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(shakeTimerRef.current);
      clearTimeout(shakeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillStartPercent, fillDurationMs, persistedStartKey, onFull]);

  // fill style: colorful gradient and subtle gloss
  const fillStyle = {
    width: `${clamp(percent)}%`,
    // modern vibrant gradient: warm -> cool
    background: "linear-gradient(90deg, #ff6b6b 0%, #ffb86b 30%, #ffd36b 50%, #8ce99a 75%, #4cc9f0 100%)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)",
  };

  return (
    <div
      className={`flex items-center mb-4 gap-3 w-full max-w-full ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Left tiny label */}
      <div className="flex-shrink-0 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100">
        ⚡ Hurry
      </div>

      {/* Center: thick, rounded bar (mobile-first) */}
      <div
        className={`flex-1 min-w-0 relative rounded-full overflow-hidden shadow-sm ${shake ? "minifill-shake" : ""}`}
        // thicker: mobile 14px, sm 16px, md 18px
        style={{ height: 25 }}
      >
        {/* background track */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03))" }}
          aria-hidden="true"
        />

        {/* colorful fill */}
        <div
          className="relative h-full rounded-full motion-safe:transition-[width] motion-reduce:transition-none duration-700 ease-out"
          style={fillStyle}
          aria-hidden="true"
        />

        {/* optional gloss overlay for modern look */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0))" }}
          aria-hidden="true"
        />

        {/* Percent pill: visible on all sizes, small footprint */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-indigo-700 font-semibold text-xs px-2 py-[2px] rounded-full shadow-sm">
          {clamp(percent)}%
        </div>
      </div>

      {/* Right: urgency text on sm+ (collapsed on xs) */}
      <div className="hidden sm:block text-xs text-gray-700 dark:text-gray-200 font-medium">
        {urgencyText}
      </div>

      {/* Inline CSS for shake and reduced-motion safety */}
      <style jsx>{`
        @keyframes minifill-shake {
          0% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
        .minifill-shake {
          animation: minifill-shake 700ms ease-in-out;
        }
        @media (min-width: 640px) {
          /* sm: slightly taller */
          div[style] { } /* no-op to keep JSX style precedence safe */
        }
        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .minifill-shake { animation: none !important; transform: none !important; }
          .motion-safe\:transition-\[width\] { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
