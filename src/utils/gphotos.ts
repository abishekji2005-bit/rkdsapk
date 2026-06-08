export function grabGPhotos(sharingURL: string): Promise<string[]> {
	return new Promise((resolve, reject) => {
		const fromLocalStorage = localStorage.getItem(sharingURL);
		if (fromLocalStorage) {
			try {
				return resolve(JSON.parse(fromLocalStorage));
			} catch (e) {
				localStorage.removeItem(sharingURL);
			}
		}

		const xhr = new XMLHttpRequest();
		xhr.timeout = 10000;
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				try {
					const res = JSON.parse(this.responseText);
					localStorage.setItem(sharingURL, JSON.stringify(res));
					resolve(res);
				} catch (e) {
					resolve([]);
				}
			}
		});
		xhr.onerror = function () {
			resolve([]);
		};
		xhr.ontimeout = function () {
			resolve([]);
		};
		xhr.open("POST", "https://gphotos.alisaleem.workers.dev/");
		try {
			xhr.send(sharingURL);
		} catch (e) {
			resolve([]);
		}
	});
}
