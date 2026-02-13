"use client";

import {
	GhCardImage,
	GhCardRoot,
	GhCardTitle,
	GhCardLabel,
	GhCardHeader,
	GhCardSubHeader,
	GhCardContent,
} from "@/registry/components/github-hover-card";

const imageUrl =
	"https://i.scdn.co/image/ab67616d0000b2736c7112082b63beefffe40151";

export function GhCardDemo() {
	return (
		<GhCardRoot href="https://github.com/FifthWit/ui">
			<GhCardImage
				blur="30px"
				alt="Blurred Mountain"
				src={imageUrl}
				darken={0.3}
			/>
			<GhCardTitle>Hover Me</GhCardTitle>
			<GhCardContent>
				<GhCardLabel>Design Corp</GhCardLabel>
				<GhCardHeader>
					Figma gains 100x users after mandating anime girlfriends for all users
				</GhCardHeader>
				<GhCardSubHeader>Read More</GhCardSubHeader>
			</GhCardContent>
		</GhCardRoot>
	);
}
