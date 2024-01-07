import React, { KeyboardEvent, RefObject, useEffect, useRef, useState } from "react";

export const useCaret = () => {
	const spanRef = useRef<HTMLInputElement>(null);
	const [spanText, setSpanText] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);

	const onBlur = () => {
		setIsFocused(false);
	};
	const onFocus = () => {
		setIsFocused(true);
	};

	const onSelect = (e: any) => {
		setSpanText(e?.target?.value.slice(0, e?.target?.selectionStart));
	};
	useEffect(() => {
		setCaretPosition(spanRef?.current?.offsetWidth || 0);
	}, [spanText]);

	return {
		spanRef,
		spanText,
		isFocused,
		caretPosition,
		onBlur,
		onFocus,
		onSelect
	};
};

export const useOutsideClick = (elements: RefObject<HTMLDivElement>[], callback: () => void, isActive: boolean) => {
	useEffect(() => {
		if (!isActive) return;

		const handleClickOutside = (event: MouseEvent) => {
			const isOutside = elements.every((element) => {
				return element.current && !element.current.contains(event.target as Node);
			});

			if (isOutside) callback();
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [elements, callback, isActive]);
};

export const useKeydownListener = (keys: KeyboardEvent["key"][], callback: (e: KeyboardEvent) => void) => {
	useEffect(() => {
		const handleKeyPress: EventListener = (event: Event) => {
			const keyboardEvent = event as unknown as KeyboardEvent;
			if (keys.includes(keyboardEvent.key)) {
				callback(keyboardEvent);
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [keys, callback]);
};

export const useMousePosition = (callback: () => void) => {
	const [coords, setCoords] = useState({ x: 0, y: 0 });

	const handleEllipsesClick = (event: React.MouseEvent) => {
		setCoords({ x: event.clientX, y: event.clientY });
		callback();
	};

	return { coords, handleEllipsesClick };
};
