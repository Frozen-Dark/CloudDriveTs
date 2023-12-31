import { action, makeObservable, observable } from "mobx";

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

class File {
	@observable private _files: FileAttributes[] | [];

	constructor() {
		makeObservable(this);
		this._files = [];
	}

	@action setFiles(files: FileAttributes[] | []) {
		this._files = files;
	}

	get files(): FileAttributes[] | [] {
		return this._files;
	}

	@action clearFiles() {
		this._files = [];
	}
}

export default new File();
