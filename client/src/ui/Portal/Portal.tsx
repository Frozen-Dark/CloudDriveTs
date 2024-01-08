import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import React from "react";

interface PortalProps {
	children: ReactNode;
	element?: HTMLElement;
}
const Portal = (props: PortalProps) => {
	const { children, element = document.querySelector("#root > div") as HTMLElement } = props;

	const [domReady, setDomReady] = useState(false);

	useEffect(() => {
		setDomReady(true);
	}, []);

	return domReady ? createPortal(children, element) : null;
};

export default Portal;
