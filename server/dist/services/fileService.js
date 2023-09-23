"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const path = "C:/CloudDisk/UsersStorage";
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
class FileService {
    async createDir({ userId, folderName }) {
        const folder = await models_1.Folder.create({ userId, folderName });
        await folder.save();
        return new Promise((res, rej) => {
            try {
                const folderPath = (0, path_1.join)(path, String(folder.dataValues.id));
                if (fs_1.default.existsSync(folderPath)) {
                    fs_1.default.mkdirSync(folderPath);
                    return res({ message: 'Файл создан' });
                }
                return res({ message: 'Файл уже существует' });
            }
            catch (e) {
                return rej({ message: "File exceptions" });
            }
        });
    }
}
exports.default = new FileService();
