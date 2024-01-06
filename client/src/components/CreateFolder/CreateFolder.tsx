import cls from "./CreateFolder.module.scss";
import { useContext, useState } from "react";
import { classNames } from "@lib/classNames/classNames";
import Text from "@ui/Text/Text";
import Input from "@ui/Input/Input";
import Button, { ButtonSize, ButtonTheme } from "@ui/Button/Button";
import Modal from "@ui/Modal/Modal";
import classes from "@pages/Disk/Disk.module.scss";
import AddFolderIcon from "@assets/icons/cancel.svg";
import { createFolder } from "@actions/file";
import { observer } from "mobx-react";
import { FolderContext } from "../../app/providers/FolderProvider/lib/FolderContext";

const CreateFolder = ({ className }: { className?: string }) => {
	const [folderName, setFolderName] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { parentFolder } = useContext(FolderContext);

	const onChangeName = (value: string) => {
		setFolderName(value);
	};

	const onCreateHandler = async () => {
		const parentId = parentFolder?.id;
		if (parentId) {
			await createFolder({ folderName, parentId });
			onCloseHandler();
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

export default observer(CreateFolder);
