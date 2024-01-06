import { makeAutoObservable } from "mobx";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";

type FolderPath = {
	name: string;
	parentId: number | null;
};
class FolderNavigationStore {
	currentPath: FolderPath[] = [{ name: "Мой диск", parentId: null }];
	navigate?: (path: string) => void;

	constructor() {
		makeAutoObservable(this);
	}

	enterFolder(folder: FolderAttributes) {
		if (folder.parentId !== null || this.currentPath.length === 1) {
			this.currentPath.push({ name: folder.folderName, parentId: folder.parentId });
			this.updateURL();
		}
	}

	setNavigate(navigateFunction: (path: string) => void) {
		this.navigate = navigateFunction;
	}

	goToFolder(folderName: string) {
		const folderIndex = this.currentPath.findIndex((f) => f.name === folderName);
		if (folderIndex >= 0) {
			this.currentPath = this.currentPath.slice(0, folderIndex + 1);
			this.updateURL();
		}
	}

	goBack() {
		if (this.currentPath.length > 1) {
			this.currentPath.pop();
			this.updateURL();
		}
	}

	updateURL() {
		const pathString = this.currentPath
			.slice(1)
			.map((f) => `${encodeURIComponent(f.name)}&${f.parentId}`)
			.join("/");

		if (this.navigate) {
			console.log("pathString", pathString);
			this.navigate(`/disk/${pathString}`);
		}
	}

	restoreFromURL(urlPath: string) {
		const pathSegments = urlPath.split("/").filter(Boolean);
		this.currentPath = [
			{ name: "Мой диск", parentId: null },
			...pathSegments.map((segment) => {
				const [folderName, idString] = segment.split("&").map(decodeURIComponent);
				return { name: folderName, parentId: idString ? parseInt(idString, 10) : null };
			})
		];
	}

	getPath(): FolderPath[] {
		return this.currentPath;
	}
}

export default new FolderNavigationStore();
