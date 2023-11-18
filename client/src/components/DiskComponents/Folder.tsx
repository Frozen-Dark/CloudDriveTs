import classes from "./General.module.scss";
import { FolderAttributes } from "../../store/Folder.ts";
import folderIcon from "../../assets/svg/folder.svg";
import menuIcon from "../../assets/svg/dots.svg";
import { getFiles } from "../../actions/file.ts";
const Folder = ({ folder }: { folder: FolderAttributes }) => {
	const { folderName, id, updatedAt } = folder;
	const doubleClickHandler = async () => {
		await getFiles(id);
	};

	const modifiedDate = updatedAt.split("T")[0];

	const openFolderHandler = async () => {
		await getFiles(id);
	};
	function menuClickHandler() {}

	return (
		<div onDoubleClick={doubleClickHandler} className={classes.item}>
			<div onClick={openFolderHandler} className={classes.icon}>
				<img src={folderIcon} alt="Файл" />
			</div>
			<div className={classes.name}>{folderName}</div>
			<div className={classes.type}>Папка</div>
			<div></div>
			<div className={classes.modified__date}>{modifiedDate}</div>
			<div onClick={menuClickHandler} className={classes.menu}>
				<img src={menuIcon} alt="Меню" />
			</div>
		</div>
	);
};

export default Folder;
