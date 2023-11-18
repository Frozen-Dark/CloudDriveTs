import { Folder, FolderAttributes, FolderCreationAttributes } from "@models/models";
import { Model } from "sequelize";
import userService from "@services/userService";

export type DirType = Model<FolderAttributes, FolderCreationAttributes>;

type CreateDir = { userId: number; folderName: string; parentId: number | null; isReg?: boolean };

class FolderService {
	async getById({ userId, id }: { userId: number; id: number | null }) {
		if (!userId || !id) {
			throw new Error("Некорректные данные для получения папки");
		}

		const folder = await Folder.findOne({ where: { userId, id } });
		if (!folder) {
			throw new Error("Папка не найдена");
		}

		return folder;
	}
	async getFoldersByParentId({ userId, parentId }: { userId: number; parentId: number }) {
		if (!userId || !parentId) {
			throw new Error("Некорректные данные для получения папок");
		}

		const folders = await Folder.findAll({ where: { userId, parentId } });
		if (!folders) {
			throw new Error("Папки не найдены");
		}

		return folders;
	}
	async createDir(props: CreateDir) {
		const { userId, folderName, parentId, isReg = false } = props;

		const folder = await Folder.create({ userId, folderName, parentId });
		if (isReg) {
			return folder;
		}

		const parentFolder = await this.getById({ userId, id: parentId });
		if (!parentFolder) {
			await folder.destroy();
			throw new Error("Родительская папка не найдена");
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

		if (filesId || foldersId) throw new Error("Папка не пуста");

		await folder.destroy();
	}
}

export default new FolderService();
