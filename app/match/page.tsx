'use client';
import { useMatchStore } from '@/lib/matchStore';

export default function MatchPage() {
	const { match } = useMatchStore();

	if (!match) return <p>NO MATCH</p>;
	return (
		<div className="">
			<div className="">Hello world </div>
		</div>
	);
}
