import * as core from "@core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { MessageBar, PrimaryButton, Spinner, SpinnerSize } from "office-ui-fabric-react";
import * as React from "react";

@observer
export class PageLoader extends React.Component<{
	pageComponent: () => Promise<React.ReactElement<any>>;
}> {
	@observable componentToRender: React.ReactElement = (
		<div className="spinner-container">
			<Spinner
				size={SpinnerSize.large}
				label={core.text(`please wait`).c}
			/>
		</div>
	);

	loadPage() {
		this.props.pageComponent()
			.then((c) => (this.componentToRender = c))
			.catch((err) => {
				console.error("PageLoader failed:", err);
				this.componentToRender = (
					<MessageBar messageBarType={1}>
						Failed to load page.{" "}
						<a href="#" onClick={(e) => { e.preventDefault(); this.loadPage(); }}>
							Retry
						</a>
					</MessageBar>
				);
			});
	}

	componentDidMount() {
		this.loadPage();
	}
	render() {
		return this.componentToRender;
	}
}
