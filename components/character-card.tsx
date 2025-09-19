"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Character } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CharacterCardProps {
	character: Character;
	isSelected: boolean;
	onClick: () => void;
}

export function CharacterCard({
	character,
	isSelected,
	onClick,
}: CharacterCardProps) {
	const getStatusColor = (status: Character["status"]) => {
		switch (status) {
			case "Alive":
				return "bg-green-500 shadow-green-500/50";
			case "Dead":
				return "bg-red-500 shadow-red-500/50";
			default:
				return "bg-gray-500 shadow-gray-500/50";
		}
	};

	return (
		<Card
			className={cn(
				"cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:portal-glow h-fit",
				isSelected && "ring-2 ring-primary shadow-lg portal-glow sci-fi-border",
			)}
			onClick={onClick}
		>
			<CardContent className="p-4">
				<div className="flex items-center space-x-4">
					<div className="relative">
						<Image
							src={character.image}
							alt={character.name}
							width={64}
							height={64}
							className={cn(
								"rounded-full object-cover border-2 transition-all duration-300",
								isSelected ? "border-primary shadow-lg" : "border-border",
							)}
						/>
						<div
							className={cn(
								"absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm",
								getStatusColor(character.status),
							)}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<h3
							className={cn(
								"font-semibold text-sm truncate transition-colors duration-300",
								isSelected && "text-primary",
							)}
						>
							{character.name}
						</h3>
						<div className="flex flex-col gap-1 mt-1">
							<Badge
								variant={isSelected ? "default" : "secondary"}
								className={cn(
									"text-xs w-fit transition-all duration-300",
									isSelected && "rick-morty-gradient text-primary-foreground",
								)}
							>
								{character.status}
							</Badge>
							<p className="text-xs text-muted-foreground truncate">
								{character.species}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
