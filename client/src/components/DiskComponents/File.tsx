import cls from "./General.module.scss";
import { FileAttributes } from "@app/providers/FileProvider/lib/FileContext";
import Icon, { IconSize, IconWeight } from "@ui/Icon/Icon";
import { IconLightName, IconRegularName } from "@lib/icons/icons";
import { MouseEvent } from "react";
import { classNames } from "@lib/classNames/classNames";
import classes from "@components/DiskComponents/General.module.scss";
import { downloadFile } from "@actions/file";

interface FileProps {
	menuClick: (e: MouseEvent, file: FileAttributes) => void;
	file: FileAttributes;
	fileClick: (file: FileAttributes) => void;
	isActive: boolean;
}

const File = ({ file, menuClick, fileClick, isActive }: FileProps) => {
	const { fileName, extension, size, updatedAt } = file;

	const filterExtension = extension.replace(".", "");

	const modifiedDate = updatedAt.split("T")[0];
	const kiloByte = Math.floor(size / 1024);
	const parsedSize = kiloByte > 1023 ? String((kiloByte / 1024).toFixed(2)) + " Мб" : String(kiloByte) + " Кб";

	const doubleClickHandler = async () => {};

	const fileClickHandler = () => {
		fileClick(file);
	};

	const downloadClickHandler = async (e: MouseEvent) => {
		e.preventDefault();
		await downloadFile({ file });
	};

	return (
		<div
			onDoubleClick={doubleClickHandler}
			onClick={fileClickHandler}
			className={classNames(classes.item, { [cls.itemActive]: isActive })}
		>
			<div className={cls.icon} style={{ opacity: "1" }}>
				<Icon name={IconLightName.File} weight={IconWeight.Light} size={IconSize.L} />
			</div>
			<div className={cls.name}>{fileName}</div>
			<div className={cls.type}>{filterExtension}</div>
			<div className={cls.size}>{parsedSize}</div>
			<div className={cls.modified__date}>{modifiedDate}</div>
			<div className={cls.menu}>
				<div onClick={downloadClickHandler} className={cls.iconWrapper}>
					<Icon name={IconLightName.Download} size={IconSize.M} className={cls.icon} />
				</div>

				<div onClick={(e) => menuClick(e, file)} className={cls.iconWrapper}>
					<Icon
						name={IconRegularName.Ellipsis}
						weight={IconWeight.Regular}
						className={cls.icon}
						size={IconSize.M}
					/>
				</div>
			</div>
		</div>
	);
};

export default File;
