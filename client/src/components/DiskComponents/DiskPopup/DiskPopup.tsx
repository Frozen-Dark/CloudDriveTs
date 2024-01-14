import { HTMLAttributes, useContext } from "react";
import cls from "./DiskPopup.module.scss";
import Popup from "@ui/Popup/Popup";
import Icon, { IconSize, IconTheme, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";
import Text, { TextSize } from "@ui/Text/Text";
import Portal from "@ui/Portal/Portal";
import { ItemType } from "@pages/Disk/Disk";
import { deleteFile } from "@actions/file";
import { deleteFolder } from "@actions/folder";
import { FolderContext } from "@app/providers/FolderProvider/lib/FolderContext";
import { FileContext } from "@app/providers/FileProvider/lib/FileContext";

interface FilesPopupProps extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	coords: { x: number; y: number };
	activeItem: ItemType;
}

const DiskPopup = ({ isOpen, setIsOpen, coords, activeItem }: FilesPopupProps) => {
	const { deleteFolder: removeFolder } = useContext(FolderContext);
	const { deleteFile: removeFile } = useContext(FileContext);

	if (activeItem === null || !isOpen) {
		return null;
	}

	const { item, type } = activeItem;

	const iconName: IconLightName = type === "file" ? IconLightName.File : IconLightName.Folder;
	const itemName = "fileName" in item ? item.fileName : item.folderName;

	const createLinkHandler = () => {
		setIsOpen(false);
	};

	const renameHandler = () => {
		setIsOpen(false);
	};

	const infoHandler = () => {
		setIsOpen(false);
	};

	const starHandler = () => {
		setIsOpen(false);
	};

	const deleteHandler = async () => {
		if ("fileName" in item) {
			const response = await deleteFile({ fileId: item.id });
			if (response?.status === 200) {
				removeFile(item);
			}
		} else {
			const response = await deleteFolder({ folderId: item.id });
			if (response?.status === 200) {
				removeFolder(item);
			}
		}
		setIsOpen(false);
	};

	return (
		<Portal>
			<Popup
				isOpen={isOpen}
				style={{ left: coords.x - 10, top: coords.y + 10 }}
				setIsOpen={setIsOpen}
				className={cls.popup}
			>
				<ul className={cls.FilesPopup}>
					<li className={cls.header}>
						<Icon size={IconSize.M} name={iconName} />
						<Text titleSize={TextSize.M} title={itemName} />
					</li>
					<li className={cls.divider}></li>

					<li className={cls.item} onClick={createLinkHandler}>
						<Icon
							theme={IconTheme.ACCENT}
							size={IconSize.M}
							name={IconRegularName.Link}
							weight={IconWeight.Regular}
						/>
						<Text titleSize={TextSize.M} title={"Создать ссылку"} />
					</li>

					<Item name={IconLightName.Pen} title={"Переименовать"} onClick={renameHandler} />
					<li className={cls.divider}></li>
					<Item name={IconLightName.FileInfo} title={"Свойства"} onClick={infoHandler} />
					<Item name={IconLightName.Star} title={"Избранное"} onClick={starHandler} />
					<li className={cls.divider}></li>
					<Item name={IconLightName.Trash} title={"Удалить"} onClick={deleteHandler} />
				</ul>
			</Popup>
		</Portal>
	);
};

const Item = ({ name, title, onClick }: { name: IconLightName; title: string; onClick: () => void }) => {
	return (
		<li className={cls.item} onClick={onClick}>
			<Icon size={IconSize.M} theme={IconTheme.ACCENT} name={name} />
			<Text titleSize={TextSize.M} title={title} />
		</li>
	);
};

export default DiskPopup;
