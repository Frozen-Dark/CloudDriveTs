import { RefObject, useEffect, useRef, useState } from "react";

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
