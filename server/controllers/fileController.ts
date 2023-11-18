import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import FileService from "@services/fileService";
import FolderService from "@services/folderService";

class FileController {
	async move(req: Request, res: Response) {
		try {
			const { fileId, parentId } = req.body;
			const user = req.user;

			if (!fileId || !parentId) {
				return res.status(400).json({ message: "Необходимые параметры отсутствуют" });
			}

			await FileService.move({ userId: user.id, parentId, fileId });

			return res.json({ message: "Файл успешно перемещен" });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "Ошибка при перемещении файла" });
		}
	}

	async getFilesByParentId(req: Request, res: Response) {
		try {
			const user = req.user;
			const parentId = req.body.parentId;

			const folders = await FolderService.getFoldersByParentId({ userId: user.id, parentId });
			const files = await FileService.getFilesByParentId({ userId: user.id, parentId });

			return res.json({ folders, files });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "getFiles error" });
		}
	}

	async rename(req: Request, res: Response) {
		try {
			const { fileId, fileName } = req.body;
			const userId = req.user.id;

			if (!fileId || !fileName) {
				return res.status(400).json({ message: "id или имя файла не найдены" });
			}

			const file = await FileService.rename({ fileId, fileName, userId });

			return res.json({ file });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "renameFile error" });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { fileId } = req.body;
			if (!fileId) {
				return res.status(400).json({ message: "Имя файла не указано" });
			}

			await FileService.delete({ userId: req.user.id, fileId, mino: req.minioClient });

			return res.json({ message: "Файл был удален" });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "deleteFile error" });
		}
	}

	async upload(req: Request, res: Response) {
		try {
			const parentId = req.body.parentId;
			if (!req.files?.file) {
				return res.status(400).json({ message: "Файл не был загружен" });
			}
			const uploadFile = req.files.file as UploadedFile;

			const file = await FileService.upload({ uploadFile, mino: req.minioClient, userId: req.user.id, parentId });

			return res.json({ file });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "uploadFile error" });
		}
	}
}

export default new FileController();
