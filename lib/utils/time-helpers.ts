import { format, differenceInSeconds, addHours, addMinutes } from "date-fns";

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function getTimeRemaining(endTime: Date): number {
  const now = new Date();
  const remaining = differenceInSeconds(endTime, now);
  return remaining > 0 ? remaining : 0;
}

export function calculateSessionProgress(
  startTime: Date,
  endTime: Date
): number {
  const now = new Date();
  const total = differenceInSeconds(endTime, startTime);
  const elapsed = differenceInSeconds(now, startTime);
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function extendSession(
  currentEndTime: Date,
  hours: number
): Date {
  return addHours(currentEndTime, hours);
}

export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} ₽`;
}

export function getSessionWarningLevel(secondsRemaining: number): "none" | "warning" | "critical" {
  if (secondsRemaining > 15 * 60) return "none";
  if (secondsRemaining > 5 * 60) return "warning";
  return "critical";
}
