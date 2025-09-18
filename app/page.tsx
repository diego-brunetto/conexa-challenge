"use client";

import { useState } from "react";
import { CharacterSelection } from "@/components/character-selection";
import { EpisodesDisplay } from "@/components/episodes-display";
import type { Character, SelectedCharacters } from "@/lib/types";

export default function HomePage() {
	const [selectedCharacters, setSelectedCharacters] =
		useState<SelectedCharacters>({
			character1: null,
			character2: null,
		});

	const handleCharacterSelect = (character: Character, position: 1 | 2) => {
		setSelectedCharacters((prev) => ({
			...prev,
			[`character${position}`]: character,
		}));
	};

	return (
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
							Discover which adventures they share and which are unique to each.
						</p>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8 space-y-8">
				{/* Character Selection Section */}
				<section>
					<CharacterSelection
						selectedCharacters={selectedCharacters}
						onCharacterSelect={handleCharacterSelect}
					/>
				</section>

				{/* Episodes Section */}
				<section>
					<EpisodesDisplay
						character1={selectedCharacters.character1}
						character2={selectedCharacters.character2}
					/>
				</section>
			</main>
		</div>
	);
}
