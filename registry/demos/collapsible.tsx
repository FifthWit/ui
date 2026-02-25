"use client";

import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleItem,
	CollapsibleTrigger,
} from "../components/collapsible";
import { CaretUpIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

function generateItems(count: number) {
	return Array.from({ length: count }, () => ({
		id: crypto.randomUUID(),
		text: faker.lorem.sentence(),
	}));
}

export function CollapsibleDemo() {
	const [demoItems, setDemoItems] = useState<{ id: string; text: string }[]>(
		[],
	);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		setDemoItems(generateItems(6));
	}, []);

	function addNewItem(): void {
		setDemoItems((items) => {
			const randomIndex = Math.floor(Math.random() * (items.length + 1));
			const newItem = { id: crypto.randomUUID(), text: faker.lorem.sentence() };
			return [
				...items.slice(0, randomIndex),
				newItem,
				...items.slice(randomIndex),
			];
		});
	}

	function removeRandomItem(): void {
		setDemoItems((items) => {
			if (items.length === 0) return items;
			const randomIndex = Math.floor(Math.random() * items.length);
			return items.filter((_, index) => index !== randomIndex);
		});
	}

	return (
		<div className="flex flex-col items-center gap-2 min-h-screen">
			<div className="flex flex-row gap-2">
				<button
					type="button"
					className="z-10 bg-accent text-accent-foreground p-1 rounded-lg border"
					onClick={addNewItem}
				>
					Add Random Item
				</button>
				<button
					type="button"
					className="z-10 bg-accent text-accent-foreground p-1 rounded-lg border"
					onClick={removeRandomItem}
				>
					Remove Random Item
				</button>
			</div>
			<Collapsible open={open} onOpenChange={setOpen}>
				<CollapsibleTrigger className="z-10 flex flex-row w-full justify-between px-4 p-2 items-center cursor-pointer active:scale-98 duration-75 ease-out">
					<span>Recent Transactions</span>
					<span>
						<CaretUpIcon
							className={cn(
								"h-6 w-6 bg-accent p-1 rounded-full transition-all duration-300 ease-in-out text-accent-foreground",
								open ? "rotate-z-0" : "rotate-z-180",
							)}
						/>
					</span>
				</CollapsibleTrigger>
				<CollapsibleContent>
					{demoItems.map((item, index) => (
						<CollapsibleItem key={item.id} index={index} open={open}>
							<div>{item.text}</div>
						</CollapsibleItem>
					))}
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
