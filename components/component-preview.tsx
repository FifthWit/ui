"use client";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { demos } from "@/app/demo/[name]/[variant]/page";

export default function DemoPage() {
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
