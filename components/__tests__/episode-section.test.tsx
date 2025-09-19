import { mockEpisode } from "@/test/mocks/api-data";
import { fireEvent, render, screen } from "@/test/test-utils";
import { EpisodeSection } from "../episode-section";

describe("EpisodeSection", () => {
	const mockEpisodes = Array.from({ length: 15 }, (_, i) => ({
		...mockEpisode,
		id: i + 1,
		name: `Episode ${i + 1}`,
	}));

	it("renders title and episode count", () => {
		render(
			<EpisodeSection
				title="Test Episodes"
				episodes={mockEpisodes}
				loading={false}
			/>,
		);

		expect(screen.getByText("Test Episodes")).toBeInTheDocument();
		expect(screen.getByText("15")).toBeInTheDocument();
	});

	it("shows loading skeleton when loading", () => {
		render(
			<EpisodeSection title="Test Episodes" episodes={[]} loading={true} />,
		);

		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
	});

	it("displays empty message when no episodes", () => {
		render(
			<EpisodeSection
				title="Test Episodes"
				episodes={[]}
				loading={false}
				emptyMessage="No episodes found"
			/>,
		);

		expect(screen.getByText("No episodes found")).toBeInTheDocument();
	});

	it("renders episodes in grid", () => {
		render(
			<EpisodeSection
				title="Test Episodes"
				episodes={mockEpisodes.slice(0, 5)}
				loading={false}
			/>,
		);

		expect(screen.getByTestId("episodes-grid")).toBeInTheDocument();
		expect(screen.getByText("Episode 1")).toBeInTheDocument();
		expect(screen.getByText("Episode 5")).toBeInTheDocument();
	});

	it("shows pagination when more than 10 episodes", () => {
		render(
			<EpisodeSection
				title="Test Episodes"
				episodes={mockEpisodes}
				loading={false}
			/>,
		);

		expect(screen.getByText("1 of 2")).toBeInTheDocument();
		expect(screen.getByText("Next")).toBeInTheDocument();
	});

	it("applies correct variant styles", () => {
		render(
			<EpisodeSection
				title="Shared Episodes"
				episodes={mockEpisodes}
				loading={false}
				variant="shared"
			/>,
		);

		expect(screen.getByTestId("episode-section")).toHaveClass(
			"border-l-primary",
		);
		expect(screen.getByTestId("episode-section")).toHaveClass("portal-glow");
	});

	it("changes page when pagination is clicked", () => {
		render(
			<EpisodeSection
				title="Test Episodes"
				episodes={mockEpisodes}
				loading={false}
			/>,
		);

		// Click next page
		fireEvent.click(screen.getByText("Next"));
		expect(screen.getByText("2 of 2")).toBeInTheDocument();
	});
});
