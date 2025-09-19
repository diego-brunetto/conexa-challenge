"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for managing localStorage with SSR safety
 * @param key - The localStorage key
 * @param defaultValue - Default value if no stored value exists
 * @returns [value, setValue] tuple
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === "undefined") return defaultValue;

		try {
			const stored = localStorage.getItem(key);
			return stored ? JSON.parse(stored) : defaultValue;
		} catch {
			return defaultValue;
		}
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.warn(`Failed to save to localStorage key "${key}":`, error);
		}
	}, [key, value]);

	return [value, setValue] as const;
}
