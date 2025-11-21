"use client";

import React from "react";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
        animate={{
          x: ["-200%", "200%"],
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative border-2 border-white/20 bg-black/50 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};
