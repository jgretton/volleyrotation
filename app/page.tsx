import Link from 'next/link';

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto w-full px-4 flex flex-col">
			<Link href={'/setup'} className="hover:underline">
				Setup
			</Link>
			<Link href={'/match'} className="hover:underline">
				Match
			</Link>
		</div>
	);
}
