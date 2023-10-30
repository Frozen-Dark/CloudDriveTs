import { File } from "@models/models";

class FileService {
	async getById(userId: string | number, id: string | number) {
		if (!userId || id) {
			throw new Error("Некорректные данные для получения файла");
		}

		const file = await File.findOne({ where: { userId, id } });
		if (!file) {
			throw new Error("Файл не был найден");
		}

		return file;
	}
}

export default new FileService();
