"use client";

import { motion } from "framer-motion";
import { PCStatus } from "@/stores/admin-store";
import { formatTime } from "@/lib/utils/time-helpers";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Monitor,
  User,
  Clock,
  DollarSign,
  MoreVertical,
  Power,
  MessageSquare,
  RefreshCw,
  Pause
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PCCardProps {
  pc: PCStatus;
  onExtend?: (pcId: number) => void;
  onEnd?: (pcId: number) => void;
  onReboot?: (pcId: number) => void;
}

export function PCCard({ pc, onExtend, onEnd, onReboot }: PCCardProps) {
  const getBorderColor = () => {
    if (pc.status === "available") return "border-green-500/50";
    if (pc.status === "maintenance") return "border-yellow-500/50";
    if (pc.timeRemaining && pc.timeRemaining < 300) return "border-red-500/50 animate-pulse-glow";
    return "border-white/20";
  };

  const getStatusColor = () => {
    if (pc.status === "available") return "text-green-500";
    if (pc.status === "maintenance") return "text-yellow-500";
    return "text-white";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`glass border-2 ${getBorderColor()} p-4 transition-all`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          <span className="font-bold text-lg">PC #{pc.id}</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>PC #{pc.id} Actions</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {pc.status === "occupied" && (
                <>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => onExtend?.(pc.id)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Extend Session
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => onEnd?.(pc.id)}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    End Session
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => onReboot?.(pc.id)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reboot PC
              </Button>
              <Button variant="destructive" className="justify-start">
                <Power className="w-4 h-4 mr-2" />
                Shutdown
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status */}
      <div className={`text-sm font-semibold mb-3 ${getStatusColor()}`}>
        {pc.status === "available" && "Available"}
        {pc.status === "maintenance" && "Maintenance"}
        {pc.status === "occupied" && (
          <div className="flex items-center gap-1 text-white">
            <User className="w-3 h-3" />
            {pc.currentUser}
          </div>
        )}
      </div>

      {/* Hardware Specs */}
      <div className="text-xs text-gray-400 mb-3 space-y-1">
        <div>{pc.hardwareSpecs.gpu}</div>
        <div>{pc.hardwareSpecs.ram}</div>
      </div>

      {/* Time Remaining (if occupied) */}
      {pc.status === "occupied" && pc.timeRemaining !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-400">Time Left</span>
            <span className={`font-mono font-bold ${pc.timeRemaining < 300 ? 'text-red-500' : ''}`}>
              {formatTime(pc.timeRemaining)}
            </span>
          </div>
          <Progress
            value={((7200 - pc.timeRemaining) / 7200) * 100}
            className="h-1"
          />
        </div>
      )}

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="glass-strong p-2">
          <div className="text-xs text-gray-400">FPS</div>
          <div className="text-lg font-bold">{pc.performance.fps}</div>
        </div>
        <div className="glass-strong p-2">
          <div className="text-xs text-gray-400">CPU</div>
          <div className="text-lg font-bold">{pc.performance.cpuUsage}%</div>
        </div>
        <div className="glass-strong p-2">
          <div className="text-xs text-gray-400">RAM</div>
          <div className="text-lg font-bold">{pc.performance.ramUsage}%</div>
        </div>
        <div className="glass-strong p-2">
          <div className="text-xs text-gray-400">Temp</div>
          <div className="text-lg font-bold">{pc.performance.temperature}°C</div>
        </div>
      </div>

      {/* Debt Warning */}
      {pc.debt > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500/50 p-2 flex items-center gap-2"
        >
          <DollarSign className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-500">Debt: {pc.debt}₽</span>
        </motion.div>
      )}
    </motion.div>
  );
}
