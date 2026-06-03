import * as React from "react";
import { Shimmer } from "office-ui-fabric-react";

export function lazy<T extends React.ComponentType<any>>(
	importFunc: () => Promise<{ default: T }>
): React.ComponentType<React.ComponentProps<T>> {
	return class LazyComponent extends React.Component<any, { Component: T | null }> {
		state = { Component: null };
		mounted = false;

		componentDidMount() {
			this.mounted = true;
			importFunc().then((module) => {
				if (this.mounted) {
					this.setState({ Component: module.default });
				}
			}).catch((err) => {
				console.error("Error lazy loading component:", err);
			});
		}

		componentWillUnmount() {
			this.mounted = false;
		}

		render() {
			const { Component } = this.state;
			if (Component) {
				const Target = Component as any;
				return <Target {...this.props} />;
			}
			return <Shimmer />;
		}
	};
}
