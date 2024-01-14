import { useState } from "react";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";

export const useFolderNavigation = () => {
	const [stack, dispatchStack] = useState<FolderAttributes[]>([]);
	const [rootFolder, setRootFolder] = useState<FolderAttributes>();

	const addFolder = (folder: FolderAttributes) => {
		dispatchStack([...stack, folder]);
	};

	const excludeRootFolder = (folders: FolderAttributes[]) => {
		return [...folders].filter((folder) => {
			if (folder.parentId) {
				return true;
			}
			setRootFolder({ ...folder, folderName: "Мой диск" });
			return false;
		});
	};

	const initNavigationFolders = (folders: FolderAttributes[]) => {
		console.log(folders);
		dispatchStack(excludeRootFolder(folders));
	};

	const deleteFolder = (folder: FolderAttributes) => {
		const index = stack.findIndex((stackFolder) => stackFolder.id === folder.id);

		dispatchStack(stack.slice(index, stack.length));
	};

	const clearNavigation = () => {
		dispatchStack([]);
	};

	return {
		stack,
		addFolder,
		deleteFolder,
		clearNavigation,
		initNavigationFolders
	};
};
