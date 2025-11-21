"use client";

import { motion } from "framer-motion";
import { useSessionStore } from "@/stores/session-store";
import { Cpu, MemoryStick, HardDrive } from "lucide-react";

export function PCSpecs() {
  const { pcNumber, hardwareSpecs } = useSessionStore();

  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">PC Station #{pcNumber}</h3>
        <div className="text-sm text-gray-400">Premium Hardware</div>
      </div>

      <div className="space-y-3">
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 glass-strong p-3"
        >
          <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Graphics Card</div>
            <div className="font-semibold">{hardwareSpecs.gpu}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 glass-strong p-3"
        >
          <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
            <MemoryStick className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Memory</div>
            <div className="font-semibold">{hardwareSpecs.ram}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 glass-strong p-3"
        >
          <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Processor</div>
            <div className="font-semibold">{hardwareSpecs.cpu}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
