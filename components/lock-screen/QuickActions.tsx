"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSessionStore } from "@/stores/session-store";
import { PRICE_PACKAGES } from "@/lib/utils/price-calculator";
import { toast } from "sonner";
import { Clock, AlertTriangle, Lock, DollarSign, Phone } from "lucide-react";

export function QuickActions() {
  const { extendSession, lockSession, isLocked } = useSessionStore();

  const handleExtendSession = (hours: number, price: number) => {
    extendSession(hours);
    toast.success(`Session extended by ${hours} hour(s) for ${price}₽`);
  };

  const handleCallAdmin = (urgency: "low" | "medium" | "high") => {
    const messages = {
      low: "Admin notified - General assistance",
      medium: "Admin notified - Issue reported",
      high: "Admin notified - URGENT assistance needed!",
    };
    toast.info(messages[urgency]);
  };

  const handleLockSession = () => {
    lockSession();
    toast.success("Session locked. Timer paused.");
  };

  return (
    <div className="glass p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Extend Session */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="glass" className="h-auto flex-col gap-2 py-4">
              <Clock className="w-6 h-6" />
              <span className="text-xs">Extend</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Extend Session</DialogTitle>
              <DialogDescription>
                Choose a package to extend your gaming time
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              {PRICE_PACKAGES.map((pkg) => (
                <motion.button
                  key={pkg.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleExtendSession(pkg.hours, pkg.price)}
                  className="glass p-4 text-left border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold">{pkg.name}</div>
                    <div className="text-lg font-bold">{pkg.price}₽</div>
                  </div>
                  <div className="text-sm text-gray-400">{pkg.description}</div>
                </motion.button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Call Admin */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="glass" className="h-auto flex-col gap-2 py-4">
              <Phone className="w-6 h-6" />
              <span className="text-xs">Call Admin</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Call Administrator</DialogTitle>
              <DialogDescription>
                Select urgency level for your request
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              <Button
                variant="ghost"
                className="justify-start h-auto p-4"
                onClick={() => handleCallAdmin("low")}
              >
                <div className="text-left">
                  <div className="font-semibold">General Assistance</div>
                  <div className="text-sm text-gray-400">
                    Questions, info, or general help
                  </div>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="justify-start h-auto p-4"
                onClick={() => handleCallAdmin("medium")}
              >
                <div className="text-left">
                  <div className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Issue Report
                  </div>
                  <div className="text-sm text-gray-400">
                    Hardware/software problems
                  </div>
                </div>
              </Button>
              <Button
                variant="destructive"
                className="justify-start h-auto p-4"
                onClick={() => handleCallAdmin("high")}
              >
                <div className="text-left">
                  <div className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 fill-current" />
                    URGENT
                  </div>
                  <div className="text-sm">Critical assistance needed</div>
                </div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Lock Session */}
        <Button
          variant="glass"
          className="h-auto flex-col gap-2 py-4"
          onClick={handleLockSession}
          disabled={isLocked}
        >
          <Lock className="w-6 h-6" />
          <span className="text-xs">Lock PC</span>
        </Button>

        {/* Price List */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="glass" className="h-auto flex-col gap-2 py-4">
              <DollarSign className="w-6 h-6" />
              <span className="text-xs">Prices</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Price List</DialogTitle>
              <DialogDescription>
                All available packages and rates
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-semibold mb-2">Hourly Rates</h4>
                <div className="glass p-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>1 hour</span>
                    <span>150₽/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3+ hours</span>
                    <span>130₽/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>8+ hours</span>
                    <span>100₽/hr</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Special Packages</h4>
                <div className="space-y-2">
                  {PRICE_PACKAGES.slice(2).map((pkg) => (
                    <div key={pkg.id} className="glass p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{pkg.name}</span>
                        <span className="text-lg font-bold">{pkg.price}₽</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {pkg.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
