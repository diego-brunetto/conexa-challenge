"use client";

import RickAndMorty from "@/app/icons/rick-and-morty";
import { useCharacterContext } from "@/contexts/character-context";
import { useEpisodes } from "@/hooks/use-episodes";
import { EpisodeSection } from "./episode-section";

export function EpisodesDisplay() {
	const { selectedCharacters } = useCharacterContext();
	const { episodes, loading, error } = useEpisodes(
		selectedCharacters.character1,
		selectedCharacters.character2,
	);

	if (!selectedCharacters.character1 || !selectedCharacters.character2) {
		return (
			<div className="text-center py-16 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25">
				<div className="space-y-4 max-w-md mx-auto">
					<div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
						<RickAndMorty />
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-muted-foreground">
							Select two characters to view the episodes
						</h3>
						<p className="text-sm text-muted-foreground text-pretty">
							Select two characters to view their episodes and discover which
							adventures they share
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-16 bg-destructive/10 rounded-lg border-2 border-destructive/25">
				<div className="space-y-4 max-w-md mx-auto">
					<div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
						<RickAndMorty />
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-destructive">
							Error loading episodes
						</h3>
						<p className="text-sm text-destructive/80 text-pretty">
							{error.message}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="text-center space-y-3">
				<h2 className="text-2xl font-bold rick-morty-gradient bg-clip-text text-transparent">
					Episode Comparison
				</h2>
				<p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
					Comparing episodes between{" "}
					<span className="font-semibold text-primary">
						{selectedCharacters.character1.name}
					</span>{" "}
					and{" "}
					<span className="font-semibold text-primary">
						{selectedCharacters.character2.name}
					</span>
					. Discover which adventures they share and which are exclusive to each
					character.
				</p>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
				<EpisodeSection
					title={`${selectedCharacters.character1.name} - Alone`}
					episodes={episodes.character1Only}
					loading={loading}
					emptyMessage={`${selectedCharacters.character1.name} has no exclusive episodes`}
					variant="character1"
				/>

				<EpisodeSection
					title="Shared Episodes"
					episodes={episodes.shared}
					loading={loading}
					emptyMessage="These characters do not share episodes"
					variant="shared"
				/>

				<EpisodeSection
					title={`${selectedCharacters.character2.name} - Alone`}
					episodes={episodes.character2Only}
					loading={loading}
					emptyMessage={`${selectedCharacters.character2.name} has no exclusive episodes`}
					variant="character2"
				/>
			</div>
		</div>
	);
}
