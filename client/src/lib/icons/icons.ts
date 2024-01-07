import { faFolderPlus, faFolder, faFile } from "@fortawesome/pro-light-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
	faDownload,
	faEllipsisVertical,
	faLink,
	faMagnifyingGlass,
	faPen,
	faPlus,
	faStar,
	faTrash,
	faUserPlus
} from "@fortawesome/pro-regular-svg-icons";

export enum IconRegularName {
	Download = "download",
	Ellipsis = "ellipsis-vertical",
	Plus = "plus",
	UserPlus = "user-plus",
	SearchGlass = "magnifying-glass",
	Pen = "pen",
	Link = "link",
	Trash = "trash",
	Star = "star"
}

export enum IconLightName {
	AddFolder = "folder-plus",
	Folder = "folder",
	File = "file"
}

const iconsRegular = {
	faDownload,
	faEllipsisVertical,
	faPlus,
	faUserPlus,
	faMagnifyingGlass,
	faPen,
	faLink,
	faTrash,
	faStar
};

const iconsLight = {
	faFolderPlus,
	faFolder,
	faFile
};

library.add(...Object.values(iconsRegular), ...Object.values(iconsLight));
