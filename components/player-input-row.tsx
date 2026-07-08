import { useMatchStore } from "@/lib/matchStore";
import { Player } from "@/lib/types";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type PlayerInputRowProps = {
	team: "home" | "away";
	player: Player;
	index: number;
	hasNameError: boolean;
	hasNumberError: boolean;
	isDuplicate: boolean;
};

export default function PlayerInputRow({
	team,
	player,
	index,
	hasNameError,
	hasNumberError,
	isDuplicate,
}: PlayerInputRowProps) {
	const { removeAdditionalPlayer, updatePlayer } = useMatchStore();

	const handleChange = (changes: Partial<Player>) => {
		updatePlayer(team, player.id, changes);
	};

	return (
		<div className="grid grid-cols-subgrid col-span-3 items-center">
			<div className="grid place-items-center">
				<Label className="sr-only" htmlFor={`playerNumber-${index + 1}`}>
					Player {index + 1} number
				</Label>
				<Input
					aria-invalid={hasNumberError}
					type="text"
					name={`playerNumber-${index + 1}`}
					id={`playerNumber-${index + 1}`}
					className={`w-12 text-center placeholder:text-muted-foreground/70 placeholder:text-sm tabular-nums ${
						hasNumberError
							? "border-red-400 border-2"
							: isDuplicate
								? "border-amber-400 border-2"
								: ""
					}`}
					placeholder="#"
					onChange={(e) => {
						const digits = e.target.value.replace(/\D/g, "");
						handleChange({ number: digits === "" ? null : Number(digits) });
					}}
					value={player.number ?? ""}
					pattern="[0-9]*"
					inputMode="numeric"
					maxLength={2}
					min={1}
					max={99}
				/>
			</div>
			<div className={index > 5 ? "col-span-1" : "col-span-2"}>
				<Label className="sr-only" htmlFor={`playerName-${index + 1}`}>
					Player {index + 1} name
				</Label>
				<Input
					aria-invalid={hasNameError}
					type="text"
					className={`placeholder:text-muted-foreground/70 placeholder:text-sm ${hasNameError ? "border-red-400 border-2" : ""}`}
					placeholder="Player name"
					name={`playerName-${index + 1}`}
					id={`playerName-${index + 1}`}
					onChange={(e) => handleChange({ name: e.target.value })}
					value={player.name}
				/>
			</div>
			{index > 5 && (
				<Button
					variant="destructive"
					size="icon"
					aria-label={`Remove player ${index + 1}`}
					type="button"
					onClick={() => removeAdditionalPlayer(team, player.id)}
				>
					<TrashIcon aria-hidden="true" />
				</Button>
			)}
		</div>
	);
}
