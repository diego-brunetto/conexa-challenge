import { act, renderHook } from "@testing-library/react";
import { mockCharacter1, mockCharacter2 } from "@/test/mocks/api-data";
import { useCharacterSelection } from "../use-character-selection";

// Mock Next.js navigation
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
	useRouter: () => ({ push: mockPush }),
	useSearchParams: () => mockSearchParams,
}));

describe("useCharacterSelection", () => {
	const mockInitial = {
		characters: [mockCharacter1],
		info: { count: 1, pages: 5, next: null, prev: null },
	};

	beforeEach(() => {
		mockPush.mockClear();
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

	it("updates URL when setPage is called for character position 1", () => {
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

	it("updates URL when setPage is called for character position 2", () => {
		const { result } = renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 2,
			}),
		);

		act(() => {
			result.current.setPage(4);
		});

		expect(mockPush).toHaveBeenCalledWith("?char-2-page=4", { scroll: false });
	});

	it("sets loading state when navigating", () => {
		const { result } = renderHook(() =>
			useCharacterSelection({
				initial: mockInitial,
				characterPosition: 1,
			}),
		);

		act(() => {
			result.current.setPage(2);
		});

		expect(result.current.loading).toBe(true);
	});

	it("updates state when initial prop changes (server navigation)", () => {
		const { result, rerender } = renderHook(
			({ initial }) =>
				useCharacterSelection({
					initial,
					characterPosition: 1,
				}),
			{
				initialProps: { initial: mockInitial },
			},
		);

		// Initial state
		expect(result.current.characters).toEqual([mockCharacter1]);
		expect(result.current.loading).toBe(false);

		// Simulate navigation by setting loading state
		act(() => {
			result.current.setPage(2);
		});
		expect(result.current.loading).toBe(true);

		// Simulate server response with new data
		const newInitial = {
			characters: [mockCharacter2],
			info: { count: 2, pages: 5, next: null, prev: null },
		};

		rerender({ initial: newInitial });

		// State should update with new data and loading should be false
		expect(result.current.characters).toEqual([mockCharacter2]);
		expect(result.current.info).toEqual(newInitial.info);
		expect(result.current.loading).toBe(false);
	});
});
