import cls from "./Text.module.scss";
import { memo } from "react";
import { classNames } from "@lib/classNames/classNames";
export enum TextTheme {
	PRIMARY = "primary",
	ERROR = "error"
}
interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
}

const Text = memo((props: TextProps) => {
	const { className, text, title, theme = TextTheme.PRIMARY } = props;

	return (
		<div className={classNames(cls.Text, {}, [className, cls[theme]])}>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});

export default Text;
