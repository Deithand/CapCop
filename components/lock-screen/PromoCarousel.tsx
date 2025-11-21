"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const promos = [
  {
    id: 1,
    title: "Happy Hour Special",
    description: "50% off from 10:00 - 14:00 on weekdays",
    accent: "border-white/30",
  },
  {
    id: 2,
    title: "Night Owl Package",
    description: "8 hours for only 900₽ from 22:00",
    accent: "border-white/30",
  },
  {
    id: 3,
    title: "Loyalty Rewards",
    description: "Earn 10 points for every 100₽ spent",
    accent: "border-white/30",
  },
];

export function PromoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 30000); // 30 seconds

    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % promos.length);
  const prev = () => setCurrent((prev) => (prev - 1 + promos.length) % promos.length);

  return (
    <div className="glass p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Current Offers</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`glass-strong p-4 border-l-4 ${promos[current].accent}`}
          >
            <h4 className="font-bold text-lg mb-1">{promos[current].title}</h4>
            <p className="text-sm text-gray-400">{promos[current].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-4 justify-center">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all ${
              index === current ? "w-8 bg-white" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
