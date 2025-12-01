import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0 → 1

  // Update progress + visibility on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(p);
      setIsVisible(scrollTop > 200); // threshold to show the button
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const size = 48;           // ring canvas size (px)
  const stroke = 6;          // ring thickness (px)
  const radius = (size - stroke) / 2;
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const dash = useMemo(() => progress * circumference, [progress, circumference]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scrollToTop"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 rounded-full p-3 bg-slate-900/80 backdrop-blur border border-slate-700 shadow-lg hover:bg-slate-800 transition"
          style={{ width: size, height: size }}
        >
          {/* Progress Ring */}
          <svg
            width={size + 14}
            height={size + 14}
            viewBox={`0 0 ${size + 14} ${size + 14}`}
            className="absolute -inset-[7px] pointer-events-none"
          >
            <defs>
              <linearGradient id="scrollRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>

            {/* Background track */}
            <circle
              cx={(size + 14) / 2}
              cy={(size + 14) / 2}
              r={radius}
              stroke="#1f2937"
              strokeWidth={stroke}
              fill="none"
            />

            {/* Progress arc */}
            <circle
              cx={(size + 14) / 2}
              cy={(size + 14) / 2}
              r={radius}
              stroke="url(#scrollRing)"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              transform={`rotate(-90 ${(size + 14) / 2} ${(size + 14) / 2})`} // start at top
            />
          </svg>

          {/* Icon */}
          <ChevronUp className="w-5 h-5 text-slate-100 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
