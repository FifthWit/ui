import type { Meta, StoryObj } from "@storybook/nextjs";
import { GhCardDemo } from "@/registry/demos/github-hover-card";

const meta = {
	title: "components/GitHub Hover Card",
	component: GhCardDemo,
} satisfies Meta<typeof GhCardDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {},
};
