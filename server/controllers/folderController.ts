import { NextFunction, Request, Response } from "express";
import FolderService from "@services/folderService";
import ApiError from "@error/ApiError";

class folderController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const folderName = req.body.folderName;
			const parentId = req.body.parentId;
			if (!parentId || !folderName) {
				return next(ApiError.notFound("id или имя папки не указан"));
			}

			const folder = await FolderService.createDir({ userId: req.user.id, folderName, parentId });

			return res.json({ folder });
		} catch (e) {
			next(e);
		}
	}

	async rename(req: Request, res: Response, next: NextFunction) {
		try {
			const { folderId, folderName } = req.body;
			if (!folderId || !folderName) {
				return next(ApiError.notFound("id или имя папки не указан"));
			}

			const folder = await FolderService.getById({ userId: req.user.id, id: folderId });
			await folder.update({ folderName });

			return res.json({ folder });
		} catch (e) {
			next(e);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { folderId } = req.body;
			if (!folderId) {
				return next(ApiError.notFound("id папки не указан"));
			}

			await FolderService.delete({ folderId, userId: req.user.id });

			return res.json({ message: "Папка была удалена" });
		} catch (e) {
			next(e);
		}
	}

	async move(req: Request, res: Response, next: NextFunction) {
		try {
			const { folderId } = req.body;
			if (!folderId) {
				return next(ApiError.notFound("id папки не указан"));
			}

			const folder = await FolderService.getById({ id: folderId, userId: req.user.id });

			return res.json({ message: "Папка была перемещена", folder });
		} catch (e) {
			next(e);
		}
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new folderController();
