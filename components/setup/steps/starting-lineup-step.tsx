import { useMatchStore } from "@/lib/matchStore";

export default function StartingLineupStep({
	nextStep,
}: {
	nextStep: () => void;
}) {
	const { home, away } = useMatchStore();

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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
				<fieldset className="">
					<legend className="font-medium">
						{home.name} -{" "}
						<span className="text-sm text-muted-foreground font-normal capitalize">
							home
						</span>
					</legend>
				</fieldset>
			</div>
		</div>
	);
}
