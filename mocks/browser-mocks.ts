import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import nock from "nock";

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
