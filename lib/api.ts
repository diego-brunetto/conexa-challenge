import type { ApiResponse, Character, Episode } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_RICKANDMORTY;

type ApiError = { status: number; message: string; endpoint: string };

const DEFAULT_CACHE: RequestInit = {
	cache: "force-cache",
	next: { revalidate: 3600 },
};

async function fetchJSON<T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T> {
	const res = await fetch(`${BASE_URL}${endpoint}`, {
		...DEFAULT_CACHE,
		...options,
	});
	if (!res.ok) {
		const err: ApiError = {
			status: res.status,
			message: `Fetch failed`,
			endpoint,
		};
		throw Object.assign(
			new Error(`${err.message}: ${err.status} ${endpoint}`),
			err,
		);
	}
	return res.json();
}

export async function getCharacters(page = 1) {
	return fetchJSON<ApiResponse<Character>>(`/character?page=${page}`);
}

export async function getMultipleEpisodes(ids: number[]) {
	if (ids.length === 0) return [];
	const data = await fetchJSON<Episode[] | Episode>(
		`/episode/${ids.join(",")}`,
	);
	return Array.isArray(data) ? data : [data];
}
