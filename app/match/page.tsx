"use client";
import HydrationZustand from "@/components/hydration-zustand";
import LineupSelectDialog from "@/components/lineup-select-dialog";
import MatchTeamNames from "@/components/match/match-team-names";
import { Button } from "@/components/ui/button";
import VolleyballHalfCourt from "@/components/volleyball-half-court";
import { getUnselectedPlayers } from "@/lib/lineup";
import { useMatchStore } from "@/lib/matchStore";
import { Player } from "@/lib/types";
import { useState } from "react";

import { ArrowLeftRight, RotateCw } from "lucide-react";

const ROTATE_STYLE = {
	home: "bg-olive-600 hover:bg-olive-700",
	away: "bg-mauve-600 hover:bg-mauve-700",
};

export default function MatchPage() {
	return (
		<HydrationZustand>
			<MatchContent />
		</HydrationZustand>
	);
}

function MatchContent() {
	const matchStore = useMatchStore();

	const [target, setTarget] = useState<{
		team: "home" | "away";
		position: number;
	} | null>(null);

	if (!matchStore.match) return <p>NO MATCH</p>;

	const availablePlayers = () => {
		if (!target) return [];
		return getUnselectedPlayers(matchStore.match[target.team]);
	};

	const assignPlayer = (player: Player) => {
		if (!target) return;
		matchStore.assignPlayerToStartingLineup(
			target.team,
			target.position,
			player.id,
		);
		setTarget(null);
	};

	const leftTeam = matchStore.match.sides.left; // "home" | "away"
	const rightTeam = leftTeam === "home" ? "away" : "home";

	return (
		<div className="max-w-7xl mx-auto w-full px-4 flex flex-1 flex-col">
			<h1 className="text-center text-lg">Match</h1>
			<div className="flex flex-1 flex-col">
				<div className="aspect-2/1 relative grid grid-cols-[1fr_auto_1fr] mt-10">
					{/* left court */}
					<VolleyballHalfCourt
						side="left"
						team={leftTeam}
						teamData={matchStore.match[leftTeam]}
						rotation={matchStore.match[leftTeam].rotation}
						setTarget={setTarget}
					/>

					{/* Net */}
					<div className="bg-mauve-800 z-50 -mt-5 h-[calc(100%+2.5rem)] w-3 rounded-full" />

					{/* right court */}
					<VolleyballHalfCourt
						side="right"
						team={rightTeam}
						teamData={matchStore.match[rightTeam]}
						rotation={matchStore.match[rightTeam].rotation}
						setTarget={setTarget}
					/>
				</div>
			</div>
			<div className="flex w-full justify-between flex-row px-2 mt-2">
				<MatchTeamNames team={leftTeam} align="left" />
				<MatchTeamNames team={rightTeam} align="right" />
			</div>
			<div className="grid grid-cols-[1fr_auto_1fr] items-center mt-4">
				{/* under left court */}
				<div className="flex justify-center">
					<Button
						className={ROTATE_STYLE[leftTeam]}
						onClick={() => matchStore.rotateTeam(leftTeam)}
					>
						<RotateCw className="size-4" /> Rotate
					</Button>
				</div>

				{/* under the net */}
				<div className="flex justify-center px-4">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => matchStore.swapSides()}
					>
						<ArrowLeftRight className="size-4" /> Swap
					</Button>
				</div>

				{/* under right court */}
				<div className="flex justify-center">
					<Button
						className={ROTATE_STYLE[rightTeam]}
						onClick={() => matchStore.rotateTeam(rightTeam)}
					>
						<RotateCw className="size-4" /> Rotate
					</Button>
				</div>
			</div>

			<LineupSelectDialog
				open={!!target}
				onOpenChange={(open: boolean) => !open && setTarget(null)}
				zone={target?.position}
				players={availablePlayers()}
				teamName={target ? matchStore.match[target.team].name : ""}
				assignPlayer={assignPlayer}
			/>
		</div>
	);
}
