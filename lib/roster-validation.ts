import { MIN_PLAYERS } from "./constants";
import { DuplicateWarning, Player, Team, TeamResult } from "./types";

const isValidNumber = (n: number) => n >= 1 && n <= 99;

const findDuplicateNumbers = (players: Player[]): DuplicateWarning[] => {
	const counts: Record<number, number> = {};

	for (const player of players) {
		if (player.number === null) continue;
		if (!isValidNumber(player.number)) continue;
		if (counts[player.number]) {
			counts[player.number] = counts[player.number] + 1;
		} else {
			counts[player.number] = 1;
		}
	}

	const duplicates: DuplicateWarning[] = [];
	for (const number in counts) {
		if (counts[number] > 1) {
			const fullDuplicatePlayers = players.filter(
				(player) => player.number === Number(number),
			);
			duplicates.push({
				number: Number(number),
				players: fullDuplicatePlayers,
			});
		}
	}
	return duplicates;
};

export const validateTeam = (team: Team): TeamResult => {
	const errors: string[] = [];
	const nameInvalidIds: string[] = [];
	const numberInvalidIds: string[] = [];
	const emptyIds: string[] = [];
	let filled = 0;

	let nameMissing = 0;
	let numberMissing = 0;
	let rangeInvalid = 0;

	for (const player of team.players) {
		const hasName = player.name.trim() !== "";
		const hasNumber = player.number !== null;

		if (!hasName && !hasNumber) {
			emptyIds.push(player.id);
			continue;
		}

		filled++;

		if (!hasName) {
			nameInvalidIds.push(player.id);
			nameMissing++;
		}

		if (!hasNumber) {
			numberInvalidIds.push(player.id);
			numberMissing++;
		} else if (!isValidNumber(player.number)) {
			numberInvalidIds.push(player.id);
			rangeInvalid++;
		}
	}

	if (rangeInvalid)
		errors.push("A player's number needs to be between 1 and 99");

	if (nameMissing)
		errors.push(
			nameMissing === 1
				? "A player needs a name"
				: `${nameMissing} players need a name`,
		);
	if (numberMissing)
		errors.push(
			numberMissing === 1
				? "A player needs a number"
				: `${numberMissing} players need a number`,
		);

	// short of 6 — flag just enough empty rows to make up the minimum
	// (any started row counts, so it reduces how many empties we flag)
	if (filled < MIN_PLAYERS) {
		const needed = MIN_PLAYERS - filled;
		for (const id of emptyIds.slice(0, needed)) {
			nameInvalidIds.push(id);
			numberInvalidIds.push(id);
		}
		errors.push("You need at least 6 players");
	}

	const warnings = findDuplicateNumbers(team.players);
	return { errors, nameInvalidIds, numberInvalidIds, warnings };
};
