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

	removeEmptyPlayers: (team: "home" | "away") => void;

	updatePlayer: (
		team: "home" | "away",
		playerID: string,
		changes: Partial<Player>,
	) => void;
};

export type MatchStore = MatchState & MatchActions;

export type DuplicateWarning = {
	number: number;
	players: Player[];
};

export type TeamResult = {
	errors: string[];
	nameInvalidIds: string[];
	numberInvalidIds: string[];
	warnings: DuplicateWarning[];
};

export type Errors = {
	home: TeamResult;
	away: TeamResult;
};
