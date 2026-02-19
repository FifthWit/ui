"use client";

import { useRef, useState } from "react";
import {
	StatefulBadge,
	type StatefulBadgeHandle,
	type stateTypes,
} from "@/registry/components/stateful-badge";

export function StatefulBadgeDemo() {
	const badgeRef = useRef<StatefulBadgeHandle>(null);
	const [currentState, setCurrentState] = useState<stateTypes>("idle");

	const handleUpdateState = (state: typeof currentState) => {
		badgeRef.current?.updateState(state);
		setCurrentState(state);
	};

	return (
		<div className="flex flex-col items-center">
			<StatefulBadge initialState="idle" ref={badgeRef} />
			<div className="flex flex-row border rounded-xl p-1">
				{(["idle", "loading", "error", "success", "warning"] as const).map(
					(state) => (
						<button
							data-enabled={currentState === state}
							key={state}
							type="button"
							className="bg-secondary border text-secondary-foreground p-2 m-1 rounded-lg data-[enabled=true]:hover:cursor-not-allowed data-[enabled=true]:bg-primary data-[enabled=true]:text-primary-foreground hover:cursor-pointer transition-all duration-100 ease-out data-[enabled=false]:active:scale-94"
							onClick={() => handleUpdateState(state)}
						>
							{state.charAt(0).toUpperCase() + state.slice(1)}
						</button>
					),
				)}
			</div>
		</div>
	);
}
