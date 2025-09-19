import {
	mockCharacter1,
	mockCharacter2,
	mockEpisode,
} from "@/test/mocks/api-data";
import { render, screen } from "@/test/test-utils";
import { EpisodesDisplay } from "../episodes-display";

// Mock the hooks and context
const mockUseCharacterContext = jest.fn();
const mockUseEpisodes = jest.fn();

jest.mock("@/contexts/character-context", () => ({
	useCharacterContext: () => mockUseCharacterContext(),
}));

jest.mock("@/hooks/use-episodes", () => ({
	useEpisodes: () => mockUseEpisodes(),
}));

describe("EpisodesDisplay", () => {
	beforeEach(() => {
		mockUseCharacterContext.mockClear();
		mockUseEpisodes.mockClear();

		// Default mock return values
		mockUseEpisodes.mockReturnValue({
			episodes: {
				character1Only: [],
				shared: [],
				character2Only: [],
			},
			loading: false,
			error: null,
		});
	});

	it("shows selection prompt when no characters selected", () => {
		mockUseCharacterContext.mockReturnValue({
			selectedCharacters: {
				character1: null,
				character2: null,
			},
		});

		render(<EpisodesDisplay />);

		expect(
			screen.getByText("Select two characters to view the episodes"),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Select two characters to view their episodes/),
		).toBeInTheDocument();
	});

	it("shows error message when episodes fail to load", () => {
		mockUseCharacterContext.mockReturnValue({
			selectedCharacters: {
				character1: mockCharacter1,
				character2: mockCharacter2,
			},
		});

		mockUseEpisodes.mockReturnValue({
			episodes: { character1Only: [], shared: [], character2Only: [] },
			loading: false,
			error: new Error("Failed to load episodes"),
		});

		render(<EpisodesDisplay />);

		expect(screen.getByText("Error loading episodes")).toBeInTheDocument();
		expect(screen.getByText("Failed to load episodes")).toBeInTheDocument();
	});

	it("renders episode comparison when both characters selected", () => {
		mockUseCharacterContext.mockReturnValue({
			selectedCharacters: {
				character1: mockCharacter1,
				character2: mockCharacter2,
			},
		});

		mockUseEpisodes.mockReturnValue({
			episodes: {
				character1Only: [mockEpisode],
				shared: [mockEpisode],
				character2Only: [mockEpisode],
			},
			loading: false,
			error: null,
		});

		render(<EpisodesDisplay />);

		expect(screen.getByText("Episode Comparison")).toBeInTheDocument();
		expect(screen.getByText(/Comparing episodes between/)).toBeInTheDocument();
		expect(screen.getByText(mockCharacter1.name)).toBeInTheDocument();
		expect(screen.getByText(mockCharacter2.name)).toBeInTheDocument();
	});

	it("renders three episode sections with correct titles", () => {
		mockUseCharacterContext.mockReturnValue({
			selectedCharacters: {
				character1: mockCharacter1,
				character2: mockCharacter2,
			},
		});

		mockUseEpisodes.mockReturnValue({
			episodes: {
				character1Only: [],
				shared: [],
				character2Only: [],
			},
			loading: false,
			error: null,
		});

		render(<EpisodesDisplay />);

		expect(
			screen.getByText(`${mockCharacter1.name} - Alone`),
		).toBeInTheDocument();
		expect(screen.getByText("Shared Episodes")).toBeInTheDocument();
		expect(
			screen.getByText(`${mockCharacter2.name} - Alone`),
		).toBeInTheDocument();
	});

	it("passes loading state to episode sections", () => {
		mockUseCharacterContext.mockReturnValue({
			selectedCharacters: {
				character1: mockCharacter1,
				character2: mockCharacter2,
			},
		});

		mockUseEpisodes.mockReturnValue({
			episodes: {
				character1Only: [],
				shared: [],
				character2Only: [],
			},
			loading: true,
			error: null,
		});

		render(<EpisodesDisplay />);

		// Verify the component renders (EpisodeSection handles loading internally)
		expect(screen.getByText("Episode Comparison")).toBeInTheDocument();
	});
});
