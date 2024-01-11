import axios from "axios";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";
import User from "@store/User";
const API_URL = "http://localhost:5000";

type CreateFolder = { folder: FolderAttributes };
type RenameFolder = { folder: FolderAttributes };
type DeleteFolder = { message: string };
type MoveFolder = { message: string; folder: FolderAttributes };

axios.interceptors.request.use((config) => {
	const token = User.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export async function createFolder(props: { parentId: number | null; folderName: string }) {
	try {
		return axios.post<CreateFolder>(`${API_URL}/api/folder/create`, props);
	} catch (e) {
		console.log(e);
	}
}

export async function renameFolder(props: { folderId: number | null; folderName: string }) {
	try {
		return axios.put<RenameFolder>(`${API_URL}/api/folder/rename`, props);
	} catch (e) {
		console.log(e);
	}
}

export async function deleteFolder(props: { folderId: number }) {
	try {
		return axios.post<DeleteFolder>(`${API_URL}/api/folder/delete`, props);
	} catch (e) {
		console.log(e);
	}
}

// export async function moveFolder(props: { folderId: number }) {
// 	try {
// 		return axios.put<MoveFolder>(`${API_URL}/api/folder/move`, props);
// 	} catch (e) {
// 		console.log(e);
// 	}
// }
