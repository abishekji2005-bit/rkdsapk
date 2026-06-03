import * as React from "react";

declare global {
	const __APP_VERSION__: string;
}

declare module "react" {
	interface Attributes {
		children?: React.ReactNode;
	}
}

declare module "transform-pouch";
