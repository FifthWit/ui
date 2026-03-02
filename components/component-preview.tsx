"use client";
import { demos } from "@/app/demo/[name]/[variant]/page";
import type React from "react";

export function ComponentPreview({ name }: { name: string }) {
	const demoEntry = demos[name];
	if (!demoEntry) return null;

	let Demo: React.ComponentType;

	if (typeof demoEntry === "function") {
		Demo = demoEntry;
	} else {
		const resolved = demoEntry.default;
		if (!resolved) return null;
		Demo = resolved;
	}

	return (
		<div className="flex items-center justify-center p-10 border rounded-xl">
			<Demo />
		</div>
	);
}

export default ComponentPreview;
