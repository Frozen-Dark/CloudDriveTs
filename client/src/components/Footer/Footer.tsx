import Text from "@ui/Text/Text";
import cls from "./Footer.module.scss";

const Footer = () => {
	return (
		<footer>
			<div className={cls.wrapper}>
				<Text text={"Created by Sergey Fedorashko"} />
				<Text text={"© 2024 CloudDrive"} />
			</div>
		</footer>
	);
};

export default Footer;
