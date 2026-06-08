import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import nock from "nock";

jest.mock("pouchdb-browser", () => {
	return class MockPouchDB {
		static plugin = jest.fn();
		static fetch = jest.fn();
		allDocs = jest.fn().mockResolvedValue({ rows: [] });
		changes = jest.fn().mockReturnValue({
			on: jest.fn().mockReturnThis()
		});
		put = jest.fn().mockResolvedValue({ rev: "mock-rev" });
		get = jest.fn().mockResolvedValue({ _id: "mock", _rev: "mock-rev" });
		remove = jest.fn().mockResolvedValue({ rev: "mock-rev-deleted" });
		destroy = jest.fn().mockResolvedValue(undefined);
		compact = jest.fn().mockResolvedValue(undefined);
		sync = jest.fn().mockReturnValue({
			on: jest.fn().mockReturnThis()
		});
		logOut = jest.fn().mockResolvedValue(undefined);
	};
});

window.matchMedia = jest.fn().mockImplementation(query => {
	return {
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	};
});

window.onhashchange = jest.fn().mockImplementation(() => {});

export function mockResponse(
	method: "get" | "post" | "put",
	code: number,
	res: any
) {
	(nock("http://any", {
		filteringScope: () => true
	}).filteringPath(() => "/") as any)
		[method]("/")
		.reply(code, JSON.stringify(res));
}

(global as any).scrollTo = jest.fn();
