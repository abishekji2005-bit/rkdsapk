module.exports = {
	automock: false,
	setupFiles: ["./mocks/browser-mocks.ts", "./mocks/state-mocks.ts"],
	setupFilesAfterEnv: ["@testing-library/jest-dom"],
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.[tj]sx?$": "ts-jest"
	},
	transformIgnorePatterns: [
		"node_modules/(?!(pouchx)/)",
		"/cypress/"
	],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testEnvironmentOptions: {
		url: "http://localhost:5984"
	},
	moduleNameMapper: {
		"@core": "<rootDir>/src/core",
		"@utils": "<rootDir>/src/utils",
		"@main-components": "<rootDir>/src/main-components",
		"@common-components": "<rootDir>/src/common-components",
		"@modules": "<rootDir>/src/modules",
		"\\.(css|scss)$": "<rootDir>/mocks/styleMock.js",
		"^uuid$": "<rootDir>/node_modules/uuid/dist/index.js"
	},
	testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
};
