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
		config.headers.Authorization = "Bearer " + token;
	}
	return config;
});

export const getFiles = async (parentId: number | null) => {
	try {
		const response = await axios.post<GetFiles>(`${API_URL}/api/file/getFilesByFolderId`, { parentId });
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const deleteFile = async ({ fileId }: { fileId: number }) => {
	try {
		const response = await axios.post<DeleteFile>(`${API_URL}/api/file/delete`, { fileId });
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const renameFile = async (fileName: string) => {
	try {
		const response = await axios.put<RenameFile>(`${API_URL}/api/file/rename`, { fileName });
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const moveFile = async (props: { fileId: number; parentId: number | null }) => {
	try {
		const response = await axios.put<MoveFile>(`${API_URL}/api/file/move`, props);
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const downloadFile = async ({ file }: { file: FileAttributes }) => {
	try {
		const { id: fileId, fileName } = file;
		const response = await axios.post(`${API_URL}/api/file/download`, { fileId }, { responseType: "blob" });

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;

		link.setAttribute("download", fileName);

		document.body.appendChild(link);
		link.click();

		link.parentNode?.removeChild(link);
		window.URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Ошибка при загрузке файла:", error);
	}
};

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
