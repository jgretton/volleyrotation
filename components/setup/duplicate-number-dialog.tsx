import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DuplicateNumberDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	homeName: string;
	awayName: string;
	homeDuplicates: number[];
	awayDuplicates: number[];
	onConfirm: () => void;
};

export default function DuplicateNumberDialog({
	open,
	onOpenChange,
	homeName,
	awayName,
	homeDuplicates,
	awayDuplicates,
	onConfirm,
}: DuplicateNumberDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Just checking the numbers</AlertDialogTitle>
					<AlertDialogDescription asChild>
						<div>
							<p>
								We noticed some players share a shirt number. You can carry on, we
								just wanted to check it was intentional first.
							</p>
							<ul className="mt-2 list-disc pl-4">
								{homeDuplicates.length > 0 && (
									<li>
										{homeName}: {homeDuplicates.map((n) => `#${n}`).join(", ")}
									</li>
								)}
								{awayDuplicates.length > 0 && (
									<li>
										{awayName}: {awayDuplicates.map((n) => `#${n}`).join(", ")}
									</li>
								)}
							</ul>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Go back</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>
						Continue anyway
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
