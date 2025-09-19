/**
 * Centralized storage keys for localStorage
 * Prevents typos and provides a single source of truth
 */
export const STORAGE_KEYS = {
	PAGES: "pages",
	SELECTED_CHARACTERS: "selected-characters",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
