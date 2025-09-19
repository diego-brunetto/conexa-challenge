import { act, renderHook, waitFor } from "@testing-library/react";
import * as api from "@/lib/api";
import * as utils from "@/lib/utils";
import {
	mockCharacter1,
	mockCharacter2,
	mockEpisode,
} from "@/test/mocks/api-data";
import { useEpisodes } from "../use-episodes";

// Mock API and utils
jest.mock("@/lib/api");
jest.mock("@/lib/utils");

describe("useEpisodes", () => {
	const mockGetMultipleEpisodes = jest.mocked(api.getMultipleEpisodes);
	const mockExtractEpisodeIds = jest.mocked(utils.extractEpisodeIds);

	beforeEach(() => {
		mockGetMultipleEpisodes.mockClear();
		mockExtractEpisodeIds.mockClear();
		jest.spyOn(console, "error").mockImplementation();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("returns empty episodes when no characters selected", () => {
		const { result } = renderHook(() => useEpisodes(null, null));

		expect(result.current.episodes).toEqual({
			character1Only: [],
			shared: [],
			character2Only: [],
		});
		expect(result.current.loading).toBe(false);
	});

	it("categorizes episodes correctly", async () => {
		// Mock episode IDs extraction
		mockExtractEpisodeIds
			.mockReturnValueOnce([1, 2, 3]) // character1 episodes
			.mockReturnValueOnce([2, 3, 4]); // character2 episodes

		// Mock API response
		const mockEpisodes = [
			{ ...mockEpisode, id: 1 }, // character1 only
			{ ...mockEpisode, id: 2 }, // shared
			{ ...mockEpisode, id: 3 }, // shared
			{ ...mockEpisode, id: 4 }, // character2 only
		];
		mockGetMultipleEpisodes.mockResolvedValue(mockEpisodes);

		const { result } = renderHook(() =>
			useEpisodes(mockCharacter1, mockCharacter2),
		);

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.episodes.character1Only).toHaveLength(1);
		expect(result.current.episodes.shared).toHaveLength(2);
		expect(result.current.episodes.character2Only).toHaveLength(1);
	});

	it("handles API errors", async () => {
		mockExtractEpisodeIds.mockReturnValue([1, 2]);
		const error = new Error("API Error");
		mockGetMultipleEpisodes.mockRejectedValue(error);

		const { result } = renderHook(() =>
			useEpisodes(mockCharacter1, mockCharacter2),
		);

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toEqual(error);
	});

	it("fetches episodes when characters change", async () => {
		mockExtractEpisodeIds.mockReturnValue([1]);
		mockGetMultipleEpisodes.mockResolvedValue([mockEpisode]);

		const { rerender } = renderHook(
			({ char1, char2 }) => useEpisodes(char1, char2),
			{
				initialProps: { char1: mockCharacter1, char2: mockCharacter2 },
			},
		);

		await act(async () => {
			// Change characters
			rerender({ char1: mockCharacter2, char2: mockCharacter1 });
		});

		await waitFor(() => {
			expect(mockGetMultipleEpisodes).toHaveBeenCalledTimes(2);
		});
	});

	it("shows loading state during fetch", async () => {
		mockExtractEpisodeIds.mockReturnValue([1]);
		mockGetMultipleEpisodes.mockImplementation(
			() =>
				new Promise((resolve) => setTimeout(() => resolve([mockEpisode]), 100)),
		);

		const { result } = renderHook(() =>
			useEpisodes(mockCharacter1, mockCharacter2),
		);

		expect(result.current.loading).toBe(true);

		// Wait for loading to finish
		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});
	});
});
