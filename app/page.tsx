import { CharacterSelection } from "@/components/character-selection";
import { EpisodesDisplay } from "@/components/episodes-display";
import { CharacterProvider } from "@/contexts/character-context";
import { getCharacters } from "@/lib/api";

export default async function HomePage() {
	// Fetch initial characters on the server
	const initial = await getCharacters(1);

	return (
		<CharacterProvider>
			<div className="min-h-screen bg-background">
				{/* Header */}
				<header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
					<div className="container mx-auto px-4 py-6">
						<div className="text-center space-y-2">
							<h1 className="text-3xl md:text-4xl font-bold rick-morty-gradient bg-clip-text text-transparent">
								Rick & Morty Character Explorer
							</h1>
							<p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
								Select two characters to compare the episodes they appear in.
								Discover which adventures they share and which are unique to
								each.
							</p>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="container mx-auto px-4 py-8 space-y-8">
					{/* Character Selection Section */}
					<section>
						<CharacterSelection
							initial={{ characters: initial.results, info: initial.info }}
						/>
					</section>

					{/* Episodes Section */}
					<section>
						<EpisodesDisplay />
					</section>
				</main>
			</div>
		</CharacterProvider>
	);
}
