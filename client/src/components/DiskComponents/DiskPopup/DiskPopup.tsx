import { HTMLAttributes } from "react";
import cls from "./DiskPopup.module.scss";
import Popup from "@ui/Popup/Popup";
import Icon, { IconSize, IconTheme, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";
import Text, { TextSize, TextTheme } from "@ui/Text/Text";
import Portal from "@ui/Portal/Portal";

interface FilesPopupProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	iconName: IconLightName | IconRegularName;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	coords: { x: number; y: number };
}

const DiskPopup = (props: FilesPopupProps) => {
	const { name, iconName, isOpen, setIsOpen, coords } = props;

	const createLinkHandler = () => {};

	const renameHandler = () => {};

	const infoHandler = () => {};

	const starHandler = () => {};

	const deleteHandler = () => {};

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
