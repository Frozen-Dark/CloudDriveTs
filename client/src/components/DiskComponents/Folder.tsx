import classes from "./General.module.scss";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";
import Icon, { IconSize, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";

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
			<div onClick={openFolderHandler} style={{ opacity: "1" }} className={classes.icon}>
				<Icon name={IconLightName.Folder} weight={IconWeight.Light} size={IconSize.L} />
			</div>
			<div className={classes.name}>{folderName}</div>
			<div className={classes.type}>Папка</div>
			<div></div>
			<div className={classes.modified__date}>{modifiedDate}</div>
			<div onClick={menuClickHandler} className={classes.menu}>
				<Icon name={IconRegularName.Ellipsis} className={classes.icon} size={IconSize.L} />
			</div>
		</div>
	);
};

export default Folder;
