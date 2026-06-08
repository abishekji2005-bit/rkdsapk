import * as sjcl from "sjcl";

export const defaultSecret = (function() {
	const host = typeof location !== "undefined" ? location.host : "";
	// In Capacitor WebView, location.host is "localhost" — use a stable key
	// so encrypted localStorage values remain readable across web and mobile
	const effectiveHost = (host === "localhost" || host === "") ? "apexo.app" : host;
	return effectiveHost
		.split("")
		.map((x) => x.charCodeAt(0))
		.reduce((a, b) => a + b, 0)
		.toString();
})();

export function encrypt(str: string, secret?: string) {
	return (sjcl as any).encrypt(secret || defaultSecret, str);
}

export function decrypt(str: string, secret?: string) {
	return sjcl.decrypt(secret || defaultSecret, str);
}
