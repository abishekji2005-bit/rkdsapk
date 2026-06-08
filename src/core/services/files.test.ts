import { files } from "@core";
import { setting } from "@modules";
import { decode } from "@utils";
import nock from "nock";

describe("@core: files", () => {
	const dir = "temp";

	beforeAll(() => {
		nock("https://api.dropboxapi.com")
			.options(/.*/)
			.reply(200, {}, {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Authorization, Content-Type, Dropbox-API-Arg",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS"
			})
			.persist();

		nock("https://content.dropboxapi.com")
			.options(/.*/)
			.reply(200, {}, {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Authorization, Content-Type, Dropbox-API-Arg",
				"Access-Control-Allow-Methods": "POST, GET, OPTIONS"
			})
			.persist();
	});

	describe("DropBox storage status", () => {
		it("With no DropBox AT", async () => {
			setting!.setSetting("dropbox_accessToken", "");
			const res = await files().status();
			expect(res).toBe(false);
		});

		it("With invalid DropBox AT", async () => {
			nock("https://api.dropboxapi.com")
				.post("/2/users/get_current_account")
				.reply(401, {}, {
					"Access-Control-Allow-Origin": "*"
				});
			setting!.setSetting("dropbox_accessToken", "something invalid");
			const res = await files().status();
			expect(res).toBe(false);
		});

		it("With valid DropBox AT", async () => {
			nock("https://api.dropboxapi.com")
				.post("/2/users/get_current_account")
				.reply(200, {}, {
					"Access-Control-Allow-Origin": "*"
				});
			setting!.setSetting("dropbox_accessToken", "valid_token");
			const res = await files().status();
			expect(res).toBe(true);
		});
	});

	describe("Saving/getting files", () => {
		const fileA = new Blob(["a"], {
			type: "text/plain",
		});
		it("saves, gets, removes files", async () => {
			jest.setTimeout(90000);

			nock("https://content.dropboxapi.com")
				.post("/2/files/upload")
				.reply(200, { name: "temp" }, {
					"Access-Control-Allow-Origin": "*"
				});

			nock("https://content.dropboxapi.com")
				.post("/2/files/download")
				.reply(200, Buffer.from("a"), {
					"content-type": "application/octet-stream",
					"Access-Control-Allow-Origin": "*"
				});

			nock("https://api.dropboxapi.com")
				.post("/2/files/delete_v2")
				.reply(200, {}, {
					"Access-Control-Allow-Origin": "*"
				});

			setting!.setSetting("dropbox_accessToken", "dummy");

			const pathA = await files().save({
				blob: fileA,
				ext: "temp",
				dir,
			});
			expect(typeof pathA).toBe("string");

			const resA = await files().get(pathA);
			expect(decode(resA.split(";base64,")[1])).toBe("a");

			nock("https://content.dropboxapi.com")
				.post("/2/files/download")
				.reply(404, "Not found", {
					"Access-Control-Allow-Origin": "*"
				});

			await files().remove(pathA);
			let thrown = false;
			try {
				await files().get(pathA);
			} catch (e) {
				thrown = true;
			}
			expect(thrown).toBe(true);
		});
	});
});
