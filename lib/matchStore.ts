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
			removeEmptyPlayers: (team) =>
				set((state) => {
					const players = state[team].players;
					const nonEmpty = players.filter(
						(player) => player.name.trim() !== "" || player.number !== null,
					);

					// safety: if we don't have 6 real players, leave the roster alone
					if (nonEmpty.length < MIN_PLAYERS) return state;

					return { [team]: { ...state[team], players: nonEmpty } };
				}),
		}),
		{
			name: "match-store",
			version: 3,
		},
	),
);
