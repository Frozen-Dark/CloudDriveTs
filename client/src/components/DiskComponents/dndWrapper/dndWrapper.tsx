import classes from "./dndWrapper.module.scss";
import { HTMLProps, DragEvent, useContext } from "react";
import { uploadFile } from "@actions/file";
import { FolderContext } from "@app/providers/FolderProvider/lib/FolderContext";
import { FileContext } from "@app/providers/FileProvider/lib/FileContext";

type DropWrapperType = {
	setAddClasses: (className: string) => void;
} & HTMLProps<HTMLDivElement>;
const DropWrapper = (props: DropWrapperType) => {
	const { children, setAddClasses } = props;
	const { parentFolder } = useContext(FolderContext);
	const { addFile } = useContext(FileContext);

	const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		setAddClasses(classes.test);
	};

	const fileUpload = async (files: FileList, parentId: number) => {
		if (files.length !== 0) {
			const filesArray = Array.from(files);

			for (const file of filesArray) {
				const response = await uploadFile(file, parentId);
				if (response?.status === 200) {
					addFile(response.data.file);
				}
			}
		}
	};

	const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		setAddClasses("");

		const files = e.dataTransfer.files;
		const folderId = parentFolder?.id;

		if (folderId) {
			await fileUpload(files, folderId);
		}
	};

	const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		if (e.currentTarget.contains(e.relatedTarget as Node)) {
			return;
		}
		setAddClasses("");
	};

	const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		setAddClasses("");
	};

	const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div
			onDragEnd={dragEndHandler}
			onDragEnter={dragEnterHandler}
			onDragOver={dragOverHandler}
			onDrop={dropHandler}
			onDragLeave={dragLeaveHandler}
			className={classes.dropWrapper}
		>
			{children}
		</div>
	);
};

export default DropWrapper;
