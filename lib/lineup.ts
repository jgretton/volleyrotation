import { MatchStore } from "./types";

export const getUnselectedPlayers = (
	team: "home" | "away",
	matchStore: MatchStore,
) => {
	const selectedIds = matchStore.setup[team].lineup
		.filter((player) => player.playerId !== null)
		.map((player) => player.playerId);

	return matchStore.setup[team].players
		.filter((player) => !selectedIds.includes(player.id))
		.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
};
