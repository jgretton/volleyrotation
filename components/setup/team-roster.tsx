import { useMatchStore } from "@/lib/matchStore";
import { PlusIcon } from "lucide-react";
import PlayerInputRow from "../player-input-row";
import { Button } from "../ui/button";

export default function TeamRoster({ team }: { team: "home" | "away" }) {
	const players = useMatchStore((state) => state[team].players);
	const { addAdditionalPlayer } = useMatchStore();
	const MIN_PLAYERS = 6;
	const MAX_PLAYERS = 12;

	const count = players.length;
	const atMax = count >= MAX_PLAYERS;

	return (
		<div className="flex flex-col flex-1 gap-4 ">
			<form className="grid grid-cols-[auto_1fr_auto] gap-y-5 gap-x-2">
				<p aria-hidden="true" className="text-center font-medium">
					#
				</p>
				<p aria-hidden="true" className="font-medium ml-1">
					Name
				</p>
				<span aria-hidden />
				{players.map((player, index) => (
					<PlayerInputRow
						team={team}
						player={player}
						index={index}
						key={player.id}
					/>
				))}
				<p
					role="status"
					aria-live="polite"
					className="col-span-full text-sm text-muted-foreground text-center"
				>
					{count} of {MAX_PLAYERS} players
					{atMax && " — maximum reached"}
					{count <= MIN_PLAYERS && ` (minimum ${MIN_PLAYERS})`}
				</p>
				<Button
					type="button"
					variant="secondary"
					className="col-span-full mt-5"
					onClick={() => addAdditionalPlayer(team)}
				>
					<PlusIcon /> Add Player
				</Button>
			</form>
		</div>
	);
}
