"use client";

import { COURT_POSITIONS } from "@/lib/constants";
import { getUnselectedPlayers } from "@/lib/lineup";
import { useMatchStore } from "@/lib/matchStore";
import { ChevronsUpDown } from "lucide-react";
import Nameplate from "../nameplate";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import VolleyballCourt from "../volleyball-court";
import LineupErrorBox from "./lineup-error-box";

type TeamLineupProps = {
	team: "home" | "away";
	setTarget: (
		target: { team: "home" | "away"; position: number } | null,
	) => void;
	errors: { home: number[]; away: number[] };
};

export default function TeamLineup({
	team,
	setTarget,
	errors,
}: TeamLineupProps) {
	const matchStore = useMatchStore();
	const removePlayer = (team: "home" | "away", position: number) => {
		matchStore.removePlayerFromStartingLineup(team, position);
	};

	const benchPlayers = getUnselectedPlayers(team, matchStore);

	const isLineupComplete = matchStore.setup[team].lineup.every(
		(slot) => slot.playerId !== null,
	);

	return (
		<div className="">
			<fieldset className=" pb-5">
				<legend className="font-medium">
					{matchStore.setup[team].name} -{" "}
					<span className="text-sm text-muted-foreground font-normal capitalize">
						{team}
					</span>
				</legend>
			</fieldset>

			<VolleyballCourt>
				<div className="grid-cols-3 grid-rows-2 grid size-full">
					{COURT_POSITIONS.map((zone) => {
						const slot = matchStore.setup[team].lineup.find(
							(s) => s.position === zone,
						);

						if (!slot) return null;

						const player = matchStore.setup[team].players.find(
							(p) => p.id === slot.playerId,
						);

						return (
							<Nameplate
								key={zone}
								zone={zone}
								player={player}
								onSelect={() => setTarget({ team: team, position: zone })}
								onRemove={() => removePlayer(team, zone)}
								errors={errors[team]}
							/>
						);
					})}
				</div>
			</VolleyballCourt>
			<LineupErrorBox positions={errors[team]} />
			{isLineupComplete && benchPlayers.length > 0 && (
				<Collapsible>
					<CollapsibleTrigger className="flex flex-row gap-3">
						Bench players ({benchPlayers.length})
						<ChevronsUpDown />
					</CollapsibleTrigger>
					<CollapsibleContent>
						<ul className="grid gap-2 mt-4">
							{benchPlayers.map((player) => (
								<li
									key={player.id}
									className="text-muted-foreground text-sm ml-1 inline-flex items-center gap-3  "
								>
									<span className=" text-sm font-semibold tabular-nums">
										{player.number}
									</span>
									{"-"}
									<span className="text-sm font-medium">{player.name}</span>
								</li>
							))}
						</ul>
					</CollapsibleContent>
				</Collapsible>
			)}
		</div>
	);
}
