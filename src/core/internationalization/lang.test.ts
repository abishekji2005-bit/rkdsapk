import { text, translate } from "@core";
import { setting } from "@modules";
describe("@core: internationalization", () => {
	it("English as the default", () => {
		expect(translate.loadedCode).toBe("en");
	});
	it("Setting another language", (done) => {
		localStorage.setItem("lang", "ar");
		setting!.setSetting("lang", "ar");
		setTimeout(() => {
			expect(translate.loadedCode).toBe("ar");
			done();
		}, 500);
	});
	it("getting a registered term", () => {
		expect(text("search").toString()).not.toBe("search");
	});
	it("getting a non registered term", () => {
		expect(text("SOMETHING-ELSE" as any).toString()).toBe("SOMETHING-ELSE");
	});
});
