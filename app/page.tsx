import Link from "next/link";

export default function Home() {
	return (
		<main className="min-w-screen min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-5xl font-semibold">Work in Progress.</h1>
			<div className="flex flex-row gap-4">
				<Link
					className="bg-blue-500 text-foreground p-2 px-4 rounded-full mt-4 font-semibold transition-shadow duration-150 hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.7)]"
					href="/docs"
				>
					Docs
				</Link>
				<Link
					className="bg-foreground text-background p-2 px-4 rounded-full mt-4 font-semibold"
					href="https://github.com/FifthWit/ui"
				>
					GitHub
				</Link>
			</div>
		</main>
	);
}
