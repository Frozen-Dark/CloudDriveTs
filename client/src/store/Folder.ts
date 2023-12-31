import { action, makeAutoObservable, observable } from "mobx";

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

class Folder {
	@observable private _parentFolder: FolderAttributes | null;
	@observable private _folders: FolderAttributes[] | [];
	constructor() {
		this._folders = [];
		this._parentFolder = null;
	}

	@action setParentFolder(folder: FolderAttributes | null) {
		this._parentFolder = folder;
	}
	get parentFolder(): FolderAttributes | null {
		return this._parentFolder || null;
	}

	get parentId(): number | null {
		return this._parentFolder?.parentId || null;
	}

	@action setFolders(folders: FolderAttributes[]) {
		this._folders = folders;
	}
	@action addFolder(folder: FolderAttributes) {
		this.setFolders([...this.folders, folder]);
	}

	get folders(): FolderAttributes[] | [] {
		return this._folders;
	}

	@action clearFolders() {
		this._folders = [];
		this._parentFolder = null;
	}
}

export default new Folder();
