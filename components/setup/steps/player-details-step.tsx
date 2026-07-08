"use client";
import { Button } from "@/components/ui/button";
import { useMatchStore } from "@/lib/matchStore";
import { validateTeam } from "@/lib/roster-validation";
import { Errors } from "@/lib/types";

import { useState } from "react";
import DuplicateNumberDialog from "../duplicate-number-dialog";
import TeamColumn from "../team-column";

export default function PlayerDetailsStep({
	nextStep,
}: {
	nextStep: () => void;
}) {
	const { away, home, removeEmptyPlayers } = useMatchStore();

	const [errors, setErrors] = useState<Errors>({
		home: {
			errors: [],
			nameInvalidIds: [],
			numberInvalidIds: [],
			warnings: [],
		},
		away: {
			errors: [],
			nameInvalidIds: [],
			numberInvalidIds: [],
			warnings: [],
		},
	});
	const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);

	const continueToNextStep = () => {
		removeEmptyPlayers("away");
		removeEmptyPlayers("home");
		nextStep();
	};

	const handleTeamRosterSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const homeTeamValidation = validateTeam(home);
		const awayTeamValidation = validateTeam(away);

		setErrors({ home: homeTeamValidation, away: awayTeamValidation });

		const hasErrors =
			homeTeamValidation.errors.length || awayTeamValidation.errors.length;
		const hasWarnings =
			homeTeamValidation.warnings.length || awayTeamValidation.warnings.length;

		if (hasErrors) return; // stop — red boxes show (yellow box also shows if dupes)
		if (hasWarnings) {
			setShowDuplicateDialog(true); // confirm — continue anyway?
			return;
		}

		continueToNextStep(); // clean
	};

	const homeDuplicates = errors.home.warnings.map((w) => w.number);
	const awayDuplicates = errors.away.warnings.map((w) => w.number);

	// only highlight duplicate numbers amber when there are no hard errors
	const hasErrors =
		errors.home.errors.length > 0 || errors.away.errors.length > 0;
	const homeDuplicateIds = hasErrors
		? []
		: errors.home.warnings.flatMap((w) => w.players.map((p) => p.id));
	const awayDuplicateIds = hasErrors
		? []
		: errors.away.warnings.flatMap((w) => w.players.map((p) => p.id));

	return (
		<div className="flex flex-1 flex-col">
			<div>
				<h2 className="text-lg font-medium text-slate-900">Team Roster</h2>
				<p className="text-slate-600 text-base">
					Please enter the players shirt number and name below. These can be
					changed in the future. Click continue when you are ready to move onto
					the next step.
				</p>
			</div>

			{/* <Tabs defaultValue="home" className="mt-10 md:hidden">
				<TabsList variant="line" className="mx-auto space-x-2.5">
					<TabsTrigger value="home">{homeTeamName}</TabsTrigger>
					<TabsTrigger value="away">{awayTeamName}</TabsTrigger>
				</TabsList>
				<TabsContent value="home">
					<div className="mt-5">
						<TeamRoster team="home" />
					</div>
				</TabsContent>
				<TabsContent value="away">
					<div className="mt-5">
						<TeamRoster team="away" />
					</div>
				</TabsContent>
			</Tabs> */}
			<form onSubmit={(e) => handleTeamRosterSubmit(e)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
					<TeamColumn
						team="home"
						validation={errors.home}
						duplicateNumberIds={homeDuplicateIds}
					/>
					<TeamColumn
						team="away"
						validation={errors.away}
						duplicateNumberIds={awayDuplicateIds}
					/>

					<Button type="submit" className="md:col-start-2">
						Continue
					</Button>
				</div>

				<DuplicateNumberDialog
					open={showDuplicateDialog}
					onOpenChange={setShowDuplicateDialog}
					homeName={home.name}
					awayName={away.name}
					homeDuplicates={homeDuplicates}
					awayDuplicates={awayDuplicates}
					onConfirm={continueToNextStep}
				/>
			</form>
		</div>
	);
}
