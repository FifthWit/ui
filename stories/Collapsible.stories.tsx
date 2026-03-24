import type { Meta, StoryObj } from "@storybook/nextjs";
import { faker } from "@faker-js/faker";

function randomEntry() {
	return {
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		account: `${faker.finance.accountName()}`,
		amount: `${(Math.random()) > 0.5 ? "-" : "+"} ${faker.finance.amount({ min: 5, max: 100, dec: 2, symbol: `${Math.random() > 0.5 ? "€" : "$"}` })}`,
		when: `${faker.number.int({ min: 1, max: 6 })} days ago`,
	};
}

type DemoItem = {
	id: string;
	name: string;
	account: string;
	amount: string;
	when: string;
};

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	CollapsibleItem,
} from "@/registry/components/collapsible";
import { CollapsibleDemo } from "@/registry/demos/collapsible";
import { useArgs } from "storybook/internal/preview-api";
import { Button } from "@/components/ui/button";

const meta = {
	title: "components/collapsible",
	component: CollapsibleDemo,
	parameters: {
		a11y: {
			config: {
				rules: [{ id: "color-contrast", enabled: false }],
			},
		},
	},
} satisfies Meta<typeof CollapsibleDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		demoItems: [
			{
				id: "ec553cdc-028a-4ef1-b85c-d2ca41189a54",
				name: "Rollin Cronin",
				account: "Investment Account",
				amount: "- $38.70",
				when: "2 days ago",
			},
			{
				id: "aaaa500f-6459-4c16-82a0-63d19b7d0e65",
				name: "Ken Spencer",
				account: "Checking Account",
				amount: "+ €61.78",
				when: "6 days ago",
			},
			{
				id: "e041393b-3a02-4585-a2bd-8911af4efd8b",
				name: "Dr. Chase Kirlin I",
				account: "Home Loan Account",
				amount: "+ €25.55",
				when: "3 days ago",
			},
			{
				id: "4567dba9-8cbe-440c-a1f9-874e466afda5",
				name: "Jacob Romaguera",
				account: "Credit Card Account",
				amount: "+ $74.51",
				when: "4 days ago",
			},
			{
				id: "b1a9b6c6-2896-4dfd-a27c-dba624cb5fff",
				name: "Amalia Schmitt",
				account: "Credit Card Account",
				amount: "+ $84.87",
				when: "4 days ago",
			},
			{
				id: "b5ed6550-07de-4d95-867c-487cb387d821",
				name: "Mildred Gottlieb",
				account: "Personal Loan Account",
				amount: "+ €96.38",
				when: "1 days ago",
			},
		],
		open: false,
	},
	render: (args) => {
		const [{ demoItems, open }, updateArgs] = useArgs();

		const setOpen = (val: boolean) => updateArgs({ open: val });
		const addNewItem = () => {
			const randomIndex = Math.floor(Math.random() * (demoItems.length + 1));
			const newItem = randomEntry();
			const newItems = [
				...demoItems.slice(0, randomIndex),
				newItem,
				...demoItems.slice(randomIndex),
			];
			updateArgs({ demoItems: newItems });
		};
		const removeRandomItem = () => {
			if (demoItems.length === 0) return;
			const randomIndex = Math.floor(Math.random() * demoItems.length);
			const newItems = demoItems.filter(
				(_: DemoItem, index: number) => index !== randomIndex,
			);
			updateArgs({ demoItems: newItems });
		};
		return (
			<div>
				<Collapsible open={open} onOpenChange={setOpen}>
					<CollapsibleTrigger asChild>
						<Button>Recent Transactions</Button>
					</CollapsibleTrigger>
					<CollapsibleContent>
						{demoItems.map((item: DemoItem) => (
							<CollapsibleItem
								key={`${item.name}-${item.when}`}
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
	},
};
