import classes from "./General.module.scss";
import MenuIcon from "@assets/icons/dots.svg";
import FileSvg from "@assets/FileSvg";
import { FileAttributes } from "@app/providers/FileProvider/lib/FileContext";
const File = ({ file }: { file: FileAttributes }) => {
	const { fileName, extension, size, updatedAt } = file;
	const filterExtension = extension.replace(".", "");

	const modifiedDate = updatedAt.split("T")[0];
	const kiloByte = Math.floor(size / 1024);
	const parsedSize = kiloByte > 1023 ? String((kiloByte / 1024).toFixed(2)) + " Мб" : String(kiloByte) + " Кб";
	function menuClickHandler() {}

	return (
		<div className={classes.item}>
			<div className={classes.icon}>
				<FileSvg extension={extension} />
			</div>
			<div className={classes.name}>{fileName}</div>
			<div className={classes.type}>{filterExtension}</div>
			<div className={classes.size}>{parsedSize}</div>
			<div className={classes.modified__date}>{modifiedDate}</div>
			<div onClick={menuClickHandler} className={classes.menu}>
				<MenuIcon />
			</div>
		</div>
	);
};

export default File;
