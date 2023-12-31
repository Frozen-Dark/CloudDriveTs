import cls from "./Input.module.scss";
import { classNames } from "@lib/classNames/classNames";
import { InputHTMLAttributes, memo, ChangeEvent, useRef, useEffect, useState } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;
interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
	type: string;
	autoFocus?: boolean;
}

const Input = memo((props: InputProps) => {
	// const [isMount, setIsMount] = useState<boolean>(false);
	const { className, autoFocus = false, value, onChange, type, placeholder, ...otherProps } = props;

	const focusRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (autoFocus) {
			focusRef.current?.focus();
		}
	}, [autoFocus]);

	// useEffect(() => {
	// 	if (isMount) {
	// 		if (autoFocus) {
	// 			focusRef.current?.focus();
	// 		}
	// 	}
	// 	return setIsMount(false);
	// }, [autoFocus, isMount]);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<input
			placeholder={placeholder}
			ref={focusRef}
			className={classNames(cls.input, {}, [className])}
			onChange={onChangeHandler}
			type={type}
			value={value}
			{...otherProps}
		/>
	);
});

export default Input;
