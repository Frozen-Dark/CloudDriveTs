import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";
import { createContext } from "react";

interface FolderNavigationType {
	stack: FolderAttributes[];
	rootFolder: FolderAttributes | null;
	clearNavigation: () => void;
	addFolder: (folder: FolderAttributes) => void;
	deleteFolder: (folder: FolderAttributes) => void;
	initNavigationFolders: (folders: FolderAttributes[]) => void;
}

export const FolderNavigation = createContext<FolderNavigationType>({
	stack: [],
	rootFolder: null,
	addFolder: () => {},
	deleteFolder: () => {},
	clearNavigation: () => {},
	initNavigationFolders: () => {}
});
