import axios from "axios";
import User from "@store/User";
import { FolderAttributes } from "@app/providers/FolderProvider/lib/FolderContext";
import { FileAttributes } from "@app/providers/FileProvider/lib/FileContext";
const API_URL = "http://localhost:5000";

type GetFiles = {
	folders: FolderAttributes[] | [];
	files: FileAttributes[] | [];
	parentFolder: FolderAttributes;
};

type DeleteFile = { message: string };
type UploadFile = { file: FileAttributes };
type RenameFile = { file: FileAttributes };
type MoveFile = { message: string; file: FileAttributes };

axios.interceptors.request.use((config) => {
	const token = User.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const getFiles = async (parentId: number | null) => {
	try {
		return axios.post<GetFiles>(`${API_URL}/api/file/getFilesByFolderId`, { parentId });
	} catch (e) {
		console.log(e);
	}
};

export const deleteFile = async ({ fileId }: { fileId: number }) => {
	try {
		return axios.post<DeleteFile>(`${API_URL}/api/file/delete`, { fileId });
	} catch (e) {
		console.log(e);
	}
};

export const renameFile = async (fileName: string) => {
	try {
		return axios.put<RenameFile>(`${API_URL}/api/file/rename`, { fileName });
	} catch (e) {
		console.log(e);
	}
};

export const moveFile = async (props: { fileId: number; parentId: number | null }) => {
	try {
		return axios.put<MoveFile>(`${API_URL}/api/file/move`, props);
	} catch (e) {
		console.log(e);
	}
};

export const downloadFile = async () => {};

export const uploadFile = async (file: File, parentId: number) => {
	try {
		const formData = new FormData();
		formData.append("file", file, encodeURIComponent(file.name));
		formData.append("parentId", String(parentId));
		return axios.post<UploadFile>(`${API_URL}/api/file/upload`, formData, {
			onUploadProgress: (progressEvent) => {
				console.log(parentId, progressEvent);
			}
		});
	} catch (e) {
		console.log(e);
	}
};
