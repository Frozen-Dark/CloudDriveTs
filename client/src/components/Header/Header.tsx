import cls from "./Header.module.scss";
import LogoIcon from "@assets/icons/logo.svg";
import { useState } from "react";
import Profile from "@components/Profile/Profile";
import Modal from "@ui/Modal/Modal";
import ProfileAvatar from "@components/Elements/Avatar/Avatar";

const Header = () => {
	const [isOpenProfile, profileDispatch] = useState(false);

	return (
		<>
			<div className={cls.header}>
				<div className={cls.wrapper}>
					<div className={cls.logo}>
						<LogoIcon className={cls.logoSvg} />
					</div>
					<div className={cls.search}>
						<input className={cls.findByName} type="text" placeholder={"Поиск по папке"} />
					</div>
					<div onClick={() => profileDispatch(true)} className={cls.profile}>
						<ProfileAvatar />
					</div>
				</div>
			</div>
			<Modal className={cls.modal} isOpen={isOpenProfile} onClose={() => profileDispatch(false)} lazy={false}>
				<Profile />
			</Modal>
		</>
	);
};

export default Header;
