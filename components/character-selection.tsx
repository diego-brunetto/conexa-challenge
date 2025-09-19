"use client";

import { useCharacterContext } from "@/contexts/character-context";
import { useCharacterSelection } from "@/hooks/use-character-selection";
import type { ApiResponse, Character } from "@/lib/types";
import { CharacterList } from "./character-list";

interface CharacterSelectionProps {
	initial: {
		characters: Character[];
		info: ApiResponse<Character>["info"] | null;
	};
	initial2: {
		characters: Character[];
		info: ApiResponse<Character>["info"] | null;
	};
}

export function CharacterSelection({
	initial,
	initial2,
}: CharacterSelectionProps) {
	const { selectedCharacters, handleCharacterSelect } = useCharacterContext();

	const cs1 = useCharacterSelection({ initial, characterPosition: 1 });
	const cs2 = useCharacterSelection({
		initial: initial2,
		characterPosition: 2,
	});

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<CharacterList
				title="Character #1"
				characters={cs1.characters}
				selectedCharacter={selectedCharacters.character1}
				onCharacterSelect={(character) => handleCharacterSelect(character, 1)}
				loading={cs1.loading}
				currentPage={cs1.page}
				totalPages={cs1.info?.pages || 1}
				onPageChange={cs1.setPage}
			/>

			<CharacterList
				title="Character #2"
				characters={cs2.characters}
				selectedCharacter={selectedCharacters.character2}
				onCharacterSelect={(character) => handleCharacterSelect(character, 2)}
				loading={cs2.loading}
				currentPage={cs2.page}
				totalPages={cs2.info?.pages || 1}
				onPageChange={cs2.setPage}
			/>
		</div>
	);
}
