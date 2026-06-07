import * as React from "react";

declare global {
	const __APP_VERSION__: string;
}

declare module "transform-pouch";

declare module "office-ui-fabric-react" {
	interface IDialogProps {
		children?: React.ReactNode;
	}
}
