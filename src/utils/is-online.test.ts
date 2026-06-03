import { checkServer } from "@utils";

describe("@utils: isOnline", () => {
	const onlineServer = "http://localhost:5984";
	const offlineServer = "any";

	it("online server", async () => {
		const thisOnline = await checkServer(onlineServer);
		expect(thisOnline).toBe(true);
	});

	it("offline server", async () => {
		const thisOnline = await checkServer(offlineServer);
		expect(thisOnline).toBe(false);
	});
});
