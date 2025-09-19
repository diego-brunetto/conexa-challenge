import { CharacterSelection } from "@/components/character-selection";
import { EpisodesDisplay } from "@/components/episodes-display";
import { CharacterProvider } from "@/contexts/character-context";
import { getCharacters } from "@/lib/api";

export default async function HomePage({
	searchParams,
}: {
	searchParams: { page1?: string; page2?: string };
}) {
	// Get page numbers from URL params, default to 1
	const page1 = parseInt(searchParams.page1 || "1", 10);
	const page2 = parseInt(searchParams.page2 || "1", 10);

	// Fetch characters for both sections in parallel
	const [characters1, characters2] = await Promise.all([
		getCharacters(page1),
		getCharacters(page2),
	]);

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
							initial={{
								characters: characters1.results,
								info: characters1.info,
							}}
							initial2={{
								characters: characters2.results,
								info: characters2.info,
							}}
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
