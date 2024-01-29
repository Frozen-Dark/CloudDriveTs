import cls from "./CreateFolder.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { classNames } from "@lib/classNames/classNames";
import Input from "@ui/Input/Input";
import Button, { ButtonSize, ButtonTheme } from "@ui/Button/Button";
import Modal from "@ui/Modal/Modal";
import { createFolder } from "@actions/folder";
import { observer } from "mobx-react";
import { FolderContext } from "@app/providers/FolderProvider/lib/FolderContext";
import Icon, { IconSize } from "@ui/Icon/Icon";
import { IconLightName } from "@lib/icons/icons";
import Text from "@ui/Text/Text";

const CreateFolder = ({ className }: { className?: string }) => {
	const [folderName, setFolderName] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { parentFolder, addFolder } = useContext(FolderContext);

	const onChangeName = (value: string) => {
		setFolderName(value);
	};

	const onCreateHandler = async () => {
		const parentId = parentFolder?.id;
		if (parentId) {
			const response = await createFolder({ folderName, parentId });
			if (response?.status === 200) {
				addFolder(response.data.folder);
			}
			onCloseHandler();
		}
	};

	const onCloseHandler = () => {
		setIsOpen(false);
		setFolderName("");
	};

	return (
		<>
			<div onClick={() => setIsOpen(true)} className={cls.addFolder}>
				<Icon name={IconLightName.AddFolder} size={IconSize.L} />
			</div>
			<Modal isOpen={isOpen} lazy={true} onClose={onCloseHandler}>
				<div className={classNames(cls.CreateFolder, {}, [className])}>
					<div className={cls.titleWrapper}>
						<Text title={"Создать папку"} />
					</div>
					<div style={{ width: "100%", padding: "20px" }}>
						<Input
							type={"text"}
							className={cls.input}
							placeholder={"Имя папки"}
							autoFocus={isOpen}
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
