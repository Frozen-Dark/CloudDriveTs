import { createContext } from "react";

export type SortType = (a: FolderAttributes, b: FolderAttributes) => number;

export interface FolderAttributes {
	id: number;
	userId: number;
	folderName: string;
	parentId: number | null;
	foldersId?: Array<number>;
	filesId?: Array<number>;
	hasLink?: boolean;
	createdAt: string;
	updatedAt: string;
}

export const sortByName: SortType = (a, b) => a?.["folderName"].localeCompare(b?.["folderName"]);

interface FolderContextType {
	folders: FolderAttributes[];
	parentFolder: FolderAttributes | null;
	setFolders: (folders: FolderAttributes[]) => void;
	clearFolders: () => void;
	setParentFolder: (folder: FolderAttributes | null) => void;
	setSortFunction: (sortFunction: SortType) => void;
}

export const FolderContext = createContext<FolderContextType>({
	folders: [],
	parentFolder: null,
	setFolders: () => {},
	clearFolders: () => {},
	setParentFolder: () => {},
	setSortFunction: () => {}
});
