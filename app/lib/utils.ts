import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function separateFirstLine(text: string) {
  const lines = text.trimStart().split("\n"); // Trim any leading newlines or spaces
  const firstLine = lines[0].trim(); // Trim the first line's whitespace
  const rest = lines.slice(1).join("\n"); // Join the remaining lines
  return {
    firstLine,
    rest,
  };
}
