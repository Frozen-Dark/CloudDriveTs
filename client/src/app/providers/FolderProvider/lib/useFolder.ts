import { useState } from "react";
import { FolderAttributes, sortByName, SortType } from "./FolderContext";

export const useFolder = () => {
	const [folders, dispatchFolders] = useState<FolderAttributes[]>([]);
	const [parentFolder, setParentFolder] = useState<FolderAttributes | null>(null);
	const [sortFunction, setSortFunction] = useState<SortType>(sortByName);

	const clearFolders = () => {
		dispatchFolders([]);
		setParentFolder(null);
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
