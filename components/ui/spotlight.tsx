"use client";

import React from "react";
import { motion } from "framer-motion";

export const Spotlight = ({
  className,
  fill = "white",
}: {
  className?: string;
  fill?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`absolute pointer-events-none ${className}`}
    >
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="spotlight-gradient">
            <stop offset="0%" stopColor={fill} stopOpacity="0.3" />
            <stop offset="50%" stopColor={fill} stopOpacity="0.1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="50%"
          cy="30%"
          r="40%"
          fill="url(#spotlight-gradient)"
        />
      </svg>
    </motion.div>
  );
};
