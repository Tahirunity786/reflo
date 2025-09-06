"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewerCount({ productId }) {
  const [viewers, setViewers] = useState(null);

  useEffect(() => {
    // ✅ Try to restore from sessionStorage so number stays consistent
    const savedViewers = sessionStorage.getItem(`viewers_${productId}`);
    let initialViewers;

    if (savedViewers) {
      initialViewers = parseInt(savedViewers, 10);
    } else {
      // ✅ First time: pick a believable random number between 8–20
      initialViewers = Math.floor(Math.random() * 12) + 8;
      sessionStorage.setItem(`viewers_${productId}`, initialViewers);
    }

    setViewers(initialViewers);

    // ✅ Update slightly every 6–10 seconds
    const interval = setInterval(() => {
      setViewers((prev) => {
        if (!prev) return initialViewers;
        const change = Math.random() < 0.5 ? -1 : 1; // up or down by 1
        let newCount = prev + change;

        // clamp to range (5–30)
        if (newCount < 5) newCount = 5;
        if (newCount > 30) newCount = 30;

        sessionStorage.setItem(`viewers_${productId}`, newCount);
        return newCount;
      });
    }, Math.floor(Math.random() * 4000) + 6000); // random interval 6–10s

    return () => clearInterval(interval);
  }, [productId]);

  if (!viewers) return null;

  return (
    <p className="text-gray-600 text-sm mb-4 flex items-center">
      👀{" "}
      <AnimatePresence mode="wait">
        <motion.span
          key={viewers}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}
          className="font-medium mx-1"
        >
          {viewers} people
        </motion.span>
      </AnimatePresence>
      are viewing this now
    </p>
  );
}
