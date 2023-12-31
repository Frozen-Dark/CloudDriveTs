import axios, { AxiosResponse } from "axios";
import FileStore, { FileAttributes } from "@store/File";
import Folder, { FolderAttributes } from "@store/Folder";
import User from "@store/User";
import FolderNavigationStore from "@store/FolderNavigationStore";
const API_URL = "http://localhost:5000";

type GetFiles = {
	folders: FolderAttributes[] | [];
	files: FileAttributes[] | [];
	parentFolder: FolderAttributes;
};

axios.interceptors.request.use((config) => {
	const token = User.token;
	if (!token) {
		return config;
	}
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const getFiles = async (parentId: number | null): Promise<void> => {
	try {
		const response = await axios.post<GetFiles>(`${API_URL}/api/file/getFilesByParentId`, { parentId });
		if (response.status === 200) {
			const { folders, files, parentFolder } = response.data;
			FileStore.setFiles(files);
			Folder.setFolders(folders);
			Folder.setParentFolder(parentFolder);

			FolderNavigationStore.enterFolder(parentFolder);
		}
	} catch (e) {
		console.log(e);
	}
};

export const uploadFile = async (file: File, parentId: number): Promise<void> => {
	try {
		const formData = new FormData();
		formData.append("file", file, encodeURIComponent(file.name));
		formData.append("parentId", String(parentId));
		const response = await axios.post(`${API_URL}/api/file/uploadFile`, formData, {
			onUploadProgress: (progressEvent) => {
				console.log(parentId, progressEvent);
			}
		});
		if (response.status === 200) {
			await getFiles(parentId);
		}
	} catch (e) {
		console.log(e);
	}
};

type CreateFolder = AxiosResponse<{ folder: FolderAttributes }, any>;
export async function createFolder(props: { parentId: number; folderName: string }) {
	try {
		const response: CreateFolder = await axios.post(`${API_URL}/api/file/createDir`, props);
		if (response.status === 200) {
			Folder.addFolder(response.data.folder);
		}
	} catch (e) {
		console.log(e);
	}
}
