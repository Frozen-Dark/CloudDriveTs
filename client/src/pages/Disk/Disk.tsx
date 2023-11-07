import classes from "./Disk.module.scss";
import FileComponent from "../../components/File/File.tsx";
import FolderComponent from "../../components/Folder/Folder.tsx";
import { ChangeEvent, useEffect } from "react";
import { getFiles, uploadFile } from "../../actions/file.ts";
import { observer } from "mobx-react";
import Folder from "../../store/Folder.ts";
import File from "../../store/File.ts";
const Disk = () => {
	useEffect(() => {
		const parentId = Number(localStorage.getItem("parentId")) || 1;
		getFiles(parentId).then();
	}, []);

	// async function fileUploadHandler(event: ChangeEvent<HTMLInputElement>) {
	// 	if (event.target.files) {
	// 		const files = [...event.target.files];
	// 		const dirId = Folder.parentId!;
	// 		while (files.length > 0) {
	// 			const file = files.pop()!;
	// 			await uploadFile(file, dirId);
	// 		}
	// 	}
	// }

	return (
		<div className={classes.disk}>
			{/*<input*/}
			{/*	multiple={true}*/}
			{/*	onChange={(e) => fileUploadHandler(e)}*/}
			{/*	type="file"*/}
			{/*	id="uploadInput"*/}
			{/*	className={classes.uploadInput}*/}
			{/*/>*/}

			<div className={classes.container}>
				{File.files && File.files.map((file) => <FileComponent key={file.id} file={file} />)}
				{Folder.folders && Folder.folders.map((folder) => <FolderComponent key={folder.id} folder={folder} />)}
			</div>
		</div>
	);
};

export default observer(Disk);
