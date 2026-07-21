import SetupWizard from '@/components/setup/setup-wizard';

export default function SetupPage() {
	return (
		<div className="max-w-7xl mx-auto w-full px-4 flex flex-1 flex-col">
			<h1 className="text-center text-lg">Setup</h1>
			<div className="mt-5 flex flex-1 flex-col">
				<SetupWizard />
			</div>
		</div>
	);
}
