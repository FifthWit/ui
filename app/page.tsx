"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SpinnerRainbowBorder } from "@/registry/components/spinner";
import { cn } from "@/lib/utils";
import type React from "react";

function ComponentPreview({
	className,
	children,
	url,
	title,
	desc,
}: {
	className?: string;
	children: React.ReactNode;
	url: string;
	title: string;
	desc: string;
}) {
	return (
		<Link
			href={url}
			className={cn(
				"group border border-card overflow-hidden w-sm bg-[repeating-linear-gradient(315deg,color-mix(in_oklab,#ffffff_5%,transparent)_0,color-mix(in_oklab,#ffffff_5%,transparent)_1px,transparent_0,transparent_50%)] bg-size-[8px_8px] bg-card/40 rounded-xl flex flex-col items-center ",
				className,
			)}
		>
			<div className="w-full aspect-square flex items-center justify-center group-hover:scale-110 duration-150 z-1 ease-out">
				{children}
			</div>
			<div className="w-full bg-card p-4">
				<h4 className="text-xl font-semibold">{title}</h4>
				<p className="text-sm text-muted-foreground">{desc}</p>
			</div>
		</Link>
	);
}

export default function Home() {
	return (
		<>
			{/* <nav className="fixed bg-background h-20 border-b md:border-0">
				navbar
			</nav> */}
			<main className="flex flex-col min-w-screen bg-fixed justify-center gap-4 p-2">
				<div className="flex flex-col gap-4 items-center w-full mt-20 mb-8">
					<Badge
						variant="outline"
						className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 hover:dark:bg-sky-900 hover:dark:text-sky-200 hover:bg-sky-200 hover:text-sky-900"
						asChild
					>
						<Link href="/docs/components/spinner">
							New: Spinner Component <ArrowRightIcon />
						</Link>
					</Badge>
					<h1 className="text-xl font-bold">fifth/ui</h1>
					<h2 className="text-foreground/80 w-2xs text-sm">
						Animated FOSS Components for your design needs. Built with React +
						Tailwind
					</h2>
					<div className="flex flex-row flex-between gap-2">
						<Button asChild>
							<Link href="/docs">Docs</Link>
						</Button>
						<Button asChild variant="outline">
							<Link
								href="https://github.com/FifthWit/ui"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</Link>
						</Button>
					</div>
				</div>
				<div className="flex flex-col w-full items-center justify-center">
					<div className="flex flex-row flex-wrap w-fit gap-4 justify-center max-w-296">
						<ComponentPreview
							title="Rainbow Spinner"
							desc="Beautiful glowing animated spinner using pure CSS + pseudo elements"
							url="/docs/components/spinner"
							className="safari:hidden" // Safari isn't able to properly render the component, some sort of webkit problem with pseudo elements and gradients i imagine
						>
							<SpinnerRainbowBorder
								className="aspect-square flex flex-col items-center justify-center text-center"
								loading={true}
							>
								<p>Our New GREATEST model</p>
								<strong>ClaudePilotGPTMaxProThinking</strong>
								<p>It will be loading for hours</p>
								<p>in the meantime, you can enjoy it loading</p>
							</SpinnerRainbowBorder>
						</ComponentPreview>
						<ComponentPreview
							title="Collapsible"
							desc="Collapsible based on Radix, extended with Framer Motion for a smooth closing and opening animation."
							url="/docs/components/collapsible"
						>
							<img
								className="w-full aspect-square m-6 object-cover object-center rounded-xl shadow-xl"
								src="/previews/components/collapsible.png"
								alt="Collapsible component"
							/>
						</ComponentPreview>
						<ComponentPreview
							title="Sliding Menu"
							desc="Menu based on Radix Popover with a smooth animation between sections of the menu"
							url="/docs/components/sliding-menu"
						>
							<img
								className="w-full aspect-square m-6 object-cover object-center rounded-xl shadow-xl"
								src="/previews/components/sliding-menu.png"
								alt="Sliding Menu component"
							/>
						</ComponentPreview>
						<Link
							className="group text-center hover:bg-card/70 duration-150 ease-out border border-card w-full p-4 bg-[repeating-linear-gradient(315deg,color-mix(in_oklab,#ffffff_5%,transparent)_0,color-mix(in_oklab,#ffffff_5%,transparent)_1px,transparent_0,transparent_50%)] bg-size-[8px_8px] bg-card/40"
							href="/docs/components/"
						>
							<h3 className="group-hover:scale-110 duration-150 ease-out text-xl font-semibold">
								Browse All Components
							</h3>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}

//bg-[repeating-linear-gradient(315deg,#ffffff0d_0,#ffffff0d_1px,transparent_0,transparent_50%)] bg-size-[5px_5px]
