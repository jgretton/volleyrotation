"use client";

import LineupSelectDialog from "@/components/lineup-select-dialog";
import { Button } from "@/components/ui/button";
import { getUnselectedPlayers } from "@/lib/lineup";
import { useMatchStore } from "@/lib/matchStore";
import { Player } from "@/lib/types";
import { useState } from "react";
import TeamLineup from "../team-lineup";

export default function StartingLineupStep({
	completeSetup,
}: {
	completeSetup: () => void;
}) {
	const matchStore = useMatchStore();

	const [target, setTarget] = useState<{
		team: "home" | "away";
		position: number;
	} | null>(null);

	const availablePlayers = () => {
		if (!target) return [];
		return getUnselectedPlayers(target.team, matchStore);
	};

	const assignPlayer = (player: Player) => {
		if (!target) return;
		matchStore.assignPlayerToStartingLineup(
			target.team,
			target.position,
			player.id,
		);
		setTarget(null);

		const updatedErrors = errors[target.team].filter(
			(zone) => zone !== target.position,
		);

		setErrors((prev) => ({ ...prev, [target.team]: updatedErrors }));
	};

	const [errors, setErrors] = useState<{ home: number[]; away: number[] }>({
		home: [],
		away: [],
	});
	const continueOn = () => {
		// validate

		const missingPlayers = {
			home: matchStore.setup.home.lineup
				.filter((player) => player.playerId === null)
				.map((player) => player.position),

			away: matchStore.setup.away.lineup
				.filter((player) => player.playerId === null)
				.map((player) => player.position),
		};
		setErrors(missingPlayers);

		const hasMissing =
			missingPlayers.home.length > 0 || missingPlayers.away.length > 0;
		if (hasMissing) return;

		//save as match data and remove setup.
		matchStore.startMatch();

		//move on
		completeSetup();
	};

	return (
		<div className="flex flex-1 flex-col">
			<div>
				<h2 className="text-lg font-medium text-slate-900">
					Team starting lineup
				</h2>
				<p className="text-slate-600 text-base">
					Please select the positions below to allocate the starting line up for
					each of the teams.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2  gap-5 md:gap-10 mt-10">
				<TeamLineup team="home" setTarget={setTarget} errors={errors} />

				<TeamLineup team="away" setTarget={setTarget} errors={errors} />

				<Button
					type="submit"
					className="md:col-start-2 w-full py-5 self-end mt-auto md:mt-0"
					onClick={() => continueOn()}
				>
					Start match
				</Button>
			</div>

			<LineupSelectDialog
				open={!!target}
				onOpenChange={(open: boolean) => !open && setTarget(null)}
				zone={target?.position}
				players={availablePlayers()}
				teamName={target ? matchStore.setup[target.team].name : ""}
				assignPlayer={assignPlayer}
			/>
		</div>
	);
}
