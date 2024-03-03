import { useState } from "react";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";

export const useFolderNavigation = () => {
	const [stack, dispatchStack] = useState<FolderAttributes[]>([]);
	const [rootFolder, setRootFolderState] = useState<FolderAttributes | null>(null);

	const addFolder = (newFolder: FolderAttributes) => {
		if (!newFolder.parentId) {
			clearNavigation();
			return;
		}

		if (stack.some((folder) => folder.id === newFolder.id)) {
			deleteFolder(newFolder);
		} else {
			dispatchStack([...stack, newFolder]);
		}
	};

	const excludeRootFolder = (folders: FolderAttributes[]) => {
		return [...folders].filter((folder) => {
			if (folder.parentId) {
				return true;
			}
			setRootFolder(folder);
			return false;
		});
	};

	const setRootFolder = (folder: FolderAttributes) => {
		setRootFolderState({ ...folder, folderName: "Мой диск" });
	};

	const initNavigationFolders = (folders: FolderAttributes[]) => {
		dispatchStack(excludeRootFolder(folders));
	};

	const deleteFolder = (folder: FolderAttributes) => {
		const index = stack.findIndex((stackFolder) => stackFolder.id === folder.id);

		dispatchStack(stack.splice(0, index + 1));
	};

	const clearNavigation = () => {
		dispatchStack([]);
	};

	return {
		stack,
		rootFolder,
		addFolder,
		deleteFolder,
		setRootFolder,
		clearNavigation,
		initNavigationFolders
	};
};
