import axios from "axios";
import FileStore, { FileAttributes } from "../store/File.ts";
import Folder, { FolderAttributes } from "../store/Folder.ts";
import User from "../store/User.ts";
const API_URL = "http://localhost:5000";

type GetFiles = {
	folders: FolderAttributes[] | [];
	files: FileAttributes[] | [];
};

axios.interceptors.request.use((config) => {
	const token = User.token;
	if (!token) {
		return config;
	}
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const getFiles = async (parentId: number): Promise<void> => {
	try {
		const response = await axios.post<GetFiles>(`${API_URL}/api/file/getFilesByParentId`, { parentId });
		if (response.status === 200) {
			const { folders, files } = response.data;

			FileStore.files = files;
			Folder.folders = folders;
			Folder.parentId = parentId;
		}
	} catch (e) {
		console.log(e);
	}
};

export const uploadFile = async (file: File, parentId: number): Promise<void> => {
	try {
		const formData = new FormData();
		formData.append("file", file);
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
