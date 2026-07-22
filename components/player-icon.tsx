import type { Player } from '@/lib/types';

const TEAM_STYLES = {
	home: 'bg-olive-600',
	away: 'bg-mauve-600',
};

export default function PlayerIcon({
	team,
	player,
	position,
	setTarget,
}: {
	team: 'home' | 'away';
	player: Player;
	position: number;
	setTarget: (
		target: { team: 'home' | 'away'; position: number } | null
	) => void;
}) {
	return (
		<div
			onClick={() => setTarget({ team, position })}
			className={`size-[clamp(2.25rem,15cqw,4rem)] text-[clamp(1rem,3.6cqw,1.75rem)] font-bold rounded-full ${TEAM_STYLES[team]} border-2 border-white flex items-center text-white justify-center touch-none select-none cursor-pointer`}
		>
			<span className="text-lg   font-normal">#</span>
			{player.number}
		</div>
	);
}
