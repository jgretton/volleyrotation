import { useMatchStore } from "@/lib/matchStore";

const TEAM_TEXT = {
	home: "text-olive-600",
	away: "text-mauve-600",
};

export default function MatchTeamNames({
	team,
	align,
}: {
	team: "home" | "away";
	align: "left" | "right";
}) {
	const matchStore = useMatchStore();

	return (
		<div
			className={`flex items-baseline gap-2 ${
				align === "right" ? "flex-row-reverse" : ""
			}`}
		>
			<span
				className={`text-xs font-bold uppercase tracking-wider ${TEAM_TEXT[team]}`}
			>
				{team}
			</span>
			<span className="font-medium">{matchStore.match[team].name}</span>
			<span className="text-xs text-muted-foreground tabular-nums">
				R{matchStore.match[team].rotation}
			</span>
		</div>
	);
}