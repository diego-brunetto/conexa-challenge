import { act, renderHook } from "@testing-library/react";
import * as api from "@/lib/api";
import { mockCharacter1, mockCharacter2 } from "@/test/mocks/api-data";
import { useCharacterSelection } from "../use-character-selection";

// Mock Next.js navigation
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
	useRouter: () => ({ push: mockPush }),
	useSearchParams: () => mockSearchParams,
}));

// Mock API module
jest.mock("@/lib/api");

describe("useCharacterSelection", () => {
	const mockGetCharacters = jest.mocked(api.getCharacters);

	const mockInitial = {
		characters: [mockCharacter1],
		info: { count: 1, pages: 5, next: null, prev: null },
	};

	beforeEach(() => {
		mockPush.mockClear();
		mockGetCharacters.mockClear();
		mockSearchParams.forEach((_, key) => mockSearchParams.delete(key));
	});

	it("initializes with provided data", () => {
		const { result } = renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 1,
			}),
		);

		expect(result.current.characters).toEqual([mockCharacter1]);
		expect(result.current.info).toEqual(mockInitial.info);
		expect(result.current.loading).toBe(false);
		expect(result.current.page).toBe(1);
	});

	it("reads page from URL params for character position 1", () => {
		mockSearchParams.set("char-1-page", "3");

		const { result } = renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 1,
			}),
		);

		expect(result.current.page).toBe(3);
	});

	it("reads page from URL params for character position 2", () => {
		mockSearchParams.set("char-2-page", "2");

		const { result } = renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 2,
			}),
		);

		expect(result.current.page).toBe(2);
	});

	it("updates URL when setPage is called", () => {
		const { result } = renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 1,
			}),
		);

		act(() => {
			result.current.setPage(3);
		});

		expect(mockPush).toHaveBeenCalledWith("?char-1-page=3", { scroll: false });
	});

	it("fetches characters when page changes (not page 1)", async () => {
		mockGetCharacters.mockResolvedValue({
			results: [mockCharacter2],
			info: { count: 1, pages: 5, next: null, prev: null },
		});

		mockSearchParams.set("char-1-page", "2");

		renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 1,
			}),
		);

		// Wait for useEffect to run
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		expect(mockGetCharacters).toHaveBeenCalledWith(2);
	});

	it("does not fetch for page 1 (SSR data)", () => {
		renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 1,
			}),
		);

		expect(mockGetCharacters).not.toHaveBeenCalled();
	});

	it("handles API errors", async () => {
		const error = new Error("API Error");
		mockGetCharacters.mockRejectedValue(error);
		mockSearchParams.set("char-1-page", "2");

		const { result } = renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 1,
			}),
		);

		// Wait for error to be set
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
		});

		expect(result.current.error).toEqual(error);
	});
});
