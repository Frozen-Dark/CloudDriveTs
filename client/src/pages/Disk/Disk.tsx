import classes from "./Disk.module.scss";
import FileComponent from "../../components/DiskComponents/File.tsx";
import FolderComponent from "../../components/DiskComponents/Folder.tsx";
import { useEffect, useState } from "react";
import { getFiles } from "../../actions/file.ts";
import { observer } from "mobx-react";
import Folder from "../../store/Folder.ts";
import File from "../../store/File.ts";
import DropWrapper from "../../components/DiskComponents/dndWrapper/dndWrapper.tsx";
const Disk = () => {
	const [addClasses, setAddClasses] = useState<string>("");
	useEffect(() => {
		const parentId = Number(localStorage.getItem("parentId")) || 1;
		getFiles(parentId).then();
	}, []);

	return (
		<div className={classes.disk}>
			<div className={classes.file__container + (addClasses ? ` ${addClasses}` : "")}>
				<DropWrapper setAddClasses={setAddClasses}>
					<div className={classes.header}>
						<div className={classes.myDisk} onClick={() => getFiles(1)}>
							{"Мой диск"}
						</div>
					</div>

					<div className={classes.files}>
						{File.files.map((file) => (
							<FileComponent key={file.id} file={file} />
						))}
						{Folder.folders.map((fld) => (
							<FolderComponent key={fld.id} folder={fld} />
						))}
					</div>
				</DropWrapper>
			</div>
		</div>
	);
};

export default observer(Disk);
