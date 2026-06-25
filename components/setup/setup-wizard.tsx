"use client";

import StepProgress from "@/components/setup/step-progress";
import { useState } from "react";
import PlayerDetailsStep from "./steps/player-details-step";
import TeamNameStep from "./steps/team-name-step";

export default function SetupWizard() {
	const [currentStep, setCurrentStep] = useState<number>(1);

	const nextStep = () => {
		setCurrentStep((prev) => prev + 1);
	};

	const previousStep = () => {
		setCurrentStep((prev) => {
			if (prev <= 1) return prev;
			else return prev - 1;
		});
	};

	return (
		<div className="flex flex-1 flex-col">
			<StepProgress step={currentStep} previousStep={previousStep} />
			<div className="mt-5 flex flex-1 flex-col">
				{currentStep === 1 && <TeamNameStep nextStep={nextStep} />}
				{currentStep === 2 && <PlayerDetailsStep nextStep={nextStep} />}
			</div>
		</div>
	);
}
