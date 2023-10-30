import { Request, Response } from "express";
import { Folder, FolderAttributes, FolderCreationAttributes, User } from "@models/models";
import UserDto from "@dto/UserDto";
import { Model } from "sequelize";
type DirType = Model<FolderAttributes, FolderCreationAttributes>;

class folderController {
	async _saveNewId(id: number, parent: DirType) {
		const { children } = parent.dataValues;
		const childrenWithNewFolder = children ? [...children, id] : [id];

		const updateValues: { children: number[] } = { children: childrenWithNewFolder };
		await parent.update(updateValues);
	}
	async create(req: Request, res: Response) {
		try {
			const user = await User.findOne({ where: { id: req.user.id } });

			const folderName = req.body.folderName;
			const parentId = req.body.parentId;
			if (!user || !folderName || !parentId) throw new Error("Ошибка при создании папки");

			const userDto = new UserDto(user.dataValues);

			const parentFolder = await Folder.findOne({ where: { userId: userDto.id, id: parentId } });
			if (!parentFolder) throw new Error("Родительская папка не найдена");

			const folder = await Folder.create({ userId: userDto.id, folderName, parentId });
			await this._saveNewId(folder.dataValues.id, parentFolder);

			return res.json({ folder: folder.dataValues });
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "createDir error" });
		}
	}

	async rename() {}

	async delete() {}
}

export default new folderController();
