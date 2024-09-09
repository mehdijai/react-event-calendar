import { type ClassValue, clsx } from "clsx";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}