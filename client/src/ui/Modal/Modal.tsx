import { classNames, Mods } from "@lib/classNames/classNames";
import React, { ReactNode, MouseEvent, useState, useRef, useEffect, useCallback, MutableRefObject } from "react";
import cls from "./Modal.module.scss";
import Portal from "@ui/Portal/Portal";
interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	lazy: boolean;
}

const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose, lazy } = props;

	const ANIM_DELAY = 150;
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

	const closeHandler = useCallback(() => {
		setIsClosing(true);
		timeRef.current = setTimeout(() => {
			onClose();
			setIsClosing(false);
		}, ANIM_DELAY);
	}, [onClose]);

	const onKeyDown = useCallback(
		(e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") {
				closeHandler();
			}
		},
		[closeHandler]
	);

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.closed]: isClosing
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener("keydown", onKeyDown);
		}

		return () => {
			clearTimeout(timeRef.current);
			window.removeEventListener("keydown", (e) => onKeyDown(e));
		};
	}, [isOpen, onKeyDown]);

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const onClickHandler = (e: MouseEvent) => {
		e.stopPropagation();
	};

	if (lazy && !isMounted) {
		return null;
	}

	return (
		// @ts-ignore
		<Portal>
			<div className={classNames(cls.Modal, mods, [])}>
				<div onClick={closeHandler} className={classNames(cls.overlay, {}, [className])}>
					<div className={cls.content} onClick={onClickHandler}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
