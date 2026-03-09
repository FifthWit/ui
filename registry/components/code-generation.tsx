import { motion } from "motion/react";
import React from "react";

const colors = [
	"#FBBF24",
	"#DC2626",
	"#1D4ED8",
	"#EC4899",
	"#84CC16",
	"#22D3EE",
	"#9333EA",
];

const MAX_ITEMS = 80;

export function CodeGeneration() {
	const [items, setItems] = React.useState<
		Array<
			{ id: string; color: string; width: number } | { id: string; type: "br" }
		>
	>([{ id: crypto.randomUUID(), color: colors[0], width: 400 }]);
	const bottomRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setItems((prev) => {
				const trimmed =
					prev.length >= MAX_ITEMS ? prev.slice(-MAX_ITEMS + 1) : prev;
				if (Math.random() < 0.9) {
					return [
						...trimmed,
						{
							id: crypto.randomUUID(),
							color: colors[Math.floor(Math.random() * colors.length)],
							width: Math.random() * 200 + 100,
						},
					];
				} else {
					return [
						...trimmed,
						{
							id: crypto.randomUUID(),
							type: "br" as const,
						},
					];
				}
			});
		}, 200);

		return () => clearInterval(interval);
	}, []);

	React.useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [items]);

	return (
		<div className="relative w-160 h-64 overflow-hidden border rounded-xl">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-24 z-10 bg-linear-to-b from-black/80 to-transparent" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10 bg-linear-to-t from-black/80 to-transparent" />

			<div className="h-full overflow-y-scroll no-scrollbar">
				<div className="flex flex-row flex-wrap gap-1 p-1">
					{items.map((item) =>
						"color" in item ? (
							<CodeGenerationLine
								key={item.id}
								color={item.color}
								width={item.width}
							/>
						) : (
							<div key={item.id} className="w-full h-6" />
						),
					)}
					<div ref={bottomRef} />
				</div>
			</div>
		</div>
	);
}

function CodeGenerationLine({
	color,
	width,
}: {
	color: string;
	width: number;
}) {
	return (
		<motion.div
			layout
			className="h-6 rounded-xl"
			initial={{ width: 24 }}
			animate={{ width }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			style={{ backgroundColor: color }}
		></motion.div>
	);
}
