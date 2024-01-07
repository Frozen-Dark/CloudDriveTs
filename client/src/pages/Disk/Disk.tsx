import cls from "./Disk.module.scss";
import FileComponent from "@components/DiskComponents/File";
import FolderComponent from "@components/DiskComponents/Folder";
import { useContext, useEffect, useState } from "react";
import DropWrapper from "@components/DiskComponents/dndWrapper/dndWrapper";
import Header from "@components/Header/Header";
import CreateFolder from "@components/CreateFolder/CreateFolder";
import { classNames } from "@lib/classNames/classNames";
import { FolderContext } from "@app/providers/FolderProvider/lib/FolderContext";
import { getFiles } from "@actions/file";
import { FileContext } from "@app/providers/FileProvider/lib/FileContext";

const Disk = () => {
	const [addClasses, setAddClasses] = useState<string>("");

	const { folders, setFolders, setParentFolder } = useContext(FolderContext);
	const { files, setFiles } = useContext(FileContext);

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
								<FolderComponent key={fld.id} folder={fld} getFolders={openFolder} />
							))}
							{files.map((file) => (
								<FileComponent key={file.id} file={file} />
							))}
						</div>
					</DropWrapper>
				</div>
			</div>
		</>
	);
};

export default Disk;
