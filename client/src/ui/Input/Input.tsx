import cls from "./Input.module.scss";
import { classNames } from "@lib/classNames/classNames";
import { InputHTMLAttributes, memo, ChangeEvent, useRef, useEffect, useState } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size">;
interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
	type: string;
	fontSize?: FontInputSize;
	autoFocus?: boolean;
}

export enum FontInputSize {
	S = "size_s",
	M = "size_m"
}

const Input = memo((props: InputProps) => {
	const {
		className,
		fontSize = FontInputSize.S,
		autoFocus = false,
		value,
		onChange,
		type,
		placeholder,
		...otherProps
	} = props;

	const focusRef = useRef<HTMLInputElement>(null);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	useEffect(() => {
		if (autoFocus) {
			focusRef.current?.focus();
		}
	}, [autoFocus]);

	return (
		<input
			placeholder={placeholder}
			ref={focusRef}
			className={classNames(cls.input, {}, [className, cls[fontSize]])}
			onChange={onChangeHandler}
			type={type}
			value={value}
			{...otherProps}
		/>
	);
});

export default Input;
