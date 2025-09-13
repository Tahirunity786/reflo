"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

function two(n) {
  return String(n).padStart(2, "0");
}

export default function CountdownBanner({
  durationInHours = 12,
  endTimestamp = null,
  persistKey = null,
  title = "UAE National Sale",
  subtitle = <>Use code <b>UAESPECIAL20</b> for exclusive limited-time savings.</>,
  ctaText = "Shop Now",
  ctaHref = "/",
  onCtaClick = null,
  onComplete = null,
  isDismissible = true,
  className = "",
}) {
  const totalSeconds = useMemo(() => Math.round(durationInHours * 3600), [durationInHours]);
  const endRef = useRef(null);

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
      } catch { }
      if (!endRef.current) {
        endRef.current = now + totalSeconds * 1000;
        try {
          localStorage.setItem(persistKey, String(endRef.current));
        } catch { }
      }
    } else {
      endRef.current = now + totalSeconds * 1000;
    }
  }

  const calcRemaining = () => Math.max(0, Math.ceil((endRef.current - Date.now()) / 1000));
  const [remaining, setRemaining] = useState(calcRemaining);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (calcRemaining() <= 0) {
      if (persistKey) localStorage.removeItem(persistKey);
      if (typeof onComplete === "function") onComplete();
      return;
    }
    intervalRef.current = setInterval(() => {
      const next = calcRemaining();
      setRemaining(next);
      if (next <= 0) {
        clearInterval(intervalRef.current);
        if (persistKey) localStorage.removeItem(persistKey);
        if (typeof onComplete === "function") onComplete();
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [persistKey, onComplete]);

  const hrs = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  // remaining percentage (bar shows remaining time -> it shrinks as time passes)
  // progress bar starts at 50% and grows to 100%
  const progressPercent = totalSeconds > 0
    ? Math.max(50, Math.min(100, Math.round(50 + ((1 - remaining / totalSeconds) * 50))))
    : 50;


  // Wave animation speed — "urgency mode" if less than 5 minutes (300s)
  const waveDuration = remaining <= 300 ? "0.8s" : "2s";

  const [hidden, setHidden] = useState(false);
  const handleCta = (e) => {
    if (typeof onCtaClick === "function") {
      e.preventDefault();
      onCtaClick({ remaining, endTimestamp: endRef.current });
    }
  };

  if (hidden || remaining <= 0) return null;

  return (
    <div
      className="sticky top-0 w-full z-50 pointer-events-auto"
      role="region"
      aria-label="UAE Countdown Banner"
    >
      {/* Background UAE gradient */}
      <div className="w-full bg-gradient-to-r from-[#E30613] via-[#007A3D] to-[#000000]">
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6 ${className}`}>
          <div
            className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-5 sm:p-7 
                       rounded-2xl shadow-2xl backdrop-blur-lg bg-white/80 border border-white/40"
          >
            {/* LEFT */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                {title}{" "}
                <span className="bg-gradient-to-r from-[#E30613] via-[#007A3D] to-[#FFD100] bg-clip-text text-transparent">
                  Flash Offer
                </span>
              </h3>
              <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700">{subtitle}</p>

              {/* Timer */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5 justify-center md:justify-start">
                {/* Timer boxes */}
                <div className="flex gap-3 sm:gap-5">
                  {[{ v: hrs, label: "HRS" }, { v: mins, label: "MIN" }, { v: secs, label: "SEC" }].map((seg, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center px-4 sm:px-5 py-3 rounded-xl shadow-lg 
                                 bg-gradient-to-b from-[#007A3D] to-[#004d26] text-white"
                    >
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums">
                        {two(seg.v)}
                      </div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-90">{seg.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bar (working, shrink-with-time + wave overlay) */}
                <div className="flex-1 min-w-[140px] sm:min-w-[200px]">
                  {/* local keyframes + reduced-motion rule (self-contained, so no tailwind config needed) */}
                  <style>{`
                    @keyframes wave {
                      0% { background-position: 0 0; }
                      100% { background-position: 40px 0; }
                    }
                    @media (prefers-reduced-motion: reduce) {
                      .countdown-wave { animation: none !important; opacity: 0.18 !important; }
                    }
                  `}</style>

                  <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden relative">
                    {/* fill = REMAINING percentage (so it shrinks) */}
                    <div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        width: `${progressPercent}%`,
                        transition: "width 1s linear",
                        background: "linear-gradient(90deg, #E30613, #007A3D, #000000, #FFD100)",
                      }}
                    >
                      {/* moving flash/wave overlay (only inside fill region) */}
                      <div
                        className="absolute inset-0 countdown-wave"
                        style={{
                          background:
                            "repeating-linear-gradient(45deg, rgba(255,255,255,0.24) 0, rgba(255,255,255,0.24) 10px, transparent 10px, transparent 20px)",
                          backgroundSize: "40px 40px",
                          animation: `wave ${waveDuration} linear infinite`,
                          opacity: 0.35,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CTA */}
            <div className="w-full sm:w-auto text-center">
              <a
                href={ctaHref}
                onClick={handleCta}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold tracking-wide 
                           bg-gradient-to-r from-[#E30613] to-[#C10010] text-white shadow-lg 
                           hover:scale-105 hover:shadow-xl transition-transform duration-300 
                           focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label={`${ctaText} — sale ends in ${hrs} hours ${mins} minutes`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3h4l1 2h6a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2H8l-1 2H3V3z" />
                </svg>
                <span>{ctaText}</span>
              </a>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
