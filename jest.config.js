module.exports = {
	automock: false,
	setupFiles: ["./src/mocks/browser-mocks.ts"],
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
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
		"\\.(css|scss)$": "<rootDir>/mocks/styleMock.js"
	},
	testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
};
