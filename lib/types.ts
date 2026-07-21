export type Player = {
	id: string;
	name: string;
	number: number | null;
};

export type Team = {
	name: string;
	players: Player[];
	lineup: LineupSlot[];
};
export type LineupSlot = { position: number; playerId: string | null };

export type MatchState = {
	setup: {
		home: Team;
		away: Team;
		currentStep: number;
	};
	match: {
		home: Team;
		away: Team;
		rotation: { home: number; away: number };
	} | null;
};

export type MatchActions = {
	setCurrentStep: (step: number) => void;
	setTeamName: (team: 'home' | 'away', teamName: string) => void;
	setTeamNames: (home: string, away: string) => void;

	removeAdditionalPlayer: (team: 'home' | 'away', playerID: string) => void;
	addAdditionalPlayer: (team: 'home' | 'away') => void;
	removeEmptyPlayers: (team: 'home' | 'away') => void;
	updatePlayer: (
		team: 'home' | 'away',
		playerID: string,
		changes: Partial<Player>
	) => void;

	setStartingLineups: (startingLineups: {
		home: Team['lineup'];
		away: Team['lineup'];
	}) => void;

	assignPlayerToStartingLineup: (
		team: 'home' | 'away',
		position: number,
		playerId: string
	) => void;
	removePlayerFromStartingLineup: (
		team: 'home' | 'away',
		position: number
	) => void;

	startMatch: () => void;
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
