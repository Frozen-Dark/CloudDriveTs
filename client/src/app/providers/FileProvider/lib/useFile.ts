import { useState } from "react";
import { FileAttributes, sortByName, SortType } from "./FileContext";

export const useFile = () => {
	const [files, dispatchFiles] = useState<FileAttributes[]>([]);
	const [sortFunction, setSortFunction] = useState<SortType>(sortByName);

	const sort = (files: FileAttributes[]) => {
		return [...files].sort(sortFunction);
	};

	const setFiles = (files: FileAttributes[]) => {
		dispatchFiles(sort(files));
	};

	const clearFiles = () => {
		dispatchFiles([]);
	};
	const addFile = (file: FileAttributes) => {
		setFiles([...files, file]);
	};

	const deleteFile = (rmFile: FileAttributes) => {
		setFiles(files.filter((file) => file.id !== rmFile.id));
	};

	return {
		files,
		setFiles,
		clearFiles,
		addFile,
		deleteFile,
		setSortFunction
	};
};
