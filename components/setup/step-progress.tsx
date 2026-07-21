import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';

import { TOTAL_STEPS } from '@/lib/constants';

export default function StepProgress({
	step,
	previousStep,
}: {
	step: number;
	previousStep: () => void;
}) {
	return (
		<div className="flex items-center flex-row">
			{step > 1 && (
				<Button
					className="py-2 h-full bg-transparent"
					type="button"
					variant="outline"
					onClick={previousStep}
				>
					<ChevronLeft /> back
				</Button>
			)}

			<div className="bg-gray-200 ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm">
				<p>Step</p>
				<p>
					{step}/{TOTAL_STEPS}
				</p>
			</div>
		</div>
	);
}
