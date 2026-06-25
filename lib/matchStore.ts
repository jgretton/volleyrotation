import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MatchStore, Team } from "./types";

const MAX_PLAYERS = 12;
const MIN_PLAYERS = 6;

const makePlayer = () => ({
	id: crypto.randomUUID(),
	number: null,
	name: "",
});

const makeTeam = (): Team => ({
	name: "",
	players: Array.from({ length: MIN_PLAYERS }, makePlayer),
});

export const useMatchStore = create<MatchStore>()(
	persist(
		(set) => ({
			home: makeTeam(),
			away: makeTeam(),

			setTeamName: (team, teamName) =>
				set((state) => ({
					...state,
					[team]: { ...state[team], name: teamName },
				})),
			setTeamNames: (home, away) =>
				set((state) => ({
					...state,
					home: { ...state.home, name: home },
					away: { ...state.away, name: away },
				})),
			removeAdditionalPlayer: (team, playerID) =>
				set((state) => {
					if (state[team].players.length <= MIN_PLAYERS) return state;

					return {
						...state,
						[team]: {
							...state[team],
							players: state[team].players.filter(
								(player) => player.id !== playerID,
							),
						},
					};
				}),
			addAdditionalPlayer: (team) =>
				set((state) => {
					if (state[team].players.length >= MAX_PLAYERS) return state;
					return {
						...state,
						[team]: {
							...state[team],
							players: [...state[team].players, makePlayer()],
						},
					};
				}),
			updatePlayer: (team, playerID, value) =>
				set((state) => {
					const updatedPlayers = state[team].players.map((player) =>
						player.id === playerID
							? {
									...player,
									...value,
								}
							: player,
					);

					return {
						...state,
						[team]: { ...state[team], players: updatedPlayers },
					};
				}),
		}),
		{
			name: "match-store",
			version: 3,
		},
	),
);
