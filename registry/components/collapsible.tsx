"use client";

import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import {
	AnimatePresence,
	motion,
	type TargetAndTransition,
	useAnimate,
	useReducedMotion,
	type VariantLabels,
} from "motion/react";
import { cn } from "@/lib/utils";

type CollapsibleContextType = {
	height: number | null;
	setHeight: (v: number) => void;
	maxIndex: number;
	setMaxIndex: (v: number) => void;
	isOpen: boolean;
	onOpenChange(open: boolean): void;
	prefersReducedMotion: boolean;
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
	clickToOpen?: boolean;
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
	clickToOpen = true,
	...props
}: CollapsiblePrimitive.CollapsibleProps &
	CollapsibleCustomizations & {
		ref?: React.Ref<HTMLDivElement>;
	}) {
	const [height, setHeight] = React.useState<number | null>(null);
	const [maxIndex, setMaxIndex] = React.useState<number>(0);
	const prefersReducedMotion = useReducedMotion();

	return (
		<CollapsibleContext.Provider
			value={{
				height,
				setHeight,
				maxIndex,
				setMaxIndex,
				isOpen: open,
				prefersReducedMotion: prefersReducedMotion ?? false,
				maxVisibleItems,
				scaleStep,
				springConfig,
				fallbackHeight,
				onOpenChange: onOpenChange ?? (() => {}),
				gap,
				clickToOpen,
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

function calcClosedContentHeight({
	height,
	maxIndex,
	maxVisibleItems,
	gap,
	isOpen,
}: {
	height: number;
	maxIndex: number;
	maxVisibleItems: number;
	gap: number;
	isOpen: boolean;
}): number | "auto" {
	if (isOpen) return "auto";

	return (
		height +
		gap * ((maxIndex < maxVisibleItems ? maxIndex : maxVisibleItems) - 1)
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
		clickToOpen,
		onOpenChange,
		springConfig,
		prefersReducedMotion,
	} = useCollapsibleContext();

	const [scope, animate] = useAnimate<HTMLDivElement>();
	const hasInitialized = React.useRef(false);

	React.useEffect(() => {
		setMaxIndex(React.Children.count(children));
	}, [children, setMaxIndex]);

	const targetHeight = calcClosedContentHeight({
		height: height ?? fallbackHeight,
		maxIndex,
		maxVisibleItems,
		gap,
		isOpen,
	});

	React.useLayoutEffect(() => {
		if (!scope.current) return;
		if (!hasInitialized.current) {
			if (targetHeight === "auto") {
				scope.current.style.height = "auto";
			} else {
				scope.current.style.height = `${targetHeight}px`;
			}
			hasInitialized.current = true;
		}
	}, [scope, targetHeight]);

	React.useEffect(() => {
		if (!scope.current || !hasInitialized.current) return;

		if (targetHeight === "auto") {
			const currentHeight = scope.current.getBoundingClientRect().height;
			const scrollHeight = scope.current.scrollHeight;

			if (currentHeight === scrollHeight) {
				scope.current.style.height = "auto";
				return;
			}

			scope.current.style.height = `${currentHeight}px`;

			animate(
				scope.current,
				{ height: scrollHeight },
				prefersReducedMotion
					? { duration: 0 }
					: { type: "spring", ...springConfig },
			).then(() => {
				if (scope.current) scope.current.style.height = "auto";
			});
		} else {
			animate(
				scope.current,
				{ height: targetHeight },
				prefersReducedMotion
					? { duration: 0 }
					: { type: "spring", ...springConfig },
			);
		}
	}, [targetHeight, animate, scope, springConfig, prefersReducedMotion]);

	const childArray = React.Children.toArray(children);

	return (
		<CollapsiblePrimitive.Content
			ref={scope}
			className={cn("m-2 flex flex-col", className)}
			style={{
				gap: `${gap}px`,
				overflow: "hidden",
			}}
			onClick={() => {
				clickToOpen && !isOpen && onOpenChange(true);
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

interface CalcItemBase {
	prefersReducedMotion: boolean;
	isOpen: boolean;
	index: number;
	scaleStep: number;
	closedHeight: number;
	maxVisibleItems: number;
}

function calcItemAnimate({
	prefersReducedMotion,
	isOpen,
	index,
	scaleStep,
	closedHeight,
	maxVisibleItems,
}: CalcItemBase): TargetAndTransition | VariantLabels | boolean {
	if (prefersReducedMotion) return { opacity: isOpen || index === 0 ? 1 : 0 };
	else if (isOpen) return { scale: 1, y: 0, opacity: 1 };

	return {
		scale: 1 - scaleStep * index,
		y: 0 - index * closedHeight + (closedHeight * (scaleStep * index)) / 2,
		opacity: index > maxVisibleItems - 1 ? 0 : 1,
	};
}

function calcItemInitial({
	prefersReducedMotion,
	isOpen,
	index,
	closedHeight,
	maxVisibleItems,
}: CalcItemBase): TargetAndTransition | VariantLabels | boolean {
	if (prefersReducedMotion) return false;
	else if (!isOpen && index < maxVisibleItems)
		return {
			...DEFAULT_SCALE_ANIMATION,
			y: 0 - index * closedHeight - closedHeight / 2,
		};
	return isOpen ? { scale: 0.8, opacity: 0.6, y: -20 } : false;
}

function calcItemExit({
	prefersReducedMotion,
	isOpen,
	index,
	closedHeight,
}: CalcItemBase): TargetAndTransition | VariantLabels | undefined {
	if (prefersReducedMotion) return undefined;
	return {
		...DEFAULT_SCALE_ANIMATION,
		y: isOpen ? -20 : -index * closedHeight - 20,
	};
}

const DEFAULT_SCALE_ANIMATION = { scale: 0.8, opacity: 0 } as const;

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
		prefersReducedMotion,
	} = useCollapsibleContext();

	const internalRef = React.useRef<HTMLDivElement | null>(null);
	const closedHeight = height ?? fallbackHeight;

	React.useEffect(() => {
		if (internalRef.current && index === 0) {
			setHeight(internalRef.current.clientHeight);
		}
	}, [index, setHeight]);

	const animationPropsBase = {
		prefersReducedMotion,
		isOpen,
		index,
		scaleStep,
		closedHeight,
		maxVisibleItems,
	};
	return (
		<motion.div
			layout={!prefersReducedMotion}
			animate={calcItemAnimate(animationPropsBase)}
			initial={calcItemInitial(animationPropsBase)}
			exit={calcItemExit(animationPropsBase)}
			style={{ zIndex: maxIndex - index, ...props.style }}
			transition={{
				type: "spring",
				...springConfig,
				opacity: {
					type: "tween",
					ease: "linear",
					duration: prefersReducedMotion ? 0 : 0.1,
				},
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
