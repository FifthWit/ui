import React from "react";
import { SpinnerOutline, SpinnerRainbowBorder } from "../components/spinner";

export function SpinnerDemo() {
	const [loading, setLoading] = React.useState<boolean>(true);

	return (
		<div className="flex flex-row gap-8">
			<button
				type="button"
				className="cursor-pointer rounded-3xl bg-accent aspect-square w-21 hover:scale-104 active:scale-98 transition-all duration-150 active:bg-white/15"
				onClick={() => setLoading(!loading)}
			>
				{loading ? "Stop" : "Start"}
			</button>
			<SpinnerRainbowBorder
				loading={loading}
				glow={true}
				className="rounded-sm bg-card"
			>
				<h2>Super intelligent AI is thinking</h2>
				<p>At least we think it is thinking</p>
			</SpinnerRainbowBorder>
		</div>
	);
}

export function SpinnerOutlineDemo() {
	const [loading, setLoading] = React.useState<boolean>(true);

	return (
		<div className="flex flex-row gap-4">
			<button
				type="button"
				className="cursor-pointer rounded-3xl bg-accent aspect-square w-14 hover:scale-104 active:scale-98 transition-all duration-150 active:bg-white/15"
				onClick={() => setLoading(!loading)}
			>
				{loading ? "Stop" : "Start"}
			</button>
			<SpinnerOutline loading={loading}>
				<p className="">ClaudePilotGPT is thinking...</p>
			</SpinnerOutline>
		</div>
	);
}
