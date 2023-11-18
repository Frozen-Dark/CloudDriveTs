import { makeAutoObservable } from "mobx";

export interface FolderAttributes {
	id: number;
	userId: number;
	folderName: string;
	parentId?: number;
	hasLink?: boolean;
	children?: Array<number>;
	createdAt: string;
	updatedAt: string;
}
class Folder {
	private _folders?: FolderAttributes[] | [];
	private _parentId?: number;
	constructor() {
		makeAutoObservable(this);
	}

	set parentId(id: number) {
		this._parentId = id;
	}
	get parentId(): number {
		return this._parentId || 1;
	}

	set folders(folders: FolderAttributes[] | []) {
		this._folders = folders;
	}

	get folders(): FolderAttributes[] | [] {
		return this._folders || [];
	}
}

export default new Folder();
