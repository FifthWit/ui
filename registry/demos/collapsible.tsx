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
import { Button } from "@/components/ui/button";

function randomEntry() {
	return {
		id: crypto.randomUUID(),
		name: faker.person.fullName(),
		account: `${faker.finance.accountName()}`,
		amount: `${(Math.random()) > 0.5 ? "-" : "+"} ${faker.finance.amount({ min: 5, max: 100, dec: 2, symbol: `${Math.random() > 0.5 ? "€" : "$"}` })}`,
		when: `${faker.number.int({ min: 1, max: 6 })} days ago`,
	};
}

function generateItems(count: number) {
	return Array.from({ length: count }, () => randomEntry());
}

export function CollapsibleDemo() {
	const [demoItems, setDemoItems] = useState<
		{
			id: string;
			name: string;
			amount: string;
			when: string;
			account: string;
		}[]
	>([]);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		setDemoItems(generateItems(6));
	}, []);

	function addNewItem(): void {
		setDemoItems((items) => {
			const randomIndex = Math.floor(Math.random() * (items.length + 1));
			const newItem = randomEntry();
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
		<div className="flex flex-col items-center gap-2 min-h-screen w-sm">
			<div className="flex flex-row gap-2">
				<Button
					variant="secondary"
					className="active:scale-98 duration-75 transition-all ease-out"
					onClick={addNewItem}
				>
					Add Random Item
				</Button>
				<Button
					variant="secondary"
					className="active:scale-98 duration-75 transition-all ease-out"
					onClick={removeRandomItem}
				>
					Remove Random Item
				</Button>
			</div>
			<Collapsible open={open} onOpenChange={setOpen}>
				<CollapsibleTrigger
					asChild
					className="z-10 flex flex-row w-[calc(100vw-16px)] sm:w-lg"
				>
					<Button
						variant="secondary"
						className="active:scale-98 duration-75 transition-all ease-out cursor-pointer flex flex-row justify-between rounded-2xl w-full"
					>
						<span>Recent Transactions</span>
						<span>
							<CaretUpIcon
								className={cn(
									"rounded-full transition-all duration-200 ease-in-out text-foreground",
									open ? "rotate-z-0" : "rotate-z-180",
								)}
							/>
						</span>
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					{demoItems.map((item) => (
						<CollapsibleItem
							key={item.id}
							className="flex flex-col *:flex *:flex-row *:gap-1 *:justify-between"
						>
							<div className="*:text-xs *:font-light *:text-muted-foreground">
								<span>{item.account}</span>
								<span>{item.when}</span>
							</div>
							<div className="*:text-lg *:text-card-foreground">
								<span className="font-bold">{item.amount}</span>
								<span className="font-light">{item.name}</span>
							</div>
						</CollapsibleItem>
					))}
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
