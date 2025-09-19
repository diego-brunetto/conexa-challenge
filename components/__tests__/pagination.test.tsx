import { fireEvent, render, screen } from "@/test/test-utils";
import { Pagination } from "../pagination";

describe("Pagination", () => {
	const mockOnChange = jest.fn();

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it("renders page information correctly", () => {
		render(<Pagination page={3} totalPages={10} onChange={mockOnChange} />);

		expect(screen.getByText("3 of 10")).toBeInTheDocument();
		expect(screen.getByText("Previous")).toBeInTheDocument();
		expect(screen.getByText("Next")).toBeInTheDocument();
	});

	it("calls onChange with correct page when Previous is clicked", () => {
		render(<Pagination page={3} totalPages={10} onChange={mockOnChange} />);

		fireEvent.click(screen.getByText("Previous"));
		expect(mockOnChange).toHaveBeenCalledWith(2);
	});

	it("calls onChange with correct page when Next is clicked", () => {
		render(<Pagination page={3} totalPages={10} onChange={mockOnChange} />);

		fireEvent.click(screen.getByText("Next"));
		expect(mockOnChange).toHaveBeenCalledWith(4);
	});

	it("disables Previous button on first page", () => {
		render(<Pagination page={1} totalPages={10} onChange={mockOnChange} />);

		expect(screen.getByText("Previous")).toBeDisabled();
		expect(screen.getByText("Next")).not.toBeDisabled();
	});

	it("disables Next button on last page", () => {
		render(<Pagination page={10} totalPages={10} onChange={mockOnChange} />);

		expect(screen.getByText("Next")).toBeDisabled();
		expect(screen.getByText("Previous")).not.toBeDisabled();
	});

	it("disables both buttons when disabled prop is true", () => {
		render(
			<Pagination
				page={5}
				totalPages={10}
				disabled={true}
				onChange={mockOnChange}
			/>,
		);

		expect(screen.getByText("Previous")).toBeDisabled();
		expect(screen.getByText("Next")).toBeDisabled();
	});

	it("does not call onChange when disabled buttons are clicked", () => {
		render(<Pagination page={1} totalPages={10} onChange={mockOnChange} />);

		fireEvent.click(screen.getByText("Previous"));
		expect(mockOnChange).not.toHaveBeenCalled();
	});
});
