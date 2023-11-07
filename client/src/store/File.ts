import { makeAutoObservable } from "mobx";

export interface FileAttributes {
	id: number;
	userId: number;
	fileName: string;
	size: number;
	extension: string;
	parentId: number;
	hasLink?: boolean;
}

class File {
	private _files?: FileAttributes[] | [];
	constructor() {
		makeAutoObservable(this);
	}

	set files(files: FileAttributes[] | []) {
		this._files = files;
	}

	get files(): FileAttributes[] | [] | undefined {
		return this._files;
	}
}

export default new File();
