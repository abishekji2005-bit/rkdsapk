import * as React from "react";
import { MessageBar, Shimmer } from "office-ui-fabric-react";

export function lazy<T extends React.ComponentType<any>>(
	importFunc: () => Promise<{ default: T }>
): React.ComponentType<React.ComponentProps<T>> {
	return class LazyComponent extends React.Component<any, { Component: T | null; error: boolean }> {
		state = { Component: null as any, error: false };
		mounted = false;

		componentDidMount() {
			this.mounted = true;
			importFunc().then((module) => {
				if (this.mounted) {
					this.setState({ Component: module.default });
				}
			}).catch((err) => {
				console.error("Error lazy loading component:", err);
				if (this.mounted) this.setState({ error: true });
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
			if (this.state.error) {
				return (
					<MessageBar messageBarType={1}>
						Failed to load component.{" "}
						<a href="#" onClick={() => { this.setState({ error: false }); this.componentDidMount(); }}>
							Retry
						</a>
					</MessageBar>
				);
			}
			return <Shimmer />;
		}
	};
}
