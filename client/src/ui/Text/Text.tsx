import cls from "./Text.module.scss";
import { HTMLAttributes, memo } from "react";
import { classNames } from "@lib/classNames/classNames";
export enum TextTheme {
	PRIMARY = "primary",
	SAME = "same",
	ERROR = "error",
	ACCENT = "accent"
}

export enum TextSize {
	S = "size_s",
	M = "size_m",
	L = "size_l",
	XL = "size_xl"
}

interface TextProps extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	text?: string;
	theme?: TextTheme;
	textSize?: TextSize;
	titleSize?: TextSize;
}

const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		title,
		theme = TextTheme.PRIMARY,
		textSize = TextSize.S,
		titleSize = TextSize.L,
		...otherProps
	} = props;

	return (
		<div className={classNames("", {}, [className, cls[theme]])} {...otherProps}>
			{title && <p className={classNames(cls.title, {}, [cls[titleSize]])}>{title}</p>}
			{text && <p className={classNames(cls.text, {}, [cls[textSize]])}>{text}</p>}
		</div>
	);
});

export default Text;
