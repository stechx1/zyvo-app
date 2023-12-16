import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Poppins, Roboto } from 'next/font/google';

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

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});