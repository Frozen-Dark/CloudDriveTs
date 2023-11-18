import { Request, Response } from "express";
import FolderService from "@services/folderService";
import fileService from "@services/fileService";

class folderController {
	async create(req: Request, res: Response) {
		try {
			const folderName = req.body.folderName;
			const parentId = req.body.parentId;
			if (!parentId || !folderName) {
				return res.status(400).json({ message: "id или имя папки не найдены" });
			}

			const folder = await FolderService.createDir({ userId: req.user.id, folderName, parentId });

			return res.json({ folder: folder });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "createDir error" });
		}
	}

	async rename(req: Request, res: Response) {
		try {
			const { folderId, folderName } = req.body;
			if (!folderId || !folderName) {
				return res.status(400).json({ message: "id или имя папки не найдены" });
			}

			const folder = await FolderService.getById({ userId: req.user.id, id: folderId });
			await folder.update({ folderName });

			return res.json({ folder });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "renameFile error" });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { folderId } = req.body;
			if (!folderId) {
				return res.status(400).json({ message: "Id папки не указан" });
			}

			await FolderService.delete({ folderId, userId: req.user.id });

			return res.json({ message: "Папка была удалена" });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "Ошибка удаления папки" });
		}
	}

	async move(req: Request, res: Response) {
		try {
			const { folderId } = req.body;
			if (!folderId) {
				return res.status(400).json({ message: "Id папки не указан" });
			}

			const folder = await FolderService.getById({ id: folderId, userId: req.user.id });

			return res.json({ message: "Папка была перемещена", folder });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "Ошибка удаления папки" });
		}
	}
}

export default new folderController();
