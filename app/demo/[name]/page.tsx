"use client";

import { useParams } from "next/navigation";
import { GhCardDemo } from "@/registry/demos/github-hover-card";
import { SlidingMenuDemo } from "@/registry/demos/sliding-menu";

const demos: Record<string, React.ComponentType> = {
	"sliding-menu": SlidingMenuDemo,
	"github-hover-card": GhCardDemo,
};

export default function DemoPage() {
	const { name } = useParams();
	const Demo = demos[name as string];

	if (!Demo) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-muted-foreground">Demo not found: {name}</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<header className="border-b p-4">
				<h1 className="text-lg font-semibold">{name}</h1>
			</header>
			<main className="flex-1 flex items-center justify-center p-10">
				<Demo />
			</main>
		</div>
	);
}
