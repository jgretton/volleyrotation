import { DuplicateWarning } from "@/lib/types";

export default function DuplicateWarningBox({
	warnings,
}: {
	warnings: DuplicateWarning[];
}) {
	return (
		<div
			role="status"
			className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-900"
		>
			<p className="font-medium">Heads up — you can still continue</p>
			<p className="text-amber-800">
				Some players share a shirt number. That is allowed — just check it is
				intentional.
			</p>
			<ul className="mt-1 list-disc pl-4 space-y-0.5">
				{warnings.map((w, i) => (
					<li key={i}>
						Number {w.number} is used by {w.players.length} players
					</li>
				))}
			</ul>
		</div>
	);
}
