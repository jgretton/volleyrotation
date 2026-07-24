"use client";
import { COURT_LEFT_POSITIONS, COURT_RIGHT_POSITIONS } from "@/lib/constants";
import { Team } from "@/lib/types";
import PlayerIcon from "./player-icon";

type VolleyballHalfCourtProps = {
	side: "left" | "right";
	team: "home" | "away";
	teamData: Team;
	rotation: number;
	setTarget: (
		target: { team: "home" | "away"; position: number } | null,
	) => void;
};

export default function VolleyballHalfCourt({
	side,
	team,
	teamData,
	rotation,
	setTarget,
}: VolleyballHalfCourtProps) {
	const positions =
		side === "left" ? COURT_LEFT_POSITIONS : COURT_RIGHT_POSITIONS;

	return (
		<div
			className={`relative bg-[#ff915c] z-10 border-3 border-white grid grid-cols-2 grid-rows-3 place-items-center ${
				side === "left" ? "rounded-l-md border-r-0" : "rounded-r-md border-l-0"
			}`}
		>
			<div
				className={`absolute h-full w-1 bg-white/60 ${
					side === "left" ? "right-[33%]" : "left-[33%]"
				}`}
			/>
			{positions.map((zone) => {
				const starterPosition = ((zone - 2 + rotation) % 6) + 1;

				const slot = teamData.lineup.find((s) => s.position === starterPosition);
				if (!slot) return null;

				const player = teamData.players.find((p) => p.id === slot.playerId);
				if (!player) return null;

				return (
					<PlayerIcon
						key={zone}
						team={team}
						player={player}
						position={zone}
						setTarget={setTarget}
					/>
				);
			})}
		</div>
	);
}