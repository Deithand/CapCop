"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSessionStore } from "@/stores/session-store";
import { formatTime, getTimeRemaining } from "@/lib/utils/time-helpers";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { MovingBorder } from "@/components/ui/moving-border";
import { Clock, Cpu, Wifi, User, DollarSign } from "lucide-react";

export default function LockScreenPage() {
  const {
    pcNumber,
    username,
    balance,
    sessionEnd,
    timeRemaining,
    updateTimeRemaining,
    hardwareSpecs,
    networkPing,
  } = useSessionStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(sessionEnd);
      updateTimeRemaining(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionEnd, updateTimeRemaining]);

  const isLowTime = timeRemaining < 900; // < 15 min
  const isCritical = timeRemaining < 300; // < 5 min

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <GridPattern />
      <BackgroundBeams />
      <Spotlight className="top-0 left-0 w-full h-full" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-6xl font-bold mb-4 text-white">PC #{pcNumber}</div>
          <div className="text-xl text-gray-400">{hardwareSpecs.gpu} • {hardwareSpecs.ram}</div>
        </motion.div>

        {/* Main Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16"
        >
          <MovingBorder className="w-full" duration={3000}>
            <div className="p-12">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-4 uppercase tracking-widest">
                  Осталось времени
                </div>
                <motion.div
                  key={timeRemaining}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className={`text-9xl font-mono font-bold mb-6 ${
                    isCritical
                      ? "text-red-500 animate-pulse"
                      : isLowTime
                      ? "text-white"
                      : "text-white"
                  }`}
                  style={{
                    textShadow: isCritical
                      ? "0 0 30px rgba(239, 68, 68, 0.5)"
                      : "0 0 20px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {formatTime(timeRemaining)}
                </motion.div>

                {isCritical && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xl font-semibold uppercase tracking-wider"
                  >
                    ⚠ Сессия скоро закончится
                  </motion.div>
                )}
              </div>
            </div>
          </MovingBorder>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-strong p-6 border-2 border-white/10 hover:border-white/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-400 text-xs">Пользователь</div>
                <div className="text-xl font-bold">{username}</div>
              </div>
            </div>
          </motion.div>

          {/* Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-strong p-6 border-2 border-white/10 hover:border-white/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-400 text-xs">Баланс</div>
                <div className="text-xl font-bold">{balance} ₽</div>
              </div>
            </div>
          </motion.div>

          {/* Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-strong p-6 border-2 border-white/10 hover:border-white/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                <Wifi className="w-6 h-6" />
              </div>
              <div>
                <div className="text-gray-400 text-xs">Пинг</div>
                <div className="text-xl font-bold text-green-500">{networkPing} ms</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>Нужна помощь? Позовите администратора</p>
          <p className="mt-2">Нажмите <kbd className="px-2 py-1 bg-white/10 text-white mx-1">F1</kbd> для вызова админа</p>
        </motion.div>
      </div>
    </div>
  );
}
