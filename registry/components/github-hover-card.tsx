import React, {
	createContext,
	useContext,
	forwardRef,
	HtmlHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface GhCardContextValue {
	isHovered?: boolean;
	setIsHovered?: (v: boolean) => void;
}

const GhCardContext = createContext<GhCardContextValue | null>(null);

function useGhCard() {
	const ctx = useContext(GhCardContext);
	if (!ctx)
		throw new Error("GitHub Card components must be used inside GhCardRoot");
	return ctx;
}

interface GhCardRootProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
	as?: React.ElementType;
	href?: string;
}

const GhCardRoot = forwardRef<HTMLElement, GhCardRootProps>(
	({ className, children, as: Component = "a", ...props }, ref) => {
		const [isHovered, setIsHovered] = React.useState(false);

		return (
			<GhCardContext.Provider value={{ isHovered, setIsHovered }}>
				<Component
					onMouseEnter={() => {
						setIsHovered(true);
					}}
					onMouseLeave={() => {
						setIsHovered(false);
					}}
					ref={ref}
					className={cn(
						"relative overflow-hidden px-12 pt-8 h-116 w-106 flex flex-col justify-between border-2",
						isHovered ? "border-muted-foreground/30" : "",
						className,
					)}
					{...props}
				>
					{children}
				</Component>
			</GhCardContext.Provider>
		);
	},
);

GhCardRoot.displayName = "GhCardRoot";

const GhCardContent = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	const { isHovered } = useGhCard();
	return (
		<div
			className={cn(
				"flex flex-col gap-3 duration-300 transition-all ease-out",
				className,
				isHovered ? "pb-6" : "pb-0",
			)}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	);
});

GhCardContent.displayName = "GhCardContent";

const GhCardTitle = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
	return (
		<div
			className={cn("text-foreground text-3xl font-bold z-10", className)}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	);
});

GhCardTitle.displayName = "GhCardTitle";

interface GhCardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	blur?: string;
	darken?: number;
}

const GhCardImage = forwardRef<HTMLImageElement, GhCardImageProps>(
	({ className, alt, blur = "0px", darken = 0, style, ...props }, ref) => {
		const { isHovered } = useGhCard();
		return (
			<span
				className={cn(
					"absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden transition-all duration-300 ease-out",
					className,
					isHovered ? "opacity-100" : "opacity-0",
				)}
			>
				<img
					ref={ref}
					alt={alt}
					className="block w-full h-full object-cover"
					style={{
						filter: `blur(${blur}) brightness(${1 - darken})`,
					}}
					{...props}
				/>
			</span>
		);
	},
);

GhCardImage.displayName = "GhCardImage";

const GhCardLabel = forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={cn("text-foreground/40 text-lg font-semibold z-10", className)}
			{...props}
		>
			{children}
		</span>
	);
});

GhCardLabel.displayName = "GhCardLabel";

const GhCardHeader = forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={cn("text-foreground text-xl z-10 font-semibold", className)}
			{...props}
		>
			{children}
		</span>
	);
});

GhCardHeader.displayName = "GhCardHeader";

const GhCardSubHeader = forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
	const { isHovered } = useGhCard();
	return (
		<span
			ref={ref}
			className={cn(
				"text-base text-[#79c0ff] z-10 transition-all duration-200 ease-out font-mono",
				isHovered ? "opacity-100 translate-y-0" : "opacity-0",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
});

GhCardSubHeader.displayName = "GhCardSubHeader";

export {
	GhCardRoot,
	GhCardLabel,
	GhCardHeader,
	GhCardSubHeader,
	GhCardImage,
	GhCardTitle,
	GhCardContent,
};
