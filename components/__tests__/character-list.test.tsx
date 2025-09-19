import { mockCharacter1, mockCharacter2 } from "@/test/mocks/api-data";
import { fireEvent, render, screen } from "@/test/test-utils";
import { CharacterList } from "../character-list";

describe("CharacterList", () => {
	const mockOnCharacterSelect = jest.fn();
	const mockOnPageChange = jest.fn();
	const mockCharacters = [mockCharacter1, mockCharacter2];

	beforeEach(() => {
		mockOnCharacterSelect.mockClear();
		mockOnPageChange.mockClear();
	});

	it("renders title and characters", () => {
		render(
			<CharacterList
				title="Test Characters"
				characters={mockCharacters}
				selectedCharacter={null}
				onCharacterSelect={mockOnCharacterSelect}
				loading={false}
				currentPage={1}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		expect(screen.getByText("Test Characters")).toBeInTheDocument();
		expect(screen.getByTestId("characters-grid")).toBeInTheDocument();
		expect(screen.getByText(mockCharacter1.name)).toBeInTheDocument();
		expect(screen.getByText(mockCharacter2.name)).toBeInTheDocument();
	});

	it("shows loading skeletons when loading", () => {
		render(
			<CharacterList
				title="Test Characters"
				characters={[]}
				selectedCharacter={null}
				onCharacterSelect={mockOnCharacterSelect}
				loading={true}
				currentPage={1}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		// Check that characters grid exists but no character cards are rendered
		expect(screen.getByTestId("characters-grid")).toBeInTheDocument();
		expect(screen.queryByTestId("character-card")).not.toBeInTheDocument();

		// Or check for skeleton structure
		const skeletons = screen.getAllByTestId(/skeleton-\d+/);
		expect(skeletons).toHaveLength(20);
	});

	it("calls onCharacterSelect when character is clicked", () => {
		render(
			<CharacterList
				title="Test Characters"
				characters={mockCharacters}
				selectedCharacter={null}
				onCharacterSelect={mockOnCharacterSelect}
				loading={false}
				currentPage={1}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		fireEvent.click(screen.getByText(mockCharacter1.name));
		expect(mockOnCharacterSelect).toHaveBeenCalledWith(mockCharacter1);
	});

	it("highlights selected character", () => {
		render(
			<CharacterList
				title="Test Characters"
				characters={mockCharacters}
				selectedCharacter={mockCharacter1}
				onCharacterSelect={mockOnCharacterSelect}
				loading={false}
				currentPage={1}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		expect(screen.getByTestId("character-list")).toHaveClass("portal-glow");
	});

	it("renders pagination component", () => {
		render(
			<CharacterList
				title="Test Characters"
				characters={mockCharacters}
				selectedCharacter={null}
				onCharacterSelect={mockOnCharacterSelect}
				loading={false}
				currentPage={2}
				totalPages={5}
				onPageChange={mockOnPageChange}
			/>,
		);

		expect(screen.getByText("2 of 5")).toBeInTheDocument();
		expect(screen.getByText("Previous")).toBeInTheDocument();
		expect(screen.getByText("Next")).toBeInTheDocument();
	});
});
