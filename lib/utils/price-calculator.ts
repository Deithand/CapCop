export interface PricePackage {
  id: string;
  name: string;
  hours: number;
  price: number;
  description: string;
}

export const PRICE_PACKAGES: PricePackage[] = [
  {
    id: "1hr",
    name: "1 Hour",
    hours: 1,
    price: 150,
    description: "Perfect for quick gaming session",
  },
  {
    id: "3hr",
    name: "3 Hours",
    hours: 3,
    price: 400,
    description: "Save 50₽ compared to hourly",
  },
  {
    id: "night",
    name: "Night Package",
    hours: 8,
    price: 900,
    description: "8 hours from 22:00 to 6:00",
  },
  {
    id: "day",
    name: "Day Package",
    hours: 12,
    price: 1200,
    description: "All-day gaming from 10:00",
  },
];

export function calculateHourlyRate(hours: number): number {
  if (hours >= 8) return 100;
  if (hours >= 3) return 130;
  return 150;
}

export function calculateTotalPrice(hours: number): number {
  return calculateHourlyRate(hours) * hours;
}

export function applyDiscount(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}
