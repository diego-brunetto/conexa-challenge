"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Character } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CharacterCard } from "./character-card";
import { Pagination } from "./pagination";

interface CharacterListProps {
	title: string;
	characters: Character[];
	selectedCharacter: Character | null;
	onCharacterSelect: (character: Character) => void;
	loading: boolean;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function CharacterList({
	title,
	characters,
	selectedCharacter,
	onCharacterSelect,
	loading,
	currentPage,
	totalPages,
	onPageChange,
}: CharacterListProps) {
	return (
		<Card
			data-testid="character-list"
			className={cn(
				"h-fit transition-all duration-300",
				selectedCharacter && "portal-glow",
			)}
		>
			<CardHeader className="pb-4">
				<CardTitle
					data-testid="character-list-title"
					className="text-lg font-bold text-center rick-morty-gradient bg-clip-text text-transparent"
				>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div
					data-testid="characters-grid"
					className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-[1200px]"
				>
					{loading
						? Array.from({ length: 20 }).map((_, i) => (
								<div
									key={i}
									data-testid={`skeleton-${i}`}
									className="flex items-center space-x-4 p-4 rounded-lg border animate-pulse"
								>
									<Skeleton className="w-16 h-16 rounded-full" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-4 w-3/4" />
										<Skeleton className="h-3 w-1/2" />
										<Skeleton className="h-3 w-1/3" />
									</div>
								</div>
							))
						: characters.map((character) => (
								<CharacterCard
									key={character.id}
									character={character}
									isSelected={selectedCharacter?.id === character.id}
									onClick={() => onCharacterSelect(character)}
								/>
							))}
				</div>

				{/* Pagination */}
				<Pagination
					page={currentPage}
					totalPages={totalPages}
					disabled={loading}
					onChange={onPageChange}
				/>
			</CardContent>
		</Card>
	);
}
