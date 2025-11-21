"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Spotlight } from "@/components/ui/spotlight";
import { MovingBorder } from "@/components/ui/moving-border";
import { Monitor, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
      <GridPattern />
      <BackgroundBeams />
      <Spotlight className="top-0 left-0 w-full h-full" />

      <div className="relative z-10 w-full max-w-5xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl font-bold mb-6 text-white">
            CapCop
          </h1>
          <p className="text-2xl text-gray-400">
            Система управления компьютерным клубом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/lock-screen">
              <MovingBorder className="w-full h-full" duration={3000}>
                <div className="p-12 flex flex-col items-center justify-center text-center h-64 hover:bg-white/5 transition-all group">
                  <div className="w-16 h-16 mb-6 bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Monitor className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Lock Screen</h2>
                  <p className="text-gray-400">
                    Интерфейс клиентского ПК
                  </p>
                </div>
              </MovingBorder>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/admin/dashboard">
              <MovingBorder className="w-full h-full" duration={3000}>
                <div className="p-12 flex flex-col items-center justify-center text-center h-64 hover:bg-white/5 transition-all group">
                  <div className="w-16 h-16 mb-6 bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Admin Panel</h2>
                  <p className="text-gray-400">
                    Панель администратора
                  </p>
                </div>
              </MovingBorder>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 text-gray-500 text-sm"
        >
          <p>Футуристическая система управления с Aceternity UI</p>
        </motion.div>
      </div>
    </main>
  );
}
