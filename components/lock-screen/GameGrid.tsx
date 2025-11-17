"use client";

import { motion } from "framer-motion";
import { useSessionStore } from "@/stores/session-store";
import { Gamepad2 } from "lucide-react";

export function GameGrid() {
  const { installedGames } = useSessionStore();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="glass p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" />
        Installed Games
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 md:grid-cols-6 gap-4"
      >
        {installedGames.map((game) => (
          <motion.button
            key={game.id}
            variants={item}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="glass-strong aspect-square flex flex-col items-center justify-center p-4 hover:border-white/40 transition-all group"
          >
            <div className="w-12 h-12 mb-2 flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div className="text-xs text-center line-clamp-2">{game.name}</div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
