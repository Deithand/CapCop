"use client";

import { motion } from "framer-motion";
import { useSessionStore } from "@/stores/session-store";
import { formatCurrency } from "@/lib/utils/time-helpers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Award, Wifi, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AccountInfo() {
  const { username, memberLevel, balance, rewardPoints, networkPing } = useSessionStore();

  return (
    <div className="glass p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-2xl">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{username}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Award className="w-4 h-4" />
              <span>{memberLevel} Member</span>
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <QrCode className="w-4 h-4 mr-2" />
              Top Up
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mobile Payment</DialogTitle>
            </DialogHeader>
            <div className="py-6 text-center">
              <div className="w-48 h-48 mx-auto bg-white/10 flex items-center justify-center mb-4">
                <QrCode className="w-32 h-32" />
              </div>
              <p className="text-sm text-gray-400">
                Scan this QR code with your mobile banking app to add funds to your account
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-strong p-4"
        >
          <div className="text-sm text-gray-400 mb-1">Balance</div>
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-strong p-4"
        >
          <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
            <Award className="w-3 h-3" />
            Points
          </div>
          <div className="text-2xl font-bold">{rewardPoints.toLocaleString()}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-strong p-4"
        >
          <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            Ping
          </div>
          <div className="text-2xl font-bold text-green-500">{networkPing}ms</div>
        </motion.div>
      </div>
    </div>
  );
}
