"use client";

import { motion } from "framer-motion";
import { useAdminStore } from "@/stores/admin-store";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { PCCard } from "@/components/admin/PCCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Power,
  Lock,
  MessageSquare,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { pcs, extendSession, endSession, rebootPC } = useAdminStore();

  const handleExtend = (pcId: number) => {
    extendSession(pcId, 1);
    toast.success(`Extended session for PC #${pcId} by 1 hour`);
  };

  const handleEnd = (pcId: number) => {
    endSession(pcId);
    toast.success(`Ended session on PC #${pcId}`);
  };

  const handleReboot = (pcId: number) => {
    rebootPC(pcId);
    toast.info(`Rebooting PC #${pcId}...`);
  };

  const handleEmergencyLock = () => {
    toast.error("Emergency lock activated - All stations paused!");
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Gaming Cafe Management System</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Broadcast
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reboot All
            </Button>
            <Button variant="destructive" onClick={handleEmergencyLock}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Lock
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content Tabs */}
        <Tabs defaultValue="monitor" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="monitor">PC Monitor</TabsTrigger>
            <TabsTrigger value="finance">Financial Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Packages</TabsTrigger>
          </TabsList>

          {/* PC Monitor Tab */}
          <TabsContent value="monitor" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">PC Grid Layout</h2>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500/50 border border-green-500" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white/20 border border-white" />
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500/50 border border-red-500 animate-pulse" />
                    <span>&lt;5 min</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {pcs.map((pc) => (
                  <PCCard
                    key={pc.id}
                    pc={pc}
                    onExtend={handleExtend}
                    onEnd={handleEnd}
                    onReboot={handleReboot}
                  />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Financial Overview Tab */}
          <TabsContent value="finance" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <RevenueChart />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="glass p-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    {[
                      { method: "Cash", amount: 15840, percent: 35 },
                      { method: "Card", amount: 21380, percent: 47 },
                      { method: "QR Code", amount: 8460, percent: 18 },
                    ].map((item) => (
                      <div key={item.method}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{item.method}</span>
                          <span className="font-bold">{item.amount}₽</span>
                        </div>
                        <div className="h-2 bg-white/20 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percent}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Games</h3>
                  <div className="space-y-3">
                    {[
                      { game: "Counter-Strike 2", hours: 156, percent: 45 },
                      { game: "Dota 2", hours: 98, percent: 28 },
                      { game: "Valorant", hours: 67, percent: 19 },
                      { game: "League of Legends", hours: 28, percent: 8 },
                    ].map((item) => (
                      <div key={item.game}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{item.game}</span>
                          <span className="font-bold">{item.hours}h</span>
                        </div>
                        <div className="h-2 bg-white/20 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percent}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass p-6"
            >
              <h3 className="text-lg font-semibold mb-4">User Database</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4">Username</th>
                      <th className="text-left py-3 px-4">Level</th>
                      <th className="text-left py-3 px-4">Balance</th>
                      <th className="text-left py-3 px-4">Points</th>
                      <th className="text-left py-3 px-4">Total Spent</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {useAdminStore.getState().users.slice(0, 10).map((user) => (
                      <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">{user.username}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-white/10 text-xs">
                            {user.memberLevel}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.balance}₽</td>
                        <td className="py-3 px-4">{user.loyaltyPoints}</td>
                        <td className="py-3 px-4">{user.totalSpent}₽</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* Pricing & Packages Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="glass p-6">
                <h3 className="text-lg font-semibold mb-4">Hourly Rates</h3>
                <div className="space-y-4">
                  {[
                    { duration: "1 Hour", rate: 150, description: "Standard rate" },
                    { duration: "3+ Hours", rate: 130, description: "Bulk discount" },
                    { duration: "8+ Hours", rate: 100, description: "Night package" },
                  ].map((item) => (
                    <div key={item.duration} className="glass-strong p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{item.duration}</span>
                        <span className="text-2xl font-bold">{item.rate}₽/hr</span>
                      </div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-6">
                <h3 className="text-lg font-semibold mb-4">Special Packages</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Night Package",
                      price: 900,
                      hours: 8,
                      time: "22:00 - 6:00",
                    },
                    {
                      name: "Day Package",
                      price: 1200,
                      hours: 12,
                      time: "10:00 - 22:00",
                    },
                    {
                      name: "Weekend Special",
                      price: 1500,
                      hours: 15,
                      time: "Sat-Sun only",
                    },
                  ].map((pkg) => (
                    <div key={pkg.name} className="glass-strong p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="font-semibold">{pkg.name}</div>
                          <div className="text-xs text-gray-400">
                            {pkg.hours} hours • {pkg.time}
                          </div>
                        </div>
                        <span className="text-2xl font-bold">{pkg.price}₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
