import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import FileService from "@services/fileService";
import FolderService from "@services/folderService";
import ApiError from "../error/ApiError";

class FileController {
	async move(req: Request, res: Response, next: NextFunction) {
		try {
			const { fileId, parentId } = req.body;
			const user = req.user;

			if (!fileId || !parentId) {
				return next(ApiError.badRequest("id файла или папки не найдены"));
			}

			await FileService.move({ userId: user.id, parentId, fileId });

			return res.json({ message: "Файл успешно перемещен" });
		} catch (e) {
			next(e);
		}
	}

	async getFilesByParentId(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user.id;
			let { parentId } = req.body;

			if (parentId === undefined) {
				return next(ApiError.badRequest("Не указан id"));
			}

			const parentFolder =
				parentId === null
					? await FolderService.getRootFolder({ userId })
					: await FolderService.getById({ userId, id: parentId });

			parentId = parentId === null ? parentFolder.dataValues.id : parentId;

			const folders = await FolderService.getFoldersByParentId({ userId, parentId });
			const files = await FileService.getFilesByParentId({ userId, parentId });

			return res.json({ folders, files, parentFolder });
		} catch (e) {
			next(e);
		}
	}

	async rename(req: Request, res: Response, next: NextFunction) {
		try {
			const { fileId, fileName } = req.body;
			const userId = req.user.id;

			if (!fileId || !fileName) {
				return next(ApiError.badRequest("id или имя файла не указан"));
			}

			const file = await FileService.rename({ fileId, fileName, userId });

			return res.json({ file });
		} catch (e) {
			next(e);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { fileId } = req.body;
			if (!fileId) {
				return next(ApiError.badRequest("id файла не указано"));
			}

			await FileService.delete({ userId: req.user.id, fileId, mino: req.minioClient });

			return res.json({ message: "Файл был удален" });
		} catch (e) {
			next(e);
		}
	}

	async upload(req: Request, res: Response, next: NextFunction) {
		try {
			const parentId = req.body.parentId;
			if (!req.files?.file) {
				return next(ApiError.badRequest("Файл не был загружен"));
			}
			const uploadFile = req.files.file as UploadedFile;

			const file = await FileService.upload({ uploadFile, mino: req.minioClient, userId: req.user.id, parentId });

			return res.json({ file });
		} catch (e) {
			next(e);
		}
	}
}

export default new FileController();
