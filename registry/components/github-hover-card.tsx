import React, { createContext, useContext, forwardRef } from "react";
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
					role="link"
					onMouseEnter={() => {
						setIsHovered(true);
					}}
					onMouseLeave={() => {
						setIsHovered(false);
					}}
					ref={ref}
					className={cn(
						"group relative overflow-hidden px-12 pt-8 sm:w-sm lg:w-lg w-2xs aspect-4/5 flex flex-col justify-between border-2 bg-background hover:border-muted-foreground/30 transition-colors duration-300 ease-out",
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
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
	return (
		<h2
			className={cn(
				"text-foreground text-3xl font-bold z-10 group-hover:not-dark:text-white/90 transition-colors duration-300 ease-out",
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</h2>
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
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={cn(
				"text-muted-foreground group-hover:not-dark:text-white/45 dark:text-foreground/50 text-sm md:text-lg font-semibold z-10 transition-colors duration-300 ease-out",
				className,
			)}
			{...props}
		>
			{children}
		</p>
	);
});

GhCardLabel.displayName = "GhCardLabel";

const GhCardHeader = forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
	return (
		<h3
			ref={ref}
			className={cn(
				"text-foreground group-hover:not-dark:text-white/90 text-md md:text-xl z-10 font-semibold transition-colors duration-300 ease-out",
				className,
			)}
			{...props}
		>
			{children}
		</h3>
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
				"text-sm md:text-base text-[#a8d6ff] dark:text-[#79c0ff] z-10 transition-all duration-200 ease-out font-mono",
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
