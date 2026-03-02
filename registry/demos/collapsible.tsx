"use client";

import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleItem,
	CollapsibleTrigger,
} from "../components/collapsible";
import {
	CaretDownIcon,
	CaretUpIcon,
	GithubLogoIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function randomEntry() {
	return {
		id: faker.string.uuid(),
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
	const [firstOpen, setFirstOpen] = useState<boolean>(false);
	const [secondOpen, setSecondOpen] = useState<boolean>(false);

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
			<Collapsible open={firstOpen} onOpenChange={setFirstOpen} gap={8}>
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
									firstOpen ? "rotate-z-0" : "rotate-z-180",
								)}
							/>
						</span>
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					{demoItems.map((item) => (
						<CollapsibleItem
							key={item.id}
							className="flex flex-col *:flex *:flex-row *:gap-1 *:justify-between w-[calc(100vw-16px)] max-w-lg"
						>
							<div className="*:text-xs *:font-light *:text-muted-foreground">
								<span>{item.account}</span>
								<span>{item.when}</span>
							</div>
							<div className="*:text-lg *:text-card-foreground">
								<span className="font-bold">{item.amount}</span>
								<span className="font-light truncate">{item.name}</span>
							</div>
						</CollapsibleItem>
					))}
				</CollapsibleContent>
			</Collapsible>
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
			<Collapsible open={secondOpen} onOpenChange={setSecondOpen} gap={8}>
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
									secondOpen ? "rotate-z-0" : "rotate-z-180",
								)}
							/>
						</span>
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					{demoItems.map((item) => (
						<CollapsibleItem
							key={item.id}
							className="flex flex-col *:flex *:flex-row *:gap-1 *:justify-between w-[calc(100vw-16px)] max-w-lg"
						>
							<div className="*:text-xs *:font-light *:text-muted-foreground">
								<span>{item.account}</span>
								<span>{item.when}</span>
							</div>
							<div className="*:text-lg *:text-card-foreground">
								<span className="font-bold">{item.amount}</span>
								<span className="font-light truncate">{item.name}</span>
							</div>
						</CollapsibleItem>
					))}
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

export function CollapsibleDevsDemo() {
	const [open, setOpen] = useState(false);

	const comments: { name: string; pfp: string; link: string }[] = [
		{
			name: "Pasithea",
			pfp: "https://github.com/Pasithea0.png",
			link: "https://github.com/Pasithea0",
		},
		{
			name: "FifthWit",
			pfp: "https://github.com/FifthWit.png",
			link: "https://github.com/FifthWit",
		},
		{
			name: "shadcn",
			pfp: "https://github.com/shadcn.png",
			link: "https://github.com/shadcn",
		},
	];

	return (
		<div className="flex flex-col h-screen max-h-80">
			<Collapsible open={open} onOpenChange={setOpen}>
				<div className="flex flex-col items-center w-full">
					<CollapsibleTrigger
						className="flex flex-row justify-center items-center gap-1 w-fit min-h-12"
						asChild
					>
						<Button variant="ghost">
							Cool Developers
							<span
								aria-hidden
								data-open={open}
								className="bg-accent p-1 rounded-full aspect-square text-accent-foreground flex data-open:-rotate-180 transition-all"
							>
								<CaretDownIcon />
							</span>
						</Button>
					</CollapsibleTrigger>
					<div className="w-full">
						<CollapsibleContent>
							{comments.map((c) => (
								<CollapsibleItem
									key={c.name}
									className="flex flex-row gap-2 items-center"
								>
									<Avatar>
										<AvatarImage src={c.pfp} />
										<AvatarFallback>{c.name}</AvatarFallback>
									</Avatar>
									<h2>{c.name}</h2>
									<Button variant="ghost" onClick={() => window.open(c.link)}>
										<GithubLogoIcon />
									</Button>
								</CollapsibleItem>
							))}
						</CollapsibleContent>
					</div>
				</div>
			</Collapsible>
		</div>
	);
}
