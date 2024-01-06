import classes from "./General.module.scss";
import FolderIcon from "@assets/icons/folder.svg";
import MenuIcon from "@assets/icons/dots.svg";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";

interface FolderProps {
	folder: FolderAttributes;
	getFolders: (id: number) => void;
}

const Folder = ({ folder, getFolders }: FolderProps) => {
	const { folderName, id, updatedAt } = folder;
	const modifiedDate = updatedAt.split("T")[0];

	const doubleClickHandler = async () => {
		await getFolders(id);
	};

	const openFolderHandler = async () => {
		await getFolders(id);
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
