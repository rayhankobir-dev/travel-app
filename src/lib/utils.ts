import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(isoString: string): {
  date: string;
  time: string;
} {
  const date = new Date(isoString);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "2-digit",
  });

  const dateFormatted = dateFormatter.format(date);

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const timeFormatted = timeFormatter.format(date);

  return { date: dateFormatted, time: timeFormatted };
}
