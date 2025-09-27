"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ApiResponse, Character } from "@/lib/types";
import { URL_PARAMS } from "@/lib/url-params";

interface UseCharacterSelectionResult {
	characters: Character[];
	info: ApiResponse<Character>["info"] | null;
	loading: boolean;
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
	const [isNavigating, setIsNavigating] = useState(false);

	// Update state when initial prop changes (server-side navigation)
	useEffect(() => {
		setCharacters(initial.characters);
		setInfo(initial.info);
		setIsNavigating(false);
	}, [initial.characters, initial.info]);

	// Get page from URL params
	const pageParam =
		characterPosition === 1 ? URL_PARAMS.CHAR_1_PAGE : URL_PARAMS.CHAR_2_PAGE;
	const page = parseInt(searchParams.get(pageParam) || "1", 10);

	const setPage = useCallback(
		(newPage: number) => {
			setIsNavigating(true);
			const params = new URLSearchParams(searchParams);
			params.set(pageParam, newPage.toString());
			router.push(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams, pageParam],
	);

	return { characters, info, loading: isNavigating, page, setPage };
}
