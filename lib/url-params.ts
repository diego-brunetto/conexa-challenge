/**
 * Centralized URL parameters for the application
 * Prevents typos and provides a single source of truth for URL params
 */
export const URL_PARAMS = {
	CHAR_1_PAGE: "char-1-page",
	CHAR_2_PAGE: "char-2-page",
} as const;

export type UrlParam = (typeof URL_PARAMS)[keyof typeof URL_PARAMS];
