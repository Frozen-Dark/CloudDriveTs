import { Request, Response } from "express";
import UserDto from "@dto/UserDto";
import FolderService from "@services/folderService";
import UserService from "@services/userService";

class folderController {
	async create(req: Request, res: Response) {
		try {
			const user = await UserService.getUser({ id: req.user.id });
			const userDto = new UserDto(user.dataValues);

			const folderName = req.body.folderName;
			const parentId = req.body.parentId;
			if (!folderName || !parentId) throw new Error("Не все данные были заполнены");

			const folder = await FolderService.createDir({ userId: userDto.id, folderName, parentId });

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
