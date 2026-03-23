"use client";
import { demos } from "@/app/demo/[name]/[variant]/page";
import { cn } from "@/lib/utils";
import type React from "react";

export function ComponentPreview({
	name,
	variant = "default",
	className,
}: {
	name: string;
	variant?: string;
	className?: string;
}) {
	const demoEntry = demos[name];
	if (!demoEntry) return null;

	let Demo: React.ComponentType | undefined;

	if (typeof demoEntry === "function") {
		if (variant !== "default") return null;
		Demo = demoEntry;
	} else {
		Demo = demoEntry[variant ?? "default"];
		if (!Demo) return null;
	}

	return (
		<div
			className={cn(
				"flex items-center justify-center p-10 border rounded-xl not-prose isolate",
				className,
			)}
		>
			<Demo />
		</div>
	);
}

export default ComponentPreview;
