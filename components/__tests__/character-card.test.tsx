import { mockCharacter1 } from "@/test/mocks/api-data";
import { fireEvent, render, screen } from "@/test/test-utils";
import { CharacterCard } from "../character-card";

describe("CharacterCard", () => {
	const mockOnClick = jest.fn();

	beforeEach(() => {
		mockOnClick.mockClear();
	});

	it("renders character information", () => {
		render(
			<CharacterCard
				character={mockCharacter1}
				isSelected={false}
				onClick={mockOnClick}
			/>,
		);

		expect(screen.getByTestId("character-card")).toBeInTheDocument();
		expect(screen.getByText(mockCharacter1.name)).toBeInTheDocument();
		expect(screen.getByText(mockCharacter1.status)).toBeInTheDocument();
		expect(screen.getByText(mockCharacter1.species)).toBeInTheDocument();
		expect(screen.getByAltText(mockCharacter1.name)).toBeInTheDocument();
	});

	it("calls onClick when clicked", () => {
		render(
			<CharacterCard
				character={mockCharacter1}
				isSelected={false}
				onClick={mockOnClick}
			/>,
		);

		fireEvent.click(screen.getByTestId("character-card"));
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it("applies selected styles when isSelected is true", () => {
		render(
			<CharacterCard
				character={mockCharacter1}
				isSelected={true}
				onClick={mockOnClick}
			/>,
		);

		expect(screen.getByTestId("character-card")).toHaveClass("ring-2");
	});

	it("shows correct status color", () => {
		render(
			<CharacterCard
				character={mockCharacter1}
				isSelected={false}
				onClick={mockOnClick}
			/>,
		);

		// Assuming mockCharacter1 is "Alive"
		expect(screen.getByTestId("character-status")).toHaveClass("bg-green-500");
	});
});
