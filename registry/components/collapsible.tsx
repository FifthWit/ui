"use client";

import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type CollapsibleContextType = {
	height: number | null;
	setHeight: (v: number) => void;
	maxIndex: number;
	setMaxIndex: (v: number) => void;
	isOpen: boolean;
};

const CollapsibleContext = React.createContext<CollapsibleContextType | null>(
	null,
);

function useCollapsibleContext() {
	const context = React.useContext(CollapsibleContext);
	if (!context) {
		throw new Error(
			"useCollapsibleContext must be used within a CollapsibleContext.Provider",
		);
	}
	return context;
}

export function Collapsible({
	className,
	open,
	onOpenChange,
	defaultOpen,
	...props
}: CollapsiblePrimitive.CollapsibleProps) {
	const [height, setHeight] = React.useState<number | null>(null);
	const [maxIndex, setMaxIndex] = React.useState<number>(0);
	const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false);

	const handleOpenChange = (val: boolean) => {
		setIsOpen(val);
		onOpenChange?.(val);
	};

	return (
		<CollapsibleContext.Provider
			value={{
				height,
				setHeight,
				isOpen: open ?? isOpen,
				maxIndex,
				setMaxIndex,
			}}
		>
			<CollapsiblePrimitive.Root
				className={cn("flex flex-col justify-center items-center", className)}
				open={open ?? isOpen}
				onOpenChange={handleOpenChange}
				defaultOpen={defaultOpen}
				{...props}
			/>
		</CollapsibleContext.Provider>
	);
}

export function CollapsibleTrigger({
	...props
}: CollapsiblePrimitive.CollapsibleTriggerProps) {
	return <CollapsiblePrimitive.Trigger {...props} />;
}

export function CollapsibleContent({
	className,
	children,
	...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
	children: React.ReactNode;
}) {
	const { setMaxIndex, isOpen } = useCollapsibleContext();

	React.useEffect(() => {
		setMaxIndex(React.Children.count(children));
	}, [children, setMaxIndex]);

	return (
		<CollapsiblePrimitive.Content
			className={cn(
				"m-2 flex flex-col gap-2",
				isOpen ? "h-auto" : "h-32.5",
				className,
			)}
			forceMount
			{...props}
		>
			<AnimatePresence mode="popLayout" initial={false}>
				{children}
			</AnimatePresence>
		</CollapsiblePrimitive.Content>
	);
}

export type CollapsibleItemProps = React.ComponentPropsWithoutRef<
	typeof motion.div
> & {
	index: number;
	open?: boolean;
};

export function CollapsibleItem({
	children,
	className,
	index,
	open: openProp,
	...motionProps
}: CollapsibleItemProps) {
	const {
		maxIndex,
		height,
		setHeight,
		isOpen: contextOpen,
	} = useCollapsibleContext();
	const internalRef = React.useRef<HTMLDivElement | null>(null);
	const open = openProp ?? contextOpen;
	const closedHeight = height ?? 90;

	React.useEffect(() => {
		if (internalRef.current && index === 0) {
			setHeight(internalRef.current.clientHeight);
		}
	}, [index, setHeight]);

	return (
		<motion.div
			layout
			animate={
				open
					? { scale: 1, y: 0, opacity: 1 }
					: {
							scale: 1 - 0.05 * index,
							y: 0 - index * closedHeight,
							opacity: index > 3 ? 0 : 1,
						}
			}
			initial={
				open || maxIndex < 4
					? {
							scale: 0.8,
							opacity: 0,
							y: 0 - index * closedHeight + (height ?? 90) / 2,
						}
					: false
			}
			exit={
				open
					? { scale: 0.8, opacity: 0, y: -20 }
					: { scale: 0.8, opacity: 0, y: 0 - index * closedHeight - 20 }
			}
			className={cn(
				"flex bg-card w-lg min-h-24 h-fit rounded-2xl border p-4 gap-x-2 shadow-xl",
				className,
			)}
			style={{ zIndex: 0 - index, ...motionProps.style }}
			transition={{
				duration: 0.35,
				type: "spring",
				bounce: 0.15,
			}}
			{...motionProps}
		>
			{children}
		</motion.div>
	);
}

export { useCollapsibleContext };
