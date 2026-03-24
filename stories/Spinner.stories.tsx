import type { Meta, StoryObj } from "@storybook/nextjs";
import {
	SpinnerOutline,
	SpinnerRainbowBorder,
} from "@/registry/components/spinner";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
	title: "components/Spinner",
} satisfies Meta;

export default meta;

export const Rainbow: StoryObj<typeof SpinnerRainbowBorder> = {
	args: { loading: true },
	render: (args) => {
		const [{ loading, glow, border }] = useArgs();
		return (
			<SpinnerRainbowBorder loading={loading} glow={glow} border={border}>
				Loading......
			</SpinnerRainbowBorder>
		);
	},
};

type OutlineArgs = {
	loading: true;
	text: string;
	borderPrimaryColor: string;
	borderSecondaryColor: string;
	borderLength: string;
};

export const Outline: StoryObj<OutlineArgs> = {
	args: {
		loading: true,
		text: "Thinking REALLY hard...",
		borderPrimaryColor: "#ffffff",
		borderSecondaryColor: "#00000000",
		borderLength: "85%",
	},
	render: (args) => {
		const [
			{ loading, text, borderPrimaryColor, borderSecondaryColor, borderLength },
		] = useArgs();
		return (
			<SpinnerOutline
				loading={loading}
				styling={{
					primary: borderPrimaryColor,
					background: borderSecondaryColor,
					length: borderLength,
				}}
			>
				{text}
			</SpinnerOutline>
		);
	},
};

export const OutlineColorChange: StoryObj<OutlineArgs> = {
	args: {
		loading: true,
		text: "Extremely long thinking currently, rapid reasoning engaged",
		borderPrimaryColor: "#00deff",
		borderSecondaryColor: "#00000000",
		borderLength: "50%",
	},

	render: (args) => {
		const [
			{ loading, text, borderPrimaryColor, borderSecondaryColor, borderLength },
		] = useArgs();
		return (
			<SpinnerOutline
				loading={loading}
				styling={{
					primary: borderPrimaryColor,
					background: borderSecondaryColor,
					length: borderLength,
				}}
			>
				{text}
			</SpinnerOutline>
		);
	},
};
