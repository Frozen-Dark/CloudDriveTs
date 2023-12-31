import React from "react";

const FileSvg = ({ extension }: { extension: string }) => {
	const replacedExt = extension.replace(".", "");
	const text = replacedExt.length <= 3 ? replacedExt.toUpperCase() : "";

	return (
		<svg width="40" height="40" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 6V134.8H120.8V41.2625L120.013 40.3875L86.4125 6.7875L85.5375 6H20ZM25.6 11.6H81.6V45.2H115.2V129.2H25.6V11.6ZM87.2 15.625L111.175 39.6H87.2V15.625Z" />
			<text
				style={{
					textAnchor: "middle",
					fontWeight: "700",
					fontSize: "40px",
					letterSpacing: "-1px"
				}}
				x="50%"
				y="60%"
				fontFamily={"Roboto"}
				dominant-baseline="middle"
			>
				{text}
			</text>
		</svg>
	);
};

export default FileSvg;
