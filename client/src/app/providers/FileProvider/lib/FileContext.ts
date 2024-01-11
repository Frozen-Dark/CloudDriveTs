import { createContext } from "react";

export type SortType = (a: FileAttributes, b: FileAttributes) => number;

export const sortByName: SortType = (a, b) => a?.["fileName"].localeCompare(b?.["fileName"]);

export interface FileAttributes {
	id: number;
	userId: number;
	fileName: string;
	size: number;
	extension: string;
	parentId: number;
	createdAt: string;
	updatedAt: string;
	hasLink?: boolean;
}

interface FileContextType {
	files: FileAttributes[];
	setFiles: (files: FileAttributes[]) => void;
	clearFiles: () => void;
	deleteFile: (file: FileAttributes) => void;
	addFile: (file: FileAttributes) => void;
	setSortFunction: (sortFunction: SortType) => void;
}

export const FileContext = createContext<FileContextType>({
	files: [],
	addFile: () => {},
	setFiles: () => {},
	clearFiles: () => {},
	deleteFile: () => {},
	setSortFunction: () => {}
});
