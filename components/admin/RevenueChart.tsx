"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Users, Activity } from "lucide-react";

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  revenue: Math.floor(Math.random() * 5000) + 1000,
  sessions: Math.floor(Math.random() * 15) + 5,
}));

export function RevenueChart() {
  return (
    <div className="glass p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Today's Revenue Timeline
      </h3>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hourlyData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="hour"
              stroke="#666"
              tick={{ fill: "#999" }}
              interval={2}
            />
            <YAxis stroke="#666" tick={{ fill: "#999" }} />
            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "0px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#ffffff"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-strong p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Peak Hour</span>
          </div>
          <div className="text-2xl font-bold">18:00</div>
          <div className="text-xs text-gray-500">5,847₽</div>
        </div>

        <div className="glass-strong p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">Avg. Sessions</span>
          </div>
          <div className="text-2xl font-bold">12.4</div>
          <div className="text-xs text-gray-500">per hour</div>
        </div>

        <div className="glass-strong p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Growth</span>
          </div>
          <div className="text-2xl font-bold text-green-500">+24%</div>
          <div className="text-xs text-gray-500">vs. yesterday</div>
        </div>
      </div>
    </div>
  );
}
