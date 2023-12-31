import classes from "./General.module.scss";
import FolderIcon from "@assets/icons/folder.svg";
import MenuIcon from "@assets/icons/dots.svg";
import { FolderAttributes } from "@store/Folder";
import { getFiles } from "@actions/file";
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
				<FolderIcon />
			</div>
			<div className={classes.name}>{folderName}</div>
			<div className={classes.type}>Папка</div>
			<div></div>
			<div className={classes.modified__date}>{modifiedDate}</div>
			<div onClick={menuClickHandler} className={classes.menu}>
				<MenuIcon />
			</div>
		</div>
	);
};

export default Folder;
