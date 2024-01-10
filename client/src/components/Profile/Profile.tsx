import cls from "./Profile.module.scss";
import { FC, HTMLProps } from "react";
import ProfileAvatar from "@components/Elements/Avatar/Avatar";
import { NavLink } from "react-router-dom";
import { RoutePath } from "@config/routeConfig/routeConfig";
import { logout } from "@actions/user";
import Icon, { IconSize, IconTheme } from "@ui/Icon/Icon";
import { IconLightName } from "@lib/icons/icons";
import Text, { TextSize, TextTheme } from "@ui/Text/Text";

interface ProfileItemProps extends HTMLProps<HTMLDivElement> {
	IconName: IconLightName;
	text: string;
	additionText?: string;
}

const ProfileItem: FC<ProfileItemProps> = ({ IconName, text, additionText, onClick }) => {
	return (
		<div onClick={onClick} className={cls.item}>
			<div className={cls.icon}>
				<Icon theme={IconTheme.ACCENT} size={IconSize.L} name={IconName} />
			</div>
			<Text text={text} theme={TextTheme.SAME} textSize={TextSize.M} />
			{additionText && (
				<Text
					style={{ marginLeft: "5px" }}
					text={additionText}
					theme={TextTheme.ACCENT}
					textSize={TextSize.M}
				/>
			)}
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
				<ProfileItem IconName={IconLightName.Palette} text={"Тема:"} additionText={theme} />
				<ProfileItem IconName={IconLightName.Gear} text={"Настройки"} />
				<ProfileItem IconName={IconLightName.CircleInfo} text={"Помощь"} />
				<NavLink to={RoutePath.login}>
					<ProfileItem onClick={exitHandler} IconName={IconLightName.ArrowExit} text={"Выйти"} />
				</NavLink>
			</div>
		</div>
	);
};

export default Profile;
