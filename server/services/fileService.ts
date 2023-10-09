import { Folder } from "@models/models";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { join } from "path";

const path = "C:\\CloudDisk\\UserStorage";

class FileService {
	async createDir({ userId, folderName }: { userId: number; folderName: string }) {
		const folder = await Folder.create({ userId, folderName });

		return new Promise((res, rej) => {
			try {
				const folderPath = join(path, String(folder.dataValues.id));
				if (!existsSync(folderPath)) {
					mkdirSync(folderPath);
					return res({ message: "Папка создана" });
				}
				return res({ message: "Папка уже существует" });
			} catch (e) {
				return rej({ message: "Folder exceptions" });
			}
		});
	}

	async moveDir() {
		// посмотреть библеху fs-extra
	}

	async deleteDir(relativePath: string) {
		return new Promise((res, rej) => {
			try {
				const folderPath = join(path, relativePath);
				if (existsSync(folderPath)) {
					unlinkSync(folderPath);
					return res({ message: "Файл удален" });
				}
				return res({ message: "Папка не существует" });
			} catch (e) {
				return rej({ message: "Folder exceptions" });
			}
		});
	}
}

export default new FileService();
