"use client";

import { motion } from "framer-motion";
import { useAdminStore } from "@/stores/admin-store";
import { AnimatedCounter } from "./AnimatedCounter";
import { DollarSign, Users, MonitorPlay, TrendingUp } from "lucide-react";

export function StatsOverview() {
  const { revenue } = useAdminStore();

  const stats = [
    {
      title: "Today's Revenue",
      value: revenue.todayRevenue,
      icon: DollarSign,
      suffix: "₽",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Active Sessions",
      value: revenue.activeSessions,
      icon: MonitorPlay,
      suffix: "",
      trend: "14/20 PCs",
      trendUp: true,
    },
    {
      title: "Total Users",
      value: revenue.totalUsers,
      icon: Users,
      suffix: "",
      trend: "+48 today",
      trendUp: true,
    },
    {
      title: "Week Revenue",
      value: revenue.weekRevenue,
      icon: TrendingUp,
      suffix: "₽",
      trend: "+24.3%",
      trendUp: true,
    },
  ];

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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={item}
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass brutalist-border p-6 relative overflow-hidden"
        >
          {/* Background Icon */}
          <div className="absolute -right-4 -top-4 opacity-10">
            <stat.icon className="w-32 h-32" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-gray-400" />
              <span
                className={`text-xs font-semibold ${
                  stat.trendUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend}
              </span>
            </div>

            <div className="text-3xl font-bold mb-1 neon-glow">
              <AnimatedCounter value={stat.value} />
              <span className="text-lg ml-1">{stat.suffix}</span>
            </div>

            <div className="text-sm text-gray-400">{stat.title}</div>
          </div>

          {/* Shine effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: index * 0.2,
              ease: "linear",
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
