import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMatchStore } from "@/lib/matchStore";
import TeamRoster from "../team-roster";

export default function PlayerDetailsStep() {
	const { away, home } = useMatchStore();
	const homeTeamName = home.name;
	const awayTeamName = away.name;

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

			<Tabs defaultValue="home" className="mt-10 md:hidden">
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
			</Tabs>
		</div>
	);
}
