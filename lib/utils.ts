import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractEpisodeId(url: string): number {
	return Number.parseInt(url.split("/").pop() || "0");
}

export function extractEpisodeIds(urls: string[]): number[] {
	return urls.map((url) => extractEpisodeId(url));
}
