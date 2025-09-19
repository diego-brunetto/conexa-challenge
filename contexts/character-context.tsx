"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { Character, SelectedCharacters } from "@/lib/types";

interface CharacterContextType {
	selectedCharacters: SelectedCharacters;
	handleCharacterSelect: (character: Character, position: 1 | 2) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
	undefined,
);

interface CharacterProviderProps {
	children: ReactNode;
}

export function CharacterProvider({ children }: CharacterProviderProps) {
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
		<CharacterContext.Provider
			value={{ selectedCharacters, handleCharacterSelect }}
		>
			{children}
		</CharacterContext.Provider>
	);
}

export function useCharacterContext() {
	const context = useContext(CharacterContext);
	if (context === undefined) {
		throw new Error(
			"useCharacterContext must be used within a CharacterProvider",
		);
	}
	return context;
}
