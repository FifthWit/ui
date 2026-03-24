import { cn } from "@/lib/utils";

type SpinnerRainbowBorderProps = {
	loading: boolean;
	children?: React.ReactNode;
	glow?: boolean;
	border?: boolean;
} & React.ComponentProps<"div">;

export function SpinnerRainbowBorder({
	loading,
	children,
	className,
	glow = true,
	border = true,
	...props
}: SpinnerRainbowBorderProps) {
	return (
		<div
			data-loading={loading}
			data-glow={glow}
			data-show-border={border}
			className={cn(
				// Is this ugly? Yes. Does it work? Yes.
				"relative",
				"[&::before]:ease-[inherit] [&::after]:ease-[inherit] [&::before]:rounded-[inherit] [&::after]:rounded-[inherit] [&::after]:duration-[inherit] [&::before]:duration-[inherit]",
				"data-[show-border=true]:data-[loading=true]:before:animate-angle-spin data-[show-border=true]:data-[loading=true]:before:content-[''] data-[show-border=true]:data-[loading=true]:before:absolute data-[show-border=true]:data-[loading=true]:before:-left-0.5 data-[show-border=true]:data-[loading=true]:before:-top-0.5 data-[show-border=true]:data-[loading=true]:before:[background:conic-gradient(from_var(--spinner-angle),#fb0094,#0000ff,#00ff00,#ffff00,#ff0000,#fb0094)] data-[show-border=true]:data-[loading=true]:before:w-[calc(100%+4px)] data-[show-border=true]:data-[loading=true]:before:h-[calc(100%+4px)] data-[show-border=true]:data-[loading=true]:before:-z-1",
				"data-[loading=true]:after:animate-angle-spin data-[loading=true]:after:content-[''] data-[loading=true]:after:absolute data-[loading=true]:after:-left-0.5 data-[loading=true]:after:-top-0.5 data-[loading=true]:after:[background:conic-gradient(from_var(--spinner-angle),#fb0094,#0000ff,#00ff00,#ffff00,#ff0000,#fb0094)] data-[loading=true]:after:w-[calc(100%+4px)] data-[loading=true]:after:h-[calc(100%+4px)] data-[loading=true]:data-[glow=true]:after:blur-xl data-[loading=true]:after:-z-1",
				// Normal styles
				"bg-background p-4 [&_:is(h1,h2,h3)]:text-lg min-w-3xs w-fit",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

type SpinnerOutlineProps = {
	loading: boolean;
	children?: React.ReactNode;
	styling?: {
		primary?: string;
		background?: string;
		length?: string;
	};
} & React.ComponentProps<"div">;

export function SpinnerOutline({
	children,
	loading,
	className,
	styling,
	...props
}: SpinnerOutlineProps) {
	const defaultStyling: SpinnerOutlineProps["styling"] = {
		primary: "var(--primary)",
		background: "var(--background)",
		length: "85%",
	};

	styling = { ...defaultStyling, ...styling };

	return (
		<div
			style={
				{
					"--gradient-primary": styling.primary,
					"--gradient-background": styling.background,
					"--gradient-length": styling.length,
				} as React.CSSProperties
			}
			data-loading={loading}
			className={cn(
				"p-4 bg-background relative rounded-full min-w-3xs w-fit",
				"[&::before]:ease-[inherit] [&::after]:ease-[inherit] [&::after]:duration-[inherit] [&::before]:duration-[inherit]",
				"after:rounded-[inherit] data-[loading=true]:after:animate-angle-spin data-[loading=true]:after:content-[''] data-[loading=true]:after:absolute data-[loading=true]:after:-left-0.5 data-[loading=true]:after:-top-0.5 data-[loading=true]:after:[background:conic-gradient(from_var(--spinner-angle),var(--gradient-background)_var(--gradient-length),var(--gradient-primary))] data-[loading=true]:after:w-[calc(100%+4px)] data-[loading=true]:after:h-[calc(100%+4px)] data-[loading=true]:after:-z-1",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
