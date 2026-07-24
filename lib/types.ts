export type Player = {
	id: string;
	name: string;
	number: number | null;
};
export type SlotSub = {
	starter: string; // playerId who STARTED this slot — fixed all set, the anchor
	current: string; // playerId on court in this slot right now
	returned: boolean; // has the starter already come back? (then slot is locked)
};

// a team's subs, keyed by lineup slot (1–6); only slots that have been substituted
export type TeamSubs = Record<number, SlotSub>;

export type Team = {
	name: string;
	players: Player[];
	lineup: LineupSlot[];
};
export type LineupSlot = { position: number; playerId: string | null };

// match-only per-team state: a setup Team plus its live rotation and subs
export type MatchTeam = Team & {
	rotation: number;
	subs: TeamSubs;
};

export type MatchState = {
	setup: {
		home: Team;
		away: Team;
		currentStep: number;
	};
	match: {
		home: MatchTeam;
		away: MatchTeam;
		sides: { left: "home" | "away" };
	} | null;
};

export type MatchActions = {
	setCurrentStep: (step: number) => void;
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

	setStartingLineups: (startingLineups: {
		home: Team["lineup"];
		away: Team["lineup"];
	}) => void;

	assignPlayerToStartingLineup: (
		team: "home" | "away",
		position: number,
		playerId: string,
	) => void;
	removePlayerFromStartingLineup: (
		team: "home" | "away",
		position: number,
	) => void;

	startMatch: () => void;

	rotateTeam: (team: "home" | "away") => void;

	swapSides: () => void;
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
