import cls from "./Disk.module.scss";
import FileComponent from "@components/DiskComponents/File";
import FolderComponent from "@components/DiskComponents/Folder";
import { useEffect, useState } from "react";
import { getFiles } from "@actions/file";
import { observer } from "mobx-react";
import Folder from "@store/Folder";
import File from "@store/File";
import DropWrapper from "@components/DiskComponents/dndWrapper/dndWrapper";
import Header from "@components/Header/Header";
import CreateFolder from "@components/CreateFolder/CreateFolder";
import { classNames } from "@lib/classNames/classNames";
import FolderNavigationStore from "@store/FolderNavigationStore";
import { useLocation, useNavigate } from "react-router-dom";
import { autorun } from "mobx";
const Disk = () => {
	const navigation = useNavigate();
	const location = useLocation();

	const [addClasses, setAddClasses] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const parentId = Number(localStorage.getItem("parentId")) || null;

		FolderNavigationStore.setNavigate(navigation);

		FolderNavigationStore.restoreFromURL(location.pathname);

		const lastParentIdFromUrl =
			FolderNavigationStore.currentPath[FolderNavigationStore.currentPath.length - 1].parentId;
		// const disposer = autorun(() => {
		// 	FolderNavigationStore.updateURL();
		// });
		//
		// return () => disposer();

		getFiles(lastParentIdFromUrl || parentId);
	}, []);

	// useEffect(() => {
	// 	const parentId = Number(localStorage.getItem("parentId")) || null;
	// 	getFiles(parentId);
	// }, []);

	return (
		<>
			<Header />
			<div className={cls.disk}>
				<div className={classNames(cls.file__container, { addClasses: !!addClasses })}>
					<DropWrapper setAddClasses={setAddClasses}>
						<div className={cls.header}>
							<div className={cls.myDisk} onClick={() => getFiles(null)}>
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
							{Folder.folders.map((fld) => (
								<FolderComponent key={fld.parentId} folder={fld} />
							))}
							{File.files.map((file) => (
								<FileComponent key={file.id} file={file} />
							))}
						</div>
					</DropWrapper>
				</div>
			</div>
		</>
	);
};

export default observer(Disk);
