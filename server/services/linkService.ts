import { SharedLink, SharedLinkCreationAttributes, SharedLinkUsers, User } from "@models/models";
import { v4 } from "uuid";
import FolderService from "@services/folderService";
import FileService from "@services/fileService";
import ApiError from "@error/ApiError";

class LinkService {
	async getSharedLinkUsersByOwnerId(userId: number | undefined) {
		if (!userId) {
			throw ApiError.badRequest("Не указаны данные для получения пользователя");
		}

		const sharedLinkUsers = await SharedLinkUsers.findOne({ where: { userId } });
		if (!sharedLinkUsers) {
			throw ApiError.notFound("Ссылки на файлы не найдены");
		}

		return sharedLinkUsers;
	}
	async getSharedLinkByLink(link: string) {
		const sharedLink = await SharedLink.findOne({ where: { link } });
		if (!sharedLink) {
			throw ApiError.notFound("Ссылка не найдена");
		}

		return sharedLink;
	}

	async createLink(props: SharedLinkCreationAttributes & { userId: number }) {
		const { link = v4(), userId, ...otherProps } = props;

		const sharedLink = await SharedLink.create({ link, ...otherProps });

		const sharedLinkUsers = await SharedLinkUsers.create({ sharedLinkId: sharedLink.dataValues.id, userId });

		if (props.folderId) {
			const Folder = await FolderService.getById({ id: props.folderId, userId });
			Folder.update({ hasLink: true });
		}
		if (props.fileId) {
			const File = await FileService.getById({ id: props.fileId, userId });
			File.update({ hasLink: true });
		}

		return sharedLink.dataValues.link;
	}
}

export default new LinkService();
