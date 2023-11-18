declare module "*.module.scss" {
	const classes: { [key: string]: string };
	export default classes;
}

// declare module "*.svg" {
// 	const content: string;
// 	export default content;
// }

declare module "*.svg" {
	import React = require("react");
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
