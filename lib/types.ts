export type Player = {
	id: string;
	name: string;
	number: number | null;
};

export type Team = {
	name: string;
	players: Player[];
};
export type MatchState = {
	home: Team;
	away: Team;
};

export type MatchActions = {
	setTeamName: (team: "home" | "away", teamName: string) => void;
	setTeamNames: (home: string, away: string) => void;

	removeAdditionalPlayer: (team: "home" | "away", playerID: string) => void;
	addAdditionalPlayer: (team: "home" | "away") => void;

	updatePlayer: (
		team: "home" | "away",
		playerID: string,
		changes: Partial<Player>,
	) => void;
};

export type MatchStore = MatchState & MatchActions;
