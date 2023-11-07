import classes from "./File.module.scss";
import { FileAttributes } from "../../store/File.ts";
import fileIcon from "../../assets/svg/file.svg";
import menuIcon from "../../assets/svg/dots.svg";
const File = ({ file }: { file: FileAttributes }) => {
	const { fileName, extension, size } = file;
	const filterExtension = extension.replace(".", "");

	function menuClickHandler() {}

	return (
		<div className={classes.file__item}>
			<div className={classes.file__icon}>
				<img src={fileIcon} alt="Файл" />
			</div>
			<div className={classes.file__name}>{fileName}</div>
			<div className={classes.file__type}>{filterExtension}</div>
			<div className={classes.file__size}>{size}</div>
			<div className={classes.file__modified__date}>18.05.2023</div>
			<div onClick={menuClickHandler} className={classes.file__menu}>
				<img src={menuIcon} alt="Меню" />
			</div>
		</div>
	);
};

export default File;
