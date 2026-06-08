import { checkServer } from "@utils";
import nock from "nock";

describe("@utils: isOnline", () => {
	const onlineServer = "http://localhost:5984";
	const offlineServer = "http://any-offline-server";

	it("online server", async () => {
		nock("http://localhost:5984")
			.get("/_session")
			.reply(200, { userCtx: true });

		const thisOnline = await checkServer(onlineServer);
		expect(thisOnline).toBe(true);
	});

	it("offline server", async () => {
		nock("http://any-offline-server")
			.get("/_session")
			.reply(404, {});

		const thisOnline = await checkServer(offlineServer);
		expect(thisOnline).toBe(false);
	});
});
