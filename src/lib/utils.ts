import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("uz-UZ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + " so'm";
}

export function formatUZS(amount: number): string {
  return new Intl.NumberFormat("uz-UZ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + " UZS";
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("uz-UZ").format(num);
}
