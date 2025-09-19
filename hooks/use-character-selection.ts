"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getCharacters } from "@/lib/api";
import type { ApiResponse, Character } from "@/lib/types";
import { URL_PARAMS } from "@/lib/url-params";

interface UseCharacterSelectionResult {
	characters: Character[];
	info: ApiResponse<Character>["info"] | null;
	loading: boolean;
	error: Error | null;
	page: number;
	setPage: (page: number) => void;
}

interface UseCharacterSelectionProps {
	initial: {
		characters: Character[];
		info: ApiResponse<Character>["info"] | null;
	};
	characterPosition: 1 | 2;
}

export function useCharacterSelection({
	initial,
	characterPosition,
}: UseCharacterSelectionProps): UseCharacterSelectionResult {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [characters, setCharacters] = useState<Character[]>(initial.characters);
	const [info, setInfo] = useState<ApiResponse<Character>["info"] | null>(
		initial.info,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// Get page from URL params
	const pageParam =
		characterPosition === 1 ? URL_PARAMS.CHAR_1_PAGE : URL_PARAMS.CHAR_2_PAGE;
	const page = parseInt(searchParams.get(pageParam) || "1", 10);

	const setPage = useCallback(
		(newPage: number) => {
			const params = new URLSearchParams(searchParams);
			params.set(pageParam, newPage.toString());
			router.push(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams, pageParam],
	);

	const fetchCharacters = useCallback(async (pageNumber: number) => {
		setLoading(true);
		setError(null);
		try {
			const response = await getCharacters(pageNumber);
			setCharacters(response.results);
			setInfo(response.info);
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	}, []);

	// Only fetch when page changes and not 1 (page 1 data comes from SSR)
	useEffect(() => {
		if (page === 1) return;
		fetchCharacters(page);
	}, [page, fetchCharacters]);

	return { characters, info, loading, error, page, setPage };
}
