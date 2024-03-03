import { useState } from "react";
import { FolderAttributes, sortByName, SortType } from "./FolderContext";
import FolderCore from "@app/providers/FolderProvider/lib/FolderCore";

export const useFolder = () => {
	const [folders, dispatchFolders] = useState<FolderAttributes[]>([]);
	const [parentFolder, setParentFolderState] = useState<FolderAttributes | null>(null);
	const [sortFunction, setSortFunction] = useState<SortType>(sortByName);

	const clearFolders = () => {
		dispatchFolders([]);
		setParentFolder(null);
	};

	const setParentFolder = (folder: FolderAttributes | null) => {
		if (!folder) {
			FolderCore.setParentId(null);
			return setParentFolderState(null);
		}
		FolderCore.setParentId(folder.parentId);
		setParentFolderState(folder);
	};

	const sort = (folders: FolderAttributes[]) => {
		return [...folders].sort(sortFunction);
	};

	const setFolders = (folders: FolderAttributes[]) => {
		dispatchFolders(sort(folders));
	};

	const addFolder = (folder: FolderAttributes) => {
		setFolders([...folders, folder]);
	};

	const deleteFolder = (rmFolder: FolderAttributes) => {
		setFolders(folders.filter((folder) => folder.id !== rmFolder.id));
	};

	return {
		folders,
		parentFolder,
		setFolders,
		clearFolders,
		setParentFolder,
		addFolder,
		deleteFolder,
		setSortFunction
	};
};
