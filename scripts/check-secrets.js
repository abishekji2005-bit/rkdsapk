const fs = require('fs');
const path = require('path');

const secretsPath = path.resolve(__dirname, '../src/secrets.ts');
if (fs.existsSync(secretsPath)) {
	const content = fs.readFileSync(secretsPath, 'utf8');
	if (content.includes('dummy_token')) {
		console.warn('\x1b[33m%s\x1b[0m', '==================================================');
		console.warn('\x1b[33m%s\x1b[0m', '🚨 WARNING: Using DUMMY Dropbox Access Token!      ');
		console.warn('\x1b[33m%s\x1b[0m', 'The build will use "dummy_token" for Dropbox.      ');
		console.warn('\x1b[33m%s\x1b[0m', 'Please specify a real token in src/secrets.ts      ');
		console.warn('\x1b[33m%s\x1b[0m', 'for syncing and backup functionality to work.      ');
		console.warn('\x1b[33m%s\x1b[0m', '==================================================');
	}
}
