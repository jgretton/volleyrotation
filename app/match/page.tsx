'use client';
import LineupSelectDialog from '@/components/lineup-select-dialog';
import PlayerIcon from '@/components/player-icon';
import { COURT_LEFT_POSITIONS, COURT_RIGHT_POSITIONS } from '@/lib/constants';
import { getUnselectedPlayers } from '@/lib/lineup';
import { useMatchStore } from '@/lib/matchStore';
import { Player } from '@/lib/types';
import { useState } from 'react';

export default function MatchPage() {
	const matchStore = useMatchStore();

	const { home, away } = matchStore.match;

	if (!matchStore.match) return <p>NO MATCH</p>;

	const [target, setTarget] = useState<{
		team: 'home' | 'away';
		position: number;
	} | null>(null);

	const availablePlayers = () => {
		if (!target) return [];
		return getUnselectedPlayers(matchStore.match[target.team]);
	};

	const assignPlayer = (player: Player) => {
		if (!target) return;
		matchStore.assignPlayerToStartingLineup(
			target.team,
			target.position,
			player.id
		);
		setTarget(null);
	};

	return (
		<div className="max-w-7xl mx-auto w-full px-4 flex flex-1 flex-col">
			<h1 className="text-center text-lg">Match</h1>
			<div className="flex flex-1 flex-col">
				<div className="flex w-full justify-between flex-row px-2">
					<legend className="font-medium">
						{home.name} -{' '}
						<span className="text-sm text-muted-foreground font-normal capitalize">
							home
						</span>
					</legend>
					<legend className="font-medium">
						<span className="text-sm text-muted-foreground font-normal capitalize">
							away{' '}
						</span>
						- {away.name}
					</legend>
				</div>
				<div className="aspect-2/1 relative overflow-hidden grid grid-cols-[1fr_auto_1fr] mt-5">
					{/* left court */}
					<div className=" relative bg-[#ff915c] z-10 rounded-l-md border-3 border-white border-r-0  grid grid-cols-2 grid-rows-3 place-items-center">
						<div className=" absolute right-[33%] h-full w-1 bg-white/60" />
						{COURT_LEFT_POSITIONS.map((zone) => {
							const slot = home.lineup.find((s) => s.position === zone);

							if (!slot) return null;

							const player = home.players.find((p) => p.id === slot.playerId);

							if (!player) return null;

							return (
								<PlayerIcon
									key={zone}
									team="home"
									player={player}
									position={zone}
									setTarget={setTarget}
								/>
							);
						})}
					</div>

					{/* Net */}
					<div className="bg-mauve-800 z-50 h-full w-3 rounded-full" />

					{/* right court */}
					<div className="  relative bg-[#ff915c] z-10 rounded-r-md border-3 border-white border-l-0 grid grid-cols-2 grid-rows-3 place-items-center">
						<div className=" absolute left-[33%] h-full w-1 bg-white/60" />

						{COURT_RIGHT_POSITIONS.map((zone) => {
							const slot = away.lineup.find((s) => s.position === zone);

							if (!slot) return null;

							const player = away.players.find((p) => p.id === slot.playerId);

							if (!player) return null;

							return (
								<PlayerIcon
									key={zone}
									team="away"
									player={player}
									position={zone}
									setTarget={setTarget}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<LineupSelectDialog
				open={!!target}
				onOpenChange={(open: boolean) => !open && setTarget(null)}
				zone={target?.position}
				players={availablePlayers()}
				teamName={target ? matchStore.match[target.team].name : ''}
				assignPlayer={assignPlayer}
			/>
		</div>
	);
}
