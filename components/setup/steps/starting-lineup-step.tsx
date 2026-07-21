'use client';

import LineupSelectDialog from '@/components/lineup-select-dialog';
import Nameplate from '@/components/nameplate';
import LineupErrorBox from '@/components/setup/lineup-error-box';
import { Button } from '@/components/ui/button';
import VolleyballCourt from '@/components/volleyball-court';
import { COURT_POSITIONS } from '@/lib/constants';
import { useMatchStore } from '@/lib/matchStore';
import { Player } from '@/lib/types';
import { useState } from 'react';

export default function StartingLineupStep({
	completeSetup,
}: {
	completeSetup: () => void;
}) {
	const matchStore = useMatchStore();

	const [target, setTarget] = useState<{
		team: 'home' | 'away';
		position: number;
	} | null>(null);

	const availablePlayers = () => {
		if (!target) return [];

		const selectedIds = matchStore.setup[target.team].lineup
			.filter((player) => player.playerId !== null)
			.map((player) => player.playerId);

		return matchStore.setup[target.team].players.filter(
			(player) => !selectedIds.includes(player.id)
		);
	};

	const assignPlayer = (player: Player) => {
		if (!target) return;
		matchStore.assignPlayerToStartingLineup(
			target.team,
			target.position,
			player.id
		);
		setTarget(null);

		const updatedErrors = errors[target.team].filter(
			(zone) => zone !== target.position
		);

		setErrors((prev) => ({ ...prev, [target.team]: updatedErrors }));
	};

	const removePlayer = (team: 'home' | 'away', position: number) => {
		matchStore.removePlayerFromStartingLineup(team, position);
	};

	const [errors, setErrors] = useState<{ home: number[]; away: number[] }>({
		home: [],
		away: [],
	});
	const continueOn = () => {
		// validate

		const missingPlayers = {
			home: matchStore.setup.home.lineup
				.filter((player) => player.playerId === null)
				.map((player) => player.position),

			away: matchStore.setup.away.lineup
				.filter((player) => player.playerId === null)
				.map((player) => player.position),
		};
		setErrors(missingPlayers);

		const hasMissing =
			missingPlayers.home.length > 0 || missingPlayers.away.length > 0;
		if (hasMissing) return;

		//save as match data and remove setup.
		matchStore.startMatch();

		//move on
		completeSetup();
	};

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
				<div className="">
					<fieldset className="">
						<legend className="font-medium">
							{matchStore.setup.home.name} -{' '}
							<span className="text-sm text-muted-foreground font-normal capitalize">
								home
							</span>
						</legend>
					</fieldset>

					<VolleyballCourt>
						<div className="grid-cols-3 grid-rows-2 grid size-full">
							{COURT_POSITIONS.map((zone) => {
								const slot = matchStore.setup.home.lineup.find(
									(s) => s.position === zone
								);

								if (!slot) return null;

								const player = matchStore.setup.home.players.find(
									(p) => p.id === slot.playerId
								);

								return (
									<Nameplate
										key={zone}
										zone={zone}
										player={player}
										onSelect={() => setTarget({ team: 'home', position: zone })}
										onRemove={() => removePlayer('home', zone)}
										errors={errors.home}
									/>
								);
							})}
						</div>
					</VolleyballCourt>
					<LineupErrorBox positions={errors.home} />
				</div>
				<div className="">
					<fieldset className="">
						<legend className="font-medium">
							{matchStore.setup.away.name} -{' '}
							<span className="text-sm text-muted-foreground font-normal capitalize">
								away
							</span>
						</legend>
					</fieldset>

					<VolleyballCourt>
						<div className="grid-cols-3 grid-rows-2 grid size-full">
							{COURT_POSITIONS.map((zone) => {
								const slot = matchStore.setup.away.lineup.find(
									(s) => s.position === zone
								);

								if (!slot) return null;

								const player = matchStore.setup.away.players.find(
									(p) => p.id === slot.playerId
								);

								return (
									<Nameplate
										key={zone}
										zone={zone}
										player={player}
										onSelect={() => setTarget({ team: 'away', position: zone })}
										onRemove={() => removePlayer('away', zone)}
										errors={errors.away}
									/>
								);
							})}
						</div>
					</VolleyballCourt>
					<LineupErrorBox positions={errors.away} />
				</div>

				<Button
					type="submit"
					className="col-start-2 w-full py-5 self-end mt-auto md:mt-0"
					onClick={() => continueOn()}
				>
					Continue
				</Button>
			</div>

			<LineupSelectDialog
				open={!!target}
				onOpenChange={(open: boolean) => !open && setTarget(null)}
				zone={target?.position}
				players={availablePlayers()}
				teamName={target ? matchStore.setup[target.team].name : ''}
				assignPlayer={assignPlayer}
			/>
		</div>
	);
}
