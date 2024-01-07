import { HTMLAttributes, ReactNode, useRef } from "react";
import React from "react";
import { useKeydownListener, useOutsideClick } from "@hooks/hooks";
import { classNames } from "@lib/classNames/classNames";
import cls from "./Popup.module.scss";

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

const Popup = (props: PopupProps) => {
	const { children, isOpen, setIsOpen, className, ...otherProps } = props;
	const popupRef = useRef(null);

	useOutsideClick([popupRef], () => setIsOpen(false), true);
	useKeydownListener(["Escape"], () => setIsOpen(false));

	return (
		<div className={classNames(cls.Popup, {}, [className])} ref={popupRef} {...otherProps}>
			{children}
		</div>
	);
};

export default Popup;
