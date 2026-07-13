import { MAX_PLAYERS, MIN_PLAYERS } from "@/lib/constants";
import { useMatchStore } from "@/lib/matchStore";
import { PlusIcon } from "lucide-react";
import PlayerInputRow from "../player-input-row";
import { Button } from "../ui/button";

export default function TeamRoster({
	team,
	nameInvalidIds,
	numberInvalidIds,
	duplicateNumberIds,
}: {
	team: "home" | "away";
	nameInvalidIds: string[];
	numberInvalidIds: string[];
	duplicateNumberIds: string[];
}) {
	const players = useMatchStore((state) => state.setup[team].players);
	const teamName = useMatchStore((state) => state.setup[team].name);
	const { addAdditionalPlayer } = useMatchStore();

	const count = players.length;
	const atMax = count >= MAX_PLAYERS;

	return (
		<fieldset className="">
			<legend className="font-medium">
				{teamName} -{" "}
				<span className="text-sm text-muted-foreground font-normal capitalize">
					{team}
				</span>
			</legend>
			<div className="grid grid-cols-[auto_1fr_auto] gap-y-5 gap-x-2 py-5 mt-5 border-t">
				<p
					aria-hidden="true"
					className="text-center  text-muted-foreground tracking-wide text-sm"
				>
					No.
				</p>
				<p
					aria-hidden="true"
					className=" text-muted-foreground tracking-wide ml-1 text-sm"
				>
					Name
				</p>
				<span aria-hidden />
				{players.map((player, index) => {
					const hasNameError = nameInvalidIds.includes(player.id);
					const hasNumberError = numberInvalidIds.includes(player.id);
					const isDuplicate = duplicateNumberIds.includes(player.id);

					return (
						<PlayerInputRow
							team={team}
							player={player}
							index={index}
							key={player.id}
							hasNameError={hasNameError}
							hasNumberError={hasNumberError}
							isDuplicate={isDuplicate}
						/>
					);
				})}
				<div className="col-span-full">
					<Button
						type="button"
						variant="ghost"
						className="w-full mt-5"
						onClick={() => addAdditionalPlayer(team)}
					>
						<PlusIcon /> Add player
					</Button>
					<p
						role="status"
						aria-live="polite"
						className=" text-sm text-muted-foreground text-center"
					>
						{count} of {MAX_PLAYERS} players
						{atMax && " — maximum reached"}
						{count <= MIN_PLAYERS && ` (minimum ${MIN_PLAYERS})`}
					</p>
				</div>
			</div>
		</fieldset>
	);
}
