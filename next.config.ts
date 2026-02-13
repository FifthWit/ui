import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.tsx?$/,
			resourceQuery: /raw/,
			type: "asset/source",
		});
		return config;
	},
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
