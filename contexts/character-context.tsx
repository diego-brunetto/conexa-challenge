"use client";

import { createContext, type ReactNode, useContext } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/storage-keys";
import type { Character, SelectedCharacters } from "@/lib/types";

interface CharacterContextType {
	selectedCharacters: SelectedCharacters;
	handleCharacterSelect: (character: Character, position: 1 | 2) => void;
	clearSelection: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
	undefined,
);

interface CharacterProviderProps {
	children: ReactNode;
}

export function CharacterProvider({ children }: CharacterProviderProps) {
	const [selectedCharacters, setSelectedCharacters] =
		useLocalStorage<SelectedCharacters>(STORAGE_KEYS.SELECTED_CHARACTERS, {
			character1: null,
			character2: null,
		});

	const handleCharacterSelect = (character: Character, position: 1 | 2) => {
		setSelectedCharacters((prev) => ({
			...prev,
			[`character${position}`]: character,
		}));
	};

	const clearSelection = () => {
		setSelectedCharacters({ character1: null, character2: null });
	};

	return (
		<CharacterContext.Provider
			value={{ selectedCharacters, handleCharacterSelect, clearSelection }}
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
