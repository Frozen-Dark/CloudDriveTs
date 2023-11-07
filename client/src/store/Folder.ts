import { makeAutoObservable } from "mobx";

export interface FolderAttributes {
	id: number;
	userId: number;
	folderName: string;
	parentId?: number;
	hasLink?: boolean;
	children?: Array<number>;
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
	get parentId(): number | undefined {
		return this._parentId;
	}

	set folders(folders: FolderAttributes[] | []) {
		this._folders = folders;
	}

	get folders(): FolderAttributes[] | [] | undefined {
		return this._folders;
	}
}

export default new Folder();
