import classes from "./Folder.module.scss";
import { FolderAttributes } from "../../store/Folder.ts";
import folderIcon from "../../assets/svg/folder.svg";
import menuIcon from "../../assets/svg/dots.svg";
const Folder = ({ folder }: { folder: FolderAttributes }) => {
	const { folderName, id } = folder;
	const doubleClickHandler = () => {
		console.log(id);
	};

	function openFolderHandler() {}
	function menuClickHandler() {}

	return (
		<div onDoubleClick={doubleClickHandler} className={classes.folder__item}>
			<div onClick={openFolderHandler} className={classes.folder__icon}>
				<img src={folderIcon} alt="Файл" />
			</div>
			<div className={classes.folder__name}>{folderName}</div>
			<div className={classes.folder__type}>Папка</div>
			<div></div>
			<div className={classes.folder__modified__date}>18.05.2023</div>
			<div onClick={menuClickHandler} className={classes.folder__menu}>
				<img src={menuIcon} alt="Меню" />
			</div>
		</div>
	);
};

export default Folder;
