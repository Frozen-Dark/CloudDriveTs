import axios, { AxiosResponse } from "axios";
import User from "@store/User";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";
import { FileAttributes } from "@app/providers/FileProvider/lib/FileContext";
const API_URL = "http://localhost:5000";

type GetFiles = {
	folders: FolderAttributes[] | [];
	files: FileAttributes[] | [];
	parentFolder: FolderAttributes;
};

type CreateFolder = AxiosResponse<{ folder: FolderAttributes }>;

axios.interceptors.request.use((config) => {
	const token = User.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const getFiles = async (parentId: number | null) => {
	try {
		return axios.post<GetFiles>(`${API_URL}/api/file/getFilesByParentId`, { parentId });
	} catch (e) {
		console.log(e);
	}
};

export const deleteFile = async (fileId: number) => {
	try {
		return axios.post(`${API_URL}/api/file/deleteFile`, { fileId });
	} catch (e) {
		console.log(e);
	}
};

export const uploadFile = async (file: File, parentId: number) => {
	try {
		const formData = new FormData();
		formData.append("file", file, encodeURIComponent(file.name));
		formData.append("parentId", String(parentId));
		return axios.post<{ file: FileAttributes }>(`${API_URL}/api/file/uploadFile`, formData, {
			onUploadProgress: (progressEvent) => {
				console.log(parentId, progressEvent);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

export async function createFolder(props: { parentId: number | null; folderName: string }) {
	try {
		return axios.post<CreateFolder>(`${API_URL}/api/file/createDir`, props);
	} catch (e) {
		console.log(e);
	}
}
