import * as core from "@core";
import { store } from "@utils";
import * as utils from "@utils";
export const connSetting = {
	emulateOffline: (() => { try { return !!localStorage.getItem("emulate_offline"); } catch(e) { return false; } })(),
};

export async function checkServer(
	server: string
): Promise<false | { name: string | null }> {
	return new Promise((resolve) => {
		if (connSetting.emulateOffline) {
			return resolve(false);
		}
		const xhr = new XMLHttpRequest();
		xhr.timeout = 2500;
		xhr.withCredentials = true;

		xhr.open("GET", server + `${"/_session"}`, true);
		// TODO: Update this check if you have your own status server
		// The original apexo used sdb.apexo.app which is no longer applicable
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status > 199 && xhr.status < 300) {
					try {
						resolve(JSON.parse(xhr.response).userCtx);
					} catch (e) {
						resolve(false);
					}
				} else {
					resolve(false);
				}
			}
		};
		xhr.onerror = function () {
			resolve(false);
		};
		xhr.ontimeout = function () {
			resolve(false);
		};
		try {
			xhr.send(null);
		} catch (exception) {
			utils.log("IS-ONLINE: ", exception);
			return resolve(false);
		}
	});
}
