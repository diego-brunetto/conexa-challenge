import { mockCharacter1, mockCharacter2 } from "@/test/mocks/api-data";
import { render, screen } from "@/test/test-utils";
import { CharacterSelection } from "../character-selection";

// Mock the hooks and context
jest.mock("@/contexts/character-context", () => ({
	useCharacterContext: () => ({
		selectedCharacters: {
			character1: null,
			character2: null,
		},
		handleCharacterSelect: jest.fn(),
	}),
}));

jest.mock("@/hooks/use-character-selection", () => ({
	useCharacterSelection: ({
		characterPosition,
	}: {
		characterPosition: number;
	}) => ({
		characters: characterPosition === 1 ? [mockCharacter1] : [mockCharacter2],
		loading: false,
		page: 1,
		info: { pages: 5 },
		setPage: jest.fn(),
	}),
}));

describe("CharacterSelection", () => {
	const mockInitial = {
		characters: [mockCharacter1],
		info: { count: 1, pages: 1, next: null, prev: null },
	};

	const mockInitial2 = {
		characters: [mockCharacter2],
		info: { count: 1, pages: 1, next: null, prev: null },
	};

	it("renders both character lists", () => {
		render(
			<CharacterSelection initial={mockInitial} initial2={mockInitial2} />,
		);

		expect(screen.getByText("Character #1")).toBeInTheDocument();
		expect(screen.getByText("Character #2")).toBeInTheDocument();
	});

	it("displays characters in both lists", () => {
		render(
			<CharacterSelection initial={mockInitial} initial2={mockInitial2} />,
		);

		expect(screen.getByText(mockCharacter1.name)).toBeInTheDocument();
		expect(screen.getByText(mockCharacter2.name)).toBeInTheDocument();
	});

	it("renders grid layout", () => {
		const { container } = render(
			<CharacterSelection initial={mockInitial} initial2={mockInitial2} />,
		);

		expect(
			container.querySelector(".grid-cols-1.lg\\:grid-cols-2"),
		).toBeInTheDocument();
	});
});
