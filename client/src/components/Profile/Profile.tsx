import cls from "./Profile.module.scss";
import { FC, HTMLProps, SVGAttributes } from "react";

import ExitIcon from "@assets/profileIcons/exit.svg";
import FaqIcon from "@assets/profileIcons/faq.svg";
import SettingsIcon from "@assets/profileIcons/settings.svg";
import ThemeIcon from "@assets/profileIcons/theme.svg";
import ProfileAvatar from "@components/Elements/Avatar/Avatar";
import { NavLink } from "react-router-dom";
import { RoutePath } from "@config/routeConfig/routeConfig";
import { logout } from "@actions/user";

interface ProfileItemProps extends HTMLProps<HTMLDivElement> {
	Icon: FC<SVGAttributes<SVGElement>>;
	text: string;
	additionText?: string;
}

const ProfileItem: FC<ProfileItemProps> = ({ Icon, text, additionText, onClick }) => {
	return (
		<div onClick={onClick} className={cls.item}>
			<div className={cls.icon}>
				<Icon />
			</div>
			<p className={cls.text}>{text}</p>
			{additionText && <p className={cls.additional}>{additionText}</p>}
		</div>
	);
};

const Profile: FC = () => {
	const theme = "Тёмная";
	const Username = "User";
	const Email = "test@mail.ru";

	const exitHandler = async () => {
		await logout();
	};

	return (
		<div data-theme={"dark"} className={cls.profile}>
			<div className={cls.header}>
				<ProfileAvatar className={cls.avatar} />
				<div className={cls.info}>
					<p className={cls.username}>{Username}</p>
					<p className={cls.email}>{Email}</p>
				</div>
			</div>
			<div>
				<ProfileItem Icon={ThemeIcon} text={"Тема:"} additionText={theme} />
				<ProfileItem Icon={SettingsIcon} text={"Настройки"} />
				<ProfileItem Icon={FaqIcon} text={"Помощь"} />
				<NavLink to={RoutePath.login}>
					<ProfileItem onClick={exitHandler} Icon={ExitIcon} text={"Выйти"} />
				</NavLink>
			</div>
		</div>
	);
};

export default Profile;
