"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for managing localStorage with SSR safety
 * @param key - The localStorage key
 * @param defaultValue - Default value if no stored value exists
 * @returns [value, setValue] tuple
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
	const [value, setValue] = useState<T>(defaultValue);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		// Mark as hydrated and load from localStorage
		setIsHydrated(true);

		try {
			const stored = localStorage.getItem(key);
			if (stored) {
				setValue(JSON.parse(stored));
			}
		} catch (error) {
			console.warn(`Failed to load from localStorage key "${key}":`, error);
		}
	}, [key]);

	useEffect(() => {
		if (!isHydrated) return;

		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.warn(`Failed to save to localStorage key "${key}":`, error);
		}
	}, [key, value, isHydrated]);

	return [value, setValue] as const;
}
