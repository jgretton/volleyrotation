import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HydrationZustand({ children }) {
	const [isHydrated, setIsHydrated] = useState(false);

	// Wait till Next.js rehydration completes
	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<>
			{isHydrated ? (
				<div>{children}</div>
			) : (
				<div className="flex size-full flex-1 items-center justify-center gap-2">
					Loading <Loader2 className="animate-spin" />
				</div>
			)}
		</>
	);
}
