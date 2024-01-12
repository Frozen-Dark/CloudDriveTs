import cls from "./Disk.module.scss";
import FileComponent from "@components/DiskComponents/File";
import FolderComponent from "@components/DiskComponents/Folder";
import { useContext, useEffect, useState } from "react";
import DropWrapper from "@components/DiskComponents/dndWrapper/dndWrapper";
import Header from "@components/Header/Header";
import CreateFolder from "@components/CreateFolder/CreateFolder";
import { classNames } from "@lib/classNames/classNames";
import { FolderAttributes, FolderContext } from "@app/providers/FolderProvider/lib/FolderContext";
import { getFiles } from "@actions/file";
import { FileAttributes, FileContext } from "@app/providers/FileProvider/lib/FileContext";
import DiskPopup from "@components/DiskComponents/DiskPopup/DiskPopup";
import { useMousePosition } from "@hooks/hooks";

const toggleItem = <T extends { id: number }>(items: T[], item: T): T[] => {
	if (items.some((i) => i.id === item.id)) {
		return items.filter((i) => i.id !== item.id);
	} else {
		return [...items, item];
	}
};

export type ItemType = {
	item: FileAttributes | FolderAttributes;
	type: "folder" | "file";
} | null;

const Disk = () => {
	const [addClasses, setAddClasses] = useState("");
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const { folders, setFolders, setParentFolder } = useContext(FolderContext);
	const { files, setFiles } = useContext(FileContext);

	const [activeFolders, setActiveFolders] = useState<FolderAttributes[]>([]);
	const [activeFiles, setActiveFiles] = useState<FileAttributes[]>([]);

	const [activeItem, setActiveItem] = useState<ItemType>(null);

	const { coords, handleEllipsesClick } = useMousePosition(() => setIsPopupOpen(true));

	const clearActiveItems = () => {
		setActiveFolders([]);
		setActiveFiles([]);
	};

	const ellipsesClickHandler = (e: React.MouseEvent, item: FileAttributes | FolderAttributes) => {
		handleEllipsesClick(e);
		e.stopPropagation();
		const type = (item as any)?.fileName ? "file" : "folder";
		setActiveItem({ item, type });
		clearActiveItems();
	};

	const folderClickHandler = (folder: FolderAttributes) => {
		setActiveFolders((prevFolders) => toggleItem(prevFolders, folder));
	};

	const fileClickHandler = (file: FileAttributes) => {
		setActiveFiles((prevFiles) => toggleItem(prevFiles, file));
	};

	const openFolder = async (id: number | null) => {
		const response = await getFiles(id);
		if (response?.status === 200) {
			const { folders, parentFolder, files } = response.data;
			setParentFolder(parentFolder);
			setFolders(folders);
			setFiles(files);
		}
	};

	useEffect(() => {
		clearActiveItems();
	}, [folders, files]);

	useEffect(() => {
		const parentId = Number(localStorage.getItem("parentId")) || null;
		void openFolder(parentId);
	}, []);

	return (
		<>
			<Header />
			<div className={cls.disk}>
				<div className={classNames(cls.file__container, { [addClasses]: !!addClasses })}>
					<DropWrapper setAddClasses={setAddClasses}>
						<div className={cls.header}>
							<div className={cls.myDisk} onClick={() => openFolder(null)}>
								{"Мой диск"}
							</div>
							<CreateFolder />
						</div>

						<div className={cls.filter}>
							<div className={cls.filterItem}>
								<div className={cls.leftFilter}></div>
								<div className={cls.name}>Название</div>
								<div className={cls.type}>Тип</div>
								<div className={cls.size}>Размер файла</div>
								<div className={cls.modified__date}>Последнее изменение</div>
								<div className={cls.rightFilter}></div>
							</div>
						</div>

						<div className={cls.files}>
							{folders.map((fld) => (
								<FolderComponent
									key={fld.id}
									folder={fld}
									getFolders={openFolder}
									folderClick={folderClickHandler}
									menuClick={ellipsesClickHandler}
									isActive={activeFolders.some((activeFolder) => activeFolder.id === fld.id)}
								/>
							))}
							{files.map((file) => (
								<FileComponent
									key={file.id}
									file={file}
									fileClick={fileClickHandler}
									menuClick={ellipsesClickHandler}
									isActive={activeFiles.some((activeFile) => activeFile.id === file.id)}
								/>
							))}
						</div>
					</DropWrapper>
				</div>
			</div>
			<DiskPopup activeItem={activeItem} isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} coords={coords} />
		</>
	);
};

export default Disk;
