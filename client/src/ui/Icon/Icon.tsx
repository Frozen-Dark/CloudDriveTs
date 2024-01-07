import React, { SVGAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNames } from "@lib/classNames/classNames";
import cls from "./Icon.module.scss";
import { IconLightName, IconRegularName } from "@lib/icons/icons";

export enum IconSize {
	S = "size_s",
	M = "size_m",
	L = "size_l",
	XL = "size_xl"
}

export enum IconWeight {
	Regular = "far",
	Light = "fal"
}

export enum IconTheme {
	REGULAR = "regular",
	ERROR = "error",
	ACCENT = "accent"
}

interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "mask"> {
	className?: string;
	size?: IconSize;
	weight?: IconWeight;
	theme?: IconTheme;
	name: IconLightName | IconRegularName;
}

const Icon = (props: IconProps) => {
	const {
		className,
		size = IconSize.M,
		theme = IconTheme.REGULAR,
		weight = IconWeight.Light,
		name,
		...otherProps
	} = props;

	return (
		<FontAwesomeIcon
			className={classNames(cls.Icon, {}, [className, cls[size], cls[theme]])}
			icon={[weight, name]}
			{...otherProps}
		/>
	);
};

export default Icon;
