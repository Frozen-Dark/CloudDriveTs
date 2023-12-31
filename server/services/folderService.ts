import { Folder, FolderAttributes, FolderCreationAttributes } from "@models/models";
import { Model } from "sequelize";
import ApiError from "@error/ApiError";

export type DirType = Model<FolderAttributes, FolderCreationAttributes>;

type CreateDir = { userId: number; folderName: string; parentId: number | null; isReg?: boolean };

class FolderService {
	async getById({ userId, id }: { userId: number; id: number | null }) {
		if (id === null) {
			return this.getRootFolder({ userId });
		}

		if (!userId || !id) {
			throw ApiError.notFound("Некорректные данные для получения папки");
		}

		const folder = await Folder.findOne({ where: { userId, id } });
		if (!folder) {
			throw ApiError.notFound("Папка не найдена");
		}

		return folder;
	}

	async getRootFolder({ userId }: { userId: number }) {
		if (!userId) {
			throw ApiError.notFound("Некорректные данные для получения папки");
		}

		const folder = await Folder.findOne({ where: { userId, parentId: null } });
		if (!folder) {
			throw ApiError.notFound("Папка не найдена");
		}

		return folder;
	}

	async getFoldersByParentId({ userId, parentId }: { userId: number; parentId: number | null }) {
		if (!userId || !parentId) {
			throw ApiError.notFound("Некорректные данные для получения папок");
		}

		const folders = await Folder.findAll({ where: { userId, parentId } });
		if (!folders) {
			throw ApiError.notFound("Папки не найдены");
		}

		return folders;
	}
	async createDir(props: CreateDir) {
		const { userId, folderName, parentId } = props;

		const folder = await Folder.create({ userId, folderName, parentId });

		if (parentId === null) {
			return folder;
		}

		const parentFolder = await this.getById({ userId, id: parentId });

		if (!parentFolder) {
			await folder.destroy();
			throw ApiError.notFound("Родительская папка не найдена");
		}
		await this._saveNewFoldersId(folder.dataValues.id, parentFolder);

		return folder;
	}

	async _saveNewFoldersId(id: number, folder: DirType) {
		const { foldersId } = folder.dataValues;
		const folderWithNewChildren = foldersId ? [...foldersId, id] : [id];

		await folder.update({ foldersId: folderWithNewChildren });
	}

	async _saveNewFilesId(id: number, folder: DirType) {
		const { foldersId } = folder.dataValues;
		const folderWithNewChildren = foldersId ? [...foldersId, id] : [id];

		await folder.update({ foldersId: folderWithNewChildren });
	}

	async moveDir() {}

	async delete({ folderId, userId }: { folderId: number; userId: number }) {
		const folder = await this.getById({ id: folderId, userId });
		const { filesId, foldersId } = folder.dataValues;

		if (filesId || foldersId) {
			throw ApiError.badRequest("Родительская Папка не пуста");
		}

		await folder.destroy();
	}
}

export default new FolderService();
