import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_PLAYERS, MIN_PLAYERS } from "./constants";
import { MatchStore, Team } from "./types";

const makePlayer = () => ({
	id: crypto.randomUUID(),
	number: null,
	name: "",
});

const makeTeam = (): Team => ({
	name: "",
	players: Array.from({ length: MIN_PLAYERS }, makePlayer),
	lineup: [
		{ position: 1, playerId: null },
		{ position: 2, playerId: null },
		{ position: 3, playerId: null },
		{ position: 4, playerId: null },
		{ position: 5, playerId: null },
		{ position: 6, playerId: null },
	],
});

export const useMatchStore = create<MatchStore>()(
	persist(
		(set) => ({
			setup: {
				home: makeTeam(),
				away: makeTeam(),
				currentStep: 1,
			},
			match: null,

			setCurrentStep: (step: number) =>
				set((state) => {
					return {
						...state,
						setup: {
							...state.setup,
							currentStep: step,
						},
					};
				}),

			setTeamName: (team, teamName) =>
				set((state) => ({
					setup: {
						...state.setup,
						[team]: { ...state.setup[team], name: teamName },
					},
				})),
			setTeamNames: (home, away) =>
				set((state) => ({
					setup: {
						home: { ...state.setup.home, name: home },
						away: { ...state.setup.away, name: away },
					},
				})),
			removeAdditionalPlayer: (team, playerID) =>
				set((state) => {
					if (state.setup[team].players.length <= MIN_PLAYERS) return state;

					return {
						setup: {
							...state.setup,
							[team]: {
								...state.setup[team],
								players: state.setup[team].players.filter(
									(player) => player.id !== playerID,
								),
							},
						},
					};
				}),
			addAdditionalPlayer: (team) =>
				set((state) => {
					if (state.setup[team].players.length >= MAX_PLAYERS) return state;
					return {
						setup: {
							...state.setup,
							[team]: {
								...state.setup[team],
								players: [...state.setup[team].players, makePlayer()],
							},
						},
					};
				}),
			updatePlayer: (team, playerID, value) =>
				set((state) => {
					const updatedPlayers = state.setup[team].players.map((player) =>
						player.id === playerID
							? {
									...player,
									...value,
								}
							: player,
					);

					return {
						setup: {
							...state.setup,
							[team]: { ...state.setup[team], players: updatedPlayers },
						},
					};
				}),
			removeEmptyPlayers: (team) =>
				set((state) => {
					const players = state.setup[team].players;
					const nonEmpty = players.filter(
						(player) => player.name.trim() !== "" || player.number !== null,
					);

					// safety: if we don't have 6 real players, leave the roster alone
					if (nonEmpty.length < MIN_PLAYERS) return state;

					return {
						setup: {
							...state.setup,
							[team]: { ...state.setup[team], players: nonEmpty },
						},
					};
				}),
			setStartingLineups: (startingLineups) =>
				set((state) => {
					const { home, away } = startingLineups;

					return {
						setup: {
							home: { ...state.setup.home, lineup: home },
							away: { ...state.setup.away, lineup: away },
						},
					};
				}),
			assignPlayerToStartingLineup: (team, position, playerId) =>
				set((state) => {
					const newTeamLineup = [...state.setup[team].lineup].map((p) => {
						if (p.position === position)
							return { position: position, playerId: playerId };
						else return p;
					});

					return {
						...state,
						setup: {
							...state.setup,
							[team]: {
								...state.setup[team],
								lineup: newTeamLineup,
							},
						},
					};
				}),
			removePlayerFromStartingLineup: (team, position) =>
				set((state) => {
					return {
						...state,
						setup: {
							...state.setup,
							[team]: {
								...state.setup[team],
								lineup: state.setup[team].lineup.map((slot) =>
									slot.position === position
										? { ...slot, playerId: null }
										: slot,
								),
							},
						},
					};
				}),
			startMatch: () =>
				set((state) => {
					return {
						...state,
						setup: {
							home: makeTeam(),
							away: makeTeam(),
							currentStep: 1,
						},
						match: {
							home: state.setup.home,
							away: state.setup.away,
							rotation: { home: 1, away: 1 },
						},
					};
				}),
		}),
		{
			name: "volleyrotation-store",
			version: 5,
		},
	),
);
