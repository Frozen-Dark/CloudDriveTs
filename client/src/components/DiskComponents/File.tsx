import classes from "./General.module.scss";
import { FileAttributes } from "../../store/File.ts";
import fileIcon from "../../assets/svg/file.svg";
import menuIcon from "../../assets/svg/dots.svg";
const File = ({ file }: { file: FileAttributes }) => {
	const { fileName, extension, size, updatedAt } = file;
	const filterExtension = extension.replace(".", "");

	const modifiedDate = updatedAt.split("T")[0];
	const parsedSize = String(Math.floor(size / 1024)) + " КБ";
	function menuClickHandler() {}

	return (
		<div className={classes.item}>
			<div className={classes.icon}>
				<img src={fileIcon} alt="Файл" />
			</div>
			<div className={classes.name}>{fileName}</div>
			<div className={classes.type}>{filterExtension}</div>
			<div className={classes.size}>{parsedSize}</div>
			<div className={classes.modified__date}>{modifiedDate}</div>
			<div onClick={menuClickHandler} className={classes.menu}>
				<img src={menuIcon} alt="Меню" />
			</div>
		</div>
	);
};

export default File;
