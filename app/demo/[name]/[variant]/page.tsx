"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { GhCardDemo } from "@/registry/demos/github-hover-card";
import { SlidingMenuDemo } from "@/registry/demos/sliding-menu";
import { StatefulBadgeDemo } from "@/registry/demos/stateful-badge";
import {
	CollapsibleDemo,
	CollapsibleSidebarDemo,
} from "@/registry/demos/collapsible";

type DemoMap = Record<
	string,
	Record<string, React.ComponentType> | React.ComponentType
>;

const demos: DemoMap = {
	"sliding-menu": SlidingMenuDemo,
	"github-hover-card": GhCardDemo,
	"stateful-badge": StatefulBadgeDemo,
	collapsible: {
		default: CollapsibleDemo,
		sidebar: CollapsibleSidebarDemo,
	},
};

export default function DemoVariantPage() {
	const { name, variant } = useParams() as { name: string; variant: string };

	const demoEntry = demos[name];
	if (!demoEntry) notFound();

	let Demo: React.ComponentType;

	if (typeof demoEntry === "function") {
		if (variant !== "default") notFound();
		Demo = demoEntry;
	} else {
		const resolved = demoEntry[variant];
		if (!resolved) notFound();
		Demo = resolved;
	}

	return (
		<div className="min-h-screen flex flex-col">
			<header className="border-b p-4">
				<h1 className="text-lg font-semibold">
					{name}
					{variant !== "default" && (
						<span className="text-muted-foreground ml-2">/ {variant}</span>
					)}
				</h1>
			</header>
			<main className="flex-1 flex items-center justify-center p-10">
				<Demo />
			</main>
		</div>
	);
}
