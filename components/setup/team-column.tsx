import { TeamResult } from "@/lib/types";
import DuplicateWarningBox from "./duplicate-warning-box";
import RosterErrorList from "./roster-error-list";
import TeamRoster from "./team-roster";

type TeamColumnProps = {
	team: "home" | "away";
	validation: TeamResult;
	duplicateNumberIds: string[];
};

export default function TeamColumn({
	team,
	validation,
	duplicateNumberIds,
}: TeamColumnProps) {
	return (
		<div className="flex flex-col gap-5">
			<TeamRoster
				team={team}
				nameInvalidIds={validation.nameInvalidIds}
				numberInvalidIds={validation.numberInvalidIds}
				duplicateNumberIds={duplicateNumberIds}
			/>
			{validation.errors.length > 0 && (
				<RosterErrorList errors={validation.errors} />
			)}
			{validation.warnings.length > 0 && (
				<DuplicateWarningBox warnings={validation.warnings} />
			)}
		</div>
	);
}
