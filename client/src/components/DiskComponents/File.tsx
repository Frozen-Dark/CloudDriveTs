import classes from "./General.module.scss";
import MenuIcon from "@assets/icons/dots.svg";
import FileSvg from "@assets/FileSvg";
import { FileAttributes } from "@app/providers/FileProvider/lib/FileContext";
import Icon, { IconSize, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";
const File = ({ file }: { file: FileAttributes }) => {
	const { fileName, extension, size, updatedAt } = file;
	const filterExtension = extension.replace(".", "");

	const modifiedDate = updatedAt.split("T")[0];
	const kiloByte = Math.floor(size / 1024);
	const parsedSize = kiloByte > 1023 ? String((kiloByte / 1024).toFixed(2)) + " Мб" : String(kiloByte) + " Кб";
	function menuClickHandler() {}

	return (
		<div className={classes.item}>
			<div className={classes.icon} style={{ opacity: "1" }}>
				<Icon name={IconLightName.File} weight={IconWeight.Light} size={IconSize.L} />
			</div>
			<div className={classes.name}>{fileName}</div>
			<div className={classes.type}>{filterExtension}</div>
			<div className={classes.size}>{parsedSize}</div>
			<div className={classes.modified__date}>{modifiedDate}</div>
			<div onClick={menuClickHandler} className={classes.menu}>
				<Icon name={IconRegularName.Ellipsis} className={classes.icon} size={IconSize.L} />
			</div>
		</div>
	);
};

export default File;
