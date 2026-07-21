'use client';

import StepProgress from '@/components/setup/step-progress';
import PlayerDetailsStep from './steps/player-details-step';
import StartingLineupStep from './steps/starting-lineup-step';
import TeamNameStep from './steps/team-name-step';

import { TOTAL_STEPS } from '@/lib/constants';
import { useMatchStore } from '@/lib/matchStore';
import { useRouter } from 'next/navigation';
import HydrationZustand from '../hydration-zustand';

export default function SetupWizard() {
	const currentStep = useMatchStore((state) => state.setup.currentStep);
	const setCurrentStep = useMatchStore((state) => state.setCurrentStep);
	const router = useRouter();

	const nextStep = () => {
		if (currentStep >= TOTAL_STEPS) return;
		setCurrentStep(currentStep + 1);
	};

	const completeSetup = () => {
		router.push('/match');
	};

	const previousStep = () => {
		if (currentStep <= 1) return;

		setCurrentStep(currentStep - 1);
	};

	console.log(currentStep);

	return (
		<HydrationZustand>
			<div className="flex flex-1 flex-col">
				<StepProgress step={currentStep} previousStep={previousStep} />
				<div className="mt-5 flex flex-1 flex-col">
					{currentStep === 1 && <TeamNameStep nextStep={nextStep} />}
					{currentStep === 2 && <PlayerDetailsStep nextStep={nextStep} />}
					{currentStep === 3 && (
						<StartingLineupStep completeSetup={completeSetup} />
					)}
				</div>
			</div>
		</HydrationZustand>
	);
}
