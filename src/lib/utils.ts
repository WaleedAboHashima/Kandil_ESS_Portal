import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "universal-cookie";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const cookies = new Cookies();