/**
 * Centralized storage keys for localStorage
 * Prevents typos and provides a single source of truth
 * Only for data that should persist between sessions and not be in URL
 */
export const STORAGE_KEYS = {
	SELECTED_CHARACTERS: "selected-characters",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
