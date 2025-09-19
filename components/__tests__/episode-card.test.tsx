import { mockEpisode } from "@/test/mocks/api-data";
import { render, screen } from "@/test/test-utils";
import { EpisodeCard } from "../episode-card";

describe("EpisodeCard", () => {
	it("renders episode information", () => {
		render(<EpisodeCard episode={mockEpisode} />);

		expect(screen.getByText(mockEpisode.name)).toBeInTheDocument();
		expect(screen.getByText(mockEpisode.episode)).toBeInTheDocument();
		expect(screen.getByText(mockEpisode.air_date)).toBeInTheDocument();
	});

	it("shows episode badge with correct variant", () => {
		render(<EpisodeCard episode={mockEpisode} />);

		const badge = screen.getByText(mockEpisode.episode);
		expect(badge).toBeInTheDocument();
		expect(badge.closest('[class*="outline"]')).toBeInTheDocument();
	});
});
