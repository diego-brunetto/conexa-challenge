import type { Character, Episode } from "@/lib/types";

export const mockCharacter1: Character = {
	id: 1,
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: {
		name: "Earth (C-137)",
		url: "https://rickandmortyapi.com/api/location/1",
	},
	location: {
		name: "Citadel of Ricks",
		url: "https://rickandmortyapi.com/api/location/3",
	},
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	episode: [
		"https://rickandmortyapi.com/api/episode/1",
		"https://rickandmortyapi.com/api/episode/2",
	],
	url: "https://rickandmortyapi.com/api/character/1",
	created: "2017-11-04T18:48:46.250Z",
};

export const mockCharacter2: Character = {
	id: 2,
	name: "Morty Smith",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: {
		name: "unknown",
		url: "",
	},
	location: {
		name: "Citadel of Ricks",
		url: "https://rickandmortyapi.com/api/location/3",
	},
	image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
	episode: [
		"https://rickandmortyapi.com/api/episode/1",
		"https://rickandmortyapi.com/api/episode/3",
	],
	url: "https://rickandmortyapi.com/api/character/2",
	created: "2017-11-04T18:50:21.651Z",
};

export const mockEpisode: Episode = {
	id: 1,
	name: "Pilot",
	air_date: "December 2, 2013",
	episode: "S01E01",
	characters: [
		"https://rickandmortyapi.com/api/character/1",
		"https://rickandmortyapi.com/api/character/2",
	],
	url: "https://rickandmortyapi.com/api/episode/1",
	created: "2017-11-10T12:56:33.798Z",
};

export const mockCharacters = [mockCharacter1, mockCharacter2];
export const mockEpisodes = [mockEpisode];
