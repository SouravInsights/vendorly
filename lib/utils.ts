import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const withoutCountryCode = cleaned.startsWith("91")
    ? cleaned.slice(2)
    : cleaned;

  if (withoutCountryCode.length >= 10) {
    return `+91 ${withoutCountryCode.slice(0, 5)} ${withoutCountryCode.slice(
      5,
      10
    )}`;
  } else if (withoutCountryCode.length > 5) {
    return `+91 ${withoutCountryCode.slice(0, 5)} ${withoutCountryCode.slice(
      5
    )}`;
  } else if (withoutCountryCode.length > 0) {
    return `+91 ${withoutCountryCode}`;
  }
  return "";
}

const VALID_PREFIXES = ["6", "7", "8", "9"];

export function validatePhoneNumber(number: string): boolean {
  const digits = number.replace(/\D/g, "");
  const withoutCountryCode = digits.startsWith("91") ? digits.slice(2) : digits;

  if (withoutCountryCode.length === 0) return true;
  if (withoutCountryCode.length !== 10) return false;
  return VALID_PREFIXES.includes(withoutCountryCode[0]);
}
