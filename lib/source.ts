import { docs } from "fumadocs-mdx:collections/server";
import { loader } from "fumadocs-core/source";

export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource(),
});

import type { InferPageType } from "fumadocs-core/source";

export function getPageImage(page: InferPageType<typeof source>) {
	const segments = [...page.slugs, "image.png"];

	return {
		segments,
		url: `/og/docs/${segments.join("/")}`,
	};
}
