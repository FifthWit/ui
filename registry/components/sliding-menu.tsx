import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";

type SlidingMenuContextType = {
	currentPage: string;
	navigateToPage: (pageId: string) => void;
	navigateBack: () => void;
	pageHistory: string[];
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
};

const SlidingMenuContext = createContext<SlidingMenuContextType | null>(null);

function useSlidingMenu() {
	const context = useContext(SlidingMenuContext);
	if (!context) {
		throw new Error("useSlidingMenu must be used within SlidingMenu");
	}
	return context;
}

function SlidingMenu({
	children,
	onPageChange,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root> & {
	onPageChange?: (pageId: string) => void;
}) {
	const [currentPage, setCurrentPage] = useState("default");
	const [pageHistory, setPageHistory] = useState<string[]>(["default"]);
	const [isOpen, setIsOpen] = useState(false);

	const navigateToPage = useCallback(
		(pageId: string) => {
			setCurrentPage(pageId);
			setPageHistory((prev) => [...prev, pageId]);
			onPageChange?.(pageId);
		},
		[onPageChange],
	);

	const navigateBack = useCallback(() => {
		setPageHistory((prev) => {
			const newHistory = prev.slice(0, -1);
			if (newHistory.length > 0) {
				const newPage = newHistory[newHistory.length - 1];
				setCurrentPage(newPage);
				onPageChange?.(newPage);
			}
			return newHistory;
		});
	}, [onPageChange]);

	return (
		<SlidingMenuContext.Provider
			value={{
				currentPage,
				navigateToPage,
				navigateBack,
				pageHistory,
				isOpen,
				setIsOpen,
			}}
		>
			<PopoverPrimitive.Root
				open={isOpen}
				onOpenChange={() => {
					setIsOpen(!isOpen);
					setCurrentPage("default");
				}}
				data-slot="sliding-menu"
				{...props}
			>
				{children}
			</PopoverPrimitive.Root>
		</SlidingMenuContext.Provider>
	);
}

function SlidingMenuTrigger({
	children,
	className,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return (
		<PopoverPrimitive.Trigger
			className={className}
			data-slot="sliding-menu-trigger"
			{...props}
		>
			{children}
		</PopoverPrimitive.Trigger>
	);
}

function SlidingMenuPortal({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Portal>) {
	return <PopoverPrimitive.Portal data-slot="sliding-menu-portal" {...props} />;
}

function SlidingMenuContent({
	className,
	children,
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Content
			sideOffset={sideOffset}
			className={cn(
				"bg-popover w-56 h-60 rounded-xl p-0 overflow-hidden shadow-md border",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
				"data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2",
				"data-[side=left]:slide-in-from-right-2 data-[side=top]:slide-out-to-bottom-2",
				"data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-out-to-right-2",
				"data-[side=top]:slide-in-from-bottom-2 data-[side=right]:slide-out-to-left-2",
				className,
			)}
			data-slot="sliding-menu-content"
			{...props}
		>
			<div className="relative w-full h-full overflow-hidden">{children}</div>
		</PopoverPrimitive.Content>
	);
}

type SlidingMenuPageProps = {
	pageId: string;
	className?: string;
	children: React.ReactNode;
};

function SlidingMenuPage({
	pageId,
	className,
	children,
}: SlidingMenuPageProps) {
	const { currentPage, navigateBack, pageHistory } = useSlidingMenu();
	const isActive = currentPage === pageId;
	const isDefault = pageId === "default";

	const pageIndex = pageHistory.indexOf(pageId);
	const currentIndex = pageHistory.indexOf(currentPage);

	let translateValue = "100%";

	if (pageIndex !== -1) {
		if (pageIndex < currentIndex) {
			translateValue = "-100%";
		} else if (pageIndex === currentIndex) {
			translateValue = "0%";
		} else {
			translateValue = "100%";
		}
	}

	return (
		<div
			className={cn(
				"absolute inset-0 w-full h-full flex flex-col",
				"transition-transform duration-200 ease-out",
				className,
			)}
			style={{
				transform: `translateX(${translateValue})`,
			}}
			data-active={isActive}
		>
			{!isDefault && isActive && (
				<div className="flex items-center p-1 border-b">
					<button
						type="button"
						onClick={navigateBack}
						className="p-1 hover:bg-accent rounded-md transition-colors"
						aria-label="Go back"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
				</div>
			)}
			<div className="flex-1 p-1 overflow-y-auto">{children}</div>
		</div>
	);
}

type SlidingMenuItemProps = {
	onSelect?: () => void;
	navigateToPage?: string;
	className?: string;
	children: React.ReactNode;
	variant?: "default" | "destructive";
	disabled?: boolean;
};

function SlidingMenuItem({
	onSelect,
	navigateToPage,
	className,
	children,
	disabled,
	variant = "default",
}: SlidingMenuItemProps) {
	const { navigateToPage: navigate } = useSlidingMenu();

	const handleClick = () => {
		if (navigateToPage) {
			navigate(navigateToPage);
		}
		onSelect?.();
	};

	return (
		<button
			type="button"
			data-variant={variant}
			onClick={handleClick}
			data-disabled={disabled}
			className={cn(
				"w-full px-3 py-2 text-sm text-left rounded-lg cursor-pointer",
				"hover:bg-accent transition-colors",
				"flex items-center justify-between",
				"active:scale-98 duration-75 transition-transform",
				"data-disabled:cursor-not-allowed data-disabled:hover:bg-popover data-disabled:text-muted-foreground",
				"data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10",
				className,
			)}
		>
			{children}
		</button>
	);
}

function SlidingMenuSeperator({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return <div className="my-1 w-full h-px rounded-full bg-border" {...props} />;
}

export {
	SlidingMenu,
	SlidingMenuContent,
	SlidingMenuPortal,
	SlidingMenuTrigger,
	SlidingMenuPage,
	SlidingMenuItem,
	SlidingMenuSeperator,
	useSlidingMenu,
};
