import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getEllipsesText = (text: string, maxLength: number) => {
  if (text.length >= maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
};