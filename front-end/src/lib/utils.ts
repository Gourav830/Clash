import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ENV from "./env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (img: string):string => {
  return `${ENV.BACKEND_URL}/images/${img}`
}