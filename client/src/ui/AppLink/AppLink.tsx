import cls from "./AppLink.module.scss";
import { classNames } from "@lib/classNames/classNames";

import { LinkProps, NavLink } from "react-router-dom";
import { memo, ReactNode } from "react";

export enum AppLinkTheme {
	PRIMARY = "primary",
	PRIMARY_INVERTED = "primaryInverted",
	SECONDARY = "secondary"
}

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
	children?: ReactNode;
}

const AppLink = memo((props: AppLinkProps) => {
	const { to, className, theme = AppLinkTheme.PRIMARY, children, ...otherProps } = props;

	return (
		<NavLink to={to} className={classNames(cls.AppLink, {}, [className, cls[theme]])} {...otherProps}>
			{children}
		</NavLink>
	);
});

export default AppLink;
