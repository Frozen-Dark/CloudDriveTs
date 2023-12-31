import { FC, HTMLProps } from "react";
import { classNames } from "@lib/classNames/classNames";
import cls from "./Avatar.module.scss";

const ProfileAvatar: FC<HTMLProps<HTMLDivElement>> = ({ className, ...props }) => {
	return (
		<div className={classNames(cls.avatar, {}, [className])} {...props}>
			<div className={cls.skeletonAvatar}></div>
		</div>
	);
};

export default ProfileAvatar;
