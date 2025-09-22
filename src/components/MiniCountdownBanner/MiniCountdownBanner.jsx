"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * MiniCountdownBanner.jsx (sessionStorage persistence)
 *
 * - Thick, modern, colorful gradient fill bar
 * - Starts at `fillStartPercent` and fills to 100% over `fillDurationHours`
 * - Persists start timestamp in `sessionStorage` (tab-scoped, clears on close)
 * - Brief shake every 5s (respects prefers-reduced-motion)
 * - Optimized: single 1s interval; onFull fired once when reached 100%
 *
 * Props:
 *  - fillStartPercent (number) default 60
 *  - fillDurationHours (number) default 2
 *  - persistKey (string) required for sessionStorage isolation
 *  - urgencyText (string) optional small label
 *  - className (string) extra wrapper classes
 *  - onFull (fn) optional callback when reach 100%
 */

const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

export default function MiniCountdownBanner({
  fillStartPercent = 60,
  fillDurationHours = 2,
  persistKey = "mini-countdown",
  urgencyText = "Act fast — almost out of stock!",
  className = "",
  onFull = null,
}) {
  const fillDurationMs = useMemo(
    () => Math.max(0.1, fillDurationHours) * 3600 * 1000,
    [fillDurationHours]
  );

  const persistedStartKey = `${persistKey}-startTs`;
  const startRef = useRef(null);

  if (!startRef.current) {
    const now = Date.now();
    try {
      const stored = sessionStorage.getItem(persistedStartKey);
      if (stored && !Number.isNaN(parseInt(stored, 10))) {
        startRef.current = parseInt(stored, 10);
      }
    } catch (_) {}
    if (!startRef.current) {
      startRef.current = now;
      try {
        sessionStorage.setItem(persistedStartKey, String(now));
      } catch (_) {}
    }
  }

  const firedOnFullRef = useRef(false);

  const computePercent = () => {
    const elapsed = Date.now() - startRef.current;
    const raw =
      fillStartPercent +
      (elapsed / fillDurationMs) * (100 - fillStartPercent);
    return clamp(Math.round(raw));
  };

  const [percent, setPercent] = useState(() => computePercent());
  const [shake, setShake] = useState(false);

  const intervalRef = useRef(null);
  const shakeTimerRef = useRef(null);
  const shakeTimeoutRef = useRef(null);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mediaQuery ? mediaQuery.matches : false;

    const update = () => {
      const p = computePercent();
      setPercent((prev) => (p !== prev ? p : prev));

      if (p >= 100 && !firedOnFullRef.current) {
        firedOnFullRef.current = true;
        if (typeof onFull === "function") {
          try {
            onFull();
          } catch (_) {}
        }
      }
    };

    intervalRef.current = setInterval(update, 1000);
    update();

    if (!reduced) {
      shakeTimerRef.current = setInterval(() => {
        const currentPercent = computePercent();
        if (currentPercent < 100) {
          setShake(true);
          clearTimeout(shakeTimeoutRef.current);
          shakeTimeoutRef.current = setTimeout(() => setShake(false), 700);
        }
      }, 5000);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(shakeTimerRef.current);
      clearTimeout(shakeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fillStartPercent, fillDurationMs, persistKey, onFull]);

  const fillStyle = {
    width: `${clamp(percent)}%`,
    background:
      "linear-gradient(90deg, #ff6b6b 0%, #ffb86b 30%, #ffd36b 50%, #8ce99a 75%, #4cc9f0 100%)",
    boxShadow:
      "0 2px 6px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)",
  };

  return (
    <div
      className={`flex items-center mb-4 gap-3 w-full max-w-full ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex-shrink-0 text-xs sm:text-sm font-semibold text-gray-800">
        ⚡ Hurry
      </div>

      <div
        className={`flex-1 min-w-0 relative rounded-full overflow-hidden shadow-sm ${
          shake ? "minifill-shake" : ""
        }`}
        style={{ height: 25 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03))",
          }}
          aria-hidden="true"
        />

        <div
          className="relative h-full rounded-full motion-safe:transition-[width] motion-reduce:transition-none duration-700 ease-out"
          style={fillStyle}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0))",
          }}
          aria-hidden="true"
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-indigo-700 font-semibold text-xs px-2 py-[2px] rounded-full shadow-sm">
          {clamp(percent)}%
        </div>
      </div>

      <div className="hidden sm:block text-xs text-gray-700 dark:text-gray-200 font-medium">
        {urgencyText}
      </div>

      <style jsx>{`
        @keyframes minifill-shake {
          0% {
            transform: translateX(0);
          }
          15% {
            transform: translateX(-6px);
          }
          30% {
            transform: translateX(6px);
          }
          45% {
            transform: translateX(-4px);
          }
          60% {
            transform: translateX(4px);
          }
          75% {
            transform: translateX(-2px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .minifill-shake {
          animation: minifill-shake 700ms ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .minifill-shake {
            animation: none !important;
            transform: none !important;
          }
          .motion-safe\:transition-\[width\] {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
