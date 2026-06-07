var webpack = require("webpack");
var fs = require("fs");
var appVersion = require("./package.json").version;
var { GenerateSW } = require("workbox-webpack-plugin");

var nonJSAssets = [
	"style.css",
	"apple-touch-icon.png",
	"fonts/fabric-icons-72e4a0ad.woff",
	"fonts/fabric-icons-8d8d4ac2.woff",
	"fonts/segoeui-westeuropean/segoeui-light.woff",
	"fonts/segoeui-westeuropean/segoeui-light.woff2",
	"fonts/segoeui-westeuropean/segoeui-regular.woff",
	"fonts/segoeui-westeuropean/segoeui-regular.woff2",
	"fonts/segoeui-westeuropean/segoeui-semibold.woff",
	"fonts/segoeui-westeuropean/segoeui-semibold.woff2",
	"fonts/segoeui-westeuropean/segoeui-semilight.woff",
	"fonts/segoeui-westeuropean/segoeui-semilight.woff2",
];

var processHTML = {
	apply: (compiler) => {
		compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
			const assets = JSON.stringify(
				Object.keys(compilation.assets).concat(nonJSAssets)
			).replace(/\[|\]/g, "");
			const HTMLFile = fs.readFileSync("./src/index.html", {
				encoding: "utf8",
			});
			fs.writeFileSync(
				"./dist/application/index.html",
				HTMLFile.replace("/*ASSETS_PLACEHOLDER*/", assets)
			);
		});
	},
};

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
	entry: { app: "./src/app.tsx" },
	output: {
		filename: "[name].js",
		path: __dirname + "/dist/application",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
		plugins: [new TsconfigPathsPlugin({})],
		fallback: {
			fs: false,
			net: false,
			path: require.resolve("path-browserify"),
			stream: require.resolve("stream-browserify"),
			buffer: require.resolve("buffer/"),
			events: require.resolve("events/"),
			crypto: false,
		},
	},
	externals: {
		moment: "moment",
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
			},
		],
	},

	plugins: [
		processHTML,
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
			"process.env.DROPBOX_TOKEN": JSON.stringify(process.env.DROPBOX_TOKEN || ""),
			__APP_VERSION__: JSON.stringify(appVersion),
		}),
		new webpack.ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
			process: "process/browser",
		}),
		...(process.env.NODE_ENV === "production"
			? [
					new GenerateSW({
						clientsClaim: true,
						skipWaiting: true,
						// Precache webpack output + non-JS assets
						additionalManifestEntries: nonJSAssets.map((url) => ({
							url,
							revision: appVersion,
						})),
						// Cache navigation requests with NetworkFirst
						runtimeCaching: [
							{
								urlPattern: /\/$/,
								handler: "NetworkFirst",
								options: {
									cacheName: "navigation",
								},
							},
							{
								// Cache font files
								urlPattern: /\.(?:woff|woff2)$/,
								handler: "CacheFirst",
								options: {
									cacheName: "fonts",
									expiration: {
										maxEntries: 30,
										maxAgeSeconds: 365 * 24 * 60 * 60,
									},
								},
							},
						],
					}),
			  ]
			: []),
	],
	optimization: {
		splitChunks: false,
	},
};
