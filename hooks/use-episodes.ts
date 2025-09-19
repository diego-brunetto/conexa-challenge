"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getMultipleEpisodes } from "@/lib/api";
import type { Character, Episode, EpisodeCategories } from "@/lib/types";
import { extractEpisodeIds } from "@/lib/utils";

interface UseEpisodesResult {
	episodes: EpisodeCategories;
	loading: boolean;
	error: Error | null;
}

export function useEpisodes(
	character1: Character | null,
	character2: Character | null,
): UseEpisodesResult {
	const [episodes, setEpisodes] = useState<EpisodeCategories>({
		character1Only: [],
		shared: [],
		character2Only: [],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// Memoize episode IDs extraction
	const episodeIds = useMemo(() => {
		if (!character1 || !character2) return { char1: [], char2: [], all: [] };

		const char1Ids = extractEpisodeIds(character1.episode);
		const char2Ids = extractEpisodeIds(character2.episode);
		const allIds = Array.from(new Set([...char1Ids, ...char2Ids]));

		return { char1: char1Ids, char2: char2Ids, all: allIds };
	}, [character1, character2]);

	// Memoize episode categorization
	const categorizeEpisodes = useCallback(
		(allEpisodes: Episode[]) => {
			const shared: Episode[] = [];
			const character1Only: Episode[] = [];
			const character2Only: Episode[] = [];

			allEpisodes.forEach((episode) => {
				const inChar1 = episodeIds.char1.includes(episode.id);
				const inChar2 = episodeIds.char2.includes(episode.id);

				if (inChar1 && inChar2) {
					shared.push(episode);
				} else if (inChar1) {
					character1Only.push(episode);
				} else if (inChar2) {
					character2Only.push(episode);
				}
			});

			return { character1Only, shared, character2Only };
		},
		[episodeIds],
	);

	const fetchEpisodes = useCallback(async () => {
		if (!character1 || !character2 || episodeIds.all.length === 0) {
			setEpisodes({ character1Only: [], shared: [], character2Only: [] });
			setError(null);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const allEpisodes = await getMultipleEpisodes(episodeIds.all);
			const categorizedEpisodes = categorizeEpisodes(allEpisodes);
			setEpisodes(categorizedEpisodes);
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
				console.error("Error fetching episodes:", err);
			}
		} finally {
			setLoading(false);
		}
	}, [character1, character2, episodeIds.all, categorizeEpisodes]);

	// Fetch episodes when dependencies change
	useEffect(() => {
		fetchEpisodes();
	}, [fetchEpisodes]);

	return { episodes, loading, error };
}
