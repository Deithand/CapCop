"use client";

import { motion } from "framer-motion";
import { useAdminStore } from "@/stores/admin-store";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/grid-pattern";
import { formatTime } from "@/lib/utils/time-helpers";
import { Monitor, DollarSign, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const { pcs, revenue } = useAdminStore();

  const availablePCs = pcs.filter((pc) => pc.status === "available").length;
  const occupiedPCs = pcs.filter((pc) => pc.status === "occupied").length;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <GridPattern />
      <BackgroundBeams />

      <div className="relative z-10 p-8 max-w-[1920px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-2">Админ Панель</h1>
          <p className="text-gray-400 text-xl">Управление компьютерным клубом</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-strong p-6 border-2 border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="text-gray-400 text-sm">Доход за сегодня</div>
            </div>
            <div className="text-4xl font-bold">{revenue.todayRevenue.toLocaleString()} ₽</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-strong p-6 border-2 border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                <Monitor className="w-6 h-6" />
              </div>
              <div className="text-gray-400 text-sm">Активные ПК</div>
            </div>
            <div className="text-4xl font-bold">{occupiedPCs}/{pcs.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-strong p-6 border-2 border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-gray-400 text-sm">Всего пользователей</div>
            </div>
            <div className="text-4xl font-bold">{revenue.totalUsers}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-strong p-6 border-2 border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-gray-400 text-sm">Неделя</div>
            </div>
            <div className="text-4xl font-bold">{revenue.weekRevenue.toLocaleString()} ₽</div>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 border border-green-500" />
            <span>Свободен</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border border-white" />
            <span>Занят</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 border border-red-500 animate-pulse" />
            <span>Критично (&lt;5 мин)</span>
          </div>
        </div>

        {/* PC Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {pcs.map((pc) => {
            const isCritical = pc.timeRemaining && pc.timeRemaining < 300;
            const borderColor =
              pc.status === "available"
                ? "border-green-500"
                : isCritical
                ? "border-red-500 animate-pulse"
                : "border-white";

            return (
              <motion.div
                key={pc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: 0.05 * pc.id }}
                className={`glass-strong p-6 border-2 ${borderColor} transition-all cursor-pointer`}
                onClick={() => {
                  if (pc.status === "occupied") {
                    toast.info(`PC #${pc.id}: ${pc.currentUser} - ${formatTime(pc.timeRemaining || 0)}`);
                  }
                }}
              >
                {/* PC Number */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">#{pc.id}</div>
                  <div className="text-xs text-gray-400 mt-1">{pc.hardwareSpecs.gpu}</div>
                </div>

                {/* Status */}
                <div className="text-center mb-3">
                  {pc.status === "available" ? (
                    <div className="text-green-500 text-sm font-semibold">СВОБОДЕН</div>
                  ) : pc.status === "maintenance" ? (
                    <div className="text-yellow-500 text-sm font-semibold">РЕМОНТ</div>
                  ) : (
                    <>
                      <div className="text-white text-xs mb-1">{pc.currentUser}</div>
                      <div className={`text-lg font-mono font-bold ${isCritical ? "text-red-500" : ""}`}>
                        {formatTime(pc.timeRemaining || 0)}
                      </div>
                    </>
                  )}
                </div>

                {/* Performance */}
                {pc.status === "occupied" && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 p-1 text-center">
                      <div className="text-gray-400">FPS</div>
                      <div className="font-bold">{pc.performance.fps}</div>
                    </div>
                    <div className="bg-white/5 p-1 text-center">
                      <div className="text-gray-400">CPU</div>
                      <div className="font-bold">{pc.performance.cpuUsage}%</div>
                    </div>
                  </div>
                )}

                {/* Debt Warning */}
                {pc.debt > 0 && (
                  <div className="mt-2 text-red-500 text-xs text-center font-semibold">
                    Долг: {pc.debt}₽
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Emergency Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 right-8"
        >
          <Button
            variant="destructive"
            size="lg"
            className="shadow-2xl"
            onClick={() => toast.error("Экстренная блокировка всех станций!")}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Экстренная блокировка
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
