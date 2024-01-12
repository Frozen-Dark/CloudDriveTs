import { File } from "@models/models";
import FolderService from "@services/folderService";
import { Client } from "minio";
import MinoService from "@services/minoService";
import { UploadedFile } from "express-fileupload";
import path from "path";
import UserService from "@services/userService";
import ApiError from "@error/ApiError";
import userService from "@services/userService";
import { Readable as ReadableStream } from "node:stream";

class FileService {
	async getById({ userId, id }: { userId: number; id: number }) {
		if (!userId || !id) {
			throw ApiError.notFound("Некорректные данные для получения файла");
		}

		const file = await File.findOne({ where: { userId, id } });
		if (!file) {
			throw ApiError.notFound("Файл не найден");
		}

		return file;
	}

	async getFilesByParentId({ userId, parentId }: { userId: number; parentId: number }) {
		if (!userId || !parentId) {
			throw ApiError.badRequest("Некорректные данные для получения файла");
		}

		const files = await File.findAll({ where: { userId, parentId } });
		if (!files) {
			throw ApiError.notFound("Файлы не найдены");
		}

		return files;
	}

	async rename({ userId, fileId, fileName }: { userId: number; fileId: number; fileName: string }) {
		const file = await this.getById({ userId, id: fileId });
		await file.update({ fileName });

		return file;
	}

	async move({ userId, fileId, parentId }: { userId: number; fileId: number; parentId: number }) {
		const file = await this.getById({ id: fileId, userId });

		const oldParentFolder = await FolderService.getById({ id: file.dataValues.parentId, userId });
		const newParentFolder = await FolderService.getById({ id: parentId, userId });

		const filesIdWithoutFileId = oldParentFolder.dataValues.filesId?.filter((childId) => childId !== fileId);
		const filesIdWithNewFileId = [...(newParentFolder.dataValues.filesId || []), fileId];

		await Promise.all([
			await file.update({ parentId }),
			await oldParentFolder.update({ filesId: filesIdWithoutFileId }),
			await newParentFolder.update({ filesId: filesIdWithNewFileId })
		]);

		return file;
	}

	async delete({ userId, fileId, mino }: { userId: number; fileId: number; mino: Client }) {
		const file = await this.getById({ id: fileId, userId });

		await Promise.all([
			await MinoService.deleteFile({ userId, fileId: file.dataValues.id, mino }),
			await UserService.clearSpace({ userId, fileSize: file.dataValues.size }),
			await file.destroy()
		]);
	}

	async upload(props: { uploadFile: UploadedFile; mino: Client; userId: number; parentId: number }) {
		const { uploadFile, mino, userId, parentId } = props;
		const { data, name, size } = uploadFile;
		const fileName = decodeURIComponent(name);
		const extension = path.extname(fileName);

		if (!fileName) {
			throw ApiError.badRequest("Некорректное имя файла");
		}

		const parentFolder = await FolderService.getById({ userId, id: parentId });

		const file = await File.create({
			userId,
			fileName,
			parentId,
			size,
			extension
		});

		await MinoService.uploadFile({ parentFolder, fileId: file.dataValues.id, mino, userId, data });

		return file;
	}

	async download(props: { mino: Client; userId: number; fileId: number }) {
		const { mino, userId, fileId } = props;
		const file = await this.getById({ id: fileId, userId });

		const fileStream = await MinoService.downloadFile({ fileId: file.dataValues.id, userId, mino });

		return { fileStream, fileName: file.dataValues.fileName };
	}
}

export default new FileService();
