'use client';

import VolleyballCourt from '@/components/volleyball-court';
import { useMatchStore } from '@/lib/matchStore';
import { useState } from 'react';
const PLAYERS = [1, 2, 3, 4, 5, 6];

const COURT_POSITIONS = [4, 3, 2, 5, 6, 1];

export default function StartingLineupStep({
	nextStep,
}: {
	nextStep: () => void;
}) {
	const { home, away } = useMatchStore();

	const [target, setTarget] = useState<{
		team: 'home' | 'away';
		position: number;
	} | null>(null);

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
							{home.name} -{' '}
							<span className="text-sm text-muted-foreground font-normal capitalize">
								home
							</span>
						</legend>
					</fieldset>

					<VolleyballCourt>
						<div className="grid-cols-3 grid-rows-2 grid size-full">
							{COURT_POSITIONS.map((position) => (
								<button
									className="size-full border hover:bg-white/10 border-dashed flex items-center justify-center"
									key={position}
									onClick={() => setTarget({ team: 'home', position })}
								>
									<p className=" text-white/60 text-4xl font-light">
										{position}
									</p>
								</button>
							))}
						</div>
					</VolleyballCourt>
				</div>
				<div className="">
					<fieldset className="">
						<legend className="font-medium">
							{away.name} -{' '}
							<span className="text-sm text-muted-foreground font-normal capitalize">
								away
							</span>
						</legend>
					</fieldset>
				</div>
			</div>
		</div>
	);
}
