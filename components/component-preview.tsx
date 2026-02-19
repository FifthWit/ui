import { GhCardDemo } from "@/registry/demos/github-hover-card";
import { SlidingMenuDemo } from "@/registry/demos/sliding-menu";
import { StatefulBadgeDemo } from "@/registry/demos/stateful-badge";

const previews: Record<string, React.ComponentType> = {
	"gh-card": GhCardDemo,
	"sliding-menu": SlidingMenuDemo,
	"stateful-badge": StatefulBadgeDemo,
};
export function ComponentPreview({ name }: { name: string }) {
	const Preview = previews[name];
	if (!Preview) return <div>Preview not found: {name}</div>;

	return (
		<div className="my-4 not-prose">
			{" "}
			<div className="rounded-lg flex items-center justify-center">
				<div className="[&_a]:no-underline **:no-underline">
					<Preview />
				</div>
			</div>
		</div>
	);
}
