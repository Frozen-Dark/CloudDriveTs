import classes from "./dndWrapper.module.scss";
import { HTMLProps, DragEvent } from "react";
import { uploadFile } from "@actions/file";
import Folder from "@store/Folder";

type DropWrapperType = {
	setAddClasses: (className: string) => void;
} & HTMLProps<HTMLDivElement>;
const DropWrapper = (props: DropWrapperType) => {
	const { children, setAddClasses } = props;

	const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		setAddClasses(classes.test);
	};

	const fileUpload = async (files: FileList, parentId: number) => {
		if (files.length !== 0) {
			const filesArray = Array.from(files);

			for (const file of filesArray) {
				await uploadFile(file, parentId);
			}
		}
	};

	const dropHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		setAddClasses("");

		const files = e.dataTransfer.files;
		const folderId = Folder.parentId;

		if (folderId) {
			fileUpload(files, folderId);
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
