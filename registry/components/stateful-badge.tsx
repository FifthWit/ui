import React, {
	ComponentPropsWithRef,
	forwardRef,
	Ref,
	useImperativeHandle,
	useRef,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "lucide-react";
import {
	CheckFatIcon,
	MinusIcon,
	WarningIcon,
	XIcon,
} from "@phosphor-icons/react";

type stateTypes = "idle" | "error" | "success" | "warning";

export interface StatefulBadgeHandle {
	updateState: (newState: stateTypes) => void;
}

interface StatefulBadgeProps {
	initialState: stateTypes;
	ref: Ref<StatefulBadgeHandle>;
}

export function StatefulBadge({ initialState, ref }: StatefulBadgeProps) {
	const [badgeState, setBadgeState] = React.useState<stateTypes>(initialState);
	const badgeRef = useRef(null);

	useImperativeHandle(ref, () => ({
		updateState(newState: stateTypes) {
			setBadgeState(newState);
		},
	}));

	const badgeStyles: {
		type: stateTypes;
		className: string;
		icon: React.ReactNode;
	}[] = [
		{
			type: "idle",
			className:
				"bg-primary/10 w-full aspect-square rounded-full flex items-center justify-center",
			icon: (
				<MinusIcon
					size={128}
					weight="bold"
					className="mt-1 ml-1 text-background/85"
				/>
			),
		},
		{
			type: "success",
			className:
				"bg-green-400/80 w-full aspect-square rounded-full flex items-center justify-center",
			icon: <CheckIcon size={96} className="mt-1 ml-1 text-background" />,
		},
		{
			type: "error",
			className:
				"bg-destructive/90 w-full aspect-square rounded-full flex items-center justify-center",
			icon: <XIcon size={128} className="text-background" />,
		},
		{
			type: "warning",
			className:
				"bg-yellow-400/85 w-full aspect-square rounded-full flex items-center justify-center",
			icon: <WarningIcon size={110} className="mb-3 text-background" />,
		},
	];

	return (
		<div className="rounded-full w-40 aspect-square flex items-center justify-center p-2">
			<AnimatePresence mode="popLayout">
				{badgeStyles
					.filter((style) => style.type === badgeState)
					.map((style) => (
						<motion.div
							key={style.type}
							className={style.className}
							initial={{ scale: 0.6, opacity: 0, filter: 'blur(10px)' }}
							animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
							exit={{ scale: 0.6, opacity: 0, filter: 'blur(10px)' }}
							transition={{
								type: "spring",
								stiffness: 500,
								damping: 30,
							}}
						>
							{style.icon}
						</motion.div>
					))}
			</AnimatePresence>
		</div>
	);
}
