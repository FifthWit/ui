"use client";

import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { Slot } from "@radix-ui/react-slot";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type CollapsibleContextType = {
	height: number | null;
	setHeight: (v: number) => void;
	maxIndex: number; // Not currently needed, but potentially useful if adding a `side` prop needs adding
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
				className={cn("flex flex-col items-center", className)}
				open={open ?? isOpen}
				onOpenChange={handleOpenChange}
				defaultOpen={defaultOpen}
				{...props}
			/>
		</CollapsibleContext.Provider>
	);
}

export function CollapsibleTrigger({
	asChild = false,
	children,
	...props
}: CollapsiblePrimitive.CollapsibleTriggerProps) {
	return (
		<CollapsiblePrimitive.Trigger asChild={asChild} {...props}>
			{asChild ? <Slot>{children}</Slot> : children}
		</CollapsiblePrimitive.Trigger>
	);
}

export function CollapsibleContent({
	className,
	children,
	...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
	children: React.ReactNode;
}) {
	const { height, maxIndex, setMaxIndex, isOpen } = useCollapsibleContext();

	React.useEffect(() => {
		setMaxIndex(React.Children.count(children));
	}, [children, setMaxIndex]);

	const childArray = React.Children.toArray(children);

	return (
		<CollapsiblePrimitive.Content
			className={cn("m-2 flex flex-col gap-2", className)}
			style={
				isOpen
					? { height: "auto" }
					: {
							// Jerry rigged height calcs, its taking the front element's height, adding roughly how many elements are visible below it multiplied by the gap(8px)
							height: `${height ?? 90 + (maxIndex < 4 ? maxIndex * 8 : 5 * 8)}px`,
						}
			}
			forceMount
			{...props}
		>
			<AnimatePresence mode="popLayout" initial={false}>
				{childArray.map((child, index) =>
					React.isValidElement(child)
						? React.cloneElement(
								child as React.ReactElement<CollapsibleItemProps>,
								{ index },
							)
						: child,
				)}
			</AnimatePresence>
		</CollapsiblePrimitive.Content>
	);
}

export type CollapsibleItemProps = Omit<
	React.ComponentPropsWithoutRef<typeof motion.div>,
	"children"
> & {
	index?: number;
	children: React.ReactNode;
	rootClassName?: string;
};

export function CollapsibleItem({
	children,
	className,
	index = 0,
	rootClassName,
	...props
}: CollapsibleItemProps) {
	const { height, setHeight, isOpen } = useCollapsibleContext();
	const internalRef = React.useRef<HTMLDivElement | null>(null);
	const open = isOpen;
	const closedHeight = height ?? 90;

	React.useEffect(() => {
		if (internalRef.current && index === 0) {
			setHeight(internalRef.current.clientHeight);
		}
	}, [index, setHeight]);
	const defaultScaleAnimation = {
		scale: 0.8,
		opacity: 0,
	};
	return (
		<motion.div
			layout
			animate={
				open
					? { scale: 1, y: 0, opacity: 1 }
					: {
							scale: 1 - 0.05 * index,
							// needed to keep uniform stacking distance regardless of the height, the first part places the divs all on top of each other with only the gap from padding moving them,
							// but with large heights the parallax-esque scale effect can actually hide it under the top item, so we take its height,
							// and multiply it by 0.05*index which gives us the value of the height it loses,
							// then we offset it by that value/2 to push it down again regardless of height.
							y: 0 - index * closedHeight + (closedHeight * (0.05 * index)) / 2,
							opacity: index > 3 ? 0 : 1,
						}
			}
			initial={
				// The cards need to have their height manually set to where it should be, otherwise the component starts where it'd be if it was open
				!open && index < 4
					? {
							...defaultScaleAnimation,
							y: 0 - index * closedHeight - closedHeight / 2,
						}
					: open
						? { scale: 0.8, opacity: 0.6, y: -20 }
						: false
			}
			exit={
				open
					? { ...defaultScaleAnimation, y: -20 }
					: { ...defaultScaleAnimation, y: 0 - index * closedHeight - 20 }
			}
			style={{ zIndex: 0 - index, ...props.style }}
			transition={{
				duration: 0.35,
				type: "spring",
				bounce: 0.15,
			}}
			className={cn(rootClassName)}
			{...props}
		>
			<div
				ref={internalRef}
				className={cn(
					"flex bg-card w-[calc(100vw-16px)] max-w-lg rounded-2xl border p-4 shadow-2xl",
					className,
				)}
			>
				{children}
			</div>
		</motion.div>
	);
}

export { useCollapsibleContext };
