import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import React from "react";
import { useOutsideClick } from "@hooks/hooks";
import { classNames } from "@lib/classNames/classNames";
import cls from "./Popup.module.scss";

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: () => void;
}
const Popup = (props: PopupProps) => {
	const { children, isOpen, setIsOpen, className } = props;
	const popupRef = useRef(null);
	useOutsideClick([popupRef], () => {}, true);

	return (
		<div className={classNames(cls.popup, {}, [className])} ref={popupRef}>
			{children}
		</div>
	);
};

export default Popup;
