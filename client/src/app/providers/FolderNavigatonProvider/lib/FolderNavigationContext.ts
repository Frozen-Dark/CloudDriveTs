import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";
import { createContext } from "react";

interface FolderNavigationStackType {
	stack: FolderAttributes[];
}
interface FolderNavigationFunctionsType {
	clearNavigation: () => void;
	addFolder: (folder: FolderAttributes) => void;
	deleteFolder: (folder: FolderAttributes) => void;
	initNavigationFolders: (folders: FolderAttributes[]) => void;
}

export const FolderNavigationStack = createContext<FolderNavigationStackType>({
	stack: []
});

export const FolderNavigationFunctions = createContext<FolderNavigationFunctionsType>({
	addFolder: () => {},
	deleteFolder: () => {},
	clearNavigation: () => {},
	initNavigationFolders: () => {}
});
