import { classNames, Mods } from "@lib/classNames/classNames";

import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import cls from "./Button.module.scss";

export enum ButtonTheme {
	OUTLINE = "outline",
	BACKGROUND = "background",
	BACKGROUND_PRIMARY = "backgroundPrimary",
	BACKGROUND_AZURE = "backgroundAzure"
}

export enum ButtonSize {
	S = "size_s",
	M = "size_m"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	size?: ButtonSize;
	disabled?: boolean;
	children?: ReactNode;
}

const Button = memo((props: ButtonProps) => {
	const { className, children, theme = ButtonTheme.OUTLINE, disabled, size = ButtonSize.M, ...otherProps } = props;

	const mods: Mods = {
		[cls.disabled]: disabled
	};

	return (
		<button
			disabled={disabled}
			className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
			{...otherProps}
		>
			{children}
		</button>
	);
});

export default Button;
