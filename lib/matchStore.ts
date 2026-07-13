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
	lineup: [],
});

export const useMatchStore = create<MatchStore>()(
	persist(
		(set) => ({
			setup: {
				home: makeTeam(),
				away: makeTeam(),
			},
			match: null,

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
		}),
		{
			name: "match-store",
			version: 5,
		},
	),
);
