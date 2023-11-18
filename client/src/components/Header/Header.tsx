import classes from "./Header.module.scss";
import { ReactComponent as MyIcon } from "../../assets/svg/logo.svg";
const Header = () => {
	return (
		<div className={classes.header}>
			<div className={classes.wrapper}>
				<div className={classes.logo}>
					<MyIcon className={classes.logoSvg} />
				</div>
				<div className={classes.search}>
					<input className={classes.findByName} type="text" placeholder={"Поиск по папке"} />
				</div>
				<div className={classes.profile}>Profile</div>
			</div>
		</div>
	);
};

export default Header;
