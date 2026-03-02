import Image from "next/image";
import Link from "next/link";

interface ComponentData {
	slug: string;
	description: string;
	name: string;
}

function ComponentLink({
	slug,
	description,
	name,
}: {
	slug: string;
	name: string;
	description: string;
}) {
	return (
		<Link
			href={`/docs/components/${slug}`}
			className="rounded-xl border not-prose bg-card flex flex-col w-fit"
		>
			<Image
				src={`/previews/components/${slug}.png`}
				alt={name}
				width={200}
				height={200}
				className="rounded-t-xl"
			/>
			<div className="p-2">
				<h2 className="text-lg">{name}</h2>
				<p className="text-muted-foreground">{description}</p>
			</div>
		</Link>
	);
}

export function ComponentLibrary() {
	const Components: Array<ComponentData> = [
		{
			name: "Collapsible",
			description: "Animated Collapsible",
			slug: "collapsible",
		},
		{
			name: "GitHub Hover Card",
			description: "Card with a smooth hover animation from GitHub",
			slug: "github-hover-card",
		},
		{
			name: "Sliding Menu",
			description:
				"Popover menu with a sliding feature to slide between sections",
			slug: "sliding-menu",
		},
		{
			name: "Stateful Badge",
			description: "Badge that animates between states",
			slug: "stateful-badge",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
			{Components.map((c) => (
				<ComponentLink key={c.slug} {...c} />
			))}
		</div>
	);
}
