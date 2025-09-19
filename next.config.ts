import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ hostname: "rickandmortyapi.com" }],
	},
	env: {
		NEXT_PUBLIC_API_RICKANDMORTY: process.env.NEXT_PUBLIC_API_RICKANDMORTY,
	},
};

export default nextConfig;
