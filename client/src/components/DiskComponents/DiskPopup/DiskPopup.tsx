import { HTMLAttributes, useContext } from "react";
import cls from "./DiskPopup.module.scss";
import Popup from "@ui/Popup/Popup";
import Icon, { IconSize, IconTheme, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";
import Text, { TextSize, TextTheme } from "@ui/Text/Text";
import Portal from "@ui/Portal/Portal";
import { ItemType } from "@pages/Disk/Disk";
import { deleteFile } from "@actions/file";
import { deleteFolder } from "@actions/folder";
import { FolderAttributes, FolderContext } from "@app/providers/FolderProvider/lib/FolderContext";
import { FileAttributes, FileContext } from "@app/providers/FileProvider/lib/FileContext";

interface FilesPopupProps extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	coords: { x: number; y: number };
	activeItem: ItemType;
}

const DiskPopup = (props: FilesPopupProps) => {
	const { isOpen, setIsOpen, coords, activeItem } = props;

	const { deleteFolder: removeFolder } = useContext(FolderContext);

	const { deleteFile: removeFile } = useContext(FileContext);

	if (activeItem === null) {
		return null;
	}

	const iconName: IconLightName = activeItem.type === "file" ? IconLightName.File : IconLightName.Folder;
	const name = activeItem.type === "file" ? (activeItem as any).item.fileName : (activeItem as any).item.folderName;

	const createLinkHandler = () => {};

	const renameHandler = () => {};

	const infoHandler = () => {};

	const starHandler = () => {};

	const deleteHandler = async () => {
		if (activeItem.type === "file") {
			const response = await deleteFile({ fileId: activeItem.item.id });
			if (response?.status === 200) {
				removeFile(activeItem.item as FileAttributes);
			}
		} else {
			const response = await deleteFolder({ folderId: activeItem.item.id });
			if (response?.status === 200) {
				removeFolder(activeItem.item as FolderAttributes);
			}
		}
		setIsOpen(false);
	};

	if (!isOpen) return null;

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
						<Text titleSize={TextSize.M} title={name} />
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
					<li className={cls.item} onClick={renameHandler}>
						<Icon size={IconSize.M} theme={IconTheme.ACCENT} name={IconLightName.Pen} />
						<Text titleSize={TextSize.M} title={"Переименовать"} />
					</li>
					<li className={cls.divider}></li>
					<li className={cls.item} onClick={infoHandler}>
						<Icon size={IconSize.M} theme={IconTheme.ACCENT} name={IconLightName.FileInfo} />
						<Text titleSize={TextSize.M} title={"Свойства"} />
					</li>
					<li className={cls.item} onClick={starHandler}>
						<Icon size={IconSize.M} theme={IconTheme.ACCENT} name={IconLightName.Star} />
						<Text titleSize={TextSize.M} title={"Избранное"} />
					</li>
					<li className={cls.divider}></li>
					<li className={cls.item} onClick={deleteHandler}>
						<Icon size={IconSize.M} theme={IconTheme.ERROR} name={IconLightName.Trash} />
						<Text theme={TextTheme.ERROR} titleSize={TextSize.M} title={"Удалить"} />
					</li>
				</ul>
			</Popup>
		</Portal>
	);
};

export default DiskPopup;
