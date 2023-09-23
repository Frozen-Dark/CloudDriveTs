import {Folder, FolderAttributes, FolderCreationAttributes} from "../models/models";
const path = "C:/CloudDisk/UsersStorage"
import fs from "fs"
import {join} from "path"
class FileService {
    async createDir({userId, folderName}: {userId: number, folderName: string}) {
        const folder = await Folder.create({userId, folderName})
        await folder.save()
        
        return new Promise((res, rej) => {
            try {
                const folderPath = join(path, String(folder.dataValues.id))
                if(fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath)
                    return res({message: 'Файл создан'})
                }
                return res({message: 'Файл уже существует'})
            } catch (e) {
                return rej({message: "File exceptions"})
            }
        })
    }
}

export default new FileService()
