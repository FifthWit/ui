"use client";

import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type CollapsibleContextType = {
	height: number | null;
	setHeight: (v: number) => void;
	maxIndex: number;
	setMaxIndex: (v: number) => void;
	isOpen: boolean;
} & Required<CollapsibleCustomizations>;

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

type CollapsibleCustomizations = {
	/** Number of items visible in the stack when collapsed. @default 4 */
	maxVisibleItems?: number;
	/** gap in px between cards. Do not manually set with CSS @default 8 */
	gap?: number;
	scaleStep?: number;
	springConfig?: { duration?: number; bounce?: number };
	fallbackHeight?: number;
};

const DEFAULT_SPRING = { duration: 0.2, bounce: 0.1 } as const;

export function Collapsible({
	className,
	ref,
	open = false,
	onOpenChange,
	defaultOpen,
	maxVisibleItems = 4,
	scaleStep = 0.05,
	springConfig = DEFAULT_SPRING,
	fallbackHeight = 90,
	gap = 8,
	...props
}: CollapsiblePrimitive.CollapsibleProps &
	CollapsibleCustomizations & { ref?: React.Ref<HTMLDivElement> }) {
	const [height, setHeight] = React.useState<number | null>(null);
	const [maxIndex, setMaxIndex] = React.useState<number>(0);

	return (
		<CollapsibleContext.Provider
			value={{
				height,
				setHeight,
				isOpen: open,
				maxIndex,
				setMaxIndex,
				maxVisibleItems,
				scaleStep,
				springConfig,
				fallbackHeight,
				gap,
			}}
		>
			<CollapsiblePrimitive.Root
				ref={ref}
				className={cn("flex flex-col items-center", className)}
				open={open}
				onOpenChange={onOpenChange}
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
			{children}
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
	const {
		height,
		maxIndex,
		setMaxIndex,
		isOpen,
		gap,
		fallbackHeight,
		maxVisibleItems,
	} = useCollapsibleContext();

	React.useEffect(() => {
		setMaxIndex(React.Children.count(children));
	}, [children, setMaxIndex]);

	const childArray = React.Children.toArray(children);

	return (
		<CollapsiblePrimitive.Content
			className={cn("m-2 flex flex-col", className)}
			style={{
				gap: `${gap}px`,
				...(isOpen
					? { height: "auto" }
					: {
							height:
								(height == null ? fallbackHeight : height) +
								gap *
									((maxIndex < maxVisibleItems ? maxIndex : maxVisibleItems) -
										1),
						}),
			}}
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
};

export function CollapsibleItem({
	children,
	index = 0,
	className,
	...props
}: CollapsibleItemProps) {
	const {
		scaleStep,
		height,
		setHeight,
		fallbackHeight,
		isOpen,
		maxVisibleItems,
		springConfig,
		maxIndex,
	} = useCollapsibleContext();
	const internalRef = React.useRef<HTMLDivElement | null>(null);
	const closedHeight = height ?? fallbackHeight;

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
				isOpen
					? { scale: 1, y: 0, opacity: 1 }
					: {
							scale: 1 - scaleStep * index,
							// needed to keep uniform stacking distance regardless of the height, the first part places the divs all on top of each other with only the gap from padding moving them,
							// but with large heights the parallax-esque scale effect can actually hide it under the top item, so we take its height,
							// and multiply it by scaleStep*index which gives us the value of the height it loses,
							// then we offset it by that value/2 to push it down again regardless of height.
							y:
								0 -
								index * closedHeight +
								(closedHeight * (scaleStep * index)) / 2,
							opacity: index > maxVisibleItems - 1 ? 0 : 1,
						}
			}
			initial={
				!isOpen && index < maxVisibleItems
					? {
							...defaultScaleAnimation,
							y: 0 - index * closedHeight - closedHeight / 2,
						}
					: isOpen
						? { scale: 0.8, opacity: 0.6, y: -20 }
						: false
			}
			exit={
				isOpen
					? { ...defaultScaleAnimation, y: -20 }
					: {
							...defaultScaleAnimation,
							y: 0 - index * closedHeight - 20,
						}
			}
			style={{ zIndex: maxIndex - index, ...props.style }}
			transition={{
				type: "spring",
				...springConfig,
			}}
			{...props}
		>
			<div
				ref={internalRef}
				aria-hidden={!(isOpen || !(index > 0))}
				className={cn(
					"flex bg-card rounded-2xl p-4 shadow-sm ring ring-border ring-inset", // Ring is needed since border offsets, then breaks the CollapsibleContent sizing calculations.
					className,
				)}
			>
				{children}
			</div>
		</motion.div>
	);
}

export { useCollapsibleContext };
