import { Folder, FolderAttributes, FolderCreationAttributes } from "@models/models";
import { Model } from "sequelize";

export type DirType = Model<FolderAttributes, FolderCreationAttributes>;

type CreateDir = { userId: number; folderName: string; parentId?: number; isReg?: boolean };

class FolderService {
	async createDir(props: CreateDir) {
		const { userId, folderName, parentId, isReg = false } = props;

		const folder = await Folder.create({ userId, folderName, parentId });
		if (isReg) {
			return folder;
		}

		const parentFolder = await Folder.findOne({ where: { userId, id: parentId } });
		if (!parentFolder) {
			await folder.destroy();
			throw new Error("Родительская папка не найдена");
		}
		await this._saveNewId(folder.dataValues.id, parentFolder);

		return folder;
	}

	async _saveNewId(id: number, parent: DirType) {
		const { children } = parent.dataValues;
		const childrenWithNewFolder = children ? [...children, id] : [id];

		const updateValues: { children: number[] } = { children: childrenWithNewFolder };
		await parent.update(updateValues);
	}

	async moveDir() {}

	async deleteDir() {}
}

export default new FolderService();
