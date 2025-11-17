"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSessionStore } from "@/stores/session-store";
import { formatTime, getTimeRemaining, getSessionWarningLevel } from "@/lib/utils/time-helpers";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

export function Timer() {
  const { sessionEnd, timeRemaining, updateTimeRemaining } = useSessionStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(sessionEnd);
      updateTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionEnd, updateTimeRemaining]);

  const warningLevel = getSessionWarningLevel(timeRemaining);
  const totalSeconds = 3600; // Assuming 1 hour session for progress
  const progress = ((totalSeconds - timeRemaining) / totalSeconds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`glass-strong p-8 ${
        warningLevel === "critical"
          ? "neon-glow-red animate-pulse-glow border-red-500"
          : warningLevel === "warning"
          ? "border-white/50"
          : ""
      }`}
    >
      {warningLevel !== "none" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-4 text-red-500"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            {warningLevel === "critical"
              ? "Session ending soon!"
              : "Low time remaining"}
          </span>
        </motion.div>
      )}

      <div className="text-center">
        <div className="text-gray-400 text-sm mb-2">Time Remaining</div>
        <motion.div
          key={timeRemaining}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`text-7xl font-bold tracking-wider mb-4 ${
            warningLevel === "critical" ? "text-red-500" : "text-white"
          } ${warningLevel !== "none" ? "neon-glow" : ""}`}
        >
          {formatTime(timeRemaining)}
        </motion.div>

        <Progress
          value={progress}
          className={`h-2 ${
            warningLevel === "critical" ? "bg-red-500/20" : "bg-white/20"
          }`}
        />
        <div className="text-gray-500 text-xs mt-2">
          {Math.floor(progress)}% session completed
        </div>
      </div>
    </motion.div>
  );
}
