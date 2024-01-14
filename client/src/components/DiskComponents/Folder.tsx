import classes from "./General.module.scss";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";
import Icon, { IconSize, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";
import { MouseEvent } from "react";
import cls from "@components/DiskComponents/General.module.scss";
import { classNames } from "@lib/classNames/classNames";

interface FolderProps {
	folder: FolderAttributes;
	getFolders: (id: number) => void;
	menuClick: (e: MouseEvent, folder: FolderAttributes) => void;
	folderClick: (folder: FolderAttributes) => void;
	isActive: boolean;
}

const Folder = ({ folder, getFolders, menuClick, isActive, folderClick }: FolderProps) => {
	const { folderName, id, updatedAt } = folder;
	const modifiedDate = updatedAt.split("T")[0];

	const doubleClickHandler = async () => {
		await getFolders(id);
	};

	const folderClickHandler = () => {
		folderClick(folder);
	};

	const openFolderHandler = async () => {
		await getFolders(id);
	};

	return (
		<div
			onClick={folderClickHandler}
			onDoubleClick={doubleClickHandler}
			className={classNames(classes.item, { [cls.itemActive]: isActive })}
		>
			<div onClick={openFolderHandler} style={{ opacity: "1" }} className={classes.icon}>
				<Icon name={IconLightName.Folder} size={IconSize.L} />
			</div>
			<div className={classes.name}>{folderName}</div>
			<div className={classes.type}>Папка</div>
			<div></div>
			<div className={classes.modified__date}>{modifiedDate}</div>
			<div className={classes.menu}>
				<div onClick={(e) => menuClick(e, folder)} className={cls.iconWrapper}>
					<Icon
						name={IconRegularName.Ellipsis}
						weight={IconWeight.Regular}
						className={classes.icon}
						size={IconSize.M}
					/>
				</div>
			</div>
		</div>
	);
};

export default Folder;
