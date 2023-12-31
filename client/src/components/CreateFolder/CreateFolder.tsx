import cls from "./CreateFolder.module.scss";
import { useState } from "react";
import { classNames } from "@lib/classNames/classNames";
import Text from "@ui/Text/Text";
import Input from "@ui/Input/Input";
import Button, { ButtonSize, ButtonTheme } from "@ui/Button/Button";
import Modal from "@ui/Modal/Modal";
import classes from "@pages/Disk/Disk.module.scss";
import AddFolderIcon from "@assets/icons/cancel.svg";
import { createFolder } from "@actions/file";
import Folder from "@store/Folder";

export interface CreateFolderProps {
	className?: string;
}

const CreateFolder = ({ className }: CreateFolderProps) => {
	const [folderName, setFolderName] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onChangeName = (value: string) => {
		setFolderName(value);
	};

	const onCreateHandler = () => {
		const parentId = Folder.parentId;
		if (parentId) {
			createFolder({ folderName, parentId });
		}
	};

	const onCloseHandler = () => {
		setIsOpen(false);
	};

	return (
		<>
			<div onClick={() => setIsOpen(true)} className={classes.addFolder}>
				<AddFolderIcon className={classes.addFolderIcon} />
			</div>
			<Modal isOpen={isOpen} lazy={true} onClose={onCloseHandler}>
				<div className={classNames(cls.CreateFolder, {}, [className])}>
					<div className={cls.titleWrapper}>
						<Text title={"Новая папка"} />
					</div>
					<div style={{ width: "100%", padding: "20px" }}>
						<Input
							type={"text"}
							className={cls.input}
							placeholder={"Имя папки"}
							autoFocus={true}
							onChange={onChangeName}
							value={folderName}
						/>
					</div>

					<div className={cls.buttonContainer}>
						<Button onClick={onCloseHandler} size={ButtonSize.S} theme={ButtonTheme.BACKGROUND}>
							{"Отмена"}
						</Button>
						<Button onClick={onCreateHandler} size={ButtonSize.S} theme={ButtonTheme.BACKGROUND_PRIMARY}>
							{"Создать"}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default CreateFolder;
