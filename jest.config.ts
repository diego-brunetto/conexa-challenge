import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/.next/**",
		"!**/coverage/**",
		"!jest.config.ts",
		"!jest.setup.tsx",
		"!next.config.ts",
		"!tailwind.config.ts",
		"!postcss.config.mjs",
	],
	testMatch: [
		"**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)",
		"**/*.(test|spec).(js|jsx|ts|tsx)",
	],
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

export default createJestConfig(config);
