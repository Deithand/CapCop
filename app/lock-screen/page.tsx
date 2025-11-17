"use client";

import { motion } from "framer-motion";
import { Timer } from "@/components/lock-screen/Timer";
import { QuickActions } from "@/components/lock-screen/QuickActions";
import { GameGrid } from "@/components/lock-screen/GameGrid";
import { AccountInfo } from "@/components/lock-screen/AccountInfo";
import { PCSpecs } from "@/components/lock-screen/PCSpecs";
import { PromoCarousel } from "@/components/lock-screen/PromoCarousel";

export default function LockScreenPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background with blur effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop')",
          filter: "blur(8px) brightness(0.3)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 p-6 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <Timer />
            <PCSpecs />
            <PromoCarousel />
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            <AccountInfo />
            <QuickActions />
            <GameGrid />
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <div className="glass p-6">
              <h3 className="text-lg font-semibold mb-4">Session Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Session Start</span>
                  <span className="font-mono">
                    {new Date().toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Session End</span>
                  <span className="font-mono">
                    {new Date(Date.now() + 3600000).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Time</span>
                  <span className="font-mono">1:00:00</span>
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Active Players</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="h-2 bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Available PCs</span>
                    <span className="font-bold">6/20</span>
                  </div>
                  <div className="h-2 bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-6">
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <p>
                  • Press <kbd className="px-2 py-1 bg-white/10 text-white">F11</kbd> for fullscreen
                </p>
                <p>
                  • Use Quick Actions to extend your session
                </p>
                <p>
                  • Call admin if you need any assistance
                </p>
                <p>
                  • Session will auto-lock when time expires
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
