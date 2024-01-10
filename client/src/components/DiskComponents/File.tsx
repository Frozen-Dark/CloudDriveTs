import cls from "./General.module.scss";
import { FileAttributes } from "@app/providers/FileProvider/lib/FileContext";
import Icon, { IconSize, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";
import { MouseEvent } from "react";

interface FileProps {
	menuClickHandler: (e: MouseEvent) => void;
	file: FileAttributes;
}

const File = ({ file, menuClickHandler }: FileProps) => {
	const { fileName, extension, size, updatedAt } = file;
	const filterExtension = extension.replace(".", "");

	const modifiedDate = updatedAt.split("T")[0];
	const kiloByte = Math.floor(size / 1024);
	const parsedSize = kiloByte > 1023 ? String((kiloByte / 1024).toFixed(2)) + " Мб" : String(kiloByte) + " Кб";

	return (
		<div className={cls.item}>
			<div className={cls.icon} style={{ opacity: "1" }}>
				<Icon name={IconLightName.File} weight={IconWeight.Light} size={IconSize.L} />
			</div>
			<div className={cls.name}>{fileName}</div>
			<div className={cls.type}>{filterExtension}</div>
			<div className={cls.size}>{parsedSize}</div>
			<div className={cls.modified__date}>{modifiedDate}</div>
			<div className={cls.menu}>
				<div className={cls.iconWrapper}>
					<Icon name={IconLightName.Download} size={IconSize.M} className={cls.icon} />
				</div>

				<div onClick={menuClickHandler} className={cls.iconWrapper}>
					<Icon
						name={IconRegularName.Ellipsis}
						weight={IconWeight.Regular}
						className={cls.icon}
						size={IconSize.L}
					/>
				</div>
			</div>
		</div>
	);
};

export default File;
