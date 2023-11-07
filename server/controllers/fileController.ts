import { Request, Response } from "express";
import { File, Folder, User } from "@models/models";
import UserDto from "@dto/UserDto";
import { UploadedFile } from "express-fileupload";
import userService from "@services/userService";
import fileService from "@services/fileService";
const path = require("path");

class FileController {
	async getFiles(req: Request, res: Response) {
		try {
			const user = req.user;

			const folders = await Folder.findAll({ where: { userId: user.id } });
			const files = await File.findAll({ where: { userId: user.id } });

			return res.json({ folders, files });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "getFiles error" });
		}
	}

	async move(req: Request, res: Response) {
		try {
			const { fileId, parentId } = req.body;
			const user = req.user;

			if (!fileId || !parentId) {
				return res.status(400).json({ message: "Необходимые параметры отсутствуют" });
			}

			const file = await File.findOne({ where: { id: fileId, userId: user.id } });
			if (!file) {
				return res.status(400).json({ message: "Файл не найден" });
			}

			const oldParentId = file.dataValues.parentId;

			await file.update({ parentId: parentId });

			const oldParentFolder = await Folder.findOne({ where: { id: oldParentId, userId: user.id } });
			if (!oldParentFolder) throw new Error("Родительская папка не найдена");

			const updatedChildrenOldParent = oldParentFolder.dataValues.children?.filter(
				(childId) => childId !== fileId
			);
			await oldParentFolder.update({ children: updatedChildrenOldParent });

			const newParentFolder = await Folder.findOne({ where: { id: parentId, userId: user.id } });
			if (!newParentFolder) throw new Error("Родительская папка не найдена");

			const updatedChildrenNewParent = [...(newParentFolder.dataValues.children || []), fileId];
			await newParentFolder.update({ children: updatedChildrenNewParent });

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
			if (!parentId || !user) {
				throw new Error("Непредвиденная ошибка");
			}

			const folders = await Folder.findAll({ where: { userId: user.id, parentId } });
			const files = await File.findAll({ where: { userId: user.id, parentId } });

			return res.json({ folders, files });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "getFiles error" });
		}
	}

	async testFile(req: Request, res: Response) {
		try {
			const parentId = req.body.parentId;
			if (!req.files?.file) {
				return res.status(400).json({ message: "Файл не был загружен" });
			}
			const file = req.files.file as UploadedFile;
			const { data, name: fileName, size, mimetype } = file;
			const extension = path.extname(fileName);

			const user = await User.findOne({ where: { id: req.user.id } });
			if (!user || !fileName || !parentId) {
				return res.status(400).json({ message: "Ошибка при загрузке файла" });
			}
			const userDto = new UserDto(user.dataValues);

			const parentFolder = await Folder.findOne({ where: { userId: userDto.id, id: parentId } });
			if (!parentFolder) {
				return res.status(400).json({ message: "Родительская папка не найдена" });
			}

			const fileData = { userId: userDto.id, fileName, parentId: Number(parentId), size, extension };

			return res.json({ file: fileData, mimetype });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "uploadFile error" });
		}
	}

	async rename(req: Request, res: Response) {
		try {
			const { fileId, fileName } = req.body;
			if (!fileId || !fileName) {
				return res.status(400).json({ message: "id или имя файла не найдены" });
			}

			const user = await User.findOne({ where: { id: req.user.id } });
			const file = await File.findOne({ where: { userId: req.user.id, id: fileId } });
			if (!file || !user) {
				return res.status(400).json({ message: "Файл или пользователь не найден" });
			}

			const updateValues: { fileName: string } = { fileName };
			await file.update(updateValues);

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

			const { id: userId } = (await userService.getUser({ id: req.user.id })).dataValues;
			const file = await fileService.getById(fileId, userId);

			const mino = req.minioClient;
			const bucketName = "bucket-" + userId;
			const filePath = String(file.dataValues.id);

			await Promise.all([await mino.removeObject(bucketName, filePath), await file.destroy()]);

			return res.json({ message: "Файл был удален", fileId: filePath, bucketName });
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
			const file = req.files.file;
			const { data, name: fileName, size } = file as UploadedFile;
			const extension = path.extname(fileName);

			const user = await userService.getUser({ id: req.user.id });
			if (!fileName) {
				return res.status(400).json({ message: "Ошибка при загрузке файла" });
			}
			const userDto = new UserDto(user.dataValues);

			const mino = req.minioClient;

			const parentFolder = await Folder.findOne({ where: { userId: userDto.id, id: parentId } });
			if (!parentFolder) {
				return res.status(400).json({ message: "Родительская папка не найдена" });
			}

			const fileModel = await File.create({
				userId: userDto.id,
				fileName,
				parentId: Number(parentId),
				size,
				extension
			});

			const bucketName = "bucket-" + userDto.id;

			const filePath = String(fileModel.dataValues.id);
			const status = await mino.putObject(bucketName, filePath, data);

			if (status.etag) {
				const { children } = parentFolder.dataValues;
				const childrenWithNewFolder = children
					? [...children, fileModel.dataValues.id]
					: [fileModel.dataValues.id];

				const updateValues: { children: number[] } = { children: childrenWithNewFolder };
				await parentFolder.update(updateValues);
			}

			return res.json({ etag: status.etag, versionId: status.versionId, file: fileModel });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "uploadFile error" });
		}
	}
}

export default new FileController();
