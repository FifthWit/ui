import { useRef } from "react";
import {
	StatefulBadge,
	StatefulBadgeHandle,
} from "@/registry/components/stateful-badge";

export function StatefulBadgeDemo() {
	const badgeRef = useRef<StatefulBadgeHandle>(null);
	return (
		<div className="flex flex-col">
			<StatefulBadge initialState="idle" ref={badgeRef} />
			<div className="flex flex-row">
				<button
					className="bg-primary text-primary-foreground p-2 m-1 rounded-lg"
					onClick={() => badgeRef.current?.updateState("idle")}
				>
					Idle
				</button>
				<button
					className="bg-primary text-primary-foreground p-2 m-1 rounded-lg"
					onClick={() => badgeRef.current?.updateState("error")}
				>
					Error
				</button>
				<button
					className="bg-primary text-primary-foreground p-2 m-1 rounded-lg"
					onClick={() => badgeRef.current?.updateState("success")}
				>
					Success
				</button>
				<button
					className="bg-primary text-primary-foreground p-2 m-1 rounded-lg"
					onClick={() => badgeRef.current?.updateState("warning")}
				>
					Warning
				</button>
			</div>
		</div>
	);
}
